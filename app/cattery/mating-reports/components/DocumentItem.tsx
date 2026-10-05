"use client";

import { useState } from "react";
import DashboardIcon from "@/components/anggota/DashboardIcon";

interface CatCertificateFile {
  fileName: string;
  sizeLabel: string;
  uploadedDate?: string;
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
  isInvalid = false,
  onPick,
  onRemove,
}: DocumentItemProps) {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked && onPick) onPick(picked);
  };

  const handleConfirmDelete = () => {
    if (onRemove) onRemove();
    setShowDeleteModal(false);
  };

  // Variabel penolong agar teks nama file & ukuran tidak terpotong / menjadi strip (-)
  const displayFileName = file?.fileName || "dokumen.pdf";
  const displaySizeLabel = file?.sizeLabel || "1.2 MB";

  return (
    <div>
      {/* ========================================================= */}
      {/* 1. MOBILE VIEW                                            */}
      {/* ========================================================= */}
      <div
        className={`block sm:hidden rounded-2xl border bg-white p-4 space-y-3 transition shadow-2xs ${
          isInvalid ? "border-red-400 bg-red-50/20" : "border-[#EEDFD5]"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-[#FAF7F5] border border-[#F4EFE9] flex items-center justify-center text-[#8C8074]">
              <DashboardIcon name={icon} size={18} />
            </div>

            <div className="min-w-0">
              <h4 className="text-xs font-bold text-[#1A1513] truncate flex items-center gap-1.5">
                {label}
                <span
                  className={`text-[10px] font-semibold ${
                    isRequired ? "text-[#F05A1B]" : "text-[var(--color-brand-orange-100)]"
                  }`}
                >
                  · {isRequired ? "wajib" : "opsional"}
                </span>
              </h4>
            </div>
          </div>
        </div>

        {/* Jika File Sudah Terunggah di Mobile */}
        {file ? (
          <div className="flex items-center justify-between rounded-2xl border border-[#EEDFD5] bg-[#FAF7F5] p-3 text-xs">
            <div className="min-w-0 pr-2">
              <p className="font-bold text-[#1A1513] truncate">
                {displayFileName}
              </p>
              <p className="text-[10px] text-[#8C8074] mt-0.5">
                {displaySizeLabel} · diunggah {file.uploadedDate || "Hari ini 09:41"}
              </p>
            </div>

            {/* 3 Tombol Aksi di Kanan (Preview, Re-upload, Delete) - AKTIF UNTUK SEMUA DOKUMEN */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Button 1: Preview (Membuka Bottom Sheet Preview) */}
              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="w-8 h-8 rounded-xl bg-white border border-[#EEDFD5] flex items-center justify-center text-[#1A1513] shadow-2xs active:scale-95 transition"
                title="Preview dokumen"
              >
                <svg className="w-4 h-4 text-[#8C8074]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>

              {/* Button 2: Ganti / Re-upload File */}
              <label className="w-8 h-8 rounded-xl bg-white border border-[#EEDFD5] flex items-center justify-center text-[#1A1513] shadow-2xs active:scale-95 transition cursor-pointer" title="Ganti dokumen">
                <svg className="w-4 h-4 text-[#8C8074]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <input type="file" className="sr-only" onChange={handleChange} accept="image/*,.pdf" />
              </label>

              {/* Button 3: Hapus File */}
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="w-8 h-8 rounded-xl bg-white border border-[#EEDFD5] flex items-center justify-center text-red-500 shadow-2xs active:scale-95 transition"
                title="Hapus dokumen"
              >
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <label
            className={`flex w-full cursor-pointer items-center justify-center rounded-full border py-2.5 text-xs font-bold transition active:scale-[0.99] ${
              isInvalid
                ? "border-red-400 text-red-500 bg-red-50"
                : "border-[#F05A1B] bg-white text-[#F05A1B] hover:bg-[#FFF2E8]"
            }`}
          >
            <span>Pilih file</span>
            <input type="file" className="sr-only" onChange={handleChange} accept="image/*,.pdf" />
          </label>
        )}
      </div>

      {/* ========================================================= */}
      {/* 2. DESKTOP VIEW                                            */}
      {/* ========================================================= */}
{/* DESKTOP VIEW */}
<div
  className={`hidden sm:flex items-center justify-between gap-3 rounded-lg border p-3.5 transition-all w-full max-w-full min-w-0 overflow-hidden ${
    file
      ? "border-[var(--color-success)]/40 bg-[var(--color-success-bg)]"
      : isInvalid
      ? "bg-red-50"
      : "border-[var(--color-ink-100)]"
  }`}
>
  <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
        file
          ? "bg-[var(--color-success)] text-white"
          : isInvalid
          ? "bg-[var(--color-danger)] text-white"
          : "bg-gray-100 text-gray-400"
      }`}
    >
      {file ? (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <DashboardIcon name={icon} size={22} />
      )}
    </span>

    {/* KUNCI MIN-W-0 DI SINI */}
    <div className="min-w-0 flex-1 overflow-hidden">
      <p className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-ink-900)] truncate min-w-0">
        <span className="truncate">{label}</span>
        <span
          className={`text-[10px] font-normal shrink-0 ${
            isInvalid ? "font-semibold text-[var(--color-danger)]" : "text-[var(--color-ink-400)]"
          }`}
        >
          <span className={`font-medium ${isRequired ? "text-[#F05A1B]" : "text-[#8C8074]"}`}>
            {isRequired ? "· wajib" : "· opsional"}
          </span>
        </span>
      </p>
      {file ? (
        <p className="truncate min-w-0 text-[11px] text-[var(--color-ink-700)]">
          Terunggah · {displayFileName} · {displaySizeLabel}
        </p>
      ) : (
        <p
          className={`text-[11px] truncate min-w-0 ${
            isInvalid ? "font-medium text-[var(--color-danger)]" : "text-[var(--color-ink-400)]"
          }`}
        >
          {isInvalid ? "Dokumen ini wajib diunggah" : description ?? "Belum ada file"}
        </p>
      )}
    </div>
  </div>

  {/* Tombol Aksi Kanan Tetap Shrink-0 */}
  {file ? (
    <button
      type="button"
      onClick={onRemove}
      className="shrink-0 rounded-lg border border-[var(--color-ink-400)]/20 px-4 py-1.5 text-[11px] font-medium text-[var(--color-ink-700)] hover:bg-[var(--color-ink-400)]/5 cursor-pointer transition"
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

      {/* ========================================================= */}
      {/* 3. MODAL BOTTOM SHEET: PREVIEW DOKUMEN                    */}
      {/* ========================================================= */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 sm:hidden">
          <div className="w-full rounded-t-3xl bg-white p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="mx-auto h-1 w-12 rounded-full bg-gray-300" />
            
            <div className="space-y-1">
              <h3 className="font-bold text-base text-[#1A1513]">{label}</h3>
              <p className="text-xs text-[#8C8074] leading-relaxed">
                Preview dokumen dibuka di viewer. Kop surat ICA dan footer log aktivitas mengikuti berkas aslinya.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="flex-1 rounded-full border border-[#EEDFD5] bg-white py-3 text-xs font-bold text-[#1A1513] active:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="flex-1 rounded-full bg-gradient-to-b from-[#FFC299] to-[#F05A1B] py-3 text-xs font-bold text-white active:scale-95 transition"
              >
                Tutup preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. MODAL BOTTOM SHEET: HAPUS DOKUMEN                      */}
      {/* ========================================================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 sm:hidden">
          <div className="w-full rounded-t-3xl bg-white p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="mx-auto h-1 w-12 rounded-full bg-gray-300" />

            <div className="space-y-1">
              <h3 className="font-bold text-base text-[#1A1513]">Hapus dokumen</h3>
              <p className="text-xs text-[#8C8074] leading-relaxed">
                File pada {label.toLowerCase()} akan dihapus dari report ini. Anda perlu mengunggah ulang sebelum mengirim.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-full border border-[#EEDFD5] bg-white py-3 text-xs font-bold text-[#1A1513] active:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 rounded-full bg-[#E02424] py-3 text-xs font-bold text-white active:scale-95 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}