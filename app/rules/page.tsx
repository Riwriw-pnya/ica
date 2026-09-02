"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/app/landing-page/components/Navbar";
import Footer from "@/app/landing-page/components/Footer";

// Data Rules
const RULES_DATA = [
  { id: 1, title: "AD/ART", revision: "2020", linkText: "Download Rules", fileUrl: "#" },
  { id: 2, title: "Kode Etik", revision: "2020", linkText: "Download Rules", fileUrl: "#" },
  { id: 3, title: "Show Rules", revision: "2025", linkText: "Download Rules", fileUrl: "#" },
  { id: 4, title: "Breeding and Register Rules", revision: "2025", linkText: "Download Rules", fileUrl: "#" },
  { id: 5, title: "Logo ICA", revision: "-", linkText: "Download Logo ICA", fileUrl: "#" },
  { id: 6, title: "Logo ICA reverse", revision: "-", linkText: "Download Logo ICA 2", fileUrl: "#" },
  { id: 7, title: "Logo FIFE", revision: "-", linkText: "Download Logo FIFE", fileUrl: "#" },
  { id: 8, title: "Logo FIFE reverse", revision: "-", linkText: "Download Logo FIFE 2", fileUrl: "#" },
];

// Data Form
const FORMS_DATA = [
  { id: 1, title: "FORM PENDAFTARAN ANGGOTA", revision: "2019", linkText: "Download Form", fileUrl: "#" },
  { id: 2, title: "FORM PENDAFTARAN CATTERY", revision: "2025", linkText: "Download Form", fileUrl: "#" },
  { id: 3, title: "FORM REKOMENDASI CATTERY", revision: "2025", linkText: "Download Form", fileUrl: "#" },
  { id: 4, title: "FORM PARENT STOCK CATTERY", revision: "2025", linkText: "Download Form", fileUrl: "#" },
  { id: 5, title: "FORM BALIKNAMA PEDIGREE KUCING", revision: "2025", linkText: "Download Form", fileUrl: "#" },
  { id: 6, title: "FORM MATING REPORT", revision: "2025", linkText: "Download Form", fileUrl: "#" },
  { id: 7, title: "FORM CHECK VET (PRE-CATTERY)", revision: "2025", linkText: "Download Form", fileUrl: "#" },
  { id: 8, title: "FORM PEMACAKAN", revision: "2025", linkText: "Download Form", fileUrl: "#" },
  { id: 9, title: "FORM PENDAFTARAN KUCING HOUSE CAT ICA", revision: "2025", linkText: "Download Form", fileUrl: "#" },
  { id: 10, title: "FORM PEMUTIHAN", revision: "2025", linkText: "Download Form", fileUrl: "#" },
  { id: 11, title: "FORM KLAIM GELAR", revision: "2025", linkText: "Download Form", fileUrl: "#" },
  { id: 12, title: "FORM CHECK VET CAT SHOW", revision: "2025", linkText: "Download Form", fileUrl: "#" },
  { id: 13, title: "FORM PERUBAHAN NAMA CATTERY", revision: "2025", linkText: "Download Form", fileUrl: "#" },
];

