# Global History Project Progress

Last updated: 2026-06-13

## Current Status

- First-pass rough import: completed for all 44 chapters.
- Second-pass close reading and richer cards: completed through Chapter 8.
- Next chapter to process: Chapter 9, `第九章 中世纪文明使欧亚大陆实现整体化`.
- Current generated card count: 357.
- Current generated SQLite size: about 1.0 MB.
- Current generated JSON size: about 732 KB.

## Completed Second-Pass Files

- `data/curation/global-history-v2-chapter1-2.json`
  - Chapter 1: 15 cards
  - Chapter 2: 15 cards
- `data/curation/global-history-v2-chapter3.json`
  - Chapter 3: 28 cards
- `data/curation/global-history-v2-chapter4.json`
  - Chapter 4: 27 cards
- `data/curation/global-history-v2-chapter5.json`
  - Chapter 5: 34 cards
  - Includes 13 `territoryComparison` entries for the revised "当时归属" panel.
- `data/curation/global-history-v2-chapter6.json`
  - Chapter 6: 25 cards
  - Includes 9 `territoryComparison` entries for India-related historical boundary context.
- `data/curation/global-history-v2-chapter7.json`
  - Chapter 7: 29 cards
  - Includes 8 `territoryComparison` entries for China-related historical boundary context.
- `data/curation/global-history-v2-chapter8.json`
  - Chapter 8: 32 cards
  - Includes 14 `territoryComparison` entries for late-antique Eurasian and post-Roman boundary context.

## Data Rules To Keep

- Do not treat ordinary event summaries as "当时归属".
- Use `territoryComparison` only when the source text supports a map-boundary comparison.
- If the book does not clearly state a boundary comparison, leave `territoryComparison` empty.
- For globe matching, prefer `primaryModernCountryHints` when a card mentions multiple related regions.
- Avoid placing a card on every country it mentions. Use the main historical area as the primary map target.
- Use modern country boundaries for click targets, but explain historical mismatch in the right panel when source-supported.
- Keep important people inside event cards, not as a separate global people block.
- Do not show letter ratings such as S/A/B/C in the frontend.

## Standard Continue Workflow

1. Read the next chapter source text from `data/sources/global-history/text`.
2. Check the old rough cards for that chapter in `data/generated/learning-cards.json`.
3. Create a new second-pass file in `data/curation`.
4. Use the same rich card structure as Chapters 3-5.
5. Run:

```bash
npm run cards:build:v2
npm run db:import:cards -- ../../outputs/global-history-learning-cards-v2.json
npm run cards:audit
npm run build
```

## Notes For The Next Session

- Start from Chapter 9, not Chapter 8.
- Chapter naming must match the source outline, otherwise old rough cards may not be replaced.
- Previous mismatch example: `第五章 希腊-罗马文明` did not replace `第五章 希腊——罗马文明`.
- If a new chapter file uses a different chapter title, normalize it before merging.
- The Vite build warning about chunk size is expected because of 3D globe dependencies.
