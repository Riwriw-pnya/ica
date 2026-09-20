"use client";

import React, { useState } from "react";

export default function EventLinkValiditySection() {
  const [autoClose, setAutoClose] = useState(true);

  return (
    <div className="bg-white border border-[#EFE9E1] rounded-3xl p-6 space-y-5 shadow-xs">
      <div>
        <h2 className="text-base font-bold text-[#231A14]">Masa berlaku link war ticketing</h2>
        <p className="text-xs text-[#8C8078] mt-0.5">
          Setelah waktu ini lewat, link pendaftaran menolak checkout baru. Peserta yang sudah menahan slot tetap diberi waktu sampai timeout pembayarannya habis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">Link aktif mulai</label>
          <input type="text" defaultValue="09/15/2026" className="w-full px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl text-[#231A14]" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">Jam mulai</label>
          <input type="text" defaultValue="09:00 AM" className="w-full px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl text-[#231A14]" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">Tanggal kedaluwarsa <span className="text-red-500">*</span></label>
          <input type="text" defaultValue="10/12/2026" className="w-full px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl text-[#231A14]" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">Jam kedaluwarsa <span className="text-red-500">*</span></label>
          <input type="text" defaultValue="11:59 PM" className="w-full px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl text-[#231A14]" />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#F2EFE9]">
        <div>
          <p className="text-xs font-bold text-[#231A14]">Tutup link otomatis saat semua kuota habis</p>
          <p className="text-[11px] text-[#8C8078]">Link berhenti menerima pendaftar sebelum tanggal kedaluwarsa kalau seluruh kategori sudah penuh.</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={autoClose} onChange={() => setAutoClose(!autoClose)} className="sr-only peer" />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#EE6B28]"></div>
        </label>
      </div>

      <div className="bg-[#FFF6EE] border border-[#FFD6B8] rounded-2xl p-3 text-xs text-[#EE6B28] font-medium">
        Link pendaftaran aktif 15 Sep 2026 09:00 sampai 12 Okt 2026 23:59 WIB.
      </div>
    </div>
  );
}