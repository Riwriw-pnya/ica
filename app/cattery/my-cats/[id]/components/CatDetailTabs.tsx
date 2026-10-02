"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import type { 
  CatEventResult, 
  CatProfileDetail, 
  PedigreeChart as PedigreeChartData,
  CatHealthVaccine,
  CatAdopterItem
} from "@/types/cattery";
import { PedigreeChart } from "./PedigreeChart";
import { EventHistoryList } from "./EventHistoryList";
import { HealthHistoryTab } from "./HealthHistoryTab";
import { useToast } from "@/context/ToastContext";
import { StatusBadge } from "./StatusBadge";
import {
  qualityBadgeLabel,
  qualityBadgeTone,
  pedigreeStatusLabel,
  pedigreeStatusTone,
  vaccinationTone,
} from "./badge-utils";

type TabKey = "profile" | "silsilah" | "health" | "events" | "adopter";

type ExtendedCatProfile = CatProfileDetail & {
  emsCode?: string;
  microchip?: string;
};

interface CatDetailTabsProps {
  cat: CatProfileDetail;
  pedigree?: PedigreeChartData;
  events: CatEventResult[];
  healthVaccines?: CatHealthVaccine[];
  adopters?: CatAdopterItem[];
}

const dummyVaccinesComplete: CatHealthVaccine[] = [
  { id: "1", catId: 1, title: "Tricat (F3)", givenDate: "14 Mar 2024", clinic: "Klinik Mitra Satwa Bandung", status: "Sudah" },
  { id: "2", catId: 1, title: "Rabies", givenDate: "14 Mar 2024", clinic: "Klinik Mitra Satwa Bandung", status: "Sudah" },
  { id: "3", catId: 1, title: "Booster Tricat tahunan", givenDate: "02 Mar 2026", clinic: "Klinik Hewan Dago", status: "Sudah" },
];

const dummyVaccinesIncomplete: CatHealthVaccine[] = [
  { id: "1", catId: 2, title: "Tricat (F3)", givenDate: "20 Mei 2024", clinic: "Klinik Mitra Satwa Bandung", status: "Sudah" },
  { id: "2", catId: 2, title: "Rabies", givenDate: "jadwal disarankan Okt 2026", clinic: "-", status: "Belum" },
  { id: "3", catId: 2, title: "Booster Tricat tahunan", givenDate: "jadwal disarankan Nov 2026", clinic: "-", status: "Belum" },
];

