import { catteryItems } from "@/data/anggota";
import CatteryDirectory from "@/components/anggota/CatteryDirectory";

export default function DirektoriPage() {
  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="mx-auto max-w-[1200px] p-5 lg:p-6">
        <section className="mb-5">
          <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
            Direktori Cattery
          </h1>
          <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
            Cattery terdaftar ICA — filter berdasarkan wilayah, ras, dan skor cattery.
          </p>
        </section>
        
        <CatteryDirectory items={catteryItems} />
      </div>
    </main>
  );
}