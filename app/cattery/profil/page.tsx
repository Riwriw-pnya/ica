"use client";

import React from "react";

export default function CatteryProfilePage() {
  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#2d2825] font-sans">
      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1a1513]">
            Profil Cattery
          </h1>
          <p className="text-xs sm:text-sm text-[#7e7267]">
            Data yang tampil di Direktori Cattery untuk member ICA.
          </p>
        </div>

        {/* Profile Card Container */}
        <div className="bg-white rounded-2xl border border-[#eedfd5] overflow-hidden shadow-xs">
          {/* Top Banner (Cattery Place Photo) */}
          <div className="bg-[#FFEFE3] p-8 relative flex flex-col items-center justify-center min-h-[180px] border-b border-[#F7E1CE]">
            <div className="flex flex-col items-center text-center gap-2">
              {/* House Icon */}
              <div className="text-[#c26d0a]">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#c26d0a]">
                Foto tempat cattery belum diunggah
              </span>
            </div>

            {/* Upload Place Photo Button */}
            <button
              type="button"
              className="mt-4 sm:mt-0 sm:absolute sm:bottom-4 sm:right-4 px-4 py-2 rounded-full border border-dashed border-[#EE6B28] bg-white/90 hover:bg-white text-xs font-semibold text-[#EE6B28] transition cursor-pointer"
            >
              Unggah foto tempat
            </button>
          </div>

          {/* Profile Details Area */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Owner Profile Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Avatar Initials */}
                <div className="w-16 h-16 rounded-full bg-[#fce8d8] text-[#c26d0a] font-bold text-lg flex items-center justify-center shrink-0">
                  HP
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#1a1513]">
                    Hana Prameswari
                  </h2>
                  <p className="text-xs text-[#8c8074] mt-0.5">
                    Pemilik cattery · member ICA-M-003912
                  </p>
                </div>
              </div>

              {/* Upload Profile Photo Button */}
              <button
                type="button"
                className="self-start sm:self-center px-4 py-2 rounded-full border border-dashed border-[#EE6B28] bg-white hover:bg-[#FFF8F2] text-xs font-semibold text-[#EE6B28] transition cursor-pointer"
              >
                Unggah foto profil
              </button>
            </div>

            {/* Form & Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm">
              {/* Nama Cattery */}
              <div className="space-y-1">
                <span className="block text-xs font-medium text-[#8c8074]">
                  Nama cattery
                </span>
                <p className="font-bold text-[#1a1513]">Rumah Hana Cattery</p>
              </div>

              {/* Nomor Registrasi */}
              <div className="space-y-1">
                <span className="block text-xs font-medium text-[#8c8074]">
                  Nomor registrasi
                </span>
                <p className="font-bold text-[#1a1513]">ICA-CTY-2024-0188</p>
              </div>

              {/* Wilayah */}
              <div className="space-y-1">
                <span className="block text-xs font-medium text-[#8c8074]">
                  Wilayah
                </span>
                <p className="font-bold text-[#1a1513]">Jawa Barat · Bandung</p>
              </div>

              {/* Nomor WhatsApp */}
              <div className="space-y-1">
                <span className="block text-xs font-medium text-[#8c8074]">
                  Nomor WhatsApp
                </span>
                <p className="font-bold text-[#1a1513]">0812-7788-4400</p>
              </div>

              {/* Alamat */}
              <div className="space-y-1 md:col-span-2">
                <span className="block text-xs font-medium text-[#8c8074]">
                  Alamat
                </span>
                <p className="font-bold text-[#1a1513] leading-relaxed">
                  Jl. Sukajadi No. 118, Sukagalih, Sukajadi, Kota Bandung 40163
                </p>
              </div>

              {/* Ras yang dikembangkan */}
              <div className="space-y-2 md:col-span-2">
                <span className="block text-xs font-medium text-[#8c8074]">
                  Ras yang dikembangkan
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-lg bg-[#FFEFE3] text-[#c26d0a] text-xs font-medium">
                    Persian
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#FFEFE3] text-[#c26d0a] text-xs font-medium">
                    Exotic Shorthair
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Divider */}
            <hr className="border-[#eedfd5]" />

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
              >
                Simpan perubahan
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-full border border-[#eedfd5] bg-white px-6 py-2.5 text-xs font-bold text-[#574d45] hover:bg-[#faf7f5] transition-all duration-150 active:translate-y-0.5"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}