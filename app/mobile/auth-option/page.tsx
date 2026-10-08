"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthOptionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const role = searchParams.get("role") === "cattery" ? "cattery" : "member";
  const isCattery = role === "cattery";

  const handleRegisterClick = () => {
    if (isMounted) router.push(`/mobile/register-info?role=${role}`);
  };

  const handleLoginClick = () => {
    if (isMounted) router.push(`/mobile/login-info?role=${role}`);
  };

  const handleGuestClick = () => {
    if (isMounted) router.push("/anggota/dashboard");
  };

  return (
    <div className="min-h-dvh w-full bg-[#FAF8F5] text-[#1F1B18] font-sans flex justify-center select-none">
      {/* Container Khusus Mobile Frame (Fit 390px - 430px) */}
      <div className="w-full max-w-[430px] min-h-dvh flex flex-col justify-between px-5 pt-8 pb-8">
        
        {/* BAGIAN ATAS: Back Button, Header, & Cards */}
        <div className="space-y-6">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => isMounted && router.back()}
            className="text-[#D96B27] active:opacity-60 cursor-pointer p-1 -ml-1 rounded-full hover:bg-[#EAE5DF]/40 transition-colors inline-block"
            aria-label="Kembali"
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
              {isCattery ? "Portal Cattery" : "Portal Member"}
            </span>

            <h1 className="text-2xl font-black text-[#1F1B18] tracking-tight leading-tight">
              {isCattery
                ? "Kelola cattery & pendaftaran kucing"
                : "Akses keanggotaan & layanan ICA"}
            </h1>

            <p className="text-xs text-[#70665D] leading-relaxed font-normal">
              {isCattery
                ? "Pilih opsi untuk masuk ke portal cattery terdaftar atau ajukan pendaftaran cattery baru Anda."
                : "Pilih opsi di bawah untuk masuk ke akun member Anda atau mendaftar keanggotaan baru Indonesian Cat Association."}
            </p>
          </div>

          {/* CARD OPTIONS */}
          <div className="space-y-3 pt-1">
            {/* Card 1: Register */}
            <button
              type="button"
              onClick={handleRegisterClick}
              className="w-full text-left bg-white rounded-2xl border border-[#EEDFD5] p-4 shadow-2xs hover:border-[#D96B27] active:scale-[0.98] transition-all cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FFF2E8] text-[#D96B27] flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-extrabold text-[#1F1B18] group-hover:text-[#D96B27] transition-colors">
                    {isCattery
                      ? "Daftarkan Cattery Baru"
                      : "Daftar Jadi Member Baru"}
                  </p>
                  <p className="text-[11px] text-[#8C8074] font-medium">
                    {isCattery
                      ? "Petunjuk & formulir pengajuan cattery"
                      : "Petunjuk & formulir pendaftaran anggota"}
                  </p>
                </div>
              </div>

              <div className="w-6 h-6 rounded-full bg-[#FAF7F2] text-[#8C8074] group-hover:bg-[#FFF2E8] group-hover:text-[#D96B27] flex items-center justify-center shrink-0 transition-colors">
                <svg
                  className="w-3.5 h-3.5 stroke-[2.5]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>

            {/* Card 2: Login */}
            <button
              type="button"
              onClick={handleLoginClick}
              className="w-full text-left bg-white rounded-2xl border border-[#EEDFD5] p-4 shadow-2xs hover:border-[#D96B27] active:scale-[0.98] transition-all cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#8C8074] group-hover:bg-[#FFF2E8] group-hover:text-[#D96B27] flex items-center justify-center shrink-0 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-extrabold text-[#1F1B18] group-hover:text-[#D96B27] transition-colors">
                    {isCattery
                      ? "Masuk ke Portal Cattery"
                      : "Masuk ke Akun Member"}
                  </p>
                  <p className="text-[11px] text-[#8C8074] font-medium">
                    {isCattery
                      ? "Gunakan kode cattery & kata sandi"
                      : "Gunakan nomor anggota atau email"}
                  </p>
                </div>
              </div>

              <div className="w-6 h-6 rounded-full bg-[#FAF7F2] text-[#8C8074] group-hover:bg-[#FFF2E8] group-hover:text-[#D96B27] flex items-center justify-center shrink-0 transition-colors">
                <svg
                  className="w-3.5 h-3.5 stroke-[2.5]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthOptionMobile() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#FAF8F5]" />}>
      <AuthOptionContent />
    </Suspense>
  );
}