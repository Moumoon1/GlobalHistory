import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync
} from "node:fs";
import { dirname, join, resolve } from "node:path";

const basePath = resolve(process.argv[2] ?? "../../outputs/global-history-learning-cards.json");
const curationDir = resolve(process.argv[3] ?? "data/curation");
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

function chapterKey(chapter) {
  return String(chapter ?? "")
    .replace(/[（(][^）)]*[）)]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

if (!existsSync(curationDir)) {
  throw new Error(`Curation directory not found: ${curationDir}`);
}

const baseCards = readJson(basePath);
const batchFiles = readdirSync(curationDir)
  .filter((file) => file.endsWith(".json"))
  .sort();

const replacementCards = batchFiles.flatMap((file) => readJson(join(curationDir, file)));
const replacementChapters = new Set(
  replacementCards.map((card) => chapterKey(card.source?.chapter)).filter(Boolean)
);

if (replacementCards.length === 0) {
  throw new Error(`No replacement cards found in ${curationDir}`);
}

const replacementIds = new Set();
for (const card of replacementCards) {
  if (!card.id) throw new Error(`Replacement card missing id: ${card.title}`);
  if (replacementIds.has(card.id)) throw new Error(`Duplicate replacement id: ${card.id}`);
  replacementIds.add(card.id);
}

const keptCards = baseCards.filter(
  (card) => !replacementChapters.has(chapterKey(card.source?.chapter))
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
console.log(`Batch files:       ${batchFiles.length}`);
console.log(`Replacement cards: ${replacementCards.length}`);
console.log(`Replaced chapters: ${Array.from(replacementChapters).join(" / ")}`);
console.log(`Merged cards:      ${mergedCards.length}`);
console.log(`Output:            ${outputPath}`);
