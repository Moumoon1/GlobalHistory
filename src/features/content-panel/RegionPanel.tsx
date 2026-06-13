import { periods } from "../../data/periods";
import type {
  HistoricalPerson,
  HistoricalRegion,
  HistoryImage
} from "../../types/history";

type RegionPanelProps = {
  region: HistoricalRegion | null;
  periodId: string;
};

const relationLabels = {
  larger: "比当今范围更大",
  smaller: "比当今范围更小",
  similar: "接近当今范围",
  fragmented: "分属多个政权或区域",
  unclear: "书中未明确"
} as const;

export function RegionPanel({ region, periodId }: RegionPanelProps) {
  const periodLabel = periods.find((period) => period.id === periodId)?.label;

  const eventPeopleFallback = (people: HistoricalPerson[], eventIndex: number) =>
    eventIndex === 0 ? people : [];
  const eventImageFallback = (images: HistoryImage[], eventIndex: number) =>
    eventIndex === 0 ? images : [];

  if (!region) {
    return (
      <aside className="h-screen overflow-y-auto bg-canvas px-6 py-6">
        <div className="flex h-full flex-col justify-center rounded-lg bg-elevated px-6 text-center shadow-soft">
          <p className="text-sm font-semibold text-muted">
            {periodLabel}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-normal">
            选择一个区域
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            点击现代地图区域后，这里会显示该地区在当前时间段的历史归属、重要事件、关键人物和插图。
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="h-screen overflow-y-auto bg-canvas px-6 py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted">{periodLabel}</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-normal">
            {region.modernName}
          </h2>
        </div>
        <span
          className="mt-1 h-5 w-5 shrink-0 rounded-full shadow-sm ring-2 ring-white"
          style={{ background: region.color }}
        />
      </div>

      <p className="mt-5 rounded-lg bg-elevated px-4 py-4 text-sm leading-6 text-[#484848] shadow-soft">
        {region.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {region.themes.map((theme) => (
          <span
            key={theme}
            className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted"
          >
            {theme}
          </span>
        ))}
      </div>

      <section className="mt-7">
        <h3 className="text-base font-bold">当时归属</h3>
        <div className="mt-3 space-y-3">
          {region.historicalStatuses.length === 0 && (
            <div className="rounded-lg bg-surface px-4 py-4 text-sm leading-6 text-muted shadow-inner">
              书中暂未明确这一时期与当今地图范围的地界对比。
            </div>
          )}
          {region.historicalStatuses.map((status) => (
            <article
              key={`${status.name}-${status.type}`}
              className="rounded-lg bg-elevated p-4 shadow-soft"
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-semibold">{status.name}</h4>
                <span className="shrink-0 rounded-full bg-rosewash px-2 py-1 text-xs font-semibold text-accent">
                  {status.type}
                </span>
              </div>
              {(status.startYear || status.endYear) && (
                <p className="mt-2 text-xs font-semibold text-muted">
                  {status.startYear ? `${status.startYear} 起` : ""}
                  {status.startYear && status.endYear ? " · " : ""}
                  {status.endYear ? `${status.endYear} 止` : ""}
                </p>
              )}
              <div className="mt-3 space-y-3 text-sm leading-6 text-muted">
                {status.relationToModernArea && (
                  <div>
                    <span className="text-xs font-bold text-ink">与当今地图对比</span>
                    <p>{relationLabels[status.relationToModernArea]}</p>
                  </div>
                )}
                {status.missingFromModernArea && (
                  <div>
                    <span className="text-xs font-bold text-ink">当时未覆盖的部分</span>
                    <p>{status.missingFromModernArea}</p>
                  </div>
                )}
                {status.additionalAreas && (
                  <div>
                    <span className="text-xs font-bold text-ink">比当今多出的部分</span>
                    <p>{status.additionalAreas}</p>
                  </div>
                )}
                {status.territoryNote && (
                  <div>
                    <span className="text-xs font-bold text-ink">书中涉及范围</span>
                    <p>{status.territoryNote}</p>
                  </div>
                )}
                {status.sourceNote && (
                  <div>
                    <span className="text-xs font-bold text-ink">依据</span>
                    <p>{status.sourceNote}</p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <h3 className="text-base font-bold">重要事件</h3>
        <div className="mt-3 space-y-3">
          {region.events.map((event, eventIndex) => {
            const eventPeople =
              event.people ?? eventPeopleFallback(region.people, eventIndex);
            const eventImages =
              event.images ?? eventImageFallback(region.images, eventIndex);

            return (
              <article
                key={`${event.year}-${event.title}`}
                className="rounded-lg bg-elevated p-4 shadow-soft"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-lg font-semibold text-ink">
                    {event.year}
                  </p>
                  <span className="rounded-full bg-accent px-2 py-1 text-xs font-semibold text-white">
                    {event.category}
                  </span>
                </div>
                <h4 className="mt-2 font-semibold">{event.title}</h4>
                <p className="mt-2 text-sm leading-6 text-[#484848]">
                  {event.description}
                </p>

                {(event.background || event.process || event.impact) && (
                  <div className="mt-3 space-y-3 rounded-lg bg-surface px-3 py-3 text-sm leading-6 text-muted">
                    {event.background && (
                      <section>
                        <h5 className="text-xs font-bold text-ink">背景</h5>
                        <p className="mt-1">{event.background}</p>
                      </section>
                    )}
                    {event.process && (
                      <section>
                        <h5 className="text-xs font-bold text-ink">过程</h5>
                        <p className="mt-1">{event.process}</p>
                      </section>
                    )}
                    {event.impact && (
                      <section>
                        <h5 className="text-xs font-bold text-ink">影响</h5>
                        <p className="mt-1">{event.impact}</p>
                      </section>
                    )}
                  </div>
                )}

                {eventImages.length > 0 && (
                  <div className="mt-3 grid gap-3">
                    {eventImages.map((image) => (
                      <figure
                        key={`${event.title}-${image.url}`}
                        className="overflow-hidden rounded-lg bg-surface"
                      >
                        <img
                          src={image.url}
                          alt={image.caption}
                          className="h-36 w-full object-cover"
                          loading="lazy"
                        />
                        <figcaption className="px-3 py-2 text-xs leading-5 text-muted">
                          {image.caption} · {image.source}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                {eventPeople.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {eventPeople.map((person) => (
                      <span
                        key={`${event.title}-${person.name}`}
                        className="rounded-lg bg-surface px-2 py-1 text-xs text-muted"
                      >
                        <strong className="text-ink">{person.name}</strong>
                        <span className="ml-1">{person.role}</span>
                      </span>
                    ))}
                  </div>
                )}

                {event.concepts && event.concepts.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {event.concepts.slice(0, 8).map((concept) => (
                      <span
                        key={`${event.title}-${concept}`}
                        className="rounded-full bg-surface px-2 py-1 text-xs font-medium text-muted"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-7">
        <h3 className="text-base font-bold">跨区域联系</h3>
        <div className="mt-3 space-y-3">
          {region.connections.map((connection) => (
            <article
              key={connection.title}
              className="rounded-lg bg-elevated p-4 shadow-soft"
            >
              <h4 className="font-semibold">{connection.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted">
                {connection.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-7 pb-6">
        <h3 className="text-base font-bold">来源</h3>
        <div className="mt-3 space-y-2">
          {region.sources.map((source) => (
            <a
              key={`${source.label}-${source.url}`}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg bg-elevated px-3 py-2 text-sm font-semibold text-accent shadow-sm transition hover:bg-rosewash"
            >
              {source.label}
            </a>
          ))}
        </div>
      </section>
    </aside>
  );
}
