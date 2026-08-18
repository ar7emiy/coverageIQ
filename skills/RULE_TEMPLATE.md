# Skill Rule Template

Copy this file per rule (suggested filename: `skills/rules/<rule-id>.md`).
Everything in `{{...}}` is filled in by the SME authoring the rule. This
defines a rule's *intent and search/decision guidance* for the agent — see
`skills/AGENT_SYSTEM_INSTRUCTIONS.md` for the exact machine-readable output
format the agent must produce when it evaluates a rule like this one.

**Rule ID prefix matters.** `RULE-000` (`skills/rules/RULE-000-coverage-
classification.md`) runs first and classifies which coverage modules the
document actually provides, then gates which other rules are even allowed
to execute — by matching each rule's ID prefix to a module: `DO-*` → D&O,
`EP-*` → EPLI, `FI-*` → Fiduciary, `CR-*` → Crime. Give every rule you write
an ID in the matching family or RULE-000's gating won't route to it.

---

## Rule ID
`{{e.g. DO-001}}`

## Rule Name
`{{display name, e.g. "Additional Side A Coverage"}}`

## Coverage Module
`{{e.g. Private Company D&O}}`

## Rule Type
`{{e.g. Coverage Optimization}}`

## Objective
{{One or two sentences: what this rule determines and why it matters.}}

## Search concepts / terminology
{{The terms/phrases the agent should search for semantically — list
synonyms and materially equivalent carrier terminology, not just one exact
phrase. Note any important distinctions from similar-sounding but different
provisions (e.g. "this concerns Additional Side A, not the ordinary Side A
insuring agreement").}}

## Decision steps
{{If the rule requires more than a single lookup — e.g. "first locate
provision X, then check whether it contains Y" — spell out each step in
order. Multi-step rules (locate → then evaluate) produce more reliable
results than single-pass keyword matching; see DO-002/DO-003 for examples.}}

---

## Status logic

### 🟢 PASS
Triggered when: {{the condition the policy already satisfies — e.g. "the
identified limit is ≥ the target amount" or "a qualifying carve-back is
affirmatively identified."}}

Output: a **Finding** describing what was identified, plus **Evidence**
(the supporting quoted language). No Recommendation.

### ⚠️ OPTIMIZATION
Triggered when: {{the condition indicating a gap or improvement
opportunity — e.g. "coverage exists but is below the target amount" or "no
qualifying carve-back is identified."}}

Output: a **Finding**, a **Recommendation** (write the recommendation text
exactly as it should appear — may be templated with `{{variables}}`), and
**Reasoning** for why it matters. Include **Evidence** when there's
supporting language to cite (e.g. the aggregate limit clause that triggered
the gap), even though the answer is "not enough"/"not present."

> Recommendation text: {{e.g. "Consider requesting the addition of at least
> $1,000,000 of Additional Side A coverage, or more where available."}}

### 🟡 MANUAL_REVIEW
Triggered when: {{what "conflicting or insufficient evidence" means
specifically for this rule — e.g. "an endorsement is referenced but not
included," "two clauses appear to contradict," "cannot determine whether an
identified provision functions as the exclusion this rule is checking
for."}} Do not default to PASS or OPTIMIZATION when reliability is in
doubt — use MANUAL_REVIEW instead.

Output: **Reasoning** explaining what's conflicting or missing. Include
**Evidence** only if there's a specific passage worth citing as part of that
explanation.

## Evidence & confidence requirements
Every result must cite the relevant policy/quote language it relied on
(quoted, not paraphrased), and a confidence level (High / Medium / Low).
When a rule needs to cite more than one distinct passage (e.g. "where the
exclusion lives" and "where the carve-back lives"), give each its own
Evidence entry — optionally labeled to disambiguate them (see
AGENT_SYSTEM_INSTRUCTIONS.md's `Evidence (Label):` syntax).

## Notes
{{Anything else worth flagging — edge cases, related/overlapping rules,
known ambiguities, defined terms this rule depends on, etc.}}
