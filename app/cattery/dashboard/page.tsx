"use client";

import React from "react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2d2825] p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Section 1: Cattery Main Info Banner */}
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#eedfd5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#fff6ed] border border-[#fce3cf] flex items-center justify-center shrink-0">
              <svg className="w-7 h-7 text-[#f05a1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1a1513]">
                  Rumah Hana Cattery
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaf8f0] text-[#1b804d] text-xs font-semibold">
                  Aktif
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f4efe9] text-[#6b5f54] text-xs font-medium">
                  Bandung
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#7e7267]">
                Reg. ICA-CTY-2024-0188 · masa berlaku sampai 31 Des 2026
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between md:justify-end gap-4 sm:gap-8 border-t md:border-t-0 border-[#f3eae1] pt-4 md:pt-0">
            <div className="flex items-center justify-around md:justify-end gap-6 sm:gap-8">
              <div className="text-center md:text-left">
                <span className="block text-xs text-[#8c8074] font-medium">Male</span>
                <span className="text-xl sm:text-2xl font-black text-[#1a1513]">4</span>
              </div>
              <div className="text-center md:text-left">
                <span className="block text-xs text-[#8c8074] font-medium">Female</span>
                <span className="text-xl sm:text-2xl font-black text-[#1a1513]">7</span>
              </div>
              <div className="text-center md:text-left">
                <span className="block text-xs text-[#8c8074] font-medium">Offspring</span>
                <span className="text-xl sm:text-2xl font-black text-[#1a1513]">12</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Quick Links (3 Grid Cards) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="#" className="bg-white rounded-2xl p-4 border border-[#eedfd5] shadow-xs flex items-center justify-between hover:border-[#f05a1b]/40 transition group">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#fff5ec] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#f05a1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1a1513] group-hover:text-[#f05a1b] transition">Profil Cattery</h3>
                <p className="text-xs text-[#8c8074]">Data, alamat, kontak & foto</p>
              </div>
            </div>
            <svg className="w-4 h-4 text-[#a89c91] group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a href="#" className="bg-white rounded-2xl p-4 border border-[#eedfd5] shadow-xs flex items-center justify-between hover:border-[#f05a1b]/40 transition group">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#fff5ec] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#f05a1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1a1513] group-hover:text-[#f05a1b] transition">Documents</h3>
                <p className="text-xs text-[#8c8074]">Sertifikat & berkas pengajuan</p>
              </div>
            </div>
            <svg className="w-4 h-4 text-[#a89c91] group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a href="#" className="bg-white rounded-2xl p-4 border border-[#eedfd5] shadow-xs flex items-center justify-between hover:border-[#f05a1b]/40 transition group">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#fff5ec] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#f05a1b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5c-3.866 0-7 2.239-7 5 0 1.933 1.523 3.616 3.82 4.414-.148.868-.535 2.126-1.82 3.086 2.383 0 4.138-1.258 5-2.5 1 .833 2.5 1 3.5 1 3.866 0 7-2.239 7-5s-3.134-5-7-5z" />
                  <circle cx="9" cy="9.5" r="1" fill="currentColor" />
                  <circle cx="15" cy="9.5" r="1" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1a1513] group-hover:text-[#f05a1b] transition">My Cats</h3>
                <p className="text-xs text-[#8c8074]">11 kucing terdaftar</p>
              </div>
            </div>
            <svg className="w-4 h-4 text-[#a89c91] group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </section>

        {/* Section 3: Progres Pengajuan Terakhir */}
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#eedfd5] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#1a1513]">Progres pengajuan terakhir</h2>
              <p className="text-xs sm:text-sm text-[#8c8074]">
                MR-2026-0142 · Bagas × Nara · dikirim 21 Agu 2026
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#ebf3fa] text-[#2b71b1] text-xs font-semibold">
                Sedang direview
              </span>
              <button className="px-4 py-2 rounded-full border border-[#eedfd5] text-xs font-semibold text-[#544940] hover:bg-[#fff7f2] hover:border-[#f05a1b]/40 hover:text-[#f05a1b] transition shrink-0">
                Semua pengajuan
              </button>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="py-4">
            <div className="relative flex items-center justify-between w-full max-w-4xl mx-auto">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#eadecd] -translate-y-1/2 z-0" />
              <div className="absolute top-1/2 left-0 w-1/3 h-1 bg-[#f05a1b] -translate-y-1/2 z-0" />

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-7 h-7 rounded-full bg-[#f05a1b] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  ✓
                </div>
                <span className="text-xs font-medium text-[#1a1513]">Dikirim</span>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-7 h-7 rounded-full border-2 border-[#f05a1b] bg-white flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#f05a1b]" />
                </div>
                <span className="text-xs font-bold text-[#1a1513]">Review admin</span>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-7 h-7 rounded-full border-2 border-[#dcd1c4] bg-white" />
                <span className="text-xs font-medium text-[#8c8074]">Verifikasi dokumen</span>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-7 h-7 rounded-full border-2 border-[#dcd1c4] bg-white" />
                <span className="text-xs font-medium text-[#8c8074]">Disetujui</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#a09488]">
            Timeline status bersifat informasi (read-only) — perubahan status dilakukan oleh admin ICA.
          </p>
        </section>

        {/* Section 4: Stat Indicator Cards (4 Grid Cards) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-5 border border-[#eedfd5] shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#f05a1b]" />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#8c8074] tracking-wider uppercase">Menunggu Review</span>
                <div className="w-8 h-8 rounded-full bg-[#fff4eb] flex items-center justify-center text-[#f05a1b]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <span className="text-3xl font-black text-[#1a1513] mt-2 block">3</span>
              <p className="text-xs text-[#8c8074] mt-1">Terlama: 6 hari di antrean</p>
            </div>
            <div className="w-full bg-[#f4efe9] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#f05a1b] h-full w-1/3 rounded-full" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-5 border border-[#eedfd5] shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#22a559]" />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#8c8074] tracking-wider uppercase">Disetujui</span>
                <div className="w-8 h-8 rounded-full bg-[#eaf8f0] flex items-center justify-center text-[#22a559]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-3xl font-black text-[#1a1513] mt-2 block">14</span>
              <p className="text-xs text-[#8c8074] mt-1">Total sepanjang 2026</p>
            </div>
            <div className="w-full bg-[#f4efe9] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#22a559] h-full w-4/5 rounded-full" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-5 border border-[#eedfd5] shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#f05a1b]" />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#8c8074] tracking-wider uppercase">Perlu Revisi</span>
                <div className="w-8 h-8 rounded-full bg-[#fff4eb] flex items-center justify-center text-[#f05a1b]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </div>
              <span className="text-3xl font-black text-[#1a1513] mt-2 block">1</span>
              <p className="text-xs text-[#d94a11] font-semibold mt-1">Butuh tindakan Anda</p>
            </div>
            <div className="w-full bg-[#f4efe9] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#f05a1b] h-full w-1/4 rounded-full" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-5 border border-[#eedfd5] shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#8c8074]" />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#8c8074] tracking-wider uppercase">Draft Belum Dikirim</span>
                <div className="w-8 h-8 rounded-full bg-[#f4efe9] flex items-center justify-center text-[#8c8074]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <span className="text-3xl font-black text-[#1a1513] mt-2 block">2</span>
              <a href="#" className="text-xs text-[#8c8074] hover:text-[#f05a1b] font-medium mt-1 inline-block transition">
                Lihat draft tersimpan →
              </a>
            </div>
            <div className="w-full bg-[#f4efe9] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#8c8074] h-full w-1/2 rounded-full" />
            </div>
          </div>
        </section>

        {/* Section 5: Bottom Two Columns */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Draft Tersimpan */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#eedfd5] shadow-xs overflow-hidden flex flex-col justify-between">
            <div className="p-5 sm:p-6 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#1a1513]">Draft tersimpan</h2>
                  <p className="text-xs sm:text-sm text-[#8c8074]">
                    Mating report yang belum selesai diisi — lanjutkan dari langkah terakhir.
                  </p>
                </div>
                {/* Secondary CTA updated with exact button styling */}
                <button className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] shrink-0">
                  + Draft baru
                </button>
              </div>

              <div className="space-y-5 divide-y divide-[#f4efe9]">
                {/* Draft Item 1 */}
                <div className="pt-2 first:pt-0 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm text-[#1a1513]">
                          MR-2026-0147 · Rimba × Kirana
                        </h3>
                        <span className="px-2 py-0.5 rounded-md bg-[#f4efe9] text-[#786c60] text-[11px] font-semibold">
                          Draft
                        </span>
                      </div>
                      <p className="text-xs text-[#8c8074] mt-1">
                        Terhenti di: Step 4 — Mating Information · tersimpan hari ini 14:32
                      </p>
                    </div>

                    <button className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] shrink-0">
                      Lanjutkan
                    </button>
                  </div>

                  {/* Progress Line */}
                  <div className="space-y-1">
                    <div className="w-full bg-[#f4efe9] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#f05a1b] h-full w-[57%]" />
                    </div>
                    <span className="text-[11px] font-medium text-[#8c8074]">57% lengkap</span>
                  </div>

                  <p className="text-xs text-[#d94a11] bg-[#fff6f0] p-2.5 rounded-xl border border-[#fce3d2]">
                    <span className="font-semibold">Belum terisi:</span> Estimasi tanggal lahir, Data offspring, Upload dokumen, Konfirmasi
                  </p>
                </div>

                {/* Draft Item 2 */}
                <div className="pt-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm text-[#1a1513]">
                          MR-2026-0146 · Bagas × Sekar
                        </h3>
                        <span className="px-2 py-0.5 rounded-md bg-[#f4efe9] text-[#786c60] text-[11px] font-semibold">
                          Draft
                        </span>
                      </div>
                      <p className="text-xs text-[#8c8074] mt-1">
                        Terhenti di: Step 2 — Pilih Male · tersimpan 26 Agu 2026 09:10
                      </p>
                    </div>

                    <button className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] shrink-0">
                      Lanjutkan
                    </button>
                  </div>

                  {/* Progress Line */}
                  <div className="space-y-1">
                    <div className="w-full bg-[#f4efe9] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#f05a1b] h-full w-[29%]" />
                    </div>
                    <span className="text-[11px] font-medium text-[#8c8074]">29% lengkap</span>
                  </div>

                  <p className="text-xs text-[#d94a11] bg-[#fff6f0] p-2.5 rounded-xl border border-[#fce3d2]">
                    <span className="font-semibold">Belum terisi:</span> Pilih female, Mating information, Data offspring, Upload dokumen, Konfirmasi
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Top 5 Kucing - Skor Kesehatan */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#eedfd5] shadow-xs p-5 sm:p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-base font-bold text-[#1a1513]">
                    Top 5 kucing — skor kesehatan
                  </h2>
                  <p className="text-xs text-[#8c8074] mt-1">
                    Hanya kucing milik cattery ini. Skor diisi Admin ICA — tampil read-only di sisi cattery.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#fff4e5] text-[#c26d0a] text-[10px] font-bold shrink-0">
                  Pending konfirmasi PO
                </span>
              </div>

              {/* Cat List */}
              <div className="space-y-3">
                {/* Cat 1 */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#faf6f0]/60 hover:bg-[#faf6f0] transition">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#fff4eb] text-[#f05a1b] font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-[#f4efe9] flex items-center justify-center text-[#8c8074] shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5c-3.866 0-7 2.239-7 5 0 1.933 1.523 3.616 3.82 4.414-.148.868-.535 2.126-1.82 3.086 2.383 0 4.138-1.258 5-2.5 1 .833 2.5 1 3.5 1 3.866 0 7-2.239 7-5s-3.134-5-7-5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-[#1a1513]">Bagas of Rumah Hana</h3>
                      <p className="text-[11px] text-[#8c8074]">Persian · PER n 22</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-base text-[#f05a1b]">94</span>
                    <span className="block text-[10px] text-[#a09488]">skor</span>
                  </div>
                </div>

                {/* Cat 2 */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#faf6f0]/60 hover:bg-[#faf6f0] transition">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#fff4eb] text-[#f05a1b] font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-[#f4efe9] flex items-center justify-center text-[#8c8074] shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5c-3.866 0-7 2.239-7 5 0 1.933 1.523 3.616 3.82 4.414-.148.868-.535 2.126-1.82 3.086 2.383 0 4.138-1.258 5-2.5 1 .833 2.5 1 3.5 1 3.866 0 7-2.239 7-5s-3.134-5-7-5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-[#1a1513]">Kirana of Rumah Hana</h3>
                      <p className="text-[11px] text-[#8c8074]">Persian · PER f 22</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-base text-[#f05a1b]">91</span>
                    <span className="block text-[10px] text-[#a09488]">skor</span>
                  </div>
                </div>

                {/* Cat 3 */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#faf6f0]/60 hover:bg-[#faf6f0] transition">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#fff4eb] text-[#f05a1b] font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-[#f4efe9] flex items-center justify-center text-[#8c8074] shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5c-3.866 0-7 2.239-7 5 0 1.933 1.523 3.616 3.82 4.414-.148.868-.535 2.126-1.82 3.086 2.383 0 4.138-1.258 5-2.5 1 .833 2.5 1 3.5 1 3.866 0 7-2.239 7-5s-3.134-5-7-5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-[#1a1513]">Nara Kencana</h3>
                      <p className="text-[11px] text-[#8c8074]">Exotic Shorthair · EXO d 03</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-base text-[#f05a1b]">88</span>
                    <span className="block text-[10px] text-[#a09488]">skor</span>
                  </div>
                </div>

                {/* Cat 4 */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#faf6f0]/60 hover:bg-[#faf6f0] transition">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#f4efe9] text-[#8c8074] font-bold text-xs flex items-center justify-center shrink-0">
                      4
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-[#f4efe9] flex items-center justify-center text-[#8c8074] shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5c-3.866 0-7 2.239-7 5 0 1.933 1.523 3.616 3.82 4.414-.148.868-.535 2.126-1.82 3.086 2.383 0 4.138-1.258 5-2.5 1 .833 2.5 1 3.5 1 3.866 0 7-2.239 7-5s-3.134-5-7-5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-[#1a1513]">Rimba of Rumah Hana</h3>
                      <p className="text-[11px] text-[#8c8074]">Persian · PER a 21</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-base text-[#f05a1b]">84</span>
                    <span className="block text-[10px] text-[#a09488]">skor</span>
                  </div>
                </div>

                {/* Cat 5 */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#faf6f0]/60 hover:bg-[#faf6f0] transition">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#f4efe9] text-[#8c8074] font-bold text-xs flex items-center justify-center shrink-0">
                      5
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-[#f4efe9] flex items-center justify-center text-[#8c8074] shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5c-3.866 0-7 2.239-7 5 0 1.933 1.523 3.616 3.82 4.414-.148.868-.535 2.126-1.82 3.086 2.383 0 4.138-1.258 5-2.5 1 .833 2.5 1 3.5 1 3.866 0 7-2.239 7-5s-3.134-5-7-5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-[#1a1513]">Sekar Ayu</h3>
                      <p className="text-[11px] text-[#8c8074]">Exotic Shorthair · EXO n 24</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-base text-[#f05a1b]">80</span>
                    <span className="block text-[10px] text-[#a09488]">skor</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#f4efe9] pt-3 text-xs text-[#8c8074]">
              <span>Read-only · tidak ada aksi edit skor di sisi cattery.</span>
              <a href="#" className="font-bold text-[#f05a1b] hover:underline">
                Leaderboard →
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}