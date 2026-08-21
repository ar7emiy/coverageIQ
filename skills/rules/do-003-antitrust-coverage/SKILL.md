---
name: do-003-antitrust-coverage
description: Checks whether a Private Company D&O policy's Antitrust Exclusion is restored by a carve-back, sublimit, defense-cost coverage, or full-limit coverage. Use when D&O coverage has been classified PRESENT by RULE-000, to flag an exclusion left without any coverage restoration.
---

# DO-003 — Antitrust Coverage

## Rule ID
`DO-003`

## Rule Name
`Antitrust Coverage`

## Coverage Module
`Private Company D&O`

## Rule Type
`Coverage Optimization`

## Objective
Determine whether the Private Company D&O policy or quote contains an
Antitrust Exclusion or materially equivalent exclusion, and if so, whether
the policy provides any antitrust coverage back through a carve-back,
defense-cost coverage, sublimit, or full-limit coverage.

Antitrust exclusions are common within Private Company D&O base forms, so
actively search for one rather than assuming silence means it's absent —
but a reliable review that genuinely finds none is a real, valid result
(full antitrust coverage applies by default), not evidence of an
incomplete search.

## Search concepts / terminology
**Step 1 — locate antitrust language.** Review the entire policy or quote,
including the base form, declarations, coverage schedules, and
endorsements, for antitrust-related language. It is commonly just one
numbered item in a generic exclusions list, not its own captioned section.
Search semantically for concepts including:
- Antitrust / Anti-Trust
- Restraint of Trade / Trade Practices
- Unfair Competition / Unfair Business Practices
- Price Fixing / Price Discrimination / Predatory Pricing
- Monopoly / Monopolization / Attempted Monopolization
- Tying Arrangement / Exclusive Dealing / Market Allocation
- Sherman Act / Clayton Act / Federal Trade Commission Act / Robinson-Patman
  Act / Hart-Scott-Rodino Act
- Restraint of Competition / Anticompetitive Conduct / Antitrust Laws
- Similar language restricting coverage for anticompetitive or
  trade-practice claims

Do not require the provision to literally be titled "Antitrust Exclusion."
Also actively confirm the opposite: many Private Company D&O forms simply
carry **no** antitrust exclusion at all, in which case antitrust claims are
covered under the ordinary insuring agreement with no restoration needed —
see the PASS logic below for how to report that.

**Step 3 — search for coverage restoration.** If an Antitrust Exclusion
exists, review the entire document for provisions that restore some or all
antitrust coverage:
- **Full Coverage** — antitrust claims covered up to the applicable D&O
  limit.
- **Sublimited Coverage** — a specific antitrust sublimit (e.g. "Antitrust
  Coverage Sublimit: $250,000" or materially equivalent language).
- **Defense-Cost Coverage** — Defense Costs provided for otherwise excluded
  antitrust claims.
- **Carve-Back** — an exception within the Antitrust Exclusion that
  restores coverage for specified antitrust claims or expenses.

The identified language must actually provide or restore antitrust
coverage — the mere appearance of antitrust terminology elsewhere in the
document does not satisfy this requirement.

## Decision steps
1. Locate antitrust-related language (Step 1) and determine whether an
   Antitrust Exclusion affirmatively exists.
2. If, after a reliable full-document review, no Antitrust Exclusion is
   identified at all, that is a PASS (see below) — full antitrust coverage
   applies by default when nothing excludes it. This is different from
   being *unable to determine* whether one exists (incomplete document,
   ambiguous language) — that case is MANUAL_REVIEW, not PASS.
3. If an exclusion exists, search for coverage restoration (Step 3) and
   determine its type and amount.

**Important guardrail:** finding the exclusion is not itself the finding —
the exclusion triggers the second-stage search. The actual optimization is
"Exclusion + no restoration identified." Cite both pieces of evidence when
applicable: where the exclusion was found, and where the restoration
(or absence of it) was evaluated.

---

## Status logic

### 🟢 PASS — Antitrust Coverage Identified
Two distinct triggers both return PASS:
- **An Antitrust Exclusion exists AND** CoverageIQ identifies full-limit
  coverage, a sublimit, defense-cost coverage, or a qualifying carve-back
  that restores it. Output a Finding stating the type and amount of
  coverage identified (e.g. "Antitrust Exclusion identified. $250,000
  Antitrust Defense Costs sublimit identified by endorsement."), plus
  labeled Evidence for both the exclusion and the restoring language
  (`Evidence (Exclusion):` / `Evidence (Coverage Restoration):`). No
  Recommendation.
- **No Antitrust Exclusion identified at all**, after a reliable
  full-document review. Output a Finding: "No applicable Antitrust
  Exclusion identified — antitrust-related claims are covered under the
  ordinary insuring agreement." No Recommendation.

### ⚠️ OPTIMIZATION — Exclusion Without Coverage
Triggered when: an Antitrust Exclusion is identified **and** no full-limit
coverage, sublimit, defense-cost coverage, or qualifying carve-back is
identified.

Output: a Finding, a Recommendation, Reasoning, and Evidence for the
exclusion.

> Recommendation text (use exactly, unless changed by an administrator):
> "Consider negotiating antitrust coverage or a defense-cost
> carve-back/sublimit."

### 🟡 MANUAL_REVIEW
Return MANUAL_REVIEW when CoverageIQ cannot reliably determine any of:
- Whether an Antitrust Exclusion exists.
- Whether an endorsement modifies the exclusion.
- Whether identified antitrust language actually restores coverage.
- What limit or sublimit applies.
- Whether conflicting provisions supersede one another.
- Whether the uploaded documents contain all relevant forms or
  endorsements.

Do not guess. Output Reasoning explaining what's conflicting or missing,
with Evidence only where there's a specific passage worth citing.

## Evidence & confidence requirements
Every result should be able to answer, even if only in the Finding/Reasoning
prose: whether an Antitrust Exclusion was identified (Yes/No/Uncertain),
whether coverage restoration was identified (Yes/No/Uncertain), the
coverage type (Full Limit/Sublimit/Defense Costs/Carve-Back/None), and the
limit or sublimit amount (Amount/Not Stated/N/A). Cite both the exclusion
evidence and the coverage-restoration evidence separately when applicable,
using labeled Evidence entries. Include a confidence level.

## Notes
This rule demonstrates something more sophisticated than keyword detection:
finding the exclusion isn't the answer, it's what tells the agent what to
investigate next.
