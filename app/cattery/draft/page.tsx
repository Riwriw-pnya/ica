"use client";

import Link from "next/link";
import { useDrafts } from "@/context/DraftContext";

export default function DraftPage() {
  const { drafts, isHydrated } = useDrafts();

  const getProgress = (draft: (typeof drafts)[number]) => {
    return Math.round((draft.currentStep / 7) * 100);
  };

  if (!isHydrated) {
    return (
      <div className="p-8 text-center text-xs text-[var(--color-ink-400)]">
        Memuat draft...
      </div>
    );
  }

  return (
    <div className="p-8">
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

      <div className="mt-8 flex flex-col gap-5">
        {drafts.length === 0 ? (
          <p className="text-center text-[13px] text-[var(--color-ink-400)]">
            Belum ada draft tersimpan.
          </p>
        ) : (
          drafts.map((draft) => (
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
                    Terhenti di step {draft.currentStep} · tersimpan {draft.savedAt}
                  </p>
                </div>

                <Link
                  href={`/cattery/mating-reports?draft=${draft.id}`}
                  className="cursor-pointer rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.2)] transition hover:from-[#EE6B28] hover:to-[#C8601D] active:scale-95"
                >
                  Lanjutkan pengisian
                </Link>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full bg-gradient-to-r from-[#FFC299] to-[#EE6B28] transition-all duration-300"
                    style={{ width: `${getProgress(draft)}%` }}
                  />
                </div>
                <span className="text-[11px] font-medium text-[var(--color-ink-400)]">
                  {getProgress(draft)}% lengkap
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}