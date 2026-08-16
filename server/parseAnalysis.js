// ============================================================================
// PROVISIONAL — expect to rewrite this file once the skill's real output
// format is known. See CoverageIQ-UI-README.md section 9 ("Still open"):
// the analysis schema was not finalized at the time this was written.
//
// This is the ONLY place that knows the .md file's structure. server.js
// just calls parseAnalysisMarkdown(text) and forwards the result as JSON;
// the frontend just renders whatever array it receives. To adopt the real
// skill format, rewrite the body of parseAnalysisMarkdown below — as long
// as it still returns the shape documented under "Return contract", nothing
// else in the app needs to change.
//
// Current draft markdown convention (one `##` section per flag):
//
//   ## <Flag Name>
//   Status: Met | Not Met | Needs Review
//
//   Original: "<original policy wording>"
//   Replacement: "<suggested replacement wording>"
//   Explanation: <plain-language rationale>
//
// - Original/Replacement/Explanation lines are omitted when Status is Met
//   (mirrors the mockup: the evidence panel only renders for non-Met flags).
// - See test_coverageIQ_data/output/004_sample_analysis.md for a worked example.
//
// Return contract (must match what public/app.js expects):
//   [{ name: string, status: 'met' | 'not-met' | 'review',
//      original?: string, replacement?: string, explanation?: string }]
// ============================================================================

const STATUS_MAP = { 'met': 'met', 'not met': 'not-met', 'needs review': 'review' };

function field(lines, label) {
  const re = new RegExp(`^${label}:`, 'i');
  const line = lines.find(l => re.test(l));
  if (!line) return undefined;
  return line.replace(re, '').trim().replace(/^"|"$/g, '');
}

function parseAnalysisMarkdown(text) {
  const sections = text
    .split(/\n(?=##\s)/g)
    .map(s => s.trim())
    .filter(Boolean);

  return sections.map(section => {
    const lines = section.split('\n').map(l => l.trim());
    const name = lines[0].replace(/^##\s*/, '').trim();

    const statusKey = (field(lines, 'Status') || '').toLowerCase();
    const status = STATUS_MAP[statusKey] || 'review';

    const flag = { name, status };
    if (status !== 'met') {
      const original = field(lines, 'Original');
      const replacement = field(lines, 'Replacement');
      const explanation = field(lines, 'Explanation');
      if (original) flag.original = original;
      if (replacement) flag.replacement = replacement;
      if (explanation) flag.explanation = explanation;
    }
    return flag;
  });
}

module.exports = { parseAnalysisMarkdown };
