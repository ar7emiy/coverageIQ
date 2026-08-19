# Python port of server/fileScanner.js — same behavior: scans INPUT_DIR /
# OUTPUT_DIR and pairs files by numeric prefix only (e.g. "004_Acme.pdf"
# pairs with "004_anything_analysis.md" regardless of the rest of the name).
import re
from config import INPUT_DIR, OUTPUT_DIR

INPUT_RE = re.compile(r'^(\d+)_(.+)\.pdf$', re.IGNORECASE)
OUTPUT_RE = re.compile(r'^(\d+)_(.+)_analysis\.md$', re.IGNORECASE)


def _list_dir(path):
    try:
        return [p.name for p in path.iterdir() if p.is_file()]
    except FileNotFoundError:
        return []


# Returns submissions sorted latest-first (highest prefix first), each:
# { prefix, filename, input, output, input_file, output_file }
def scan_submissions():
    by_prefix = {}

    for name in _list_dir(INPUT_DIR):
        m = INPUT_RE.match(name)
        if not m:
            continue
        prefix, stem = m.group(1), m.group(2)
        entry = by_prefix.setdefault(prefix, {})
        entry['input_file'] = name
        entry['filename'] = stem

    for name in _list_dir(OUTPUT_DIR):
        m = OUTPUT_RE.match(name)
        if not m:
            continue
        prefix, stem = m.group(1), m.group(2)
        entry = by_prefix.setdefault(prefix, {})
        entry['output_file'] = name
        entry.setdefault('filename', stem)

    submissions = [
        {
            'prefix': prefix,
            'filename': e.get('filename'),
            'input': 'input_file' in e,
            'output': 'output_file' in e,
            'input_file': e.get('input_file'),
            'output_file': e.get('output_file'),
        }
        for prefix, e in by_prefix.items()
    ]
    submissions.sort(key=lambda s: int(s['prefix']), reverse=True)
    return submissions
