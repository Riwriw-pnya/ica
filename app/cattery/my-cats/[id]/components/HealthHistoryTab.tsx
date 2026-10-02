"use client";

import { useState, useRef, ChangeEvent } from "react";
import type { CatHealthVaccine } from "@/types/cattery";
import { useToast } from "@/context/ToastContext";

export type ExtendedVaccineStatus = "Sudah" | "Belum" | "Menunggu verifikasi";

export interface ExtendedCatHealthVaccine extends Omit<CatHealthVaccine, "status"> {
  status: ExtendedVaccineStatus;
  isManual?: boolean;
}

interface HealthHistoryTabProps {
  catName: string;
  catRegCode?: string;
  vaccines: ExtendedCatHealthVaccine[];
  onSchedule: (title: string, date: string, clinic: string) => void;
  onAddManual: (data: { title: string; givenDate: string; clinic: string }) => void;
}

function SyringeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 2 4 4" />
      <path d="m17 7 3-3" />
      <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
      <path d="m9 11 4 4" />
      <path d="m5 19-3 3" />
      <path d="m14 4 6 6" />
    </svg>
  );
}

export function HealthHistoryTab({ 
  catName, 
  catRegCode, 
  vaccines, 
  onSchedule, 
  onAddManual 
}: HealthHistoryTabProps) {
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedVaccineTitle, setSelectedVaccineTitle] = useState("FeLV");

  const hasBelumVaccine = vaccines.some((v) => v.status === "Belum");
  const sudahCount = vaccines.filter((v) => v.status === "Sudah").length;
  const belumCount = vaccines.filter((v) => v.status === "Belum").length;

  const handleOpenBooking = (title: string = "FeLV") => {
    setSelectedVaccineTitle(title);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* 1. TAMPILAN MOBILE VIEW */}
      <div className="block lg:hidden space-y-4">
        <div className="rounded-2xl border border-[#EEDFD5] bg-white p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#1A1513]">Status vaksinasi</h3>
              <p className="text-[10px] text-[#8C8074]">
                Riwayat vaksin diverifikasi admin ICA dari dokumen klinik.
              </p>
            </div>
            {hasBelumVaccine ? (
              <span className="rounded-full bg-[#FCF3E3] border border-[#FCE3D2] px-2.5 py-0.5 text-[10px] font-bold text-[#B57A25] shrink-0">
                Belum lengkap
              </span>
            ) : (
              <span className="rounded-full bg-[#EFF8F3] border border-[#D3EEDD] px-2.5 py-0.5 text-[10px] font-bold text-[#28844B] shrink-0">
                Lengkap
              </span>
            )}
          </div>

          <div className="space-y-2.5 pt-1">
            {vaccines.map((item) => {
              const isBelum = item.status === "Belum";
              const isPending = item.status === "Menunggu verifikasi";

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between rounded-xl border p-3 ${
                    isPending
                      ? "border-[#E1EEF5] bg-[#F2F7FA]"
                      : isBelum
                      ? "border-[#FCE3D2] bg-[#FFFBF7]"
                      : "border-[#EEDFD5] bg-[#FAF7F2]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${
                        isPending
                          ? "bg-[#E3F0F8] text-[#2B79A1]"
                          : isBelum
                          ? "bg-[#FCF3E3] text-[#B57A25]"
                          : "bg-[#E8F8EE] text-[#1E824C]"
                      }`}
                    >
                      <SyringeIcon className="w-4 h-4 -rotate-45" />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#1A1513]">{item.title}</p>
                      <p className="text-[10px] text-[#8C8074] leading-tight mt-0.5">
                        {isPending
                          ? `Input manual · ${item.givenDate} · ${item.clinic}`
                          : isBelum
                          ? `Belum diberikan · ${item.givenDate}`
                          : `Diberikan ${item.givenDate} · ${item.clinic}`}
                      </p>
                    </div>
                  </div>

                  {isPending ? (
                    <span className="rounded-full bg-[#EBF5FB] border border-[#D4E8F5] px-2.5 py-0.5 text-[10px] font-semibold text-[#2979A3] shrink-0 shadow-2xs">
                      Menunggu verifikasi
                    </span>
                  ) : (
                    <span className="rounded-full bg-white border border-[#EEDFD5] px-3 py-1 text-[10px] font-semibold text-[#1A1513] shrink-0 shadow-2xs">
                      {item.status}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {hasBelumVaccine ? (
          <div className="rounded-2xl border border-[#FCE3D2] bg-[#FFFBF7] p-4 shadow-2xs space-y-3">
            <div>
              <h4 className="text-xs font-bold text-[#1A1513]">Ada vaksin yang belum diberikan</h4>
              <p className="text-[10px] text-[#8C8074] mt-0.5">
                Booking lewat Mitra Klinik Pelihara, riwayat terisi otomatis.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => handleOpenBooking()}
                className="w-full rounded-xl bg-gradient-to-b from-[#FFC299] to-[#F05A1B] py-2.5 text-xs font-bold text-white shadow-2xs active:scale-[0.98] transition cursor-pointer"
              >
                Booking Mitra Klinik
              </button>

              <button
                type="button"
                onClick={() => setIsManualModalOpen(true)}
                className="w-full rounded-xl border border-[#EEDFD5] bg-white py-2.5 text-xs font-bold text-[#1A1513] active:scale-[0.98] transition shadow-2xs cursor-pointer"
              >
                Tambah data vaksin manual
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsManualModalOpen(true)}
            className="w-full rounded-xl border border-[#F05A1B] bg-white py-2.5 text-xs font-bold text-[#F05A1B] active:scale-[0.98] transition shadow-2xs cursor-pointer"
          >
            Tambah data vaksin manual
          </button>
        )}
      </div>

      {/* 2. TAMPILAN DESKTOP VIEW */}
      <div className="hidden lg:block space-y-4">
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
            </div>
          </div>

          <div className="space-y-3">
            {vaccines.map((item) => {
              const isBelum = item.status === "Belum";
              const isPending = item.status === "Menunggu verifikasi";

              return (
                <div 
                  key={item.id} 
                  className="flex flex-row items-center justify-between rounded-2xl border border-[#EEDFD5] p-4 gap-3 bg-white shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl shrink-0 ${
                        isPending
                          ? "bg-[#E3F0F8] text-[#2B79A1]"
                          : isBelum
                          ? "bg-[#FCF3E3] text-[#B57A25]"
                          : "bg-[#E8F8EE] text-[#1E824C]"
                      }`}
                    >
                      <SyringeIcon className="w-5 h-5 -rotate-45" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1A1513]">{item.title}</p>
                      <p className="text-[11px] text-[#8C8074] mt-0.5">
                        {isPending
                          ? `Input manual · ${item.givenDate} · ${item.clinic}`
                          : isBelum
                          ? `Belum diberikan · ${item.givenDate}`
                          : `Diberikan ${item.givenDate} · ${item.clinic}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status === "Sudah" && (
                      <span className="text-[11px] font-medium text-emerald-600">Sudah</span>
                    )}

                    {isPending && (
                      <span className="rounded-full bg-[#EBF5FB] border border-[#D4E8F5] px-3 py-1 text-[11px] font-medium text-[#2979A3]">
                        Menunggu verifikasi
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
                          className="rounded-full border border-[#F05A1B] bg-white px-3.5 py-1.5 text-[11px] font-bold text-[#F05A1B] hover:bg-[#FFF2E8] transition-colors cursor-pointer active:scale-95"
                        >
                          + Tambah data vaksin
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 flex items-start gap-3">
            <span className="rounded border border-sky-200 bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-sky-600 shrink-0">
              Pelihara
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Vaksin berstatus Belum dapat langsung dijadwalkan di Mitra Klinik Pelihara. Data vaksin tercatat otomatis setelah kunjungan selesai.
            </p>
          </div>
        </div>
      </div>

      {/* Modal Booking Vaksin Pelihara */}
      {isBookingModalOpen && (
        <BookingVaccineModal 
          catName={catName} 
          vaccineName={selectedVaccineTitle} 
          onClose={() => setIsBookingModalOpen(false)} 
          onConfirm={(clinicName, dateStr) => {
             onSchedule(selectedVaccineTitle, dateStr, clinicName);
          }}
        />
      )}

      {/* Bottom Sheet Modal Tambah Data Vaksin Manual */}
      {isManualModalOpen && (
        <ManualVaccineModal
          catName={catName}
          catRegCode={catRegCode || "ICA-2023-0451"}
          onClose={() => setIsManualModalOpen(false)}
          onSubmit={(title, givenDate, clinic) => {
            onAddManual({ title, givenDate, clinic });
            setIsManualModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

{/* Modal Booking Vaksin Mitra Klinik (Mobile Bottom Sheet & Desktop Modal) */}
function BookingVaccineModal({ 
  catName, 
  vaccineName, 
  onClose,
  onConfirm
}: { 
  catName: string; 
  vaccineName: string; 
  onClose: () => void;
  onConfirm: (clinic: string, date: string) => void;
}) {
  const { showToast } = useToast();
  const [selectedClinic, setSelectedClinic] = useState("1");

  const clinics = [
    { 
      id: "1", 
      name: "Klinik Mitra Satwa Bandung", 
      distance: "2,1 km", 
      slot: "21 Sep 2026 09:00",
      address: "Jl. Ir. H. Juanda No. 210, Coblong, Bandung"
    },
    { 
      id: "2", 
      name: "Klinik Hewan Dago", 
      distance: "4,8 km", 
      slot: "22 Sep 2026 13:30",
      address: "Jl. Dr. Setiabudi No. 88, Sukasari, Bandung"
    },
    { 
      id: "3", 
      name: "Pelihara Vet Care Buah Batu", 
      distance: "6,3 km", 
      slot: "24 Sep 2026 10:00",
      address: "Jl. Buah Batu No. 145, Lengkong, Bandung"
    },
  ];

  const handleConfirm = () => {
    const clinicObj = clinics.find((c) => c.id === selectedClinic);
    if (!clinicObj) return;

    onConfirm(clinicObj.name, clinicObj.slot);
    showToast(
      "Booking vaksin terkonfirmasi",
      `${vaccineName} · ${clinicObj.name}, ${clinicObj.slot}.`,
      { tone: "success" }
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end lg:items-center justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* ========================================================= */}
      {/* MOBILE BOTTOM SHEET (PRESISI FOTO ACUAN)                  */}
      {/* ========================================================= */}
      <div className="block lg:hidden w-full rounded-t-3xl bg-white p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="mx-auto h-1 w-10 rounded-full bg-[#EEDFD5]" />

        <div>
          <h3 className="text-base font-bold text-[#1A1513]">Booking Mitra Klinik</h3>
          <p className="text-[11px] text-[#8C8074] mt-0.5">
            Jadwal dibuat di Pelihara, riwayat vaksin terisi otomatis.
          </p>
        </div>

        {/* List Pilihan Klinik */}
        <div className="space-y-2.5 pt-1">
          {clinics.map((clinic) => {
            const isSelected = selectedClinic === clinic.id;

            return (
              <div
                key={clinic.id}
                onClick={() => setSelectedClinic(clinic.id)}
                className={`flex items-center justify-between rounded-2xl border p-3.5 transition cursor-pointer ${
                  isSelected
                    ? "border-[#F05A1B] bg-[#FFFBF7]"
                    : "border-[#EEDFD5] bg-[#FAF7F2]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? "border-[#F05A1B] bg-[#F05A1B]" : "border-[#EEDFD5] bg-white"
                  }`}>
                    {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#1A1513]">{clinic.name}</h4>
                    <p className="text-[10px] text-[#8C8074] mt-0.5">
                      {clinic.distance} · slot terdekat {clinic.slot}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedClinic(clinic.id);
                  }}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer shrink-0 ${
                    isSelected
                      ? "border border-[#F05A1B] bg-white text-[#F05A1B]"
                      : "border border-[#EEDFD5] bg-white text-[#1A1513]"
                  }`}
                >
                  Pilih
                </button>
              </div>
            );
          })}
        </div>

        {/* Action Buttons Mobile */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full rounded-xl bg-gradient-to-b from-[#FFC299] to-[#F05A1B] py-3 text-xs font-bold text-white shadow-2xs active:scale-[0.98] transition cursor-pointer"
          >
            Buka Booking di Pelihara
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-[#EEDFD5] bg-white py-2.5 text-xs font-bold text-[#1A1513] active:scale-[0.98] transition shadow-2xs cursor-pointer"
          >
            Batal
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP MODAL VIEW                                        */}
      {/* ========================================================= */}
      <div className="hidden lg:block w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-5 animate-in zoom-in-95 duration-200">
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

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Batal
          </button>
          
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-semibold text-white shadow-xs hover:opacity-90 transition-all cursor-pointer"
          >
            Konfirmasi booking
          </button>
        </div>
      </div>

    </div>
  );
}

