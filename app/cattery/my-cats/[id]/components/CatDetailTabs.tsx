"use client";

import { useState } from "react";
import type { 
  CatEventResult, 
  CatProfileDetail, 
  PedigreeChart as PedigreeChartData,
  CatHealthVaccine,
  CatAdopterItem
} from "@/types/cattery"; // Sesuaikan path ini jika beda
import { PedigreeChart } from "./PedigreeChart";
import { EventHistoryList } from "./EventHistoryList";
import { CatProfileCard } from "./CatProfileCard";
import { useToast } from "@/context/ToastContext"; // Sesuaikan lokasi file Context

type TabKey = "profile" | "silsilah" | "health" | "events" | "adopter";

// Tipe turunan khusus untuk UI Profile ini agar TS tidak error
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

// Data awal vaksin untuk simulasi state
const initialVaccines = [
  { id: "1", title: "Tricat (F3) - dosis 1", date: "14 Apr 2023 · Pelihara Vet Clinic Dago", status: "Sudah" },
  { id: "2", title: "Tricat (F3) - booster", date: "12 Mei 2023 · Pelihara Vet Clinic Dago", status: "Sudah" },
  { id: "3", title: "Rabies", date: "10 Feb 2026 · Pelihara Pet Care Setiabudi", status: "Sudah" },
  { id: "4", title: "FeLV", date: "Belum diberikan · jadwal disarankan Okt 2026", status: "Belum" },
];

