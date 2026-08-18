DO-001 — Additional Side A Coverage
Coverage Module: Private Company D&O
Rule Type: Coverage Optimization
Objective: Determine whether the policy or quote provides Additional Side A coverage and, if so, whether the Additional Side A limit is at least $1,000,000.
Search concepts / terminology: The agent should search semantically for Additional Side A coverage, including terms such as “Additional Side A,” “Additional Side A Limit,” “Additional Side A Limit of Liability,” “Additional Limit for Side A,” “Dedicated Side A,” “Separate Side A Limit,” and materially equivalent carrier terminology.
Status logic:
Additional Side A ≥ $1,000,000 → PASS
No optimization recommendation.
Provide evidence showing the identified limit.
Additional Side A > $0 but < $1,000,000 → OPTIMIZATION
Recommendation: “Consider requesting an increase in Additional Side A coverage to at least $1,000,000, or more where available.”
No Additional Side A coverage identified → OPTIMIZATION
Recommendation: “Consider requesting the addition of at least $1,000,000 of Additional Side A coverage, or more where available.”
Conflicting or insufficient evidence → MANUAL_REVIEW
Do not assume the coverage is absent if the document is incomplete or the applicable language cannot be reliably determined.
Evidence requirement: Every result must show the relevant policy/quote language, identified limit if applicable, page number, section or endorsement when available, and confidence level.
Important distinction: This rule concerns Additional Side A, not the ordinary Side A insuring agreement. The existence of standard Side A/B/C language does not satisfy this rule.


————

DO-002 — Insured vs. Insured Bankruptcy Carve-Back
Coverage Module: Private Company D&O
Rule Type: Coverage Optimization
Rule Name: Insured vs. Insured / Bankruptcy Carve-Back
Objective
Review the Private Company D&O coverage for an Insured vs. Insured (IVI) exclusion or materially equivalent provision, then determine whether that provision contains appropriate bankruptcy-related carve-backs.
CoverageIQ should expect Private Company D&O forms to address Insured vs. Insured claims. Failure to locate the applicable IVI provision is itself a finding requiring broker attention.
Step 1 — Locate the IVI Provision
Review the entire policy or quote, including applicable endorsements, for language functioning as an Insured vs. Insured exclusion.
Search semantically for concepts including:
Insured vs. Insured
Insured versus Insured
Insured v. Insured
IVI
Insured against Insured
Claims brought by an Insured
Claims brought or maintained by an Insured Person
Claims brought by or on behalf of the Company
Claims by one Insured against another Insured
Claims brought at the direction or solicitation of an Insured
Materially equivalent language restricting claims between insured parties
Do not rely solely on the title of the exclusion. Determine whether a provision substantively functions as an IVI exclusion.
Step 2 — If IVI Cannot Be Located
If CoverageIQ cannot identify an IVI exclusion or materially equivalent provision after reviewing the available document:
Status: ⚠️ OPTIMIZATION
Flag the issue for the broker.
Finding:
Insured vs. Insured language was not identified within the provided policy or quote.
Recommendation:
Review the D&O terms to confirm the applicable Insured vs. Insured provision and its associated carve-backs.
Do not assume that the absence of an identified IVI exclusion means the policy affirmatively provides broader coverage.
If CoverageIQ believes the IVI provision may be missing because of incomplete documents, missing endorsements, poor document quality, or conflicting evidence, use MANUAL_REVIEW instead.


⸻


Step 3 — Analyze Bankruptcy Carve-Backs
When an IVI provision is identified, review the provision and all endorsements modifying it for bankruptcy-related exceptions.
Search for carve-backs involving:
Bankruptcy Trustee
Trustee
Receiver
Examiner
Creditors’ Committee
Committee of Creditors
Similar bankruptcy, insolvency, liquidation, or court-appointed representative
CoverageIQ must determine that the language actually operates as an exception/carve-back to the IVI exclusion.
Merely finding one of these terms elsewhere in the document does not satisfy the rule.
Decision Logic
🟢 PASS
IVI provision identified and one or more qualifying bankruptcy-related carve-backs are affirmatively identified.
Display a green check mark.
Bankruptcy-related carve-back identified within the Insured vs. Insured provision.
Provide the exact supporting evidence.
⚠️ OPTIMIZATION
IVI provision identified, but no qualifying bankruptcy-related carve-back is identified.
Consider requesting bankruptcy-related carve-backs to the Insured vs. Insured exclusion for claims brought by a bankruptcy trustee, receiver, creditors’ committee, or similar bankruptcy representative.
⚠️ OPTIMIZATION — IVI Not Identified
CoverageIQ completed a reliable review of the available terms but could not locate the applicable IVI provision.
Insured vs. Insured language was not identified. Review the D&O terms to confirm the applicable IVI provision and associated carve-backs.
🟡 MANUAL_REVIEW
Use when CoverageIQ cannot reliably determine:
Whether an IVI provision exists.
Whether identified language functions as an IVI exclusion.
Whether bankruptcy language constitutes a carve-back.
Whether an endorsement modifies or supersedes the IVI provision.
Whether relevant terms are missing from the uploaded document.
Evidence Requirements
Every result should return:
Rule: DO-002 — Insured vs. Insured Bankruptcy Carve-Back
Status: 🟢 PASS / ⚠️ OPTIMIZATION / 🟡 MANUAL_REVIEW
IVI Provision Identified: Yes / No / Uncertain
Bankruptcy Carve-Back Identified: Yes / No / Uncertain
Carve-Back Type: Trustee / Receiver / Creditors’ Committee / Examiner / Other
Page:
Section / Endorsement:
Evidence:
Recommendation:
Confidence:
The key change is that this rule now has two separate things CoverageIQ is checking:
1. Can I find the IVI provision?
2. If yes, does it contain the bankruptcy carve-back we want?
That is much better than jumping straight to searching for “trustee” or “receiver,” because it forces the agent to understand the underlying exclusion before evaluating the optimization.


