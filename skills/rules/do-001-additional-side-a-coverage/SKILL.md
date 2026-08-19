---
name: do-001-additional-side-a-coverage
description: Checks whether a Private Company D&O policy or quote provides Additional Side A coverage of at least $1,000,000. Use when D&O coverage has been classified PRESENT by RULE-000, to flag missing or insufficient dedicated Side A limits.
---

# DO-001 — Additional Side A Coverage

## Rule ID
`DO-001`

## Rule Name
`Additional Side A Coverage`

## Coverage Module
`Private Company D&O`

## Rule Type
`Coverage Optimization`

## Objective
Determine whether the policy or quote provides Additional Side A coverage
and, if so, whether the Additional Side A limit is at least $1,000,000.

## Search concepts / terminology
Search semantically for Additional Side A coverage, including terms such as
"Additional Side A," "Additional Side A Limit," "Additional Side A Limit of
Liability," "Additional Limit for Side A," "Dedicated Side A," "Separate
Side A Limit," and materially equivalent carrier terminology.

**Important distinction:** this rule concerns *Additional* Side A, not the
ordinary Side A insuring agreement. The existence of standard Side A/B/C
language does not satisfy this rule.

## Decision steps
1. Search the document for Additional Side A coverage as described above.
2. If found, identify the stated limit of liability for that coverage.
3. Compare the identified limit against the $1,000,000 target.

---

## Status logic

### 🟢 PASS
Triggered when: Additional Side A coverage is identified with a limit ≥
$1,000,000.

Output: a Finding stating the identified limit, plus Evidence showing that
limit. No Recommendation.

### ⚠️ OPTIMIZATION
Triggered when either:
- Additional Side A coverage is identified but the limit is > $0 and <
  $1,000,000, or
- No Additional Side A coverage is identified at all.

Output: a Finding, a Recommendation, and Reasoning. Include Evidence when
there's a specific passage to cite (e.g. the identified below-target limit).

> Recommendation text (limit below target): "Consider requesting an
> increase in Additional Side A coverage to at least $1,000,000, or more
> where available."
>
> Recommendation text (no coverage identified): "Consider requesting the
> addition of at least $1,000,000 of Additional Side A coverage, or more
> where available."

### 🟡 MANUAL_REVIEW
Triggered when: the document is incomplete or the applicable language
cannot be reliably determined. Do not assume the coverage is absent merely
because the document is incomplete — use MANUAL_REVIEW instead of
OPTIMIZATION in that case.

Output: Reasoning explaining what's missing or unclear. Include Evidence
only if there's a specific passage worth citing.

## Evidence & confidence requirements
Every result must cite the relevant policy/quote language, the identified
limit if applicable, and a confidence level. Page number and
section/endorsement should be included in the Evidence citation when
available.

## Notes
None.
