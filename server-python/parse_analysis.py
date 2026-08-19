# Python port of server/parseAnalysis.js — must stay in sync with that file
# and skills/AGENT_SYSTEM_INSTRUCTIONS.md. Same markdown convention, same
# return contract (as a dict instead of a JS object):
#
#   {
#     'coverage': [{ 'module': str, 'status': 'present'|'not-present'|'manual-review',
#                    'limit'?: str, 'retention'?: str, 'premium'?: str,
#                    'confidence'?: str, 'evidence'?: [{'label'?: str, 'quote': str}] }],
#     'flags': [{ 'id'?: str, 'name': str, 'status': 'pass'|'optimization'|'manual-review',
#                 'confidence'?: str, 'finding'?: str, 'recommendation'?: str,
#                 'reasoning'?: str, 'evidence'?: [{'label'?: str, 'quote': str}] }]
#   }
#
# See server/parseAnalysis.js's header comment for the full markdown spec.
import re

STATUS_MAP = {
    'pass': 'pass',
    'optimization': 'optimization',
    'manual_review': 'manual-review',
    'manual review': 'manual-review',
}

COVERAGE_STATUS_MAP = {
    'present': 'present',
    'not_present': 'not-present',
    'not present': 'not-present',
    'manual_review': 'manual-review',
    'manual review': 'manual-review',
}

EVIDENCE_RE = re.compile(r'^Evidence(?:\s*\(([^)]*)\))?:\s*(.*)$', re.IGNORECASE)


def field_value(lines, label):
    pattern = re.compile(rf'^{re.escape(label)}:\s*(.*)$', re.IGNORECASE)
    for line in lines:
        m = pattern.match(line)
        if m:
            return m.group(1).strip()
    return None


def parse_heading(heading_line):
    text = re.sub(r'^##\s*', '', heading_line).strip()
    m = re.match(r'^(.+?)\s+[—-]\s+(.+)$', text)
    if m and re.match(r'^[A-Za-z]{2,6}-\d+$', m.group(1).strip()):
        return m.group(1).strip(), m.group(2).strip()
    return None, text


def parse_evidence(lines):
    # Omit the 'label' key entirely when there's no label — matches Node's
    # JSON.stringify, which drops object properties whose value is
    # undefined, so the two servers' JSON responses are identical.
    evidence = []
    for line in lines:
        m = EVIDENCE_RE.match(line)
        if not m:
            continue
        quote = m.group(2).strip()
        label = m.group(1).strip() if m.group(1) else None
        evidence.append({'label': label, 'quote': quote} if label else {'quote': quote})
    return evidence


def parse_coverage_snapshot(body_lines):
    text = '\n'.join(body_lines)
    subsections = [s.strip() for s in re.split(r'\n(?=###\s)', text) if s.strip()]

    result = []
    for sub in subsections:
        lines = [l.strip() for l in sub.split('\n') if l.strip()]
        module = re.sub(r'^###\s*', '', lines[0]).strip()

        status_key = (field_value(lines, 'Status') or '').lower()
        status = COVERAGE_STATUS_MAP.get(status_key, 'manual-review')

        entry = {'module': module, 'status': status}
        limit = field_value(lines, 'Limit')
        retention = field_value(lines, 'Retention')
        premium = field_value(lines, 'Premium')
        confidence = field_value(lines, 'Confidence')
        evidence = parse_evidence(lines)

        if limit: entry['limit'] = limit
        if retention: entry['retention'] = retention
        if premium: entry['premium'] = premium
        if confidence: entry['confidence'] = confidence
        if evidence: entry['evidence'] = evidence

        result.append(entry)
    return result


def parse_rule_section(lines):
    rule_id, name = parse_heading(lines[0])

    status_key = (field_value(lines, 'Status') or '').lower()
    status = STATUS_MAP.get(status_key, 'manual-review')

    flag = {'name': name, 'status': status}
    if rule_id:
        flag['id'] = rule_id

    confidence = field_value(lines, 'Confidence')
    finding = field_value(lines, 'Finding')
    recommendation = field_value(lines, 'Recommendation')
    reasoning = field_value(lines, 'Reasoning')
    evidence = parse_evidence(lines)

    if confidence: flag['confidence'] = confidence
    if finding: flag['finding'] = finding
    if recommendation: flag['recommendation'] = recommendation
    if reasoning: flag['reasoning'] = reasoning
    if evidence: flag['evidence'] = evidence

    return flag


def parse_analysis_markdown(text):
    sections = [s.strip() for s in re.split(r'\n(?=##\s)', text) if s.strip()]

    coverage = []
    flags = []

    for section in sections:
        lines = [l.strip() for l in section.split('\n') if l.strip()]
        rule_id, _ = parse_heading(lines[0])

        if rule_id and rule_id.upper() == 'RULE-000':
            coverage.extend(parse_coverage_snapshot(lines[1:]))
            continue

        flags.append(parse_rule_section(lines))

    return {'coverage': coverage, 'flags': flags}
