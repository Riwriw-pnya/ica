import { catteryItems } from "@/data/anggota";
import CatteryDirectory from "@/app/anggota/direktori/components/CatteryDirectory";

export default function DirektoriPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      <section className="mb-5 hidden md:block">
        <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
          Direktori Cattery
        </h1>
        <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
          Cattery terdaftar ICA — filter berdasarkan wilayah, ras, dan skor cattery.
        </p>
      </section>

      <CatteryDirectory items={catteryItems} />
    </div>
  );
}