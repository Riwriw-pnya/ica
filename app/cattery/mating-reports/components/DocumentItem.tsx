"use client";

import DashboardIcon from "@/components/anggota/DashboardIcon";
import type { CatCertificateFile } from "@/types/cattery";

interface DocumentItemProps {
  label: string;
  isRequired: boolean;
  file: CatCertificateFile | null;
  isAuto?: boolean;
  onPick?: (file: File) => void;
  onRemove?: () => void;
}

export default function DocumentItem({ label, isRequired, file, isAuto = false, onPick, onRemove }: DocumentItemProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked && onPick) onPick(picked);
  };

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-lg border p-3.5 ${
        file ? "border-[var(--color-success)]/40 bg-[var(--color-success-bg)]" : "border-[var(--color-ink-100)]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
            file ? "bg-[var(--color-success)] text-white" : "bg-gray-100 text-gray-400"
          }`}
        >
          {file ? (
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <DashboardIcon name="upload" size={12} />
          )}
        </span>

        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-ink-900)]">
            {label}
            <span className={`text-[10px] font-normal ${isRequired ? "text-[var(--color-danger)]" : "text-[var(--color-ink-400)]"}`}>
              {isRequired ? "wajib" : "opsional"}
            </span>
          </p>
          {file ? (
            <p className="truncate text-[11px] text-[var(--color-ink-700)]">
              {isAuto ? "Terunggah otomatis" : "Terunggah"} · {file.fileName} · {file.sizeLabel}
            </p>
          ) : (
            <p className="text-[11px] text-[var(--color-ink-400)]">Belum ada file</p>
          )}
        </div>
      </div>

      {file ? (
        !isAuto && (
          <button
            onClick={onRemove}
            className="shrink-0 rounded-full border border-[var(--color-ink-100)] px-4 py-1.5 text-[11px] font-medium text-[var(--color-ink-700)] transition hover:bg-gray-50"
          >
            Hapus
          </button>
        )
      ) : (
        <label className="shrink-0 cursor-pointer rounded-full border border-[var(--color-brand-orange-300)] px-4 py-1.5 text-[11px] font-medium text-[var(--color-brand-orange-700)] transition hover:bg-[var(--color-brand-orange-50)]">
          Pilih file
          <input type="file" className="hidden" onChange={handleChange} />
        </label>
      )}
    </div>
  );
}