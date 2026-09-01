import { newsItems } from "@/data/dashboard_member";
import Link from "next/link";

export default function NewsSection() {
  return (
    <section className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-sm font-semibold text-[var(--color-ink-900)]">
          Berita terbaru
        </h2>

        <div className="px-3 rounded-lg hover:bg-[var(--color-brand-orange-50)] hover:text-[var(--color-brand-orange-700)]">
          <Link
          href="/dashboard_member/berita"
          className="text-[11px] font-body font-medium text-[var(--color-brand-orange-700)] transition"
        >
          Semua Berita →
        </Link>
        </div>
      </div>

      <div className="mt-3 -mx-2 divide-y divide-[var(--color-ink-100)]">
        {newsItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="cursor-pointer halftone-hover flex items-center gap-3 rounded-lg px-2 py-3 transition-colors duration-200 hover:bg-[var(--color-brand-orange-50)]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)]">
              <span className="text-xs">▧</span>
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-[11px] font-medium text-[var(--color-ink-900)]">
                {item.title}
              </h3>

              <p className="mt-0.5 text-[10px] text-[var(--color-ink-400)]">
                {item.category} · {item.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}