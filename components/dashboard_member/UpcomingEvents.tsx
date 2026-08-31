import { upcomingEvents } from "@/data/dashboard_member";

export default function UpcomingEvents() {
  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Event mendatang
        </h2>

        <button className="text-[11px] font-medium text-[var(--color-brand-orange-700)]">
          Semua →
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {upcomingEvents.map((event) => (
          <article
            key={event.id}
            className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] p-2.5 hover-lift"
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
              <h3 className="truncate text-[11px] font-medium text-[var(--color-text-primary)]">
                {event.title}
              </h3>

              <p className="mt-0.5 text-[10px] text-[var(--color-text-muted)]">
                {event.location}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}