"use client";

import React from "react";

export default function EventTimeoutSection() {
  return (
    <div className="bg-white border border-[#EFE9E1] rounded-3xl p-6 space-y-5 shadow-xs">
      <div>
        <h2 className="text-base font-bold text-[#231A14]">Time out payment</h2>
        <p className="text-xs text-[#8C8078] mt-0.5">
          Batas waktu peserta menyelesaikan pembayaran setelah slot ditahan. Nilai ini yang dipakai countdown di sisi peserta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">Durasi (menit)</label>
          <input type="number" defaultValue={10} className="w-full px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl font-bold text-[#231A14]" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">Countdown peserta</label>
          <div className="px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl bg-[#FAF8F5] text-[#231A14] font-bold">
            10:00
          </div>
        </div>
      </div>

      <div className="bg-[#FAF8F5] border border-[#EFE9E1] rounded-2xl p-3 text-[11px] text-[#7A6E65] leading-relaxed">
        [PRD TBD] Perilaku setelah waktu habis belum ditetapkan: peserta diberi kesempatan retry langsung, atau harus mengulang dari halaman Event seperti pendaftar baru. Prototype memakai opsi kedua.
      </div>
    </div>
  );
}