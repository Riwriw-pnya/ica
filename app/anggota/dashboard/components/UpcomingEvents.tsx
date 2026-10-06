import Link from "next/link";
import type { EventListItem } from "@/types/anggota";

interface UpcomingEventsProps {
  items?: EventListItem[];
}

const DEFAULT_EVENTS: EventListItem[] = [
  {
    id: 1,
    day: "18",
    month: "OKT",
    title: "ICA Cat Show Bandung 2026",
    location: "Trans Convention Center, Bandung",
    scope: "Nasional",
    quota: 8,
    status: "Pendaftaran dibuka",
    registerHref: "/anggota/event",
  },
  {
    id: 2,
    day: "04",
    month: "NOV",
    title: "ICA Kitten Fest Jakarta",
    location: "Kuningan City Hall, Jakarta",
    scope: "Regional",
    quota: 0,
    status: "Segera dibuka",
    registerHref: "/anggota/event",
  },
  {
    id: 3,
    day: "15",
    month: "NOV",
    title: "Sertifikasi Manajemen Cattery Nasional ICA",
    location: "Online via Zoom & LMS ICA",
    scope: "Nasional",
    quota: 15,
    status: "Pendaftaran dibuka",
    registerHref: "/anggota/event",
  },
];

export default function UpcomingEvents({ items = [] }: UpcomingEventsProps) {
  const eventList = (items.length > 0 ? items : DEFAULT_EVENTS).slice(0, 3);
  
  // Mengunci URL target secara eksplisit agar tidak ada yang membawa angka ID (/1, /2, dst)
  const TARGET_URL = "/anggota/event";

  return (
    <section className="flex h-full flex-col justify-between rounded-2xl border border-[var(--color-ink-100,#EFE9E1)] bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--color-ink-900,#231A14)]">
          Event mendatang
        </h2>
        <Link
          href={TARGET_URL}
          className="shrink-0 text-[12px] font-medium text-[#D95D1E] hover:underline"
        >
          Semua <span className="text-[10px]">→</span>
        </Link>
      </div>

      {/* Mobile Carousel */}
      <div className="lg:hidden w-full overflow-x-auto touch-pan-x scrollbar-none snap-x snap-mandatory pb-1">
        <div className="flex gap-2.5 w-max">
          {eventList.map((event, index) => {
            const statusLabel = event.status || "Pendaftaran dibuka";
            const isOpened = statusLabel === "Pendaftaran dibuka";

            return (
              <Link
                key={`mobile-${event.id || index}`}
                href={TARGET_URL}
                className="group flex flex-col justify-between w-[200px] shrink-0 snap-start rounded-xl border border-[var(--color-ink-100,#EFE9E1)] bg-white p-3 transition-all hover:border-[#FCE3D2] cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg bg-[#FFF2E8] text-[#D95D1E]">
                    <span className="text-[11px] font-bold leading-none">{event.day || "18"}</span>
                    <span className="text-[7px] font-semibold uppercase mt-0.5">{event.month || "OKT"}</span>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[8px] font-semibold border ${
                      isOpened
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {statusLabel}
                  </span>
                </div>
                <div>
                  <h3 className="line-clamp-1 text-xs font-bold text-[var(--color-ink-900,#231A14)] group-hover:text-[#D95D1E]">
                    {event.title}
                  </h3>
                  <p className="truncate text-[10px] text-[var(--color-ink-400,#8C8078)]">
                    {event.location}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop List */}
      <div className="hidden lg:flex lg:flex-col gap-2.5 flex-1 justify-center">
        {eventList.map((event, index) => {
          const statusLabel = event.status || "Pendaftaran dibuka";
          const isOpened = statusLabel === "Pendaftaran dibuka";

          return (
            <Link
              key={`desktop-${event.id || index}`}
              href={TARGET_URL}
              className="group flex items-center justify-between gap-3 rounded-xl border border-[var(--color-ink-100,#EFE9E1)] bg-white p-2.5 transition-all duration-200 hover:border-[#FCE3D2] hover:bg-[#FFFDFB] cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl bg-[#FFF2E8] text-[#D95D1E]">
                  <span className="text-xs font-bold leading-none">{event.day || "18"}</span>
                  <span className="text-[8px] font-semibold uppercase mt-0.5">{event.month || "OKT"}</span>
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-xs font-bold text-[var(--color-ink-900,#231A14)] group-hover:text-[#D95D1E] transition-colors">
                    {event.title}
                  </h3>
                  <p className="mt-0.5 truncate text-[11px] text-[var(--color-ink-400,#8C8078)]">
                    {event.location}
                  </p>
                </div>
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
            </Link>
          );
        })}
      </div>
    </section>
  );
}