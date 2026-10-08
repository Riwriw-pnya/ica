"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Data untuk 3 Halaman Onboarding
const ONBOARDING_DATA = [
  {
    id: 1,
    tag: "Selamat datang",
    title: "Halo, pencinta kucing!",
    desc: "Gabung ICA dan jadi pet owner terverifikasi. Data kucing Anda tercatat rapi, silsilahnya sah, dan diakui sampai ke luar negeri lewat keanggotaan penuh FIFe.",
    bgColor: "bg-[#FFF2E5]",
    tagBg: "bg-[#FFE8DB] text-[#C85D1E]",
    iconType: "paw",
    stats: [
      { value: "23", label: "TAHUN" },
      { value: "34", label: "WILAYAH" },
      { value: "1", label: "KARTU DIGITAL" },
    ],
    features: [
      "Kartu anggota digital yang selalu bisa dibuka",
      "Sertifikat pedigree kucing tersimpan di satu tempat",
      "Riwayat vaksin dan microchip lengkap per kucing",
    ],
  },
  {
    id: 2,
    tag: "Cattery dan adopsi",
    title: "Cari indukan sampai anabul adopsi",
    desc: "Telusuri cattery terverifikasi di seluruh Indonesia, intip silsilah indukannya, lalu hubungi pemiliknya langsung. Yang sedang open adopsi juga tampil di sini.",
    bgColor: "bg-[#EAF3FA]",
    tagBg: "bg-[#E0EEF9] text-[#2B78C5]",
    iconType: "search",
    stats: [
      { value: "412", label: "CATTERY" },
      { value: "38", label: "RAS" },
      { value: "96", label: "OPEN ADOPSI" },
    ],
    features: [
      "Filter ras, wilayah, dan skor kesehatan cattery",
      "Silsilah tiga generasi sebelum Anda memutuskan",
      "Hubungi pemilik cattery tanpa perantara",
    ],
  },
  {
    id: 3,
    tag: "Event dan kompetisi",
    title: "Ikut cat show, kejar gelarnya",
    desc: "Daftar cat show, diklat, dan kompetisi ICA langsung dari ponsel. Semua prestasi kucing Anda otomatis menempel di profilnya.",
    bgColor: "bg-[#FFF2E5]",
    tagBg: "bg-[#FFE8DB] text-[#C85D1E]",
    iconType: "trophy",
    stats: [
      { value: "24", label: "EVENT SETAHUN" },
      { value: "9", label: "KELAS LOMBA" },
      { value: "3", label: "GELAR NASIONAL" },
    ],
    features: [
      "Pendaftaran event dan pembayaran dalam satu alur",
      "Jadwal ring dan hasil penjurian bisa dipantu",
      "Diklat cattery untuk yang ingin serius beternak",
    ],
  },
];

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);

  // Jika dipanggil dari select-role dengan ?step=last, langsung set ke slide terakhir
  useEffect(() => {
    if (searchParams.get("step") === "last") {
      setCurrentStep(ONBOARDING_DATA.length - 1);
    }
  }, [searchParams]);

  const data = ONBOARDING_DATA[currentStep];
  const isLastStep = currentStep === ONBOARDING_DATA.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      router.push("/mobile/select-role");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const handleSkip = () => {
    router.push("/mobile/select-role");
  };

  return (
    <div className="w-full h-dvh flex flex-col justify-between text-[#2D2825] font-sans relative select-none bg-[#FAF8F5]">
      <style jsx global>{`
        @keyframes floatBox {
          0%, 100% {
            transform: translateY(0px) rotate(-1.5deg);
          }
          50% {
            transform: translateY(-8px) rotate(1.5deg);
          }
        }
        .animate-float-box {
          animation: floatBox 3.5s ease-in-out infinite;
        }

        @keyframes rotateIcon {
          0%, 100% {
            transform: rotate(-8deg) scale(1);
          }
          50% {
            transform: rotate(8deg) scale(1.05);
          }
        }
        .animate-rotate-icon {
          animation: rotateIcon 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* HEADER */}
      <header className="shrink-0 flex items-center justify-between px-5 py-3.5 w-full bg-[#FAF8F5] border-b border-[#EEDFD5]/40 z-20">
        <div className="flex items-center gap-2">
          <div className="bg-[#FF9B54] text-white font-bold text-[10px] px-2 py-1.5 rounded-lg shadow-2xs">
            ICA
          </div>
          <span className="text-xs font-bold text-[#8C8074]">
            Kenalan dulu, yuk
          </span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="text-xs font-bold text-[#D95D1E] hover:text-[#C85D1E] active:scale-95 transition-all cursor-pointer"
        >
          Lewati
        </button>
      </header>

      {/* KONTEN TENGAH */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        <div className={`rounded-[32px] ${data.bgColor} p-6 relative overflow-hidden transition-colors duration-500`}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/30 translate-x-8 -translate-y-8 pointer-events-none" />

          <div className="flex justify-center mb-6 pt-2">
            <div className="w-20 h-20 bg-white rounded-[24px] shadow-md flex items-center justify-center animate-float-box">
              <div className="animate-rotate-icon">
                {data.iconType === "paw" && (
                  <svg className="w-9 h-9 text-[#D95D1E]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 10c-3.2 0-6 2.1-6 5.2 0 2.2 2.1 3.8 6 3.8s6-1.6 6-3.8c0-3.1-2.8-5.2-6-5.2z" />
                    <circle cx="5" cy="11.5" r="1.75" />
                    <circle cx="9" cy="7.5" r="2" />
                    <circle cx="15" cy="7.5" r="2" />
                    <circle cx="19" cy="11.5" r="1.75" />
                  </svg>
                )}
                {data.iconType === "search" && (
                  <svg className="w-9 h-9 text-[#2B78C5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
                {data.iconType === "trophy" && (
                  <svg className="w-9 h-9 text-[#D95D1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14M5 3v4a5 5 0 005 5h4a5 5 0 005-5V3M5 3H3v4a3 3 0 003 3h1M19 3h2v4a3 3 0 01-3 3h-1M12 12v5m-4 4h8" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          <div className={`grid ${data.stats.length === 2 ? "grid-cols-2" : "grid-cols-3"} gap-2.5`}>
            {data.stats.map((stat, idx) => (
              <div key={idx} className="bg-white/90 backdrop-blur-xs rounded-[18px] p-2.5 text-center shadow-2xs">
                <span className="block font-extrabold text-base text-[#1A1513] leading-tight">
                  {stat.value}
                </span>
                <span className="block text-[8px] font-bold text-[#8C8074] tracking-wider mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${data.tagBg}`}>
            {data.tag}
          </span>

          <h2 className="font-extrabold text-xl text-[#1A1513] leading-tight">
            {data.title}
          </h2>

          <p className="text-xs text-[#8C8074] leading-relaxed">
            {data.desc}
          </p>
        </div>

        <div className="space-y-2.5 pt-1 pb-4">
          {data.features.map((feat, idx) => (
            <div key={idx} className="rounded-2xl border border-[#EEDFD5] bg-white p-3.5 flex items-center gap-3 shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-[#EAF8F0] text-[#1B804D] flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-[#231A14] leading-snug">
                {feat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="shrink-0 w-full bg-[#FAF8F5]/95 backdrop-blur-md px-5 py-4 border-t border-[#EEDFD5]/50 flex items-center justify-between z-20">
        <div className="flex items-center gap-1.5">
          {ONBOARDING_DATA.map((_, idx) => (
            <span
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? "w-7 bg-[#FF9B54]"
                  : "w-2.5 bg-[#EEDFD5]"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-full bg-white border border-[#EEDFD5] px-4 py-2.5 text-xs font-bold text-[#1A1513] shadow-2xs hover:bg-[#FAF7F5] active:scale-95 transition-all cursor-pointer"
          >
            Kembali
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer border-t border-[#FFE5D4]"
          >
            <span>{isLastStep ? "Mulai sekarang" : "Lanjut"}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default function OnboardingSlider() {
  return (
    <Suspense fallback={<div className="h-dvh bg-[#FAF8F5]" />}>
      <OnboardingContent />
    </Suspense>
  );
}