"use client";

import DashboardIcon from "@/components/anggota/DashboardIcon";
import React, { useState } from "react";

interface CatLeaderboardItem {
  id: string;
  rank: number;
  name: string;
  emsCode: string;
  owner: string;
  breeder: string;
  shows: string[];
  score: number;
  paidShowsCount: number;
}

const leaderboardData: CatLeaderboardItem[] = [
  {
    id: "1",
    rank: 1,
    name: "Bagas of Rumah Hana",
    emsCode: "EMS PER n 22",
    owner: "Hana Prameswari",
    breeder: "Rumah Hana Cattery",
    shows: [
      "ICA National Cat Show Bandung 2026",
      "ICA Regional Cat Show Bandung 2026",
      "ICA Kitten Fest 2025",
    ],
    score: 94,
    paidShowsCount: 3,
  },
  {
    id: "2",
    rank: 2,
    name: "Kirana of Rumah Hana",
    emsCode: "EMS PER f 22",
    owner: "Hana Prameswari",
    breeder: "Rumah Hana Cattery",
    shows: ["ICA National Cat Show Bandung 2026"],
    score: 91,
    paidShowsCount: 1,
  },
  {
    id: "3",
    rank: 3,
    name: "Nara Kencana",
    emsCode: "EMS EXO d 03",
    owner: "Hana Prameswari",
    breeder: "Rumah Hana Cattery",
    shows: ["ICA Kitten Fest 2026", "ICA National Cat Show Bandung 2026"],
    score: 88,
    paidShowsCount: 2,
  },
  {
    id: "4",
    rank: 4,
    name: "Rimba of Rumah Hana",
    emsCode: "EMS PER a 21",
    owner: "Hana Prameswari",
    breeder: "Rumah Hana Cattery",
    shows: ["ICA Regional Cat Show Bandung 2026"],
    score: 84,
    paidShowsCount: 1,
  },
];

export default function LeaderboardPage() {
  const [selectedCatFilter, setSelectedCatFilter] = useState("Kucing cattery saya");
  const [selectedSeason, setSelectedSeason] = useState("Musim 2026");

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#2d2825] font-sans">
      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
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
          {/* Filter 1: Cat Selection */}
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

          {/* Filter 2: Season */}
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
              {/* Left Column: Rank, Avatar, Cat Details */}
              <div className="flex items-start gap-4">
                {/* Rank Number Circle */}
                <div className="w-8 h-8 rounded-full bg-[#fff2e8] text-[#f05a1b] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {cat.rank}
                </div>

                {/* Cat Avatar Icon */}
                <div className="w-12 h-12 rounded-2xl bg-[#f7f2ed] border border-[#eae0d5] flex items-center justify-center text-[#8c8074] shrink-0">
                  <DashboardIcon name="cat" size={22} />
                </div>

                {/* Information */}
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

                  {/* Show Badges */}
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

              {/* Right Column: Scoring */}
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
      </main>
    </div>
  );
}