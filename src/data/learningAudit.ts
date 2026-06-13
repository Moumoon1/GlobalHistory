import { learningCards } from "./learningCards";
import { periods } from "./periods";
import {
  countryMeta,
  getCardCountries,
  getDuration,
  getLearningCardsForPeriod,
  isCrossRegionalContext
} from "./learningRegions";
import { getCountryDisplayName, isMappableCountryName } from "./mapCountries";
import type { EventCategory, Period } from "../types/history";
import type { LearningCard } from "../types/learningCard";

export type AuditIssueType =
  | "missing-location"
  | "unmapped-location"
  | "wide-range"
  | "brief-content";

export type AuditedLearningCard = {
  card: LearningCard;
  mappedCountries: string[];
  unmappedCountries: string[];
  issues: AuditIssueType[];
};

export type PeriodAudit = {
  period: Period;
  total: number;
  filteredTotal: number;
  regionTotal: number;
  issueTotal: number;
  cards: AuditedLearningCard[];
  allCardsInPeriod: LearningCard[];
  topRegions: Array<{
    countryName: string;
    label: string;
    total: number;
  }>;
  categoryCounts: Array<{
    category: EventCategory;
    total: number;
  }>;
};

function getPeriod(periodId: string) {
  return periods.find((period) => period.id === periodId) ?? periods[0];
}

function matchesCategories(card: LearningCard, categories: EventCategory[]) {
  return categories.length === 0 || categories.includes(card.category as EventCategory);
}

function getTextSize(card: LearningCard) {
  return [card.summary, card.background, card.process, card.impact]
    .filter(Boolean)
    .join("")
    .length;
}

function getIssues(card: LearningCard, unmappedCountries: string[]): AuditIssueType[] {
  const issues: AuditIssueType[] = [];
  const duration = getDuration(card);

  if (card.modernCountryHints.length === 0 && !isCrossRegionalContext(card)) {
    issues.push("missing-location");
  }

  if (unmappedCountries.length > 0) {
    issues.push("unmapped-location");
  }

  if (duration > 500 && !isCrossRegionalContext(card)) {
    issues.push("wide-range");
  }

  if (getTextSize(card) < 160) {
    issues.push("brief-content");
  }

  return issues;
}

function auditCard(card: LearningCard): AuditedLearningCard {
  const countries = getCardCountries(card);
  const mappedCountries = countries.filter(
    (country) => country === "__global__" || isMappableCountryName(country)
  );
  const unmappedCountries = countries.filter(
    (country) => country !== "__global__" && !isMappableCountryName(country)
  );

  return {
    card,
    mappedCountries,
    unmappedCountries,
    issues: getIssues(card, unmappedCountries)
  };
}

function countByCategory(cards: LearningCard[]) {
  const counts = new Map<EventCategory, number>();

  for (const card of cards) {
    const category = card.category as EventCategory;
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([category, total]) => ({ category, total }))
    .sort((left, right) => right.total - left.total);
}

function countByRegion(cards: LearningCard[]) {
  const counts = new Map<string, number>();

  for (const card of cards) {
    for (const country of getCardCountries(card)) {
      counts.set(country, (counts.get(country) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([countryName, total]) => ({
      countryName,
      label:
        countryName === "__global__"
          ? "跨区域主题"
          : countryMeta[countryName]?.name ?? getCountryDisplayName(countryName),
      total
    }))
    .sort((left, right) => right.total - left.total);
}

export function getPeriodAudit(
  periodId: string,
  activeCategories: EventCategory[] = []
): PeriodAudit {
  const period = getPeriod(periodId);
  const allCardsInPeriod = getLearningCardsForPeriod(period.id);
  const filteredCards = allCardsInPeriod.filter((card) =>
    matchesCategories(card, activeCategories)
  );
  const cards = filteredCards.map(auditCard);
  const regionTotal = new Set(cards.flatMap((item) => item.mappedCountries)).size;
  const issueTotal = cards.filter((item) => item.issues.length > 0).length;

  return {
    period,
    total: learningCards.length,
    filteredTotal: filteredCards.length,
    regionTotal,
    issueTotal,
    cards,
    allCardsInPeriod,
    topRegions: countByRegion(filteredCards).slice(0, 12),
    categoryCounts: countByCategory(filteredCards)
  };
}

export function getGlobalAuditSummary() {
  const audited = learningCards.map(auditCard);

  return {
    total: learningCards.length,
    issueTotal: audited.filter((item) => item.issues.length > 0).length,
    unmappedTotal: audited.filter((item) => item.unmappedCountries.length > 0).length,
    wideRangeTotal: audited.filter((item) => item.issues.includes("wide-range")).length,
    missingLocationTotal: audited.filter((item) =>
      item.issues.includes("missing-location")
    ).length
  };
}
