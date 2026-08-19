---
name: do-006-nuclear-radioactive-exclusion
description: Checks whether a Private Company D&O policy or quote contains an operative nuclear/radioactive-materials exclusion. Use when D&O coverage has been classified PRESENT by RULE-000, to flag an exclusion that remains in effect and recommend requesting its removal.
---

# DO-006 — Nuclear / Radioactive Materials Exclusion

## Rule ID
`DO-006`

## Rule Name
`Nuclear-Based Exclusion`

## Coverage Module
`Private Company D&O`

## Rule Type
`Coverage Optimization`

## Objective
Determine whether the Private Company D&O policy or quote contains an
exclusion relating to nuclear hazards, nuclear materials, radiation,
radioactive contamination, or materially equivalent nuclear-related
exposures. If present and operative, flag it and recommend requesting its
removal.

## Search concepts / terminology
Review the entire policy, including endorsements, searching semantically
for: Nuclear / Nuclear Energy / Nuclear Hazard / Nuclear Material /
Nuclear Facility / Nuclear Reaction / Nuclear Incident / Radioactive /
Radioactivity / Radiation / Ionizing Radiation / Radioactive
Contamination / Nuclear Fuel / Nuclear Waste / Fission / Fusion / similar
nuclear or radioactive-material exclusionary language. Do not require the
exclusion to literally be titled "Nuclear Exclusion."

## Decision steps
1. Locate nuclear/radioactive-related exclusionary language and determine
   whether it actually excludes or restricts coverage under the
   applicable D&O coverage part.
2. Review endorsements for any deletion, replacement, modification, or
   carve-back affecting the exclusion.

---

## Status logic

### 🟢 PASS
Triggered when: no applicable Nuclear-Based Exclusion is identified.

Output: a Finding ("No applicable Nuclear-Based Exclusion identified.").
No Recommendation.

### ⚠️ OPTIMIZATION
Triggered when: an applicable nuclear/radiation-related exclusion is
identified and remains operative.

Output: a Finding, a Recommendation, and Evidence for the exclusion.

> Recommendation text: "Consider requesting removal of the Nuclear-Based
> Exclusion."

### 🟡 MANUAL_REVIEW
Triggered when: nuclear terminology exists but its effect on D&O coverage
is unclear; CoverageIQ cannot determine whether an endorsement modifies
the exclusion; the provision's applicability is ambiguous; relevant forms
appear to be missing; or conflicting provisions cannot reliably be
reconciled. Do not guess.

## Evidence & confidence requirements
Every result should be able to answer, even if only in the Finding prose,
whether a Nuclear-Based Exclusion was identified (Yes/No/Uncertain) and
whether a modification or deletion of it was identified (Yes/No/Uncertain).
Include a confidence level.

## Notes
None.
