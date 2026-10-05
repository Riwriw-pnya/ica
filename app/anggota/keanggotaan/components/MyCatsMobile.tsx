"use client";

import React, { useState } from "react";
import MatingReportMobile from "./MatingReportMobile";
import AddPetMobile from "../components/mycats/AddPetMobile"; 
import ToastMobile from "../../../../components/ToastMobile";

export interface CatItem {
  id: string;
  name: string;
  initials: string;
  gender: string;
  breed: string;
  code: string;
  microchip: string;
}

interface MyCatsMobileProps {
  onBack?: () => void;
  onSelectCat?: (cat: CatItem) => void;
  onOpenMatingReport?: () => void;
}

const initialCatsData: CatItem[] = [
  {
    id: "1",
    name: "Auroria Kimi",
    initials: "AK",
    gender: "Male",
    breed: "Persian",
    code: "PER n 22",
    microchip: "956000010234578",
  },
  {
    id: "2",
    name: "Auroria Sari",
    initials: "AS",
    gender: "Female",
    breed: "Persian",
    code: "PER f 22",
    microchip: "956000010118902",
  },
  {
    id: "3",
    name: "Auroria Yuki",
    initials: "AY",
    gender: "Female",
    breed: "Exotic Shorthair",
    code: "EXO d 03",
    microchip: "956000010331466",
  },
  {
    id: "4",
    name: "Auroria Bagas",
    initials: "AB",
    gender: "Male",
    breed: "Persian",
    code: "PER n 22",
    microchip: "956000010077314",
  },
];

export default function MyCatsMobile({
  onBack,
  onSelectCat,
  onOpenMatingReport,
}: MyCatsMobileProps) {
  // State Overlay
  const [showMatingReport, setShowMatingReport] = useState(false);
  const [showAddPet, setShowAddPet] = useState(false); // State untuk mengontrol form Tambah Pet

  // State list kucing
  const [catsList, setCatsList] = useState<CatItem[]>(initialCatsData);

  const handleOpenMatingReport = () => {
    if (onOpenMatingReport) {
      onOpenMatingReport();
    }
    setShowMatingReport(true);
  };

  const handleSuccessSaveMatingReport = () => {
    const newKitten: CatItem = {
      id: String(Date.now()),
      name: "Auroria Mochi",
      initials: "AM",
      gender: "Female",
      breed: "Persian",
      code: "PER n 22",
      microchip: "956000010998822",
    };

    setCatsList((prev) => [newKitten, ...prev]);
    setShowMatingReport(false);
  };

  // Handler saat sukses menyimpan pet baru dari AddPetMobile
  const handleSuccessSavePet = (newCat: CatItem) => {
    setCatsList((prev) => [newCat, ...prev]);
    setShowAddPet(false);
  };

  return (
    <>
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

      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FBF9F5] animate-slide-in">
        <div className="w-full max-w-md mx-auto min-h-screen font-sans pb-24 pt-3 px-4 space-y-3.5 text-[#1F1B18] relative">
          {/* HEADER SECTION */}
          <div className="flex items-center gap-3 pt-1 pb-1">
            <button
              onClick={onBack}
              className="p-1 -ml-1 text-[#1F1B18] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
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
                  strokeWidth="2.2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-base font-bold leading-tight">My Cats</h1>
              <p className="text-[11px] font-medium text-[#857B72]">
                {catsList.length} kucing
              </p>
            </div>
          </div>

          {/* BANNER: MATING REPORT */}
          <div
            onClick={handleOpenMatingReport}
            className="bg-[#FFF4EC] rounded-2xl p-3.5 border border-[#FADEC9] flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#FADEC9] flex items-center justify-center text-[#D96B27] shrink-0">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xs font-bold text-[#1F1B18]">
                  Mating report & birth log
                </h2>
                <p className="text-[10px] text-[#857B72] leading-tight mt-0.5 max-w-[220px]">
                  Catat kelahiran 1–10 anak; tiap anak otomatis jadi data
                  kucing baru.
                </p>
              </div>
            </div>
            <span className="text-[#A0958B] text-xs font-semibold pl-1">›</span>
          </div>

          {/* TOMBOL: TAMBAH PET BARU (DIHUBUNGKAN KE STATE) */}
          <button
            onClick={() => setShowAddPet(true)}
            className="w-full bg-white rounded-2xl py-3.5 px-4 border border-dashed border-[#F0A875] flex items-center justify-center gap-2 text-[#D96B27] font-bold text-xs cursor-pointer active:bg-[#FFF8F3] hover:border-[#D96B27] transition-all"
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
                strokeWidth="2.5"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>Tambah pet baru</span>
          </button>

          {/* LIST KUCING */}
          <div className="space-y-2.5">
            {catsList.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCat && onSelectCat(cat)}
                className="bg-white rounded-2xl p-3.5 border border-[#EAE5DF] shadow-2xs flex items-center justify-between cursor-pointer hover:bg-[#FAF8F5] active:bg-[#F5F2ED] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FCE3D2] text-[#D96B27] font-bold text-xs flex items-center justify-center shrink-0 border border-[#FADEC9]">
                    {cat.initials}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1F1B18]">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] font-normal text-[#857B72] mt-0.5">
                      {cat.gender} · {cat.breed} · {cat.code}
                    </p>
                    <p className="text-[10px] text-[#A0958B] mt-0.5">
                      Microchip {cat.microchip}
                    </p>
                  </div>
                </div>
                <span className="text-[#A0958B] text-xs font-semibold pl-1">
                  ›
                </span>
              </div>
            ))}
          </div>

          {/* FOOTNOTE CATATAN MICROCHIP */}
          <p className="text-[10px] text-[#A0958B] leading-relaxed pt-2 px-1">
            Nomor microchip pada prototype adalah data dummy 15 digit (ISO
            11784) — Integrasi pembacaan chip menyusul.
          </p>

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
      </div>

      {/* OVERLAY MATING REPORT */}
      {showMatingReport && (
        <MatingReportMobile
          onBack={() => setShowMatingReport(false)}
          onSuccessSave={handleSuccessSaveMatingReport}
        />
      )}

      {/* OVERLAY ADD PET */}
      {showAddPet && (
        <AddPetMobile
          onBack={() => setShowAddPet(false)}
          onSuccessSave={handleSuccessSavePet}
        />
      )}
    </>
  );
}