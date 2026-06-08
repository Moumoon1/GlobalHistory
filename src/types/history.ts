import type { Feature, Polygon, MultiPolygon } from "geojson";

export type EventCategory =
  | "政治"
  | "战争"
  | "文化"
  | "科技"
  | "宗教"
  | "贸易"
  | "殖民";

export type RegionType =
  | "empire"
  | "kingdom"
  | "state"
  | "colony"
  | "region"
  | "civilization";

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
  description: string;
};

export type HistoricalPerson = {
  name: string;
  role: string;
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

export type RegionFeatureProperties = {
  regionId: string;
  name: string;
  color: string;
};

export type HistoricalRegion = {
  id: string;
  periodId: string;
  name: string;
  type: RegionType;
  color: string;
  labelPosition: {
    lat: number;
    lng: number;
  };
  countryNames?: string[];
  geometry: Feature<Polygon | MultiPolygon, RegionFeatureProperties>["geometry"];
  summary: string;
  events: HistoryEvent[];
  people: HistoricalPerson[];
  images: HistoryImage[];
  sources: Source[];
};
