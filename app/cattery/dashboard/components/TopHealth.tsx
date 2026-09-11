"use client";

import DashboardIcon from "@/components/anggota/DashboardIcon";
import React from "react";

const catsScoreData = [
  { rank: 1, name: "Bagas of Rumah Hana", breed: "Persian · PER n 22", score: 94, active: true },
  { rank: 2, name: "Kirana of Rumah Hana", breed: "Persian · PER f 22", score: 91, active: true },
  { rank: 3, name: "Nara Kencana", breed: "Exotic Shorthair · EXO d 03", score: 88, active: true },
  { rank: 4, name: "Rimba of Rumah Hana", breed: "Persian · PER a 21", score: 84, active: false },
  { rank: 5, name: "Sekar Ayu", breed: "Exotic Shorthair · EXO n 24", score: 80, active: false },
];

export default function TopHealthScoresCard() {
  return (
    <div className="lg:col-span-5 bg-white rounded-3xl border border-[#eedfd5] shadow-xs p-5 sm:p-6 flex flex-col justify-between space-y-5">
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

        <div className="space-y-3 border-t border-[var(--color-ink-100)]">
          {catsScoreData.map((cat) => (
            <div key={cat.rank} className="flex items-center justify-between p-2.5 rounded-2xl">
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                    cat.active ? "bg-[#fff4eb] text-[#f05a1b]" : "bg-[#f4efe9] text-[#8c8074]"
                  }`}
                >
                  {cat.rank}
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#f4efe9] flex items-center justify-center text-[#8c8074] shrink-0">
                  <DashboardIcon name="cat" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#1a1513]">{cat.name}</h3>
                  <p className="text-[11px] text-[#8c8074]">{cat.breed}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-black text-base text-[#f05a1b]">{cat.score}</span>
                <span className="block text-[10px] text-[#a09488]">skor</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#f4efe9] pt-3 text-xs text-[#8c8074]">
        <span>Read-only · tidak ada aksi edit skor di sisi cattery.</span>
        <a href="/cattery/leaderboard" className="font-bold text-[#f05a1b] hover:underline">
          Leaderboard →
        </a>
      </div>
    </div>
  );
}