export function CatDetailTabs({ 
  cat, 
  pedigree, 
  events,
  healthVaccines = [],
  adopters = []
}: CatDetailTabsProps) {
  const [active, setActive] = useState<TabKey>("profile");

  const initialData = cat.id % 2 === 0 ? dummyVaccinesIncomplete : dummyVaccinesComplete;
  const [vaccineList, setVaccineList] = useState<CatHealthVaccine[]>(
    healthVaccines.length > 0 ? healthVaccines : initialData
  );

  const handleScheduleVaccine = (vaccineTitle: string, newDateString: string, clinicName: string) => {
    setVaccineList((prev) =>
      prev.map((v) => {
        if (v.title === vaccineTitle) {
          return { ...v, status: "Sudah", givenDate: newDateString, clinic: clinicName };
        }
        return v;
      })
    );
  };

  const handleAddManualVaccine = (newVaccine: { title: string; givenDate: string; clinic: string }) => {
    setVaccineList((prev) => {
      const cleanTitle = newVaccine.title.trim().toLowerCase();
      
      const exists = prev.some((v) => v.title.trim().toLowerCase() === cleanTitle);

      if (exists) {
        // Jika vaksin sudah ada di daftar, update item yang berstatus Belum/Lama
        return prev.map((v) => {
          if (v.title.trim().toLowerCase() === cleanTitle) {
            return {
              ...v,
              title: newVaccine.title, 
              givenDate: newVaccine.givenDate,
              clinic: newVaccine.clinic,
              status: "Menunggu verifikasi" as any,
            };
          }
          return v;
        });
      }

      // Jika vaksin jenis baru tambahkan sebagai item baru
      return [
        ...prev,
        {
          id: String(Date.now()),
          catId: cat.id,
          title: newVaccine.title,
          givenDate: newVaccine.givenDate,
          clinic: newVaccine.clinic,
          status: "Menunggu verifikasi" as any,
        },
      ];
    });
  };

  return (
    <div className="flex flex-col h-full space-y-4 overflow-hidden">
      {/* Header Tab Navigation */}
      <div className="shrink-0 rounded-xl border border-slate-200 bg-white p-2 shadow-xs">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            type="button"
            onClick={() => setActive("profile")}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              active === "profile"
                ? "bg-orange-100 text-orange-700 shadow-xs"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            Profile
          </button>

          <button
            type="button"
            onClick={() => setActive("silsilah")}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              active === "silsilah"
                ? "bg-orange-100 text-orange-700 shadow-xs"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            Silsilah
          </button>

          <button
            type="button"
            onClick={() => setActive("health")}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              active === "health"
                ? "bg-orange-100 text-orange-700 shadow-xs"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            Riwayat Kesehatan
          </button>

          <button
            type="button"
            onClick={() => setActive("events")}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              active === "events"
                ? "bg-orange-100 text-orange-700 shadow-xs"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            Event
          </button>

          <button
            type="button"
            onClick={() => setActive("adopter")}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              active === "adopter"
                ? "bg-orange-100 text-orange-700 shadow-xs"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            Adopter
          </button>
        </div>
      </div>

      {/* Area Isi Tab */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {active === "profile" && <ProfileTab cat={cat as ExtendedCatProfile} />}
        {active === "silsilah" && <PedigreeChart cat={cat} pedigree={pedigree} />}
        {active === "health" && (
          <HealthHistoryTab 
            catName={cat.name} 
            catRegCode={cat.registrationNumber || cat.regCode}
            vaccines={vaccineList} 
            onSchedule={handleScheduleVaccine} 
            onAddManual={handleAddManualVaccine}
          />
        )}
        {active === "events" && <EventHistoryList catName={cat.name} events={events} />}
        {active === "adopter" && <AdopterTab catName={cat.name} adopters={adopters} />}
      </div>
    </div>
  );
}

{/* Icon Chip untuk Card Microchip */}
function ChipIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4" />
      <path d="M15 2v4" />
      <path d="M9 18v4" />
      <path d="M15 18v4" />
      <path d="M2 9h4" />
      <path d="M2 15h4" />
      <path d="M18 9h4" />
      <path d="M18 15h4" />
    </svg>
  );
}

