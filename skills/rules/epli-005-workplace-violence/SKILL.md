---
name: epli-005-workplace-violence
description: Checks whether an EPLI policy or quote provides at least $150,000 of Workplace Violence coverage. Use when EPLI coverage has been classified PRESENT by RULE-000, to flag missing or insufficient Workplace Violence coverage.
---

# EPLI-005 — Workplace Violence Coverage

## Rule ID
`EPLI-005`

## Rule Name
`Workplace Violence Coverage`

## Coverage Module
`Employment Practices Liability (EPLI)`

## Rule Type
`Coverage Enhancement / Optimization`

## Objective
Determine whether the EPLI policy or quote provides Workplace Violence
coverage or materially equivalent coverage, and identify the applicable
limit or sublimit. Workplace Violence coverage is expected on many EPLI
policies. The minimum acceptable standard is **$150,000**; the recommended
sublimit when an optimization is triggered is **$250,000**.

## Search concepts / terminology
Review declarations, coverage schedules, sublimit schedules, EPLI coverage
forms, supplemental coverage provisions, coverage extensions, insuring
agreements, endorsements, definitions, and amendatory endorsements.
Search semantically for: Workplace Violence / Workplace Violence Coverage
/ Costs / Expenses / Event / Incident / Response / Crisis / Counseling /
Crisis Management Expenses / Crisis Response Expenses / Employee
Counseling Expenses / Trauma Counseling / Counseling Services / Security
Expenses / Post-Incident Security / Public Relations Expenses / Business
Interruption (workplace-violence-triggered) / Workplace Threat / Threat of
Violence / Violent Act / Active Shooter / Active Assailant / similar
coverage responding to an actual or threatened violent event affecting the
workplace. Do not require the exact phrase "Workplace Violence Coverage" —
evaluate materially equivalent carrier terminology based on the substance
of the coverage. Some carriers deliver this as a "Workplace Violence
Expense" endorsement with its own distinct sublimit schedule, separate
from the general Crisis Costs extension — check the endorsement schedule
specifically, not just the base EPLI definitions.

## Decision steps
1. Search for Workplace Violence coverage as described above. The
   presence of related terminology does not by itself establish coverage.
2. Determine whether the policy affirmatively provides payment or
   reimbursement for costs/expenses from a qualifying event — via
   supplemental coverage, a coverage extension, a separate insuring
   agreement, an endorsement, sublimited coverage, or a crisis-response
   provision. Where available, identify coverage type, applicable
   limit/sublimit, retention, covered expenses, trigger, and applicable
   endorsement/provision.
3. If coverage is identified, determine the applicable limit or sublimit
   against the **$150,000 minimum**, establishing that the identified
   dollar amount actually applies to Workplace Violence coverage — do not
   associate an unrelated nearby sublimit.

---

## Status logic

### 🟢 PASS — Workplace Violence Coverage ≥ $150,000
Triggered when: Workplace Violence or materially equivalent coverage is
affirmatively identified with a limit or sublimit of $150,000 or greater.

Output: a Finding (e.g. "Workplace Violence coverage identified —
$250,000 sublimit."), plus Evidence supporting both the existence of
coverage and the applicable limit. No Recommendation.

### ⚠️ OPTIMIZATION — Below Threshold or Absent
Two triggers, both OPTIMIZATION:
- Coverage is provided but the limit/sublimit is below $150,000.
- A reliable full-document review finds no Workplace Violence or
  materially equivalent coverage.

Output: a Finding, a Recommendation, and Evidence (the existing limit, if
any).

> Recommendation text (below threshold): "Consider requesting an increase
> in Workplace Violence coverage to a $250,000 sublimit." Display the
> existing limit alongside the recommendation.
>
> Recommendation text (no coverage): "Consider requesting the addition of
> Workplace Violence coverage with a $250,000 sublimit."

### 🟡 MANUAL_REVIEW — Coverage or Limit Uncertain
Triggered when CoverageIQ cannot reliably determine: whether Workplace
Violence coverage is actually provided; whether identified language
constitutes affirmative coverage; whether crisis-related coverage actually
applies to Workplace Violence events specifically; the applicable limit or
sublimit; whether an endorsement adds, modifies, or removes the coverage;
whether the identified dollar amount applies to this coverage; whether
relevant forms/endorsements are missing; or whether conflicting provisions
can be reconciled. Do not guess.

## Guardrails
- **Terminology ≠ coverage.** Finding a definition of "Workplace Violence
  Event" does not independently establish that the policy pays any
  resulting expenses — trace it to an affirmative coverage provision.
- **$150,000 is the passing threshold, exactly** — $250,000 and $150,000
  both PASS; $149,999 or no coverage triggers OPTIMIZATION recommending
  $250,000. Do not recommend increasing a $150,000–$249,999 limit solely
  because $250,000 is preferred — anything ≥ $150,000 passes.
- **Don't confuse general Crisis Costs coverage (DO-008) with Workplace
  Violence coverage** — a policy may have one without the other; establish
  that the identified provision actually responds to a Workplace Violence
  event specifically.
- **Coverage with an unknown limit does not pass** — use MANUAL_REVIEW,
  and do not assume the full EPLI limit applies.

## Evidence & confidence requirements
Every result should be able to answer, even if only in the Finding prose:
whether Workplace Violence coverage was identified (Yes/No/Uncertain), the
coverage type (Supplemental / Sublimit / Endorsement / Crisis Response /
Other), and the limit/sublimit. Include a confidence level.

## Notes
None.
