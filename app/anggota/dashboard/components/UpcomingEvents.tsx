import Link from "next/link";
import type { EventListItem } from "@/types/anggota";

interface UpcomingEventsProps {
  items?: EventListItem[];
}

export default function UpcomingEvents({ items = [] }: UpcomingEventsProps) {
  const eventList = items.length > 0 ? items : [];

  return (
    <section className="w-full max-w-full overflow-hidden rounded-2xl border border-[var(--color-ink-100,#EFE9E1)] bg-white p-4 sm:p-5 shadow-xs">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="font-display text-sm sm:text-base font-bold text-[var(--color-ink-900,#231A14)]">
          Event mendatang
        </h2>
        <Link
          href="/anggota/event"
          className="text-xs font-medium text-[var(--color-brand-orange-500)] hover:text-[var(--color-brand-orange-600)]"
        >
          Semua <span className="text-[10px]">→</span>
        </Link>
      </div>

      {/* 1. KHUSUS MOBILE: Carousel Scroll Horizontal */}
      <div className="lg:hidden w-full overflow-x-auto touch-pan-x scrollbar-none snap-x snap-mandatory pb-1">
        <div className="flex gap-3 w-max">
          {eventList.map((event, index) => {
            const statusLabel =
              event.status || (index === 0 ? "Pendaftaran dibuka" : "Segera dibuka");
            const isOpened = statusLabel === "Pendaftaran dibuka";

            return (
              <Link
                key={`mobile-${event.id || index}`}
                href={event.registerHref || `/anggota/event/${event.id}`}
                className="group flex flex-col justify-between w-[220px] shrink-0 snap-start rounded-xl border border-[var(--color-ink-100,#EFE9E1)] bg-white p-3 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg border border-[#FFD6B8] bg-[#FFF6EE] text-[#D95D1E]">
                    <span className="text-xs font-bold leading-none">{event.day || "12"}</span>
                    <span className="text-[8px] font-semibold uppercase mt-0.5">{event.month || "SEP"}</span>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold border ${
                      isOpened
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {statusLabel}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="line-clamp-2 text-xs font-bold leading-snug text-[var(--color-ink-900,#231A14)]">
                    {event.title}
                  </h3>
                  <p className="text-[10px] text-[var(--color-ink-400,#8C8078)]">
                    {event.location} {event.quota ? `· Kuota ${event.quota}` : "· Kuota 120"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 2. KHUSUS DESKTOP: List Vertikal Tumpuk Original */}
      <div className="hidden lg:flex lg:flex-col gap-2.5">
        {eventList.map((event, index) => (
          <Link
            key={`desktop-${event.id || index}`}
            href={event.registerHref || `/anggota/event/${event.id}`}
            className="group flex items-center gap-3 rounded-xl border border-[var(--color-ink-100,#EFE9E1)] bg-white p-3 transition hover:border-[#FFC299] hover:bg-[#FAF8F5]"
          >
            <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg border border-[#FFD6B8] bg-[#FFF6EE] text-[#D95D1E]">
              <span className="text-xs font-bold leading-none">{event.day || "12"}</span>
              <span className="text-[9px] font-semibold uppercase mt-0.5">{event.month || "SEP"}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-xs font-bold text-[var(--color-ink-900,#231A14)] group-hover:text-[#D95D1E] transition-colors">
                {event.title}
              </h3>
              <p className="mt-0.5 truncate text-[11px] text-[var(--color-ink-400,#8C8078)]">
                {event.location}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}