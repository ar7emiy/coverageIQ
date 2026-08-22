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
for: Nuclear / Nuclear Energy / Nuclear Energy Liability / Nuclear Hazard /
Nuclear Material / Nuclear Facility / Nuclear Reaction / Nuclear Incident /
Radioactive / Radioactivity / Radiation / Ionizing Radiation / Radioactive
Contamination / Nuclear Fuel / Nuclear Waste / Fission / Fusion / similar
nuclear or radioactive-material exclusionary language. Do not require the
exclusion to literally be titled "Nuclear Exclusion" — it is commonly
folded into a broader "War, Terrorism, and Nuclear" or "War and Nuclear
Hazard" exclusion rather than standing alone. Also recognize references to
the standard-form or industry-pool names sometimes used as shorthand for
this exclusion: Nuclear Energy Liability Exclusion / NEIL / MAELU
(Mutual Atomic Energy Liability Underwriters) / ANI (American Nuclear
Insurers) / Price-Anderson Act — a reference to any of these is evidence of
this exclusion even without the word "nuclear" appearing nearby.

**Efficiency note — check first whether DO-005 already found the answer.**
In real testing, nuclear/radioactive language turned up folded into the
*same* broad "Pollutants" or hazardous-substances definition that DO-005
(Pollution Exclusion) evaluates — one definition sweeping in both pollution
and nuclear/radiological material, with the exclusionary effect living in
neither section's caption but in how that definition is used elsewhere
(e.g. carved out of what counts as recoverable "Loss"). If DO-005 already
located and read that definition for this same document, re-read it here
for nuclear/radiological language rather than re-searching the whole
document from scratch — they're often one inferential step apart, not two
independent searches.

## Decision steps
1. Locate nuclear/radioactive-related exclusionary language and determine
   whether it actually excludes or restricts coverage under the
   applicable D&O coverage part.
2. Review endorsements for any deletion, replacement, modification, or
   carve-back affecting the exclusion.

---

## Status logic

### 🟢 PASS
Triggered when: a reliable full-document review completes and no applicable
Nuclear-Based Exclusion is identified — a missing declarations page or
schedule doesn't by itself prevent this conclusion; see AGENT_SYSTEM_
INSTRUCTIONS.md's "Missing declarations/schedule ≠ blanket uncertainty."

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
