"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface RegisterStep {
  number: number;
  text: string;
}

function RegisterInfoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Membaca query 'tab' ATAU 'role' dari URL (?tab=cattery / ?role=cattery)
  const tabParam = searchParams.get("tab") || searchParams.get("role");
  const isCattery = tabParam === "cattery";

  const content = {
    badge: isCattery ? "Registrasi Cattery" : "Registrasi Member",
    title: isCattery ? "Daftarkan cattery Anda" : "Yuk, daftar jadi member ICA",
    description: isCattery
      ? "Pengajuan cattery diperiksa admin ICA wilayah. Setelah disetujui, Anda menerima kode cattery untuk membuat akun portal."
      : "Isi data diri, unggah identitas, lalu pilih jenis keanggotaan. Verifikasi dilakukan admin ICA wilayah Anda.",
    steps: isCattery
      ? [
          { number: 1, text: "Ajukan tiga pilihan nama cattery" },
          { number: 2, text: "Lengkapi data pemilik dan alamat kandang" },
          { number: 3, text: "Unggah dokumen pendukung dan foto fasilitas" },
          { number: 4, text: "Menunggu review admin ICA wilayah" },
        ]
      : [
          { number: 1, text: "Isi data diri dan alamat lengkap" },
          { number: 2, text: "Unggah KTP dan foto profil" },
          { number: 3, text: "Pilih jenis keanggotaan lalu bayar iuran" },
          { number: 4, text: "Tunggu verifikasi admin ICA wilayah" },
        ],
    infoBox: isCattery
      ? "Akun portal dibuat dengan kode cattery yang diterbitkan admin ICA setelah cattery Anda disetujui."
      : "Kartu anggota digital terbit otomatis setelah pembayaran diverifikasi admin ICA.",
    buttonText: isCattery
      ? "Buka formulir registrasi cattery"
      : "Buka formulir registrasi member",
    formLink: isCattery
      ? "/auth/regis/cattery"
      : "/auth/register/member",
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#1F1B18] font-sans flex flex-col justify-between px-5 pt-10 pb-8 select-none">
      {/* SECTION ATAS & KONTEN UTAMA */}
      <div className="space-y-6">
        {/* Tombol Back Chevron (Mengarahkan langsung ke Select Role) */}
        <button
          type="button"
          onClick={() => router.push("/mobile/select-role")}
          className="text-[#D96B27] active:opacity-60 cursor-pointer p-1 -ml-1 rounded-full hover:bg-[#EAE5DF]/40 transition-colors inline-block"
          aria-label="Kembali ke Pilih Role"
        >
          <svg
            className="w-6 h-6 stroke-[2.5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Header & Deskripsi */}
        <div className="space-y-2.5">
          <span
            className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${
              isCattery
                ? "bg-[#E6F0FA] text-[#2B6CB0]"
                : "bg-[#FFF0E6] text-[#D96B27]"
            }`}
          >
            {content.badge}
          </span>

          <h1 className="text-2xl font-black text-[#1F1B18] tracking-tight leading-tight">
            {content.title}
          </h1>

          <p className="text-xs text-[#70665D] leading-relaxed font-normal">
            {content.description}
          </p>
        </div>

        {/* Card Ringkasan Langkah (Steps) */}
        <div className="bg-white rounded-2xl border border-[#EEDFD5] p-4 shadow-2xs space-y-3.5">
          {content.steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              <div className="flex items-center gap-3.5">
                <span className="w-6 h-6 rounded-full bg-[#FFF2E8] text-[#D96B27] text-xs font-bold flex items-center justify-center shrink-0">
                  {step.number}
                </span>
                <p className="text-xs font-medium text-[#38302A] leading-snug">
                  {step.text}
                </p>
              </div>
              {idx < content.steps.length - 1 && (
                <div className="h-[1px] bg-[#F5EFE9] w-full" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Info Box Tambahan */}
        <div className="bg-[#FAF2EC]/80 rounded-2xl border border-[#EEDFD5] p-3.5 flex items-start gap-3">
          <svg
            className="w-4 h-4 text-[#8C8074] shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p className="text-[11px] text-[#70665D] leading-normal font-medium">
            {content.infoBox}
          </p>
        </div>
      </div>

      {/* SECTION Bawah: TOMBOL AKSI */}
      <div className="space-y-3 pt-6">
        <button
          type="button"
          onClick={() => router.push(content.formLink)}
          className="w-full cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] py-3.5 px-5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:from-[#EE6B28] hover:to-[#C8601D] active:scale-[0.98]"
        >
          {content.buttonText}
        </button>

        <button
          type="button"
          onClick={() => router.push("/anggota/dashboard")}
          className="w-full text-center text-xs font-bold text-[#D96B27] hover:underline cursor-pointer py-1"
        >
          Lihat-lihat dulu sebagai tamu
        </button>
      </div>
    </div>
  );
}

export default function RegisterInfoMobile() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5]" />}>
      <RegisterInfoContent />
    </Suspense>
  );
}