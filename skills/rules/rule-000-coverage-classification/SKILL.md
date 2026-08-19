---
name: rule-000-coverage-classification
description: Classifies whether the uploaded policy or quote provides Private Company D&O, EPLI, Fiduciary Liability, and/or Crime coverage. Use first, before any other CoverageIQ rule, on every document — its PRESENT/NOT_PRESENT/MANUAL_REVIEW classification determines which other rule families (DO-*, EPLI-*, FI-*, CR-*) are allowed to execute.
---

# RULE-000 — Coverage Classification

This rule doesn't fit `RULE_TEMPLATE.md`'s single PASS/OPTIMIZATION/
MANUAL_REVIEW shape — it classifies four coverage modules independently and
gates which other rules are even allowed to run. It gets its own structure.

## Rule ID
`RULE-000`

## Rule Name
`Coverage Classification`

## Rule Type
`Pre-Analysis / Coverage Classification`

## Execution Priority
**FIRST — MANDATORY.** Every other rule (`DO-*`, `EPLI-*`, `FI-*`, `CR-*`, and
any future family) runs only after RULE-000 has produced a final
classification. See "Downstream rule gating" below and
`skills/AGENT_SYSTEM_INSTRUCTIONS.md`.

## Applies to
All CoverageIQ D&O / Management Liability policy and quote analyses.

## Objective
Before any coverage-optimization rule runs, determine which coverage
modules the uploaded policy or quote actually **provides** — not merely
which coverage *language* appears in the form. Classify four modules
independently:
- Private Company D&O
- Employment Practices Liability (EPLI)
- Fiduciary Liability
- Crime

## Mandatory full-document review
Review the entire available document before finalizing any classification —
declarations, quote/declaration pages, coverage schedules, premium
schedules, limits, retentions/deductibles, insuring agreements, coverage
parts, endorsements, forms schedules, definitions, exclusions, sublimits,
notices, and any indication coverage is selected, purchased, included,
declined, or not applicable. Do not finalize based only on the declarations
page or first few pages — preliminary classifications may form while
processing, but only finalize after full review and evidence reconciliation.

## Search concepts / terminology per module

**D&O** — Directors & Officers Liability, Directors and Officers Liability,
D&O, D&O Liability, Private Company D&O, Private Company Management
Liability, Management Liability — D&O, Executive Liability, Executive
Protection, Directors, Officers and Company Liability, Organization
Liability, Company Liability. *The mere presence of Side A/B/C language
does not establish that D&O coverage was purchased.*

**EPLI** — Employment Practices Liability, Employment Practices Liability
Insurance, EPL, EPLI, Employment Liability, Employment Practices Coverage,
Wrongful Employment Practices, Employment Practices Wrongful Acts. Also
evaluate EPLI-specific limits, retentions, premiums, insuring agreements,
endorsements, third-party EPL provisions, employment-related exclusions,
coverage schedules.

**Fiduciary Liability** — Fiduciary Liability, Fiduciary Liability
Insurance, Fiduciary Coverage, ERISA Fiduciary Liability, Employee Benefit
Plan Fiduciary Liability, Benefit Plan Fiduciary Liability, Fiduciary
Wrongful Act. Also evaluate coverage-specific limits, premiums, retentions,
insuring agreements, endorsements, coverage parts.

**Crime** — Crime, Commercial Crime, Crime Coverage, Crime Insurance,
Fidelity, Employee Theft, Employee Dishonesty, Computer Fraud, Funds
Transfer Fraud, Forgery or Alteration. Crime may consist of multiple
separately scheduled insuring agreements, limits, or sublimits — structured
differently from D&O/EPLI/Fiduciary.

## Evidence collection & hierarchy
Collect affirmative, negative, and supporting evidence for each module
before assigning a final classification. Do not count keyword occurrences —
evaluate what the language means in context.

