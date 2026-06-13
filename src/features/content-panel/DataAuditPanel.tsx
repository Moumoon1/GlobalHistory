import { getGlobalAuditSummary, getPeriodAudit } from "../../data/learningAudit";
import { getCountryDisplayName } from "../../data/mapCountries";
import { useHistoryStore } from "../../stores/useHistoryStore";
import type { AuditIssueType } from "../../data/learningAudit";

const issueLabels: Record<AuditIssueType, string> = {
  "missing-location": "缺少地区",
  "unmapped-location": "未映射",
  "wide-range": "时间过宽",
  "brief-content": "内容偏短"
};

const issueDescriptions: Record<AuditIssueType, string> = {
  "missing-location": "没有明确现代地区提示，可能无法出现在地球上。",
  "unmapped-location": "地区名还没有坐标或地图映射。",
  "wide-range": "时间跨度较大，可能需要拆成更具体的节点。",
  "brief-content": "正文信息量偏少，后续适合补充。"
};

export function DataAuditPanel() {
  const { selectedPeriodId, activeCategories } = useHistoryStore();
  const audit = getPeriodAudit(selectedPeriodId, activeCategories);
  const global = getGlobalAuditSummary();
  const visibleIssues = audit.cards.filter((item) => item.issues.length > 0);

  return (
    <aside className="h-screen overflow-y-auto bg-canvas px-6 py-6">
      <div>
        <p className="text-sm font-semibold text-muted">{audit.period.label}</p>
        <h2 className="mt-1 text-3xl font-semibold tracking-normal">数据质检</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          检查当前时间段的内容密度、地区映射和需要人工复核的条目。
        </p>
      </div>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <Metric label="当前内容" value={audit.filteredTotal} />
        <Metric label="当前区域" value={audit.regionTotal} />
        <Metric label="需复核" value={audit.issueTotal} />
        <Metric label="全书总量" value={global.total} />
      </section>

      <section className="mt-6 rounded-lg bg-elevated p-4 shadow-soft">
        <h3 className="text-base font-bold">全局状态</h3>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted">
          <p>全书需复核：{global.issueTotal}</p>
          <p>未映射：{global.unmappedTotal}</p>
          <p>时间过宽：{global.wideRangeTotal}</p>
          <p>缺少地区：{global.missingLocationTotal}</p>
        </div>
      </section>

      <section className="mt-6">
        <h3 className="text-base font-bold">类型分布</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {audit.categoryCounts.length === 0 ? (
            <EmptyState text="当前筛选下没有内容。" />
          ) : (
            audit.categoryCounts.map((item) => (
              <span
                key={item.category}
                className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted"
              >
                {item.category} {item.total}
              </span>
            ))
          )}
        </div>
      </section>

      <section className="mt-6">
        <h3 className="text-base font-bold">地区分布</h3>
        <div className="mt-3 space-y-2">
          {audit.topRegions.length === 0 ? (
            <EmptyState text="当前筛选下没有可显示区域。" />
          ) : (
            audit.topRegions.map((item) => (
              <div
                key={item.countryName}
                className="flex items-center justify-between rounded-lg bg-elevated px-3 py-2 text-sm shadow-sm"
              >
                <span className="font-semibold text-[#484848]">{item.label}</span>
                <span className="rounded-full bg-rosewash px-2 py-1 text-xs font-bold text-accent">
                  {item.total}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="mt-6">
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-base font-bold">复核列表</h3>
          <p className="text-xs text-muted">{visibleIssues.length} 条</p>
        </div>
        <div className="mt-3 space-y-3 pb-6">
          {visibleIssues.length === 0 ? (
            <EmptyState text="当前时间段没有明显结构问题。" />
          ) : (
            visibleIssues.slice(0, 40).map(({ card, issues, unmappedCountries }) => (
              <article
                key={card.id}
                className="rounded-lg bg-elevated p-4 shadow-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-muted">
                      {card.timeRange} · {card.area}
                    </p>
                    <h4 className="mt-1 text-sm font-bold text-ink">{card.title}</h4>
                  </div>
                  <span className="shrink-0 rounded-full bg-rosewash px-2 py-1 text-xs font-semibold text-accent">
                    {card.category}
                  </span>
                </div>

                <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted">
                  {card.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {issues.map((issue) => (
                    <span
                      key={`${card.id}-${issue}`}
                      title={issueDescriptions[issue]}
                      className="rounded-full bg-rosewash px-2 py-1 text-xs font-semibold text-accent"
                    >
                      {issueLabels[issue]}
                    </span>
                  ))}
                </div>

                {unmappedCountries.length > 0 && (
                  <p className="mt-3 text-xs leading-5 text-accent">
                    未映射地区：
                    {unmappedCountries.map(getCountryDisplayName).join("、")}
                  </p>
                )}
              </article>
            ))
          )}
        </div>
      </section>
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-elevated px-4 py-3 shadow-soft">
      <p className="text-xs font-semibold text-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <p className="rounded-lg bg-surface px-3 py-3 text-sm leading-6 text-muted shadow-inner">
      {text}
    </p>
  );
}
