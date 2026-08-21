---
name: do-007-tcpa-communications-exclusion
description: Checks whether a Private Company D&O policy or quote contains an operative TCPA / unsolicited-communications exclusion. Use when D&O coverage has been classified PRESENT by RULE-000, to flag an exclusion that remains in effect and recommend requesting its removal.
---

# DO-007 — TCPA / Communications Exclusion

## Rule ID
`DO-007`

## Rule Name
`TCPA Exclusion`

## Coverage Module
`Private Company D&O`

## Rule Type
`Coverage Optimization`

## Objective
Determine whether the Private Company D&O policy or quote contains an
exclusion relating to the Telephone Consumer Protection Act (TCPA) or
materially equivalent restrictions involving unsolicited communications,
telemarketing, faxing, texting, or similar communications statutes. If
present and operative, flag it and recommend requesting its removal.

## Search concepts / terminology
Search semantically for: Telephone Consumer Protection Act / TCPA /
Consumer Protection / Telemarketing / Unsolicited Communications /
Unsolicited Telephone Calls / Unsolicited Text Messages / SMS / Text
Messaging / Unsolicited Facsimiles / Fax / Facsimile / Junk Fax Prevention
Act / CAN-SPAM / CAN-SPAM Act / Do-Not-Call / Telemarketing Sales Rule /
Video Privacy Protection Act (sometimes bundled into the same broader
privacy/communications exclusion) / "similar state or federal statute" /
communications statutes / similar laws regulating unsolicited
communications, advertising, solicitation, telephone calls, texts, or
electronic communications. Some carriers use a broader "Privacy Violation"
or general communications-law exclusion rather than naming TCPA
specifically, sometimes with a catch-all like "...or any similar state or
federal statute regulating unsolicited communications" — recognize that
sweep-in language as equivalent even when TCPA is never named.

## Decision steps
1. Locate TCPA or materially equivalent communications-law exclusionary
   language and determine that it actually excludes or restricts claims
   that would otherwise fall within the D&O coverage. The mere appearance
   of "TCPA" or similar terminology does not independently establish an
   operative exclusion.
2. Review endorsements for language deleting, replacing, narrowing, or
   otherwise modifying the exclusion.

---

## Status logic

### 🟢 PASS
Triggered when: no applicable TCPA or materially equivalent communications
exclusion is identified.

Output: a Finding ("No applicable TCPA or materially equivalent
communications exclusion identified."). No Recommendation.

### ⚠️ OPTIMIZATION
Triggered when: an applicable TCPA or materially equivalent communications
exclusion is identified and remains operative.

Output: a Finding, a Recommendation, and Evidence for the exclusion.

> Recommendation text: "Consider requesting removal of the TCPA /
> Communications Exclusion."

### 🟡 MANUAL_REVIEW
Triggered when: the exclusion is broader than TCPA and its applicability
is uncertain; CoverageIQ cannot determine whether the provision affects
D&O coverage; an endorsement appears to modify the exclusion but the
resulting coverage is unclear; relevant documents appear incomplete; or
conflicting language cannot reliably be reconciled. Do not guess.

## Evidence & confidence requirements
Every result should be able to answer, even if only in the Finding prose,
whether a TCPA/Communications Exclusion was identified (Yes/No/Uncertain)
and whether a modification or deletion of it was identified
(Yes/No/Uncertain). Include a confidence level.

## Notes
None.