export function CatDetailTabs({ 
  cat, 
  pedigree, 
  events,
  healthVaccines = [],
  adopters = []
}: CatDetailTabsProps) {
  const [active, setActive] = useState<TabKey>("profile");
  
  // State untuk menyimpan daftar vaksin yang bisa diubah saat booking
  const [vaccineList, setVaccineList] = useState(initialVaccines);

  // Fungsi untuk mengupdate status vaksin menjadi "Terjadwal"
  const handleScheduleVaccine = (vaccineTitle: string, newDateString: string) => {
    setVaccineList(prev => prev.map(v => {
      if (v.title === vaccineTitle) {
        return { ...v, status: "Terjadwal", date: newDateString };
      }
      return v;
    }));
  };

  return (
    <div className="flex flex-col h-full space-y-4 overflow-hidden">
      
      {/* 1. Header Tab Navigation */}
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

      {/* 2. Area Isi Tab */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {active === "profile" && (
          <ProfileTab cat={cat as ExtendedCatProfile} />
        )}

        {active === "silsilah" && (
          <PedigreeChart cat={cat} pedigree={pedigree} />
        )}

        {active === "health" && (
          <HealthHistoryTab 
            catName={cat.name} 
            vaccines={vaccineList} 
            onSchedule={handleScheduleVaccine} 
          />
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

{/* Tab 1: Profile */}
function ProfileTab({ cat }: { cat: ExtendedCatProfile }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-800">Profile</h3>
        <p className="text-xs text-slate-500">
          Data identitas {cat.name || "Bagas of Rumah Hana"} yang tercatat di ICA.
        </p>
      </div>

      {/* Rincian Identitas Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6 text-xs">
        <div>
          <p className="text-slate-400 font-medium">Nama</p>
          <p className="font-bold text-slate-800 mt-0.5">{cat.name}</p>
        </div>
        <div>
          <p className="text-slate-400 font-medium">Jenis kelamin</p>
          <p className="font-bold text-slate-800 mt-0.5">{cat.gender}</p>
        </div>
        <div>
          <p className="text-slate-400 font-medium">Ras</p>
          <p className="font-bold text-slate-800 mt-0.5">{cat.breed}</p>
        </div>
        <div>
          <p className="text-slate-400 font-medium">Kode EMS</p>
          <p className="font-bold text-slate-800 mt-0.5">{cat.emsCode || "PER n 22"}</p>
        </div>

        <div>
          <p className="text-slate-400 font-medium">Tanggal lahir</p>
          <p className="font-bold text-slate-800 mt-0.5">{cat.birthDate}</p>
        </div>
        <div>
          <p className="text-slate-400 font-medium">Warna</p>
          <p className="font-bold text-slate-800 mt-0.5">{cat.color}</p>
        </div>
        <div>
          <p className="text-slate-400 font-medium">No. registrasi</p>
          <p className="font-bold text-slate-800 mt-0.5">{cat.registrationNumber || cat.regCode}</p>
        </div>
        <div>
          <p className="text-slate-400 font-medium">Status pedigree</p>
          <p className="font-bold text-slate-800 mt-0.5">
            <span className="text-slate-800">{cat.pedigreeStatus}</span>
          </p>
        </div>

        <div>
          <p className="text-slate-400 font-medium">Sire</p>
          <p className="font-bold text-slate-800 mt-0.5">{cat.sireName || "-"}</p>
        </div>
        <div>
          <p className="text-slate-400 font-medium">Dam</p>
          <p className="font-bold text-slate-800 mt-0.5">{cat.damName || "-"}</p>
        </div>
      </div>

      {/* Card Microchip */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-orange-200 bg-orange-50 text-orange-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Nomor microchip</p>
            <p className="text-sm font-bold text-slate-800">{cat.microchip || "360 0980 0447 0112"}</p>
            <p className="text-[11px] text-slate-400">Implan 20 Apr 2023 · Pelihara Vet Clinic Dago</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 border border-emerald-200">
          Terdaftar
        </span>
      </div>
    </div>
  );
}

{/* Tab 2: Riwayat Kesehatan */}
function HealthHistoryTab({ catName, vaccines, onSchedule }: { 
  catName: string; 
  vaccines: { id: string, title: string, date: string, status: string }[];
  onSchedule: (title: string, date: string) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVaccineTitle, setSelectedVaccineTitle] = useState("FeLV");

  // Kalkulasi rekap badge status
  const sudahCount = vaccines.filter(v => v.status === "Sudah").length;
  const belumCount = vaccines.filter(v => v.status === "Belum").length;
  const terjadwalCount = vaccines.filter(v => v.status === "Terjadwal").length;

  const handleOpenBooking = (title: string) => {
    setSelectedVaccineTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">Riwayat kesehatan</h3>
            <p className="text-xs text-slate-500">Status vaksinasi {catName}.</p>
          </div>
          <div className="flex items-center gap-2">
            {sudahCount > 0 && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600 border border-emerald-200">
                {sudahCount} sudah
              </span>
            )}
            {belumCount > 0 && (
               <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-600 border border-amber-200">
                {belumCount} belum
              </span>
            )}
             {terjadwalCount > 0 && (
               <span className="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-600 border border-sky-200">
                {terjadwalCount} terjadwal
              </span>
            )}
          </div>
        </div>

        {/* Daftar Kartu Vaksin */}
        <div className="space-y-3">
          {vaccines.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-200 p-4 gap-3 bg-white"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 4.5l-15 15m0 0h6m-6 0v-6m12-3l1.5-1.5a2.121 2.121 0 00-3-3L13.5 7.5m3 3l-3-3" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{item.title}</p>
                  <p className="text-[11px] text-slate-500">{item.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {item.status === "Sudah" && (
                  <span className="text-[11px] font-medium text-emerald-600">
                    Sudah
                  </span>
                )}
                 {item.status === "Terjadwal" && (
                  <span className="text-[11px] font-medium text-sky-600">
                    Terjadwal
                  </span>
                )}
                
                {item.status === "Belum" && (
                  <>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-700 border border-amber-200">
                      Belum
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenBooking(item.title)}
                      className="rounded-full border border-orange-400 bg-white px-3 py-1 text-[11px] font-semibold text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
                    >
                      + Tambah data vaksin
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Banner Info Pelihara */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 flex items-start gap-3">
          <span className="rounded border border-sky-200 bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-sky-600 shrink-0">
            Pelihara
          </span>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Vaksin berstatus Belum dapat langsung dijadwalkan di Mitra Klinik Pelihara. Data vaksin tercatat otomatis setelah kunjungan selesai.
          </p>
        </div>
      </div>

      {/* Modal Booking Vaksin */}
      {isModalOpen && (
        <BookingVaccineModal 
          catName={catName} 
          vaccineName={selectedVaccineTitle} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={(clinicName, dateStr, timeStr) => {
             const formattedDate = `${dateStr}, ${timeStr} · ${clinicName} · via Pelihara`;
             onSchedule(selectedVaccineTitle, formattedDate);
          }}
        />
      )}
    </div>
  );
}

{/* Component Modal Booking Vaksin */}
function BookingVaccineModal({ 
  catName, 
  vaccineName, 
  onClose,
  onConfirm
}: { 
  catName: string; 
  vaccineName: string; 
  onClose: () => void;
  onConfirm: (clinic: string, date: string, time: string) => void;
}) {
  const { showToast } = useToast();
  
  // State kosong di awal untuk validasi
  const [selectedClinic, setSelectedClinic] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const clinics = [
    { id: "1", name: "Pelihara Vet Clinic Dago", address: "Jl. Ir. H. Juanda No. 210, Coblong, Bandung", distance: "2,1km" },
    { id: "2", name: "Pelihara Pet Care Setiabudi", address: "Jl. Dr. Setiabudi No. 88, Sukasari, Bandung", distance: "3,4km" },
    { id: "3", name: "Klinik Mitra Pelihara Buahbatu", address: "Jl. Buah Batu No. 145, Lengkong, Bandung", distance: "6,8km" },
  ];

  const dates = ["Sen, 28 Sep", "Sel, 29 Sep", "Rab, 30 Sep", "Kam, 1 Okt", "Jum, 2 Okt"];
  const times = ["09:00", "10:30", "13:00", "14:30", "16:00"];

  // Variabel untuk mengecek apakah form sudah diisi semua
  const isFormComplete = selectedClinic !== "" && selectedDate !== "" && selectedTime !== "";

  const handleConfirm = () => {
    if (!isFormComplete) {
      showToast("Gagal Booking", "Pastikan klinik, tanggal, dan jam sudah dipilih.", { tone: "error" });
      return;
    }

    const clinicObj = clinics.find(c => c.id === selectedClinic);
    if (!clinicObj) return;

    // Sukses
    onConfirm(clinicObj.name, selectedDate, selectedTime);
    
    // Tampilkan toast dinamis
    showToast(
      "Booking vaksin terkonfirmasi",
      `${vaccineName} · ${clinicObj.name}, ${selectedDate} ${selectedTime}. Status vaksin berubah menjadi Terjadwal.`,
      { tone: "success" }
    );
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Modal */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-800">Booking vaksin</h3>
              <span className="rounded bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-600 border border-sky-100">
                Mitra Klinik Pelihara
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {vaccineName} - {catName}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* 1. Pilih Klinik */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700">Pilih klinik</label>
          <div className="space-y-2">
            {clinics.map((clinic) => (
              <label 
                key={clinic.id}
                onClick={() => setSelectedClinic(clinic.id)}
                className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-all ${
                  selectedClinic === clinic.id 
                    ? "border-orange-500 bg-orange-50/30 ring-1 ring-orange-500" 
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                    selectedClinic === clinic.id ? "border-orange-600 bg-orange-600" : "border-slate-300"
                  }`}>
                    {selectedClinic === clinic.id && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{clinic.name}</p>
                    <p className="text-[11px] text-slate-500">{clinic.address}</p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">{clinic.distance}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 2. Pilih Tanggal */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700">Tanggal</label>
          <div className="flex flex-wrap gap-2">
            {dates.map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium border transition-all cursor-pointer ${
                  selectedDate === date
                    ? "border-orange-500 bg-orange-50 text-orange-600 font-semibold"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Pilih Jam Kunjungan */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700">Jam kunjungan</label>
          <div className="flex flex-wrap gap-2">
            {times.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium border transition-all cursor-pointer ${
                  selectedTime === time
                    ? "border-orange-500 bg-orange-50 text-orange-600 font-semibold"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Batal
          </button>
          
          {/* Tombol Konfirmasi dengan validasi Disable & Not-Allowed */}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isFormComplete}
            className={`rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-semibold text-white shadow-xs transition-all ${
              isFormComplete 
                ? "hover:opacity-90 cursor-pointer" 
                : "opacity-50 cursor-not-allowed grayscale-[30%]"
            }`}
          >
            Konfirmasi booking
          </button>
        </div>

      </div>
    </div>
  );
}

{/* Tab Adopter */}
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