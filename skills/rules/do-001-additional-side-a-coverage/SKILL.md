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
- **Trigger language, when present, is fairly standardized** even across
  carriers who never say "Side A": look for a grant that responds when Loss
  "is not paid under the Underlying Insurance," or when the underlying
  insurer "refuses in writing to indemnify," "fails to indemnify within
  [some number of] days," or is insolvent/in liquidation/in receivership.
  This is the same mechanism as the definitions above, described in trigger
  terms instead of a coverage-part name.
- **A broadening endorsement to an existing excess layer, not a new limit
  line.** Some carriers deliver this by endorsement onto an *existing*
  excess ABC policy — broadening when that layer responds (dropping down
  for non-indemnifiable loss before the primary is exhausted) rather than
  adding a separately stated Side A limit. If found this way, there may be
  no new dollar figure to extract; the "limit" for this rule is the
  existing excess layer's own limit, and the endorsement modifying its
  trigger is the Evidence to cite.

**Structural fingerprint — use this when no name or trigger language turns
up, but a Schedule of Underlying Insurance / Insurance Program / "Tower" of
policies is present.** In real placements, a dedicated Side A DIC/excess
policy is very often issued as its own policy form under its own policy
number, and appears in the base wording only as a line item in that
schedule — never described in the base wording's own prose at all. When such
a schedule exists, check whether any listed policy could be a Side A-only
layer even under an unfamiliar carrier-specific product name; the
structural tell is that dedicated Side A forms almost always (a) cover
Insured Persons only, not the entity, (b) carry a single Conduct/Fraud
exclusion and few or no others, and (c) have no retention/deductible. Two or
more of these features on a listed policy is a strong signal it's this
coverage, even without the schedule saying so directly — treat it as found
in Step 1 and proceed to identify its limit from the schedule.

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
This is a multi-step identification process, not a single keyword search —
each step below is a different *place* this coverage tends to live, and a
real document may only reveal it through one of them.

1. Search the base wording itself for Additional Side A coverage using the
   concepts and trigger language above — the mechanism, not just the
   literal phrase "Additional Side A." Check declarations, the
   forms/endorsement schedule, and any separately attached policy, not only
   the base insuring agreement.
2. If Step 1 finds nothing, check for a Schedule of Underlying Insurance /
   Insurance Program / "Tower" listing other policies in the program. If
   present, apply the structural-fingerprint check above to each listed
   policy (Insured-Persons-only scope, single Conduct/Fraud exclusion, no
   retention) to see whether one of them is a dedicated Side A layer under
   an unfamiliar name.
3. If found in Step 1 or Step 2, identify the stated limit of liability for
   that coverage (or, for a broadening endorsement on an existing excess
   layer, that layer's own limit).
4. Compare the identified limit against the $1,000,000 target.
5. If nothing is found in Steps 1–2, before concluding OPTIMIZATION *or*
   reaching for MANUAL_REVIEW, check whether the wording's own extensions/
   coverage-extensions section and limit-structure language (e.g. a General
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
  indemnifiable-loss layer, and there's either no Schedule of Underlying
  Insurance to check or that schedule's entries show no structural
  fingerprint of a dedicated Side A layer, that's a reliable "not
  identified" finding —
  even when the document lacks a declarations page. A missing declarations
  page only excuses the specific fact it would supply (the *dollar amount*
  of a confirmed grant) — it doesn't cast doubt on a conclusion the
  wording's own text already answers. See "Missing declarations/schedule ≠
  blanket uncertainty" in `skills/AGENT_SYSTEM_INSTRUCTIONS.md`.
- **Genuinely can't tell → MANUAL_REVIEW.** Use this when the wording
  itself points to something missing that's actually needed to resolve
  *this* determination — e.g. it references an attached excess/DIC policy
  or a Schedule of Forms that isn't included, so whether that layer exists
  can't be confirmed either way; the extensions/limit-structure language is
  itself incomplete, silent, or ambiguous about whether a separate Side A
  layer could exist; or a Schedule of Underlying Insurance lists another
  policy by name/number whose scope can't be determined from the
  information given, so the structural-fingerprint check can't be applied
  either way.

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

The Step 2 Schedule of Underlying Insurance check and the structural-
fingerprint signals (Insured-Persons-only scope, single Conduct/Fraud
exclusion, no retention) were added after research into how Side A DIC
coverage is actually placed in real programs: it is frequently issued as
its own policy form/number and surfaces in the base wording only as a line
item in a program schedule, or as an endorsement broadening an *existing*
excess layer's trigger rather than a new declared limit — never described
in the base wording's own prose at all. A pure text/keyword search of the
base wording will miss this every time; the schedule and the structural
fingerprint are what real brokers actually check. (Sources: Aon,
"Side A Difference in Conditions: Final Safety Net for Personal Liability";
GB&A, "Side A DIC D&O – The Differences Within"; The D&O Diary / Lexology,
"The D&O Cramdown: Triggering Side A DIC Coverage When an Underlying D&O
Carrier Declines Coverage.")
