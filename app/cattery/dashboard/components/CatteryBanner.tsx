"use client";

import React from "react";

export default function CatteryBanner() {
  return (
    <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#eedfd5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-start sm:items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-white to-[#fff6ed] border border-[#fce3cf] flex items-center justify-center shrink-0">
          <svg className="w-7 h-7 text-[#f05a1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a1513]">Rumah Hana Cattery</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#eaf8f0] text-[#1b804d] text-xs font-semibold">Aktif</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#f4efe9] text-[#6b5f54] text-xs font-medium">Bandung</span>
          </div>
          <p className="text-xs sm:text-sm text-[#7e7267]">Reg. ICA-CTY-2024-0188 · masa berlaku sampai 31 Des 2026</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between md:justify-end gap-4 sm:gap-8 border-t md:border-t-0 border-[#f3eae1] pt-4 md:pt-0">
        <div className="flex items-center justify-around md:justify-end gap-6 sm:gap-8">
          <div className="text-center md:text-left">
            <span className="block text-xs text-[#8c8074] font-medium">Male</span>
            <span className="text-xl sm:text-2xl font-black text-[#1a1513]">4</span>
          </div>
          <div className="text-center md:text-left">
            <span className="block text-xs text-[#8c8074] font-medium">Female</span>
            <span className="text-xl sm:text-2xl font-black text-[#1a1513]">7</span>
          </div>
          <div className="text-center md:text-left">
            <span className="block text-xs text-[#8c8074] font-medium">Offspring</span>
            <span className="text-xl sm:text-2xl font-black text-[#1a1513]">12</span>
          </div>
        </div>
      </div>
    </section>
  );
}