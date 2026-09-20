"use client";

import { useState } from "react";
import BannerConfigModal from "./BannerModal";

export default function LeaderboardBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white border border-[#EFE9E1] rounded-2xl p-6 shadow-sm space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#231A14]">
              Banner leaderboard kucing
            </h2>
            <p className="text-xs text-[#8C8078] mt-1">
              Banner juara yang tampil di halaman News dan di beranda Member Portal. Foto dan pemenangnya diatur di sini, bukan lewat antrean moderasi.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 shrink-0 cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)] active:translate-y-0 active:shadow-xs"
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Atur banner</span>
          </button>
        </div>

        {/* Grid 2 Kolom (Kiri & Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Kolom Kiri: Main Banner Card */}
          <div className="lg:col-span-7 border border-[#EFE9E1] rounded-2xl p-4 bg-white flex flex-col justify-between">
            <div className="w-full h-56 bg-[#F5F2ED] border border-dashed border-[#D0C5BC] rounded-xl flex flex-col items-center justify-center text-[#8C8078] gap-2">
              <svg
                className="w-8 h-8 text-[#A0948C]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="text-xs font-medium text-[#7A6E65]">
                Foto kucing juara · 1600×900
              </span>
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Aktif
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] text-[#5C5046] text-[11px] font-medium border border-[#EFE9E1]">
                  🏆 ICA Cat Show Bandung 2026
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#231A14]">
                Juara ICA Cat Show Bandung 2026
              </h3>
              <p className="text-xs text-[#8C8078]">
                18–19 Okt 2026 · skor final dari judging report
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Juara Lain & Callout Box */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <span className="text-[11px] font-bold tracking-wider text-[#7A6E65] uppercase block">
                JUARA LAIN DI BANNER
              </span>

              {/* Card #1 */}
              <div className="flex items-center justify-between p-3.5 bg-white border border-[#EFE9E1] rounded-2xl">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF3EB] border border-[#FFE3D1] flex items-center justify-center text-[#EE6B28] font-bold text-sm shrink-0">
                    #1
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-[#231A14] truncate">
                      Aksa · Maine Coon
                    </div>
                    <div className="text-[11px] text-[#8C8078] truncate">
                      Rumah Hana Cattery
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 shrink-0">
                  97 pts
                </span>
              </div>

              {/* Card #2 */}
              <div className="flex items-center justify-between p-3.5 bg-white border border-[#EFE9E1] rounded-2xl">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF3EB] border border-[#FFE3D1] flex items-center justify-center text-[#EE6B28] font-bold text-sm shrink-0">
                    #2
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-[#231A14] truncate">
                      Nara · Maine Coon
                    </div>
                    <div className="text-[11px] text-[#8C8078] truncate">
                      Hana Maheswari · ICA-2024-0871
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 shrink-0">
                  95 pts
                </span>
              </div>

              {/* Card #3 */}
              <div className="flex items-center justify-between p-3.5 bg-white border border-[#EFE9E1] rounded-2xl">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF3EB] border border-[#FFE3D1] flex items-center justify-center text-[#EE6B28] font-bold text-sm shrink-0">
                    #3
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-[#231A14] truncate">
                      Dena · Persian
                    </div>
                    <div className="text-[11px] text-[#8C8078] truncate">
                      Bandung Paws Cattery
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 shrink-0">
                  93 pts
                </span>
              </div>
            </div>

            {/* Info Callout di kanan bawah */}
            <div className="bg-[#FAF8F5] border border-[#EFE9E1] rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-[#5C5046]">
              <svg
                className="w-4 h-4 text-[#7A6E65] shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <p className="leading-relaxed">
                Banner memakai skor final dari judging report event yang dipilih. Ganti event untuk menampilkan juara periode lain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Config Banner */}
      <BannerConfigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}