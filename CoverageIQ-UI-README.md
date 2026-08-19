# CoverageIQ — UI Requirements & Design Notes

A results/monitoring panel for the CoverageIQ D&O Policy Checker POC. This document captures what the interface needs to do and why, based on our design conversation. It does not cover the skill-rule authoring (separate project) or the MCP/Copilot backend implementation itself — only what this UI is responsible for.

## 1. What this tool is

CoverageIQ's core job is to tell a broker **what can be improved** about a submitted D&O policy — not to be a document intake tool. The actual document intake happens entirely outside this UI, inside Microsoft 365 Copilot.

This interface is a **passive results viewer**. It never touches the PDF directly; it only reflects what a backend hook already found by watching two folders.

## 2. End-to-end user flow

1. User drops a policy PDF into the M365 Copilot agent (Copilot occupies a fixed ~300–400px pane, typically docked to the left of this UI).
2. An MCP tool running under that Copilot agent copies the PDF into `/input` and, once skill-based analysis finishes, writes the results into `/output`.
3. This UI polls both folders, detects a complete pair, and displays the results.
4. The user reads the flagged suggestions — no upload, no paste, no manual step on this side of the screen.

> **Current POC deviation:** step 2's automatic copy into `/input` has been
> unreliable in testing, so for now a person places the PDF into `/input`
> manually (already correctly named `{prefix}_{filename}.pdf`) instead of
> Copilot doing it. Steps 3–4 and everything else in this doc are
> unaffected — the UI still just watches the two folders and has no idea
> whether the file arrived by hand or automatically. The agent itself
> (`skills/AGENT_SYSTEM_INSTRUCTIONS.md`) doesn't need to know any of this
> — it's just handed a Destination Folder ID and whatever copy of the PDF
> it's attached in chat, and pulls the prefix from the leading digits of
> that attachment's filename (ignoring anything Copilot's upload may have
> appended after it). It has no idea *why* the workflow is shaped this
> way. This is scoped to the POC and expected to revert once the underlying
> copy issue
> is resolved.

## 3. Screen real estate

Copilot reserves a fixed 300–400px pane. This UI gets **whatever space remains**, which is usually the majority of the viewport — not a narrow sidebar. It needs to be genuinely responsive (fluid grid/columns), not designed for one fixed width and stretched.

## 4. Data model & the input/output gating rule

- Files land in `/input`, optionally renamed with a running numeric prefix (e.g. `004_...`).
- Skill analysis results land in `/output` as a matching `{prefix}_..._results` file.
- **A submission only counts as valid once both files exist.** There is no partial or "analyzing" display state for a single submission — a pair is either complete or it isn't.
- Incomplete pairs (input with no matching output, or vice versa) are **never shown in the main content area**. They only appear in the file-selection dropdown, grayed out and marked with a red warning icon stating which file is missing ("Missing output file" / "Missing input file"). They are not selectable.
- "Latest" is determined by the highest prefix number among **complete** pairs.

## 5. Real UI states (only two)

| State | Condition | What's shown |
|---|---|---|
| **Waiting** | No complete pairs exist anywhere in `/input` + `/output` | Empty-state message inviting the user to drop a file into Copilot |
| **Ready** | At least one complete pair exists | Flags for the selected (default: latest) complete submission |

There is intentionally no third "Analyzing" full-panel state — since a submission isn't displayed at all until it's complete, there's nothing partial to render in the main panel. (An in-between processing moment may still exist on the backend; it just isn't something this UI needs to visualize.)

## 6. Interface components

**Top bar** — CoverageIQ brand mark only, kept minimal since this panel already lives next to Copilot's own chrome. A dropdown button on the right lists everything in `/input`, sorted latest-first, with red-flagged incomplete pairs visible but disabled.

**Flags list (main content)** — A flat list of suggestion flags, sourced from whatever the skill output provides (not hardcoded rule names). Each flag shows:
- An index eyebrow ("Suggestion Flag 01") plus the actual rule/flag name
- A status badge: **Met** / **Not Met** / **Needs Review**
- An evidence panel — shown only when the flag isn't Met — containing the original policy wording, the suggested replacement language, and a plain-language explanation of why it matters

**PDF pane** — Triggered by a tab fixed to the right edge of the screen. Opens as a true split view (flags column compresses, PDF pane slides in beside it) rather than a modal, so both stay visible at once. Below ~760px width there's no room to split, so it becomes a full-screen slide-over instead. Currently a placeholder — no real rendering yet — but structured so a later phase can jump straight to an OCR-highlighted clause per flag once the M365 login work is in place.

**Loading transition** — Plays only when switching between two already-loaded files in the dropdown (not on first load, not tied to Waiting/Ready). An abstract 3D cube animation: the cubes trace the shape of the CoverageIQ checkmark at rest, split apart toward the left/right, tumble in place, then reassemble — over a frosted white/blurred glass overlay. Cube spread is calculated from the panel's actual measured size at the moment it plays, so it can't clip regardless of viewport width or whether the PDF pane is open.

## 7. Visual design system

| Token | Value | Use |
|---|---|---|
| Ink Navy | `#16324F` | Primary brand, top bar |
| Ink Navy (light) | `#1E4468` | Gradient partner, cube shading |
| Charcoal | `#14171C` | Dev/demo chrome only |
| Paper | `#F4F5F7` | App background |
| Green | `#3F8F6B` | "Met" status |
| Rust | `#C1503A` | "Not Met" status, missing-file warnings |
| Amber | `#A9791E` | "Needs Review" status |

- **Display type:** Space Grotesk — flag names, brand wordmark
- **Body type:** Inter — descriptions, explanations, UI chrome
- **Mono type:** IBM Plex Mono — evidence quotes, suggested language, index labels, timestamps — reinforces the "evidence-first, traceable" identity carried over from the original mockup

Existing brand identity (shield + checkmark mark, navy/charcoal palette) was kept intentionally rather than redesigned.

## 8. Explicitly deferred (Phase 2)

- Real PDF rendering with OCR-based highlighting that jumps to the specific clause behind a flag — blocked on the M365 login/integration work.
- Priority/severity tagging on suggestions (e.g. "High priority" vs. "Standard ask") — prototyped once as a suggestion, not yet confirmed as a real requirement.
- Any direct sync between this UI and Copilot's own chat summary message — intentionally decoupled; both are triggered by the same event but have no technical dependency on each other.

## 9. Still open

- Exact update mechanism for the folder hook: simple polling on an interval vs. a file-watcher pushing updates. Polling is the simpler build for a POC.
- Real schema for what the skill output actually provides per flag (field names, whether a priority signal exists, etc.) — the mockups assume `name`, `status`, `original`, `replacement`, `explanation`, but this needs to match whatever the skill files actually emit.

## Prototype history

For reference, the mockups produced while working through these requirements:

1. `coverageiq-mockup.html` — first pass, general layout exploration
2. `coverageiq-mockup-v2-suggestions.html` — introduced the Opportunities/Confirmed split and suggested-language pattern
3. `coverageiq-mockup-v3.html` — rebuilt around the dropdown selector, flat flag list, and slide-in PDF pane
4. `coverageiq-mockup-v4.html` — current: adds input/output gating, flagged dropdown items, and the integrated cube loading transition
5. `loading-animation-preview.html` — standalone preview of the cube animation before it was wired in
