import type { EventCategory, RegionType } from "../types/history";

export const eventCategories: EventCategory[] = [
  "政治",
  "战争",
  "文化",
  "科技",
  "宗教",
  "贸易",
  "殖民"
];

export const regionTypes: { value: RegionType; label: string }[] = [
  { value: "empire", label: "帝国" },
  { value: "kingdom", label: "王国" },
  { value: "state", label: "国家" },
  { value: "colony", label: "殖民地" },
  { value: "region", label: "区域" },
  { value: "civilization", label: "文明圈" }
];
