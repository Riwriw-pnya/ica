import Link from "next/link";

export default function MemberCard() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-[var(--color-brand-orange-300)] bg-[linear-gradient(135deg,#fff0e3_0%,#fff8f2_42%,#ffffff_100%)] p-5 shadow-[0_10px_25px_-5px_rgba(249,115,22,0.3)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-brand-orange-700)]">
            Kartu Member ICA
          </p>
        </div>

        <span className="rounded-full bg-[var(--color-success-bg)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-success)]">
          Aktif
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-brand-orange-300)] bg-white text-xs font-semibold text-[var(--color-brand-orange-700)]">
          AP
        </div>

        <div>
          <h2
            className="bg-[linear-gradient(90deg,#8F481F_0%,#A85A23_22%,#C77A2C_36%,#E5B052_48%,#F0C56B_56%,#D89A43_65%,#B96A29_78%,#91471F_100%)] bg-clip-text text-[18px] font-bold tracking-[-0.025em] text-transparent"
            style={{
              filter: "drop-shadow(0 1px 5px rgba(218, 157, 67, 0.25))",
            }}
          >
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

        <Link
          href="/anggota/keanggotaan"
          className="rounded-full border border-[var(--color-brand-orange-500)] px-4 py-2 text-[11px] font-medium text-[var(--color-brand-orange-700)] transition-colors duration-200 hover:border-[var(--color-brand-orange-300)] hover:bg-gradient-to-b hover:from-white hover:to-[var(--color-brand-orange-100)]"
        >
          Lihat detail
        </Link>
      </div>
    </section>
  );
}