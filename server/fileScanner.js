// Scans INPUT_DIR / OUTPUT_DIR and pairs files by their numeric prefix only
// (e.g. "004_Acme.pdf" pairs with "004_anything_analysis.md" regardless of
// the rest of the filename) — matches the README's "running numeric prefix"
// framing and stays robust if the skill normalizes/renames the stem.
const fs = require('fs');
const path = require('path');
const { INPUT_DIR, OUTPUT_DIR } = require('./config');

const INPUT_RE = /^(\d+)_(.+)\.pdf$/i;
const OUTPUT_RE = /^(\d+)_(.+)_analysis\.md$/i;

function listDir(dir) {
  try {
    return fs.readdirSync(dir);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

// Returns submissions sorted latest-first (highest prefix first), each:
// { prefix, filename, input, output, inputFile, outputFile }
// `input`/`output` are booleans — false means that half of the pair is
// missing, which is what the dropdown's "Missing input/output file"
// warning is driven by.
function scanSubmissions() {
  const byPrefix = new Map();

  for (const name of listDir(INPUT_DIR)) {
    const m = name.match(INPUT_RE);
    if (!m) continue;
    const [, prefix, stem] = m;
    const entry = byPrefix.get(prefix) || {};
    entry.inputFile = name;
    entry.filename = stem;
    byPrefix.set(prefix, entry);
  }

  for (const name of listDir(OUTPUT_DIR)) {
    const m = name.match(OUTPUT_RE);
    if (!m) continue;
    const [, prefix, stem] = m;
    const entry = byPrefix.get(prefix) || {};
    entry.outputFile = name;
    if (!entry.filename) entry.filename = stem;
    byPrefix.set(prefix, entry);
  }

  return [...byPrefix.entries()]
    .map(([prefix, e]) => ({
      prefix,
      filename: e.filename,
      input: Boolean(e.inputFile),
      output: Boolean(e.outputFile),
      inputFile: e.inputFile || null,
      outputFile: e.outputFile || null,
    }))
    .sort((a, b) => Number(b.prefix) - Number(a.prefix));
}

module.exports = { scanSubmissions };
