import React from "react";

const badges = [
  {
    id: 1,
    title: "Cattery",
    date: "14 Mar 2025",
    status: "completed",
    statusText: "Selesai",
    tooltipTitle: "Diklat Cattery Dasar",
    tooltipDesc: "Pengelolaan cattery: sanitasi kandang, karantina, dan pencatatan silsilah.",
    meta: "14 Mar 2025\nSertifikat ICA-DK-2025-0231",
  },
  {
    id: 2,
    title: "Grooming",
    date: "02 Jun 2025",
    status: "completed",
    statusText: "Selesai",
    tooltipTitle: "Diklat Grooming Profesional",
    tooltipDesc: "Teknik perawatan bulu, mandi medis, dan penataan kucing show.",
    meta: "02 Jun 2025\nSertifikat ICA-GR-2025-0112",
  },
  {
    id: 3,
    title: "Kesehatan",
    date: "19 Nov 2025",
    status: "completed",
    statusText: "Selesai",
    tooltipTitle: "Diklat Kesehatan & Parasitologi",
    tooltipDesc: "Pencegahan penyakit menular, vaksinasi, dan penanganan darurat medis.",
    meta: "19 Nov 2025\nSertifikat ICA-KS-2025-0489",
  },
  {
    id: 4,
    title: "Steward",
    date: "Dibuka Okt 2026",
    status: "upcoming",
    statusText: "Belum diikuti",
    tooltipTitle: "Diklat Steward · Cat Show",
    tooltipDesc: "Sertifikasi steward ring. Prasyarat: tiga diklat dasar telah diselesaikan.",
    meta: "Dibuka Okt 2026",
  },
  {
    id: 5,
    title: "Juri",
    date: "Belum diikuti",
    status: "locked",
    statusText: "Belum diikuti",
    tooltipTitle: "Diklat Calon Juri Asosiasi",
    tooltipDesc: "Pendidikan lanjutan standar penilaian juri internasional dan morfologi kucing.",
    meta: "Belum diikuti",
  },
];

export default function MembershipTierSection() {
  return (
    <section className="relative overflow-visible rounded-2xl border border-[var(--color-ink-100,#eadecd)] bg-white p-6 shadow-sm">
      {/* Garis Aksen Oranye di Bagian Paling Atas */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-[var(--color-brand-orange-500,#f48637)]" />

      {/* Header: Judul & Badge Persentase */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1">
        <div>
          <h2 className="text-base font-bold text-[var(--color-ink-900,#1a1513)]">
            Tingkat keanggotaan · <span className="text-[var(--color-brand-orange-500,#f48637)]">Perak</span>
          </h2>
          <p className="text-xs text-[var(--color-ink-500,#7e7267)] mt-0.5">
            3 dari 5 diklat diikuti · 4 event terekam
          </p>
        </div>
        <div className="self-start sm:self-auto rounded-full bg-[var(--color-brand-orange-50,#fffaf5)] border border-[var(--color-brand-orange-200,#fcdab7)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-orange-600,#e06c16)]">
          60% lengkap
        </div>
      </div>

      {/* Progress Bar (60%) */}
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[var(--color-ink-100,#eadecd)]">
        <div
          className="h-full rounded-full bg-[var(--color-brand-orange-500,#f48637)] transition-all duration-500"
          style={{ width: "60%" }}
        />
      </div>

      <p className="mt-2 text-xs text-[var(--color-ink-700,#544940)]">
        Selesaikan 1 diklat lagi untuk tingkat Emas
      </p>

      {/* Divider / Garis Pemisah */}
      <div className="my-6 h-[1px] w-full bg-[var(--color-ink-100,#eadecd)]" />

      {/* Section Lencana Diklat Asosiasi */}
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-ink-400,#8c8074)] mb-4">
          LENCANA DIKLAT ASOSIASI
        </h3>

        {/* Daftar Lencana (Sejajar ke Samping) */}
        <div className="flex flex-wrap items-start gap-8 sm:gap-12">
          {badges.map((badge) => {
            const isCompleted = badge.status === "completed";

            return (
              <div key={badge.id} className="relative flex flex-col items-center text-center group cursor-pointer">
                {/* Lingkaran Icon Medali */}
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${
                    isCompleted
                      ? "bg-gradient-to-b from-[#fcdab7] to-[var(--color-brand-orange-500,#f48637)] text-white shadow-[0_4px_12px_rgba(244,134,55,0.35)]"
                      : "border-2 border-dashed border-[var(--color-ink-200,#d9cfc1)] bg-[var(--color-ink-50,#f7f5f0)] text-[var(--color-ink-300,#b5a899)] opacity-70"
                  }`}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.5 12.5L7 20l5-2 5 2-2.5-7.5"
                    />
                  </svg>
                </div>

                {/* Teks Nama & Tanggal */}
                <span className="mt-2 text-xs font-bold text-[var(--color-ink-900,#1a1513)]">
                  {badge.title}
                </span>
                <span className="mt-0.5 text-[11px] text-[var(--color-ink-500,#7e7267)]">
                  {badge.date}
                </span>

                {/* --- TOOLTIP DI SEBELAH KANAN BADGE --- */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 w-64 p-4 bg-white rounded-2xl border border-[var(--color-ink-100,#eadecd)] shadow-xl text-left opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                  {/* Header Tooltip */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="text-xs font-bold text-[var(--color-ink-900,#1a1513)]">
                      {badge.tooltipTitle}
                    </h4>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        isCompleted
                          ? "bg-[var(--color-brand-orange-50,#fffaf5)] text-[var(--color-brand-orange-600,#e06c16)] border border-[var(--color-brand-orange-200,#fcdab7)]"
                          : "bg-[var(--color-ink-100,#eadecd)] text-[var(--color-ink-600,#6b5d52)]"
                      }`}
                    >
                      {badge.statusText}
                    </span>
                  </div>

                  {/* Deskripsi */}
                  <p className="text-[11px] text-[var(--color-ink-600,#6b5d52)] leading-relaxed mb-3">
                    {badge.tooltipDesc}
                  </p>

                  {/* Garis Pemisah Tipis */}
                  <div className="h-[1px] w-full bg-[var(--color-ink-100,#eadecd)] mb-2.5" />

                  {/* Footer Tooltip (Tanggal / Nomor Sertifikat) */}
                  <div className="text-[10px] text-[var(--color-ink-500,#7e7267)] whitespace-pre-line font-medium">
                    {badge.meta}
                  </div>

                  {/* Segitiga Panah di Sebelah Kiri Tooltip */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-px border-4 border-transparent border-r-white" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keterangan di Bawah */}
      <p className="mt-6 text-[11px] text-[var(--color-ink-500,#7e7267)]">
        Arahkan kursor pada lencana untuk melihat keterangan diklat. Lencana pudar berarti diklat belum diikuti — status diisi admin ICA setelah kelulusan diklat.
      </p>
    </section>
  );
}