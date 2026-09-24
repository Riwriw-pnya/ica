"use client";

import { useState } from "react";
import type { 
  CatEventResult, 
  CatProfileDetail, 
  PedigreeChart as PedigreeChartData,
  CatHealthVaccine,
  CatAdopterItem
} from "@/types/cattery";
import { PedigreeChart } from "./PedigreeChart";
import { EventHistoryList } from "./EventHistoryList";
import { CatProfileCard } from "./CatProfileCard";

type TabKey = "profile" | "silsilah" | "health" | "events" | "adopter";

interface CatDetailTabsProps {
  cat: CatProfileDetail;
  pedigree?: PedigreeChartData;
  events: CatEventResult[];
  healthVaccines?: CatHealthVaccine[];
  adopters?: CatAdopterItem[];
}

export function CatDetailTabs({ 
  cat, 
  pedigree, 
  events,
  healthVaccines = [],
  adopters = []
}: CatDetailTabsProps) {
  const [active, setActive] = useState<TabKey>("silsilah");

  return (
    <div className="flex flex-col h-full space-y-4 overflow-hidden">
      
      {/* 1. Header Tab Navigation (Tetap Diam/Kunci di atas) */}
      <div className="shrink-0 rounded-xl border border-slate-200 bg-white p-2 shadow-xs">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
          
          <button
            type="button"
            onClick={() => setActive("profile")}
            className={`lg:hidden whitespace-nowrap rounded-lg px-4 py-2 text-xs md:text-sm font-semibold transition-all cursor-pointer ${
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

      {/* 2. Area Isi Tab: HANYA bagian ini yang bisa di-scroll di desktop */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {active === "profile" && (
          <div className="block lg:hidden">
            <CatProfileCard cat={cat} />
          </div>
        )}

        {active === "silsilah" && (
          <PedigreeChart cat={cat} pedigree={pedigree} />
        )}

        {active === "health" && (
          <HealthHistoryTab vaccines={healthVaccines} />
        )}

        {active === "events" && (
          <EventHistoryList catName={cat.name} events={events} />
        )}

        {active === "adopter" && (
          <AdopterTab adopters={adopters} />
        )}
      </div>
    </div>
  );
}

{/* Component Tab Riwayat Kesehatan & Adopter tetap sama seperti sebelumnya */}
function HealthHistoryTab({ vaccines }: { vaccines: CatHealthVaccine[] }) {
  const defaultVaccines: CatHealthVaccine[] = [
    { id: "1", catId: 1, title: "Tricat (F3)", givenDate: "14 Mar 2024", clinic: "Klinik Mitra Satwa Bandung", status: "Sudah" },
    { id: "2", catId: 1, title: "Rabies", givenDate: "14 Mar 2024", clinic: "Klinik Mitra Satwa Bandung", status: "Sudah" },
    { id: "3", catId: 1, title: "Booster Tricat tahunan", givenDate: "02 Mar 2026", clinic: "Klinik Hewan Dago", status: "Sudah" },
  ];

  const list = vaccines.length > 0 ? vaccines : defaultVaccines;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Status vaksinasi</h3>
          <p className="text-xs text-slate-500">Riwayat vaksin diverifikasi admin ICA dari dokumen klinik.</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 border border-emerald-200">
          Lengkap
        </span>
      </div>

      <div className="space-y-3">
        {list.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-md border border-slate-300 bg-white" />
              <div>
                <p className="text-xs font-bold text-slate-800">{item.title}</p>
                <p className="text-[11px] text-slate-500">Diberikan {item.givenDate} · {item.clinic}</p>
              </div>
            </div>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdopterTab({ adopters }: { adopters: CatAdopterItem[] }) {
  const defaultAdopters: CatAdopterItem[] = [
    { id: "1", catId: 1, adopterName: "Dewi Anggraeni", phone: "+62 812-1144-9021", memberType: "ICA Member", kittenName: "Lila of Rumah Hana", microchip: "985 1410 0067 2281", adoptionDate: "12 Jun 2026", initials: "DA" },
    { id: "2", catId: 1, adopterName: "Fajar Ramadhan", phone: "+62 857-3390-1188", memberType: "Umum", kittenName: "Guntur of Rumah Hana", microchip: "985 1410 0067 2282", adoptionDate: "12 Jun 2026", initials: "FR" },
    { id: "3", catId: 1, adopterName: "Sinta Halim", phone: "+62 811-2087-4460", memberType: "ICA Member", kittenName: "Mega of Rumah Hana", microchip: "985 1410 0067 2283", adoptionDate: "12 Jun 2026", initials: "SH" },
  ];

  const list = adopters.length > 0 ? adopters : defaultAdopters;

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">
        Adopter anak kucing dari kucing ini, diambil dari data kelahiran pada mating report yang sudah disetujui.
      </p>

      <div className="space-y-3">
        {list.map((adopter) => (
          <div key={adopter.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200">
                  {adopter.initials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{adopter.adopterName}</h4>
                  <p className="text-[11px] text-slate-500">{adopter.phone}</p>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                adopter.memberType === "ICA Member" 
                  ? "bg-orange-50 text-orange-700 border border-orange-200" 
                  : "bg-slate-100 text-slate-600 border border-slate-200"
              }`}>
                {adopter.memberType}
              </span>
            </div>

            <div className="border-t border-slate-100 pt-2 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Kitten</span>
                <span className="font-semibold text-slate-800">{adopter.kittenName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Microchip</span>
                <span className="font-semibold text-slate-800">{adopter.microchip}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tanggal adopsi</span>
                <span className="font-semibold text-slate-800">{adopter.adoptionDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}