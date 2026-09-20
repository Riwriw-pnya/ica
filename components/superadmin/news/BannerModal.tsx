"use client";

import { useState } from "react";
import { useToast } from "@/context/ToastContext";

interface BannerConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function BannerConfigModal({
  isOpen,
  onClose,
  onSuccess,
}: BannerConfigModalProps) {
  const { showToast } = useToast();

  const [contentType, setContentType] = useState("Banner leaderboard kucing");
  const [eventSource, setEventSource] = useState("ICA Cat Show Bandung 2026");
  const [bannerTitle, setBannerTitle] = useState("Juara ICA Cat Show Bandung 2026");
  const [showOnPortal, setShowOnPortal] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger Toast Notification sesuai desain pada gambar
    showToast("Banner leaderboard diperbarui dan tampil di halaman News.", "success");

    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl transition-all">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#231A14]">Atur banner leaderboard</h3>
            <p className="mt-0.5 text-xs text-[#8C8078]">
              Banner tampil di halaman News dan beranda Member Portal.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#8C8078] hover:bg-[#F5F2ED] hover:text-[#231A14] transition cursor-pointer"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Jenis Konten */}
          <div>
            <label className="block text-xs font-semibold text-[#231A14] mb-1.5">
              Jenis konten
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full rounded-xl border border-[#EFE9E1] bg-white px-3.5 py-2.5 text-xs text-[#231A14] focus:border-[#EE6B28] focus:outline-none cursor-pointer"
            >
              <option value="Banner leaderboard kucing">Banner leaderboard kucing</option>
            </select>
          </div>

          {/* Sumber Juara */}
          <div>
            <label className="block text-xs font-semibold text-[#231A14] mb-1.5">
              Sumber juara
            </label>
            <select
              value={eventSource}
              onChange={(e) => setEventSource(e.target.value)}
              className="w-full rounded-xl border border-[#EFE9E1] bg-white px-3.5 py-2.5 text-xs text-[#231A14] focus:border-[#EE6B28] focus:outline-none cursor-pointer"
            >
              <option value="ICA Cat Show Bandung 2026">ICA Cat Show Bandung 2026</option>
              <option value="ICA International Cat Show Jakarta 2026">ICA International Cat Show Jakarta 2026</option>
            </select>
          </div>

          {/* Foto Kucing Juara */}
          <div>
            <label className="block text-xs font-semibold text-[#231A14] mb-1.5">
              Foto kucing juara
            </label>
            <div className="w-full h-48 rounded-2xl border border-dashed border-[#D0C5BC] bg-[#F5F2ED] flex flex-col items-center justify-center text-center text-[#8C8078] cursor-pointer hover:bg-[#EFE9E1]/70 transition">
              <svg className="w-8 h-8 text-[#A0948C] mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="text-xs font-medium text-[#7A6E65]">Foto juara · 1600×900</span>
            </div>
          </div>

          {/* Judul Banner */}
          <div>
            <label className="block text-xs font-semibold text-[#231A14] mb-1.5">
              Judul banner
            </label>
            <input
              type="text"
              required
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
              placeholder="Masukkan judul banner"
              className="w-full rounded-xl border border-[#EFE9E1] bg-white px-3.5 py-2.5 text-xs text-[#231A14] focus:border-[#EE6B28] focus:outline-none"
            />
          </div>

          {/* Toggle Switch: Tampilkan banner di beranda Member Portal */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-semibold text-[#231A14]">
              Tampilkan banner di beranda Member Portal
            </span>
            <button
              type="button"
              onClick={() => setShowOnPortal(!showOnPortal)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                showOnPortal ? "bg-[#EE6B28]" : "bg-[#EFE9E1]"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  showOnPortal ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F2EFE9]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#EFE9E1] text-xs font-bold text-[#231A14] hover:bg-[#FAF8F5] transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer rounded-xl border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)] active:translate-y-0 active:shadow-xs"
            >
              Simpan banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}