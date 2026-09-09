"use client";

import React from "react";

interface EventCatSubmittedProps {
  onBackToEvent: () => void;
  onEditCatData: () => void;
}

export default function EventCatSubmitted({
  onBackToEvent,
  onEditCatData,
}: EventCatSubmittedProps) {
  return (
    <div className="space-y-6 animate-fadeIn relative">
      <h1 className="text-xl sm:text-2xl font-bold text-[#1A1513]">Pendaftaran Event</h1>

      {/* Status Banner */}
      <div className="bg-white rounded-2xl border border-[#EEDFD5] p-4 sm:p-5 shadow-xs flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-full bg-[#EAF6ED] text-[#28844B] flex items-center justify-center font-bold text-sm shrink-0">
          ✓
        </div>
        <div>
          <h3 className="font-bold text-sm text-[#1A1513]">Pembayaran berhasil · slot terkunci</h3>
          <p className="text-xs text-[#7E7267] mt-0.5 leading-relaxed">
            ICA Cat Show Bandung 2026 · 1 slot kategori Cattery. Nomor registrasi{" "}
            <span className="font-semibold text-[#1A1513]">REG--011-0142</span>. Nomor batching diisi admin ICA setelah pendaftaran ditutup.
          </p>
        </div>
      </div>

      {/* Submitted Cats List Card */}
      <div className="bg-white rounded-2xl border border-[#EEDFD5] p-5 sm:p-6 shadow-xs space-y-5">
        <div>
          <h2 className="text-base font-bold text-[#1A1513]">Data kucing terkirim</h2>
          <p className="text-xs text-[#8C8074] mt-0.5">
            Kucing berikut terdaftar di ICA Cat Show Bandung 2026. Perubahan data setelah ini dilakukan admin ICA.
          </p>
        </div>

        {/* Cats List */}
        <div className="space-y-3">
          {/* Cat 1 */}
          <div className="p-4 rounded-xl border border-[#EEDFD5] bg-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FFF2E8] flex items-center justify-center text-[#EE6B28] font-bold text-xs shrink-0">
                🐱
              </div>
              <div>
                <p className="font-bold text-xs text-[#1A1513]">Rimba of Rumah Hana</p>
                <p className="text-[11px] text-[#8C8074]">Persian · EMS PER a 21 · ICA-2023-0612</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#EAF6ED] text-[#28844B] text-[10px] font-semibold shrink-0">
              Dari My Cats
            </span>
          </div>

          {/* Cat 2 */}
          <div className="p-4 rounded-xl border border-[#EEDFD5] bg-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FFF2E8] flex items-center justify-center text-[#EE6B28] font-bold text-xs shrink-0">
                🐱
              </div>
              <div>
                <p className="font-bold text-xs text-[#1A1513]">Sekar Ayu</p>
                <p className="text-[11px] text-[#8C8074]">Exotic Shorthair · EMS EXO n 24 · ICA-2024-0733</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#EAF6ED] text-[#28844B] text-[10px] font-semibold shrink-0">
              Dari My Cats
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onBackToEvent}
            className="cursor-pointer rounded-full border border-[#EEDFD5] bg-white px-5 py-2.5 text-xs font-semibold text-[#574D45] hover:bg-[#FAF7F5] transition-all"
          >
            Kembali ke Event
          </button>
          <button
            type="button"
            onClick={onEditCatData}
            className="cursor-pointer rounded-full border border-[#EEDFD5] bg-white px-5 py-2.5 text-xs font-semibold text-[#574D45] hover:bg-[#FAF7F5] transition-all"
          >
            Ubah data kucing
          </button>
        </div>
      </div>
    </div>
  );
}