"use client";

import React, { useState } from "react";
import { CatItem } from "../MyCatsMobile";

interface AddPetMobileProps {
  onBack: () => void;
  onSuccessSave: (newCat: CatItem) => void;
}

const BREED_OPTIONS = [
  "Persian",
  "Exotic Shorthair",
  "Maine Coon",
  "British Shorthair",
  "Ragdoll",
  "Scottish Fold",
  "Bengal",
  "Sphynx",
];

export default function AddPetMobile({
  onBack,
  onSuccessSave,
}: AddPetMobileProps) {
  // Form State
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "">("Male");
  const [breed, setBreed] = useState("Persian");
  const [colorPattern, setColorPattern] = useState("");
  const [emsCode, setEmsCode] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [microchip, setMicrochip] = useState("");
  const [pedigreeStatus, setPedigreeStatus] = useState<"sudah" | "belum">(
    "belum"
  );
  const [pedigreeNumber, setPedigreeNumber] = useState("");
  const [sire, setSire] = useState("");
  const [dam, setDam] = useState("");
  const [isVaccinated, setIsVaccinated] = useState<"Sudah" | "Belum">("Belum");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const initials = name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()
      : "PK";

    const newCatData: CatItem = {
      id: String(Date.now()),
      name: name || "Pet Baru",
      initials: initials,
      gender: gender || "Male",
      breed: breed || "Persian",
      code: emsCode || "PER n 22",
      microchip: microchip || "956000010999999",
    };

    onSuccessSave(newCatData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FBF9F5] animate-slide-in">
      {/* pb-20 dibuat pas agar scroll berhenti sedikit lewat tombol simpan */}
      <div className="w-full max-w-md mx-auto min-h-screen font-sans pb-20 pt-3 px-4 space-y-4 text-[#1F1B18] relative">
        {/* HEADER */}
        <div className="flex items-center gap-3 pt-1 pb-1">
          <button
            onClick={onBack}
            type="button"
            className="p-1 -ml-1 text-[#D96B27] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
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
            <h1 className="text-base font-bold leading-tight">
              Tambah pet baru
            </h1>
            <p className="text-[11px] font-medium text-[#857B72]">
              Masuk ke My Cats
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FOTO KUCING SECTION */}
          <div className="flex items-center gap-4">
            <label className="w-20 h-20 rounded-2xl border border-dashed border-[#C5BCB3] bg-white flex flex-col items-center justify-center cursor-pointer hover:border-[#D96B27] transition-colors shrink-0">
              <svg
                className="w-6 h-6 text-[#857B72]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <circle cx="12" cy="13" r="3" strokeWidth="1.6" />
              </svg>
              <input type="file" accept="image/*" className="hidden" />
            </label>
            <div>
              <h2 className="text-xs font-bold text-[#1F1B18]">Foto kucing</h2>
              <p className="text-[10px] text-[#857B72] leading-relaxed mt-0.5">
                JPG/PNG maks. 5 MB · tampak depan, cahaya terang
              </p>
            </div>
          </div>

          {/* CARD 1: DATA KUCING */}
          <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3.5">
            <h2 className="text-xs font-bold text-[#1F1B18]">Data kucing</h2>

            {/* Nama kucing */}
            <div>
              <label className="block text-[11px] font-semibold text-[#524B43] mb-1.5">
                Nama kucing
              </label>
              <input
                type="text"
                placeholder="Contoh: Auroria Mochi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-[#EAE5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F1B18] placeholder-[#A0958B] focus:outline-none focus:border-[#D96B27]"
              />
            </div>

            {/* Jenis kelamin */}
            <div>
              <label className="block text-[11px] font-semibold text-[#524B43] mb-1.5">
                Jenis kelamin
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setGender("Male")}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    gender === "Male"
                      ? "border-[#D96B27] text-[#1F1B18] bg-white shadow-2xs"
                      : "border-[#EAE5DF] text-[#857B72] bg-white"
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender("Female")}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    gender === "Female"
                      ? "border-[#D96B27] text-[#1F1B18] bg-white shadow-2xs"
                      : "border-[#EAE5DF] text-[#857B72] bg-white"
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Ras chips */}
            <div>
              <label className="block text-[11px] font-semibold text-[#524B43] mb-1.5">
                Ras
              </label>
              <div className="flex flex-wrap gap-2">
                {BREED_OPTIONS.map((item) => {
                  const isSelected = breed === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setBreed(item)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        isSelected
                          ? "border-[#D96B27] text-[#1F1B18] bg-white shadow-2xs"
                          : "border-[#EAE5DF] text-[#524B43] bg-white"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Warna/pola & Kode EMS */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#524B43] mb-1.5">
                  Warna / pola
                </label>
                <input
                  type="text"
                  placeholder="Blue tabby"
                  value={colorPattern}
                  onChange={(e) => setColorPattern(e.target.value)}
                  className="w-full bg-white border border-[#EAE5DF] rounded-xl px-3 py-2.5 text-xs text-[#1F1B18] placeholder-[#A0958B] focus:outline-none focus:border-[#D96B27]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#524B43] mb-1.5">
                  Kode EMS
                </label>
                <input
                  type="text"
                  placeholder="PER a 22"
                  value={emsCode}
                  onChange={(e) => setEmsCode(e.target.value)}
                  className="w-full bg-white border border-[#EAE5DF] rounded-xl px-3 py-2.5 text-xs text-[#1F1B18] placeholder-[#A0958B] focus:outline-none focus:border-[#D96B27]"
                />
              </div>
            </div>
          </div>

          {/* CARD 2: TANGGAL LAHIR */}
          <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs">
            <label className="block text-[11px] font-semibold text-[#524B43] mb-1.5">
              Tanggal lahir
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-white border border-[#EAE5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F1B18] placeholder-[#A0958B] focus:outline-none focus:border-[#D96B27]"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#524B43]">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* CARD 3: MICROCHIP & PEDIGREE */}
          <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3.5">
            <h2 className="text-xs font-bold text-[#1F1B18]">
              Microchip & pedigree
            </h2>

            {/* Nomor microchip */}
            <div>
              <label className="block text-[11px] font-semibold text-[#524B43] mb-1.5">
                Nomor microchip
              </label>
              <input
                type="text"
                placeholder="15 digit, mis. 956000010234999"
                value={microchip}
                onChange={(e) => setMicrochip(e.target.value)}
                className="w-full bg-white border border-[#EAE5DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1F1B18] placeholder-[#A0958B] focus:outline-none focus:border-[#D96B27]"
              />
              <p className="text-[10px] text-[#A0958B] mt-1 leading-normal">
                Standar ISO 11784 · boleh dikosongkan bila belum dipasang.
              </p>
            </div>

            {/* Status pedigree ICA */}
            <div>
              <label className="block text-[11px] font-semibold text-[#524B43] mb-1.5">
                Status pedigree ICA
              </label>
              <div className="space-y-2">
                <div
                  onClick={() => setPedigreeStatus("sudah")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    pedigreeStatus === "sudah"
                      ? "bg-[#FFF8F3] border-[#FADEC9]"
                      : "bg-white border-[#EAE5DF]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        pedigreeStatus === "sudah"
                          ? "border-[#D96B27]"
                          : "border-[#C5BCB3]"
                      }`}
                    >
                      {pedigreeStatus === "sudah" && (
                        <div className="w-2 h-2 rounded-full bg-[#D96B27]" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1F1B18]">
                        Sudah punya pedigree ICA
                      </p>
                      <p className="text-[10px] text-[#857B72]">
                        Masukkan nomor sertifikat pedigree
                      </p>
                    </div>
                  </div>
                  {pedigreeStatus === "sudah" && (
                    <input
                      type="text"
                      placeholder="Nomor sertifikat pedigree"
                      value={pedigreeNumber}
                      onChange={(e) => setPedigreeNumber(e.target.value)}
                      className="mt-2.5 w-full bg-white border border-[#EAE5DF] rounded-xl px-3 py-2 text-xs text-[#1F1B18] focus:outline-none focus:border-[#D96B27]"
                    />
                  )}
                </div>

                <div
                  onClick={() => setPedigreeStatus("belum")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    pedigreeStatus === "belum"
                      ? "bg-[#FFF8F3] border-[#FADEC9]"
                      : "bg-white border-[#EAE5DF]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        pedigreeStatus === "belum"
                          ? "border-[#D96B27]"
                          : "border-[#C5BCB3]"
                      }`}
                    >
                      {pedigreeStatus === "belum" && (
                        <div className="w-2 h-2 rounded-full bg-[#D96B27]" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1F1B18]">
                        Belum punya pedigree
                      </p>
                      <p className="text-[10px] text-[#857B72]">
                        Bisa diajukan setelah pet tersimpan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sire & Dam */}
            <div className="grid grid-cols-2 gap-2.5 pt-0.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#524B43] mb-1.5">
                  Sire (ayah)
                </label>
                <input
                  type="text"
                  placeholder="Nama sire"
                  value={sire}
                  onChange={(e) => setSire(e.target.value)}
                  className="w-full bg-white border border-[#EAE5DF] rounded-xl px-3 py-2.5 text-xs text-[#1F1B18] placeholder-[#A0958B] focus:outline-none focus:border-[#D96B27]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#524B43] mb-1.5">
                  Dam (ibu)
                </label>
                <input
                  type="text"
                  placeholder="Nama dam"
                  value={dam}
                  onChange={(e) => setDam(e.target.value)}
                  className="w-full bg-white border border-[#EAE5DF] rounded-xl px-3 py-2.5 text-xs text-[#1F1B18] placeholder-[#A0958B] focus:outline-none focus:border-[#D96B27]"
                />
              </div>
            </div>
          </div>

          {/* CARD 4: KESEHATAN */}
          <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3">
            <h2 className="text-xs font-bold text-[#1F1B18]">Kesehatan</h2>

            <div>
              <label className="block text-[11px] font-semibold text-[#524B43] mb-2">
                Sudah divaksin Tricat (F3)?
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsVaccinated("Sudah")}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    isVaccinated === "Sudah"
                      ? "border-[#D96B27] text-[#1F1B18] bg-white shadow-2xs"
                      : "border-[#EAE5DF] text-[#857B72] bg-white"
                  }`}
                >
                  Sudah
                </button>
                <button
                  type="button"
                  onClick={() => setIsVaccinated("Belum")}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    isVaccinated === "Belum"
                      ? "border-[#D96B27] text-[#1F1B18] bg-white shadow-2xs"
                      : "border-[#EAE5DF] text-[#857B72] bg-white"
                  }`}
                >
                  Belum
                </button>
              </div>
              <p className="text-[10px] text-[#A0958B] mt-2 leading-relaxed">
                Bila belum, vaksin bisa dijadwalkan di Mitra Klinik Pelihara
                dari tab Riwayat Kesehatan.
              </p>
            </div>
          </div>

          {/* TOMBOL SIMPAN - Ujung akhir scroll */}
          <button
            type="submit"
            className="w-full bg-[#D96B27] hover:bg-[#c05c1e] active:scale-[0.99] text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all cursor-pointer mt-3"
          >
            Simpan Pet
          </button>
        </form>

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
  );
}