# Curation Workflow

## Second-round goal

The first pass proves the pipeline from EPUB to JSON, SQLite, globe regions, cards, and audit views. The second pass rebuilds content quality chapter by chapter.

Second-round cards should not treat first-pass cards as fixed containers. They can replace, split, merge, or delete first-pass cards for the same chapter.

## Card rules

- Read one full chapter before writing cards.
- Generate cards from independent learning themes, not from mechanical paragraph splits.
- Each card should have a clear time range, area, modern map hints, historical status, category, summary, background, process, and impact.
- Keep `people` for historical actors only. Authors, researchers, missionaries, and observers go into `sourceMentions`.
- Put broad interpretive material into fewer cross-region cards. Put concrete regional processes into mapped region cards.
- Avoid duplicate cards by checking title similarity, overlapping time ranges, and shared regions.
- Use `imageQueries` for future image search. Do not store images locally in this phase.

## Current batch flow

Create a chapter replacement file under:

```bash
data/curation/
```

Merge it into the full card set:

```bash
npm run cards:merge:v2
```

Audit duplicates and quality:

```bash
node scripts/audit-learning-cards.mjs ../../outputs/global-history-learning-cards-v2.json
```

Import the merged file:

```bash
npm run db:build
node scripts/import-learning-cards.mjs ../../outputs/global-history-learning-cards-v2.json
```

Verify the app:

```bash
npm run build
```
