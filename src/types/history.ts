export type EventCategory =
  | "政治"
  | "战争"
  | "文化"
  | "科技"
  | "宗教"
  | "贸易"
  | "殖民";

export type ImportanceLevel = "S" | "A" | "B" | "C";

export type RegionType = "modern-area" | "macro-region";

export type Period = {
  id: string;
  label: string;
  startYear: number;
  endYear: number;
};

export type HistoryEvent = {
  year: number;
  title: string;
  category: EventCategory;
  importance: ImportanceLevel;
  description: string;
};

export type HistoricalPerson = {
  name: string;
  role: string;
};

export type HistoricalStatus = {
  name: string;
  type: "政权" | "文明圈" | "殖民势力" | "区域势力" | "多政权并存";
  territoryNote: string;
  startYear?: number;
  endYear?: number;
};

export type HistoryImage = {
  url: string;
  caption: string;
  source: string;
};

export type Source = {
  label: string;
  url: string;
};

export type GlobalConnection = {
  title: string;
  description: string;
};

export type HistoricalRegion = {
  id: string;
  periodId: string;
  name: string;
  modernName: string;
  type: RegionType;
  color: string;
  labelPosition: {
    lat: number;
    lng: number;
  };
  countryNames?: string[];
  themes: EventCategory[];
  importance: ImportanceLevel;
  summary: string;
  historicalStatuses: HistoricalStatus[];
  events: HistoryEvent[];
  people: HistoricalPerson[];
  connections: GlobalConnection[];
  images: HistoryImage[];
  sources: Source[];
};
