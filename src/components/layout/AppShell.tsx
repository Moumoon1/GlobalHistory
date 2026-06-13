import { lazy, Suspense, useMemo } from "react";
import { RenderBoundary } from "./RenderBoundary";
import { FilterSidebar } from "../../features/filters/FilterSidebar";
import { LearningCardsPanel } from "../../features/content-panel/LearningCardsPanel";
import { RegionPanel } from "../../features/content-panel/RegionPanel";
import { getRegionsForPeriod } from "../../data/regions";
import { useHistoryStore } from "../../stores/useHistoryStore";
import { filterRegions } from "../../utils/filterRegions";

const HistoryGlobe = lazy(() =>
  import("../../features/globe/HistoryGlobe").then((module) => ({
    default: module.HistoryGlobe
  }))
);

export function AppShell() {
  const {
    selectedPeriodId,
    selectedRegionId,
    activeCategories
  } = useHistoryStore();

  const allRegions = useMemo(
    () => getRegionsForPeriod(selectedPeriodId),
    [selectedPeriodId]
  );

  const visibleRegions = useMemo(
    () =>
      filterRegions(allRegions, {
        activeCategories
      }),
    [activeCategories, allRegions]
  );

  const selectedRegion =
    allRegions.find((region) => region.id === selectedRegionId) ?? null;

  return (
    <main className="grid h-screen grid-cols-[300px_minmax(0,1fr)_400px] bg-canvas text-ink">
      <FilterSidebar regions={visibleRegions} />
      <section className="relative overflow-hidden bg-ocean shadow-[inset_14px_0_28px_rgba(34,34,34,0.04),inset_-14px_0_28px_rgba(34,34,34,0.04)]">
        <RenderBoundary
          fallback={
            <div className="flex h-full items-center justify-center px-10 text-center">
              <div className="max-w-sm rounded-lg bg-white/90 p-5 shadow-panel">
                <h2 className="text-base font-bold text-ink">当前浏览器未启用 WebGL</h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  筛选和内容仍可正常使用。使用支持 WebGL 的浏览器时会显示 3D 地球。
                </p>
              </div>
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center px-10 text-center">
                <div className="rounded-lg bg-white/90 px-5 py-4 text-sm font-semibold text-muted shadow-panel">
                  正在加载地球
                </div>
              </div>
            }
          >
            <HistoryGlobe regions={visibleRegions} selectedRegion={selectedRegion} />
          </Suspense>
        </RenderBoundary>
        <div className="pointer-events-none absolute left-6 top-5 rounded-lg bg-white/90 px-4 py-3 shadow-panel backdrop-blur">
          <p className="text-xs font-bold text-accent">世界历史</p>
          <h1 className="mt-1 text-xl font-semibold tracking-normal">
            同一时期的世界格局
          </h1>
        </div>
      </section>
      {selectedRegion ? (
        <RegionPanel region={selectedRegion} periodId={selectedPeriodId} />
      ) : (
        <LearningCardsPanel periodId={selectedPeriodId} regions={visibleRegions} />
      )}
    </main>
  );
}
