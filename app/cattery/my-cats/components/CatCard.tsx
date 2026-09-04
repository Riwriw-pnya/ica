import DashboardIcon from "@/components/anggota/DashboardIcon";
import type { CatItem } from "@/types/cattery";

export default function CatCard({ cat }: { cat: CatItem }) {
  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white hover:shadow-[0_10px_25px_-5px_rgba(249,115,22,0.3)] hover:border-[var(--color-brand-orange-300)] transition">
      <div className="relative flex h-32 flex-col items-center justify-center gap-1 rounded-t-xl border-b border-[var(--color-ink-100)] bg-[var(--color-brand-orange-100)] text-[var(--color-ink-400)]">
        <DashboardIcon name="cat" size={24} />
        <p className="text-[11px] text-[var(--color-ink-400)]">Foto belum diunggah</p>

        <button className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full border border-[var(--color-brand-orange-300)] bg-white px-2.5 py-1 text-[10px] font-medium text-[var(--color-brand-orange-700)] transition hover:bg-[var(--color-brand-orange-50)]">
          <DashboardIcon name="upload" size={11} />
          Unggah foto
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-[13px] font-semibold text-[var(--color-ink-900)]">{cat.name}</h3>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              cat.gender === "Male"
                ? "bg-[var(--color-info-bg)] text-[var(--color-info)]"
                : "bg-[var(--color-brand-rose-50)] text-[#e05e64]"
            }`}
          >
            {cat.gender}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-[var(--color-ink-400)]">
          {cat.breed} · {cat.regCode}
        </p>

        <div className="mt-3 flex items-end justify-between border-t border-[var(--color-ink-100)] pt-3">
          <div>
            <p className="text-[10px] text-[var(--color-ink-400)]">Skor kesehatan (admin)</p>
            <p className="text-[15px] font-semibold text-[var(--color-brand-orange-700)]">
              {cat.healthScore}
            </p>
          </div>
          <p className="text-[11px] text-[var(--color-ink-400)]">
            Cat show dibayar<br />
            <span className="font-medium text-[var(--color-ink-700)]">{cat.paidShows} event</span>
          </p>
        </div>
      </div>
    </div>
  );
}