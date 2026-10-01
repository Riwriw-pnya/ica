"use client";

import React from "react";

interface StatusKeanggotaanMobileProps {
  onBack?: () => void;
  onPerpanjang?: () => void;
}

export default function StatusKeanggotaanMobile({
  onBack,
  onPerpanjang,
}: StatusKeanggotaanMobileProps) {
  const historyList = [
    {
      id: 1,
      title: "Perpanjangan keanggotaan 2025/2026 disetujui",
      date: "01 Sep 2025",
    },
    {
      id: 2,
      title: "Pembayaran iuran diterima",
      date: "29 Agu 2025",
    },
    {
      id: 3,
      title: "Pendaftaran member baru",
      date: "12 Agu 2024",
    },
  ];

  return (
    <>
      {/* ANIMASI SLIDE IN DARI KANAN */}
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideInFromRight 0.28s cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }
      `}</style>

      {/* OVERLAY WRAPPER UTAMA */}
      <div className="fixed inset-0 z-50 bg-[#F7F4EE] animate-slide-in flex flex-col justify-between">
        {/* AREA KONTEN SCROLLABLE */}
        <div className="w-full max-w-md mx-auto h-full overflow-y-auto font-sans pt-3 pb-36 px-4 space-y-4 text-[#1F1B18]">
          {/* HEADER SECTION */}
          <div className="flex items-center gap-2.5 pt-1 pb-1">
            <button
              type="button"
              onClick={onBack}
              className="p-1 -ml-1 text-[#C85A17] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              aria-label="Kembali"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-base font-bold leading-tight text-[#1F1B18]">
                Status Keanggotaan
              </h1>
              <p className="text-[11px] font-medium text-[#857B72]">
                Masa berlaku dan riwayat
              </p>
            </div>
          </div>

          {/* CARD 1: MASA BERLAKU (Background Cream Oranye Halus) */}
          <div className="bg-[#FFF8F3] rounded-[22px] p-4 border border-[#FCD8C1] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#C85A17] tracking-wider uppercase">
                MASA BERLAKU
              </span>
              <span className="px-3 py-0.5 bg-[#DCF2E4] text-[#1E7E43] text-[10px] font-bold rounded-full">
                Aktif
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#111111] tracking-tight">
                138 hari
              </h2>
              <p className="text-xs font-medium text-[#4A443F] mt-1">
                01 Sep 2025 — 31 Agu 2026
              </p>
            </div>

            {/* PROGRESS BAR MASA BERLAKU */}
            <div className="w-full h-2 bg-transparent border border-[#FAD0B6] rounded-full p-[1px]">
              <div className="h-full bg-gradient-to-r from-[#F88C43] to-[#EE6B2B] w-[45%] rounded-full" />
            </div>
          </div>

          {/* CARD 2: RIWAYAT KEANGGOTAAN (Card Putih Bersih) */}
          <div className="bg-white rounded-[22px] p-4 border border-[#EAE5DF] shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-[#111111]">
              Riwayat keanggotaan
            </h2>

            {/* TIMELINE LIST */}
            <div className="space-y-3">
              {historyList.map((item, idx) => (
                <div key={item.id} className="space-y-3">
                  <div className="flex items-start gap-3">
                    {/* BULLET LINGKARAN ORANYE */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FA8C42] shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xs font-bold text-[#1F1B18] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-[#8C827A] mt-0.5 font-medium">
                        {item.date}
                      </p>
                    </div>
                  </div>

                  {/* DIVIDER HALUS (KECUALI ITEM TERAKHIR) */}
                  {idx < historyList.length - 1 && (
                    <div className="border-b border-[#F5F2ED] ml-5" />
                  )}
                </div>
              ))}
            </div>

            {/* FOOTNOTE KETERANGAN */}
            <p className="text-[11px] text-[#8C827A] leading-relaxed pt-2 border-t border-[#F5F2ED]">
              Timeline bersifat informasi (read-only) — perubahan status
              dilakukan oleh admin ICA.
            </p>
          </div>
        </div>

        {/* CONTAINER TOMBOL FIXED / STICKY BOTTOM */}
        <div className="fixed bottom-14 left-0 right-0 bg-[#F7F4EE]/90 backdrop-blur-md p-4 z-50 max-w-md mx-auto">
          <button
            type="button"
            onClick={
              onPerpanjang || (() => alert("Proses perpanjangan keanggotaan"))
            }
            className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-[#FFB073] via-[#F88C43] to-[#EE6B2B] text-white font-bold text-xs shadow-[0_8px_20px_rgba(242,120,40,0.35)] active:scale-[0.98] transition-all cursor-pointer"
          >
            Perpanjang keanggotaan
          </button>
        </div>
      </div>
    </>
  );
}