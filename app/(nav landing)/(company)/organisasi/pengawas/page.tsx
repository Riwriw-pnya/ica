"use client";

import { useState, useMemo } from "react";
import Navbar from "@/app/landing-page/components/Navbar"; 
import Footer from "@/app/landing-page/components/Footer"; 

export default function SupervisoryBoardPage() {
  const boardMembers = [
    null,
    { name: "Suharno Eliandi, SE Ak, MSc., CA", role: "Ketua Pengawas", isHeader: true },
    null,

    { name: "DR. Drh. M. Munawaroh, MM", role: "Ketua Bidang Pengawas AD ART dan Kode Etik" },
    null,
    { name: "Herry Marwanto", role: "Ketua Bidang Pengawas Operasional" },

    { name: "Amsul Nababan (Alm.)", role: "Anggota Pengawas" },
    { name: "Ratih S.Umiyati", role: "Anggota Pengawas" },
    { name: "Ermita Hadi", role: "Anggota Pengawas" },

    { name: "Rita Irianti", role: "Anggota Pengawas" },
    { name: "Henny Retnowati", role: "Anggota Pengawas" },
    { name: "H. Herry Mulyadi", role: "Anggota Pengawas" },

    { name: "Betty Setiawati", role: "Anggota Pengawas" },
    null,
    { name: "Lanny", role: "Anggota Pengawas" },
  ];

  const tableData = [
    { name: "Suharno Eliandi, SE Ak, MSc., CA", position: "Ketua Pengawas", cattery: "BRITANIA BLUE" },
    { name: "DR. Drh. M. Munawaroh, MM", position: "Ketua Bidang Pengawas AD ART dan Kode Etik", cattery: "-" },
    { name: "Herry Marwanto", position: "Ketua Bidang Pengawas Operasional", cattery: "PANDANWANGI" },
    { name: "Amsul Nababan", position: "Anggota Pengawas", cattery: "-" },
    { name: "Rita Irianti", position: "Anggota Pengawas", cattery: "KITADA" },
    { name: "Ermita Hadi", position: "Anggota Pengawas", cattery: "MITACATS" },
    { name: "Ratih S.Umiyati", position: "Anggota Pengawas", cattery: "MYTLC" },
    { name: "Henny Retnowati", position: "Anggota Pengawas", cattery: "PESONA" },
    { name: "H. Herry Mulyadi", position: "Anggota Pengawas", cattery: "PALMA" },
    { name: "Betty Setiawati", position: "Anggota Pengawas", cattery: "TIFFANY CATS" },
    { name: "Niniek Susanty", position: "Anggota Pengawas", cattery: "TEECEE" },
    { name: "Lanny", position: "Anggota Pengawas", cattery: "LYCAT" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return tableData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cattery.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage) || 1;

  const displayedData = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredData.slice(start, start + entriesPerPage);
  }, [filteredData, currentPage, entriesPerPage]);

  return (
    <div className="min-h-screen bg-white text-[#4A3D34] font-sans flex flex-col justify-between">
      
      <Navbar />
      
      <main className="space-y-12 pb-24 pt-8">
        
        <section className="max-w-5xl mx-auto px-6 text-center space-y-4">
          
          <div className="inline-block px-5 py-1.5 rounded-full bg-[#FFEEDD] border border-[#FDE4D0] text-[#D96B27] font-bold text-xs md:text-sm tracking-wider uppercase shadow-xs">
            TENTANG ORGANISASI
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <div className="flex-1 h-[1px] bg-[#E2E8F0]" />
            <h2 className="text-2xl sm:text-4xl font-black text-[#2D2421] tracking-tight">
              Dewan <span className="text-[#E86826]">Pengawas</span>
            </h2>
            <div className="flex-1 h-[1px] bg-[#E2E8F0]" />
          </div>

          <p className="text-sm md:text-base font-medium text-[#7C6A5D]">
            The Supervisory Board of ICA (2024–2027)
          </p>

        </section>

        <section className="max-w-3xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
            {boardMembers.map((item, index) => {
              if (!item) {
                return <div key={index} className="hidden md:block" />;
              }

              return (
                <div 
                  key={index} 
                  className="bg-white p-5 rounded-2xl border border-[#FDE4D0] shadow-xs text-center space-y-3 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:bg-gradient-to-b hover:from-white hover:to-[#FFF0E5] hover:border-[#FA9856]/70 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#FFF3EA] border-2 border-[#F99F5D]/30 overflow-hidden relative flex items-center justify-center text-gray-400 text-xs shrink-0 transition-colors duration-300">
                    <span>Foto</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#4A3D34] leading-snug">
                      {item.name}
                    </h4>
                    <p className={`text-xs mt-1 leading-relaxed ${item.isHeader ? 'text-[#E86826] font-semibold' : 'text-gray-500'}`}>
                      {item.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tabel Data Dewan Pengawas */}
        <section className="max-w-4xl mx-auto px-6 pt-2">
          <div className="bg-[#FFF9F5] p-6 sm:p-8 rounded-3xl border border-[#FDE4D0] shadow-xs space-y-5">
            
            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-2 text-[#7C6A5D] font-medium">
                <span>Tampilkan</span>
                <select 
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-[#FDE4D0] rounded-lg px-2.5 py-1 bg-white text-[#4A3D34] font-semibold focus:outline-none focus:ring-2 focus:ring-[#FA9856]/40 transition cursor-pointer shadow-xs"
                >
                  <option value={10}>10</option>
                  <option value={14}>14</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entri</span>
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <input 
                  type="text" 
                  placeholder="Cari dewan / cattery..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-4 py-1.5 border border-[#FDE4D0] rounded-lg bg-white text-xs md:text-sm text-[#4A3D34] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FA9856]/40 transition shadow-xs"
                />
                <svg className="w-4 h-4 text-[#A89689] absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>

            {/* Table Area */}
            <div className="overflow-hidden rounded-2xl border border-[#FDE4D0] bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  
                  {/* Header Gradasi Horizontal Clean */}
                  <thead>
                    <tr className="bg-gradient-to-r from-[#FA9856] via-[#F58338] to-[#F27329] text-white text-xs md:text-sm font-semibold select-none">
                      
                      <th className="p-4 font-bold tracking-wide w-[40%]">
                        <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition">
                          <span>Nama</span>
                          <span className="text-[10px] opacity-75">↑↓</span>
                        </div>
                      </th>

                      <th className="p-4 font-bold tracking-wide w-[38%]">
                        <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition">
                          <span>Jabatan</span>
                          <span className="text-[10px] opacity-75">↑↓</span>
                        </div>
                      </th>

                      <th className="p-4 font-bold tracking-wide w-[22%]">
                        <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition whitespace-nowrap">
                          <span>Nama Cattery</span>
                          <span className="text-[10px] opacity-75">↑↓</span>
                        </div>
                      </th>

                    </tr>
                  </thead>

                  {/* Body Table */}
                  <tbody className="divide-y divide-[#FDE4D0]/60 bg-white text-xs md:text-sm">
                    {displayedData.length > 0 ? (
                      displayedData.map((row, idx) => (
                        <tr 
                          key={idx} 
                          className="hover:bg-[#FFF6F0] transition-colors duration-150"
                        >
                          <td className="p-4 font-bold text-[#4A3D34] align-middle">{row.name}</td>
                          <td className="p-4 text-[#7C6A5D] font-medium align-middle">{row.position}</td>
                          <td className="p-4 align-middle">
                            {row.cattery !== "-" ? (
                              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FFF3EA] text-[#E86826] border border-[#FDE4D0] whitespace-nowrap">
                                {row.cattery}
                              </span>
                            ) : (
                              <span className="text-gray-400 font-medium px-2">-</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="p-8 text-center text-gray-400">
                          Data dewan tidak ditemukan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination UI Dinamis & Compact */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#7C6A5D] pt-1">
              <div>
                Menampilkan <span className="font-bold text-[#4A3D34]">{filteredData.length > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0}</span> sampai{" "}
                <span className="font-bold text-[#4A3D34]">{Math.min(currentPage * entriesPerPage, filteredData.length)}</span> dari{" "}
                <span className="font-bold text-[#4A3D34]">{filteredData.length}</span> entri
              </div>
              
              <div className="flex items-center gap-1.5">
                {/* Prev Arrow */}
                <button 
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous Page"
                  className={`w-8 h-8 flex items-center justify-center border rounded-lg transition ${
                    currentPage === 1 
                      ? "text-slate-300 border-slate-200/60 bg-white/50 cursor-not-allowed" 
                      : "text-[#334155] border-slate-200/80 bg-white hover:border-orange-300 hover:text-[#FF5E00]"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center font-semibold rounded-lg text-xs transition ${
                      currentPage === page
                        ? "bg-[#FF5E00] text-white shadow-sm"
                        : "text-[#334155] bg-white border border-slate-200/80 hover:border-orange-300 hover:text-[#FF5E00]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Arrow */}
                <button 
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  aria-label="Next Page"
                  className={`w-8 h-8 flex items-center justify-center border rounded-lg transition ${
                    currentPage === totalPages 
                      ? "text-slate-300 border-slate-200/60 bg-white/50 cursor-not-allowed" 
                      : "text-[#334155] border-slate-200/80 bg-white hover:border-orange-300 hover:text-[#FF5E00]"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}