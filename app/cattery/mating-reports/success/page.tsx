import Link from "next/link";

interface SuccessPageProps {
  searchParams: Promise<{ code?: string; offspringCount?: string }>;
}

export default async function MatingReportSuccessPage({ searchParams }: SuccessPageProps) {
  const { code, offspringCount } = await searchParams;
  const applicationCode = code ?? "MR-2026-0147";
  const count = offspringCount ?? "1";

  const nextSteps = [
    "Admin memeriksa kelengkapan dokumen dan sertifikat pedigree kedua induk.",
    "Kalau ada data kurang, status berubah jadi \"Perlu revisi\" dan Anda dapat notifikasi.",
    "Setelah lengkap, hasil review dikirim dan pedigree offspring diproses.",
  ];

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-2 px-3">
      <div className="w-full max-w-sm rounded-2xl border border-[#EEDFD5] bg-white p-4 text-center shadow-xs">
        {/* Checkmark Circle (Dikecilkan jadi h-8 w-8) */}
        <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5E9]">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#2E7D32]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="mt-2 text-xs font-bold text-[#1A1513]">Mating report terkirim</h1>
        <p className="mt-0.5 text-[10px] text-[#8C8074] leading-relaxed">
          Report Anda masuk ke antrean review admin ICA wilayah Bandung.
        </p>

        {/* Box Nomor Aplikasi (Padding dikurangi) */}
        <div className="mt-2 rounded-xl bg-[#F8F5F2] p-2 text-center">
          <p className="text-[9px] text-[#8C8074]">Nomor aplikasi</p>
          <p className="mt-0.5 text-xs font-bold text-[#1A1513] tracking-wide">{applicationCode}</p>
        </div>

        {/* Info Banner Hijau (Padding & margin dikecilkan) */}
        <div className="mt-2 rounded-xl border border-[#C8E6C9] bg-[#E8F5E9]/60 p-2.5 text-left flex items-start gap-2">
          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#2E7D32] text-white mt-0.5">
            <svg viewBox="0 0 24 24" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div className="flex-1 min-w-0 space-y-0.5">
            <p className="text-[10px] font-bold text-[#1B5E20] leading-tight">
              {count} kitten ditambahkan otomatis ke My Cats
            </p>
            <p className="text-[9px] text-[#2E7D32] leading-tight">
              Berstatus Kitten baru · Belum pedigree, lengkap dengan microchip dan adopter.
            </p>
          </div>
          <Link
            href="/cattery/my-cats"
            className="shrink-0 rounded-full border border-[#81C784] bg-white px-2 py-0.5 text-[9px] font-bold text-[#2E7D32] hover:bg-[#E8F5E9] transition self-center"
          >
            Lihat My Cats
          </Link>
        </div>

        {/* Box Langkah Berikutnya (Padding & list spacing dirapatkan) */}
        <div className="mt-2.5 rounded-xl border border-[#EEDFD5] p-2.5 text-left">
          <h2 className="text-[10px] font-bold text-[#1A1513]">Langkah berikutnya</h2>
          <ol className="mt-1.5 space-y-1">
            {nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[10px] text-[#8C8074] leading-relaxed">
                <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-[#FFF2E8] text-[8px] font-bold text-[#F05A1B] mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Tombol Aksi (Padding tombol sedikit dirampingkan) */}
        <div className="mt-3 space-y-1.5">
          <Link
            href="/cattery/applications"
            className="block w-full rounded-full bg-gradient-to-b from-[#FFC299] to-[#F05A1B] px-4 py-1.5 text-[11px] font-bold text-white shadow-xs hover:from-[#F05A1B] hover:to-[#C8601D] transition"
          >
            Lihat status aplikasi
          </Link>
          <Link
            href="/cattery/dashboard"
            className="block w-full rounded-full border border-[#EEDFD5] bg-white px-4 py-1.5 text-[11px] font-bold text-[#1A1513] hover:bg-gray-50 transition"
          >
            Kembali ke dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}