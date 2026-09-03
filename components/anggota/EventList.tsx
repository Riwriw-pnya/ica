import Link from "next/link";
import type { EventListItem, EventStatus } from "@/types/anggota";

interface EventListProps {
  items: EventListItem[];
}

function getStatusStyle(status: EventStatus) {
  switch (status) {
    case "Pendaftaran dibuka":
      return "bg-[var(--color-success-bg)] text-[var(--color-success)]";
    case "Segera dibuka":
      return "bg-[var(--color-warning-bg)] text-[var(--color-warning)]";
    case "Draft jadwal":
      return "bg-[var(--color-ink-100)] text-[var(--color-ink-700)]";
  }
}

export default function EventList({ items }: EventListProps) {
  return (
    <div className="space-y-3">
      {items.map((event) => {
        const isRegistrationOpen = event.status !== "Draft jadwal";

        return (
          <div
            key={event.id}
            className="flex flex-col gap-4 rounded-xl border border-[var(--color-ink-100)] bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-[var(--color-brand-orange-50)]">
                <span className="text-lg font-semibold text-[var(--color-brand-orange-700)]">
                  {event.day}
                </span>
                <span className="text-[10px] font-medium text-[var(--color-brand-orange-700)]">
                  {event.month}
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[14px] font-semibold text-[var(--color-ink-900)]">
                    {event.title}
                  </h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${getStatusStyle(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                <p className="mt-0.5 text-[12px] text-[var(--color-ink-400)]">
                  {event.location} · {event.scope} · Kuota {event.quota} peserta
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2.5 pl-[68px] sm:pl-0">
              <Link
                href={`/anggota/leaderboard?event=${event.id}`}
                className="rounded-full border border-[var(--color-ink-100)] px-4 py-2 text-[12px] font-medium text-[var(--color-ink-700)]
                bg-gradient-to-b from-[var(--color-ink-300)] to-white shadow-sm shadow-black/5
                hover:shadow-md 
                hover:-translate-y-0.5 hover:brightness-95 
                active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] 
                transition-all duration-150 cursor-pointer">
                Leaderboard
              </Link>

              {isRegistrationOpen ? (
                <Link
                  href={event.registerHref}
                  className="rounded-full px-5 py-2.5 text-[12px] font-semibold text-white transition hover:brightness-95
                   bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs 
              shadow-[0_4px_12px_rgba(238,107,40,0.25)] 
              border-t border-[#FFE5D4]
              hover:-translate-y-0.5 hover:brightness-95 
              active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] 
              transition-all duration-150 cursor-pointer"
                >
                  Daftar ikut
                </Link>
              ) : (
                <button
                  disabled
                  className="cursor-not-allowed rounded-full bg-[var(--color-ink-100)] px-5 py-2 text-[12px] font-semibold text-[var(--color-ink-400)]"
                >
                  Daftar ikut
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}