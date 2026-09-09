"use client";

import React from "react";
import SubmissionStepper from "./SubmissionStepper";

export default function LatestProgressCard() {
  return (
    <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#eedfd5] shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#1a1513]">Progres pengajuan terakhir</h2>
          <p className="text-xs sm:text-sm text-[#8c8074]">MR-2026-0142 · Bagas × Nara · dikirim 21 Agu 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-[#ebf3fa] text-[#2b71b1] text-xs font-semibold">Sedang direview</span>
          <button className="px-4 py-2 rounded-full border border-[#eedfd5] text-xs font-semibold text-[#544940] hover:bg-[#fff7f2] hover:border-[#f05a1b]/40 hover:text-[#f05a1b] transition shrink-0">
            Semua pengajuan
          </button>
        </div>
      </div>

      <SubmissionStepper />

      <p className="text-xs text-[#a09488]">
        Timeline status bersifat informasi (read-only) — perubahan status dilakukan oleh admin ICA.
      </p>
    </section>
  );
}