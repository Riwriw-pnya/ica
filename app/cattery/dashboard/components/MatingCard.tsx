"use client";

import React from "react";
import Link from "next/link";

const matingReports = [
  {
    id: "MR-2026-0142",
    pair: "Bagas × Nara",
    meta: "21 Agu 2026 · 4 kitten",
    fullMeta: "Dikirim 21 Agu 2026 · 4 kitten · 6 dokumen",
    status: "Sedang direview",
    mobileStatusStyle: "bg-[#ebf3fa] text-[#2b71b1]",
    desktopStatusStyle: "bg-[#ebf3fa] text-[#2b71b1]",
    action: "Detail",
  },
  {
    id: "MR-2026-0138",
    pair: "Rimba × Sekar",
    meta: "Sertifikat induk kurang jelas",
    fullMeta: "Dikirim 12 Agu 2026 · 3 kitten · sertifikat induk kurang jelas",
    status: "Perlu revisi",
    mobileStatusStyle: "bg-[#fde9e9] text-[#c23c3c]",
    desktopStatusStyle: "bg-[#fde9e9] text-[#c23c3c]",
    action: "Perbaiki",
  },
  {
    id: "MR-2026-0131",
    pair: "Bagas × Kirana",
    meta: "2 Agu 2026 · pedigree terbit",
    fullMeta: "Dikirim 2 Agu 2026 · 5 kitten · pedigree diterbitkan",
    status: "Disetujui",
    mobileStatusStyle: "bg-[#eaf8f0] text-[#1b804d]",
    desktopStatusStyle: "bg-[#eaf8f0] text-[#1b804d]",
    action: "Detail",
  },
];

export default function MatingReportsCard() {
  return (
    <section className="space-y-4">
      {/* ========================================= */}
      {/* 1. TAMPILAN MOBILE                        */}
      {/* ========================================= */}
      <div className="block md:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#1a1513]">Mating report</h2>
            <p className="text-[11px] text-[#8c8074]">Status pengajuan terbaru</p>
          </div>
          {/* Tulisan "Semua" disesuaikan warna var CSS */}
          <Link href="/cattery/applications" className="text-xs font-bold text-[var(--color-brand-orange-700)] hover:underline">
            Semua
          </Link>
        </div>

        {/* Ringkasan Indikator Status */}
        <div className="bg-white rounded-2xl p-3 border border-[#F5E6DA] shadow-xs grid grid-cols-4 text-center divide-x divide-[#f4efe9]">
          <div className="px-1">
            <span className="block text-base font-bold text-[#b87d2b]">3</span>
            <span className="text-[10px] text-[#8c8074] font-medium">Review</span>
          </div>
          <div className="px-1">
            <span className="block text-base font-bold text-[#1b804d]">14</span>
            <span className="text-[10px] text-[#8c8074] font-medium">Disetujui</span>
          </div>
          <div className="px-1">
            <span className="block text-base font-bold text-[#d9534f]">1</span>
            <span className="text-[10px] text-[#8c8074] font-medium">Revisi</span>
          </div>
          <div className="px-1">
            <span className="block text-base font-bold text-[#2d2825]">2</span>
            <span className="text-[10px] text-[#8c8074] font-medium">Draft</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {matingReports.map((r) => (
            <Link
              key={r.id}
              href="/cattery/applications"
              className="bg-white rounded-2xl p-3.5 border border-[#F5E6DA] shadow-xs flex items-center justify-between gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] cursor-pointer"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-xs text-[#1a1513] truncate">
                  {r.id} · {r.pair}
                </h3>
                <p className="text-[10px] text-[#8c8074] mt-0.5 truncate">{r.meta}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${r.mobileStatusStyle}`}>
                {r.status}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ========================================= */}
      {/* 2. TAMPILAN DESKTOP                       */}
      {/* ========================================= */}
      <div className="hidden md:block bg-white rounded-3xl p-5 sm:p-6 border border-[#eedfd5] shadow-[0_10px_25px_rgba(0,0,0,0.05)] space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1a1513]">Mating report terakhir</h2>
          <Link href="/cattery/applications" className="text-xs sm:text-sm font-bold text-[var(--color-brand-orange-700)] hover:underline">
            Lihat semua
          </Link>
        </div>

        <div className="divide-y divide-[#f4efe9]">
          {matingReports.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <h3 className="font-bold text-sm text-[#1a1513] truncate">
                  {r.id} · {r.pair}
                </h3>
                <p className="text-xs text-[#8c8074] mt-0.5 truncate">{r.fullMeta}</p>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${r.desktopStatusStyle}`}>
                  {r.status}
                </span>
                <Link href="/cattery/applications" className="text-xs sm:text-sm font-bold text-[var(--color-brand-orange-700)] hover:underline whitespace-nowrap">
                  {r.action}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#a09488] border-t border-[#f4efe9] pt-4">
          Angka pada card di atas masih data contoh — <span className="font-semibold text-[#786c60]">[PRD TBD]</span> untuk sumber & definisi tiap metric (mis. apakah "Disetujui" dihitung per tahun berjalan atau seumur cattery).
        </p>
      </div>
    </section>
  );
}