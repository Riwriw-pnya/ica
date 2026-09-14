"use client";

import Link from "next/link";
import { useState } from "react";

export default function AjukanCatteryPage() {
  const [formData, setFormData] = useState({
    namaCattery: "",
    prefixPedigree: "",
    tahunBeroperasi: "2024",
    wilayahIca: "Jawa Barat",
    alamatLokasi: "",
  });

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Link Kembali */}
      <div>
        <Link
          href="/anggota/keanggotaan"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#db874b] hover:underline"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Kembali ke keanggotaan
        </Link>
      </div>

      {/* Header Judul & Deskripsi */}
      <div>
        <h1 className="font-display text-2xl font-bold text-[#1a1817]">
          Pengajuan status cattery
        </h1>
        <p className="mt-1 text-[13px] text-[#5e5852]">
          Data member Anda terbawa otomatis. Pengajuan diverifikasi admin wilayah Jawa Barat.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="relative my-8 flex items-center justify-between px-16">
        {/* Connector Line */}
        <div className="absolute left-20 right-20 top-4 -z-0 h-[1.5px] bg-[#e8e2da]" />

        {/* Step 1 - Active */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-[#ee6b28] ring-2 ring-[#ee6b28] ring-offset-2 ring-offset-[#f7f5f0] shadow-xs">
            1
          </div>
          <span className="text-xs font-bold text-[#1a1817]">Data Cattery</span>
        </div>

        {/* Step 2 */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d6cfc7] bg-white text-xs font-medium text-[#8c857b]">
            2
          </div>
          <span className="text-xs font-medium text-[#8c857b]">Kucing Wajib</span>
        </div>

        {/* Step 3 */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d6cfc7] bg-white text-xs font-medium text-[#8c857b]">
            3
          </div>
          <span className="text-xs font-medium text-[#8c857b]">Dokumen</span>
        </div>

        {/* Step 4 */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d6cfc7] bg-white text-xs font-medium text-[#8c857b]">
            4
          </div>
          <span className="text-xs font-medium text-[#8c857b]">Review & Kirim</span>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="rounded-2xl border border-[#efe9e2] bg-white p-7 shadow-xs">
        {/* Card Header */}
        <div>
          <h2 className="text-base font-bold text-[#1a1817]">Data cattery</h2>
          <p className="mt-0.5 text-xs text-[#8c857b]">
            Nama dan prefix cattery akan tercetak pada sertifikat pedigree keturunan Anda.
          </p>
        </div>

        {/* Form Fields */}
        <div className="mt-6 space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#38332e]">
                Nama cattery
              </label>
              <input
                type="text"
                placeholder="Contoh: Auroria Cattery"
                value={formData.namaCattery}
                onChange={(e) => setFormData({ ...formData, namaCattery: e.target.value })}
                className="mt-2 w-full rounded-xl border border-[#eee8e2] bg-[#fcfbf9] px-4 py-2.5 text-xs text-[#1a1817] placeholder-[#a69e94] transition focus:border-[#ee6b28] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#ee6b28]"
              />
              <p className="mt-1.5 text-[11px] text-[#8c857b]">
                Ketersediaan nama diperiksa admin saat review.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#38332e]">
                Prefix pedigree
              </label>
              <input
                type="text"
                placeholder="Maks. 12 karakter"
                value={formData.prefixPedigree}
                onChange={(e) => setFormData({ ...formData, prefixPedigree: e.target.value })}
                className="mt-2 w-full rounded-xl border border-[#eee8e2] bg-[#fcfbf9] px-4 py-2.5 text-xs text-[#1a1817] placeholder-[#a69e94] transition focus:border-[#ee6b28] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#ee6b28]"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#38332e]">
                Tahun mulai beroperasi
              </label>
              <input
                type="text"
                value={formData.tahunBeroperasi}
                onChange={(e) => setFormData({ ...formData, tahunBeroperasi: e.target.value })}
                className="mt-2 w-full rounded-xl border border-[#eee8e2] bg-[#fcfbf9] px-4 py-2.5 text-xs text-[#1a1817] transition focus:border-[#ee6b28] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#ee6b28]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#38332e]">
                Wilayah ICA
              </label>
              <div className="relative mt-2">
                <select
                  value={formData.wilayahIca}
                  onChange={(e) => setFormData({ ...formData, wilayahIca: e.target.value })}
                  className="w-full appearance-none rounded-xl border border-[#eee8e2] bg-[#fcfbf9] px-4 py-2.5 text-xs text-[#1a1817] transition focus:border-[#ee6b28] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#ee6b28]"
                >
                  <option value="Jawa Barat">Jawa Barat</option>
                  <option value="DKI Jakarta">DKI Jakarta</option>
                  <option value="Jawa Tengah">Jawa Tengah</option>
                  <option value="Jawa Timur">Jawa Timur</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#1a1817]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div>
            <label className="block text-xs font-semibold text-[#38332e]">
              Alamat lokasi cattery
            </label>
            <textarea
              rows={3}
              placeholder="Jalan, kelurahan, kecamatan, kota, kode pos"
              value={formData.alamatLokasi}
              onChange={(e) => setFormData({ ...formData, alamatLokasi: e.target.value })}
              className="mt-2 w-full rounded-xl border border-[#eee8e2] bg-[#fcfbf9] px-4 py-2.5 text-xs text-[#1a1817] placeholder-[#a69e94] transition focus:border-[#ee6b28] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#ee6b28]"
            />
          </div>

          {/* Info Box */}
          <div className="flex items-center gap-2.5 rounded-xl bg-[#f7f5f0] p-3.5 text-xs text-[#5e5852]">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="shrink-0 text-[#8c857b]"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>
              Nama pemilik, email, dan nomor WhatsApp diambil dari profil member Ayu Prameswari (ICA-M-004821).
            </span>
          </div>
        </div>

        {/* Footer Actions / Divider */}
        <div className="mt-8 border-t border-[#f0eae1] pt-5 flex items-center justify-end gap-3">
          <Link
            href="/anggota/keanggotaan"
            className="rounded-full border border-[#e5ded6] bg-white px-6 py-2.5 text-xs font-semibold text-[#38332e] hover:bg-[#fcfbf9] transition"
          >
            Batal
          </Link>
          <button
            type="button"
            className="rounded-full bg-gradient-to-r from-[#ff9b53] to-[#ee6b28] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(238,107,40,0.3)] hover:brightness-95 active:scale-95 transition cursor-pointer"
          >
            Lanjut ke data kucing
          </button>
        </div>
      </div>
    </div>
  );
}