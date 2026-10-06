import { newsItems } from "@/data/anggota";
import Link from "next/link";
import NewsThumbnail from "@/components/anggota/NewsThumbnail";

export default function NewsSection() {
  return (
    <section className="flex h-full flex-col justify-between rounded-2xl border border-[var(--color-ink-100,#EFE9E1)] bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--color-ink-900,#231A14)]">
          Berita terbaru
        </h2>
        <Link
          href="/anggota/berita"
          className="shrink-0 text-[12px] font-medium text-[#D95D1E] hover:underline"
        >
          Semua berita →
        </Link>
      </div>

      {/* List Berita */}
      <div className="flex flex-col divide-y divide-[var(--color-ink-100,#F0E8E2)] flex-1 justify-center">
        {newsItems.slice(0, 3).map((item) => {
          const isExternal = item.href?.startsWith("http");

          return (
            <Link
              key={item.id}
              href={item.href || "#"}
              target={isExternal ? "_blank" : "_self"}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-3 py-2.5 px-1 transition hover:bg-[#FAF7F2] rounded-lg"
            >
              <NewsThumbnail
                href={item.href}
                title={item.title}
                image={item.image}
              />

              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-xs font-semibold text-[var(--color-ink-900,#231A14)] group-hover:text-[#D95D1E] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="mt-0.5 truncate text-[11px] text-[var(--color-ink-400,#8C8078)]">
                  {item.category} · {item.date}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}