// ============================================================================
// This is the ONLY place that knows the .md file's structure. server.js just
// calls parseAnalysisMarkdown(text) and forwards the result as JSON; the
// frontend just renders whatever object it receives. If the real skill
// output ever needs to diverge from this, update this file AND
// skills/AGENT_SYSTEM_INSTRUCTIONS.md together — they must stay in sync.
//
// Markdown convention — see skills/AGENT_SYSTEM_INSTRUCTIONS.md for the
// full spec and examples:
//
//   ## RULE-000 — Coverage Classification      <- always first, mandatory
//   ### Private Company D&O
//   Status: PRESENT | NOT_PRESENT | MANUAL_REVIEW
//   Confidence: High | Medium | Low
//   Limit: <amount>
//   Retention: <amount>
//   Premium: Coverage-Specific | Combined | Not Identified
//   Evidence: "<quoted document language>"          (repeatable)
//   ### Employment Practices Liability (EPLI)
//   ...same fields, always all four modules...
//
//   ## <Rule ID> — <Rule Name>                  <- one per eligible rule
//   Status: PASS | OPTIMIZATION | MANUAL_REVIEW
//   Confidence: High | Medium | Low
//   Finding: <one-line statement of what was identified — PASS/OPTIMIZATION>
//   Recommendation: <the ask — OPTIMIZATION only>
//   Evidence: "<quoted document language>"          (repeatable)
//   Evidence (<Label>): "<quoted document language>" (repeatable, labeled)
//   Reasoning: <why it matters, or why MANUAL_REVIEW>
//
// - The `## RULE-000 — Coverage Classification` section is detected by its
//   `RULE-000` heading ID and parsed into `coverage` (one entry per `###`
//   module subsection) instead of being treated as an ordinary rule.
// - "<Rule ID> — " in a heading is optional elsewhere; a heading with no ID
//   is fine for non-RULE-000 sections.
// - Evidence lines are repeatable (both at rule level and within a RULE-000
//   module subsection) and may each carry an optional "(Label)" to
//   disambiguate multiple citations.
// - Every field is a single logical line — the parser does not join
//   multi-line paragraph continuations.
// - See skills/rules/*.md for the rule definitions and
//   test_coverageIQ_data/output/004_Beacon_Robotics_DO_Renewal_analysis.md
//   for a worked example file.
//
// Return contract (must match what public/index.html expects):
//   {
//     coverage: [{ module: string, status: 'present' | 'not-present' | 'manual-review',
//                  limit?: string, retention?: string, premium?: string,
//                  confidence?: string, evidence?: [{ label?: string, quote: string }] }],
//     flags: [{ id?: string, name: string,
//               status: 'pass' | 'optimization' | 'manual-review',
//               confidence?: string, finding?: string, recommendation?: string,
//               reasoning?: string,
//               evidence?: [{ label?: string, quote: string }] }]
//   }
// ============================================================================

const STATUS_MAP = {
  'pass': 'pass',
  'optimization': 'optimization',
  'manual_review': 'manual-review',
  'manual review': 'manual-review',
};

const COVERAGE_STATUS_MAP = {
  'present': 'present',
  'not_present': 'not-present',
  'not present': 'not-present',
  'manual_review': 'manual-review',
  'manual review': 'manual-review',
};

function fieldValue(lines, label) {
  const re = new RegExp(`^${label}:\\s*(.*)$`, 'i');
  for (const line of lines) {
    const m = line.match(re);
    if (m) return m[1].trim();
  }
  return undefined;
}

function parseHeading(headingLine) {
  const text = headingLine.replace(/^##\s*/, '').trim();
  const m = text.match(/^(.+?)\s+[—-]\s+(.+)$/);
  if (m && /^[A-Za-z]{2,6}-\d+$/.test(m[1].trim())) {
    return { id: m[1].trim(), name: m[2].trim() };
  }
  return { id: undefined, name: text };
}

function parseEvidence(lines) {
  const re = /^Evidence(?:\s*\(([^)]*)\))?:\s*(.*)$/i;
  const evidence = [];
  for (const line of lines) {
    const m = line.match(re);
    if (m) evidence.push({ label: m[1] ? m[1].trim() : undefined, quote: m[2].trim() });
  }
  return evidence;
}

