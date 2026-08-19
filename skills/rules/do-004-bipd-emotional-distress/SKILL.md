---
name: do-004-bipd-emotional-distress
description: Checks whether a Private Company D&O policy's Bodily Injury/Property Damage exclusion preserves coverage for emotional distress claims via a carve-back. Use when D&O coverage has been classified PRESENT by RULE-000, to flag a BI/PD exclusion with no emotional distress exception.
---

# DO-004 — BI/PD Exclusion / Emotional Distress Carve-Back

## Rule ID
`DO-004`

## Rule Name
`BI/PD Exclusion / Emotional Distress Carve-Back`

## Coverage Module
`Private Company D&O`

## Rule Type
`Coverage Optimization`

## Objective
Determine whether the Private Company D&O policy or quote contains a
Bodily Injury / Property Damage (BI/PD) exclusion and, if present, whether
the exclusion contains a carve-back preserving coverage for emotional
distress or materially similar non-physical injury.

A BI/PD exclusion is common and should not, by itself, be treated as an
optimization issue.

## Search concepts / terminology
**Step 1 — locate the BI/PD exclusion.** Review the policy, quote, base
form, and applicable endorsements for a BI/PD exclusion or materially
equivalent provision. Search semantically for concepts including:
- Bodily Injury / Property Damage / BI/PD
- Physical Injury / Sickness / Disease / Death
- Damage to or destruction of tangible property
- Loss of use of tangible property
- Similar language excluding claims arising from bodily injury or property
  damage

Do not require the exclusion to literally be titled "Bodily Injury /
Property Damage Exclusion."

**Step 3 — search for an emotional distress carve-back.** If a BI/PD
exclusion is identified, analyze it and any endorsements modifying it for
an exception preserving coverage for emotional distress. Search
semantically for concepts including:
- Emotional Distress / Mental Anguish / Mental Injury / Mental Distress
- Emotional Harm / Humiliation / Mental Suffering
- Mental or Emotional Injury
- Similar non-physical injury concepts

The language must actually function as an exception/carve-back to the
BI/PD exclusion — the mere appearance of "emotional distress" elsewhere in
the policy does not satisfy this rule.

## Decision steps
1. Locate the BI/PD exclusion (Step 1).
2. If no BI/PD exclusion is identified after a reliable review, see the
   PASS logic below — do not proceed to Step 3.
3. If identified, search for an emotional distress carve-back within it
   and its endorsements (Step 3).

**Important guardrail:** follow this sequence — find BI/PD exclusion → read
the actual exclusion → search for emotional distress carve-back → check
applicable endorsements → determine status. Do not search the document
globally for "emotional distress" and assume its presence satisfies the
rule; the language needs to preserve coverage specifically in relation to
the BI/PD exclusion.

---

## Status logic

### 🟢 PASS
Two distinct triggers both return PASS:
- **No BI/PD exclusion identified** after a reliable review. Output a
  Finding: "No Bodily Injury / Property Damage exclusion identified." No
  Recommendation. Provide the basis for the finding where appropriate.
- **BI/PD exclusion identified AND an emotional distress carve-back (or
  materially equivalent exception) is present.** Output a Finding (e.g.
  "Bodily Injury / Property Damage exclusion identified. Emotional
  distress carve-back is present.") plus Evidence for the carve-back
  language. No Recommendation.

### ⚠️ OPTIMIZATION
Triggered when: a BI/PD exclusion is identified **and** no emotional
distress or materially equivalent carve-back is identified.

Output a Finding, a Recommendation, Reasoning, and Evidence for the
exclusion.

> Recommendation text: "Consider requesting an emotional distress
> carve-back to the Bodily Injury / Property Damage exclusion."

### 🟡 MANUAL_REVIEW
Return MANUAL_REVIEW when CoverageIQ cannot reliably determine:
- Whether a BI/PD exclusion exists.
- Whether identified language actually functions as a BI/PD exclusion.
- Whether an endorsement modifies or replaces the exclusion.
- Whether emotional distress language constitutes a true carve-back.
- Whether relevant forms or endorsements are missing.

Do not guess. If the document is incomplete, illegible, or conflicting,
return MANUAL_REVIEW rather than reporting that no exclusion exists.

## Evidence & confidence requirements
Every result should be able to answer, even if only in the Finding/Reasoning
prose: whether a BI/PD exclusion was identified (Yes/No/Uncertain) and
whether an emotional distress carve-back was identified (Yes/No/Uncertain).
Include a confidence level.

## Notes
Core logic summary: no BI/PD exclusion → PASS (no issue). BI/PD + carve-back
→ PASS. BI/PD + no carve-back → OPTIMIZATION. Unclear → MANUAL_REVIEW.
