---
name: epli-001-wage-hour-flsa
description: Checks whether an EPLI policy provides at least $150,000 of Wage & Hour / FLSA coverage, including via a Defense Costs sublimit. Use when EPLI coverage has been classified PRESENT by RULE-000, to flag missing or insufficient Wage & Hour coverage.
---

# EPLI-001 — Wage & Hour / FLSA Coverage

## Rule ID
`EPLI-001`

## Rule Name
`Wage & Hour / FLSA Coverage`

## Coverage Module
`Employment Practices Liability (EPLI)`

## Rule Type
`Coverage Enhancement / Optimization`

## Objective
Determine whether the EPLI policy or coverage part provides Wage & Hour
coverage, FLSA coverage, or materially equivalent coverage, and identify
the applicable limit or sublimit. The minimum acceptable standard is
**$150,000**.

## Search concepts / terminology
Review declarations, coverage schedules, sublimit schedules, EPLI coverage
forms, insuring agreements, endorsements, exclusions, carve-backs,
defense-cost provisions, definitions, and supplemental coverage
provisions. Search semantically for: Wage & Hour / Wage and Hour / FLSA /
Fair Labor Standards Act / Wage and Hour Laws / Wage and Hour Claims /
Wage and Hour Defense Costs / Wage and Hour Defense Expenses / Wage and
Hour Coverage / Wage and Hour Sublimit / Unpaid Wages / Minimum Wage /
Overtime / Failure to Pay Overtime / Meal and Rest Breaks / Wage Payment /
Wage Payment Laws / similar wage-and-hour-related employment claims or
defense-cost coverage. Treat both "Wage & Hour" and "FLSA" as primary
terminology.

## Decision steps
1. Search for Wage & Hour / FLSA language as described above. The mere
   appearance of this terminology does not establish coverage — it may
   appear within a Wage & Hour *exclusion*.
2. Determine whether the policy affirmatively provides coverage despite,
   or through modification of, any applicable exclusion. Coverage may
   come from: an affirmative Wage & Hour insuring provision, an FLSA
   coverage endorsement, a Wage & Hour defense-cost sublimit, a carve-back
   to a Wage & Hour exclusion, a supplemental coverage provision, or
   another materially equivalent mechanism. Evaluate substance and effect,
   not just the provision's title.
3. If coverage is identified, determine the applicable limit, sublimit,
   defense-cost sublimit, or aggregate limit against the **$150,000
   minimum**. Establish that the identified amount actually applies to
   Wage & Hour/FLSA coverage — do not associate an unrelated nearby limit.

---

## Status logic

### 🟢 PASS — Wage & Hour Coverage ≥ $150,000
Triggered when: Wage & Hour, FLSA, or materially equivalent coverage is
affirmatively identified with an applicable limit or sublimit of $150,000
or greater.

Output: a Finding (e.g. "Wage & Hour / FLSA coverage identified —
$150,000 sublimit."), plus Evidence supporting both the existence of
coverage and the applicable limit. No Recommendation.

### ⚠️ OPTIMIZATION — Below Threshold or Absent
Two triggers, both OPTIMIZATION:
- Wage & Hour/FLSA coverage is affirmatively provided but the limit is
  below $150,000.
- A reliable full-document review determines no Wage & Hour/FLSA coverage
  is provided at all — if an affirmative Wage & Hour exclusion is
  responsible, cite it as supporting evidence.

Output: a Finding, a Recommendation, and Evidence (the existing limit, if
any).

> Recommendation text (below threshold): "Consider requesting an increase
> in Wage & Hour / FLSA coverage to a limit of $150,000–$250,000." Display
> the current limit alongside the recommendation.
>
> Recommendation text (no coverage): "Consider requesting Wage & Hour /
> FLSA coverage with a limit of $150,000–$250,000."

### 🟡 MANUAL_REVIEW — Coverage or Limit Uncertain
Triggered when CoverageIQ cannot reliably determine: whether Wage &
Hour/FLSA coverage is provided; whether an exclusion completely eliminates
coverage; whether a carve-back restores coverage; whether coverage applies
only to Defense Costs; the applicable limit or sublimit; whether an
endorsement modifies or supersedes the base form; whether relevant EPLI
forms or endorsements are missing; or whether conflicting provisions can
be reconciled. Do not guess.

## Guardrails
- **Wage & Hour language ≠ Wage & Hour coverage.** Finding a "WAGE AND
  HOUR EXCLUSION" does not mean coverage exists — continue analyzing
  endorsements and carve-backs.
- **Defense-cost coverage counts.** If the policy excludes Wage & Hour
  claims generally but affirmatively provides a Wage & Hour Defense Costs
  sublimit, that counts toward this rule (e.g. a $200,000 Defense Costs
  sublimit → PASS) — but the output should clearly state that the
  identified protection is Defense Costs coverage, not broader indemnity
  coverage, so the summary doesn't mislead the broker.
- **$150,000 is the minimum passing threshold, exactly**: $150,000 passes,
  $149,999 does not.
- **Coverage with an unknown limit does not automatically pass** — use
  MANUAL_REVIEW.

## Evidence & confidence requirements
Every result should be able to answer, even if only in the Finding prose:
whether Wage & Hour coverage was identified (Yes/No/Uncertain), the
coverage type (Full Coverage / Defense Costs / Sublimit / Carve-Back /
Other), the limit/sublimit, and whether a Wage & Hour exclusion was
identified (Yes/No/Uncertain). Include a confidence level.

## Notes
Explicitly distinguish Defense Costs coverage from broader Wage & Hour
coverage in the Finding — a $250K defense sublimit can pass the
quantitative threshold without CoverageIQ implying the policy provides
full indemnity coverage for Wage & Hour claims.
