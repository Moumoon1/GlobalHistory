import { periods } from "../../data/periods";
import { useHistoryStore } from "../../stores/useHistoryStore";
import type { HistoricalRegion } from "../../types/history";

type LearningCardsPanelProps = {
  periodId: string;
  regions: HistoricalRegion[];
};

export function LearningCardsPanel({ periodId, regions }: LearningCardsPanelProps) {
  const setSelectedRegionId = useHistoryStore((state) => state.setSelectedRegionId);
  const periodLabel = periods.find((period) => period.id === periodId)?.label;
  const eventCount = regions.reduce((count, region) => count + region.events.length, 0);

  return (
    <aside className="h-screen overflow-y-auto bg-canvas px-6 py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted">{periodLabel}</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-normal">
            当前时间段
          </h2>
        </div>
        <span className="mt-1 rounded-full bg-rosewash px-3 py-1 text-xs font-bold text-accent">
          {regions.length}
        </span>
      </div>

      <div className="mt-5 rounded-lg bg-elevated p-4 shadow-soft">
        <p className="text-sm leading-6 text-[#484848]">
          这一时期涉及 <strong>{regions.length}</strong> 个地图区域，
          共 <strong>{eventCount}</strong> 条重要历史内容。点击地球上的高亮国家，
          或从下方区域列表选择，右侧会切换为该区域在这个时期的内容。
        </p>
      </div>

      <section className="mt-6">
        <h3 className="text-base font-bold">涉及区域</h3>
        <div className="mt-3 space-y-2">
          {regions.map((region) => (
            <button
              key={region.id}
              type="button"
              className="w-full rounded-lg bg-elevated px-3 py-3 text-left shadow-sm transition hover:bg-surfaceHover hover:shadow-soft"
              onClick={() => setSelectedRegionId(region.id)}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-ink">{region.name}</span>
                <span className="rounded-full bg-surface px-2 py-1 text-xs font-semibold text-muted">
                  {region.events.length}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted">
                {region.events.map((event) => event.title).join("、")}
              </p>
            </button>
          ))}
        </div>
      </section>

      <p className="mt-5 text-xs leading-5 text-muted">
        跨区域主题没有固定国家边界，会出现在列表里；有明确地点的内容会映射到地球上的对应现代区域。
      </p>
    </aside>
  );
}
