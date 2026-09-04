"use client";

import DashboardIcon from "@/components/anggota/DashboardIcon";
import type { MaleCat } from "@/types/cattery";

interface StepPilihPejantanProps {
  cats: MaleCat[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function StepPilihPejantan({ cats, selectedId, onSelect }: StepPilihPejantanProps) {
  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-6">
      <h2 className="font-display text-[16px] font-semibold text-[var(--color-ink-900)]">
        Pilih pejantan
      </h2>
      <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
        Hanya kucing terdaftar dengan sertifikat aktif yang bisa dipilih.
      </p>

      <div className="mt-4 space-y-2 border-t border-[var(--color-ink-100)] pt-4">
        {cats.map((cat) => {
          const isSelected = selectedId === cat.id;
          const isEligible = cat.certStatus === "Aktif";

          return (
            <button
              key={cat.id}
              type="button"
              disabled={!isEligible}
              onClick={() => onSelect(cat.id)}
              className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                isSelected
                  ? "border-[var(--color-brand-orange-500)] bg-[var(--color-brand-orange-50)]"
                  : "border-[var(--color-ink-100)] hover:bg-[var(--color-brand-orange-50)]"
              } ${!isEligible ? "cursor-not-allowed opacity-60" : ""}`}
            >
              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${isSelected ? "border-[var(--color-brand-orange-500)]" : "border-[var(--color-ink-100)]"}`}>
                {isSelected && <span className="h-2 w-2 rounded-full bg-[var(--color-brand-orange-500)]" />}
              </span>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-ink-100)] text-[var(--color-ink-400)]">
                <DashboardIcon name="cat" size={16} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold text-[var(--color-ink-900)]">{cat.name}</span>
                <span className="block text-[11px] text-[var(--color-ink-400)]">
                  {cat.breed} · lahir {cat.birthDate} · {cat.regCode}
                </span>
              </span>

              <span className="flex shrink-0 items-center gap-1.5">
                <span className="rounded-full bg-[var(--color-ink-100)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-ink-700)]">
                  {cat.emsCode}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${isEligible ? "bg-[var(--color-success-bg)] text-[var(--color-success)]" : "bg-[var(--color-warning-bg)] text-[var(--color-warning)]"}`}>
                  {isEligible ? "Sertifikat aktif" : "Perlu perpanjangan"}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}