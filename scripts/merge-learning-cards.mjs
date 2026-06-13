import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const basePath = resolve(process.argv[2] ?? "data/generated/learning-cards.json");
const replacementPath = resolve(
  process.argv[3] ?? "data/curation/global-history-v2-chapter1-2.json"
);
const outputPath = resolve(
  process.argv[4] ?? "../../outputs/global-history-learning-cards-v2.json"
);

function readJson(path) {
  if (!existsSync(path)) throw new Error(`File not found: ${path}`);
  return JSON.parse(readFileSync(path, "utf8"));
}

function cardSortKey(card) {
  return [
    card.startYear ?? Number.MAX_SAFE_INTEGER,
    card.endYear ?? Number.MAX_SAFE_INTEGER,
    card.source?.chapter ?? "",
    card.title ?? ""
  ];
}

const baseCards = readJson(basePath);
const replacementCards = readJson(replacementPath);
const replacementChapters = new Set(
  replacementCards.map((card) => card.source?.chapter).filter(Boolean)
);

if (replacementChapters.size === 0) {
  throw new Error("Replacement cards do not include source.chapter values.");
}

const ids = new Set();
for (const card of replacementCards) {
  if (!card.id) throw new Error(`Replacement card missing id: ${card.title}`);
  if (ids.has(card.id)) throw new Error(`Duplicate replacement id: ${card.id}`);
  ids.add(card.id);
}

const keptCards = baseCards.filter(
  (card) => !replacementChapters.has(card.source?.chapter)
);
const mergedCards = [...keptCards, ...replacementCards].sort((left, right) => {
  const leftKey = cardSortKey(left);
  const rightKey = cardSortKey(right);

  for (let index = 0; index < leftKey.length; index += 1) {
    if (leftKey[index] < rightKey[index]) return -1;
    if (leftKey[index] > rightKey[index]) return 1;
  }

  return 0;
});

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(mergedCards, null, 2)}\n`);

console.log(`Base cards:        ${baseCards.length}`);
console.log(`Replacement cards: ${replacementCards.length}`);
console.log(`Replaced chapters: ${Array.from(replacementChapters).join(" / ")}`);
console.log(`Merged cards:      ${mergedCards.length}`);
console.log(`Output:            ${outputPath}`);
