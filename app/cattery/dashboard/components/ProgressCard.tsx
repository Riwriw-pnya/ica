"use client";

import React from "react";

const STEPS = [
  { step: 1, label: "Dikirim", date: "21 Agu 2026 · 09:14" },
  { step: 2, label: "Review admin", subtitle: "sedang berjalan" },
  { step: 3, label: "Verifikasi dokumen" },
  { step: 4, label: "Disetujui" },
];

interface LatestProgressCardProps {
  currentStep?: number;
}

export default function LatestProgressCard({ currentStep = 2 }: LatestProgressCardProps) {
  return (
    <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#eedfd5] shadow-xs space-y-5 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#1a1513]">
              Progres pengajuan terakhir
            </h2>
            {/* Badge Status (Mobile: Sebelah kanan judul) */}
            <span className="sm:hidden px-3 py-1 rounded-full bg-[#ebf3fa] text-[#2b71b1] text-[11px] font-semibold shrink-0">
              Sedang direview
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8c8074] mt-0.5 sm:mt-0">
            MR-2026-0142 · Bagas × Nara · dikirim 21 Agu 2026
          </p>
        </div>

        {/* Badge Status & Button (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-[#ebf3fa] text-[#2b71b1] text-xs font-semibold">
            Sedang direview
          </span>
          <a href="/cattery/applications">
            <button className="px-4 py-2 rounded-full border border-[#eedfd5] text-xs font-semibold text-[#544940] hover:bg-[#fff7f2] hover:border-[#f05a1b]/40 hover:text-[#f05a1b] transition shrink-0 cursor-pointer">
              Semua pengajuan
            </button>
          </a>
        </div>
      </div>

      {/* --- DESKTOP STEPPER (Horizontal) --- */}
      <div className="hidden sm:block">
        <div className="relative mt-6 flex items-center justify-between px-6">
          {/* Line Background */}
          <div className="absolute left-12 right-12 top-2.5 h-[2px] bg-[var(--color-ink-100,#eadecd)]" />

          {/* Line Progress */}
          <div
            className="absolute left-12 top-2.5 h-[2px] bg-[var(--color-brand-orange-500,#f05a1b)] transition-all duration-300"
            style={{
              width: `${((Math.min(currentStep, 4) - 1) / 3) * 89.5}%`,
            }}
          />

          {STEPS.map((s) => {
            const isCompleted = s.step < currentStep || (s.step === 4 && currentStep >= 4);
            const isCurrent = s.step === currentStep && currentStep < 4;

            return (
              <div key={s.step} className="relative z-10 flex flex-col items-center">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition ${
                    isCompleted
                      ? "border-2 border-[#f48637] bg-gradient-to-b from-[var(--color-brand-orange-300,#ff9e5e)] to-[var(--color-brand-orange-500,#f05a1b)] text-white shadow-[0_2px_6px_rgba(244,134,55,0.4)]"
                      : isCurrent
                      ? "border-2 border-[#f48637] bg-white text-[var(--color-brand-orange-500,#f05a1b)] ring-4 ring-[var(--color-brand-orange-50,#fff1e8)]"
                      : "border-2 border-[var(--color-ink-200,#dcd1c4)] bg-white text-[var(--color-ink-300,#8c8074)]"
                  }`}
                >
                  {isCompleted ? "✓" : ""}
                </div>
                <span
                  className={`mt-2 text-[11px] font-medium ${
                    isCompleted || isCurrent
                      ? "text-[var(--color-ink-900,#1a1513)]"
                      : "text-[var(--color-ink-400,#8c8074)]"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MOBILE STEPPER (Vertikal Sesuai Foto 1) --- */}
      <div className="sm:hidden relative pl-2 py-1 space-y-4">
        {/* Line Garis Vertikal */}
        <div className="absolute left-[17px] top-4 bottom-5 w-[2px] bg-[#e3d9cd] -z-0" />

        {STEPS.map((s) => {
          const isCompleted = s.step < currentStep || (s.step === 4 && currentStep >= 4);
          const isCurrent = s.step === currentStep && currentStep < 4;

          return (
            <div key={s.step} className="relative z-10 flex items-start gap-3.5">
              {/* Dot Step */}
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  isCompleted
                    ? "border-2 border-[#f05a1b] bg-gradient-to-b from-[#ff9e5e] to-[#f05a1b] text-white shadow-xs"
                    : isCurrent
                    ? "border-2 border-[#f05a1b] bg-white text-[#f05a1b] ring-3 ring-[#fff1e8]"
                    : "border-2 border-[#dcd1c4] bg-white"
                }`}
              >
                {isCompleted ? "✓" : ""}
              </div>

              {/* Text Label & Subtitle */}
              <div className="flex flex-col">
                <span
                  className={`text-xs font-semibold leading-tight ${
                    isCompleted || isCurrent ? "text-[#1a1513]" : "text-[#a09488]"
                  }`}
                >
                  {s.label}
                </span>
                {s.date && <span className="text-[11px] text-[#8c8074] mt-0.5">{s.date}</span>}
                {s.subtitle && <span className="text-[11px] text-[#8c8074] mt-0.5">{s.subtitle}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info & Tombol Mobile */}
      <div className="space-y-4 pt-1">
        <p className="text-[11px] sm:text-xs text-[#a09488] leading-relaxed">
          Timeline status bersifat informasi (read-only) — perubahan status dilakukan oleh admin ICA.
        </p>

        {/* Tombol "Semua pengajuan" Khusus Mobile (Posisi di Bawah) */}
        <div className="sm:hidden pt-1">
          <a href="/cattery/applications" className="block w-full">
            <button className="w-full py-2.5 px-4 rounded-full border border-[#1a1513] text-xs font-semibold text-[#1a1513] bg-white active:bg-gray-50 text-center transition">
              Semua pengajuan
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}