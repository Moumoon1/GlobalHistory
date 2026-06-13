export type LearningCard = {
  id: string;
  source: {
    bookTitle: string;
    chapter: string;
    sections: string[];
    sourceFile: string;
  };
  timeRange: string;
  timePrecision:
    | "year"
    | "year_range"
    | "century"
    | "century_range"
    | "approximate"
    | "approximate_range"
    | "period";
  startYear: number | null;
  endYear: number | null;
  area: string;
  modernCountryHints: string[];
  primaryModernCountryHints?: string[];
  territoryComparison?: {
    historicalEntity?: string;
    relationToModernArea?: "larger" | "smaller" | "similar" | "fragmented" | "unclear";
    missingFromModernArea?: string;
    additionalAreas?: string;
    sourceNote?: string;
  };
  historicalStatus: string;
  title: string;
  category: string;
  importance: "S" | "A" | "B" | "C";
  summary: string;
  background: string;
  process: string;
  impact: string;
  people: Array<{
    name: string;
    role: string;
  }>;
  sourceMentions?: string[];
  relatedConcepts: string[];
  mapNote: string;
  imageQueries?: string[];
  reviewStatus?: "draft" | "needs-review" | "reviewed";
  curationRound?: number;
};
