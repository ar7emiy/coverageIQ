---
name: epli-002-bipa-biometric
description: Checks whether an EPLI policy's BIPA/biometric-information exclusion, if any, is offset by at least $50,000 of restored coverage. Use when EPLI coverage has been classified PRESENT by RULE-000, to flag an unrestored exclusion or insufficient restored coverage.
---

# EPLI-002 — BIPA / Biometric Information Coverage

## Rule ID
`EPLI-002`

## Rule Name
`BIPA / Biometric Information Coverage`

## Coverage Module
`Employment Practices Liability (EPLI)`

## Rule Type
`Coverage Enhancement / Optimization`

## Objective
Determine whether the EPLI policy or quote contains an exclusion
applicable to BIPA, biometric information, biometric identifiers, or
materially equivalent biometric privacy exposures, and whether coverage is
restored through a sublimit, carve-back, endorsement, or other affirmative
coverage provision. The minimum acceptable standard is **$50,000** of
applicable BIPA/biometric coverage.

## Search concepts / terminology
Review declarations, EPLI coverage schedules, sublimit schedules, insuring
agreements, exclusions, endorsements, carve-backs, definitions,
supplemental coverage provisions, and amendatory endorsements. Search
semantically for: BIPA / Biometric Information Privacy Act / Illinois
Biometric Information Privacy Act / Biometric Information / Biometric
Identifier / Biometric Data / Biometric Privacy / Fingerprint(s) /
Voiceprint(s) / Retina Scan / Iris Scan / Facial Geometry / Face Geometry
/ Facial Recognition / Hand Geometry / Biometric Characteristics /
collection or disclosure of biometric information / similar biometric
privacy terminology. Recognize materially equivalent language even when
BIPA is not expressly named.

## Decision steps
1. Determine whether an exclusion actually operates against BIPA or
   biometric-related claims (standalone BIPA exclusion, Biometric
   Information exclusion, Privacy exclusion, statutory exclusion naming
   BIPA, part of a broader confidential/privacy exclusion, or within an
   endorsement). The mere appearance of "BIPA" or "biometric information"
   does not establish that an exclusion exists — evaluate in context.
2. **If an exclusion exists, do not stop there** — search the entire
   document for provisions that restore coverage: a BIPA/Biometric
   sublimit, a Defense Costs sublimit, a carve-back to the exclusion, or
   an endorsement providing BIPA/biometric privacy coverage. Confirm the
   provision actually restores coverage for the exposure affected by the
   exclusion.
3. If BIPA/Biometric coverage is identified (with or without an
   underlying exclusion), determine the applicable limit or sublimit
   against the **$50,000 minimum**, establishing that the amount actually
   applies to this coverage.

Required sequence: find exclusion → read and understand it → search
endorsements/schedules for restored coverage → identify applicable limit
→ apply the $50K threshold.

---

## Status logic

### 🟢 PASS — BIPA/Biometric Coverage ≥ $50,000
Triggered when: applicable BIPA/Biometric coverage is affirmatively
identified with a limit or sublimit of $50,000 or greater — whether or not
a BIPA exclusion also exists (if it does, note that coverage was restored
through a qualifying sublimit/carve-back).

Output: a Finding (e.g. "BIPA / Biometric Information coverage identified
— $100,000 sublimit."), plus Evidence for both the exclusion (if any) and
the restoring provision. No Recommendation.

### ⚠️ OPTIMIZATION — Exclusion With No Restoration, or Below Threshold
Two triggers, both OPTIMIZATION:
- A BIPA/Biometric exclusion is identified and no qualifying sublimit,
  carve-back, or other coverage restoration is identified.
- Some BIPA/Biometric coverage is provided but the limit is below
  $50,000.

Output: a Finding, a Recommendation, and Evidence for the exclusion and/or
the below-threshold coverage.

> Recommendation text (no restoration): "Consider requesting removal of
> the BIPA / Biometric Information exclusion and replacement with a
> sublimit of at least $50,000."
>
> Recommendation text (below threshold): "Consider requesting BIPA /
> Biometric Information coverage with a sublimit of at least $50,000."
> Display the current limit alongside the recommendation.

### 🟡 MANUAL_REVIEW
Triggered when CoverageIQ cannot reliably determine: whether identified
language constitutes a BIPA/Biometric exclusion; whether a broader privacy
exclusion encompasses BIPA claims; whether an endorsement modifies or
supersedes the exclusion; whether a carve-back actually restores
BIPA/Biometric coverage; whether identified coverage is indemnity,
Defense Costs only, or another form of protection; the applicable limit;
whether relevant EPLI forms/endorsements are complete; or how conflicting
provisions interact. Do not guess.

## Guardrails
- **Biometric language ≠ exclusion.** A reference to biometric
  information in a definition, coverage grant, or endorsement must not
  automatically be classified as an exclusion.
- **$50,000 is the minimum passing threshold, exactly**: $50,000 passes,
  $49,999 does not; an exclusion with $0 restored coverage is OPTIMIZATION.
- **Evidence must establish the relationship** between an exclusion and a
  restoring provision — do not assume that two nearby references relate to
  one another (e.g. a base-form BIPA exclusion and an endorsement's
  $50,000 biometric sublimit must be shown to actually connect before
  assigning PASS).

## Evidence & confidence requirements
Every result should be able to answer, even if only in the Finding prose:
whether a BIPA/Biometric exclusion was identified (Yes/No/Uncertain),
whether coverage restoration was identified (Yes/No/Uncertain), the
coverage type (Full Coverage / Sublimit / Defense Costs / Carve-Back /
Other), and the limit/sublimit. Cite exclusion evidence and coverage
evidence separately when applicable, using labeled Evidence entries.
Include a confidence level.

## Notes
Open edge case (not yet encoded — flagged by the SME for a future
decision): what should happen when there is **no BIPA exclusion at all**?
Current lean is PASS if a reliable review establishes no applicable
exclusion exists, but this isn't decided yet — treat as MANUAL_REVIEW
until an administrator confirms the intended behavior.
