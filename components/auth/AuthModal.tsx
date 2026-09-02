"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register";
}

export default function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<"member" | "cattery">("member");

  if (!isOpen) return null;

  const isLogin = mode === "login";

  const handleContinue = () => {
    onClose();
    router.push(`/auth/${mode}/${selectedType}`);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-[2px] p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[28px] p-7 sm:p-8 max-w-[620px] w-full shadow-[0_20px_50px_rgba(0,0,0,0.12)] relative text-[#231A14] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#8C8078] hover:text-[#231A14] transition cursor-pointer p-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-xl font-bold tracking-tight text-[#231A14]">Pilih tipe akun</h3>
        <p className="text-xs text-[#8C8078] mt-1 font-normal">
          Akses dan menu yang Anda lihat menyesuaikan tipe akun ini.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div
            onClick={() => setSelectedType("member")}
            className={`cursor-pointer rounded-[22px] p-5 border-2 transition-all duration-200 relative select-none ${
              selectedType === "member"
                ? "border-[#FF9F5C] bg-[#FFF6EC]"
                : "border-[#E9E2DC] bg-white hover:border-[#FFC894]"
            }`}
          >
            {selectedType !== "member" && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-[#E9E2DC]" />
            )}
            {selectedType === "member" && (
              <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gradient-to-b from-[#FFB16C] to-[#FF9F5C] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(255,159,92,0.45)]">
                <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <div className="w-11 h-11 rounded-2xl bg-[#FFEBD6] flex items-center justify-center text-[#C8601D] mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 className="font-bold text-sm text-[#231A14]">
              {isLogin ? "Login as Member" : "Daftar sebagai Member"}
            </h4>
            <p className="text-[11px] text-[#8C8078] mt-1.5 leading-relaxed">
              Keanggotaan pribadi: berita, cattery names, event, dan status member.
            </p>
          </div>

          <div
            onClick={() => setSelectedType("cattery")}
            className={`cursor-pointer rounded-[22px] p-5 border-2 transition-all duration-200 relative select-none ${
              selectedType === "cattery"
                ? "border-[#FF9F5C] bg-[#FFF6EC]"
                : "border-[#E9E2DC] bg-white hover:border-[#FFC894]"
            }`}
          >
            {selectedType !== "cattery" && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-[#E9E2DC]" />
            )}
            {selectedType === "cattery" && (
              <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gradient-to-b from-[#FFB16C] to-[#FF9F5C] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(255,159,92,0.45)]">
                <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <div className="w-11 h-11 rounded-2xl bg-[#F7F4F1] flex items-center justify-center text-[#8C8078] mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h4 className="font-bold text-sm text-[#231A14]">
              {isLogin ? "Login as Cattery" : "Daftar sebagai Cattery"}
            </h4>
            <p className="text-[11px] text-[#8C8078] mt-1.5 leading-relaxed">
              Kelola cattery: data kucing, mating report, dan pengajuan ke admin ICA.
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between pt-1">
          <p className="text-xs text-[#8C8078]">
            Anda akan masuk ke <span className="font-medium text-[#4A3D34]">{selectedType === "member" ? "Member Portal" : "Cattery Portal"}.</span>
          </p>

          <div className="flex gap-2.5 items-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-gradient-to-b from-white to-[#F2EFE9] text-[#7A6E65] font-bold text-xs shadow-[0_3px_8px_rgba(0,0,0,0.08)] border border-[#E9E2DC] hover:-translate-y-0.5 hover:text-[#231A14] hover:brightness-95 active:translate-y-0.5 active:shadow-[0_1px_4px_rgba(0,0,0,0.1)] transition-all duration-150 cursor-pointer"
            >
              Batal
            </button>

            {/* Tombol Lanjutkan: Gradasi Soft Orange ke Orange + Teks Putih */}
            <button
              onClick={handleContinue}
              className="px-7 py-2.5 rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs shadow-[0_4px_12px_rgba(238,107,40,0.25)] border-t border-[#FFE5D4] hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-all duration-150 cursor-pointer"
            >
              Lanjutkan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}