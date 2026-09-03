"use client";

import { useState } from "react";
import Navbar from "@/app/landing-page/components/Navbar";
import Footer from "@/app/landing-page/components/Footer";

// Data Kalender Kegiatan Graphic Flyers
const CALENDAR_POSTERS = [
  { id: 1, title: "Jadwal Februari 2022", month: "Februari 2022" },
  { id: 2, title: "Jadwal Maret 2022", month: "Maret 2022" },
  { id: 3, title: "Jadwal April 2022", month: "April 2022" },
  { id: 4, title: "Jadwal Mei 2022", month: "Mei 2022" },
];

export default function GaleriPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#231A14] flex flex-col justify-between font-sans">
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#FFF6EC] to-[#FDFBF9] border-b border-[#F3D1BD]/40 py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto text-center space-y-3">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#EE6B28]/10 text-[#EE6B28] text-xs font-bold tracking-widest uppercase">
              Dokumentasi & Arsip
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              <span className="text-[#231A14]">Galeri </span>
              <span className="text-[#EE6B28]">Kegiatan ICA</span>
            </h1>
            <p className="text-sm md:text-base text-[#7A6E65] max-w-xl mx-auto leading-relaxed">
              Dokumentasi foto edukasi, seminar, gathering member, dan pengumuman resmi Indonesian Cat Association.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 space-y-16">

          {/* SECTION 1: Kalender Kegiatan 2022 - 2023 */}
          <section className="space-y-6">
            <div className="text-center md:text-left border-b border-[#E9E2DC]/80 pb-4">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                <span className="text-[#231A14]">Kalender Kegiatan </span>
                <span className="text-[#EE6B28]">ICA Periode 2022 - 2023</span>
              </h2>
              <p className="text-xs md:text-sm text-[#7A6E65] mt-1">
                Flyer dan poster publikasi jadwal kegiatan cabang ICA.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CALENDAR_POSTERS.map((poster) => (
                <div
                  key={poster.id}
                  className="group relative rounded-2xl border border-[#E9E2DC] bg-white p-3 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-[#FAF4F0] rounded-xl flex flex-col items-center justify-center p-4 text-center border border-[#F4EFEA] group-hover:bg-[#FFF5ED] transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#EE6B28]/10 text-[#EE6B28] flex items-center justify-center mb-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-[#EE6B28]">{poster.month}</span>
                    <span className="text-[11px] text-[#A89F95] mt-1">Poster Kegiatan</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2: Ketentuan NW */}
          <section className="space-y-6">
            <div className="text-center md:text-left border-b border-[#E9E2DC]/80 pb-4">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                <span className="text-[#231A14]">Ketentuan Mendapatkan Gelar/Title </span>
                <span className="text-[#EE6B28]">&quot;National Winner (NW)&quot;</span>
              </h2>
              <p className="text-xs md:text-sm text-[#7A6E65] mt-1">
                Petunjuk teknis dan syarat perolehan poin gelar kehormatan National Winner ICA.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-[#E9E2DC] p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-3 border-b border-[#F4EFEA] pb-3">
                  <span className="w-8 h-8 rounded-lg bg-[#EE6B28] text-white font-bold flex items-center justify-center text-xs">
                    01
                  </span>
                  <h3 className="font-bold text-[#231A14] text-sm md:text-base">
                    Persyaratan & Poin Kebijakan
                  </h3>
                </div>
                <div className="space-y-2 text-xs text-[#7A6E65] leading-relaxed">
                  <p>• Poin diberikan kepada kucing yang terdaftar di Federation Internationale Feline (FIFe) dan ICA.</p>
                  <p>• Maksimal 15 ekor kucing yang berhak menyandang gelar National Winner per tahun kalender show.</p>
                  <p>• Untuk mendapatkan gelar ini, ekor kucing harus mengumpulkan nilai minimum 500 poin.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E9E2DC] p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-3 border-b border-[#F4EFEA] pb-3">
                  <span className="w-8 h-8 rounded-lg bg-[#EE6B28] text-white font-bold flex items-center justify-center text-xs">
                    02
                  </span>
                  <h3 className="font-bold text-[#231A14] text-sm md:text-base">
                    Tabel Kualifikasi Gelar Kucing
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#FAF4F0] text-[#7A6E65] font-bold">
                        <th className="p-2.5 rounded-l-lg">POSISI / CERTIFICATE</th>
                        <th className="p-2.5 text-center rounded-r-lg">NILAI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4EFEA] text-[#231A14]">
                      <tr>
                        <td className="p-2.5 font-medium">Best in Variety (BIV)</td>
                        <td className="p-2.5 text-center font-bold text-[#EE6B28]">80</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium">Nomination Best in Show (NOM)</td>
                        <td className="p-2.5 text-center font-bold text-[#EE6B28]">90</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium">Best in Show (BIS)</td>
                        <td className="p-2.5 text-center font-bold text-[#EE6B28]">100</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: Galeri Photo Albums */}
          <section className="space-y-12">

            {/* Event Album 1 */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E9E2DC]/80 pb-3 gap-1">
                <h3 className="text-lg md:text-xl font-bold">
                  <span className="text-[#EE6B28]">&quot;Aceh Cat Education</span> <span className="text-[#231A14]">by ICA Aceh&quot;</span>
                </h3>
                <span className="text-xs font-semibold text-[#EE6B28] bg-[#FFF0E6] px-3 py-1 rounded-full w-fit">
                  Minggu, 23 Januari 2022
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                  <div
                    key={item}
                    className="group relative rounded-xl overflow-hidden border border-[#E9E2DC] bg-[#FAF4F0] aspect-video flex items-center justify-center hover:shadow-md transition-all duration-200"
                  >
                    <div className="text-center p-3">
                      <svg className="w-8 h-8 mx-auto text-[#A89F95] group-hover:text-[#EE6B28] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span className="text-[11px] text-[#7A6E65] font-medium block mt-1">Foto {item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Album 2 */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E9E2DC]/80 pb-3 gap-1">
                <h3 className="text-lg md:text-xl font-bold">
                  <span className="text-[#EE6B28]">&quot;Gathering Member</span> <span className="text-[#231A14]">by ICA Lampung&quot;</span>
                </h3>
                <span className="text-xs font-semibold text-[#EE6B28] bg-[#FFF0E6] px-3 py-1 rounded-full w-fit">
                  Minggu, 23 Januari 2022
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="group relative rounded-xl overflow-hidden border border-[#E9E2DC] bg-[#FAF4F0] aspect-video flex items-center justify-center hover:shadow-md transition-all duration-200"
                  >
                    <div className="text-center p-3">
                      <svg className="w-8 h-8 mx-auto text-[#A89F95] group-hover:text-[#EE6B28] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span className="text-[11px] text-[#7A6E65] font-medium block mt-1">Foto {item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Album 3 */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E9E2DC]/80 pb-3 gap-1">
                <h3 className="text-lg md:text-xl font-bold">
                  <span className="text-[#EE6B28]">&quot;Seminar Cat Lovers</span> <span className="text-[#231A14]">by ICA Gresik&quot;</span>
                </h3>
                <span className="text-xs font-semibold text-[#EE6B28] bg-[#FFF0E6] px-3 py-1 rounded-full w-fit">
                  Minggu, 30 Januari 2022
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="group relative rounded-xl overflow-hidden border border-[#E9E2DC] bg-[#FAF4F0] aspect-video flex items-center justify-center hover:shadow-md transition-all duration-200"
                  >
                    <div className="text-center p-3">
                      <svg className="w-8 h-8 mx-auto text-[#A89F95] group-hover:text-[#EE6B28] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span className="text-[11px] text-[#7A6E65] font-medium block mt-1">Foto {item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}