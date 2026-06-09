import type { HistoricalRegion } from "../types/history";

type RegionFilters = {
  activeCategories: string[];
};

export function filterRegions(
  regions: HistoricalRegion[],
  filters: RegionFilters
): HistoricalRegion[] {
  return regions.filter((region) => {
    const matchesCategory =
      filters.activeCategories.length === 0 ||
      region.themes.some((theme) => filters.activeCategories.includes(theme)) ||
      region.events.some((event) => filters.activeCategories.includes(event.category));

    return matchesCategory;
  });
}
