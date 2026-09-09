"use client";

import React from "react";

export default function StatIndicatorCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl p-5 border border-[#eedfd5] shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#f05a1b]" />
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8c8074] tracking-wider uppercase">Menunggu Review</span>
            <div className="w-8 h-8 rounded-full bg-[#fff4eb] flex items-center justify-center text-[#f05a1b]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <span className="text-3xl font-black text-[#1a1513] mt-2 block">3</span>
          <p className="text-xs text-[#8c8074] mt-1">Terlama: 6 hari di antrean</p>
        </div>
        <div className="w-full bg-[#f4efe9] h-1.5 rounded-full mt-4 overflow-hidden">
          <div className="bg-[#f05a1b] h-full w-1/3 rounded-full" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-[#eedfd5] shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#22a559]" />
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8c8074] tracking-wider uppercase">Disetujui</span>
            <div className="w-8 h-8 rounded-full bg-[#eaf8f0] flex items-center justify-center text-[#22a559]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <span className="text-3xl font-black text-[#1a1513] mt-2 block">14</span>
          <p className="text-xs text-[#8c8074] mt-1">Total sepanjang 2026</p>
        </div>
        <div className="w-full bg-[#f4efe9] h-1.5 rounded-full mt-4 overflow-hidden">
          <div className="bg-[#22a559] h-full w-4/5 rounded-full" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-[#eedfd5] shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#f05a1b]" />
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8c8074] tracking-wider uppercase">Perlu Revisi</span>
            <div className="w-8 h-8 rounded-full bg-[#fff4eb] flex items-center justify-center text-[#f05a1b]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
          <span className="text-3xl font-black text-[#1a1513] mt-2 block">1</span>
          <p className="text-xs text-[#d94a11] font-semibold mt-1">Butuh tindakan Anda</p>
        </div>
        <div className="w-full bg-[#f4efe9] h-1.5 rounded-full mt-4 overflow-hidden">
          <div className="bg-[#f05a1b] h-full w-1/4 rounded-full" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-[#eedfd5] shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#8c8074]" />
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8c8074] tracking-wider uppercase">Draft Belum Dikirim</span>
            <div className="w-8 h-8 rounded-full bg-[#f4efe9] flex items-center justify-center text-[#8c8074]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <span className="text-3xl font-black text-[#1a1513] mt-2 block">2</span>
          <a href="#" className="text-xs text-[#8c8074] hover:text-[#f05a1b] font-medium mt-1 inline-block transition">
            Lihat draft tersimpan →
          </a>
        </div>
        <div className="w-full bg-[#f4efe9] h-1.5 rounded-full mt-4 overflow-hidden">
          <div className="bg-[#8c8074] h-full w-1/2 rounded-full" />
        </div>
      </div>
    </section>
  );
}