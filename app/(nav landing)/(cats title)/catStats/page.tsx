"use client";

import { useState, useMemo } from "react";
import Navbar from "@/app/landing-page/components/Navbar";
import Footer from "@/app/landing-page/components/Footer";

interface NationalWinnerItem {
  no: number;
  name: string;
  pattern: string;
  owner: string;
  breeder: string;
  score: number;
}

const nationalWinnerData: NationalWinnerItem[] = [
  { no: 1, name: "ID*Althana Jacobs", pattern: "MCO d", owner: "William Gregorius Tanto", breeder: "William Gregorius Tanto", score: 2205 },
  { no: 2, name: "ID*Meowly Dumbo of ID*Kapten Surabaya", pattern: "PER n 01 62", owner: "Fajar Romadhon", breeder: "RR Dewi Setyowati, SH", score: 1915 },
  { no: 3, name: "ID*Althana Hermes", pattern: "MCO f", owner: "William Gregorius Tanto", breeder: "William Gregorius Tanto", score: 1898 },
  { no: 4, name: "ID*Razaiq Night Queen", pattern: "RAG a 03", owner: "Rizky Thamrin", breeder: "Rizky Thamrin", score: 1869 },
  { no: 5, name: "Id*servian Kian", pattern: "SPH d 02 62", owner: "Zi Shan Servia", breeder: "Zi Shan Servia", score: 1830 },
  { no: 6, name: "Id*servian Koda", pattern: "SPH f 09 33", owner: "Zi Shan Servia", breeder: "Zi Shan Servia", score: 1803 },
  { no: 7, name: "ID*Atipa Alice", pattern: "MCO f 25", owner: "M.Iqbal / Yessi Novianti", breeder: "M.Iqbal / Yessi Novianti", score: 1774 },
];

export default function CatsTitleStatusPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const filteredNational = useMemo(() => {
    if (!searchTerm.trim()) return nationalWinnerData.slice(0, entriesPerPage);
    const term = searchTerm.toLowerCase();
    return nationalWinnerData
      .filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.owner.toLowerCase().includes(term) ||
          item.breeder.toLowerCase().includes(term) ||
          item.pattern.toLowerCase().includes(term)
      )
      .slice(0, entriesPerPage);
  }, [searchTerm, entriesPerPage]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#231A14]">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="inline-block px-6 py-2 bg-[#FDEEE4] text-[#F05A22] font-extrabold text-xs sm:text-sm rounded-full uppercase tracking-wider shadow-sm">
              TENTANG ORGANISASI
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-8 w-full max-w-3xl pt-2">
              <div className="h-[1px] bg-gray-200 flex-1 hidden sm:block"></div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight whitespace-nowrap">
                <span className="text-[#231A14]">Status </span>
                <span className="text-[#F05A22]">Klaim Title</span>
              </h1>
              <div className="h-[1px] bg-gray-200 flex-1 hidden sm:block"></div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Update Score & Status ICA FIFe Indonesia
            </p>
          </div>

          {/* Card Wrapper Outer */}
          <div className="bg-[#FAF5EF] rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm border border-[#F2E8DC]">
            
            {/* Table Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
                <span>Tampilkan</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="border-0 rounded-full px-4 py-2 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F05A22] cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entri</span>
              </div>

              <div className="relative w-full sm:w-80">
                <svg
                  className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari kucing / pemilik..."
                  className="w-full pl-11 pr-4 py-2.5 text-xs rounded-full border-0 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F05A22]"
                />
              </div>
            </div>

            {/* Table Card Inner */}
            <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-gray-100">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#F05A22] text-white font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-4 text-center w-16">NO</th>
                    <th className="px-5 py-4">
                      <div className="flex items-center gap-1 cursor-pointer">
                        NAMA KUCING <span className="text-white/70 text-[10px]">↑↓</span>
                      </div>
                    </th>
                    <th className="px-5 py-4">
                      <div className="flex items-center gap-1 cursor-pointer">
                        PATTERN CODE <span className="text-white/70 text-[10px]">↑↓</span>
                      </div>
                    </th>
                    <th className="px-5 py-4">
                      <div className="flex items-center gap-1 cursor-pointer">
                        OWNER <span className="text-white/70 text-[10px]">↑↓</span>
                      </div>
                    </th>
                    <th className="px-5 py-4">BREEDER</th>
                    <th className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 cursor-pointer">
                        SCORING <span className="text-white/70 text-[10px]">↑↓</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {filteredNational.length > 0 ? (
                    filteredNational.map((row) => (
                      <tr key={row.no} className="hover:bg-[#FAF5EF]/50 transition">
                        <td className="px-5 py-4 text-center font-bold text-gray-400">{row.no}</td>
                        <td className="px-5 py-4 font-bold text-[#231A14]">{row.name}</td>
                        <td className="px-5 py-4 text-gray-600 font-semibold">{row.pattern}</td>
                        <td className="px-5 py-4 text-[#F05A22] font-medium">{row.owner}</td>
                        <td className="px-5 py-4 text-gray-700">{row.breeder}</td>
                        <td className="px-5 py-4 text-right font-black text-[#F05A22] text-sm">{row.score}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-5 py-8 text-center text-gray-400 italic">
                        Data score tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}