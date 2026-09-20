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
  
  // State modal khusus admin & tipe admin terpilih
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedAdminType, setSelectedAdminType] = useState<"regional" | "superadmin">("regional");

  if (!isOpen) return null;

  const isLogin = mode === "login";

  const handleContinue = () => {
    onClose();
    router.push(`/auth/${mode}/${selectedType}`);
  };

  const handleAdminContinue = () => {
  setIsAdminModalOpen(false);
  onClose();
  if (selectedAdminType === "superadmin") {
    router.push("/superadmin/dashboard");
  } else {
    router.push("/regionaladmin/dashboard");
  }
};

  return (
    <>
      {/* MODAL UTAMA (MEMBER / CATTERY) */}
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
            {/* CARD MEMBER */}
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

            {/* CARD CATTERY */}
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

          {/* TEKS BUTTON AKSES ADMIN */}
          <div className="mt-5 text-center">
            <span className="text-xs text-[#8C8078]">Are you an Admin? </span>
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(true)}
              className="text-xs font-bold text-[#EE6B28] hover:underline cursor-pointer"
            >
              [ Admin Login ]
            </button>
          </div>

          {/* FOOTER ACTION */}
          <div className="mt-6 flex items-center justify-between pt-3 border-t border-[#F2EFE9]">
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

      {/* MODAL ADMIN (SEKUNDER) */}
      {isAdminModalOpen && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/45 backdrop-blur-[3px] p-4 animate-in fade-in duration-200"
          onClick={() => setIsAdminModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[28px] p-7 sm:p-8 max-w-[620px] w-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative text-[#231A14] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="absolute top-6 right-6 text-[#8C8078] hover:text-[#231A14] transition cursor-pointer p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-2.5">
              <span className="bg-[#FFF2E8] text-[#F05A1B] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#FCE3D2]">
                Admin Area
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-[#231A14] mt-2">Pilih Portal Administrator</h3>
            <p className="text-xs text-[#8C8078] mt-1 font-normal">
              Akses khusus untuk pengurus wilayah dan pengelola pusat ICA.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {/* CARD REGIONAL ADMIN */}
              <div
                onClick={() => setSelectedAdminType("regional")}
                className={`cursor-pointer rounded-[22px] p-5 border-2 transition-all duration-200 relative select-none ${
                  selectedAdminType === "regional"
                    ? "border-[#FF9F5C] bg-[#FFF6EC]"
                    : "border-[#E9E2DC] bg-white hover:border-[#FFC894]"
                }`}
              >
                {selectedAdminType !== "regional" && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-[#E9E2DC]" />
                )}
                {selectedAdminType === "regional" && (
                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gradient-to-b from-[#FFB16C] to-[#FF9F5C] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(255,159,92,0.45)]">
                    <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="w-11 h-11 rounded-2xl bg-[#E8F3FF] flex items-center justify-center text-[#1E62D0] mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-sm text-[#231A14]">
                  Login as Regional Admin
                </h4>
                <p className="text-[11px] text-[#8C8078] mt-1.5 leading-relaxed">
                  Pengelolaan wilayah: verifikasi member daerah, event regional, dan persetujuan lokal.
                </p>
              </div>

              {/* CARD SUPERADMIN */}
              <div
                onClick={() => setSelectedAdminType("superadmin")}
                className={`cursor-pointer rounded-[22px] p-5 border-2 transition-all duration-200 relative select-none ${
                  selectedAdminType === "superadmin"
                    ? "border-[#FF9F5C] bg-[#FFF6EC]"
                    : "border-[#E9E2DC] bg-white hover:border-[#FFC894]"
                }`}
              >
                {selectedAdminType !== "superadmin" && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-[#E9E2DC]" />
                )}
                {selectedAdminType === "superadmin" && (
                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gradient-to-b from-[#FFB16C] to-[#FF9F5C] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(255,159,92,0.45)]">
                    <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="w-11 h-11 rounded-2xl bg-[#F0E6FF] flex items-center justify-center text-[#7029E0] mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-bold text-sm text-[#231A14]">
                  Login as Superadmin
                </h4>
                <p className="text-[11px] text-[#8C8078] mt-1.5 leading-relaxed">
                  Akses penuh sistem: master data pedigree, persetujuan cattery nasional, dan aturan sistem.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between pt-1">
              <p className="text-xs text-[#8C8078]">
                Masuk ke <span className="font-medium text-[#4A3D34]">{selectedAdminType === "regional" ? "Admin Regional Portal" : "Superadmin Portal"}.</span>
              </p>

              <div className="flex gap-2.5 items-center">
                <button
                  onClick={() => setIsAdminModalOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-b from-white to-[#F2EFE9] text-[#7A6E65] font-bold text-xs shadow-[0_3px_8px_rgba(0,0,0,0.08)] border border-[#E9E2DC] hover:-translate-y-0.5 hover:text-[#231A14] hover:brightness-95 active:translate-y-0.5 active:shadow-[0_1px_4px_rgba(0,0,0,0.1)] transition-all duration-150 cursor-pointer"
                >
                  Kembali
                </button>

                <button
                  onClick={handleAdminContinue}
                  className="px-7 py-2.5 rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs shadow-[0_4px_12px_rgba(238,107,40,0.25)] border-t border-[#FFE5D4] hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-all duration-150 cursor-pointer"
                >
                  Lanjutkan Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}