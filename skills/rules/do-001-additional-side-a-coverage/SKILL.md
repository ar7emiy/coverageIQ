---
name: do-001-additional-side-a-coverage
description: Checks whether a Private Company D&O policy or quote provides Additional Side A coverage of at least $1,000,000. Use when D&O coverage has been classified PRESENT by RULE-000, to flag missing or insufficient dedicated Side A limits.
---

# DO-001 — Additional Side A Coverage

## Rule ID
`DO-001`

## Rule Name
`Additional Side A Coverage`

## Coverage Module
`Private Company D&O`

## Rule Type
`Coverage Optimization`

## Objective
Determine whether the policy or quote provides Additional Side A coverage
and, if so, whether the Additional Side A limit is at least $1,000,000.

## Search concepts / terminology
Most real policies do **not** use the phrase "Additional Side A" at all —
recognize the underlying mechanism (a limit of liability that responds only
to non-indemnifiable/uninsured Side A loss, on top of or independent from
the primary ABC tower) under whatever label the carrier gives it:
- **Side A Difference-in-Conditions (DIC)** / **Side A DIC** / **Excess
  Side A DIC** — very commonly written as its own coverage part or even a
  wholly separate attached policy form, not a line item inside the base
  D&O form.
- **Non-Indemnifiable Loss Coverage** / **Non-Indemnifiable Loss Policy** —
  describes the trigger (loss the company cannot or will not indemnify)
  rather than "Side A," but is the same mechanism.
- **Independent Director Liability (IDL) Coverage** — some carriers
  package this specifically for outside/independent directors.
- **Excess Side A Only Coverage** / **Side A Excess Policy** / **Broadened
  Side A Coverage** / **Difference in Conditions and Difference in Limits
  (DIC/DIL)**.
- **Additional Limit of Liability for Directors and Officers** or similar
  declarations line items that only make sense once you recognize the
  trigger language: coverage that "drops down" or responds when
  (a) indemnification by the Company is not available, not permitted, or
  not paid, or (b) the primary/underlying D&O insurance fails to pay for
  any reason (rescission, insolvency, dispute, exhaustion, etc.).
- Also recognize plain "Additional Side A" / "Additional Side A Limit of
  Liability" / "Dedicated Side A" / "Separate Side A Limit" where a carrier
  does use that literal phrasing.

**Where it typically lives:** check the declarations page for a distinct
limit line separate from the primary ABC limit, the schedule of forms for a
separately attached DIC policy or endorsement, and any "Excess" or
"Additional" coverage part — not just the base insuring-agreement section
where ordinary Side A/B/C appears.

**Important distinction:** this rule concerns *additional/excess* Side A
capacity beyond the ordinary ABC tower, not the ordinary Side A insuring
agreement itself. The existence of standard Side A/B/C language alone does
not satisfy this rule — but don't let that distinction cause you to
overlook a genuinely separate Side A DIC/excess policy just because it
doesn't use the word "Additional."

## Decision steps
1. Search the document for Additional Side A coverage using the concepts
   above — the mechanism (drop-down non-indemnifiable/excess Side A
   protection), not just the literal phrase "Additional Side A." Check
   declarations, the forms/endorsement schedule, and any separately
   attached policy, not only the base insuring agreement.
2. If found, identify the stated limit of liability for that coverage.
3. Compare the identified limit against the $1,000,000 target.

---

## Status logic

### 🟢 PASS
Triggered when: Additional Side A coverage is identified with a limit ≥
$1,000,000.

Output: a Finding stating the identified limit, plus Evidence showing that
limit. No Recommendation.

### ⚠️ OPTIMIZATION
Triggered when either:
- Additional Side A coverage is identified but the limit is > $0 and <
  $1,000,000, or
- No Additional Side A coverage is identified at all.

Output: a Finding, a Recommendation, and Reasoning. Include Evidence when
there's a specific passage to cite (e.g. the identified below-target limit).

> Recommendation text (limit below target): "Consider requesting an
> increase in Additional Side A coverage to at least $1,000,000, or more
> where available."
>
> Recommendation text (no coverage identified): "Consider requesting the
> addition of at least $1,000,000 of Additional Side A coverage, or more
> where available."

### 🟡 MANUAL_REVIEW
Triggered when: the document is incomplete or the applicable language
cannot be reliably determined. Do not assume the coverage is absent merely
because the document is incomplete — use MANUAL_REVIEW instead of
OPTIMIZATION in that case.

Output: Reasoning explaining what's missing or unclear. Include Evidence
only if there's a specific passage worth citing.

## Evidence & confidence requirements
Every result must cite the relevant policy/quote language, the identified
limit if applicable, and a confidence level. Page number and
section/endorsement should be included in the Evidence citation when
available.

## Notes
This is the rule most likely to produce a false OPTIMIZATION if searched
too literally — see `skills/AGENT_SYSTEM_INSTRUCTIONS.md`'s "Read policies
like an underwriter, not a keyword matcher." A policy that genuinely has
$2M of Side A DIC coverage under a completely separate attached form is not
missing this coverage just because it never uses the word "Additional."
