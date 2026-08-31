import { upcomingEvents } from "@/data/dashboard_member";

export default function UpcomingEvents() {
  return (
    <section className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[var(--color-ink-900)]">
          Event mendatang
        </h2>

        <div className="cursor-pointer text-[11px] font-body text-[var(--color-brand-orange-700)]">
          Semua →
        </div>
      </div>

      <div className="mt-3 space-y-2 cursor-pointer">
        {upcomingEvents.map((event) => (
          <article
            key={event.id}
            className="cursor-pointer flex items-center gap-3 rounded-lg border border-[var(--color-ink-100)] p-2.5 hover-lift transition hover:bg-gradient-to-b hover:from-white hover:to-[var(--color-brand-orange-100)] hover:border-[var(--color-brand-orange-300)]"
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
          </article>
        ))}
      </div>
    </section>
  );
}