{/* Tab Profile */}
function ProfileTab({ cat }: { cat: ExtendedCatProfile }) {
  const [imagePreview, setImagePreview] = useState<string | null>(cat.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      showToast("Foto Diunggah", `Foto profil ${cat.name} berhasil diperbarui.`);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Mobile Profile View */}
      <div className="block lg:hidden rounded-2xl border border-[#EEDFD5] bg-white p-4 shadow-2xs space-y-4">
        <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#EEDFD5] bg-[#FAF7F2] text-[#8C8074]">
          {imagePreview ? (
            <Image src={imagePreview} alt={cat.name} fill className="object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <DashboardIcon name="cat" size={32} />
              <span className="mt-2 text-xs font-medium text-[#8C8074]">Foto kucing belum diunggah</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-3 right-3 rounded-full border border-[#EEDFD5] bg-white px-3.5 py-1 text-[11px] font-bold text-[#1A1513] shadow-2xs cursor-pointer"
          >
            {imagePreview ? "Ubah foto" : "Unggah foto"}
          </button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-bold text-[#1A1513]">{cat.name}</h2>
          <span className="rounded-full bg-[#EFF8F3] border border-[#D3EEDD] px-2.5 py-0.5 text-[10px] font-bold text-[#28844B]">
            {cat.gender}
          </span>
        </div>

        <p className="text-xs text-[#8C8074] -mt-2">
          {cat.breed} · EMS {cat.emsCode || "PER n 22"}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {cat.qualityBadge && (
            <StatusBadge label={qualityBadgeLabel(cat.qualityBadge)} tone={qualityBadgeTone(cat.qualityBadge)} />
          )}
          <StatusBadge label={pedigreeStatusLabel(cat.pedigreeStatus)} tone={pedigreeStatusTone(cat.pedigreeStatus)} />
          <StatusBadge label={cat.vaccinationStatus} tone={vaccinationTone(cat.vaccinationStatus)} />
        </div>

        <div className="border-t border-[#F4EFE9]" />

        <div className="grid grid-cols-2 gap-y-3.5 text-xs">
          <div>
            <p className="text-[10px] text-[#8C8074]">No. registrasi</p>
            <p className="font-bold text-[#1A1513] mt-0.5">{cat.registrationNumber || cat.regCode}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#8C8074]">Tanggal lahir</p>
            <p className="font-bold text-[#1A1513] mt-0.5">{cat.birthDate}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#8C8074]">Warna</p>
            <p className="font-bold text-[#1A1513] mt-0.5">{cat.color}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#8C8074]">Skor kesehatan (admin)</p>
            <p className="font-bold text-[#F05A1B] mt-0.5">{cat.healthScore || 94}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] text-[#8C8074]">Microchip</p>
            <p className="font-bold text-[#1A1513] mt-0.5">{cat.microchip || "360 0980 0447 0112"}</p>
          </div>
        </div>
      </div>

      {/* Desktop Profile View */}
      <div className="hidden lg:block rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-800">Profile</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Data identitas {cat.name || "Bagas of Rumah Hana"} yang tercatat di ICA.
          </p>
        </div>

        {/* Grid Informasi Identitas */}
        <div className="grid grid-cols-4 gap-y-5 gap-x-6 text-xs">
          <div>
            <p className="text-slate-400 font-medium">Nama</p>
            <p className="font-bold text-slate-800 mt-1">{cat.name}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Jenis kelamin</p>
            <p className="font-bold text-slate-800 mt-1">{cat.gender}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Ras</p>
            <p className="font-bold text-slate-800 mt-1">{cat.breed}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Kode EMS</p>
            <p className="font-bold text-slate-800 mt-1">{cat.emsCode || "PER n 22"}</p>
          </div>

          <div>
            <p className="text-slate-400 font-medium">Tanggal lahir</p>
            <p className="font-bold text-slate-800 mt-1">{cat.birthDate}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Warna</p>
            <p className="font-bold text-slate-800 mt-1">{cat.color}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">No. registrasi</p>
            <p className="font-bold text-slate-800 mt-1">{cat.registrationNumber || cat.regCode}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Status pedigree</p>
            <p className="font-bold text-slate-800 mt-1">
              {cat.pedigreeStatus as string === "Aktif" || cat.pedigreeStatus as string === "Aktif - ICA-PD-5581" 
                ? "Aktif · ICA-PD-5581" 
                : cat.pedigreeStatus}
            </p>
          </div>

          <div>
            <p className="text-slate-400 font-medium">Sire</p>
            <p className="font-bold text-slate-800 mt-1">Arjuna of Kencana</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Dam</p>
            <p className="font-bold text-slate-800 mt-1">Melati of Kencana</p>
          </div>
        </div>

        {/* Card Banner Nomor Microchip */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-[#FAF8F5] p-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200/80 text-[#B57A25] shrink-0">
              <ChipIcon className="w-5 h-5" />
            </div>

            <div>
              <p className="text-[11px] font-semibold text-slate-400">Nomor microchip</p>
              <h4 className="text-sm font-bold text-slate-800 mt-0.5">
                {cat.microchip || "360 0980 0447 0112"}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Implan 20 Apr 2023 · Pelihara Vet Clinic Dago
              </p>
            </div>
          </div>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600 border border-emerald-200 shrink-0">
            Terdaftar
          </span>
        </div>

      </div>
    </>
  );
}

{/* Tab Adopter (Mobile & Desktop Separated) */}
function AdopterTab({ catName, adopters }: { catName: string; adopters: CatAdopterItem[] }) {
  const defaultAdopters = [
    {
      id: "1",
      catId: 1,
      adopterName: "Rangga Wijaya",
      phone: "+62 813-5521-7788",
      memberType: "Kategori Umum",
      kittenName: "Arum of Rumah Hana",
      microchip: "985 1410 0067 3390",
      adoptionDate: "02 Jul 2026",
      initials: "RW",
    },
    {
      id: "2",
      catId: 1,
      adopterName: "Nadia Putri",
      phone: "+62 856-9012-3345",
      memberType: "ICA Member",
      kittenName: "Bayu of Rumah Hana",
      microchip: "985 1410 0067 3391",
      adoptionDate: "02 Jul 2026",
      initials: "NP",
    },
  ];

  const list = adopters.length > 0 ? adopters : defaultAdopters;

  return (
    <>
      {/* ========================================================= */}
      {/* 1. TAMPILAN MOBILE VIEW (PRESISI FOTO ACUAN)              */}
      {/* ========================================================= */}
      <div className="block lg:hidden space-y-3">
        <p className="text-xs text-[#8C8074] px-1">
          Dari data kelahiran mating report yang disetujui.
        </p>

        <div className="space-y-3">
          {list.map((adopter) => {
            const isIcaMember = adopter.memberType.includes("ICA Member");

            return (
              <div
                key={adopter.id}
                className="rounded-2xl border border-[#EEDFD5] bg-white p-4 shadow-2xs space-y-3"
              >
                {/* Header Card: Avatar, Nama, HP, & Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF7F2] border border-[#EEDFD5] text-xs font-bold text-[#1A1513] shrink-0">
                      {adopter.initials}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#1A1513]">{adopter.adopterName}</h4>
                      <p className="text-[10px] text-[#8C8074] mt-0.5">{adopter.phone}</p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium border shrink-0 ${
                      isIcaMember
                        ? "bg-[#FFF2E8] text-[#F05A1B] border-[#FCE3D2]"
                        : "bg-[#FAF7F2] text-[#8C8074] border-[#EEDFD5]"
                    }`}
                  >
                    {adopter.memberType}
                  </span>
                </div>

                {/* List Detail: Kitten, Microchip, Tanggal Adopsi */}
                <div className="space-y-2 pt-1 text-xs">
                  <div className="flex items-center justify-between border-b border-[#F4EFE9] pb-2">
                    <span className="text-[#8C8074]">Kitten</span>
                    <span className="font-bold text-[#1A1513]">{adopter.kittenName}</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#F4EFE9] pb-2">
                    <span className="text-[#8C8074]">Microchip</span>
                    <span className="font-bold text-[#1A1513]">{adopter.microchip}</span>
                  </div>

                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-[#8C8074]">Tanggal adopsi</span>
                    <span className="font-bold text-[#1A1513]">{adopter.adoptionDate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. TAMPILAN DESKTOP VIEW (TETAP SAMA TANPA DIUBAH)         */}
      {/* ========================================================= */}
      <div className="hidden lg:block rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">Adopter</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pemilik baru dari keturunan {catName} yang tercatat di Birth Log.
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            {list.length} adopter
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {list.map((adopter) => {
            const isIcaMember = adopter.memberType.includes("ICA Member");

            return (
              <div
                key={adopter.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-slate-200 p-4 gap-4 bg-white"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF3EB] text-xs font-bold text-[#F05A1B] shrink-0 border border-[#FDE3D3]">
                    {adopter.initials}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs font-bold text-slate-800">{adopter.adopterName}</h4>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
                          isIcaMember
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {adopter.memberType}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {adopter.phone} · adopsi {adopter.adoptionDate}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs font-bold text-slate-800">{adopter.kittenName}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Microchip {adopter.microchip}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}