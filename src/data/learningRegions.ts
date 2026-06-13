import { learningCards } from "./learningCards";
import { getCountryDisplayName } from "./mapCountries";
import { periods } from "./periods";
import type {
  EventCategory,
  HistoricalRegion,
  HistoricalStatus,
  HistoryEvent,
  ImportanceLevel,
  Period
} from "../types/history";
import type { LearningCard } from "../types/learningCard";

type CountryMeta = {
  name: string;
  lat: number;
  lng: number;
};

export const countryMeta: Record<string, CountryMeta> = {
  Afghanistan: { name: "阿富汗", lat: 34, lng: 66 },
  Algeria: { name: "阿尔及利亚", lat: 28, lng: 2 },
  Australia: { name: "澳大利亚", lat: -25, lng: 134 },
  Canada: { name: "加拿大", lat: 56, lng: -106 },
  China: { name: "中国", lat: 35, lng: 103 },
  "Democratic Republic of the Congo": { name: "刚果盆地", lat: -3, lng: 23 },
  Egypt: { name: "埃及", lat: 26, lng: 30 },
  Ethiopia: { name: "埃塞俄比亚", lat: 9, lng: 40 },
  France: { name: "法国", lat: 46, lng: 2 },
  Germany: { name: "德国", lat: 51, lng: 10 },
  Greece: { name: "希腊", lat: 39, lng: 22 },
  India: { name: "印度", lat: 22, lng: 78 },
  Indonesia: { name: "印度尼西亚", lat: -2, lng: 118 },
  Iran: { name: "伊朗", lat: 32, lng: 54 },
  Iraq: { name: "伊拉克", lat: 33, lng: 44 },
  Israel: { name: "以色列/巴勒斯坦", lat: 31, lng: 35 },
  Italy: { name: "意大利", lat: 42, lng: 12 },
  Japan: { name: "日本", lat: 36, lng: 138 },
  Kazakhstan: { name: "哈萨克草原", lat: 48, lng: 67 },
  Kenya: { name: "肯尼亚", lat: 0, lng: 37 },
  Lebanon: { name: "黎巴嫩", lat: 34, lng: 36 },
  Malaysia: { name: "马来半岛", lat: 4, lng: 102 },
  Mexico: { name: "墨西哥", lat: 23, lng: -102 },
  Mongolia: { name: "蒙古草原", lat: 46, lng: 103 },
  Myanmar: { name: "缅甸", lat: 21, lng: 96 },
  Nepal: { name: "尼泊尔", lat: 28, lng: 84 },
  Nigeria: { name: "尼日利亚", lat: 9, lng: 8 },
  Oman: { name: "阿曼", lat: 21, lng: 57 },
  Pakistan: { name: "巴基斯坦", lat: 30, lng: 70 },
  Palestine: { name: "巴勒斯坦", lat: 31, lng: 35 },
  Peru: { name: "秘鲁", lat: -9, lng: -75 },
  Russia: { name: "欧亚草原西部", lat: 55, lng: 60 },
  "Saudi Arabia": { name: "阿拉伯半岛", lat: 24, lng: 45 },
  "South Africa": { name: "南非", lat: -30, lng: 24 },
  "South Korea": { name: "朝鲜半岛南部", lat: 36, lng: 128 },
  Spain: { name: "西班牙", lat: 40, lng: -4 },
  "Sri Lanka": { name: "斯里兰卡", lat: 7, lng: 81 },
  Sudan: { name: "苏丹", lat: 15, lng: 30 },
  Syria: { name: "叙利亚", lat: 35, lng: 38 },
  Tanzania: { name: "坦桑尼亚", lat: -6, lng: 35 },
  Thailand: { name: "泰国", lat: 15, lng: 101 },
  Tunisia: { name: "突尼斯", lat: 34, lng: 9 },
  Turkey: { name: "小亚细亚", lat: 39, lng: 35 },
  Ukraine: { name: "乌克兰", lat: 49, lng: 32 },
  "United Kingdom": { name: "英国", lat: 54, lng: -2 },
  "United States": { name: "美国", lat: 39, lng: -98 },
  Uzbekistan: { name: "乌兹别克斯坦", lat: 41, lng: 64 },
  Vietnam: { name: "越南", lat: 16, lng: 108 },
  Yemen: { name: "也门", lat: 15, lng: 48 }
};

