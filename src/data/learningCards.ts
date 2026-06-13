import learningCardsJson from "../../data/generated/learning-cards.json";
import type { LearningCard } from "../types/learningCard";

export const learningCards = learningCardsJson as LearningCard[];

const years = learningCards
  .flatMap((card) => [card.startYear, card.endYear])
  .filter((year): year is number => year !== null);

export const learningCardSummary = {
  total: learningCards.length,
  highPriority: learningCards.filter((card) => card.importance === "S").length,
  earliestYear: Math.min(...years),
  latestYear: Math.max(...years)
};
