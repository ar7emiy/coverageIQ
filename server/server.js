const http = require('http');
const fs = require('fs');
const path = require('path');
const { PORT, OUTPUT_DIR } = require('./config');
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

  // List every submission (complete or not) — the dropdown needs the
  // incomplete ones too, to render the "Missing input/output file" warning.
  if (url.pathname === '/api/submissions') {
    const submissions = scanSubmissions().map(({ prefix, filename, input, output }) =>
      ({ prefix, filename, input, output }));
    return sendJson(res, 200, submissions);
  }

  // Coverage snapshot + flags for one complete pair, parsed from its
  // analysis .md on demand.
  const flagsMatch = url.pathname.match(/^\/api\/submissions\/(\d+)$/);
  if (flagsMatch) {
    const prefix = flagsMatch[1];
    const sub = scanSubmissions().find(s => s.prefix === prefix);
    if (!sub || !sub.input || !sub.output) return sendJson(res, 404, { error: 'Not a complete pair' });
    const mdPath = path.join(OUTPUT_DIR, sub.outputFile);
    fs.readFile(mdPath, 'utf8', (err, text) => {
      if (err) return sendJson(res, 500, { error: 'Could not read analysis file' });
      const { coverage, flags } = parseAnalysisMarkdown(text);
      sendJson(res, 200, { prefix, filename: sub.filename, coverage, flags });
    });
    return;
  }

  if (req.method === 'GET') return serveStatic(req, res);
  res.writeHead(404); res.end();
});

server.listen(PORT, () => console.log(`CoverageIQ running at http://localhost:${PORT}`));
