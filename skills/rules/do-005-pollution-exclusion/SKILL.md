---
name: do-005-pollution-exclusion
description: Checks whether a Private Company D&O policy or quote contains an operative Pollution Exclusion. Use when D&O coverage has been classified PRESENT by RULE-000, to flag an exclusion that remains in effect and recommend requesting its removal.
---

# DO-005 — Pollution Exclusion

## Rule ID
`DO-005`

## Rule Name
`Pollution Exclusion`

## Coverage Module
`Private Company D&O`

## Rule Type
`Coverage Optimization`

## Objective
Determine whether the Private Company D&O policy or quote contains a
Pollution Exclusion or materially equivalent exclusion. A Pollution
Exclusion is common in Private Company D&O forms — actively search the
entire policy, including endorsements, for pollution-related exclusions
and determine whether one applies to the D&O coverage.

## Search concepts / terminology
Search semantically for: Pollution / Pollutants / Pollution Exclusion /
Contamination / Contaminants / Discharge / Dispersal / Seepage / Migration
/ Release or Escape / Environmental Damage / Hazardous Substances / Toxic
Chemicals / Waste / similar environmental or pollution-related
exclusionary language. Do not require the provision to literally be titled
"Pollution Exclusion." The identified language must actually operate to
exclude or restrict D&O coverage — the mere appearance of "pollution"
elsewhere in the document does not establish an applicable exclusion.

## Decision steps
1. Locate a Pollution Exclusion (or materially equivalent) that operates
   against the D&O coverage.
2. If found, review the entire document for endorsements that delete,
   replace, modify, or otherwise alter the exclusion.
3. Determine whether the exclusion remains operative after accounting for
   any such endorsements.

---

## Status logic

### 🟢 PASS
Triggered when: a reliable review completes and no applicable Pollution
Exclusion is identified.

Output: a Finding ("No applicable Pollution Exclusion identified."). No
Recommendation.

### ⚠️ OPTIMIZATION
Triggered when: an applicable Pollution Exclusion is identified and
remains operative.

Output: a Finding identifying the exclusion, a Recommendation, and
Evidence for the exclusion.

> Recommendation text: "Consider requesting removal of the Pollution
> Exclusion."

### 🟡 MANUAL_REVIEW
Triggered when CoverageIQ cannot reliably determine: whether pollution
language constitutes an exclusion; whether the exclusion applies to the
relevant D&O coverage; whether an endorsement modifies or removes the
exclusion; whether conflicting provisions supersede one another; or
whether relevant forms or endorsements are missing. Do not guess.

## Evidence & confidence requirements
Every result should be able to answer, even if only in the Finding prose,
whether a Pollution Exclusion was identified (Yes/No/Uncertain) and
whether a modification or deletion of it was identified (Yes/No/Uncertain).
Include a confidence level.

## Notes
None.
