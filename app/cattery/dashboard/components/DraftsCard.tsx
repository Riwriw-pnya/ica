"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useDrafts } from "@/context/DraftContext";

// Data dummy awal jika local storage kosong
const initialDummyDrafts = [
  {
    id: "1",
    code: "MR-2026-0147",
    pair: "Rimba × Kirana",
    currentStep: 4,
    savedAt: "tersimpan hari ini 14:32",
    offspringItems: [1, 2],
  },
  {
    id: "2",
    code: "MR-2026-0146",
    pair: "Bagas × Sekar",
    currentStep: 2,
    savedAt: "tersimpan 26 Agu 2026 09:10",
    offspringItems: [1],
  },
];

const stepLabels: Record<number, string> = {
  1: "Step 1 — Data Cattery",
  2: "Step 2 — Pilih Pejantan",
  3: "Step 3 — Pilih Induk",
  4: "Step 4 — Mating Information",
  5: "Step 5 — Add Offspring",
  6: "Step 6 — Upload Dokumen",
  7: "Step 7 — Review & Submit",
};

export default function SavedDraftsCard() {
  const { drafts, saveDraft, isHydrated } = useDrafts();

  // Masukkan data dummy jika draft kosong saat pertama kali dimuat
  useEffect(() => {
    if (isHydrated && drafts.length === 0) {
      initialDummyDrafts.forEach((dummy) => {
        saveDraft({
          id: dummy.id,
          pair: dummy.pair,
          currentStep: dummy.currentStep,
          selectedMaleId: 1,
          selectedFemaleId: 1,
          matingDate: "2026-08-01",
          estimatedBirthDate: "2026-10-05",
          isEstimateAuto: true,
          witnessName: "Admin",
          offspringItems: dummy.offspringItems.map((i) => ({
            id: i,
            name: "",
            gender: "M" as any,
            color: "",
            birthDate: "",
            birthWeight: "",
            breed: "Persian",
            status: "ALIVE" as any,
          })),
        });
      });
    }
  }, [isHydrated, drafts.length, saveDraft]);

  if (!isHydrated) return null;

  // Ubah data dari draft context menjadi format card
  const displayDrafts = drafts.map((draft) => {
    const progress = Math.round((draft.currentStep / 7) * 100);
    return {
      id: draft.id,
      code: draft.code,
      pair: draft.pair,
      step: `Step ${draft.currentStep}`,
      stepLabel: stepLabels[draft.currentStep] || `Step ${draft.currentStep}`,
      savedTime: draft.savedAt,
      progress,
      missingFields: "Melengkapi data form dan konfirmasi akhir",
      draftUrl: `/cattery/mating-reports?draft=${draft.id}`,
    };
  })
  .slice(0, 2); //batasi 2 draft

  if (displayDrafts.length === 0) return null;

  return (
    <>
      {/* ========================================= */}
      {/* 1. TAMPILAN MOBILE                        */}
      {/* ========================================= */}
      <div className="block lg:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#1a1513]">Lanjutkan draft</h2>
            <p className="text-[11px] text-[#8c8074]">Belum dikirim ke admin ICA</p>
          </div>
          <Link href="/cattery/mating-reports" className="text-xs font-bold text-[var(--color-brand-orange-700)] hover:underline">
            Semua
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4 scroll-smooth">
          {displayDrafts.map((draft) => (
            <div
              key={draft.id}
              className="min-w-[240px] max-w-[260px] bg-white rounded-2xl p-3.5 border border-[#F5E6DA] shadow-xs shrink-0 flex flex-col justify-between space-y-3"
            >
              <div>
                <h3 className="font-bold text-xs text-[#1a1513] truncate">
                  {draft.code} · {draft.pair}
                </h3>
                <p className="text-[10px] text-[#8c8074] mt-1 truncate">
                  {draft.step} · {draft.savedTime}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-end">
                  <span className="text-[10px] font-bold text-[#1a1513]">{draft.progress}%</span>
                </div>
                <div className="w-full bg-[#f4efe9] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[var(--color-brand-orange-500)] h-full rounded-full transition-all duration-300"
                    style={{ width: `${draft.progress}%` }}
                  />
                </div>
              </div>

              <Link
                href={draft.draftUrl}
                className="text-xs font-bold text-[var(--color-brand-orange-700)] hover:underline pt-1 inline-block"
              >
                Lanjutkan
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================= */}
      {/* 2. TAMPILAN DESKTOP                       */}
      {/* ========================================= */}
      <div className="hidden lg:flex lg:col-span-7 bg-white rounded-3xl border border-[#eedfd5] shadow-[0_10px_25px_rgba(0,0,0,0.05)] overflow-hidden flex-col justify-between">
        <div className="p-5 sm:p-6 space-y-6">
          <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#1a1513]">Draft tersimpan</h2>
              <p className="text-xs sm:text-sm text-[#8c8074]">
                Mating report yang belum selesai diisi — lanjutkan dari langkah terakhir.
              </p>
            </div>
            <Link href="/cattery/mating-reports">
              <button className="cursor-pointer whitespace-nowrap rounded-full border border-[var(--color-brand-orange-500)] bg-white px-3.5 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-xs font-bold text-[var(--color-brand-orange-700)] transition-all duration-150 hover:bg-[var(--color-brand-orange-50)] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] shrink-0">
                + Draft baru
              </button>
            </Link>
          </div>

          <div className="space-y-5 divide-y divide-[#f4efe9]">
            {displayDrafts.map((draft, idx) => (
              <div key={draft.id} className={`pt-4 ${idx === 0 ? "pt-0" : ""} space-y-3`}>
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-xs sm:text-sm text-[#1a1513]">
                        {draft.code} · {draft.pair}
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-[#f4efe9] text-[#786c60] text-[10px] sm:text-[11px] font-semibold">
                        Draft
                      </span>
                    </div>
                    <p className="text-xs text-[#8c8074] mt-1">
                      Terhenti di: {draft.stepLabel} · {draft.savedTime}
                    </p>
                  </div>

                  <Link
                    href={draft.draftUrl}
                    className="cursor-pointer whitespace-nowrap rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-3.5 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] shrink-0"
                  >
                    Lanjutkan
                  </Link>
                </div>

                <div className="space-y-1">
                  <div className="w-full bg-[#f4efe9] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[var(--color-brand-orange-500)] h-full"
                      style={{ width: `${draft.progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-[#8c8074]">
                    {draft.progress}% lengkap
                  </span>
                </div>

                <p className="text-xs text-[#d94a11] bg-[#fff6f0] p-2.5 rounded-xl border border-[#fce3d2]">
                  <span className="font-semibold">Kurang:</span> {draft.missingFields}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}