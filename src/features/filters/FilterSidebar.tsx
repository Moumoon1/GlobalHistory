import { eventCategories } from "../../data/categories";
import { periods } from "../../data/periods";
import { useHistoryStore } from "../../stores/useHistoryStore";
import type { HistoricalRegion } from "../../types/history";
import { DatabasePreview } from "./DatabasePreview";

type FilterSidebarProps = {
  regions: HistoricalRegion[];
};

export function FilterSidebar({ regions }: FilterSidebarProps) {
  const {
    selectedPeriodId,
    selectedRegionId,
    activeCategories,
    setSelectedPeriodId,
    setSelectedRegionId,
    toggleCategory,
    clearFilters
  } = useHistoryStore();

  return (
    <aside className="flex h-screen flex-col gap-6 overflow-y-auto bg-canvas px-5 py-5">
      <div className="rounded-lg bg-elevated px-4 py-4 shadow-soft">
        <p className="text-xs font-bold text-accent">Global History</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-normal">世界历史地图</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          按时间和地区浏览同一时期的历史内容。
        </p>
      </div>

      <section>
        <label className="text-sm font-semibold text-ink" htmlFor="period">
          时间段
        </label>
        <div className="relative mt-3">
          <select
            id="period"
            className="w-full appearance-none rounded-full bg-elevated py-3 pl-4 pr-11 text-sm font-medium shadow-soft outline-none transition hover:bg-white focus:ring-2 focus:ring-accent/25"
            value={selectedPeriodId}
            onChange={(event) => setSelectedPeriodId(event.target.value)}
          >
            {periods.map((period) => (
              <option key={period.id} value={period.id}>
                {period.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-muted" />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">事件类型</h3>
          <button
            type="button"
            className="text-xs font-semibold text-accent hover:text-[#d61f45]"
            onClick={clearFilters}
          >
            清空
          </button>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {eventCategories.map((category) => {
            const active = activeCategories.includes(category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-accent text-white shadow-soft"
                    : "bg-elevated text-[#484848] shadow-sm hover:bg-surfaceHover"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <div className="rounded-lg bg-ink p-4 text-white shadow-panel">
        <p className="text-sm font-semibold text-white/70">当前显示</p>
        <p className="mt-1 text-3xl font-semibold">{regions.length}</p>
        <p className="text-sm text-white/70">个历史区域</p>
      </div>

      <DatabasePreview />

      <section>
        <h3 className="text-sm font-semibold">区域列表</h3>
        <div className="mt-3 space-y-2">
          {regions.length === 0 ? (
            <p className="rounded-lg bg-surface px-3 py-3 text-sm leading-6 text-muted shadow-inner">
              这个时间段的数据还没有添加。
            </p>
          ) : (
            regions.map((region) => {
              const active = selectedRegionId === region.id;
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setSelectedRegionId(region.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                    active
                      ? "bg-ink text-white shadow-soft"
                      : "bg-elevated text-[#484848] shadow-sm hover:bg-surfaceHover"
                  }`}
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full shadow-sm ring-2 ring-white/70"
                    style={{ background: region.color }}
                  />
                  <span>{region.name}</span>
                </button>
              );
            })
          )}
        </div>
      </section>
    </aside>
  );
}