const regionColors = [
  "#f3a6a6",
  "#f5c16c",
  "#8fc5a9",
  "#8fb8e8",
  "#d2a4e8",
  "#e5b184",
  "#b8ca73",
  "#7fc7c0",
  "#d9a0bd",
  "#c3b091"
];

function getPeriod(periodId: string): Period | undefined {
  return periods.find((period) => period.id === periodId);
}

export function overlapsPeriod(card: LearningCard, period: Period) {
  const startYear = card.startYear ?? Number.MIN_SAFE_INTEGER;
  const endYear = card.endYear ?? card.startYear ?? Number.MAX_SAFE_INTEGER;

  return startYear < period.endYear && endYear >= period.startYear;
}

export function getDuration(card: LearningCard) {
  if (card.startYear === null || card.endYear === null) return 0;
  return card.endYear - card.startYear;
}

function startsInPeriod(card: LearningCard, period: Period) {
  if (card.startYear === null) return false;
  return card.startYear >= period.startYear && card.startYear < period.endYear;
}

export function isLongRunningContext(card: LearningCard) {
  return getDuration(card) > 1500;
}

export function isCrossRegionalContext(card: LearningCard) {
  return isLongRunningContext(card) && card.modernCountryHints.length > 5;
}

export function shouldShowCardInPeriod(card: LearningCard, period: Period) {
  if (!overlapsPeriod(card, period)) return false;
  if (!isLongRunningContext(card)) return true;

  return startsInPeriod(card, period);
}

export function getCardCountries(card: LearningCard) {
  if (isCrossRegionalContext(card)) return ["__global__"];
  const primaryCountries = getPrimaryCardCountries(card);
  if (primaryCountries.length > 0) return primaryCountries;
  return ["__global__"];
}

function getPrimaryCardCountries(card: LearningCard) {
  if (card.primaryModernCountryHints?.length) return card.primaryModernCountryHints;

  const inferredCountry = inferPrimaryCountryFromArea(card.area);
  if (inferredCountry) return [inferredCountry];

  if (card.modernCountryHints.length > 4) {
    return card.modernCountryHints.slice(0, 1);
  }

  return card.modernCountryHints;
}

function inferPrimaryCountryFromArea(area: string) {
  const firstArea = area.split(/[、，,；;]/)[0]?.trim() ?? "";
  const areaCountryRules: Array<[RegExp, string]> = [
    [/^(日本|日本列岛|德川|江户|京都|长崎)/, "Japan"],
    [/^(中国|明朝中国|明清中国|清朝中国|汉帝国|秦|商|周|唐|宋|元|明|清|黄河|长江)/, "China"],
    [/^(印度|恒河|印度河|摩揭陀)/, "India"],
    [/^(埃及|尼罗河)/, "Egypt"],
    [/^(罗马|意大利)/, "Italy"],
    [/^(希腊|雅典|斯巴达)/, "Greece"],
    [/^(波斯|伊朗)/, "Iran"],
    [/^(两河|美索不达米亚|苏美尔|巴比伦|亚述)/, "Iraq"],
    [/^(墨西哥|中美洲|玛雅|阿兹特克)/, "Mexico"],
    [/^(秘鲁|安第斯|印加)/, "Peru"],
    [/^(俄罗斯|俄国|西伯利亚)/, "Russia"],
    [/^(葡萄牙)/, "Portugal"],
    [/^(西班牙)/, "Spain"],
    [/^(英国|英格兰)/, "United Kingdom"],
    [/^(法国|法兰西)/, "France"],
    [/^(德国|日耳曼)/, "Germany"],
    [/^(奥斯曼|小亚细亚|土耳其)/, "Turkey"]
  ];

  return areaCountryRules.find(([pattern]) => pattern.test(firstArea))?.[1] ?? null;
}

