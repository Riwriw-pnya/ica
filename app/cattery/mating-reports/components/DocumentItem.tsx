"use client";

import DashboardIcon from "@/components/anggota/DashboardIcon";

interface CatCertificateFile {
  fileName: string;
  sizeLabel: string;
}

interface DocumentItemProps {
  isInvalid?: boolean;
  label: string;
  description?: string;
  icon?: string;
  isRequired: boolean;
  file: CatCertificateFile | null;
  isAuto?: boolean;
  onPick?: (file: File) => void;
  onRemove?: () => void;
}

export default function DocumentItem({
  label,
  description,
  icon = "upload",
  isRequired,
  file,
  isAuto = false,
  isInvalid = false,
  onPick,
  onRemove,
}: DocumentItemProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked && onPick) onPick(picked);
  };

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-lg border p-3.5 transition-all ${
        file
          ? "border-[var(--color-success)]/40 bg-[var(--color-success-bg)]"
          : isInvalid
          ? "bg-red-50"
          : "border-[var(--color-ink-100)]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
            file
              ? "bg-[var(--color-success)] text-white"
              : isInvalid
              ? "bg-[var(--color-danger)] text-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {file ? (
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <DashboardIcon name={icon} size={12} />
          )}
        </span>

        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-ink-900)]">
            {label}
            <span
              className={`text-[10px] font-normal ${
                isInvalid ? "font-semibold text-[var(--color-danger)]" : "text-[var(--color-ink-400)]"
              }`}
            >
              · {isRequired ? "wajib" : "opsional"}
            </span>
          </p>
          {file ? (
            <p className="truncate text-[11px] text-[var(--color-ink-700)]">
              Terunggah · {file.fileName} · {file.sizeLabel}
            </p>
          ) : (
            <p
              className={`text-[11px] ${
                isInvalid ? "font-medium text-[var(--color-danger)]" : "text-[var(--color-ink-400)]"
              }`}
            >
              {isInvalid ? "Dokumen ini wajib diunggah" : description ?? "Belum ada file"}
            </p>
          )}
        </div>
      </div>

      {file ? (
        <button
          type="button"
          onClick={onRemove}
          disabled={isAuto}
          className={`shrink-0 rounded-full border px-4 py-1.5 text-[11px] font-medium transition ${
            isAuto
              ? "cursor-not-allowed border-[var(--color-ink-100)] text-[var(--color-ink-400)]"
              : "border-[var(--color-ink-100)] text-[var(--color-ink-700)] hover:bg-gray-50"
          }`}
        >
          Hapus
        </button>
      ) : (
        <label
          className={`shrink-0 cursor-pointer rounded-full border px-4 py-1.5 text-[11px] font-medium transition ${
            isInvalid
              ? "border-[var(--color-danger)] text-[var(--color-danger)] hover:bg-red-50"
              : "border-[var(--color-brand-orange-300)] text-[var(--color-brand-orange-700)] hover:bg-[var(--color-brand-orange-50)]"
          }`}
        >
          Pilih file
          <input type="file" className="sr-only" onChange={handleChange} />
        </label>
      )}
    </div>
  );
}