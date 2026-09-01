import { newsItems } from "@/data/dashboard_member";
import NewsFilterGrid from "@/components/dashboard_member/NewsFilterGrid";

export default function BeritaPage() {
  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="mx-auto max-w-[1200px] p-5 lg:p-6">
        <section className="mb-5">
          <h1 className="font-heading text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
            Berita ICA
          </h1>
          <p className="mt-1 font-body text-[12px] text-[var(--color-ink-700)]">
            Pengumuman, hasil event, dan informasi keanggotaan.
          </p>
        </section>

        <NewsFilterGrid items={newsItems} />
      </div>
    </main>
  );
}