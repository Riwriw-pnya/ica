import { newsItems } from "@/data/anggota";
import NewsFilterGrid from "@/app/anggota/berita/components/NewsFilterGrid";

export default function BeritaPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <section className="mb-5">
        <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
          Berita ICA
        </h1>
        <p className="mt-1 font-body text-[12px] text-[var(--color-ink-700)]">
          Pengumuman, hasil event, dan informasi keanggotaan.
        </p>
      </section>

      <NewsFilterGrid items={newsItems} />
    </div>
  );
}