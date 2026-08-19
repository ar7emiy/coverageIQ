---
name: epli-003-third-party-epli
description: Checks whether an EPLI policy affirmatively covers Third-Party Wrongful Acts (discrimination/harassment claims by non-employees). Use when EPLI coverage has been classified PRESENT by RULE-000, to flag missing or excluded Third-Party EPLI coverage.
---

# EPLI-003 — Third-Party Employment Practices Liability

## Rule ID
`EPLI-003`

## Rule Name
`Third-Party EPLI / Third-Party Wrongful Act`

## Coverage Module
`Employment Practices Liability (EPLI)`

## Rule Type
`Coverage Optimization`

## Objective
Determine whether the EPLI coverage includes protection for Third-Party
Wrongful Acts or materially equivalent claims involving individuals who
are not employees of the insured organization. Third-Party EPLI should be
treated as an expected feature of the base EPLI form. There is **no
minimum dollar threshold** for this rule (see Guardrails).

## Search concepts / terminology
Review EPLI insuring agreements, definitions, coverage extensions,
endorsements, exclusions, declarations, coverage schedules, and amendatory
endorsements. Search semantically for: Third-Party Wrongful Act /
Third-Party Employment Practices / Third-Party EPLI / Third-Party
Liability / Third-Party Discrimination / Third-Party Harassment /
discrimination or harassment against a third party / wrongful act against
a third party / similar terminology extending employment-practices
coverage to non-employees. Do not require the literal phrase "Third-Party
Wrongful Act."

Who qualifies as a third party: customers, clients, vendors, suppliers,
service providers, contractors, business invitees, visitors, applicants,
members of the public, or other non-employees. Evaluate the substance of
the definition — the absence of one specific category (e.g. "customer")
should not independently determine the result if the policy otherwise
clearly provides broad Third-Party EPLI coverage.

Covered wrongful acts to look for: discrimination, harassment (including
sexual harassment), hostile environment, retaliation, civil rights
violations, wrongful refusal to provide services, wrongful denial of
access, or wrongful treatment based on protected characteristics —
discrimination and harassment are the core indicators.

## Decision steps
1. Locate Third-Party EPLI language as described above.
2. **Confirm an affirmative coverage grant** — finding a definition of
   "Third-Party Wrongful Act" alone does not establish coverage; trace the
   definition to the applicable EPLI insuring agreement, coverage
   extension, endorsement, or other affirmative coverage grant.
3. Review for exclusions or limitations that materially remove or restrict
   the coverage after it's been affirmatively identified. An endorsement
   that expressly removes Third-Party EPLI overrides generic base-form
   language when it clearly controls.

---

## Status logic

### 🟢 PASS — Third-Party EPLI Identified
Triggered when: coverage affirmatively provides for Third-Party Wrongful
Acts or materially equivalent third-party discrimination/harassment
claims.

Output: a Finding (e.g. "Third-Party EPLI coverage identified. Coverage
includes Third-Party Wrongful Acts involving discrimination and/or
harassment against non-employees."), plus Evidence from the applicable
definition and coverage grant. No Recommendation.

### ⚠️ OPTIMIZATION — Not Provided or Expressly Excluded
Two triggers, both OPTIMIZATION:
- A reliable full-document review determines Third-Party EPLI is not
  provided. If an endorsement affirmatively removes it, cite that
  endorsement as evidence.
- The policy affirmatively excludes or removes Third-Party Wrongful Act
  coverage.

Output: a Finding, a Recommendation, and Evidence.

> Recommendation text (not provided): "Consider requesting the addition of
> Third-Party Employment Practices Liability coverage for claims involving
> discrimination, harassment, and other covered wrongful acts against
> third parties."
>
> Recommendation text (excluded): "Consider requesting removal of the
> Third-Party EPLI limitation or exclusion and addition of Third-Party
> Employment Practices Liability coverage."

### 🟡 MANUAL_REVIEW
Triggered when CoverageIQ cannot reliably determine: whether Third-Party
Wrongful Acts are covered; whether a definition connects to an insuring
agreement; whether materially equivalent terminology constitutes
Third-Party EPLI; whether an endorsement removes or modifies the coverage;
whether coverage applies only to certain categories of third parties;
whether conflicting provisions can be reconciled; or whether relevant EPLI
forms/endorsements are missing. Do not guess.

## Guardrails
- **Definition ≠ coverage.** Finding "Third-Party Wrongful Act means…" is
  strong evidence but must still be traced to an affirmative coverage
  grant.
- **Third party ≠ independent contractor.** Do not automatically treat
  references to independent contractors as proof of Third-Party EPLI —
  they may be treated as insured persons, employees, claimants, or third
  parties depending on the form (see EPLI-004; do not use that rule's
  evidence as a substitute for this one's).
- **Look beyond exact terminology.** A carrier can satisfy this rule by
  covering discrimination/harassment against any customer, client, vendor,
  or other non-employee without ever using the phrase "Third-Party EPLI."
- **No sublimit requirement, currently.** If Third-Party EPLI is
  affirmatively provided, the rule passes unless another provision
  materially removes it — do not fail based on a sublimit amount alone. If
  a Third-Party EPLI sublimit exists, extract and display it, but do not
  treat it as a pass/fail factor absent a future administrator-defined
  threshold.

## Evidence & confidence requirements
Every result should be able to answer, even if only in the Finding prose:
whether Third-Party EPLI was identified (Yes/No/Uncertain), whether a
Third-Party Wrongful Act definition exists (Yes/No/Uncertain), whether an
affirmative coverage grant was identified (Yes/No/Uncertain), the covered
conduct, the covered third parties, and any exclusion/limitation
identified. Cite definition evidence and coverage-grant evidence
separately when applicable, using labeled Evidence entries. Include a
confidence level.

## Notes
The "definition → trace it to the insuring agreement" requirement matters
most here — it prevents concluding that Third-Party Wrongful Act language
buried in a modular base form actually means the insured has Third-Party
EPLI when it doesn't connect to an affirmative coverage grant.
