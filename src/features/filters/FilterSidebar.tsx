import { eventCategories, regionTypes } from "../../data/categories";
import { periods } from "../../data/periods";
import { useHistoryStore } from "../../stores/useHistoryStore";
import type { HistoricalRegion } from "../../types/history";

type FilterSidebarProps = {
  regions: HistoricalRegion[];
};

export function FilterSidebar({ regions }: FilterSidebarProps) {
  const {
    selectedPeriodId,
    selectedRegionId,
    activeCategories,
    activeRegionTypes,
    setSelectedPeriodId,
    setSelectedRegionId,
    toggleCategory,
    toggleRegionType,
    clearFilters
  } = useHistoryStore();

  return (
    <aside className="flex h-screen flex-col gap-6 overflow-y-auto bg-parchment px-5 py-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a6a50]">
          Controls
        </p>
        <h2 className="mt-2 text-2xl font-bold">世界历史地图</h2>
        <p className="mt-2 text-sm leading-6 text-[#6d604d]">
          选择一个时间段，再点击地球上的区域查看同期历史内容。
        </p>
      </div>

      <section>
        <label className="text-sm font-semibold text-ink" htmlFor="period">
          时间段
        </label>
        <select
          id="period"
          className="mt-3 w-full rounded-lg border border-[#cdbd9f] bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-[#6d8f86] focus:ring-2 focus:ring-[#8fb8aa]/30"
          value={selectedPeriodId}
          onChange={(event) => setSelectedPeriodId(event.target.value)}
        >
          {periods.map((period) => (
            <option key={period.id} value={period.id}>
              {period.label}
            </option>
          ))}
        </select>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">事件类型</h3>
          <button
            type="button"
            className="text-xs font-medium text-[#5f766f] hover:text-[#314a43]"
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
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "border-[#3f766d] bg-[#d7eee8] text-[#244c45]"
                    : "border-[#d6c7aa] bg-white text-[#6d604d] hover:border-[#9fb4ab]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold">区域类型</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {regionTypes.map((regionType) => {
            const active = activeRegionTypes.includes(regionType.value);
            return (
              <button
                key={regionType.value}
                type="button"
                onClick={() => toggleRegionType(regionType.value)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "border-[#8c6245] bg-[#f5d6bd] text-[#633d26]"
                    : "border-[#d6c7aa] bg-white text-[#6d604d] hover:border-[#c6a98f]"
                }`}
              >
                {regionType.label}
              </button>
            );
          })}
        </div>
      </section>

      <div className="rounded-lg border border-[#d6c7aa] bg-white/70 p-4">
        <p className="text-sm font-semibold">当前显示</p>
        <p className="mt-1 text-3xl font-bold text-[#385c55]">{regions.length}</p>
        <p className="text-sm text-[#6d604d]">个历史区域</p>
      </div>

      <section>
        <h3 className="text-sm font-semibold">区域列表</h3>
        <div className="mt-3 space-y-2">
          {regions.length === 0 ? (
            <p className="rounded-lg border border-dashed border-[#d6c7aa] bg-white/70 px-3 py-3 text-sm leading-6 text-[#7a6a50]">
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
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm font-semibold transition ${
                    active
                      ? "border-[#3f766d] bg-[#d7eee8] text-[#244c45]"
                      : "border-[#d6c7aa] bg-white text-[#514838] hover:border-[#9fb4ab]"
                  }`}
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full border border-black/10"
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
