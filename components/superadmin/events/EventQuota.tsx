"use client";

import React from "react";

export default function EventQuotaSection() {
  return (
    <div className="bg-white border border-[#EFE9E1] rounded-3xl p-6 space-y-5 shadow-xs">
      <div>
        <h2 className="text-base font-bold text-[#231A14]">Kuota per kategori peserta</h2>
        <p className="text-xs text-[#8C8078] mt-0.5">
          Setiap peserta hanya bisa membeli dari kategori yang sesuai role akunnya.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#F2EFE9] text-[#8C8078] font-semibold uppercase text-[10px] tracking-wider">
              <th className="pb-3">Kategori</th>
              <th className="pb-3 w-32">Kuota</th>
              <th className="pb-3 w-40">Harga tiket (Rp)</th>
              <th className="pb-3 text-right">Potensi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2EFE9]">
            <tr>
              <td className="py-3.5">
                <p className="font-bold text-[#231A14]">Umum</p>
                <p className="text-[11px] text-[#8C8078]">Non-member, bayar penuh</p>
              </td>
              <td>
                <input type="number" defaultValue={80} className="w-24 px-3 py-2 border border-[#EFE9E1] rounded-xl text-xs font-bold text-[#231A14]" />
              </td>
              <td>
                <input type="text" defaultValue="150000" className="w-32 px-3 py-2 border border-[#EFE9E1] rounded-xl text-xs font-bold text-[#231A14]" />
              </td>
              <td className="text-right font-bold text-[#231A14]">Rp 12.000.000</td>
            </tr>
            <tr>
              <td className="py-3.5">
                <p className="font-bold text-[#231A14]">Member</p>
                <p className="text-[11px] text-[#8C8078]">Keanggotaan aktif</p>
              </td>
              <td>
                <input type="number" defaultValue={60} className="w-24 px-3 py-2 border border-[#EFE9E1] rounded-xl text-xs font-bold text-[#231A14]" />
              </td>
              <td>
                <input type="text" defaultValue="120000" className="w-32 px-3 py-2 border border-[#EFE9E1] rounded-xl text-xs font-bold text-[#231A14]" />
              </td>
              <td className="text-right font-bold text-[#231A14]">Rp 7.200.000</td>
            </tr>
            <tr>
              <td className="py-3.5">
                <p className="font-bold text-[#231A14]">Cattery</p>
                <p className="text-[11px] text-[#8C8078]">Kode cattery terbit</p>
              </td>
              <td>
                <input type="number" defaultValue={50} className="w-24 px-3 py-2 border border-[#EFE9E1] rounded-xl text-xs font-bold text-[#231A14]" />
              </td>
              <td>
                <input type="text" defaultValue="100000" className="w-32 px-3 py-2 border border-[#EFE9E1] rounded-xl text-xs font-bold text-[#231A14]" />
              </td>
              <td className="text-right font-bold text-[#231A14]">Rp 5.000.000</td>
            </tr>
            <tr>
              <td className="py-3.5">
                <p className="font-bold text-[#231A14]">Sponsor (Cattery)</p>
                <p className="text-[11px] text-[#8C8078]">Alur assignment belum final</p>
              </td>
              <td>
                <input type="number" defaultValue={10} className="w-24 px-3 py-2 border border-[#EFE9E1] rounded-xl text-xs font-bold text-[#231A14]" />
              </td>
              <td>
                <input type="text" defaultValue="0" className="w-32 px-3 py-2 border border-[#EFE9E1] rounded-xl text-xs font-bold text-[#231A14]" />
              </td>
              <td className="text-right font-bold text-[#231A14]">Rp 0</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-[#FAF8F5] border border-[#EFE9E1] rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-[#231A14]">Total slot event</p>
          <p className="text-[11px] text-[#8C8078]">Potensi pendapatan maksimal Rp 24.200.000</p>
        </div>
        <span className="text-lg font-extrabold text-[#EE6B28]">200</span>
      </div>

      <div className="bg-[#F0F5FA] border border-[#D5E3F0] rounded-2xl p-4 flex items-start gap-3 text-[#1B365D] text-xs leading-relaxed">
        <svg className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p>
          <strong>[PRD TBD]</strong> Kategori Sponsor (Cattery) masih didesain sebagai kuota biasa. Perlu konfirmasi: apakah sponsor ikut checkout kompetitif, atau slot di-assign langsung oleh admin ke cattery tertentu tanpa war ticketing?
        </p>
      </div>
    </div>
  );
}