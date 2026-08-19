---
name: do-002-ivi-bankruptcy-carveback
description: Checks whether a Private Company D&O policy's Insured vs. Insured exclusion contains a bankruptcy trustee/receiver/creditors'-committee carve-back. Use when D&O coverage has been classified PRESENT by RULE-000, to flag a missing or absent carve-back.
---

# DO-002 — Insured vs. Insured / Bankruptcy Carve-Back

## Rule ID
`DO-002`

## Rule Name
`Insured vs. Insured / Bankruptcy Carve-Back`

## Coverage Module
`Private Company D&O`

## Rule Type
`Coverage Optimization`

## Objective
Review the Private Company D&O coverage for an Insured vs. Insured (IVI)
exclusion or materially equivalent provision, then determine whether that
provision contains appropriate bankruptcy-related carve-backs.

Private Company D&O forms are expected to address Insured vs. Insured
claims. Failure to locate the applicable IVI provision is itself a finding
requiring broker attention — it should be surfaced (as OPTIMIZATION or
MANUAL_REVIEW, per the logic below), not silently skipped.

## Search concepts / terminology
**Step 1 — locate the IVI provision.** Review the entire policy or quote,
including applicable endorsements, for language functioning as an Insured
vs. Insured exclusion. Search semantically for concepts including:
- Insured vs. Insured / Insured versus Insured / Insured v. Insured / IVI
- Insured against Insured
- Claims brought by an Insured
- Claims brought or maintained by an Insured Person
- Claims brought by or on behalf of the Company
- Claims by one Insured against another Insured
- Claims brought at the direction or solicitation of an Insured
- Materially equivalent language restricting claims between insured parties

Do not rely solely on the title of the exclusion — determine whether a
provision substantively functions as an IVI exclusion.

**Step 2 — if IVI cannot be located,** see the OPTIMIZATION / MANUAL_REVIEW
logic below (do not proceed to Step 3).

**Step 3 — analyze bankruptcy carve-backs.** When an IVI provision is
identified, review it and all endorsements modifying it for bankruptcy-
related exceptions. Search for carve-backs involving:
- Bankruptcy Trustee / Trustee
- Receiver
- Examiner
- Creditors' Committee / Committee of Creditors
- Similar bankruptcy, insolvency, liquidation, or court-appointed
  representative

The language must actually operate as an exception/carve-back to the IVI
exclusion — merely finding one of these terms elsewhere in the document does
not satisfy the rule.

## Decision steps
1. Locate the IVI provision (Step 1). If not found or not reliably
   determinable, stop here — do not proceed to Step 3.
2. If found, analyze it and its endorsements for a qualifying bankruptcy
   carve-back (Step 3).
3. Determine the carve-back type when one is identified: Trustee / Receiver
   / Creditors' Committee / Examiner / Other.

---

## Status logic

### 🟢 PASS
Triggered when: an IVI provision is identified **and** one or more
qualifying bankruptcy-related carve-backs are affirmatively identified
within it.

Output: a Finding ("Bankruptcy-related carve-back identified within the
Insured vs. Insured provision"), plus Evidence for the carve-back language
(and, when useful, the IVI provision itself — use labeled Evidence entries,
e.g. `Evidence (IVI Provision):` / `Evidence (Carve-Back):`). No
Recommendation.

### ⚠️ OPTIMIZATION
Triggered when either:
- An IVI provision is identified, but no qualifying bankruptcy-related
  carve-back is identified within it, or
- CoverageIQ completed a reliable review of the available terms but could
  not locate the applicable IVI provision at all (this is an OPTIMIZATION,
  not silence — the missing provision itself is the finding).

Output: a Finding, a Recommendation, and Reasoning. Include Evidence for the
IVI provision when one was found.

> Recommendation text (carve-back missing): "Consider requesting
> bankruptcy-related carve-backs to the Insured vs. Insured exclusion for
> claims brought by a bankruptcy trustee, receiver, creditors' committee, or
> similar bankruptcy representative."
>
> Finding text (IVI not identified): "Insured vs. Insured language was not
> identified within the provided policy or quote." Recommendation: "Review
> the D&O terms to confirm the applicable Insured vs. Insured provision and
> its associated carve-backs." Do not assume the absence of an identified
> IVI exclusion means the policy affirmatively provides broader coverage.

### 🟡 MANUAL_REVIEW
Use when CoverageIQ cannot reliably determine any of:
- Whether an IVI provision exists at all (e.g. because of incomplete
  documents, missing endorsements, or poor document quality — as opposed to
  a reliable review that simply didn't find one, which is OPTIMIZATION
  above).
- Whether identified language functions as an IVI exclusion.
- Whether bankruptcy language constitutes a qualifying carve-back.
- Whether an endorsement modifies or supersedes the IVI provision.
- Whether relevant terms are missing from the uploaded document.

Output: Reasoning explaining what's conflicting or missing. Include
Evidence only if there's a specific passage worth citing.

## Evidence & confidence requirements
Every result should be able to answer, even if only in the Finding/Reasoning
prose: whether an IVI provision was identified (Yes/No/Uncertain), whether a
bankruptcy carve-back was identified (Yes/No/Uncertain), and the carve-back
type when applicable (Trustee/Receiver/Creditors' Committee/Examiner/Other).
Always cite both pieces of evidence when applicable — where the IVI
provision was found and where the carve-back was found — using labeled
Evidence entries. Include a confidence level.

## Notes
This rule has two things it's checking, in order: (1) can the IVI provision
be found, and (2) if yes, does it contain the bankruptcy carve-back. Don't
jump straight to searching for "trustee" or "receiver" in isolation — the
agent must understand the underlying exclusion before evaluating whether the
carve-back is present.
