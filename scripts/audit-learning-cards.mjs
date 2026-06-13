import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const cardsPath = resolve(process.argv[2] ?? "data/generated/learning-cards.json");

function readJson(path) {
  if (!existsSync(path)) throw new Error(`File not found: ${path}`);
  return JSON.parse(readFileSync(path, "utf8"));
}

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^\p{Script=Han}a-z0-9]+/gu, "")
    .trim();
}

function tokens(value) {
  return Array.from(new Set(normalizeText(value).match(/[\p{Script=Han}]|[a-z0-9]+/gu) ?? []));
}

function jaccard(left, right) {
  const leftTokens = tokens(left);
  const rightTokens = tokens(right);
  if (leftTokens.length === 0 || rightTokens.length === 0) return 0;

  const rightSet = new Set(rightTokens);
  const intersection = leftTokens.filter((item) => rightSet.has(item)).length;
  return intersection / (leftTokens.length + rightTokens.length - intersection);
}

function overlaps(left, right) {
  const leftStart = left.startYear ?? Number.MIN_SAFE_INTEGER;
  const leftEnd = left.endYear ?? left.startYear ?? Number.MAX_SAFE_INTEGER;
  const rightStart = right.startYear ?? Number.MIN_SAFE_INTEGER;
  const rightEnd = right.endYear ?? right.startYear ?? Number.MAX_SAFE_INTEGER;
  return leftStart < rightEnd && rightStart < leftEnd;
}

function duration(card) {
  if (card.startYear === null || card.endYear === null) return 0;
  return card.endYear - card.startYear;
}

const cards = readJson(cardsPath);
const duplicateIds = new Map();
const exactTitles = new Map();
const nearDuplicates = [];

for (const card of cards) {
  duplicateIds.set(card.id, (duplicateIds.get(card.id) ?? 0) + 1);
  const titleKey = normalizeText(card.title);
  if (titleKey) {
    const group = exactTitles.get(titleKey) ?? [];
    group.push(card);
    exactTitles.set(titleKey, group);
  }
}

for (let leftIndex = 0; leftIndex < cards.length; leftIndex += 1) {
  for (let rightIndex = leftIndex + 1; rightIndex < cards.length; rightIndex += 1) {
    const left = cards[leftIndex];
    const right = cards[rightIndex];
    if (!overlaps(left, right)) continue;

    const sameCountries = (left.modernCountryHints ?? []).some((country) =>
      (right.modernCountryHints ?? []).includes(country)
    );
    if (!sameCountries && left.area !== right.area) continue;

    const score = Math.max(
      jaccard(left.title, right.title),
      jaccard(`${left.title}${left.summary}`, `${right.title}${right.summary}`)
    );

    if (score >= 0.72) {
      nearDuplicates.push({
        score: Number(score.toFixed(2)),
        left: left.id,
        right: right.id,
        title: `${left.title} / ${right.title}`
      });
    }
  }
}

const idProblems = Array.from(duplicateIds.entries()).filter(([, count]) => count > 1);
const titleProblems = Array.from(exactTitles.values())
  .filter((group) => group.length > 1)
  .map((group) => group.map((card) => card.id));
const wideCards = cards
  .filter((card) => duration(card) > 1500 && (card.modernCountryHints ?? []).length <= 5)
  .map((card) => ({
    id: card.id,
    title: card.title,
    duration: duration(card)
  }));
const briefCards = cards
  .filter((card) =>
    [card.summary, card.background, card.process, card.impact].join("").length < 180
  )
  .map((card) => ({
    id: card.id,
    title: card.title
  }));

console.log(JSON.stringify(
  {
    total: cards.length,
    duplicateIds: idProblems,
    exactTitleDuplicates: titleProblems,
    nearDuplicates: nearDuplicates.slice(0, 50),
    wideCards: wideCards.slice(0, 80),
    briefCards: briefCards.slice(0, 80)
  },
  null,
  2
));
