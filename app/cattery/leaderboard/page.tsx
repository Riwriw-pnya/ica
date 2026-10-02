"use client";

import DashboardIcon from "@/components/anggota/DashboardIcon";
import React, { useState } from "react";
import { leaderboardData } from "@/data/cattery";

export default function LeaderboardPage() {
  const [selectedCatFilter, setSelectedCatFilter] = useState("Kucing cattery saya");
  const [selectedSeason, setSelectedSeason] = useState("Musim 2026");

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#2d2825] font-sans pb-12 lg:pb-8">
      <main className="p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6 max-w-7xl mx-auto">
        
        {/* ========================================================= */}
        {/* 1. TAMPILAN MOBILE VIEW (PRESISI SESUAI FOTO)             */}
        {/* ========================================================= */}
        <div className="block lg:hidden space-y-3.5">
          {/* Subtitle Deskripsi Mobile (Judul Utama di-hidden) */}
          <p className="text-xs text-[#7e7267] leading-relaxed">
            Peringkat kucing Rumah Hana Cattery beserta cat show yang sudah dibayar.
          </p>

          {/* Filter Dropdowns Mobile */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <select
                value={selectedCatFilter}
                onChange={(e) => setSelectedCatFilter(e.target.value)}
                className="w-full appearance-none bg-white border border-[#eedfd5] rounded-xl px-3 py-2 pr-7 text-xs font-semibold text-[#1a1513] shadow-2xs focus:outline-none focus:border-[#f05a1b]"
              >
                <option value="Kucing cattery saya">Kucing cattery sa...</option>
                <option value="Semua kucing">Semua kucing</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8c8074]">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative flex-1">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full appearance-none bg-white border border-[#eedfd5] rounded-xl px-3 py-2 pr-7 text-xs font-semibold text-[#1a1513] shadow-2xs focus:outline-none focus:border-[#f05a1b]"
              >
                <option value="Musim 2026">Musim 2026</option>
                <option value="Musim 2025">Musim 2025</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8c8074]">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* List Card Mobile */}
          <div className="space-y-3 pt-1">
            {leaderboardData.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-[#eedfd5] p-4 shadow-2xs space-y-3"
              >
                {/* Baris Atas: Peringkat, Foto, Info Kucing */}
                <div className="flex items-start gap-2.5">
                  {/* Lingkaran Nomor Peringkat */}
                  <div className="w-6 h-6 rounded-full border border-[#fce3d2] bg-[#fff2e8] text-[#f05a1b] font-bold text-xs flex items-center justify-center shrink-0 mt-3">
                    {cat.rank}
                  </div>

                  {/* Foto Kucing Kotak Rounded */}
                  <div className="w-14 h-14 rounded-xl bg-[#f7f2ed] border border-[#eae0d5] overflow-hidden flex items-center justify-center text-[#8c8074] shrink-0">
                    {cat.imageUrl ? (
                      <img 
                        src={cat.imageUrl} 
                        alt={cat.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }} 
                      />
                    ) : (
                      <DashboardIcon name="cat" size={22} />
                    )}
                  </div>

                  {/* Detail Teks */}
                  <div className="space-y-1 min-w-0">
                    <h2 className="font-bold text-xs text-[#1a1513] truncate leading-tight">
                      {cat.name}
                    </h2>
                    
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-full border border-[#e5dcd3] bg-[#f4efe9] text-[#6b5f54] text-[10px] font-medium">
                        {cat.emsCode}
                      </span>
                    </div>

                    <p className="text-[10px] text-[#8c8074] leading-normal pt-0.5">
                      Owner: {cat.owner} ·<br />
                      Breeder: {cat.breeder}
                    </p>
                  </div>
                </div>

                {/* Pemisah Horizontal */}
                <div className="border-t border-[#f4efe9]" />

                {/* Section Middle: Scoring & Cat show terbayar dengan Pemisah Vertikal */}
                <div className="grid grid-cols-2 gap-2 items-center">
                  <div>
                    <span className="block text-[11px] text-[#8c8074]">Scoring</span>
                    <span className="text-2xl font-bold text-[#f05a1b] leading-tight">
                      {cat.score}
                    </span>
                  </div>

                  <div className="border-l border-[#f4efe9] pl-3">
                    <span className="block text-[11px] text-[#8c8074]">Cat show terbayar</span>
                    <span className="text-xs font-bold text-[#1a1513]">
                      {cat.paidShowsCount} event
                    </span>
                  </div>
                </div>

                {/* Section Bottom: Pill Badges Cat Show */}
                <div className="flex flex-col gap-1.5 pt-1">
                  {cat.shows.map((show, idx) => (
                    <span
                      key={idx}
                      className="inline-block w-fit px-3 py-1 rounded-full bg-[#fff4eb] text-[#d94a11] text-[10px] font-medium border border-[#fce3d2]"
                    >
                      {show}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. TAMPILAN DESKTOP VIEW (UTUH TIDAK DIUBAH)              */}
        {/* ========================================================= */}
        <div className="hidden lg:block space-y-6">
          {/* Header Info Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#1a1513]">
                Leaderboard Cattery
              </h1>
              <p className="text-xs sm:text-sm text-[#7e7267] mt-1">
                Peringkat kucing Rumah Hana Cattery beserta cat show yang sudah dibayar.
              </p>
            </div>
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={selectedCatFilter}
                onChange={(e) => setSelectedCatFilter(e.target.value)}
                className="appearance-none bg-white border border-[#eedfd5] rounded-xl px-3.5 py-2 pr-8 text-xs font-semibold text-[#2d2825] shadow-xs cursor-pointer focus:outline-none focus:border-[#f05a1b]"
              >
                <option value="Kucing cattery saya">Kucing cattery saya</option>
                <option value="Semua kucing">Semua kucing</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8c8074]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="appearance-none bg-white border border-[#eedfd5] rounded-xl px-3.5 py-2 pr-8 text-xs font-semibold text-[#2d2825] shadow-xs cursor-pointer focus:outline-none focus:border-[#f05a1b]"
              >
                <option value="Musim 2026">Musim 2026</option>
                <option value="Musim 2025">Musim 2025</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8c8074]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Leaderboard Cards List */}
          <div className="space-y-4">
            {leaderboardData.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-[#eedfd5] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-[#f05a1b]/30 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#fff2e8] text-[#f05a1b] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {cat.rank}
                  </div>

                  {/* Avatar Icon / Image */}
                  <div className="w-12 h-12 rounded-2xl bg-[#f7f2ed] border border-[#eae0d5] overflow-hidden flex items-center justify-center text-[#8c8074] shrink-0">
                    {cat.imageUrl ? (
                      <img 
                        src={cat.imageUrl} 
                        alt={cat.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }} 
                      />
                    ) : (
                      <DashboardIcon name="cat" size={22} />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-base text-[#1a1513]">
                        {cat.name}
                      </h2>
                      <span className="px-2 py-0.5 rounded-md bg-[#f4efe9] text-[#6b5f54] text-[11px] font-semibold">
                        {cat.emsCode}
                      </span>
                    </div>

                    <p className="text-xs text-[#8c8074]">
                      Owner: {cat.owner} · Breeder: {cat.breeder}
                    </p>

                    <div className="pt-1 space-y-1.5">
                      <span className="block text-[11px] font-medium text-[#a09488]">
                        Cat show yang sudah dibayar
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.shows.map((show, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-[#fff4eb] text-[#d94a11] text-[11px] font-medium border border-[#fce3d2]"
                          >
                            {show}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-[#f3eae1] pt-3 md:pt-0 md:pl-6 shrink-0 min-w-[130px]">
                  <span className="text-[11px] text-[#8c8074] font-medium">
                    Scoring
                  </span>
                  <span className="text-3xl font-black text-[#f05a1b] leading-tight">
                    {cat.score}
                  </span>
                  <span className="text-[11px] text-[#8c8074] mt-0.5">
                    {cat.paidShowsCount} cat show terbayar
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}