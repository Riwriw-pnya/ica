"use client";

import Link from "next/link";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import QualityBadge from "@/app/cattery/my-cats/components/QualityBadge";
import type { CatItem } from "@/types/cattery";

export default function CatCard({ cat }: { cat: CatItem }) {
  return (
    <Link
      href={`/cattery/my-cats/${cat.id}`}
      className="block overflow-hidden rounded-xl border border-[var(--color-ink-100)] bg-white transition hover:shadow-md hover:border-[var(--color-brand-orange-300)] hover:shadow-orange-300/50"
    >
      <div className="relative flex h-32 flex-col items-center justify-center gap-1 rounded-t-xl text-[var(--color-brand-orange-500)] border-b border-[var(--color-ink-100)] bg-[var(--color-brand-orange-100)]">
        <DashboardIcon name="cat" size={24} />
        <p className="text-[11px] text-[var(--color-ink-700)]">Foto belum diunggah</p>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full border border-[var(--color-brand-orange-300)] bg-white px-2.5 py-1 text-[10px] font-medium text-[var(--color-brand-orange-700)] transition hover:bg-[var(--color-brand-orange-50)]"
        >
          <DashboardIcon name="upload" size={11} />
          Unggah foto
        </button>

        {cat.qualityBadge && (
          <span className="absolute left-2 top-2">
            <QualityBadge badge={cat.qualityBadge} />
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-[13px] font-semibold text-[var(--color-ink-900)]">{cat.name}</h3>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              cat.gender === "Male"
                ? "bg-[var(--color-info-bg)] text-[var(--color-info)]"
                : "bg-[var(--color-brand-rose-50)] text-[#ac3d43]"
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
            <p className="text-[15px] font-semibold text-[var(--color-brand-orange-700)]">{cat.healthScore}</p>
          </div>
          <p className="text-[11px] text-[var(--color-ink-400)]">
            Cat show dibayar<br />
            <span className="font-medium text-[var(--color-ink-700)]">{cat.paidShows} event</span>
          </p>
        </div>
      </div>
    </Link>
  );
}