export default function RulesAndFormPage() {
  const [rulesSearch, setRulesSearch] = useState("");
  const [rulesEntries, setRulesEntries] = useState(10);

  const [formSearch, setFormSearch] = useState("");
  const [formEntries, setFormEntries] = useState(14);

  const filteredRules = RULES_DATA.filter((item) =>
    item.title.toLowerCase().includes(rulesSearch.toLowerCase())
  ).slice(0, rulesEntries);

  const filteredForms = FORMS_DATA.filter((item) =>
    item.title.toLowerCase().includes(formSearch.toLowerCase())
  ).slice(0, formEntries);

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#231A14] flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#FFF6EC] to-[#FDFBF9] border-b border-[#F3D1BD]/40 py-16 px-6">
          <div className="max-w-6xl mx-auto text-center space-y-3">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#EE6B28]/10 text-[#EE6B28] text-xs font-bold tracking-widest uppercase">
              ICA Center
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#EE6B28] tracking-tight">
              Rules & Forms
            </h1>
            <p className="text-sm md:text-base text-[#7A6E65] max-w-xl mx-auto font-normal leading-relaxed">
              Unduh regulasi resmi, berkas keorganisasian, serta formulir administrasi Indonesian Cat Association.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 space-y-16">
          
          {/* SECTION 1: RULES */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-black text-[#EE6B28] tracking-tight">
                Rules & Regulation
              </h2>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs md:text-sm text-[#7A6E65]">
              <div className="flex items-center gap-2">
                <span>Tampilkan</span>
                <select
                  value={rulesEntries}
                  onChange={(e) => setRulesEntries(Number(e.target.value))}
                  className="bg-white border border-[#E9E2DC] rounded-lg px-3 py-1.5 text-[#231A14] font-medium focus:outline-none focus:ring-2 focus:ring-[#EE6B28]/20 focus:border-[#EE6B28] transition"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
                <span>entri</span>
              </div>

              {/* Search Bar with Icon */}
              <div className="relative w-full sm:w-64">
                <svg
                  className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A89F95]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari rules..."
                  value={rulesSearch}
                  onChange={(e) => setRulesSearch(e.target.value)}
                  className="w-full bg-white border border-[#E9E2DC] rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm text-[#231A14] placeholder-[#A89F95] focus:outline-none focus:ring-2 focus:ring-[#EE6B28]/20 focus:border-[#EE6B28] transition"
                />
              </div>
            </div>

            {/* Elegant Rules Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#E9E2DC]/80 shadow-xs bg-white">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#FAF4F0] border-b border-[#E9E2DC] text-[#7A6E65] text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6 text-center w-16">NO</th>
                    <th className="py-4 px-6">JENIS RULES</th>
                    <th className="py-4 px-6 text-center w-36">REVISI</th>
                    <th className="py-4 px-6 text-center w-48">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4EFEA] text-xs md:text-sm">
                  {filteredRules.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-10 text-[#A89F95]">
                        Data rules tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredRules.map((rule, index) => (
                      <tr
                        key={rule.id}
                        className="hover:bg-[#FFF9F5] transition-colors duration-150"
                      >
                        <td className="py-4 px-6 text-center font-semibold text-[#A89F95]">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 font-bold text-[#231A14]">
                          {rule.title}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F5EFEA] text-[#7A6E65]">
                            {rule.revision}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Link
                            href={rule.fileUrl}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#EE6B28] bg-[#FFF0E6] hover:bg-[#EE6B28] hover:text-white transition-all duration-200"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            {rule.linkText}
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6E65] px-1">
              <p>
                Menampilkan <span className="font-semibold text-[#231A14]">1</span> sampai <span className="font-semibold text-[#231A14]">{filteredRules.length}</span> dari <span className="font-semibold text-[#231A14]">{RULES_DATA.length}</span> entri
              </p>
              <div className="flex items-center gap-1.5">
                <button disabled className="px-3 py-1.5 rounded-lg border border-[#E9E2DC] bg-white text-[#A89F95] cursor-not-allowed opacity-60">&lt;</button>
                <button className="px-3.5 py-1.5 rounded-lg bg-[#EE6B28] text-white font-bold shadow-xs">1</button>
                <button disabled className="px-3 py-1.5 rounded-lg border border-[#E9E2DC] bg-white text-[#A89F95] cursor-not-allowed opacity-60">&gt;</button>
              </div>
            </div>
          </section>

          {/* SECTION 2: FORM */}
          <section className="space-y-6 pt-6 border-t border-[#E9E2DC]/60">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-black text-[#EE6B28] tracking-tight">
                Formulir Administrasi
              </h2>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs md:text-sm text-[#7A6E65]">
              <div className="flex items-center gap-2">
                <span>Tampilkan</span>
                <select
                  value={formEntries}
                  onChange={(e) => setFormEntries(Number(e.target.value))}
                  className="bg-white border border-[#E9E2DC] rounded-lg px-3 py-1.5 text-[#231A14] font-medium focus:outline-none focus:ring-2 focus:ring-[#EE6B28]/20 focus:border-[#EE6B28] transition"
                >
                  <option value={10}>10</option>
                  <option value={14}>14</option>
                  <option value={25}>25</option>
                </select>
                <span>entri</span>
              </div>

              {/* Search Bar with Icon */}
              <div className="relative w-full sm:w-64">
                <svg
                  className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A89F95]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari formulir..."
                  value={formSearch}
                  onChange={(e) => setFormSearch(e.target.value)}
                  className="w-full bg-white border border-[#E9E2DC] rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm text-[#231A14] placeholder-[#A89F95] focus:outline-none focus:ring-2 focus:ring-[#EE6B28]/20 focus:border-[#EE6B28] transition"
                />
              </div>
            </div>

            {/* Elegant Form Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#E9E2DC]/80 shadow-xs bg-white">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#FAF4F0] border-b border-[#E9E2DC] text-[#7A6E65] text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6 text-center w-16">NO</th>
                    <th className="py-4 px-6">JENIS FORMULIR</th>
                    <th className="py-4 px-6 text-center w-36">REVISI</th>
                    <th className="py-4 px-6 text-center w-48">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4EFEA] text-xs md:text-sm">
                  {filteredForms.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-10 text-[#A89F95]">
                        Data formulir tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredForms.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-[#FFF9F5] transition-colors duration-150"
                      >
                        <td className="py-4 px-6 text-center font-semibold text-[#A89F95]">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 font-bold text-[#231A14]">
                          {item.title}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F5EFEA] text-[#7A6E65]">
                            {item.revision}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Link
                            href={item.fileUrl}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#EE6B28] bg-[#FFF0E6] hover:bg-[#EE6B28] hover:text-white transition-all duration-200"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            {item.linkText}
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6E65] px-1">
              <p>
                Menampilkan <span className="font-semibold text-[#231A14]">1</span> sampai <span className="font-semibold text-[#231A14]">{filteredForms.length}</span> dari <span className="font-semibold text-[#231A14]">{FORMS_DATA.length}</span> entri
              </p>
              <div className="flex items-center gap-1.5">
                <button disabled className="px-3 py-1.5 rounded-lg border border-[#E9E2DC] bg-white text-[#A89F95] cursor-not-allowed opacity-60">&lt;</button>
                <button className="px-3.5 py-1.5 rounded-lg bg-[#EE6B28] text-white font-bold shadow-xs">1</button>
                <button disabled className="px-3 py-1.5 rounded-lg border border-[#E9E2DC] bg-white text-[#A89F95] cursor-not-allowed opacity-60">&gt;</button>
              </div>
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}