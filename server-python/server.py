# Python port of server/server.js — no third-party dependencies, standard
# library only (http.server), so `python server.py` is the only setup step.
# Same routes, same behavior:
#   GET /api/submissions          -> list of { prefix, filename, input, output }
#   GET /api/submissions/<prefix> -> { prefix, filename, coverage, flags }
#   GET /*                        -> static files from ../public
import json
import mimetypes
import re
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

from config import PORT, INPUT_DIR, OUTPUT_DIR
from file_scanner import scan_submissions
from parse_analysis import parse_analysis_markdown

PUBLIC_DIR = (Path(__file__).resolve().parent.parent / 'public').resolve()
PREFIX_RE = re.compile(r'^/api/submissions/(\d+)$')
PDF_RE = re.compile(r'^/api/submissions/(\d+)/pdf$')
MIME = {'.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml'}


class Handler(BaseHTTPRequestHandler):
    def _send_json(self, status, data):
        # Compact separators to match Node's default JSON.stringify output.
        body = json.dumps(data, separators=(',', ':')).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _serve_static(self, path):
        req_path = '/index.html' if path == '/' else path
        file_path = (PUBLIC_DIR / req_path.lstrip('/')).resolve()

        try:
            file_path.relative_to(PUBLIC_DIR)
        except ValueError:
            self.send_response(404)
            self.end_headers()
            return

        if not file_path.is_file():
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not found')
            return

        content_type = MIME.get(file_path.suffix) or mimetypes.guess_type(str(file_path))[0] or 'application/octet-stream'
        data = file_path.read_bytes()
        self.send_response(200)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        path = urlparse(self.path).path

        # List every submission (PDF-only, analysis-only, or both) — the
        # dropdown shows all of them, tagged by whichever side is missing.
        if path == '/api/submissions':
            submissions = [
                {'prefix': s['prefix'], 'filename': s['filename'], 'input': s['input'], 'output': s['output']}
                for s in scan_submissions()
            ]
            return self._send_json(200, submissions)

        # Coverage snapshot + flags for one submission, parsed from its
        # analysis .md on demand. No analysis yet (PDF uploaded, not yet
        # reviewed) is not an error — it just returns empty coverage/flags;
        # only a wholly unknown prefix 404s.
        m = PREFIX_RE.match(path)
        if m:
            prefix = m.group(1)
            sub = next((s for s in scan_submissions() if s['prefix'] == prefix), None)
            if not sub:
                return self._send_json(404, {'error': 'Unknown submission'})
            if not sub['output']:
                return self._send_json(200, {'prefix': prefix, 'filename': sub['filename'], 'coverage': [], 'flags': []})
            md_path = OUTPUT_DIR / sub['output_file']
            try:
                text = md_path.read_text(encoding='utf-8')
            except OSError:
                return self._send_json(500, {'error': 'Could not read analysis file'})
            parsed = parse_analysis_markdown(text)
            return self._send_json(200, {'prefix': prefix, 'filename': sub['filename'], **parsed})

        # Raw PDF passthrough — lets the PDF pane show the real source
        # document via the browser's native PDF viewer, independent of the
        # evidence-highlight reconstruction (which needs analysis to exist
        # first). Used in particular when a PDF has been uploaded but no
        # analysis exists yet.
        m = PDF_RE.match(path)
        if m:
            prefix = m.group(1)
            sub = next((s for s in scan_submissions() if s['prefix'] == prefix), None)
            if not sub or not sub['input']:
                self.send_response(404)
                self.end_headers()
                return
            try:
                data = (INPUT_DIR / sub['input_file']).read_bytes()
            except OSError:
                self.send_response(500)
                self.end_headers()
                return
            self.send_response(200)
            self.send_header('Content-Type', 'application/pdf')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return

        return self._serve_static(path)

    def log_message(self, format, *args):
        pass  # keep console quiet, matching the Node version


if __name__ == '__main__':
    server = ThreadingHTTPServer(('0.0.0.0', PORT), Handler)
    print(f'CoverageIQ running at http://localhost:{PORT}')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
