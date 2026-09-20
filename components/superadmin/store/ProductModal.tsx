"use client";

import React from "react";
import { useToast } from "@/context/ToastContext";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ProductModal({ isOpen, onClose, onSuccess }: ProductModalProps) {
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger Toast Notification menggunakan ToastContext existing
    showToast("Produk tersimpan di katalog Store.", "success");

    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white border border-[#EFE9E1] rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden flex flex-col">
        
        {/* Header Modal */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-[#F2EFE9]">
          <div>
            <h3 className="text-base font-bold text-[#231A14]">Produk katalog</h3>
            <p className="text-xs text-[#8C8078] mt-0.5">
              Katalog bersifat display-only. Harga ditampilkan tanpa proses transaksi.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8C8078] hover:text-[#231A14] transition cursor-pointer p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body Modal / Form */}
        <form onSubmit={handleSave} className="flex flex-col flex-1">
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Kolom Kiri: Input Teks */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#231A14] mb-1.5">
                  Nama produk <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="Tas kandang ICA Official"
                  required
                  className="w-full px-3.5 py-2 text-xs border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28] text-[#231A14] bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#231A14] mb-1.5">Kategori</label>
                  <div className="relative">
                    <select className="w-full px-3.5 py-2 text-xs border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28] text-[#7A6E65] bg-white appearance-none cursor-pointer">
                      <option>Pilih kategori</option>
                      <option selected>Perlengkapan Kucing</option>
                      <option>Tiket Event</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#8C8078]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#231A14] mb-1.5">Harga (Rp)</label>
                  <input
                    type="text"
                    defaultValue="385.000"
                    className="w-full px-3.5 py-2 text-xs border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28] text-[#231A14] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#231A14] mb-1.5">Deskripsi</label>
                <textarea
                  rows={4}
                  defaultValue="Bahan, ukuran, dan catatan pengambilan produk."
                  className="w-full px-3.5 py-2 text-xs border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28] text-[#7A6E65] bg-white resize-none"
                />
              </div>
            </div>

            {/* Kolom Kanan: Foto Produk */}
            <div className="md:col-span-5 space-y-3">
              <label className="block text-xs font-bold text-[#231A14]">Foto produk</label>
              
              <div className="w-full h-40 bg-[#F5F2ED] border border-dashed border-[#D0C5BC] rounded-xl flex flex-col items-center justify-center text-[#8C8078] gap-1.5 p-4">
                <svg className="w-6 h-6 text-[#A0948C]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="text-xs font-medium text-[#7A6E65] text-center">Foto utama (thumbnail katalog)</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="h-12 rounded-xl bg-[#F5F2ED] border border-[#EFE9E1] flex items-center justify-center text-[11px] text-[#A0948C]">
                  Foto 2
                </div>
                <div className="h-12 rounded-xl bg-[#F5F2ED] border border-[#EFE9E1] flex items-center justify-center text-[11px] text-[#A0948C]">
                  Foto 3
                </div>
              </div>

              <p className="text-[11px] text-[#8C8078] leading-relaxed pt-1">
                Foto utama dipakai sebagai thumbnail di katalog Store.
              </p>
            </div>

          </div>

          {/* Footer Modal */}
          <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#F2EFE9] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-[#EFE9E1] bg-white text-[#7A6E65] hover:bg-[#FAF8F5] text-xs font-bold transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white text-xs font-bold shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] transition cursor-pointer"
            >
              Simpan produk
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}