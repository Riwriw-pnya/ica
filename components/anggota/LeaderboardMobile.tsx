"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DashboardIcon from "./DashboardIcon";
import type { LeaderboardEntry, LeaderboardCategory } from "@/types/anggota";

interface LeaderboardMobileProps {
  entries: LeaderboardEntry[];
  eventTitle?: string;
}

const categoryOptions: (LeaderboardCategory | "Semua kategori")[] = [
  "Semua kategori",
  "Kitten",
  "Adult",
  "Household Pet",
];

const seasonOptions = ["Musim 2026", "Musim 2025"];

export default function LeaderboardMobile({ entries }: LeaderboardMobileProps) {
  const [category, setCategory] = useState<(typeof categoryOptions)[number]>("Semua kategori");
  const [season, setSeason] = useState("Musim 2026");

  // State untuk mengontrol buka/tutup custom dropdown
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSeasonOpen, setIsSeasonOpen] = useState(false);

  const filteredEntries = useMemo(() => {
    const result =
      category === "Semua kategori"
        ? entries
        : entries.filter((e) => e.category === category);

    return [...result].sort((a, b) => a.rank - b.rank);
  }, [entries, category]);

  return (
    <div className="fixed inset-0 z-50 block overflow-y-auto bg-[#F7F4EE] pb-24 font-sans text-[#1F1B18] md:hidden">
      <div className="relative mx-auto min-h-screen w-full max-w-md pb-12">
        
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EAE5DF] bg-[#F7F4EE]/95 px-4 py-3.5 backdrop-blur-md">
          {/* Tombol Back & Judul */}
          <Link
            href="/anggota/dashboard"
            className="flex items-center gap-2 text-left group"
          >
            <svg className="h-5 w-5 text-[#E85F17] transition group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            <div>
              <h1 className="text-base font-bold leading-tight text-[#111111]">Leaderboard</h1>
              <p className="text-[11px] font-medium text-[#857B72]">Peringkat {season.toLowerCase()}</p>
            </div>
          </Link>

          <button
            type="button"
            aria-label="Notifikasi"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#EAE5DF] bg-white text-[#1F1B18] shadow-2xs"
          >
            <svg className="h-4 w-4 text-[#857B72]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-white bg-[#E11D48]" />
          </button>
        </div>

        <div className="px-4 pt-4 space-y-4">
          
          {/* CUSTOM FILTERS */}
          <div className="grid grid-cols-2 gap-2.5">
            
            {/* Filter Kategori */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsCategoryOpen(!isCategoryOpen);
                  setIsSeasonOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-2xl border border-[#EAE5DF] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1F1B18] shadow-2xs outline-none"
              >
                <span className="truncate">{category}</span>
                <span className="text-[10px] text-[#857B72]">▼</span>
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 z-20 mt-1 overflow-hidden rounded-2xl border border-[#EAE5DF] bg-white shadow-lg">
                  {categoryOptions.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCategory(c);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left text-xs transition hover:bg-[#FFF2E5] hover:text-[#E85F17] ${
                        category === c ? "bg-[#FFF2E5] font-bold text-[#E85F17]" : "text-[#1F1B18]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Musim */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsSeasonOpen(!isSeasonOpen);
                  setIsCategoryOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-2xl border border-[#EAE5DF] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1F1B18] shadow-2xs outline-none"
              >
                <span className="truncate">{season}</span>
                <span className="text-[10px] text-[#857B72]">▼</span>
              </button>

              {isSeasonOpen && (
                <div className="absolute left-0 right-0 z-20 mt-1 overflow-hidden rounded-2xl border border-[#EAE5DF] bg-white shadow-lg">
                  {seasonOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSeason(s);
                        setIsSeasonOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left text-xs transition hover:bg-[#FFF2E5] hover:text-[#E85F17] ${
                        season === s ? "bg-[#FFF2E5] font-bold text-[#E85F17]" : "text-[#1F1B18]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* BANNER INFO PRD TBD */}
          <div className="flex gap-3 rounded-2xl border border-[#EAE5DF] bg-[#FFF8F3] p-3 text-[#7A5B40] shadow-2xs">
            <div className="shrink-0 pt-0.5 text-[#EE6B2B]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[10px] font-medium leading-relaxed">
              [PRD TBD] Formula perhitungan poin dan pembagian ring belum ditentukan — struktur peringkat masih sementara.
            </p>
          </div>

          {/* LIST CARDS LEADERBOARD */}
          <div className="space-y-3">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-2xl border border-[#EAE5DF] bg-white p-3.5 shadow-2xs transition hover:border-[#F2782B]/40"
              >
                <div className="flex items-center gap-3 min-w-0">
                  
                  {/* FOTO KUCING & RANK BADGE */}
                  <div className="relative flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-[#F2ECE4] text-[#857B72] overflow-hidden border border-[#EAE5DF]">
                    <DashboardIcon name="cat" size={18} />
                    <span className="text-[8px] font-medium mt-0.5 scale-95">Foto kucing</span>
                    <span className={`absolute bottom-0 inset-x-0 text-center text-[10px] font-bold py-0.5 ${
                      entry.rank === 1 ? "bg-[#F2782B] text-white" :
                      entry.rank === 2 ? "bg-[#E08A38] text-white" :
                      entry.rank === 3 ? "bg-[#C47528] text-white" :
                      "bg-[#3E3732] text-white"
                    }`}>
                      #{entry.rank}
                    </span>
                  </div>

                  {/* DETAIL KUCING & OWNER */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="truncate text-xs font-bold text-[#111111]">{entry.catName}</h3>
                      <span className="rounded bg-[#F2EEEA] px-1.5 py-0.5 text-[9px] font-semibold text-[#59524C]">
                        {entry.breed.split(' ')[0]}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10px] font-medium text-[#857B72] truncate">
                      {entry.breed} · Adult
                    </p>
                    <p className="mt-0.5 text-[10px] font-medium text-[#857B72] truncate">
                      Owner {entry.cattery}
                    </p>
                  </div>
                </div>

                {/* POIN */}
                <div className="text-right shrink-0 pl-2">
                  <span className="text-sm font-extrabold text-[#111111]">
                    {entry.points.toLocaleString("id-ID")}
                  </span>
                  <p className="text-[9px] font-bold uppercase tracking-wide text-[#857B72]">POIN</p>
                </div>
              </div>
            ))}

            {filteredEntries.length === 0 && (
              <div className="rounded-2xl border border-[#EAE5DF] bg-white p-6 text-center text-xs text-[#857B72]">
                Belum ada data leaderboard untuk kategori ini.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}