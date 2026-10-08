"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginInfoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Membaca parameter 'tab' ATAU 'role' dari URL (?tab=cattery / ?role=cattery)
  const tabParam = searchParams.get("tab") || searchParams.get("role");
  const isCattery = tabParam === "cattery";

  // Data konten dinamis berdasarkan Role / Tab
  const content = {
    badge: isCattery ? "Login Cattery" : "Login Member",
    title: isCattery ? "Masuk ke portal cattery" : "Selamat datang kembali",
    description: isCattery
      ? "Gunakan kode cattery dan kata sandi yang Anda buat saat aktivasi akun portal."
      : "Masuk dengan nomor anggota atau email terdaftar untuk membuka kartu, kucing, dan riwayat aktivitas Anda.",
    steps: isCattery
      ? [
          { number: 1, text: "Masukkan kode cattery, contoh ICA-CTY-2021-0044" },
          { number: 2, text: "Masukkan kata sandi portal" },
          { number: 3, text: "Lanjut ke dashboard cattery" },
        ]
      : [
          { number: 1, text: "Masukkan nomor anggota atau email" },
          { number: 2, text: "Masukkan kata sandi" },
          { number: 3, text: 'Aktifkan "ingat saya" bila perangkat pribadi' },
        ],
    infoBox:
      "Lupa kata sandi? Ajukan tiket pemulihan di halaman login — kata sandi sementara diterbitkan admin ICA wilayah Anda.",
    buttonText: isCattery
      ? "Buka halaman login cattery"
      : "Buka halaman login member",
    loginLink: isCattery ? "/auth/login/cattery" : "/auth/login/member",
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#1F1B18] font-sans flex flex-col justify-between px-5 pt-10 pb-8 select-none">
      {/* KONTEN UTAMA */}
      <div className="space-y-6">
        {/* Tombol Back Chevron (Arahkan langsung ke Halaman Select Role) */}
        <button
          type="button"
          onClick={() => router.push("/mobile/select-role")} // Atau "/select-role" sesuaikan route di proyekmu
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

        {/* Badge & Title */}
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

        {/* Steps Card */}
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

        {/* Info Box Pemulihan Kata Sandi */}
        <div className="bg-[#FFF9F5] rounded-2xl border border-[#FADEC9] p-3.5 flex items-start gap-3">
          <svg
            className="w-4 h-4 text-[#D96B27] shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <p className="text-[11px] text-[#70665D] leading-normal font-medium">
            {content.infoBox}
          </p>
        </div>
      </div>

      {/* TOMBOL AKSI BAWAH */}
      <div className="space-y-3 pt-6">
        <button
          type="button"
          onClick={() => router.push(content.loginLink)}
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

export default function LoginInfoMobile() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5]" />}>
      <LoginInfoContent />
    </Suspense>
  );
}