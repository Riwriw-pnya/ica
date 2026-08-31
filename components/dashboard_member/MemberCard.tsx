export default function MemberCard() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-[var(--color-brand-orange-300)] bg-gradient-to-br from-[var(--color-brand-orange-100)] to-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-brand-orange-700)] hover:bg-[var(--color-brand-orange-100)]">
            Kartu Member ICA
          </p>
        </div>

        <span className="rounded-full bg-[var(--color-success-bg)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-success)]">
          Aktif
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-brand-orange-300)] bg-white text-xs font-medium text-[var(--color-brand-orange-700)]">
          AP
        </div>

        <div>
          <h2 className="text-[17px] font-semibold text-[var(--color-brand-orange-900)]">
            Ayu Prameswari
          </h2>
          <p className="mt-0.5 text-[11px] text-[var(--color-ink-400)]">
            ICA-M-004821 · Jawa Barat
          </p>
        </div>
      </div>

      <div className="mt-10 flex items-end justify-between">
        <div>
          <p className="text-[10px] text-[var(--color-ink-400)]">
            Berlaku hingga
          </p>

          <p className="mt-0.5 text-xs font-semibold text-[var(--color-ink-900)]">
            31 Agu 2026
          </p>
        </div>

        <button className="cursor-pointer rounded-full border border-[var(--color-brand-orange-500)] px-4 py-2 text-[11px] font-medium text-[var(--color-brand-orange-700)] transition hover:bg-gradient-to-b hover:from-[var(--color-brand-orange-50)] hover:to-[var(--color-brand-orange-300)]">
          Lihat detail
        </button>
      </div>
    </section>
  );
}