{/* Bottom Sheet Modal Tambah Data Vaksin Manual */}
function ManualVaccineModal({
  catName,
  catRegCode,
  onClose,
  onSubmit,
}: {
  catName: string;
  catRegCode: string;
  onClose: () => void;
  onSubmit: (title: string, givenDate: string, clinic: string) => void;
}) {
  const { showToast } = useToast();
  const [jenisVaksin, setJenisVaksin] = useState("");
  const [tanggalDiberikan, setTanggalDiberikan] = useState("");
  const [boosterBerikutnya, setBoosterBerikutnya] = useState("");
  const [klinik, setKlinik] = useState("");
  const [nomorBatch, setNomorBatch] = useState("");
  const [fileName, setFileName] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const formatDateString = (dateStr: string) => {
    if (!dateStr) return "";
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return dateStr;
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleSubmit = () => {
    if (!jenisVaksin || !tanggalDiberikan || !klinik) {
      showToast("Gagal Menyimpan", "Lengkapi field wajib yang bertanda (*).", { tone: "error" });
      return;
    }

    const formattedDate = formatDateString(tanggalDiberikan);
    onSubmit(jenisVaksin, formattedDate, klinik);
    showToast("Data Vaksin Dikirim", "Data manual berstatus Menunggu verifikasi sampai admin ICA mencocokkan dengan bukti.", { tone: "success" });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-xs lg:hidden animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-h-[85vh] rounded-t-3xl bg-white shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        <div className="p-5 pb-3 border-b border-[#F4EFE9] space-y-3 shrink-0">
          <div className="mx-auto h-1 w-10 rounded-full bg-[#EEDFD5]" />
          
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1A1513]">Tambah data vaksin</h3>
              <p className="text-[11px] text-[#8C8074]">
                {catName} · {catRegCode}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-xs font-bold text-[#8C8074] shrink-0"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-[#1A1513]">
              Jenis vaksin <span className="text-red-500">*</span>
            </label>
            <select
              value={jenisVaksin}
              onChange={(e) => setJenisVaksin(e.target.value)}
              className="w-full appearance-none rounded-xl border border-[#EEDFD5] bg-white px-3 py-2.5 text-xs text-[#1A1513] focus:outline-none focus:border-[#F05A1B]"
            >
              <option value="">Pilih jenis vaksin</option>
              <option value="Tricat (F3)">Tricat (F3)</option>
              <option value="Tetracat (F4)">Tetracat (F4)</option>
              <option value="Rabies">Rabies</option>
              <option value="FeLV">FeLV</option>
              <option value="Chlamydia">Chlamydia</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-semibold text-[#1A1513]">
                Tanggal diberikan <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={tanggalDiberikan}
                onChange={(e) => setTanggalDiberikan(e.target.value)}
                className="w-full rounded-xl border border-[#F05A1B] bg-white px-3 py-2 text-xs text-[#1A1513] focus:outline-none focus:ring-1 focus:ring-[#F05A1B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#8C8074]">Booster berikutnya</label>
              <input
                type="date"
                value={boosterBerikutnya}
                onChange={(e) => setBoosterBerikutnya(e.target.value)}
                className="w-full rounded-xl border border-[#EEDFD5] bg-white px-3 py-2 text-xs text-[#1A1513] focus:outline-none focus:border-[#F05A1B]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#1A1513]">
              Klinik / dokter hewan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="mis. Klinik Hewan Dago"
              value={klinik}
              onChange={(e) => setKlinik(e.target.value)}
              className="w-full rounded-xl border border-[#EEDFD5] bg-white px-3 py-2.5 text-xs text-[#1A1513] focus:outline-none focus:border-[#F05A1B]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#8C8074]">Nomor batch vaksin</label>
            <input
              type="text"
              placeholder="Tertera di stiker kartu vaksin"
              value={nomorBatch}
              onChange={(e) => setNomorBatch(e.target.value)}
              className="w-full rounded-xl border border-[#EEDFD5] bg-white px-3 py-2.5 text-xs text-[#1A1513] focus:outline-none focus:border-[#F05A1B]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#1A1513]">
              Bukti vaksin <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              ref={fileRef}
              onChange={handleFileChange}
              accept="image/*,.pdf"
              className="hidden"
            />
            <div
              onClick={() => fileRef.current?.click()}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#EEDFD5] bg-[#FAF7F2] py-4 px-3 text-center cursor-pointer"
            >
              <p className="text-xs font-bold text-[#1A1513]">
                {fileName ? fileName : "Unggah foto kartu vaksin"}
              </p>
              <p className="text-[10px] text-[#8C8074] mt-0.5">
                JPG, PNG, atau PDF · maks. 5 MB
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#EEDFD5] bg-[#FAF7F2] p-3 text-[11px] text-[#8C8074] leading-relaxed">
            Data manual berstatus Menunggu verifikasi sampai admin ICA mencocokkan dengan bukti.
          </div>
        </div>

        <div className="shrink-0 bg-white p-5 pt-3 pb-8 border-t border-[#F4EFE9]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#F05A1B] bg-white py-2.5 text-xs font-bold text-[#F05A1B] active:scale-95 transition cursor-pointer"
            >
              Batal
            </button>
            
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-xl bg-gradient-to-b from-[#FFC299] to-[#F05A1B] py-2.5 text-xs font-bold text-white shadow-2xs active:scale-95 transition cursor-pointer"
            >
              Simpan data vaksin
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}