function parseCoverageSnapshot(bodyLines) {
  const text = bodyLines.join('\n');
  const subsections = text.split(/\n(?=###\s)/g).map(s => s.trim()).filter(Boolean);

  return subsections.map(sub => {
    const lines = sub.split('\n').map(l => l.trim()).filter(Boolean);
    const module = lines[0].replace(/^###\s*/, '').trim();

    const statusKey = (fieldValue(lines, 'Status') || '').toLowerCase();
    const status = COVERAGE_STATUS_MAP[statusKey] || 'manual-review';

    const entry = { module, status };
    const limit = fieldValue(lines, 'Limit');
    const retention = fieldValue(lines, 'Retention');
    const premium = fieldValue(lines, 'Premium');
    const confidence = fieldValue(lines, 'Confidence');
    const evidence = parseEvidence(lines);

    if (limit) entry.limit = limit;
    if (retention) entry.retention = retention;
    if (premium) entry.premium = premium;
    if (confidence) entry.confidence = confidence;
    if (evidence.length) entry.evidence = evidence;

    return entry;
  });
}

function parseRuleSection(lines) {
  const { id, name } = parseHeading(lines[0]);

  const statusKey = (fieldValue(lines, 'Status') || '').toLowerCase();
  const status = STATUS_MAP[statusKey] || 'manual-review';

  const flag = { name, status };
  if (id) flag.id = id;

  const confidence = fieldValue(lines, 'Confidence');
  const finding = fieldValue(lines, 'Finding');
  const recommendation = fieldValue(lines, 'Recommendation');
  const reasoning = fieldValue(lines, 'Reasoning');
  const evidence = parseEvidence(lines);

  if (confidence) flag.confidence = confidence;
  if (finding) flag.finding = finding;
  if (recommendation) flag.recommendation = recommendation;
  if (reasoning) flag.reasoning = reasoning;
  if (evidence.length) flag.evidence = evidence;

  return flag;
}

function parseAnalysisMarkdown(text) {
  const sections = text.split(/\n(?=##\s)/g).map(s => s.trim()).filter(Boolean);

  const coverage = [];
  const flags = [];

  sections.forEach(section => {
    const lines = section.split('\n').map(l => l.trim()).filter(Boolean);
    const { id } = parseHeading(lines[0]);

    if (id && id.toUpperCase() === 'RULE-000') {
      coverage.push(...parseCoverageSnapshot(lines.slice(1)));
      return;
    }

    flags.push(parseRuleSection(lines));
  });

  return { coverage, flags };
}

module.exports = { parseAnalysisMarkdown };

// ============================================================================
// SUPERSEDED — flat PASS/OPTIMIZATION/MANUAL_REVIEW schema with no RULE-000
// coverage classification, kept only for reference. No longer used now that
// the Coverage Snapshot (gatekeeping which rule families even run) is part
// of the output.
// ============================================================================
//
// function oldParseAnalysisMarkdown(text) {
//   const sections = text.split(/\n(?=##\s)/g).map(s => s.trim()).filter(Boolean);
//   return sections.map(section => {
//     const lines = section.split('\n').map(l => l.trim()).filter(Boolean);
//     return parseRuleSection(lines);
//   });
// }
//
// ============================================================================
// SUPERSEDED (earlier still) — original draft schema (met/not-met/review
// with original/replacement/explanation), kept only for reference.
// ============================================================================
//
// const OLD_STATUS_MAP = { 'met': 'met', 'not met': 'not-met', 'needs review': 'review' };
//
// function oldField(lines, label) {
//   const re = new RegExp(`^${label}:`, 'i');
//   const line = lines.find(l => re.test(l));
//   if (!line) return undefined;
//   return line.replace(re, '').trim().replace(/^"|"$/g, '');
// }
//
// function veryOldParseAnalysisMarkdown(text) {
//   const sections = text
//     .split(/\n(?=##\s)/g)
//     .map(s => s.trim())
//     .filter(Boolean);
//
//   return sections.map(section => {
//     const lines = section.split('\n').map(l => l.trim());
//     const name = lines[0].replace(/^##\s*/, '').trim();
//
//     const statusKey = (oldField(lines, 'Status') || '').toLowerCase();
//     const status = OLD_STATUS_MAP[statusKey] || 'review';
//
//     const flag = { name, status };
//     if (status !== 'met') {
//       const original = oldField(lines, 'Original');
//       const replacement = oldField(lines, 'Replacement');
//       const explanation = oldField(lines, 'Explanation');
//       if (original) flag.original = original;
//       if (replacement) flag.replacement = replacement;
//       if (explanation) flag.explanation = explanation;
//     }
//     return flag;
//   });
// }
