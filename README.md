# CoverageIQ — running the app

This is the working implementation of the UI described in
[CoverageIQ-UI-README.md](CoverageIQ-UI-README.md) and prototyped in
`coverageiq-mockup-v4.html`. Two interchangeable backends, same behavior,
same `public/` frontend — pick whichever runtime is available on the
machine.

## Run it — Node

```
node server/server.js
```

No `npm install` needed — zero dependencies.

## Run it — Python (if Node isn't an option)

```
python server-python/server.py
```

Standard library only — no `pip install` needed either.
[server-python/](server-python/) is a line-for-line port of `server/`
(same `config.py`/`file_scanner.py`/`parse_analysis.py`/`server.py` split,
same swappable-folder-path pattern in `config.py`) verified to return
byte-identical JSON to the Node version against the same test data.

## Either way

Then open http://localhost:5175. By default it watches
`test_coverageIQ_data/input/` and `test_coverageIQ_data/output/`, which
already contain two sample pairs (prefixes `004` and `005`) so you can see
it working immediately.

## Switching from test data to the real folders

[server/config.js](server/config.js) (Node) / [server-python/config.py](server-python/config.py)
(Python) each have the active `INPUT_DIR`/`OUTPUT_DIR` assignment (test
data) plus a commented-out block below it pointing at the real OneDrive
folders. To switch: comment out the active assignment, uncomment the real
one. Same swap, same env-var override, in whichever one you're running.

Alternatively, leave the file alone entirely and pass env vars instead —
this overrides the test-data default without touching config.js/config.py
(same two env var names in both). In PowerShell:

```powershell
$env:COVERAGEIQ_INPUT_DIR = "C:\Users\smkenney\OneDrive\coverageIQ_AI\input"
$env:COVERAGEIQ_OUTPUT_DIR = "C:\Users\smkenney\OneDrive\coverageIQ_AI\output"
node server/server.js          # or: python server-python/server.py
```

## Naming convention & pairing

- Input: `[prefix]_[name].pdf`
- Output: `[prefix]_[name]_analysis.md`
- Files are paired **by prefix number only** (not by the name text), so a
  rename between input and output stays paired as long as the prefix matches.
- A pair only counts as complete once both files exist — see
  `server/fileScanner.js`. Incomplete pairs are still returned by
  `/api/submissions` (with `input`/`output` booleans) so the dropdown can
  show the red "Missing input file" / "Missing output file" warning exactly
  as designed in the mockup.

To manually test the missing-pair state: drop a `005_Something.pdf` into
`test_coverageIQ_data/input/` without a matching `_analysis.md` in `output/`
(or vice versa) and watch it show up grayed-out/disabled in the dropdown
within a few seconds (polling interval is `POLL_INTERVAL_MS` in
`server/config.js`, default 3s).

## Skills, rule definitions & the agent's system instructions

`skills/RULE_TEMPLATE.md` is what an SME copies per rule to define its
intent, search guidance, and PASS/OPTIMIZATION/MANUAL_REVIEW decision logic.
`skills/rules/` holds the current filled-out rules — `RULE-000` (mandatory,
always runs first, classifies which coverage modules the document actually
provides) plus `DO-001` through `DO-004`. Each rule lives in its own
`skills/rules/<rule-slug>/SKILL.md`, conforming to Copilot Cowork's Agent
Skills format: YAML frontmatter (`name` matching the folder, `description`
as a trigger condition) followed by markdown instructions — Copilot
identifies each skill by that frontmatter, not by filename, since every
file is literally named `SKILL.md`. `skills/AGENT_SYSTEM_INSTRUCTIONS.md` is
the actual system prompt to paste into the Copilot agent — deliberately
lean: the RULE-000 → skill-family gating table (D&O=PRESENT unlocks
`DO-*`, EPLI=PRESENT unlocks `EP-*`, etc.), the exact markdown output
format, the output filename convention, and Input/Destination Folder ID
placeholders (the prefix/filename come from the PDF's real name in the
Input Folder, never a chat attachment's auto-renamed copy — see that
file's opening warning). It intentionally says nothing about *why* — no
backend/POC
details, no repo layout, no mention of this UI or its polling — since the
agent doesn't need or use that context, only this repo's other docs do.

## The analysis `.md` → coverage + flags parser (read before touching flag data)

`server/parseAnalysis.js` (Node) / `server-python/parse_analysis.py`
(Python, a direct port — keep them in sync if this changes) is a single,
isolated, heavily-commented module that turns an analysis `.md` file's text
into what the UI renders. It is intentionally the **only** place in the app
that knows the markdown structure — `server.js`/`server.py` just calls
`parse_analysis_markdown(text)` and forwards the result as JSON;
`public/index.html` just renders whatever it receives.

The file always starts with one mandatory `RULE-000` section (parsed into
`coverage`, rendered as the **Coverage Snapshot panel** at the top of the
flags pane), followed by one section per eligible rule that was actually
evaluated (parsed into `flags`, rendered as the usual flag list below it):

```
## RULE-000 — Coverage Classification

### Private Company D&O
Status: PRESENT | NOT_PRESENT | MANUAL_REVIEW
Confidence: High | Medium | Low
Limit: <amount>
Retention: <amount>
Premium: Coverage-Specific | Combined | Not Identified
Evidence: "<quoted document language>"          (repeatable)
### Employment Practices Liability (EPLI)
...same fields, always all four modules, every time...

## <Rule ID> — <Rule Name>
Status: PASS | OPTIMIZATION | MANUAL_REVIEW
Confidence: High | Medium | Low

Finding: <what was identified — PASS/OPTIMIZATION>
Recommendation: <the ask — OPTIMIZATION only>
Evidence: "<quoted document language>"          (repeatable)
Evidence (<Label>): "<quoted document language>" (repeatable, labeled)
Reasoning: <why it matters, or why MANUAL_REVIEW>
```

See `test_coverageIQ_data/output/004_Beacon_Robotics_DO_Renewal_analysis.md`
for a worked example (Coverage Snapshot + all four DO rules, one per status).

If the real agent output ever needs to diverge from this, update
`server/parseAnalysis.js` and `skills/AGENT_SYSTEM_INSTRUCTIONS.md` together
— they must stay in sync. As long as `parseAnalysisMarkdown()` keeps
returning:

```js
{
  coverage: [{ module: string, status: 'present' | 'not-present' | 'manual-review',
               limit?: string, retention?: string, premium?: string,
               confidence?: string, evidence?: [{ label?: string, quote: string }] }],
  flags: [{ id?: string, name: string, status: 'pass' | 'optimization' | 'manual-review',
            confidence?: string, finding?: string, recommendation?: string, reasoning?: string,
            evidence?: [{ label?: string, quote: string }] }]
}
```

nothing in the server routing or the frontend needs to change. Two prior
draft schemas are kept commented out at the bottom of `parseAnalysis.js` for
reference only — neither is used anymore:
1. Flat PASS/OPTIMIZATION/MANUAL_REVIEW with no RULE-000/coverage split.
2. The earliest draft: `met`/`not-met`/`review` with `original`/`replacement`.

## What's not wired up yet

- **PDF pane** stays a static placeholder (per the mockup/README — real
  rendering is blocked on the M365 login/OCR work, explicitly Phase 2).
- **File-watcher vs. polling**: polling was chosen as the simpler POC build
  (README section 9 leaves this open); the interval lives in
  `server/config.js`.