**Tier 1 — Affirmative/conclusive**: coverage + limit (e.g. "Directors &
Officers Liability — $2,000,000"); explicit coverage-selection language
(Included/Purchased/Covered/Selected/Coverage Provided/Applies/Yes) clearly
associated with the module; coverage + premium explicitly allocated to that
module (subject to Combined Premium handling below); a coverage-specific
declarations page or schedule; an affirmative coverage endorsement.

**Tier 2 — Strong supporting**: coverage-specific retention, deductible,
insuring agreement, endorsement, sublimit, exclusions, definitions, claims
provisions. Strongly supports the module but should be reconciled with
Tier 1 evidence when available.

**Tier 3 — Incidental (never sufficient alone)**: Side A/B/C wording in a
generic modular form, generic references to Directors/Officers/Employees,
ERISA terminology in exclusions/definitions, Crime terminology appearing
incidentally, defined terms for modules not actually purchased, generic
insuring agreements in an unselected modular form. Tier 3 evidence must
never independently establish PRESENT.

**Negative evidence** — actively search for it: Not Purchased, Not Covered,
Not Included, Not Selected, Declined, N/A, No Coverage, $0 Limit, Coverage
Part Not Applicable. Explicit negative evidence generally overrides
incidental policy-form language — e.g. "EPLI — NOT PURCHASED" plus a later
generic EPLI insuring agreement appearing in the form still classifies as
NOT_PRESENT, not PRESENT.

## Combined / package premium handling (mandatory guardrail)
A single combined premium (e.g. "Management Liability Package Premium —
$18,500") may apply to any subset of D&O/EPLI/Fiduciary. **The number of
premiums must never be used to determine the number of coverage modules
provided.** Do not reason "only one premium exists, therefore only one
coverage exists," and do not reason "a Management Liability premium exists,
therefore every Management Liability coverage is included." When a package
premium exists, keep searching for coverage-specific evidence (limits,
retentions, coverage selections, schedules, insuring agreements,
endorsements, sublimits, declarations). Premium structure and coverage
structure are evaluated independently. Report premium as `Combined` rather
than incorrectly allocating it among modules.

## Retention handling
Different modules may carry different retentions in the same policy (e.g.
D&O $25,000 / EPLI $50,000 / Fiduciary $10,000) — a strong indicator
multiple modules are present, but a retention appearing somewhere in a
generic form is not itself sufficient; it must be reasonably associated
with the applicable module.

## Evidence reconciliation & conflict handling
Evaluate the document as a whole — do not classify on the first relevant
term encountered. Sequence: identify evidence → record evidence → continue
full-document review → identify conflicting evidence → reconcile evidence →
finalize classification. Later endorsements may modify, add, remove, or
clarify coverage identified earlier in the document.

If evidence conflicts (e.g. declarations say "EPLI — Not Purchased" but a
later endorsement says "Employment Practices Liability Coverage Added"),
investigate whether the endorsement affirmatively modifies the
declarations. If the relationship can't be reliably determined, classify
MANUAL_REVIEW and provide both pieces of conflicting evidence.

---

## Status logic (per module — every module gets exactly one)

### 🟢 PRESENT
Sufficient affirmative evidence establishes the coverage is provided. Cite
the strongest evidence supporting the classification.

### ⚪ NOT_PRESENT
Sufficient evidence establishes the coverage is *not* provided (explicitly
marked Not Purchased/Not Covered/declined, or a complete coverage schedule
clearly showing the module isn't selected). The absence of a keyword alone
is not sufficient to establish NOT_PRESENT — that's MANUAL_REVIEW territory
unless there's genuine negative evidence.

### 🟡 MANUAL_REVIEW
Cannot reliably determine PRESENT vs. NOT_PRESENT: conflicting evidence,
ambiguous coverage schedule, coverage language exists but purchase can't be
established, limits can't be reliably associated with a module, missing
declarations/endorsements, poor document quality, incomplete quote, unclear
package premium allocation. Explain why manual review is required.

## Confidence
- **High** — strong affirmative or negative evidence clearly establishes
  the classification.
- **Medium** — multiple supporting indicators strongly suggest the
  classification, but direct evidence is less explicit.
- **Low** — evidence is incomplete, ambiguous, or conflicting. Low
  confidence should generally *result in* MANUAL_REVIEW rather than a
  definitive PRESENT/NOT_PRESENT.

## Guardrails — never assume
Side A/B/C language → D&O purchased. Employment definitions → EPLI
purchased. ERISA terminology → Fiduciary purchased. Employee Theft language
→ Crime purchased. A Management Liability policy → all four modules
purchased. One premium → one coverage. Package premium → all available
modules purchased. No evidence found → coverage definitely absent.

## Downstream rule gating
RULE-000's classification controls which optimization rules execute at
all:

| Module classification | Rules executed |
|---|---|
| D&O = PRESENT | `DO-*` (DO-001, DO-002, DO-003, DO-004, and future D&O rules) |
| EPLI = PRESENT | `EPLI-*` |
| Fiduciary = PRESENT | `FI-*` |
| Crime = PRESENT | `CR-*` |
| Any module = NOT_PRESENT | that module's rule family does not execute at all — no sections are produced for it |
| Any module = MANUAL_REVIEW | that module's rule family does not execute — do not silently treat as present or absent; the classification itself is the flag for broker review |

## Required output — Coverage Snapshot
Before any optimization findings, RULE-000 must produce a Coverage
Snapshot with exactly one entry per module, **always all four, every time**
(even when NOT_PRESENT), so downstream tooling can always render all four:

```
Coverage: <module name>
Status: PRESENT | NOT_PRESENT | MANUAL_REVIEW
Limit(s):
Retention(s):
Premium: Coverage-Specific | Combined | Not Identified
Evidence: "..."   (repeatable, labeled Primary/Supporting/Negative as needed)
Confidence: HIGH | MEDIUM | LOW
```

See `skills/AGENT_SYSTEM_INSTRUCTIONS.md` for the exact machine-readable
format this maps to in the analysis file.

## Validation checklist
Before RULE-000 completes: entire available document reviewed; D&O, EPLI,
Fiduciary, and Crime each evaluated; limits, retentions, and premium
structure reviewed; combined premiums handled per the guardrail above;
coverage schedules and applicable endorsements reviewed; negative coverage
indicators reviewed; conflicting evidence reconciled; evidence captured and
confidence assigned for each classification; applicable downstream modules
selected. Only after this may CoverageIQ proceed to optimization analysis.

## Core instruction (one-line summary)
Review the entire document and determine what coverage was actually
purchased or provided. Do not classify coverage merely because
corresponding policy language exists. Evaluate limits, retentions,
premiums, coverage selections, declarations, schedules, insuring
agreements, endorsements, exclusions, and other evidence together. A single
combined premium may apply to multiple coverage modules and must never be
interpreted as evidence that only one coverage exists. When evidence is
insufficient or conflicting, return MANUAL_REVIEW rather than guessing.

## Notes
Flagged by the author as the system's gatekeeper — next validation step is
stress-testing against ~10–20 real carrier quotes/policies (especially
modular management liability products) to surface carrier-specific
classification edge cases not yet anticipated.
