import Link from "next/link";

interface SuccessPageProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function MatingReportSuccessPage({ searchParams }: SuccessPageProps) {
  const { code } = await searchParams;
  const applicationCode = code ?? "-";

  const nextSteps = [
    "Admin memeriksa kelengkapan dokumen dan sertifikat pedigree kedua induk.",
    "Kalau ada data kurang, status berubah jadi \"Perlu revisi\" dan Anda dapat notifikasi.",
    "Setelah lengkap, hasil review dikirim dan pedigree offspring diproses.",
  ];

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--color-ink-100)] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-success-bg)]">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-[var(--color-success)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="mt-4 text-lg font-semibold text-[var(--color-ink-900)]">Mating report terkirim</h1>
        <p className="mt-1 text-[13px] text-[var(--color-ink-700)]">
          Report Anda masuk ke antrean review admin ICA wilayah Bandung.
        </p>

        <div className="mt-5 rounded-xl bg-[var(--color-ink-50)] p-3">
          <p className="text-[11px] text-[var(--color-ink-400)]">Nomor aplikasi</p>
          <p className="mt-0.5 text-base font-bold text-[var(--color-ink-900)]">{applicationCode}</p>
        </div>

        <div className="mt-5 rounded-xl border border-[var(--color-ink-100)] p-4 text-left">
          <h2 className="text-[13px] font-semibold text-[var(--color-ink-900)]">Langkah berikutnya</h2>
          <ol className="mt-3 space-y-2">
            {nextSteps.map((step, i) => (
              <li key={i} className="flex gap-2 text-[12px] text-[var(--color-ink-700)]">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[10px] font-bold text-[var(--color-brand-orange-700)]">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 space-y-2">
          <Link
            href="/cattery/applications"
            className="block w-full rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)]"
          >
            Lihat status aplikasi
          </Link>
          <Link
            href="/cattery/dashboard"
            className="block w-full rounded-full border border-[var(--color-ink-100)] px-6 py-2.5 text-sm font-semibold text-[var(--color-ink-900)]"
          >
            Kembali ke dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}