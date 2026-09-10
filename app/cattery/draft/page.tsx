"use client";

import Link from "next/link";

interface DraftItem {
  id: string;
  code: string;
  pair: string;
  lastStep: string;
  savedAt: string;
  progress: number;
  missingSections: string[];
}

const DRAFTS: DraftItem[] = [
  {
    id: "1",
    code: "MR-2026-0147",
    pair: "Rimba × Kirana",
    lastStep: "Step 4 — Mating Information",
    savedAt: "hari ini 14:32",
    progress: 57,
    missingSections: [
      "Estimasi tanggal lahir",
      "Data offspring",
      "Upload dokumen",
      "Konfirmasi",
    ],
  },
  {
    id: "2",
    code: "MR-2026-0146",
    pair: "Bagas × Sekar",
    lastStep: "Step 2 — Pilih Male",
    savedAt: "26 Agu 2026 09:10",
    progress: 29,
    missingSections: [
      "Pilih female",
      "Mating information",
      "Data offspring",
      "Upload dokumen",
      "Konfirmasi",
    ],
  },
];

export default function DraftPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-ink-900)]">
            Draft tersimpan
          </h1>
          <p className="mt-1 text-xs text-[var(--color-ink-400)]">
            Mating report yang belum lengkap. Setiap draft menyimpan langkah terakhir dan keterangan yang belum terisi.
          </p>
        </div>

        <Link
          href="/cattery/mating-reports"
          className="cursor-pointer rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition hover:from-[#EE6B28] hover:to-[#C8601D] active:scale-95"
        >
          + Draft baru
        </Link>
      </div>

      {/* Draft List */}
      <div className="mt-8 flex flex-col gap-5">
        {DRAFTS.map((draft) => (
          <div
            key={draft.id}
            className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-6 shadow-xs transition-all duration-200 hover:border-[var(--color-brand-orange-300)] hover:shadow-[0_4px_12px_rgba(238,107,40,0.25)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-[var(--color-ink-900)]">
                    {draft.code} · {draft.pair}
                  </h2>
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-[var(--color-ink-400)]">
                    Draft
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[var(--color-ink-400)]">
                  Terhenti di: {draft.lastStep} · tersimpan {draft.savedAt}
                </p>
              </div>

              <Link
                href={`/cattery/mating-reports/edit/${draft.id}`}  //url disesuaikan lagi (aku masih cari cara) -kar
                className="cursor-pointer rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.2)] transition hover:from-[#EE6B28] hover:to-[#C8601D] active:scale-95"
              >
                Lanjutkan pengisian
              </Link>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full bg-gradient-to-r from-[#FFC299] to-[#EE6B28] transition-all duration-300"
                  style={{ width: `${draft.progress}%` }}
                />
              </div>
              <span className="text-[11px] font-medium text-[var(--color-ink-400)]">
                {draft.progress}% lengkap
              </span>
            </div>

            {/* Bagian yang Belum Terisi */}
            <div className="mt-5 border-t border-[var(--color-ink-100)] pt-4">
              <p className="text-[10px] font-medium text-[var(--color-ink-400)] uppercase tracking-wider">
                Bagian yang belum terisi
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {draft.missingSections.map((section, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-amber-50/80 px-2.5 py-1 text-[11px] font-medium text-amber-700/90 border border-amber-200/50"
                  >
                    {section}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}