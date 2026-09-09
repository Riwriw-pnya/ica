"use client";

import React from "react";

const matingReports = [
  {
    id: "MR-2026-0142",
    pair: "Bagas × Nara",
    meta: "Dikirim 21 Agu 2026 · 4 kitten · 6 dokumen",
    status: "Sedang direview",
    statusStyle: "bg-[#ebf3fa] text-[#2b71b1]",
    action: "Detail",
  },
  {
    id: "MR-2026-0138",
    pair: "Rimba × Sekar",
    meta: "Dikirim 12 Agu 2026 · 3 kitten · sertifikat induk kurang jelas",
    status: "Perlu revisi",
    statusStyle: "bg-[#fde9e9] text-[#c23c3c]",
    action: "Perbaiki",
  },
  {
    id: "MR-2026-0131",
    pair: "Bagas × Kirana",
    meta: "Dikirim 2 Agu 2026 · 5 kitten · pedigree diterbitkan",
    status: "Disetujui",
    statusStyle: "bg-[#eaf8f0] text-[#1b804d]",
    action: "Detail",
  },
];

export default function MatingReportsCard() {
  return (
    <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#eedfd5] shadow-xs space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1a1513]">Mating report terakhir</h2>
        <a href="#" className="text-xs sm:text-sm font-bold text-[#f05a1b] hover:underline">
          Lihat semua
        </a>
      </div>

      <div className="divide-y divide-[#f4efe9]">
        {matingReports.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-[#1a1513] truncate">
                {r.id} · {r.pair}
              </h3>
              <p className="text-xs text-[#8c8074] mt-0.5 truncate">{r.meta}</p>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${r.statusStyle}`}>
                {r.status}
              </span>
              <a href="#" className="text-xs sm:text-sm font-bold text-[#f05a1b] hover:underline whitespace-nowrap">
                {r.action}
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-[#a09488] border-t border-[#f4efe9] pt-4">
        Angka pada card di atas masih data contoh — <span className="font-semibold text-[#786c60]">[PRD TBD]</span> untuk sumber & definisi tiap metric (mis. apakah "Disetujui" dihitung per tahun berjalan atau seumur cattery).
      </p>
    </section>
  );
}