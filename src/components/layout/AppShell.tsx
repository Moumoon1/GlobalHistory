import { useMemo } from "react";
import { FilterSidebar } from "../../features/filters/FilterSidebar";
import { HistoryGlobe } from "../../features/globe/HistoryGlobe";
import { RegionPanel } from "../../features/content-panel/RegionPanel";
import { getRegionsForPeriod } from "../../data/regions";
import { useHistoryStore } from "../../stores/useHistoryStore";
import { filterRegions } from "../../utils/filterRegions";

export function AppShell() {
  const {
    selectedPeriodId,
    selectedRegionId,
    activeCategories,
    activeRegionTypes
  } = useHistoryStore();

  const allRegions = useMemo(
    () => getRegionsForPeriod(selectedPeriodId),
    [selectedPeriodId]
  );

  const visibleRegions = useMemo(
    () =>
      filterRegions(allRegions, {
        activeCategories,
        activeRegionTypes
      }),
    [activeCategories, activeRegionTypes, allRegions]
  );

  const selectedRegion =
    allRegions.find((region) => region.id === selectedRegionId) ?? null;

  return (
    <main className="grid h-screen grid-cols-[280px_minmax(0,1fr)_380px] bg-[#f7efe0] text-ink">
      <FilterSidebar regions={visibleRegions} />
      <section className="relative overflow-hidden border-x border-[#d8c8a8] bg-ocean">
        <HistoryGlobe regions={visibleRegions} selectedRegion={selectedRegion} />
        <div className="pointer-events-none absolute left-6 top-5 rounded-lg bg-white/75 px-4 py-3 shadow-panel backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5b6b73]">
            History Globe
          </p>
          <h1 className="mt-1 text-xl font-bold">同一时期的世界格局</h1>
        </div>
      </section>
      <RegionPanel region={selectedRegion} periodId={selectedPeriodId} />
    </main>
  );
}
