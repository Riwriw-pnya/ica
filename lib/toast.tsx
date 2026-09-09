import { toast } from "sonner";

export function showErrorToast(title: string, description: string) {
  toast.custom((t) => (
    <div className="relative flex w-[340px] items-start gap-3 rounded-xl border border-[var(--color-ink-100)] border-l-4 border-l-[var(--color-danger)] bg-white p-4 shadow-lg">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-danger)] text-[11px] font-bold text-white">
        !
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-[var(--color-ink-900)]">{title}</p>
        <p className="mt-0.5 text-[12px] text-[var(--color-ink-700)]">{description}</p>
      </div>

      <button
        onClick={() => toast.dismiss(t)}
        className="shrink-0 text-[var(--color-ink-400)] transition hover:text-[var(--color-ink-700)]"
        aria-label="Tutup"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  ));
}

// Dipertahankan biar kompatibel kalau ada pemanggilan lama
export function showIncompleteToast() {
  showErrorToast("Ada data yang belum lengkap.", "Periksa keterangan bertanda merah di step ini.");
}