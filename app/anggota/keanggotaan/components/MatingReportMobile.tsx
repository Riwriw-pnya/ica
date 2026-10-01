"use client";

import React, { useState } from "react";

export interface KittenData {
  id: string;
  name: string;
  gender: string;
  breed: string;
  code: string;
  microchip: string;
  isSaved?: boolean;
}

interface MatingReportMobileProps {
  onBack?: () => void;
  onSuccessSave?: (kittens: KittenData[]) => void;
}

export default function MatingReportMobile({
  onBack,
  onSuccessSave,
}: MatingReportMobileProps) {
  // State Data Perkawinan
  const [pejantan, setPejantan] = useState("Auroria Bagas");
  const [indukan, setIndukan] = useState("Auroria Sari");
  const [tanggalMating, setTanggalMating] = useState("18 Jul 2026");
  const [tanggalLahir, setTanggalLahir] = useState("18 Sep 2026");

  // State Counter Anak & Log
  const [jumlahAnak, setJumlahAnak] = useState<number>(1);
  const [kittens, setKittens] = useState<KittenData[]>([
    {
      id: "k1",
      name: "Auroria Mochi",
      gender: "Female",
      breed: "Persian",
      code: "PER n 22",
      microchip: "956000010998822",
      isSaved: true,
    },
  ]);

  // State Loading & Pop-up Notifikasi
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const savedCount = kittens.filter((k) => k.isSaved).length;

  const handleDecrement = () => {
    if (jumlahAnak > 1) {
      const newCount = jumlahAnak - 1;
      setJumlahAnak(newCount);
      setKittens((prev) => prev.slice(0, newCount));
    }
  };

  const handleIncrement = () => {
    if (jumlahAnak < 10) {
      const newCount = jumlahAnak + 1;
      setJumlahAnak(newCount);
      setKittens((prev) => {
        const index = newCount;
        return [
          ...prev,
          {
            id: `k_${Date.now()}_${index}`,
            name: `Anak ke-${index} . belum dinamain`,
            gender: index % 2 === 0 ? "Male" : "Female",
            breed: "Persian",
            code: "PER n 22",
            microchip: `9560000100000${index}`,
            isSaved: false,
          },
        ];
      });
    }
  };

  const handleSave = () => {
    if (isSaving) return;
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);

      const allSaved = kittens.map((k) => ({ ...k, isSaved: true }));
      setKittens(allSaved);

      if (onSuccessSave) {
        setTimeout(() => {
          onSuccessSave(allSaved);
        }, 1200);
      }
    }, 800);
  };

  return (
    <>
      {/* STYLE ANIMASI SLIDE IN */}
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
          animation: slideInFromRight 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* OVERLAY UTAMA (FIXED FULLSCREEN) */}
      <div className="fixed inset-0 z-50 bg-[#FBF9F5] animate-slide-in flex flex-col justify-between">
        
        {/* AREA KONTEN FORM (DIBERI OVERFLOW SCROLL SENDIRI & PB CUKUP AGAR KONTEN BAWAH TIDAK TERTUTUP) */}
        <div className="w-full max-w-md mx-auto h-full overflow-y-auto font-sans pt-3 pb-36 px-4 space-y-4 text-[#1F1B18]">
          
          {/* HEADER SECTION */}
          <div className="flex items-center gap-3 pt-1 pb-1">
            <button
              type="button"
              onClick={onBack}
              className="p-1 -ml-1 text-[#1F1B18] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              aria-label="Kembali"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-base font-bold leading-tight">Mating report</h1>
              <p className="text-[11px] font-medium text-[#857B72]">
                {pejantan} • {indukan}
              </p>
            </div>
          </div>

          {/* CARD 1: DATA PERKAWINAN */}
          <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3.5">
            <h2 className="text-[10px] font-bold text-[#857B72] tracking-wider uppercase">
              DATA PERKAWINAN
            </h2>

            {/* DROPDOWN PEJANTAN */}
            <div className="bg-[#FAF8F5] border border-[#EAE5DF] rounded-xl p-3 flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#EBF3FE] text-[#3B82F6] flex items-center justify-center text-xs font-bold shrink-0">
                  ♂
                </div>
                <div>
                  <p className="text-[10px] text-[#857B72] font-medium leading-none">Pejantan</p>
                  <p className="text-xs font-bold text-[#1F1B18] mt-1">{pejantan}</p>
                </div>
              </div>
              <svg className="w-4 h-4 text-[#A0958B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* DROPDOWN INDUKAN */}
            <div className="bg-[#FAF8F5] border border-[#EAE5DF] rounded-xl p-3 flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#FDF0F0] text-[#EF4444] flex items-center justify-center text-xs font-bold shrink-0">
                  ♀
                </div>
                <div>
                  <p className="text-[10px] text-[#857B72] font-medium leading-none">Indukan</p>
                  <p className="text-xs font-bold text-[#1F1B18] mt-1">{indukan}</p>
                </div>
              </div>
              <svg className="w-4 h-4 text-[#A0958B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* TANGGAL MATING & TANGGAL LAHIR */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-[#FAF8F5] border border-[#EAE5DF] rounded-xl p-2.5">
                <p className="text-[10px] text-[#857B72] font-medium">Tanggal mating</p>
                <p className="text-xs font-bold text-[#1F1B18] mt-1">{tanggalMating}</p>
              </div>

              <div className="bg-[#FAF8F5] border border-[#EAE5DF] rounded-xl p-2.5">
                <p className="text-[10px] text-[#857B72] font-medium">Tanggal lahir</p>
                <p className="text-xs font-bold text-[#1F1B18] mt-1">{tanggalLahir}</p>
              </div>
            </div>
          </div>

          {/* BANNER KETERANGAN */}
          <div className="bg-[#FFF8EE] border border-[#FADEC9] rounded-2xl p-3.5 flex items-start gap-3">
            <div className="text-[#D96B27] pt-0.5 shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-[11px] text-[#857B72] leading-relaxed">
              Setiap anak yang berhasil disimpan otomatis dibuat sebagai data kucing baru di My Cats lengkap dengan nomor microchip dummy dan tautan silsilah ke induknya.
            </p>
          </div>

          {/* CARD 2: JUMLAH ANAK LAHIR */}
          <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#1F1B18]">Jumlah anak lahir</h3>
              <p className="text-[10px] text-[#857B72] mt-0.5">Maksimal 10 ekor per laporan</p>
            </div>

            {/* COUNTER INPUT */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={jumlahAnak <= 1}
                className="w-8 h-8 rounded-xl border border-[#EAE5DF] flex items-center justify-center font-bold text-sm text-[#1F1B18] disabled:opacity-30 disabled:cursor-not-allowed active:bg-[#F5F2ED] cursor-pointer"
              >
                -
              </button>
              <span className="text-xs font-bold text-[#1F1B18] w-4 text-center">
                {jumlahAnak}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                disabled={jumlahAnak >= 10}
                className="w-8 h-8 rounded-xl border border-[#FADEC9] bg-[#FFF4EC] text-[#D96B27] flex items-center justify-center font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* LOG KELAHIRAN */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between px-0.5">
              <h3 className="text-xs font-bold text-[#1F1B18]">Log kelahiran</h3>
              <span className="text-[10px] font-semibold bg-[#E8F8EE] text-[#27A15A] px-2.5 py-1 rounded-full">
                {savedCount} dari {jumlahAnak} tersimpan
              </span>
            </div>

            <div className="space-y-2">
              {kittens.map((kitten, index) => (
                <div
                  key={kitten.id}
                  className={`w-full p-2.5 px-3 rounded-full border flex items-center justify-between transition-all ${
                    kitten.isSaved
                      ? "bg-white border-[#C4E2D0]"
                      : "bg-white border-[#EAE5DF]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-[#FCE3D2] text-[#D96B27] text-[11px] font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-xs font-semibold text-[#1F1B18] truncate">
                      {kitten.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        kitten.isSaved ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${
                        kitten.isSaved
                          ? "bg-[#E6F4EA] text-[#1E7E43]"
                          : "bg-[#F3F0EC] text-[#857B72]"
                      }`}
                    >
                      {kitten.isSaved ? "Tersimpan" : "Belum disimpan"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TOAST NOTIFIKASI POPUP */}
          {showToast && (
            <div className="bg-white border border-[#EAE5DF] shadow-lg rounded-2xl p-3.5 flex items-start justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-start gap-2.5">
                <div className="text-[#D96B27] pt-0.5 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-[#1F1B18] leading-tight">
                  {jumlahAnak} anak kucing tersimpan dan otomatis ditambahkan ke My Cats.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowToast(false)}
                className="text-[#A0958B] hover:text-[#1F1B18] text-xs font-bold p-0.5 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

        </div>

        {/* CONTAINER STICKY BOTTOM BUTTON (DI LUAR SCROLL AREA) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAE5DF] p-3.5 pb-16 z-50 max-w-md mx-auto">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#FF9248] to-[#E86D22] text-white font-bold text-xs shadow-md shadow-[#D96B27]/20 active:scale-[0.98] transition-transform disabled:opacity-80 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Menyimpan {jumlahAnak} anak...</span>
              </>
            ) : (
              <span>Simpan semua & tambah ke My Cats</span>
            )}
          </button>
        </div>

      </div>
    </>
  );
}