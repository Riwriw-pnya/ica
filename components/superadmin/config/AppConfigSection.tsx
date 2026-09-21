"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";

export default function AppConfigurationSection() {
  const { showToast } = useToast();

  // State Validasi Mating Report
  const [minPregnancy, setMinPregnancy] = useState<number | "">(58);
  const [maxPregnancy, setMaxPregnancy] = useState<number | "">(72);
  const [minMotherAge, setMinMotherAge] = useState<number | "">(12);
  const [maxRevisions, setMaxRevisions] = useState<number | "">(2);

  // State Perilaku Modul (Toggle Switches)
  const [enableRejectedStatus, setEnableRejectedStatus] = useState(true);
  const [showWinnerBanner, setShowWinnerBanner] = useState(true);
  const [sendEmailNotifications, setSendEmailNotifications] = useState(true);
  const [showProductPrices, setShowProductPrices] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Konfigurasi aplikasi berhasil disimpan.", "success");
  };

  return (
    <div className="space-y-4 w-full font-sans">
      {/* Main Grid Content */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Card Kiri: Validasi mating report */}
        <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 space-y-5 shadow-xs">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-[#231A14]">Validasi mating report</h2>
            <p className="text-xs text-[#8C7A6B]">
              Rentang ini dipakai untuk memvalidasi tanggal lahir terhadap tanggal mating.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Field 1 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#231A14]">
                Kehamilan minimum (hari)
              </label>
              <input
                type="number"
                value={minPregnancy}
                onChange={(e) => setMinPregnancy(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-[#FAF8F5] border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-4 py-3 outline-none focus:border-[#EE6B28] transition"
              />
            </div>

            {/* Field 2 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#231A14]">
                Kehamilan maksimum (hari)
              </label>
              <input
                type="number"
                value={maxPregnancy}
                onChange={(e) => setMaxPregnancy(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-[#FAF8F5] border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-4 py-3 outline-none focus:border-[#EE6B28] transition"
              />
            </div>

            {/* Field 3 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#231A14]">
                Usia minimum induk (bulan)
              </label>
              <input
                type="number"
                value={minMotherAge}
                onChange={(e) => setMinMotherAge(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-[#FAF8F5] border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-4 py-3 outline-none focus:border-[#EE6B28] transition"
              />
            </div>

            {/* Field 4 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#231A14]">
                Batas revisi per aplikasi
              </label>
              <input
                type="number"
                value={maxRevisions}
                onChange={(e) => setMaxRevisions(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-[#FAF8F5] border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-4 py-3 outline-none focus:border-[#EE6B28] transition"
              />
            </div>
          </div>
        </div>

        {/* Card Kanan: Perilaku modul */}
        <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-5">
            <h2 className="text-base font-bold text-[#231A14]">Perilaku modul</h2>

            {/* Toggle Items */}
            <div className="space-y-4">
              
              {/* Toggle 1 */}
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#231A14]">
                    Aktifkan status Ditolak pada review aplikasi
                  </p>
                  <p className="text-[11px] text-[#8C7A6B]">Masih menunggu konfirmasi PO.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEnableRejectedStatus(!enableRejectedStatus)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
                    enableRejectedStatus ? "bg-[#EE6B28]" : "bg-[#EFECE6]"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition duration-200 ease-in-out ${
                      enableRejectedStatus ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#231A14]">
                    Tampilkan banner juara di beranda Member Portal
                  </p>
                  <p className="text-[11px] text-[#8C7A6B]">Banner diatur di menu News / Artikel.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowWinnerBanner(!showWinnerBanner)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
                    showWinnerBanner ? "bg-[#EE6B28]" : "bg-[#EFECE6]"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition duration-200 ease-in-out ${
                      showWinnerBanner ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#231A14]">
                    Kirim notifikasi email saat status aplikasi berubah
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSendEmailNotifications(!sendEmailNotifications)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
                    sendEmailNotifications ? "bg-[#EE6B28]" : "bg-[#EFECE6]"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition duration-200 ease-in-out ${
                      sendEmailNotifications ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 4 */}
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#231A14]">
                    Tampilkan harga produk di katalog Store
                  </p>
                  <p className="text-[11px] text-[#8C7A6B]">Katalog tetap display-only.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowProductPrices(!showProductPrices)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
                    showProductPrices ? "bg-[#EE6B28]" : "bg-[#EFECE6]"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition duration-200 ease-in-out ${
                      showProductPrices ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-b from-[#FF9A56] to-[#EE6B28] text-white text-xs font-bold shadow-md hover:brightness-105 transition cursor-pointer"
            >
              Simpan konfigurasi
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}