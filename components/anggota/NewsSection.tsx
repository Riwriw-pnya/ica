import { newsItems } from "@/data/anggota";
import Link from "next/link";
import Image from "next/image";

export default function NewsSection() {
  return (
    <section className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-5 shadow-sm">
      {/* Header Section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-[var(--color-ink-900)]">
          Berita terbaru
        </h2>
        <Link
          href="/anggota/berita"
          className="text-xs font-medium text-[var(--color-brand-orange-500)] hover:text-[var(--color-brand-orange-600)]"
        >
          Semua berita →
        </Link>
      </div>

      {/* List Berita */}
      <div className="flex flex-col gap-2">
        {newsItems.slice(0, 3).map((item, index) => {
          const isExternal = item.href?.startsWith("http");

          return (
            <Link
              key={item.id}
              href={item.href || "#"}
              target={isExternal ? "_blank" : "_self"}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={`group flex items-start gap-3.5 rounded-xl p-3 transition ${
                index === 0
                  ? "bg-[var(--color-brand-orange-50)]"
                  : "hover:bg-[var(--color-ink-50)]"
              }`}
            >
              {/* Thumbnail Gambar */}
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[var(--color-brand-orange-100)]">
                <Image
                  src={item.image || "/images/cattt.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Detail Teks */}
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-1 text-xs font-semibold text-[var(--color-ink-900)] group-hover:text-[var(--color-brand-orange-500)]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[11px] text-[var(--color-ink-400)]">
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