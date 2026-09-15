"use client";

import { useState } from "react";

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { reason: string; notes: string }) => void;
}

export default function RejectModal({ isOpen, onClose, onSubmit }: RejectModalProps) {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ reason, notes });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-[#EFE9E1] relative space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Header & Close Button */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-bold text-[#231A14]">Tolak aplikasi</h3>
            <p className="text-xs text-[#8C8078] mt-1 leading-relaxed">
              Aplikasi ditutup dan pemohon harus mengirim pengajuan baru. Gunakan{" "}
              <span className="font-semibold text-[#231A14]">Minta revisi</span> bila masih bisa diperbaiki.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#8C8078] hover:text-[#231A14] p-1 rounded-lg hover:bg-[#FAF8F5] transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Alasan Penolakan */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#231A14]">
              Alasan penolakan
            </label>
            <div className="relative">
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full text-xs bg-white border border-[#EE6B28] rounded-xl px-3.5 py-2.5 text-[#231A14] appearance-none focus:outline-none focus:ring-2 focus:ring-[#EE6B28]/20 pr-8 cursor-pointer"
                required
              >
                <option value="" disabled>
                  Pilih alasan
                </option>
                <option value="Data pemohon tidak valid">Data pemohon tidak valid</option>
                <option value="Dokumen palsu atau tidak dapat diverifikasi">
                  Dokumen palsu atau tidak dapat diverifikasi
                </option>
                <option value="Pengajuan duplikat">Pengajuan duplikat</option>
                <option value="Tidak memenuhi syarat ICA">Tidak memenuhi syarat ICA</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8078] text-[10px]">
                ▼
              </div>
            </div>
          </div>

          {/* Penjelasan untuk Pemohon */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#231A14]">
              Penjelasan untuk pemohon
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Wajib diisi — dikirim bersama notifikasi penolakan."
              className="w-full text-xs p-3.5 border border-[#EFE9E1] rounded-xl text-[#231A14] placeholder-[#A89F95] focus:outline-none focus:border-[#EE6B28] focus:ring-2 focus:ring-[#EE6B28]/20 resize-none"
              required
            />
          </div>

          {/* PRD Note Banner */}
          <div className="flex items-start gap-2.5 p-3 bg-[#FAF8F5] border border-[#EFE9E1] rounded-2xl text-[11px] text-[#7A6E65]">
            <span className="text-[#8C8078] text-sm">❓</span>
            <p className="leading-tight">
              [PRD TBD] Status "Ditolak" belum resmi final di PRD. Aksi ini dapat dinonaktifkan dari App Configuration.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#5A4F48] bg-white border border-[#EFE9E1] rounded-xl hover:bg-[#FAF8F5] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-b from-[#DC4444] to-[#C83232] border border-[#B92B2B] rounded-xl shadow-xs hover:brightness-105 transition-all"
            >
              Tolak aplikasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}