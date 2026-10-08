"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardIcon from "@/components/anggota/DashboardIcon";

export default function SelectRolePage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<"member" | "cattery">("cattery");

    const handleNext = () => {
      if (selectedRole === "cattery") {
          router.push("/mobile/auth-option?role=cattery");
      } else {
          router.push("/mobile/auth-option?role=member");
      }
    };
    const handleBackToOnboarding = () => {
      router.push("/mobile/onboarding?step=last");
    };

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#2D2825] font-sans flex flex-col justify-between max-w-md mx-auto p-5 relative overflow-hidden select-none">
      
      {/* Sisi Atas: Tombol Back, Tag, Judul, & Pilihan Role */}
      <div className="space-y-5">
        {/* Tombol Back */}
        <button
          type="button"
          onClick={handleBackToOnboarding}
          className="text-[#F05A1B] hover:text-[#D95D1E] active:scale-95 transition-all cursor-pointer pt-2"
          aria-label="Kembali"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Header Teks */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-[#FFF0E5] text-[#C85D1E] text-[10px] font-bold">
            Lets get started
          </span>

          <h1 className="font-extrabold text-2xl text-[#1A1513] leading-tight">
            Anda masuk sebagai siapa hari ini?
          </h1>

          <p className="text-xs text-[#8C8074] leading-relaxed">
            Pilih satu supaya isi aplikasi menyesuaikan — bisa diganti nanti lewat pengaturan akun.
          </p>
        </div>

        {/* Option Cards */}
        <div className="space-y-3.5 pt-2">
          
          {/* Card 1: Saya Member */}
          <div
            onClick={() => setSelectedRole("member")}
            className={`rounded-[24px] bg-white p-4 transition-all cursor-pointer border ${
              selectedRole === "member"
                ? "border-[#F05A1B] shadow-sm"
                : "border-[#EEDFD5] hover:border-[#FCE3D2]"
            }`}
          >
            {/* Header Card Member */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F4EFE9]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#FFF5EC] border border-[#FDE3CE] flex items-center justify-center text-[#D95D1E] shrink-0">
                  {/* Icon Kucing */}
                  <DashboardIcon name="cat" size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#1A1513]">Saya Member</h3>
                  <p className="text-[11px] text-[#8C8074]">Pemilik atau pencinta kucing</p>
                </div>
              </div>

              {/* Custom Radio Circle */}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  selectedRole === "member"
                    ? "border-[#F05A1B] bg-white"
                    : "border-[#D9D0C7]"
                }`}
              >
                {selectedRole === "member" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F05A1B]" />
                )}
              </div>
            </div>

            {/* List Poin Member */}
            <div className="pt-3 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[#D95D1E] text-xs font-bold mt-0.5">✓</span>
                <span className="text-[11px] font-medium text-[#70665D]">Kartu anggota dan sertifikat kucing digital</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#D95D1E] text-xs font-bold mt-0.5">✓</span>
                <span className="text-[11px] font-medium text-[#70665D]">Cari cattery, indukan, dan anabul open adopsi</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#D95D1E] text-xs font-bold mt-0.5">✓</span>
                <span className="text-[11px] font-medium text-[#70665D]">Daftar cat show, diklat, dan event ICA</span>
              </div>
            </div>
          </div>

          {/* Card 2: Saya Cattery */}
          <div
            onClick={() => setSelectedRole("cattery")}
            className={`rounded-[24px] bg-white p-4 transition-all cursor-pointer border ${
              selectedRole === "cattery"
                ? "border-[#F05A1B] shadow-sm"
                : "border-[#EEDFD5] hover:border-[#FCE3D2]"
            }`}
          >
            {/* Header Card Cattery */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F4EFE9]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#EAF3FA] border border-[#D2E4F5] flex items-center justify-center text-[#2B78C5] shrink-0">
                  {/* Icon Rumah */}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#1A1513]">Saya Cattery</h3>
                  <p className="text-[11px] text-[#8C8074]">Admin atau pemilik cattery</p>
                </div>
              </div>

              {/* Custom Radio Circle */}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  selectedRole === "cattery"
                    ? "border-[#F05A1B] bg-white"
                    : "border-[#D9D0C7]"
                }`}
              >
                {selectedRole === "cattery" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F05A1B]" />
                )}
              </div>
            </div>

            {/* List Poin Cattery */}
            <div className="pt-3 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[#D95D1E] text-xs font-bold mt-0.5">✓</span>
                <span className="text-[11px] font-medium text-[#70665D]">Kirim mating report dan catat kelahiran</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#D95D1E] text-xs font-bold mt-0.5">✓</span>
                <span className="text-[11px] font-medium text-[#70665D]">Kelola indukan, silsilah, dan data adopter</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#D95D1E] text-xs font-bold mt-0.5">✓</span>
                <span className="text-[11px] font-medium text-[#70665D]">Pantau skor kesehatan dan status verifikasi</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sisi Bawah: Tombol Lanjut */}
      <div className="pt-6 pb-2">
        <button
          type="button"
          onClick={handleNext}
          className="w-full rounded-full bg-gradient-to-b from-[#FF9B54] to-[#F05A1B] py-3.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(240,90,27,0.3)] active:scale-95 transition-all cursor-pointer text-center"
        >
          Lanjut
        </button>
      </div>

    </div>
  );
}