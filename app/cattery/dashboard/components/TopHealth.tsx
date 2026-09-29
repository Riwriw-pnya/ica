"use client";

import DashboardIcon from "@/components/anggota/DashboardIcon";
import Link from "next/link";
import React from "react";
import { leaderboardData } from "@/data/cattery";

export default function TopHealthScoresCard() {
  return (
    <>
      {/* ========================================= */}
      {/* 1. TAMPILAN MOBILE                        */}
      {/* ========================================= */}
      <div className="block lg:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#1a1513]">Top skor kesehatan</h2>
            <p className="text-[11px] text-[#8c8074]">Diisi admin ICA · read-only</p>
          </div>
          {/* Tulisan "Semua" */}
          <Link href="/cattery/leaderboard" className="text-xs font-bold text-[var(--color-brand-orange-700)] hover:underline">
            Semua
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4 scroll-smooth">
          {leaderboardData.map((cat) => (
            <div
              key={cat.id}
              className="min-w-[150px] max-w-[160px] bg-white rounded-[20px] border border-[#F5E6DA] shadow-xs shrink-0 overflow-hidden flex flex-col justify-between"
            >
              <div className="bg-[#FAF7F2] h-[110px] p-2.5 relative flex items-center justify-center">
                {/* Badge Urutan Angka 1 2 3 */}
                <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-white text-[var(--color-brand-orange-700)] font-bold text-[11px] flex items-center justify-center shadow-2xs z-10">
                  {cat.rank}
                </div>

                {cat.imageUrl ? (
                  <img src={cat.imageUrl} alt={cat.fullName} className="w-full h-full object-cover rounded-t-[18px]" />
                ) : (
                  <div className="text-[#8c8074]/60">
                    <DashboardIcon name="cat" size={32} />
                  </div>
                )}
              </div>

              <div className="p-3 bg-white space-y-0.5">
                <h3 className="font-bold text-xs text-[#1a1513] truncate leading-tight">{cat.shortName || cat.name}</h3>
                <p className="text-[10px] text-[#8c8074] truncate leading-tight">{cat.breed}</p>
                {/* Nilai Skor */}
                <p className="font-black text-sm text-[var(--color-brand-orange-700)] pt-1">{cat.score}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================= */}
      {/* 2. TAMPILAN DESKTOP                       */}
      {/* ========================================= */}
      <div className="hidden lg:flex lg:col-span-5 bg-white rounded-3xl border border-[#eedfd5] shadow-xs p-6 flex-col justify-between space-y-5">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-[#1a1513]">Top 5 kucing — skor kesehatan</h2>
              <p className="text-xs text-[#8c8074] mt-1">
                Hanya kucing milik cattery ini. Skor diisi Admin ICA — tampil read-only di sisi cattery.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#fff4e5] text-[#c26d0a] text-[10px] font-bold shrink-0">
              Pending konfirmasi PO
            </span>
          </div>

          <div className="space-y-3 border-t border-[var(--color-ink-100)] pt-3">
            {leaderboardData.map((cat) => (
              <div key={cat.rank} className="flex items-center justify-between p-2.5 rounded-2xl">
                <div className="flex items-center gap-3">
                  {/* Badge Urutan Angka Desktop */}
                  <span
                    className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                      cat.active ? "bg-[#fff4eb] text-[var(--color-brand-orange-700)]" : "bg-[#f4efe9] text-[#8c8074]"
                    }`}
                  >
                    {cat.rank}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#f4efe9] overflow-hidden flex items-center justify-center text-[#8c8074] shrink-0">
                    {cat.imageUrl ? (
                      <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                    ) : (
                      <DashboardIcon name="cat" size={22} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#1a1513]">{cat.fullName}</h3>
                    <p className="text-[11px] text-[#8c8074]">{cat.breed}</p>
                  </div>
                </div>
                <div className="text-right">
                  {/* Nilai Skor Desktop */}
                  <span className="font-black text-base text-[var(--color-brand-orange-700)]">{cat.score}</span>
                  {/* Tulisan "skor" */}
                  <span className="block text-[10px] text-[var(--color-brand-orange-700)]">skor</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#f4efe9] pt-3 text-xs text-[#8c8074]">
          <span>Read-only · tidak ada aksi edit skor di sisi cattery.</span>
          <Link href="/cattery/leaderboard" className="font-bold text-[var(--color-brand-orange-700)] hover:underline">
            Leaderboard →
          </Link>
        </div>
      </div>
    </>
  );
}