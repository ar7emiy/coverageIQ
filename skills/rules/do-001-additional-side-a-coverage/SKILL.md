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
4. If not found in Step 1, before concluding OPTIMIZATION *or* reaching for
   MANUAL_REVIEW, check whether the wording's own extensions/coverage-
   extensions section and limit-structure language (e.g. a General
   Provisions clause stating the limit) give a complete-enough picture to
   rule out a hidden Side A layer on their own — a missing declarations
   page doesn't automatically mean this can't be determined; see the
   MANUAL_REVIEW logic below for exactly where the line falls.

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
Triggered when CoverageIQ genuinely cannot determine whether Additional
Side A coverage exists — as opposed to having reliably reviewed the
document and found none. These are different outcomes, not the same thing
phrased two ways:

- **Reliably reviewed and found none → OPTIMIZATION, not MANUAL_REVIEW.**
  If the document's own extensions, insuring agreements, and limit-
  structure language (e.g. an explicit "one combined aggregate limit
  applies to all coverage parts" statement, or a fully enumerated
  Extensions/Coverage Extensions section with no Side A-related grant among
  them) are complete enough to rule out a distinct Side A DIC/excess/non-
  indemnifiable-loss layer, that's a reliable "not identified" finding —
  even when the document lacks a declarations page. A missing declarations
  page only excuses the specific fact it would supply (the *dollar amount*
  of a confirmed grant) — it doesn't cast doubt on a conclusion the
  wording's own text already answers. See "Missing declarations/schedule ≠
  blanket uncertainty" in `skills/AGENT_SYSTEM_INSTRUCTIONS.md`.
- **Genuinely can't tell → MANUAL_REVIEW.** Use this when the wording
  itself points to something missing that's actually needed to resolve
  *this* determination — e.g. it references an attached excess/DIC policy
  or a Schedule of Forms that isn't included, so whether that layer exists
  can't be confirmed either way; or the extensions/limit-structure language
  is itself incomplete, silent, or ambiguous about whether a separate Side
  A layer could exist.

Output: Reasoning explaining what's missing or unclear — and, for the first
case above, explaining *why* the review counts as reliable despite the
missing declarations page (what was checked, and why it was sufficient).
Include Evidence only if there's a specific passage worth citing.

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

This rule was also the source of a real inconsistency caught during testing:
against two different real specimen wordings, both missing a declarations
page, this rule reached MANUAL_REVIEW on one and a confident OPTIMIZATION
on the other — same rule, same kind of incompleteness, different outcome.
The MANUAL_REVIEW logic above was rewritten to fix that (see "Missing
declarations/schedule ≠ blanket uncertainty" in AGENT_SYSTEM_INSTRUCTIONS.md
for the general principle this rule was the concrete trigger for).
