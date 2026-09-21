"use client";

import React from "react";
import { Info, Calendar } from "lucide-react";

interface GlobalRankingTableProps {
  activeTab: "global" | "event";
  selectedEvent: string;
}

export default function GlobalRankingTable({ activeTab, selectedEvent }: GlobalRankingTableProps) {
  const rankingData = [
    { rank: 1, name: "Bagas", code: "PER n 22", owner: "Hana Maheswari", breeder: "Rumah Hana Cattery", assessment: "ICA Cat Show Bandung 2026", score: 92 },
    { rank: 2, name: "Kimo", code: "EXO n 24", owner: "Reza Aditya", breeder: "Bandung Paws Cattery", assessment: "ICA Cat Show Bandung 2026", score: 90 },
    { rank: 3, name: "Nara", code: "PER f 03", owner: "Hana Maheswari", breeder: "Rumah Hana Cattery", assessment: "Ranking global", score: 88 },
    { rank: 4, name: "Sasa", code: "MCO ns 22", owner: "Reza Aditya", breeder: "Bandung Paws Cattery", assessment: "Ranking global", score: 85 },
    { rank: 5, name: "Rico", code: "MCO n 09 22", owner: "Tirta Wijaya", breeder: "Sumatra Cats", assessment: "ICA Cat Show Medan 2026", score: 81 },
  ];

  // Filter baris sesuai pilihan tab/event
  const filteredData = activeTab === "event"
    ? rankingData.filter((item) => item.assessment === selectedEvent)
    : rankingData;

  return (
    <div className="space-y-4">
      {/* Notice Banner */}
      <div className="bg-[#F0F7FF] border border-[#D0E5FF] rounded-2xl p-4 flex items-center gap-3 text-xs text-[#231A14]">
        <Info className="w-4 h-4 text-[#0066CC] shrink-0" />
        <span>Skor kesehatan diisi manual oleh admin ICA, bukan hasil kalkulasi sistem. Di sisi cattery skor tampil read-only.</span>
      </div>

      {/* Card Table */}
      <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 space-y-4 shadow-xs">
        <h2 className="text-base font-bold text-[#231A14]">Tabel ranking</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EFECE6] text-[#8C7A6B] font-semibold uppercase text-[10px] tracking-wider">
                <th className="pb-3 w-10">#</th>
                <th className="pb-3">KUCING</th>
                <th className="pb-3">OWNER</th>
                <th className="pb-3">BREEDER</th>
                <th className="pb-3">PENILAIAN</th>
                <th className="pb-3 text-center w-20">SKOR</th>
                <th className="pb-3 text-right w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6]">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.rank} className="hover:bg-[#FAFAF7]/50 transition-colors">
                    <td className="py-4 font-bold text-[#C8601D] text-sm">{item.rank}</td>
                    <td className="py-4">
                      <p className="font-bold text-[#231A14]">{item.name}</p>
                      <p className="text-[11px] text-[#8C7A6B]">{item.code}</p>
                    </td>
                    <td className="py-4 font-medium text-[#231A14]">{item.owner}</td>
                    <td className="py-4 text-[#6B5D52]">{item.breeder}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EFECE6] text-[#0066CC] text-[11px] font-medium">
                        <Calendar className="w-3 h-3" />
                        {item.assessment}
                      </span>
                    </td>
                    <td className="py-4 text-center font-extrabold text-[#C8601D] text-sm">{item.score}</td>
                    <td className="py-4 text-right">
                      <button type="button" className="text-xs font-bold text-[#C8601D] hover:underline cursor-pointer">
                        Edit skor
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#8C7A6B]">
                    Tidak ada data ranking untuk event ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-[#8C8078] italic pt-1">Data contoh.</p>
      </div>
    </div>
  );
}