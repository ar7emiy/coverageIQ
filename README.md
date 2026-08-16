# CoverageIQ — running the app

This is the working implementation of the UI described in
[CoverageIQ-UI-README.md](CoverageIQ-UI-README.md) and prototyped in
`coverageiq-mockup-v4.html`. Plain Node.js — no npm install required.

## Run it

```
node server/server.js
```

Then open http://localhost:5175. By default it watches
`test_coverageIQ_data/input/` and `test_coverageIQ_data/output/`, which
already contain one sample pair (prefix `004`) so you can see it working
immediately.

## Switching from test data to the real folders

Edit the defaults in [server/config.js](server/config.js), or leave the file
alone and pass env vars instead:

```
COVERAGEIQ_INPUT_DIR="C:\path\to\real\input" COVERAGEIQ_OUTPUT_DIR="C:\path\to\real\output" node server/server.js
```

No other file needs to change.

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

## The analysis `.md` → flags parser (read before touching flag data)

`server/parseAnalysis.js` is a single, isolated, heavily-commented module
that turns an analysis `.md` file's text into the flag array the UI renders.
It is intentionally the **only** place in the app that knows the markdown
structure — `server/server.js` just calls `parseAnalysisMarkdown(text)` and
forwards the result as JSON; `public/index.html` just renders whatever array
it receives.

The current convention (documented in full at the top of that file) is a
provisional first draft:

```
## <Flag Name>
Status: Met | Not Met | Needs Review

Original: "..."
Replacement: "..."
Explanation: ...
```

`Original`/`Replacement`/`Explanation` are omitted when Status is Met — see
`test_coverageIQ_data/output/004_Beacon_Robotics_DO_Renewal_analysis.md` for
a worked example matching the mockup's evidence-panel data.

**This will very likely need to be rewritten** once the real skill output
format is known (per CoverageIQ-UI-README.md section 9, "Still open"). When
that happens, only `parseAnalysisMarkdown()`'s body needs to change — as
long as it keeps returning:

```js
[{ name: string, status: 'met' | 'not-met' | 'review',
   original?: string, replacement?: string, explanation?: string }]
```

nothing in the server routing or the frontend needs to change.

## What's not wired up yet

- **PDF pane** stays a static placeholder (per the mockup/README — real
  rendering is blocked on the M365 login/OCR work, explicitly Phase 2).
- **File-watcher vs. polling**: polling was chosen as the simpler POC build
  (README section 9 leaves this open); the interval lives in
  `server/config.js`.
