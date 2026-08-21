---
name: epli-004-independent-contractor
description: Checks whether an EPLI policy's Employee definition includes independent contractors and whether any exclusion or endorsement subsequently removes that coverage. Use when EPLI coverage has been classified PRESENT by RULE-000, to flag missing or restricted independent-contractor coverage.
---

# EPLI-004 — Independent Contractor Coverage

## Rule ID
`EPLI-004`

## Rule Name
`Independent Contractor Coverage`

## Coverage Module
`Employment Practices Liability (EPLI)`

## Rule Type
`Coverage Optimization`

## Objective
Determine whether the EPLI policy or quote provides coverage involving
independent contractors, primarily by reviewing the definition of
Employee and related insured-person definitions, then review the entire
document for any exclusion, endorsement, or limitation that removes or
restricts that coverage. The preferred result: independent contractors
are included within the applicable EPLI coverage and no subsequent
provision materially removes it.

## Search concepts / terminology
Start with the definition of Employee / Employees / Insured Person /
Individual Insured / Worker / Employment Practices Insured, or other
materially equivalent defined terms. Within it, search semantically for:
Independent Contractor(s) / Contract Worker / Contract Employee /
Contractor / Freelance Worker / Freelancer / Gig Worker / 1099 Worker /
Temporary Worker / Temporary Employee / Seasonal Worker / Leased Employee
/ Leased Worker / Staffing Agency Personnel / similar terminology
describing individuals providing services who may not qualify as
traditional employees. Do not require the exact phrase "independent
contractor" — evaluate the substance of the definition. Also check for a
"Misclassification of Employees" or "Worker Classification" provision,
which cuts the other way — it can either extend coverage to
misclassified workers or specifically exclude claims arising from
misclassification, so read its actual effect rather than assuming from
the label alone.

## Decision steps
1. Determine whether independent contractors or materially equivalent
   workers are affirmatively included within the Employee definition (or
   another applicable definition). If not found there, continue reviewing
   other definitions, insuring agreements, and endorsements before
   concluding coverage is absent — an endorsement may separately add
   independent contractors even when the base definition doesn't.
2. If not included in the base definition, search for an endorsement or
   provision that affirmatively extends coverage (e.g. "Independent
   Contractor Coverage," "Definition of Employee Amended/Expanded"). If
   found, treat independent contractors as included for this rule.
3. **Mandatory, even if included in the base definition**: search the
   entire policy for any exclusion, endorsement, or limitation that
   subsequently removes or restricts coverage involving independent
   contractors (e.g. "Independent Contractor Exclusion," "Misclassification
   of Independent Contractors," "Worker Classification"). Determine the
   actual effect of the provision, not just its title.
4. Reconcile the base form and all endorsements to determine the final
   operative coverage — a later endorsement can remove favorable base-form
   coverage, or add coverage the base form lacked. Evaluate them together
   before assigning a final status.

Preferred sequence: find Employee definition → determine whether
independent contractors are included → search for coverage-expanding
endorsements → search for exclusions/restrictive endorsements → determine
final operative coverage.

---

## Status logic

### 🟢 PASS — Independent Contractors Included
Triggered when: independent contractors or materially equivalent workers
are affirmatively included (via the Employee definition, another
definition, or an endorsement) **and** no operative exclusion or
limitation materially removes that coverage.

Output: a Finding (e.g. "Independent contractors are included within the
definition of Employee. No applicable exclusion removing this coverage
was identified."), plus Evidence supporting the inclusion. No
Recommendation.

### ⚠️ OPTIMIZATION — Not Included, or Removed/Restricted
Two triggers, both OPTIMIZATION:
- A reliable review determines independent contractors are not included
  within the Employee definition or otherwise affirmatively covered.
- Independent contractors initially appear included, but an exclusion,
  endorsement, or limitation subsequently removes or materially restricts
  that coverage.

Output: a Finding, a Recommendation, and Evidence.

> Recommendation text (not included): "Consider requesting that the
> definition of Employee be expanded to include independent contractors."
>
> Recommendation text (removed/restricted): "Consider requesting removal
> of the exclusion or limitation restricting EPLI coverage for independent
> contractors." Cite both the provision that would otherwise include
> independent contractors and the provision that removes/restricts it.

### 🟡 MANUAL_REVIEW
Triggered when CoverageIQ cannot reliably determine: whether independent
contractors qualify as Employees; whether another defined term provides
equivalent coverage; whether an endorsement expands or restricts the
Employee definition; whether an independent-contractor exclusion actually
removes otherwise-available coverage; which provision controls when
language conflicts; whether relevant forms/endorsements are missing; or
whether the document is complete enough to determine final operative
coverage. Do not guess.

## Guardrails
- **Inclusion does not end the analysis.** Finding "Employee includes
  independent contractors" does not automatically mean PASS — still search
  for subsequent endorsements, exclusions, or limitations that take
  coverage away.
- **Exclusion terminology must be interpreted.** The mere appearance of
  "independent contractor" within an exclusion does not automatically mean
  coverage has been removed — determine the actual effect.
- **Don't confuse this rule with EPLI-003 (Third-Party EPLI).** Independent
  contractors may be treated differently depending on the form —
  EPLI-003's evidence does not establish EPLI-004's result unless the
  language specifically establishes the independent-contractor coverage
  this rule requires.

## Evidence & confidence requirements
Every result should be able to answer, even if only in the Finding prose:
whether an Employee definition was identified; whether independent
contractors are included (Yes/No/Uncertain); whether a coverage-expanding
endorsement exists; whether an exclusion/limitation exists; and the final
coverage determination (Included / Not Included / Restricted / Uncertain).
Cite definition evidence, endorsement evidence, and exclusion evidence
separately when applicable, using labeled Evidence entries. Include a
confidence level.

## Notes
None.
