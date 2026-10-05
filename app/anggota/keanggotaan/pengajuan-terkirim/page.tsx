"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface StepConfig {
  stepNumber: number;
  badgeText: string;
  badgeStyle: string;
  title: string;
  desc: string;
  timeStr: string;
}

const STEPS_DATA: StepConfig[] = [
  {
    stepNumber: 1,
    badgeText: "Diterima",
    badgeStyle: "bg-[#EBF7EE] text-[#2E7D32]",
    title: "Pengajuan dikirim",
    desc: "Form cattery dan data pet diterima sistem ICA. Berkas Anda masuk ke antrean.",
    timeStr: "09:12",
  },
  {
    stepNumber: 2,
    badgeText: "Direview",
    badgeStyle: "bg-[#EBF3FE] text-[#1E63D0]",
    title: "Data sedang direview admin wilayah",
    desc: "Admin memeriksa nama cattery, alamat, dan pedigree pet yang didaftarkan. Anda tidak perlu melakukan apa pun saat ini.",
    timeStr: "09:14",
  },
  {
    stepNumber: 3,
    badgeText: "Pemeriksaan tempat",
    badgeStyle: "bg-[#FFF4EC] text-[#D96B27]",
    title: "Pemeriksaan tempat dijadwalkan",
    desc: "Admin wilayah akan berkunjung ke alamat cattery pada Sen, 5 Okt 2026 pukul 10:00. Siapkan kandang, area breeding, dan dokumen pedigree.",
    timeStr: "09:21",
  },
  {
    stepNumber: 4,
    badgeText: "Disetujui",
    badgeStyle: "bg-[#EBF7EE] text-[#2E7D32]",
    title: "Pengajuan cattery disetujui",
    desc: "Cattery Anda memenuhi standar ICA. Kode cattery sedang diterbitkan oleh sekretariat.",
    timeStr: "09:28",
  },
  {
    stepNumber: 5,
    badgeText: "Aktif",
    badgeStyle: "bg-[#EBF7EE] text-[#2E7D32]",
    title: "Kode cattery terbit",
    desc: "Kode ICA-CTY-2026-0517 aktif. Masuk ke portal cattery dengan email akun ini untuk mulai mengirim mating report.",
    timeStr: "09:35",
  },
];

const TAHAPAN_LIST = [
  {
    id: 1,
    title: "Pengajuan dikirim",
    desc: "Data tercatat di sistem ICA",
    time: "09:12",
  },
  {
    id: 2,
    title: "Review data admin wilayah",
    desc: "Cek nama cattery, alamat, dan pedigree",
    time: "09:14",
  },
  {
    id: 3,
    title: "Pemeriksaan tempat",
    desc: "Kunjungan admin ke alamat cattery",
    time: "09:21",
  },
  {
    id: 4,
    title: "Disetujui",
    desc: "Memenuhi standar breeding ICA",
    time: "09:28",
  },
  {
    id: 5,
    title: "Kode cattery terbit",
    desc: "Akses portal cattery aktif",
    time: "09:35",
  },
];

const RIWAYAT_ALL_ITEMS = [
  {
    id: 5,
    title: "Kode cattery diterbitkan",
    desc: "ICA-CTY-2026-0517 · akses portal cattery aktif.",
    sender: "Sekretariat ICA",
    time: "09:35",
    bgColor: "bg-[#EBF7EE]",
    iconColor: "text-[#2E7D32]",
  },
  {
    id: 4,
    title: "Pemeriksaan selesai · disetujui",
    desc: "Hasil kunjungan memenuhi standar. Diteruskan ke sekretariat untuk penerbitan kode.",
    sender: "Admin ICA wilayah",
    time: "09:28",
    bgColor: "bg-[#EBF7EE]",
    iconColor: "text-[#2E7D32]",
  },
  {
    id: 3,
    title: "Data lolos review",
    desc: "Pemeriksaan tempat dijadwalkan Sen, 5 Okt 2026 · 10:00.",
    sender: "Admin ICA wilayah",
    time: "09:21",
    bgColor: "bg-[#FFF4EC]",
    iconColor: "text-[#D96B27]",
  },
  {
    id: 2,
    title: "Masuk antrean review",
    desc: "Pengajuan diteruskan ke admin wilayah untuk pengecekan data.",
    sender: "Admin ICA wilayah",
    time: "09:14",
    bgColor: "bg-[#EBF3FE]",
    iconColor: "text-[#1E63D0]",
  },
  {
    id: 1,
    title: "Pengajuan dikirim",
    desc: "Form cattery dan data pet diterima sistem ICA.",
    sender: "Sistem ICA",
    time: "09:12",
    bgColor: "bg-[#F5F2ED]",
    iconColor: "text-[#857B72]",
  },
];

