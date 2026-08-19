---
name: do-008-crisis-costs
description: Checks whether a Private Company D&O policy or quote provides at least $25,000 of Crisis Costs / Crisis Event Costs coverage. Use when D&O coverage has been classified PRESENT by RULE-000, to flag missing or insufficient crisis-management coverage.
---

# DO-008 — Crisis Costs / Crisis Event Costs

## Rule ID
`DO-008`

## Rule Name
`Crisis Costs / Crisis Event Costs`

## Coverage Module
`Private Company D&O`

## Rule Type
`Coverage Enhancement / Optimization`

## Objective
Determine whether the Private Company D&O policy or quote provides
coverage for Crisis Costs, Crisis Event Costs, or materially equivalent
crisis-management expenses, and determine the applicable limit or
sublimit. The minimum acceptable standard is **$25,000**.

## Search concepts / terminology
Review declarations, coverage schedules, sublimit schedules, insuring
agreements, coverage extensions, endorsements, definitions, supplemental
coverage provisions, and other applicable forms. Search semantically for:
Crisis Costs / Crisis Event Costs / Crisis Event Expenses / Crisis
Management Costs / Crisis Management Expenses / Crisis Response Costs /
Crisis Expenses / Public Relations Expenses / Public Relations Costs /
Reputation Management Expenses / Reputation Protection Costs / Emergency
Public Relations / similar expenses associated with responding to a
crisis, reputational event, or other covered crisis event. Do not require
the literal phrase "Crisis Costs" — evaluate materially equivalent carrier
terminology based on the substance of the coverage.

## Decision steps
1. Search for crisis-related coverage as described above.
2. Determine whether the document **affirmatively grants** coverage for
   Crisis Costs or materially equivalent expenses — merely finding a
   defined term like "Crisis Event" in the definitions section does not
   establish coverage. Locate the provision that actually provides
   payment or reimbursement. Where available, identify coverage type,
   limit/sublimit, applicable retention, trigger for coverage, and the
   applicable coverage part or endorsement.
3. If coverage is identified, determine the applicable limit or sublimit
   against the **$25,000 minimum**. Do not associate a nearby $25,000 or
   $50,000 sublimit with Crisis Costs unless the document reasonably
   establishes that the amount applies to that coverage.

---

## Status logic

### 🟢 PASS — Crisis Coverage ≥ $25,000
Triggered when: Crisis Costs or materially equivalent coverage is
affirmatively identified with a limit or sublimit of $25,000 or greater.

Output: a Finding stating the coverage and limit (e.g. "Crisis Costs
coverage identified — $50,000 sublimit."), plus Evidence supporting both
the existence of the coverage and the applicable limit. No Recommendation.

### ⚠️ OPTIMIZATION — Crisis Coverage < $25,000, or None Identified
Two triggers, both OPTIMIZATION:
- Crisis Costs coverage is identified but the limit/sublimit is below
  $25,000.
- A reliable full-document review finds no Crisis Costs coverage at all.

Output: a Finding, a Recommendation, and Evidence (the existing limit, if
any).

> Recommendation text (below threshold): "Consider requesting an increase
> in Crisis Costs / Crisis Event Costs coverage to at least $25,000, with
> $25,000–$50,000 targeted where available." Display the current limit
> alongside the recommendation.
>
> Recommendation text (no coverage identified): "Consider requesting
> Crisis Costs / Crisis Event Costs coverage with a $25,000–$50,000
> sublimit."

### 🟡 MANUAL_REVIEW — Coverage or Limit Uncertain
Triggered when CoverageIQ cannot reliably determine: whether Crisis Costs
coverage is actually provided; whether identified crisis-related language
constitutes affirmative coverage; the applicable limit or sublimit;
whether a listed sublimit applies to the relevant provision; whether an
endorsement adds, modifies, replaces, or removes the coverage; whether
conflicting provisions supersede one another; whether relevant forms or
endorsements are missing; or whether document quality prevents reliable
analysis. Do not guess. **If coverage appears to exist but the limit
cannot be established, do not automatically PASS** — use MANUAL_REVIEW.

## Guardrails
- **Mention ≠ Coverage.** The mere presence of "Crisis Event," "Crisis
  Management," "Public Relations," or similar terminology does not
  satisfy the rule — the policy must affirmatively provide coverage for
  associated costs or expenses.
- **Coverage without a determinable limit ≠ automatic PASS** — use
  MANUAL_REVIEW instead.
- **$25,000 is the minimum passing threshold, exactly**: a $25,000 limit
  passes; $24,999 does not.
- **Evidence must support the limit** — do not associate a nearby
  $25,000/$50,000 sublimit with Crisis Costs unless the document
  reasonably establishes that the amount applies to that coverage.

## Evidence & confidence requirements
Every result should be able to answer, even if only in the Finding prose:
whether Crisis Costs coverage was identified (Yes/No/Uncertain), the
coverage type (Crisis Costs / Crisis Event Costs / Crisis Management / PR
Costs / Reputation Costs / Other), and the limit/sublimit (Amount / Not
Stated / N/A). Include a confidence level.

## Notes
Core logic: no coverage → OPTIMIZATION (request $25K–$50K). Coverage
< $25K → OPTIMIZATION (increase to ≥ $25K). Coverage ≥ $25K → PASS.
Coverage or limit uncertain → MANUAL_REVIEW.
