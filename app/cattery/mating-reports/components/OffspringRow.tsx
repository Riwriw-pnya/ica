"use client";

import DashboardIcon from "@/components/anggota/DashboardIcon";
import type { OffspringItem } from "@/types/cattery";

interface OffspringRowProps {
  index: number;
  item: OffspringItem;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onChange: (updated: OffspringItem) => void;
  onRemove: () => void;
}

export default function OffspringRow({ index, item, isExpanded, onToggleExpand, onChange, onRemove }: OffspringRowProps) {
  const update = (patch: Partial<OffspringItem>) => onChange({ ...item, ...patch });

  const handlePhotoPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) update({ photoName: file.name });
  };

  return (
    <div className="border-b border-[var(--color-ink-100)] last:border-b-0">
      <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-3">
        <span className="text-[11px] text-[var(--color-ink-400)] sm:w-5">{index + 1}</span>

        <input
          type="text"
          value={item.name}
          onChange={(e) => update({ name: e.target.value })}
          placeholder="Belum diisi"
          className="flex-1 rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
        />

        <div className="flex gap-1 sm:w-20 sm:shrink-0 sm:justify-center">
          {(["Jantan", "Betina"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => update({ gender: g })}
              className={`flex h-8 w-8 items-center justify-center rounded-lg border text-[12px] font-semibold transition ${
                item.gender === g
                  ? "border-[var(--color-brand-orange-500)] bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)]"
                  : "border-[var(--color-ink-100)] text-[var(--color-ink-700)] hover:bg-gray-50"
              }`}
            >
              {g === "Jantan" ? "M" : "F"}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={item.color}
          onChange={(e) => update({ color: e.target.value })}
          placeholder="mis. Blue tabby"
          className="rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)] sm:w-40 sm:shrink-0"
        />

        <input
          type="date"
          value={item.birthDate}
          onChange={(e) => update({ birthDate: e.target.value })}
          className="rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)] sm:w-36 sm:shrink-0"
        />

        <div className="flex shrink-0 items-center justify-center gap-1.5 sm:w-16">
          <button
            type="button"
            onClick={onToggleExpand}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-ink-100)] text-[var(--color-ink-700)] transition hover:bg-gray-50"
            aria-label={isExpanded ? "Tutup detail" : "Buka detail"}
          >
            <span className={`inline-block transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
              <DashboardIcon name="chevron" size={13} />
            </span>
          </button>

          <button
            type="button"
            onClick={onRemove}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-ink-100)] text-[var(--color-ink-400)] transition hover:border-[var(--color-danger)] hover:text-[var(--color-danger)]"
            aria-label="Hapus kitten"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 gap-3 border-t border-[var(--color-brand-orange-100)] bg-[var(--color-brand-orange-50)] px-4 py-4 sm:grid-cols-4">
          <div>
            <label className="text-[11px] font-medium text-[var(--color-ink-700)]">Berat lahir (gram)</label>
            <input
              type="number"
              value={item.birthWeight}
              onChange={(e) => update({ birthWeight: e.target.value })}
              placeholder="mis. 105"
              className="mt-1 w-full rounded-lg border border-[var(--color-ink-100)] bg-white px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-[var(--color-ink-700)]">Ras / breed kitten</label>
            <input
              type="text"
              value={item.breed}
              onChange={(e) => update({ breed: e.target.value })}
              placeholder="mis. Persian"
              className="mt-1 w-full rounded-lg border border-[var(--color-ink-100)] bg-white px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-[var(--color-ink-700)]">Status</label>
            <div className="mt-1 flex gap-2">
              {(["Hidup", "Mati"] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => update({ status })}
                  className={`flex-1 rounded-lg border px-3 py-2 text-[12px] font-medium transition ${
                    item.status === status
                      ? status === "Hidup"
                        ? "border-[var(--color-success)] bg-[var(--color-success-bg)] text-[var(--color-success)]"
                        : "border-[var(--color-danger)] bg-[var(--color-danger-bg)] text-[var(--color-danger)]"
                      : "border-[var(--color-ink-100)] bg-white text-[var(--color-ink-700)] hover:bg-gray-50"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-[var(--color-ink-700)]">Foto kitten</label>
            <label className="mt-1 flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-[var(--color-brand-orange-300)] bg-white px-3 py-2 text-[12px] font-medium text-[var(--color-brand-orange-700)] transition hover:bg-[var(--color-brand-orange-100)]">
              <DashboardIcon name="upload" size={13} />
              {item.photoName ?? "Pilih foto"}
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoPick} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}