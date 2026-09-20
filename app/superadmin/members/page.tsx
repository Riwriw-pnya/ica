"use client";

import { useState } from "react";

interface Member {
  id: string;
  memberNo: string;
  name: string;
  email: string;
  region: string;
  cattery: string;
  catsCount: number;
  status: "Aktif" | "Kedaluwarsa";
}

const MEMBERS_DATA: Member[] = [
  {
    id: "1",
    memberNo: "ICA-2024-0871",
    name: "Hana Maheswari",
    email: "hana@rumahhana.id",
    region: "Bandung",
    cattery: "Rumah Hana Cattery",
    catsCount: 11,
    status: "Aktif",
  },
  {
    id: "2",
    memberNo: "ICA-2023-0455",
    name: "Reza Aditya",
    email: "reza@bandungpaws.id",
    region: "Bandung",
    cattery: "Bandung Paws Cattery",
    catsCount: 8,
    status: "Aktif",
  },
  {
    id: "3",
    memberNo: "ICA-2022-0130",
    name: "Tirta Wijaya",
    email: "tirta@sumatracats.id",
    region: "Medan",
    cattery: "Sumatra Cats",
    catsCount: 6,
    status: "Aktif",
  },
  {
    id: "4",
    memberNo: "ICA-2021-0092",
    name: "Bagus Prakoso",
    email: "bagus@jogjaras.id",
    region: "Surabaya",
    cattery: "Jogja Ras Cattery",
    catsCount: 4,
    status: "Kedaluwarsa",
  },
  {
    id: "5",
    memberNo: "ICA-2025-1204",
    name: "Dimas Prayoga",
    email: "dimas.prayoga@gmail.com",
    region: "Jakarta",
    cattery: "—",
    catsCount: 2,
    status: "Aktif",
  },
  {
    id: "6",
    memberNo: "ICA-2025-1330",
    name: "Nadia Puspa",
    email: "nadia.puspa@gmail.com",
    region: "Jakarta",
    cattery: "—",
    catsCount: 1,
    status: "Aktif",
  },
];

export default function MembersPage() {
  const [selectedRegion, setSelectedRegion] = useState("Semua wilayah");

  const filteredMembers = MEMBERS_DATA.filter((m) => {
    if (selectedRegion === "Semua wilayah") return true;
    return m.region.toLowerCase() === selectedRegion.toLowerCase();
  });

  const handleExportCSV = () => {
    const headers = ["No. Anggota,Nama,Email,Wilayah,Cattery,Jumlah Kucing,Status"];
    const rows = filteredMembers.map(
      (m) =>
        `"${m.memberNo}","${m.name}","${m.email}","${m.region}","${m.cattery}",${m.catsCount},"${m.status}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Members_ICA_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Member Aktif */}
        <div className="bg-white border border-[#EFE9E1] rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold tracking-wider text-[#8C8078] uppercase">
              MEMBER AKTIF
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF6EC] border border-[#FDE3CE] flex items-center justify-center text-[#EE6B28]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold text-[#231A14]">1.284</div>
            <div className="text-[11px] text-[#8C8078] mt-0.5">Per 4 Sep 2026</div>
          </div>
        </div>

        {/* Card 2: Kedaluwarsa */}
        <div className="bg-white border border-[#EFE9E1] rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold tracking-wider text-[#8C8078] uppercase">
              KEDALUWARSA
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF6EC] border border-[#FDE3CE] flex items-center justify-center text-[#EE6B28]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold text-[#231A14]">76</div>
            <div className="text-[11px] text-[#8C8078] mt-0.5">Iuran belum diperbarui</div>
          </div>
        </div>

        {/* Card 3: Baru Bulan Ini */}
        <div className="bg-white border border-[#EFE9E1] rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold tracking-wider text-[#8C8078] uppercase">
              BARU BULAN INI
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF6EC] border border-[#FDE3CE] flex items-center justify-center text-[#EE6B28]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold text-[#231A14]">31</div>
            <div className="text-[11px] text-[#8C8078] mt-0.5">Termasuk 9 pemilik cattery</div>
          </div>
        </div>
      </div>

      {/* Table Section Card */}
      <div className="bg-white border border-[#EFE9E1] rounded-2xl shadow-xs overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-5 border-b border-[#EFE9E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-sm font-bold text-[#231A14]">Daftar member</h2>

          <div className="flex items-center gap-3">
            {/* Filter Dropdown */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3.5 py-2 rounded-xl text-xs bg-[#FAF8F5] border border-[#EFE9E1] text-[#231A14] font-medium focus:outline-none focus:border-[#EE6B28] cursor-pointer"
            >
              <option value="Semua wilayah">Semua wilayah</option>
              <option value="Bandung">Bandung</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Medan">Medan</option>
              <option value="Surabaya">Surabaya</option>
            </select>

            {/* Export Button */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#D95A19] bg-[#FFF8F3] border border-[#FDE3CE] hover:bg-[#FFEEDF] transition cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EFE9E1] bg-[#FAF8F5] text-[#8C8078] font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-5">NO. ANGGOTA</th>
                <th className="py-3 px-5">NAMA</th>
                <th className="py-3 px-5">WILAYAH</th>
                <th className="py-3 px-5">CATTERY</th>
                <th className="py-3 px-5 text-center">KUCING</th>
                <th className="py-3 px-5">KEANGGOTAAN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE9E1]">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-[#FAF8F5]/60 transition">
                  {/* No. Anggota */}
                  <td className="py-3.5 px-5 font-mono text-[#231A14]">
                    {member.memberNo}
                  </td>

                  {/* Nama & Email */}
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-[#231A14]">{member.name}</div>
                    <div className="text-[10px] text-[#8C8078]">{member.email}</div>
                  </td>

                  {/* Wilayah */}
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-[#FAF8F5] border border-[#EFE9E1] text-[#5A4F48]">
                      📍 {member.region}
                    </span>
                  </td>

                  {/* Cattery */}
                  <td className="py-3.5 px-5 text-[#231A14]">
                    {member.cattery}
                  </td>

                  {/* Kucing Count */}
                  <td className="py-3.5 px-5 text-center font-medium text-[#231A14]">
                    {member.catsCount}
                  </td>

                  {/* Status Keanggotaan */}
                  <td className="py-3.5 px-5">
                    {member.status === "Aktif" ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-gray-500 font-semibold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        Kedaluwarsa
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}