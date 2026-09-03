import Link from "next/link";
import type { EventListItem } from "@/types/dashboard_member";

interface UpcomingEventsProps {
  items: EventListItem[];
}

export default function UpcomingEvents({ items }: UpcomingEventsProps) {
  return (
    <section className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-sm font-semibold text-[var(--color-ink-900)]">
          Event mendatang
        </h2>

        <Link
          href="/dashboard_member/event"
          className="text-[11px] font-medium text-[var(--color-brand-orange-700)] rounded-lg px-3 py-1 transition hover:bg-[var(--color-brand-orange-50)]"
        >
          Semua →
        </Link>
      </div>

      <div className="mt-3 space-y-2">
        {items.map((event) => (
          <Link
            key={event.id}
            href={event.registerHref}
            className="halftone-hover hover-lift flex items-center gap-3 rounded-lg border border-[var(--color-ink-100)] p-2.5 hover:bg-gradient-to-b hover:from-white hover:to-[var(--color-brand-orange-100)]"
          >
            <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-[var(--color-brand-orange-50)]">
              <span className="text-xs font-semibold text-[var(--color-brand-orange-700)]">
                {event.day}
              </span>
              <span className="text-[8px] font-medium text-[var(--color-brand-orange-700)]">
                {event.month}
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-[11px] font-medium text-[var(--color-ink-900)]">
                {event.title}
              </h3>
              <p className="mt-0.5 text-[10px] text-[var(--color-ink-400)]">
                {event.location}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}