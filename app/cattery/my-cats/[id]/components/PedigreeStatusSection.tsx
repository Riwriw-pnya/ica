import type { PedigreeStatus } from "@/types/cattery";

export default function PedigreeStatusSection({ status }: { status: PedigreeStatus }) {
  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-6">
      <h2 className="font-display text-[15px] font-semibold text-[var(--color-ink-900)]">Status pedigree</h2>

      <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-[12px] text-[var(--color-ink-700)]">
          {status === "Terverifikasi"
            ? "Pedigree kucing ini sudah diverifikasi oleh Admin ICA."
            : status === "Menunggu verifikasi"
              ? "Pengajuan pedigree sedang diproses oleh Admin ICA."
              : "Kucing ini belum memiliki pengajuan pedigree."}
        </p>

        {status === "Terverifikasi" && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-success-bg)] px-4 py-2 text-[12px] font-semibold text-[var(--color-success)]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Pedigree Terverifikasi
          </span>
        )}

        {status === "Menunggu verifikasi" && (
          <span className="shrink-0 rounded-full bg-[var(--color-warning-bg)] px-4 py-2 text-[12px] font-semibold text-[var(--color-warning)]">
            Menunggu verifikasi
          </span>
        )}

        {status === "Belum diajukan" && (
          <button className="shrink-0 cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
            Ajukan Pedigree
          </button>
        )}
      </div>
    </div>
  );
}