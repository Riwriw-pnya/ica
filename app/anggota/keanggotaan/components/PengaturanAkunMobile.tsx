"use client";

import React, { useState } from "react";

interface PengaturanAkunMobileProps {
  onBack?: () => void;
  onAjukanPenghapusan?: () => void;
}

export default function PengaturanAkunMobile({
  onBack,
  onAjukanPenghapusan,
}: PengaturanAkunMobileProps) {
  // State untuk Toggle Switch Notifikasi
  const [notifAplikasi, setNotifAplikasi] = useState(true);
  const [emailPengumuman, setEmailPengumuman] = useState(true);
  const [pesanWhatsapp, setPesanWhatsapp] = useState(false);

  return (
    <>
      {/* ANIMASI SLIDE IN DARI KANAN */}
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideInFromRight 0.28s cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }
      `}</style>

      {/* OVERLAY WRAPPER UTAMA */}
      <div className="fixed inset-0 z-50 bg-[#F7F4EE] animate-slide-in flex flex-col justify-between">
        {/* AREA KONTEN SCROLLABLE */}
        <div className="w-full max-w-md mx-auto h-full overflow-y-auto font-sans pt-3 pb-24 px-4 space-y-4 text-[#1F1B18]">
          {/* HEADER SECTION */}
          <div className="flex items-center gap-2.5 pt-1 pb-1">
            <button
              type="button"
              onClick={onBack}
              className="p-1 -ml-1 text-[#C85A17] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              aria-label="Kembali"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-base font-bold leading-tight text-[#1F1B18]">
                Pengaturan akun
              </h1>
              <p className="text-[11px] font-medium text-[#857B72]">
                Notifikasi, keamanan, dan data akun
              </p>
            </div>
          </div>

          {/* BANNER INFORMASI PRD TBD */}
          <div className="bg-[#F2EDE6] rounded-2xl p-3.5 border border-[#EAE4DC] flex items-start gap-3">
            <div className="w-5 h-5 rounded-full border border-[#8C827A] text-[#8C827A] flex items-center justify-center text-xs font-serif shrink-0 mt-0.5">
              i
            </div>
            <p className="text-[11px] text-[#59524C] leading-relaxed font-normal">
              [PRD TBD] Modul pengaturan akun belum ditetapkan. Nama, email, dan
              nomor WhatsApp masih diubah melalui admin wilayah.
            </p>
          </div>

          {/* CARD 1: NOTIFIKASI */}
          <div className="bg-white rounded-[22px] p-4 border border-[#EAE5DF] shadow-2xs space-y-4">
            <h2 className="text-[10px] font-bold text-[#8C827A] tracking-wider uppercase">
              NOTIFIKASI
            </h2>

            <div className="space-y-4 divide-y divide-[#F5F2ED]">
              {/* TOGGLE 1: NOTIFIKASI APLIKASI */}
              <div className="flex items-center justify-between pt-1">
                <div className="pr-3">
                  <h3 className="text-xs font-bold text-[#111111]">
                    Notifikasi aplikasi
                  </h3>
                  <p className="text-[11px] text-[#8C827A] leading-tight mt-0.5">
                    Slot kuota event, status pengajuan, masa berlaku.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifAplikasi(!notifAplikasi)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 cursor-pointer ${
                    notifAplikasi ? "bg-[#FA8C42]" : "bg-[#DCD6CE]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${
                      notifAplikasi ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* TOGGLE 2: EMAIL PENGUMUMAN ICA */}
              <div className="flex items-center justify-between pt-3">
                <div className="pr-3">
                  <h3 className="text-xs font-bold text-[#111111]">
                    Email pengumuman ICA
                  </h3>
                  <p className="text-[11px] text-[#8C827A] leading-tight mt-0.5">
                    Berita resmi dan kalender event.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailPengumuman(!emailPengumuman)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 cursor-pointer ${
                    emailPengumuman ? "bg-[#FA8C42]" : "bg-[#DCD6CE]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${
                      emailPengumuman ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* TOGGLE 3: PESAN WHATSAPP DARI ADMIN */}
              <div className="flex items-center justify-between pt-3">
                <div className="pr-3">
                  <h3 className="text-xs font-bold text-[#111111]">
                    Pesan WhatsApp dari admin
                  </h3>
                  <p className="text-[11px] text-[#8C827A] leading-tight mt-0.5">
                    Hanya untuk verifikasi dan pengajuan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPesanWhatsapp(!pesanWhatsapp)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 cursor-pointer ${
                    pesanWhatsapp ? "bg-[#FA8C42]" : "bg-[#DCD6CE]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${
                      pesanWhatsapp ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* CARD 2: KEAMANAN */}
          <div className="bg-white rounded-[22px] p-4 border border-[#EAE5DF] shadow-2xs space-y-3">
            <h2 className="text-[10px] font-bold text-[#8C827A] tracking-wider uppercase">
              KEAMANAN
            </h2>

            {/* ITEM: GANTI KATA SANDI */}
            <button
              type="button"
              onClick={() => alert("Form Ganti Kata Sandi")}
              className="w-full flex items-center justify-between pt-1 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-4.5 h-4.5 text-[#C85A17]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 0121 9z"
                  />
                </svg>
                <span className="text-xs font-bold text-[#111111]">
                  Ganti kata sandi
                </span>
              </div>
              <span className="text-[#A0958B] text-sm font-semibold">›</span>
            </button>
          </div>

          {/* SECTION TOMBOL HAPUS AKUN & FOOTER */}
          <div className="pt-2 space-y-2.5">
            <button
              type="button"
              onClick={
                onAjukanPenghapusan ||
                (() => alert("Pengajuan penghapusan akun dikirim"))
              }
              className="w-full py-3.5 px-4 rounded-full bg-white border border-[#F5C2C2] text-[#9E2A2A] text-xs font-bold shadow-2xs active:bg-[#FDF2F2] transition-colors cursor-pointer"
            >
              Ajukan penghapusan akun
            </button>

            <p className="text-[10px] text-[#8C827A] text-center leading-relaxed px-4 font-medium">
              Penghapusan akun diverifikasi admin ICA wilayah — arsip
              keanggotaan tetap disimpan organisasi.
            </p>
          </div>
        </div>

        {/* BOTTOM NAVIGATION BAR */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAE5DF] py-2 px-4 flex justify-around items-center z-50 max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-[#857B72]">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-[9px] font-medium">Home</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-[#857B72]">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-[9px] font-medium">Direktori</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-[#857B72]">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="text-[9px] font-medium">Store</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-[#857B72]">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-[9px] font-medium">Event</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-[#D96B27]">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-[9px] font-bold">Profil</span>
          </button>
        </div>
      </div>
    </>
  );
}