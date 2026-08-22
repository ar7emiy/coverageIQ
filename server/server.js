const http = require('http');
const fs = require('fs');
const path = require('path');
const { PORT, INPUT_DIR, OUTPUT_DIR } = require('./config');
const { scanSubmissions } = require('./fileScanner');
const { parseAnalysisMarkdown } = require('./parseAnalysis');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function serveStatic(req, res) {
  const reqPath = req.url === '/' ? '/index.html' : req.url;
  const safePath = path.normalize(reqPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // List every submission (PDF-only, analysis-only, or both) — the
  // dropdown shows all of them, tagged by whichever side is missing.
  if (url.pathname === '/api/submissions') {
    const submissions = scanSubmissions().map(({ prefix, filename, input, output }) =>
      ({ prefix, filename, input, output }));
    return sendJson(res, 200, submissions);
  }

  // Coverage snapshot + flags for one submission, parsed from its analysis
  // .md on demand. A submission with no analysis yet (PDF uploaded, not
  // yet reviewed) is not an error — it just returns empty coverage/flags;
  // only a wholly unknown prefix 404s.
  const flagsMatch = url.pathname.match(/^\/api\/submissions\/(\d+)$/);
  if (flagsMatch) {
    const prefix = flagsMatch[1];
    const sub = scanSubmissions().find(s => s.prefix === prefix);
    if (!sub) return sendJson(res, 404, { error: 'Unknown submission' });
    if (!sub.output) return sendJson(res, 200, { prefix, filename: sub.filename, coverage: [], flags: [] });
    const mdPath = path.join(OUTPUT_DIR, sub.outputFile);
    fs.readFile(mdPath, 'utf8', (err, text) => {
      if (err) return sendJson(res, 500, { error: 'Could not read analysis file' });
      const { coverage, flags } = parseAnalysisMarkdown(text);
      sendJson(res, 200, { prefix, filename: sub.filename, coverage, flags });
    });
    return;
  }

  // Raw PDF passthrough — lets the PDF pane show the real source document
  // via the browser's native PDF viewer, independent of the evidence-
  // highlight reconstruction (which needs analysis to exist first). Used
  // in particular when a PDF has been uploaded but no analysis exists yet.
  const pdfMatch = url.pathname.match(/^\/api\/submissions\/(\d+)\/pdf$/);
  if (pdfMatch) {
    const prefix = pdfMatch[1];
    const sub = scanSubmissions().find(s => s.prefix === prefix);
    if (!sub || !sub.input) { res.writeHead(404); res.end(); return; }
    fs.readFile(path.join(INPUT_DIR, sub.inputFile), (err, data) => {
      if (err) { res.writeHead(500); res.end(); return; }
      res.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-Length': data.length });
      res.end(data);
    });
    return;
  }

  if (req.method === 'GET') return serveStatic(req, res);
  res.writeHead(404); res.end();
});

server.listen(PORT, () => console.log(`CoverageIQ running at http://localhost:${PORT}`));
