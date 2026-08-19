# Skill Rule Template

Copy this file per rule into its own folder:
`skills/rules/<rule-slug>/SKILL.md` (e.g.
`skills/rules/do-005-my-new-rule/SKILL.md`). **The file must be named
`SKILL.md`** — that's the only filename Copilot Cowork's skill uploader
accepts (it uses Anthropic's open Agent Skills format), so every rule's
file is named identically and only the containing folder differs.

**Required YAML frontmatter** — add this block as the very first thing in
the file, before the `# Rule Name` heading:

```
---
name: do-005-my-new-rule
description: <third person, one-to-three sentences, under ~500 chars, with a concrete trigger condition — e.g. "Checks whether X. Use when D&O coverage has been classified PRESENT by RULE-000, to flag Y.">
---
```

- `name` must be **kebab-case and identical to the containing folder name**
  (lowercase, `^[a-z][a-z0-9]*(-[a-z0-9]+)*$` — digits are fine within a
  segment, e.g. `do-005-...`, just not as the very first character).
- `description` is what Copilot uses to decide *when* to invoke the skill
  and what it shows in its skill browser — write it as a trigger condition,
  not a summary.
- After the frontmatter, replace the `# Skill Rule Template` heading below
  with your rule's own ID and name (e.g. `# DO-005 — My New Rule`) — this
  is for human readers browsing the file; Copilot itself keys off the
  frontmatter `name`/`description` above, not this heading.
- Keep the whole file well under Cowork's per-skill limits (target under
  ~300 lines / ~5,000 tokens of body content, 1 MB hard cap) — see the
  existing `skills/rules/*/SKILL.md` files for the range that's worked so
  far (roughly 80–230 lines).

Everything in `{{...}}` below is filled in by the SME authoring the rule.
This defines a rule's *intent and search/decision guidance* for the agent —
see `skills/AGENT_SYSTEM_INSTRUCTIONS.md` for the exact machine-readable
output format the agent must produce when it evaluates a rule like this
one.

**Rule ID prefix matters.** The `RULE-000` skill (Coverage Classification)
runs first and classifies which coverage modules the document actually
provides, then gates which other rules are even allowed to execute — by
matching each rule's ID prefix to a module: `DO-*` → D&O, `EP-*` → EPLI,
`FI-*` → Fiduciary, `CR-*` → Crime. Give every rule you write an ID in the
matching family or RULE-000's gating won't route to it.

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
