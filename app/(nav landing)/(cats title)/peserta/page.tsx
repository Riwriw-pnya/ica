"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Navbar from "@/app/landing-page/components/Navbar";
import Footer from "@/app/landing-page/components/Footer";

interface WwsParticipant {
  id: string;
  category: number;
  catName: string;
  breed: string;
  catClass: string;
  owner: string;
  breeder: string;
  year: number;
  result: string;
  image?: string;
}

const delegasiData: WwsParticipant[] = [
  {
    id: "cat-1-1",
    category: 1,
    catName: "Manggala Rudholpho of Altagama",
    breed: "EXOTIC",
    catClass: "Kitten",
    owner: "Widi Safranah / M. Qaidi B.",
    breeder: "Andrie K. / Anindya Azhra P.",
    year: 2018,
    result: "Ex 1",
  },
  {
    id: "cat-1-2",
    category: 1,
    catName: "Manggala Ultron of Triple5",
    breed: "EXOTIC",
    catClass: "Kitten",
    owner: "Rahmad Cahyadi",
    breeder: "Andrie K. / Anindya Azhra P.",
    year: 2018,
    result: "Ex 1",
  },
  {
    id: "cat-1-3",
    category: 1,
    catName: "D'Eden Lover O Riga of SuperBee",
    breed: "EXOTIC",
    catClass: "Open",
    owner: "Surya Kencana Wahab",
    breeder: "Carnevaletti-Gaspard-Michel",
    year: 2019,
    result: "Ex 1, CAC",
  },
  {
    id: "cat-2-1",
    category: 2,
    catName: "NW'22 SC Mainemarie Louis of Cherbebe",
    breed: "MAINE COON",
    catClass: "Supreme Champion",
    owner: "Markzefanya Cheerson",
    breeder: "Mariya Podoynikova",
    year: 2023,
    result: "PH",
    image: "",
  },
  {
    id: "cat-4-1",
    category: 4,
    catName: "CH Superbee Oslo Of Humerus",
    breed: "ABYSSINIAN",
    catClass: "Champion",
    owner: "Leila Hasymiah",
    breeder: "Surya Kencana Wahab",
    year: 2019,
    result: "Ex 1, CACIB",
  },
  {
    id: "cat-4-2",
    category: 4,
    catName: "SC Dentica Bruce",
    breed: "SPHYNX",
    catClass: "Supreme Champion",
    owner: "Moch Gunawan Firdaus",
    breeder: "Moch Gunawan Firdaus",
    year: 2023,
    result: "PH, BIV, NOM",
    image: "",
  },
];

export default function PesertaWwsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return delegasiData.slice(0, entriesPerPage);
    const term = searchTerm.toLowerCase();
    return delegasiData
      .filter(
        (item) =>
          item.catName.toLowerCase().includes(term) ||
          item.breed.toLowerCase().includes(term) ||
          item.owner.toLowerCase().includes(term) ||
          item.breeder.toLowerCase().includes(term) ||
          item.year.toString().includes(term)
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
              DELEGASI WWS
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-8 w-full max-w-3xl pt-2">
              <div className="h-[1px] bg-gray-200 flex-1 hidden sm:block"></div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight whitespace-nowrap">
                <span className="text-[#231A14]">Peserta </span>
                <span className="text-[#F05A22]">Delegasi</span>
              </h1>
              <div className="h-[1px] bg-gray-200 flex-1 hidden sm:block"></div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              World Winner Show FIFe Indonesia
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
                  placeholder="Cari peserta / delegasi..."
                  className="w-full pl-11 pr-4 py-2.5 text-xs rounded-full border-0 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F05A22]"
                />
              </div>
            </div>

            {/* Table Card Inner */}
            <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-gray-100">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#F05A22] text-white font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-4 text-center">FOTO KUCING</th>
                    <th className="px-5 py-4">
                      <div className="flex items-center gap-1 cursor-pointer">
                        NAMA KUCING <span className="text-white/70 text-[10px]">↑↓</span>
                      </div>
                    </th>
                    <th className="px-5 py-4">
                      <div className="flex items-center gap-1 cursor-pointer">
                        JENIS RAS <span className="text-white/70 text-[10px]">↑↓</span>
                      </div>
                    </th>
                    <th className="px-5 py-4">KELAS</th>
                    <th className="px-5 py-4">OWNER</th>
                    <th className="px-5 py-4">BREEDER</th>
                    <th className="px-5 py-4 text-center">TAHUN WWS</th>
                    <th className="px-5 py-4 text-center">HASIL WWS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => (
                      <tr key={row.id} className="hover:bg-[#FAF5EF]/50 transition">
                        <td className="px-5 py-3 text-center">
                          {row.image ? (
                            <div className="relative w-12 h-12 mx-auto rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                              <Image src={row.image} alt={row.catName} fill className="object-cover" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 mx-auto rounded-xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-[9px] text-gray-400">
                              No Image
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-4 font-bold text-[#231A14] max-w-[180px]">
                          {row.catName}
                        </td>
                        <td className="px-5 py-4 font-semibold text-gray-800 uppercase">
                          {row.breed}
                        </td>
                        <td className="px-5 py-4 text-gray-600">{row.catClass}</td>
                        <td className="px-5 py-4 text-gray-700">{row.owner}</td>
                        <td className="px-5 py-4 text-gray-700">{row.breeder}</td>
                        <td className="px-5 py-4 text-center font-semibold text-gray-800">{row.year}</td>
                        <td className="px-5 py-4 text-center font-bold text-[#F05A22]">{row.result}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-5 py-8 text-center text-gray-400 italic">
                        Data peserta tidak ditemukan.
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