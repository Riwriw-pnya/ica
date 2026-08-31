import { newsItems } from "@/data/dashboard_member";

export default function NewsSection() {
  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Berita terbaru
        </h2>

        <button className="text-[11px] font-medium text-[var(--color-brand-orange-700)]">
          Semua berita →
        </button>
      </div>

      <div className="mt-3 -mx-2 divide-y divide-[var(--color-border)]">
        {newsItems.map((item) => (
          <article
            key={item.id}
            className="flex items-center gap-3 rounded-lg px-2 py-3 transition-colors duration-200 hover:bg-[var(--color-brand-orange-50)]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)]">
              <span className="text-xs">▧</span>
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-[11px] font-medium text-[var(--color-text-primary)]">
                {item.title}
              </h3>

              <p className="mt-0.5 text-[10px] text-[var(--color-text-muted)]">
                {item.category} · {item.date}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}