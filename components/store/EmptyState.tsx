export default function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-[var(--color-ink-100)] bg-white py-24">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)]">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="4" y="7" width="16" height="14" rx="2" />
          <path d="M8 7V5a4 4 0 018 0v2M10 12h4" />
        </svg>
      </div>

      <p className="mt-4 text-[14px] font-semibold text-[var(--color-ink-900)]">Barang tidak ditemukan</p>
      <p className="mt-1 max-w-xs text-center text-[12px] text-[var(--color-ink-400)]">
        Saat ini belum ada produk yang tersedia di kategori ini. Silakan cek kembali di lain waktu.
      </p>
    </div>
  );
}