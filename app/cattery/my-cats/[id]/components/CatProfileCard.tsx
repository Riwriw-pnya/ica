import Image from "next/image";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import type { CatProfileDetail } from "@/types/cattery";
import { StatusBadge } from "./StatusBadge";
import {
  pedigreeStatusLabel,
  pedigreeStatusTone,
  qualityBadgeLabel,
  qualityBadgeTone,
  vaccinationTone,
} from "./badge-utils";

interface CatProfileCardProps {
  cat: CatProfileDetail;
}

export function CatProfileCard({ cat }: CatProfileCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-5 shadow-sm">
      {/* Container Foto */}
      <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[var(--color-ink-100)] bg-[var(--color-ink-50)] text-[var(--color-ink-400)]">
        {cat.image ? (
          <Image src={cat.image} alt={cat.name} fill className="rounded-xl object-cover" />
        ) : (
          <>
            <DashboardIcon name="cat" size={32} />
            <span className="mt-2 text-[12px]">Foto kucing belum diunggah</span>
          </>
        )}
        <button
          type="button"
          className="absolute bottom-3 right-3 rounded-xl border border-[var(--color-brand-orange-300)] bg-white px-3 py-1 text-[11px] font-medium text-[var(--color-brand-orange-700)] shadow-xs transition hover:bg-[var(--color-brand-orange-50)]"
        >
          Unggah foto
        </button>
      </div>

      {/* Header Info Kucing */}
      <div className="mt-4 flex items-center justify-between">
        <h2 className="font-display text-base font-bold text-[var(--color-ink-900)]">{cat.name}</h2>
        <StatusBadge label={cat.gender} tone={cat.gender === "Male" ? "blue" : "orange"} />
      </div>
      <p className="mt-0.5 text-[12px] text-[var(--color-ink-400)]">
        {cat.breed} · {cat.regCode}
      </p>

      {/* Badges List */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {cat.qualityBadge && (
          <StatusBadge label={qualityBadgeLabel(cat.qualityBadge)} tone={qualityBadgeTone(cat.qualityBadge)} />
        )}
        <StatusBadge label={pedigreeStatusLabel(cat.pedigreeStatus)} tone={pedigreeStatusTone(cat.pedigreeStatus)} />
        <StatusBadge label={cat.vaccinationStatus} tone={vaccinationTone(cat.vaccinationStatus)} />
      </div>

      {/* Metadata Detail */}
      <dl className="mt-5 grid grid-cols-2 gap-y-4 border-t border-[var(--color-ink-100)] pt-4 text-[12px]">
        <div>
          <dt className="text-[var(--color-ink-400)]">No. registrasi</dt>
          <dd className="mt-0.5 font-semibold text-[var(--color-ink-900)]">{cat.registrationNumber}</dd>
        </div>
        <div>
          <dt className="text-[var(--color-ink-400)]">Tanggal lahir</dt>
          <dd className="mt-0.5 font-semibold text-[var(--color-ink-900)]">{cat.birthDate}</dd>
        </div>
        <div>
          <dt className="text-[var(--color-ink-400)]">Warna</dt>
          <dd className="mt-0.5 font-semibold text-[var(--color-ink-900)]">{cat.color}</dd>
        </div>
        <div>
          <dt className="text-[var(--color-ink-400)]">Skor kesehatan (admin)</dt>
          <dd className="mt-0.5 font-bold text-[var(--color-ink-700)]">{cat.healthScore}</dd>
        </div>
      </dl>
    </div>
  );
}