export default function PengajuanTerkirimPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Auto-step berjalan tiap 4 detik (4000ms)
  useEffect(() => {
    if (currentStep >= 5) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < 5 ? prev + 1 : prev));
    }, 4000);

    return () => clearInterval(timer);
  }, [currentStep]);

  const activeStepData = STEPS_DATA[currentStep - 1];

  // Riwayat update dinamis sesuai step berjalan
  const visibleRiwayatItems = RIWAYAT_ALL_ITEMS.filter(
    (item) => item.id <= currentStep
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F7F4EF] font-sans text-[#1F1B18]">
      <div className="w-full max-w-md mx-auto min-h-screen pb-12 pt-3 px-4 space-y-3.5 relative">
        {/* HEADER BAR */}
        <div className="flex items-center gap-3 pt-1 pb-1">
          <Link
            href="/anggota/keanggotaan"
            className="p-1 -ml-1 text-[#D96B27] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
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
          </Link>
          <div>
            <h1 className="text-base font-bold leading-tight text-[#1F1B18]">
              Status pengajuan cattery
            </h1>
            <p className="text-[11px] font-medium text-[#857B72]">
              CTY-APP-2026-0318
            </p>
          </div>
        </div>

        {/* TOP BANNER NOTIFIKASI GREEN */}
        <div className="bg-[#EBF7EE] border border-[#C6EAD0] rounded-2xl p-3.5 flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-[#2E7D32] flex items-center justify-center shrink-0 text-white mt-0.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#1E5624]">
              Pengajuan cattery terkirim
            </h2>
            <p className="text-[10px] text-[#2E7D32] leading-relaxed mt-0.5">
              Setiap perubahan status dikirim lewat notifikasi aplikasi dan
              WhatsApp. Halaman ini juga bisa dibuka dari Profil.
            </p>
          </div>
        </div>

        {/* CARD STATUS UTAMA */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${activeStepData.badgeStyle}`}
            >
              {activeStepData.badgeText}
            </span>
            <span className="text-[10px] font-medium text-[#857B72]">
              Tahap {currentStep} dari 5
            </span>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#1F1B18]">
              {activeStepData.title}
            </h3>
            <p className="text-[11px] text-[#857B72] leading-relaxed mt-1">
              {activeStepData.desc}
            </p>
          </div>

          {/* Progress Bar Oranye Meluncur Halus sampai Penuh (20% - 100%) */}
          <div className="w-full h-1.5 bg-[#F5EFE8] rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-[#D96B27] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>

          <div className="flex items-center gap-1.5 pt-0.5 text-[10px] text-[#A0958B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D96B27] animate-pulse" />
            <span>
              Status diperbarui otomatis · terakhir {activeStepData.timeStr}
            </span>
          </div>
        </div>

        {/* TAHAPAN TIMELINE CARD */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#857B72]">
            Tahapan
          </h3>

          <div className="relative pl-6 space-y-4 pt-1">
            {TAHAPAN_LIST.map((item, idx) => {
              const itemStep = item.id;
              // Jika item sudah dilewati ATAU jika sudah mencapai step 5 (termasuk item 5), jadikan status diselesaikan (hijau)
              const isFinished =
                itemStep < currentStep || (currentStep === 5 && itemStep === 5);
              const isCurrentActive =
                itemStep === currentStep && currentStep !== 5;

              return (
                <div key={item.id} className="relative flex items-start justify-between">
                  {/* Garis Vertikal */}
                  {idx < TAHAPAN_LIST.length - 1 && (
                    <div
                      className={`absolute left-[-15px] top-3.5 bottom-[-16px] w-[2px] transition-colors duration-500 ${
                        itemStep < currentStep ? "bg-[#2E7D32]" : "bg-[#EAE5DF]"
                      }`}
                    />
                  )}

                  {/* Node Icon */}
                  <div className="absolute left-[-20px] top-0.5 z-10 flex items-center justify-center">
                    {isFinished ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-[#2E7D32] flex items-center justify-center text-white transition-all duration-300">
                        <svg
                          className="w-2.5 h-2.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    ) : isCurrentActive ? (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-[#D96B27] bg-white flex items-center justify-center transition-all duration-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D96B27]" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-[#C5BCB3] bg-white transition-all duration-300" />
                    )}
                  </div>

                  {/* Text Label */}
                  <div className="pr-2">
                    <p
                      className={`text-xs font-bold transition-colors duration-300 ${
                        isFinished
                          ? "text-[#1F1B18]"
                          : isCurrentActive
                          ? "text-[#D96B27]"
                          : "text-[#A0958B]"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-[10px] text-[#857B72] mt-0.5">
                      {item.desc}
                    </p>
                  </div>

                  {/* Time Stamp */}
                  <span className="text-[10px] text-[#A0958B] shrink-0 font-medium">
                    {item.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CARD RIWAYAT UPDATE */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#1F1B18]">
              Riwayat update
            </h3>
            <span className="text-[11px] font-medium text-[#857B72]">
              {visibleRiwayatItems.length} update
            </span>
          </div>

          <div className="space-y-3 divide-y divide-[#F5EFE8]">
            {visibleRiwayatItems.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-start gap-3 ${
                  idx > 0 ? "pt-3" : ""
                }`}
              >
                {/* Bell Icon */}
                <div
                  className={`w-9 h-9 rounded-xl ${item.bgColor} ${item.iconColor} flex items-center justify-center shrink-0 mt-0.5`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-[#1F1B18] truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-[#A0958B] shrink-0 font-medium">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#524B43] mt-0.5 leading-normal">
                    {item.desc}
                  </p>
                  <p className="text-[10px] text-[#A0958B] mt-1 font-medium">
                    {item.sender}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RINGKASAN PENGAJUAN CARD */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#857B72]">
            Ringkasan Pengajuan
          </h3>

          <div className="space-y-2.5 text-xs divide-y divide-[#F5EFE8]">
            <div className="flex justify-between items-center pt-1">
              <span className="text-[#857B72]">Nama cattery</span>
              <span className="font-bold text-[#1F1B18]">Auroria</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[#857B72]">Wilayah</span>
              <span className="font-bold text-[#1F1B18]">Semarang</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[#857B72]">Ras</span>
              <span className="font-bold text-[#1F1B18]">Scottish Fold</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[#857B72]">Pet didaftarkan</span>
              <span className="font-bold text-[#1F1B18]">
                1 kucing · 1 ber-pedigree
              </span>
            </div>
          </div>

          <button
            type="button"
            className="w-full mt-2 py-2.5 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] text-xs font-bold text-[#524B43] flex items-center justify-center gap-2 hover:bg-[#F5F2ED] transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-[#857B72]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>Hubungi admin wilayah</span>
          </button>
        </div>
      </div>
    </div>
  );
}