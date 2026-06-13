<img width="2538" height="1294" alt="History Globe preview" src="https://github.com/user-attachments/assets/a04c0145-1674-48ee-b474-8efa80dd4c16" />

# History Globe

History Globe is a personal history-learning web app for seeing what was happening in different parts of the world during the same time period. It uses modern map boundaries as clickable anchors, then explains the historical entities, events, people, and context for the selected area in the right-hand panel.

The current product direction is a study tool rather than a strict historical-border simulator. Historical boundary mismatches are handled as content notes in the selected region, not by redrawing every historical border.

## Current Experience

- Left sidebar: time-period selector, event-category filters, and region list.
- Center panel: auto-rotating 3D globe with softly colored modern map regions.
- Globe labels: Chinese region labels rendered as an overlay for stable typography.
- Region selection: click or hover map regions to focus related historical content.
- Right panel: selected-region summary, historical status, key events, people inside event cards, illustrations, cross-region links, and sources.
- Timeline scope: deep-history periods through 2026, with denser cards for documented historical periods.

The public-facing UI no longer includes the data quality-check panel. The audit code is still kept in the repo for development and curation work.

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS
- react-globe.gl + Three.js
- Zustand
- Local JSON/TypeScript data with SQLite import/build scripts for future database use

## Run Locally

```bash
npm install
npm run dev
```

Vite will print a local URL, usually `http://127.0.0.1:5173/` unless another port is already in use.

Production build:

```bash
npm run build
```

## Data Status

The app currently combines hand-authored map-region fixtures with generated learning cards.

- First-pass rough import: completed for all 44 chapters of the working source outline.
- Second-pass close reading and richer card curation: completed through Chapter 8.
- Next chapter to process: Chapter 9, `第九章 中世纪文明使欧亚大陆实现整体化`.
- Current generated card count: 357.
- Current generated SQLite size: about 1.0 MB.
- Current generated JSON size: about 732 KB.

Second-pass curation files live in `data/curation/`.

Generated outputs such as `data/generated/`, extracted source text under `data/sources/`, and build artifacts are intentionally ignored by Git. This keeps the repository focused on code, schema, scripts, and curated data rather than generated or source-material dumps.

## Project Structure

```text
src/
  components/layout/        App shell and render boundary
  features/globe/           3D globe, map regions, labels, hover/click logic
  features/filters/         Sidebar filters and data summary
  features/content-panel/   Region/event/detail panels
  data/                     Frontend data adapters and map-country matching
  stores/                   Zustand state
  types/                    Shared TypeScript models

data/curation/              Reviewed learning-card JSON files
database/schema.sql         SQLite schema
scripts/                    Import, merge, audit, and build utilities
docs/                       Data model, source strategy, workflow, progress
```

## Data Workflow

Typical curation loop:

```bash
npm run cards:build:v2
npm run db:import:cards -- ../../outputs/global-history-learning-cards-v2.json
npm run cards:audit
npm run build
```

Notes:

- Use modern country boundaries for click targets.
- Put historical-boundary differences into `territoryComparison` only when the source content supports it.
- Keep important people inside the relevant event card.
- Do not display S/A/B/C importance ratings in the frontend.
- Prefer one primary map target for a card instead of placing the same card across every mentioned region.

More details:

- [Data model](docs/data-model.md)
- [Data sources](docs/data-sources.md)
- [Curation workflow](docs/curation-workflow.md)
- [Progress](docs/progress.md)
