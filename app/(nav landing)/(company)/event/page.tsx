"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/app/landing-page/components/Navbar";
import Footer from "@/app/landing-page/components/Footer";

// Data Kalender Kegiatan 2026
const EVENT_DATA = [
  { id: 1, date: "31 Jan - 1 Feb 2026", branch: "SURABAYA", title: "The 286th-287th ICS", status: "TERLAKSANA", isHighlight: false, href: "/anggota/event" },
  { id: 2, date: "1 Feb 2026", branch: "PEKANBARU", title: "PCS", status: "TERLAKSANA", isHighlight: false, href: "/anggota/event" },
  { id: 3, date: "7 - 8 Feb 2026", branch: "TANGERANG", title: "The 288th-289th ICS", status: "TERLAKSANA", isHighlight: false, href: "/anggota/event" },
  { id: 4, date: "18 Feb - 29 Mar 2026", branch: "-", title: "Estimasi Puasa dan Libur Lebaran", status: "AGENDA KHUSUS", isHighlight: true, href: "/anggota/event" },
  { id: 5, date: "25 - 26 Apr 2026", branch: "PALEMBANG", title: "The 290th-291st ICS", status: "TERLAKSANA", isHighlight: false, href: "/anggota/event" },
  { id: 6, date: "03 Mei 2026", branch: "TANGERANG", title: "PCS", status: "TERLAKSANA", isHighlight: false, href: "/anggota/event" },
  { id: 7, date: "02 - 03 Mei 2026", branch: "YOGYAKARTA", title: "The 292nd-293rd ICS", status: "TERLAKSANA", isHighlight: false, href: "/anggota/event" },
  { id: 8, date: "16 Mei 2026", branch: "SAMARINDA", title: "PCS", status: "TERLAKSANA", isHighlight: false, href: "/anggota/event" },
  { id: 9, date: "16 - 17 Mei 2026", branch: "TANGERANG", title: "Diklat Dasar Cattery", status: "TERLAKSANA", isHighlight: false, href: "/anggota/event" },
  { id: 10, date: "27 Mei 2026", branch: "-", title: "Estimasi Libur Lebaran Idul Adha", status: "AGENDA KHUSUS", isHighlight: true, href: "/anggota/event" },
  { id: 11, date: "28 - 31 Mei 2026", branch: "-", title: "GA FIFE 26", status: "AGENDA KHUSUS", isHighlight: true, href: "/anggota/event" },
  { id: 12, date: "31 Mei 2026", branch: "SURABAYA", title: "PCS", status: "TERLAKSANA", isHighlight: false, href: "/anggota/event" },
  { id: 13, date: "27 - 28 Jun 2026", branch: "PEKANBARU", title: "The 294th-295th ICS", status: "TERLAKSANA", isHighlight: false, href: "/anggota/event" },
  { id: 14, date: "04 - 05 Jul 2026", branch: "CIREBON", title: "The 296th-297th ICS", status: "TERLAKSANA", isHighlight: false, href: "/anggota/event" },
  { id: 15, date: "01 - 02 Agt 2026", branch: "China Cat Union (CCU) - Bangkok", title: "Two 1 day, 2 cert. show (IW)", status: "MENDATANG", isHighlight: false, href: "/anggota/event" },
  { id: 16, date: "02 Agt 2026", branch: "JOGJA", title: "PCS", status: "MENDATANG", isHighlight: false, href: "/anggota/event" },
];

