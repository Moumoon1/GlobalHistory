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

export function RegionPanel({ region, periodId }: RegionPanelProps) {
  const periodLabel = periods.find((period) => period.id === periodId)?.label;

  const eventPeopleFallback = (people: HistoricalPerson[], eventIndex: number) =>
    eventIndex === 0 ? people : [];
  const eventImageFallback = (images: HistoryImage[], eventIndex: number) =>
    eventIndex === 0 ? images : [];

  if (!region) {
    return (
      <aside className="h-screen overflow-y-auto bg-[#fffaf0] px-6 py-6">
        <div className="flex h-full flex-col justify-center rounded-lg border border-dashed border-[#d8c8a8] px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8a7a61]">
            {periodLabel}
          </p>
          <h2 className="mt-3 text-2xl font-bold">选择一个区域</h2>
          <p className="mt-3 text-sm leading-6 text-[#6d604d]">
            点击现代地图区域后，这里会显示该地区在当前时间段的历史归属、重要事件、关键人物和插图。
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="h-screen overflow-y-auto bg-[#fffaf0] px-6 py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#6d604d]">{periodLabel}</p>
          <h2 className="mt-1 text-3xl font-bold">{region.modernName}</h2>
        </div>
        <span
          className="mt-1 h-5 w-5 shrink-0 rounded-full border border-black/10"
          style={{ background: region.color }}
        />
      </div>

      <p className="mt-5 rounded-lg bg-white px-4 py-4 text-sm leading-6 text-[#514838] shadow-sm">
        {region.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {region.themes.map((theme) => (
          <span
            key={theme}
            className="rounded-full border border-[#e3d6bd] bg-white px-3 py-1 text-xs font-semibold text-[#6d604d]"
          >
            {theme}
          </span>
        ))}
      </div>

      <section className="mt-7">
        <h3 className="text-base font-bold">当时归属</h3>
        <div className="mt-3 space-y-3">
          {region.historicalStatuses.map((status) => (
            <article
              key={`${status.name}-${status.type}`}
              className="rounded-lg border border-[#e3d6bd] bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-semibold">{status.name}</h4>
                <span className="shrink-0 rounded-full bg-[#edf4f1] px-2 py-1 text-xs font-semibold text-[#426c63]">
                  {status.type}
                </span>
              </div>
              {(status.startYear || status.endYear) && (
                <p className="mt-2 text-xs font-semibold text-[#8a7a61]">
                  {status.startYear ? `${status.startYear} 起` : ""}
                  {status.startYear && status.endYear ? " · " : ""}
                  {status.endYear ? `${status.endYear} 止` : ""}
                </p>
              )}
              <p className="mt-2 text-sm leading-6 text-[#6d604d]">
                {status.territoryNote}
              </p>
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
                className="rounded-lg border border-[#e3d6bd] bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-lg font-bold text-[#385c55]">
                    {event.year}
                  </p>
                  <span className="rounded-full bg-[#eef3df] px-2 py-1 text-xs font-semibold text-[#5d6b3c]">
                    {event.category}
                  </span>
                </div>
                <h4 className="mt-2 font-semibold">{event.title}</h4>
                <p className="mt-2 text-sm leading-6 text-[#6d604d]">
                  {event.description}
                </p>

                {eventImages.length > 0 && (
                  <div className="mt-3 grid gap-3">
                    {eventImages.map((image) => (
                      <figure
                        key={`${event.title}-${image.url}`}
                        className="overflow-hidden rounded-lg border border-[#efe4cd] bg-[#fffaf0]"
                      >
                        <img
                          src={image.url}
                          alt={image.caption}
                          className="h-36 w-full object-cover"
                          loading="lazy"
                        />
                        <figcaption className="px-3 py-2 text-xs leading-5 text-[#6d604d]">
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
                        className="rounded-lg border border-[#efe4cd] bg-[#fffaf0] px-2 py-1 text-xs text-[#6d604d]"
                      >
                        <strong className="text-ink">{person.name}</strong>
                        <span className="ml-1">{person.role}</span>
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
              className="rounded-lg border border-[#e3d6bd] bg-white p-4 shadow-sm"
            >
              <h4 className="font-semibold">{connection.title}</h4>
              <p className="mt-2 text-sm leading-6 text-[#6d604d]">
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
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg border border-[#e3d6bd] bg-white px-3 py-2 text-sm font-medium text-[#426c63] shadow-sm hover:bg-[#f6fbf8]"
            >
              {source.label}
            </a>
          ))}
        </div>
      </section>
    </aside>
  );
}
