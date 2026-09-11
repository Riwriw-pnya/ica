"use client";

import Link from "next/link";
import React from "react";

export default function SavedDraftsCard() {
  return (
    <div className="lg:col-span-7 bg-white rounded-3xl border border-[#eedfd5] shadow-xs overflow-hidden flex flex-col justify-between">
      <div className="p-5 sm:p-6 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#1a1513]">Draft tersimpan</h2>
            <p className="text-xs sm:text-sm text-[#8c8074]">
              Mating report yang belum selesai diisi — lanjutkan dari langkah terakhir.
            </p>
          </div>
          <a href="/cattery/mating-reports">
            <button className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] shrink-0">
              + Draft baru
            </button>
          </a>
        </div>

        <div className="space-y-5 divide-y divide-[#f4efe9]">
          {/* Draft Item 1 */}
          <div className="pt-2 first:pt-0 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm text-[#1a1513]">MR-2026-0147 · Rimba × Kirana</h3>
                  <span className="px-2 py-0.5 rounded-md bg-[#f4efe9] text-[#786c60] text-[11px] font-semibold">Draft</span>
                </div>
                <p className="text-xs text-[#8c8074] mt-1">Terhenti di: Step 4 — Mating Information · tersimpan hari ini 14:32</p>
              </div>

              <Link
                href="/cattery/mating-reports?draft=1"
                className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] shrink-0"
              >
                Lanjutkan
              </Link>
            </div>

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
                  <h3 className="font-bold text-sm text-[#1a1513]">MR-2026-0146 · Bagas × Sekar</h3>
                  <span className="px-2 py-0.5 rounded-md bg-[#f4efe9] text-[#786c60] text-[11px] font-semibold">Draft</span>
                </div>
                <p className="text-xs text-[#8c8074] mt-1">Terhenti di: Step 2 — Pilih Male · tersimpan 26 Agu 2026 09:10</p>
              </div>

              <Link
                href="/cattery/mating-reports?draft=2"
                className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] shrink-0"
              >
                Lanjutkan
              </Link>
            </div>

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
  );
}