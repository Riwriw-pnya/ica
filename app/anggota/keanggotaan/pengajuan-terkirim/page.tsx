"use client";

import Link from "next/link";

export default function PengajuanTerkirimPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full py-6">
      {/* Main Container Card */}
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#efe9e2] bg-white p-8 shadow-xs space-y-6">
        {/* Success Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f5e9] text-[#2e7d32]">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h1 className="text-xl font-bold text-[#1a1817]">
            Pengajuan cattery terkirim
          </h1>
          <p className="text-xs text-[#5e5852] leading-relaxed">
            Berkas Anda masuk ke antrean review admin wilayah Jawa Barat. Perkembangan status dikirim ke email terdaftar dan tampil di halaman ini.
          </p>
        </div>

        {/* Status Box */}
        <div className="flex items-center justify-between rounded-xl bg-[var(--color-ink-100)]/35 p-3.5">
          <div>
            <p className="text-[11px] font-medium text-[#8c857b]">Nomor pengajuan</p>
            <p className="text-sm font-bold text-[#1a1817] mt-0.5">ICA-CTY-2026-0517</p>
          </div>
          <span className="rounded-full bg-[#fef3e7] px-3.5 py-1 text-[11px] font-bold text-[#d97706]">
            Menunggu review
          </span>
        </div>

        {/* Timeline Tracking */}
        <div className="relative pl-10 space-y-7 my-4">
          {/* Garis Vertikal */}
          <div className="absolute left-[11px] top-3 h-11 w-[2px] bg-gradient-to-b from-[#ff9b53] to-[#ee6b28]" />
          <div className="absolute left-[11px] top-14 bottom-3 w-[2px] bg-[#e8e2da]" />

          {/* Item 1: Completed */}
          <div className="relative flex items-start">
            <div className="absolute -left-10 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] border-t border-[#FFE5D4] text-white ring-4 ring-white z-10">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-[#1a1817]">Pengajuan terkirim</p>
              <p className="text-[11px] text-[#8c857b] mt-0.5">
                01 Sep 2026, 09:32 · berkas lengkap
              </p>
            </div>
          </div>

          {/* Item 2: In Progress */}
          <div className="relative flex items-start">
            <div className="absolute -left-10 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#ff9b53] to-[#ee6b28] p-[2px] ring-4 ring-white z-10">
              <div className="h-full w-full rounded-full bg-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1a1817]">
                Review admin wilayah Jawa Barat
              </p>
              <p className="text-[11px] text-[#8c857b] mt-0.5">
                Sedang berjalan · estimasi 3 hari kerja
              </p>
            </div>
          </div>

          {/* Item 3: Pending */}
          <div className="relative flex items-start">
            <div className="absolute -left-10 top-0.5 h-6 w-6 rounded-full border border-[#d6cfc7] bg-white ring-4 ring-white z-10" />
            <div>
              <p className="text-xs font-bold text-[#a39c94]">Keputusan pengajuan</p>
              <p className="text-[11px] text-[#a39c94] mt-0.5">
                Disetujui, revisi, atau ditolak
              </p>
            </div>
          </div>

          {/* Item 4: Pending */}
          <div className="relative flex items-start">
            <div className="absolute -left-10 top-0.5 h-6 w-6 rounded-full border border-[#d6cfc7] bg-white ring-4 ring-white z-10" />
            <div>
              <p className="text-xs font-bold text-[#a39c94]">
                Verification code diterbitkan
              </p>
              <p className="text-[11px] text-[#a39c94] mt-0.5">
                Dikirim ke email terdaftar setelah disetujui
              </p>
            </div>
          </div>
        </div>

        {/* Warning / Lock Banner */}
        <div className="flex items-start gap-3 rounded-xl bg-[#fff8f3] border border-[#fde8d7] p-4 text-xs text-[#5e5852]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="shrink-0 text-[#ee6b28] mt-0.5"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="leading-relaxed">
            Verification code untuk Cattery Portal diterbitkan admin setelah pengajuan disetujui. Kode bersifat tetap, bukan kode sekali pakai.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <Link
            href="/anggota/log-aktivitas"
            className="block w-full rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-center py-3 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)]
            border-t border-[#FFE5D4] hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-all duration-150 cursor-pointer"
          >
            Lihat log aktivitas
          </Link>

          <button
            type="button"
            className="w-full rounded-full border border-[#e8e2da] bg-white py-3 text-xs font-semibold text-[#38332e] hover:bg-[#fcfbf9] transition cursor-pointer"
          >
            Pratinjau Cattery Portal
          </button>

          <div className="pt-1 text-center">
            <Link
              href="/anggota/keanggotaan"
              className="inline-block text-xs font-semibold text-[#38332e] hover:text-[#ee6b28] transition"
            >
              Kembali ke keanggotaan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}