export default function EventPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [entries, setEntries] = useState(10);

  const filteredEvents = EVENT_DATA.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, entries);

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#231A14] flex flex-col justify-between font-sans">
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#FFF6EC] to-[#FDFBF9] border-b border-[#F3D1BD]/40 py-10 md:py-14 px-4 md:px-6">
          <div className="max-w-6xl mx-auto text-center space-y-3">
            <span className="inline-block px-4 py-1 rounded-full bg-[#EE6B28]/10 text-[#EE6B28] text-xs font-bold tracking-widest uppercase">
              ICA Partners
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#EE6B28] tracking-tight">
              Event
            </h1>
            <p className="text-sm md:text-base text-[#7A6E65] max-w-xl mx-auto leading-relaxed">
              Jadwal pameran kucing (ICS/PCS), diklat cattery, dan agenda resmi Indonesian Cat Association.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 space-y-6">
          <div className="text-center">
            <h2 className="text-xl md:text-3xl font-black text-[#EE6B28] tracking-tight">
              Kalender Kegiatan Periode Januari 2026 - Desember 2026
            </h2>
            <div className="w-32 h-1 bg-[#EE6B28]/30 mx-auto mt-2 rounded-full" />
          </div>

          {/* Table Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs md:text-sm text-[#7A6E65]">
            <div className="flex items-center gap-2">
              <span>Tampilkan</span>
              <select
                value={entries}
                onChange={(e) => setEntries(Number(e.target.value))}
                className="bg-white border border-[#E9E2DC] rounded-lg px-3 py-1.5 text-[#231A14] font-medium focus:outline-none focus:ring-2 focus:ring-[#EE6B28]/20 focus:border-[#EE6B28] transition"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <span>entri</span>
            </div>

            <div className="relative w-full sm:w-72">
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
                placeholder="Cari event, cabang, atau tanggal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E9E2DC] rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm text-[#231A14] placeholder-[#A89F95] focus:outline-none focus:ring-2 focus:ring-[#EE6B28]/20 focus:border-[#EE6B28] transition"
              />
            </div>
          </div>

          {/* Main Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#E9E2DC]/80 shadow-xs bg-white">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-[#EE6B28] text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6 w-52">Tanggal</th>
                  <th className="py-3.5 px-6 w-48">Cabang</th>
                  <th className="py-3.5 px-6">Event</th>
                  <th className="py-3.5 px-6 text-center w-40">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4EFEA] text-xs md:text-sm">
                {filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-[#A89F95]">
                      Data kegiatan tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((item) => (
                    <tr
                      key={item.id}
                      className={`cursor-pointer transition-colors duration-150 ${
                        item.isHighlight ? "bg-[#FFF2F2] hover:bg-[#FFE8E8]" : "hover:bg-[#FFF9F5]"
                      }`}
                    >
                      <td className={`py-4 px-6 font-semibold ${item.isHighlight ? "text-[#DC2626]" : "text-[#4A3E3D]"}`}>
                        <Link href="/anggota/event" className="block w-full h-full">
                          {item.date}
                        </Link>
                      </td>
                      <td className={`py-4 px-6 font-bold ${item.isHighlight ? "text-[#DC2626]" : "text-[#231A14]"}`}>
                        <Link href="/anggota/event" className="block w-full h-full">
                          {item.branch}
                        </Link>
                      </td>
                      <td className={`py-4 px-6 ${item.isHighlight ? "text-[#DC2626] font-bold" : "text-[#231A14] font-medium"}`}>
                        <Link href="/anggota/event" className="block w-full h-full hover:underline hover:text-[#EE6B28]">
                          {item.title}
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Link href="/anggota/event" className="block w-full h-full">
                          {item.isHighlight ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626]">
                              AGENDA KHUSUS
                            </span>
                          ) : item.status === "TERLAKSANA" ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E6F4EA] text-[#137333]">
                              TERLAKSANA
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#D97706]">
                              MENDATANG
                            </span>
                          )}
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Info */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6E65] px-1">
            <p>
              Menampilkan <span className="font-semibold text-[#231A14]">1</span> sampai <span className="font-semibold text-[#231A14]">{filteredEvents.length}</span> dari <span className="font-semibold text-[#231A14]">{EVENT_DATA.length}</span> entri
            </p>
            <div className="flex items-center gap-1.5">
              <button disabled className="px-3 py-1.5 rounded-lg border border-[#E9E2DC] bg-white text-[#A89F95] cursor-not-allowed opacity-60">&lt;</button>
              <button className="px-3.5 py-1.5 rounded-lg bg-[#EE6B28] text-white font-bold shadow-xs">1</button>
              <button disabled className="px-3 py-1.5 rounded-lg border border-[#E9E2DC] bg-white text-[#A89F95] cursor-not-allowed opacity-60">&gt;</button>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}