———


 
DO-003 — Antitrust Exclusion / Coverage
Coverage Module: Private Company D&O
Rule Type: Coverage Optimization
Rule Name: Antitrust Coverage
Objective
Determine whether the Private Company D&O policy or quote contains an Antitrust Exclusion or materially equivalent exclusion, and if so, determine whether the policy provides any antitrust coverage through a carve-back, defense-cost coverage, sublimit, or full-limit coverage.
Antitrust exclusions should be treated as commonly expected within Private Company D&O base forms. Therefore, CoverageIQ should actively search for the exclusion rather than assuming that silence means the exposure is covered.


⸻


Step 1 — Locate Antitrust Language
Review the entire policy or quote, including the base form, declarations, coverage schedules, and endorsements, for antitrust-related language.
Search semantically for concepts including:
Antitrust
Anti-Trust
Restraint of Trade
Unfair Competition
Price Fixing
Price Discrimination
Monopoly / Monopolization
Sherman Act
Clayton Act
Federal Trade Commission Act
Similar language restricting coverage for anticompetitive or trade-practice claims
Do not require the provision to literally be titled “Antitrust Exclusion.”


⸻


Step 2 — Determine Whether an Exclusion Exists
If antitrust-related claims are affirmatively excluded:
Antitrust Exclusion Identified: YES
CoverageIQ must then proceed to Step 3.
If CoverageIQ cannot reliably determine whether the policy contains an applicable antitrust exclusion, return:
🟡 MANUAL_REVIEW
Do not infer that antitrust is covered merely because an exclusion could not be located.


⸻


Step 3 — Search for Coverage Restoration
If an Antitrust Exclusion exists, review the entire document for provisions that restore some or all antitrust coverage.
Specifically search for:
Full Coverage
Language indicating antitrust claims are covered up to the applicable D&O limit.
Sublimited Coverage
Language providing a specific antitrust sublimit, such as:
Antitrust Coverage Sublimit: $250,000
or materially equivalent language.
Defense-Cost Coverage
Language providing Defense Costs for otherwise excluded antitrust claims.
Carve-Back
An exception within the Antitrust Exclusion that restores coverage for specified antitrust claims or expenses.
CoverageIQ must determine that the identified language actually provides or restores antitrust coverage. The mere appearance of antitrust terminology elsewhere in the document does not satisfy this requirement.


⸻


Decision Logic
🟢
PASS
— Antitrust Coverage Identified
If an Antitrust Exclusion exists and CoverageIQ identifies:
Full-limit antitrust coverage; or
An antitrust sublimit; or
Defense-cost coverage; or
A qualifying carve-back restoring coverage,
return:
🟢 PASS
Display the type and amount of coverage identified.
Example:
Antitrust Exclusion identified. $250,000 Antitrust Defense Costs sublimit identified by endorsement.
Provide supporting evidence.


⸻


⚠️
OPTIMIZATION
— Exclusion Without Coverage
If:
An Antitrust Exclusion is identified; and
No full-limit coverage, sublimit, defense-cost coverage, or qualifying carve-back is identified,
return:
⚠️ OPTIMIZATION
Recommendation
“Consider negotiating antitrust coverage or a defense-cost carve-back/sublimit.”
Use that language exactly unless changed by an administrator.


⸻


🟡
MANUAL_REVIEW
Return MANUAL_REVIEW when CoverageIQ cannot reliably determine:
Whether an Antitrust Exclusion exists.
Whether an endorsement modifies the exclusion.
Whether identified antitrust language actually restores coverage.
What limit or sublimit applies.
Whether conflicting provisions supersede one another.
Whether the uploaded documents contain all relevant forms or endorsements.
Do not guess.


⸻


Important Guardrails
CoverageIQ should not automatically flag the mere existence of an Antitrust Exclusion as the final optimization.
The exclusion triggers a second-stage search.
The actual optimization exists when:
Antitrust Exclusion + No identified coverage restoration = OPTIMIZATION
Likewise:
Antitrust Exclusion + Antitrust coverage restoration = PASS
And CoverageIQ should always cite both pieces of evidence when applicable: where it found the exclusion and where it found the carve-back/sublimit/full-limit coverage.


⸻


Required Output
Rule: DO-003 — Antitrust Coverage
Status: 🟢 PASS / ⚠️ OPTIMIZATION / 🟡 MANUAL_REVIEW
Antitrust Exclusion Identified: Yes / No / Uncertain
Coverage Restoration Identified: Yes / No / Uncertain
Coverage Type: Full Limit / Sublimit / Defense Costs / Carve-Back / None
Limit or Sublimit: Amount / Not Stated / N/A
Exclusion Evidence: Page + Section + Language
Coverage Evidence: Page + Section/Endorsement + Language
Recommendation:
Confidence:
This is a good rule for demonstrating CoverageIQ because it showcases something more sophisticated than keyword detection: finding an exclusion isn’t the answer. Finding the exclusion tells the agent what it needs to investigate next.