function cardToEvent(card: LearningCard): HistoryEvent {
  return {
    year: card.timeRange,
    title: card.title,
    category: card.category as EventCategory,
    importance: card.importance,
    description: card.summary,
    background: card.background,
    process: card.process,
    impact: card.impact,
    concepts: card.relatedConcepts,
    mapNote: card.mapNote,
    people: card.people
  };
}

function strongestImportance(cards: LearningCard[]): ImportanceLevel {
  if (cards.some((card) => card.importance === "S")) return "S";
  if (cards.some((card) => card.importance === "A")) return "A";
  if (cards.some((card) => card.importance === "B")) return "B";
  return "C";
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function getTerritoryStatuses(countryName: string, cards: LearningCard[]): HistoricalStatus[] {
  const statusType: HistoricalStatus["type"] =
    countryName === "__global__" ? "文明圈" : "区域势力";

  return cards
    .filter((card) => card.territoryComparison)
    .map((card) => ({
      name: card.territoryComparison?.historicalEntity ?? card.historicalStatus,
      type: statusType,
      territoryNote: card.area,
      relationToModernArea: card.territoryComparison?.relationToModernArea,
      missingFromModernArea: card.territoryComparison?.missingFromModernArea,
      additionalAreas: card.territoryComparison?.additionalAreas,
      sourceNote: card.territoryComparison?.sourceNote,
      startYear: card.startYear ?? undefined,
      endYear: card.endYear ?? undefined
    }));
}

function buildRegion(
  countryName: string,
  cards: LearningCard[],
  periodId: string,
  colorIndex: number
): HistoricalRegion {
  const meta =
    countryName === "__global__"
      ? { name: "跨区域主题", lat: 15, lng: 20 }
      : countryMeta[countryName] ?? {
          name: getCountryDisplayName(countryName),
          lat: 0,
          lng: 0
        };

  const topCards = cards.slice(0, 3).map((card) => card.title).join("、");

  return {
    id: `learning-${periodId}-${countryName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    periodId,
    name: meta.name,
    modernName: meta.name,
    type: countryName === "__global__" ? "macro-region" : "modern-area",
    color: regionColors[colorIndex % regionColors.length],
    labelPosition: {
      lat: meta.lat,
      lng: meta.lng
    },
    countryNames: countryName === "__global__" ? [] : [countryName],
    themes: unique(cards.map((card) => card.category as EventCategory)),
    importance: strongestImportance(cards),
    summary: `这一时期，${meta.name}相关的历史主题包括：${topCards}。`,
    historicalStatuses: getTerritoryStatuses(countryName, cards),
    events: cards.map(cardToEvent),
    people: cards.flatMap((card) => card.people),
    connections: unique(cards.map((card) => card.mapNote))
      .filter(Boolean)
      .slice(0, 3)
      .map((description, index) => ({
        title: index === 0 ? "地图提示" : `地图提示 ${index + 1}`,
        description
      })),
    images: [],
    sources: unique(cards.map((card) => card.source.chapter)).map((chapter) => ({
      label: chapter,
      url: "#"
    }))
  };
}

export function getLearningCardsForPeriod(periodId: string) {
  const period = getPeriod(periodId);
  if (!period) return [];

  return learningCards
    .filter((card) => shouldShowCardInPeriod(card, period))
    .sort((left, right) => (left.startYear ?? 0) - (right.startYear ?? 0));
}

export function getLearningRegionsForPeriod(periodId: string): HistoricalRegion[] {
  const cards = getLearningCardsForPeriod(periodId);
  const grouped = new Map<string, LearningCard[]>();

  for (const card of cards) {
    for (const countryName of getCardCountries(card)) {
      const nextCards = grouped.get(countryName) ?? [];
      nextCards.push(card);
      grouped.set(countryName, nextCards);
    }
  }

  return Array.from(grouped.entries()).map(([countryName, groupCards], index) =>
    buildRegion(countryName, groupCards, periodId, index)
  );
}
