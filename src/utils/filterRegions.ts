import type { HistoricalRegion } from "../types/history";

type RegionFilters = {
  activeCategories: string[];
  activeRegionTypes: string[];
};

export function filterRegions(
  regions: HistoricalRegion[],
  filters: RegionFilters
): HistoricalRegion[] {
  return regions.filter((region) => {
    const matchesType =
      filters.activeRegionTypes.length === 0 ||
      filters.activeRegionTypes.includes(region.type);

    const matchesCategory =
      filters.activeCategories.length === 0 ||
      region.events.some((event) => filters.activeCategories.includes(event.category));

    return matchesType && matchesCategory;
  });
}
