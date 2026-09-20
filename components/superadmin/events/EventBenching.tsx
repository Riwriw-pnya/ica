"use client";

import React, { useState } from "react";

export default function EventBenchingSection() {
  const [showDenah, setShowDenah] = useState(true);

  const tables = Array.from({ length: 24 }, (_, i) => {
    const num = i + 1;
    let occupancy = "0/6";
    if (num === 1) occupancy = "6/6";
    if (num === 2) occupancy = "3/6";
    return { num, occupancy };
  });

  return (
    <div className="bg-white border border-[#EFE9E1] rounded-3xl p-6 space-y-5 shadow-xs">
      <div>
        <h2 className="text-base font-bold text-[#231A14]">Pengaturan benching (meja)</h2>
        <p className="text-xs text-[#8C8078] mt-0.5">
          Denah meja dipakai untuk penempatan peserta di area event. Nomor meja dibagikan ke peserta setelah pendaftaran ditutup.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">Jumlah meja</label>
          <input type="number" defaultValue={24} className="w-full px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl font-bold text-[#231A14]" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">Kapasitas per meja</label>
          <input type="number" defaultValue={6} className="w-full px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl font-bold text-[#231A14]" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#231A14] mb-1.5">Kapasitas total</label>
          <div className="px-3.5 py-2.5 text-xs border border-[#EFE9E1] rounded-xl bg-[#FAF8F5] text-[#231A14] font-bold flex items-center">
            Kapasitas denah: 144 kucing
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold text-[#8C8078] uppercase tracking-wider text-[10px]">DENAH AREA · TERISI 9 dari 144 tempat</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2">
          {tables.map((t) => (
            <div key={t.num} className="border border-[#EFE9E1] rounded-xl p-2.5 text-center bg-[#FAF8F5] space-y-0.5">
              <p className="text-xs font-bold text-[#231A14]">Meja {t.num}</p>
              <p className="text-[10px] text-[#8C8078] font-medium">{t.occupancy}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#F2EFE9]">
        <div>
          <p className="text-xs font-bold text-[#231A14]">Tampilkan denah meja ke peserta</p>
          <p className="text-[11px] text-[#8C8078]">Peserta melihat nomor meja dan denah di detail event pada portalnya.</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={showDenah} onChange={() => setShowDenah(!showDenah)} className="sr-only peer" />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#EE6B28]"></div>
        </label>
      </div>
    </div>
  );
}