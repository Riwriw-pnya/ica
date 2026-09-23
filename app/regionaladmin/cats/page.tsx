"use client";

import React, { useState } from "react";
import { Info } from "lucide-react";

export interface CatItem {
  id: string;
  regNo: string;
  name: string;
  breed: string;
  emsCode: string;
  owner: string;
  cattery: string;
  healthScore: number;
  pedigreeStatus: "Aktif" | "Nonaktif";
}

const mockCats: CatItem[] = [
  {
    id: "1",
    regNo: "ICA-2024-0871-01",
    name: "Bagas",
    breed: "Persian",
    emsCode: "PER n 22",
    owner: "Hana Maheswari",
    cattery: "Rumah Hana Cattery",
    healthScore: 92,
    pedigreeStatus: "Aktif",
  },
  {
    id: "2",
    regNo: "ICA-2024-0871-04",
    name: "Nara",
    breed: "Persian",
    emsCode: "PER f 03",
    owner: "Hana Maheswari",
    cattery: "Rumah Hana Cattery",
    healthScore: 88,
    pedigreeStatus: "Aktif",
  },
  {
    id: "3",
    regNo: "ICA-2023-0455-02",
    name: "Kimo",
    breed: "Exotic Shorthair",
    emsCode: "EXO n 24",
    owner: "Reza Aditya",
    cattery: "Bandung Paws Cattery",
    healthScore: 90,
    pedigreeStatus: "Aktif",
  },
  {
    id: "4",
    regNo: "ICA-2023-0455-05",
    name: "Sasa",
    breed: "Maine Coon",
    emsCode: "MCO ns 22",
    owner: "Reza Aditya",
    cattery: "Bandung Paws Cattery",
    healthScore: 85,
    pedigreeStatus: "Aktif",
  },
];

const breedOptions = [
  "Semua ras",
  "Persian",
  "Maine Coon",
  "Exotic Shorthair",
  "British Shorthair",
];

export default function CatsPage() {
  const [selectedBreed, setSelectedBreed] = useState<string>("Semua ras");

  // Filter data berdasarkan ras yang dipilih
  const filteredCats = mockCats.filter((cat) => {
    if (selectedBreed === "Semua ras") return true;
    return cat.breed.toLowerCase() === selectedBreed.toLowerCase();
  });

  return (
    <div className="space-y-4 text-[#333333]">
      {/* Info Banner */}
      <div className="bg-[#FAF7F2] border border-[#EDE7DE] rounded-xl px-4 py-3 flex items-center gap-3 text-xs text-gray-700">
        <Info className="w-4 h-4 text-gray-400 shrink-0" />
        <span>
          Read-only. Data kucing mengikuti cattery di wilayah Bandung — skor
          kesehatan dan status pedigree hanya bisa diubah admin pusat.
        </span>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-gray-100 rounded-2xl py-5 px-2 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-5 px-3 border-b border-gray-200">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Semua kucing terdaftar
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Kode pola mengikuti EMS code. Skor kesehatan diisi manual oleh
              admin ICA.
            </p>
          </div>

          {/* Breed Filter Select */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              className="w-full sm:w-44 bg-white border border-gray-200 text-gray-700 text-xs rounded-lg px-3 py-2 outline-none focus:border-[#E06D20] cursor-pointer font-medium shadow-sm transition-all"
            >
              {breedOptions.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-3 font-semibold">REG. NO</th>
                <th className="py-3 px-3 font-semibold">KUCING</th>
                <th className="py-3 px-3 font-semibold">EMS CODE</th>
                <th className="py-3 px-3 font-semibold">OWNER</th>
                <th className="py-3 px-3 font-semibold">CATTERY</th>
                <th className="py-3 px-3 font-semibold text-center">SKOR</th>
                <th className="py-3 px-3 font-semibold">PEDIGREE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCats.length > 0 ? (
                filteredCats.map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    <td className="py-2.5 px-3 font-medium text-gray-800">
                      {cat.regNo}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-gray-900">{cat.name}</div>
                      <div className="text-[11px] text-gray-400">{cat.breed}</div>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-gray-800">
                      {cat.emsCode}
                    </td>
                    <td className="py-2.5 px-3 text-gray-800">{cat.owner}</td>
                    <td className="py-2.5 px-3 text-gray-800">{cat.cattery}</td>
                    <td className="py-2.5 px-3 text-center font-semibold text-gray-800">
                      {cat.healthScore}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F8F0] text-[#12B76A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>
                        {cat.pedigreeStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-6 text-center text-gray-400 text-xs"
                  >
                    Tidak ada data kucing untuk ras ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}