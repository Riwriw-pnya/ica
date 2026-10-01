import { catteryItems } from "@/data/anggota";
import CatteryDirectory from "@/app/anggota/direktori/components/CatteryDirectory";

export default function DirektoriPage() {
  return (
    // Ditambahkan pt-4 untuk mobile agar search & filter tidak terlalu naik ke atas
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-0 pt-4 sm:pt-0">
      {/* Sembunyikan section ini di Mobile */}
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