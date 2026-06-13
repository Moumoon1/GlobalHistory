import { learningCards, learningCardSummary } from "../../data/learningCards";

function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year} CE`;
}

export function DatabasePreview() {
  const samples = learningCards.slice(0, 3);

  return (
    <section className="rounded-lg bg-elevated p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">资料概览</h3>
          <p className="mt-1 text-xs leading-5 text-muted">
            已整理历史内容
          </p>
        </div>
        <span className="rounded-full bg-rosewash px-2 py-1 text-xs font-semibold text-accent">
          本地
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg bg-surface px-3 py-2">
          <p className="text-xs text-muted">内容</p>
          <p className="mt-1 font-semibold text-ink">{learningCardSummary.total}</p>
        </div>
        <div className="rounded-lg bg-surface px-3 py-2">
          <p className="text-xs text-muted">核心</p>
          <p className="mt-1 font-semibold text-ink">
            {learningCardSummary.highPriority}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-muted">
        {formatYear(learningCardSummary.earliestYear)} -{" "}
        {formatYear(learningCardSummary.latestYear)}
      </p>

      <div className="mt-3 space-y-2">
        {samples.map((event) => (
          <article
            key={event.id}
            className="rounded-lg bg-surface px-3 py-2"
          >
            <p className="text-xs font-semibold text-muted">
              {event.timeRange} · {event.area}
            </p>
            <p className="mt-1 text-xs leading-5 text-[#484848]">
              {event.title}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
