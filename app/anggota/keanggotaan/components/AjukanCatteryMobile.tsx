"use client";

import React, { useState } from "react";

interface PetItem {
  id: string;
  name: string;
  breed: string;
  regNumber: string;
  selected: boolean;
}

interface AjukanCatteryMobileProps {
  onBack: () => void;
  onSubmitSuccess?: () => void;
}

export default function AjukanCatteryMobile({
  onBack,
  onSubmitSuccess,
}: AjukanCatteryMobileProps) {
  const [catteryName, setCatteryName] = useState("");
  const [address, setAddress] = useState("");
  const [breeds, setBreeds] = useState("");

  const [pets, setPets] = useState<PetItem[]>([
    {
      id: "1",
      name: "Auroria Kimi",
      breed: "Persian",
      regNumber: "PER-n22",
      selected: true,
    },
    {
      id: "2",
      name: "Auroria Yuki",
      breed: "Exotic",
      regNumber: "EXO-d03",
      selected: false,
    },
  ]);

  const togglePetSelect = (id: string) => {
    setPets((prev) =>
      prev.map((pet) =>
        pet.id === id ? { ...pet, selected: !pet.selected } : pet
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitSuccess) {
      onSubmitSuccess();
    } else {
      alert("Pengajuan cattery berhasil dikirim ke admin ICA!");
      onBack();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#F7F5F0] font-sans overflow-y-auto">
      {/* TOP HEADER DENGAN TOMBOL KEMBALI */}
      <div
        className="sticky top-0 z-30 bg-[#F7F5F0] px-4 pb-3 border-b border-[#EAE5DF]/60 shadow-2xs"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)",
        }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="text-[#D96B27] p-1.5 -ml-1 rounded-full hover:bg-[#EAE5DF]/50 transition-colors active:scale-95"
            aria-label="Kembali"
          >
            <svg
              className="w-5 h-5 stroke-[2.5]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-base font-bold text-[#1F1B18] leading-tight">
              Ajukan sebagai Cattery
            </h1>
            <p className="text-[11px] text-[#857B72]">Direview admin ICA wilayah</p>
          </div>
        </div>
      </div>

      {/* KONTEN UTAMA FORM */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4 pb-12">
        {/* BANNER ALUR PENGAJUAN */}
        <div className="bg-[#FFF8F3] rounded-2xl p-4 border border-[#FADEC9] space-y-1.5">
          <span className="text-[10px] font-bold tracking-wider text-[#D96B27] uppercase">
            Alur Pengajuan
          </span>
          <p className="text-xs text-[#6B5E54] leading-relaxed">
            Isi form cattery dan tambahkan pet → kirim → review admin ICA →
            disetujui → akses portal cattery aktif.
          </p>
          <p className="text-[11px] text-[#857B72] leading-relaxed pt-0.5">
            Akun portal dibuat dengan kode cattery yang diterbitkan admin ICA setelah cattery Anda disetujui.
          </p>
        </div>

        {/* INPUT 1: NAMA CATTERY */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#1F1B18]">
            Nama cattery yang diajukan
          </label>
          <input
            type="text"
            value={catteryName}
            onChange={(e) => setCatteryName(e.target.value)}
            placeholder="Contoh: Auroria Cattery"
            className="w-full h-11 px-3.5 bg-white border border-[#EAE5DF] rounded-xl text-xs text-[#1F1B18] placeholder-[#A0958B] focus:outline-none focus:border-[#D96B27] transition-colors"
            required
          />
          <p className="text-[10px] text-[#857B72]">
            Nama dicek keunikannya oleh admin ICA terhadap daftar cattery nasional.
          </p>
        </div>

        {/* INPUT 2: ALAMAT CATTERY */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#1F1B18]">
            Alamat cattery
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Jalan, kelurahan, kota, kode pos"
            className="w-full h-11 px-3.5 bg-white border border-[#EAE5DF] rounded-xl text-xs text-[#1F1B18] placeholder-[#A0958B] focus:outline-none focus:border-[#D96B27] transition-colors"
            required
          />
        </div>

        {/* INPUT 3: RAS YANG DIKEMBANGBIAKKAN */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#1F1B18]">
            Ras yang dikembangbiakkan
          </label>
          <input
            type="text"
            value={breeds}
            onChange={(e) => setBreeds(e.target.value)}
            placeholder="Persian, Maine Coon, ..."
            className="w-full h-11 px-3.5 bg-white border border-[#EAE5DF] rounded-xl text-xs text-[#1F1B18] placeholder-[#A0958B] focus:outline-none focus:border-[#D96B27] transition-colors"
            required
          />
        </div>

        {/* SECTION 4: PET YANG DIDAFTARKAN */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3">
          <div>
            <h3 className="text-xs font-bold text-[#1F1B18]">Pet yang didaftarkan</h3>
            <p className="text-[10px] text-[#857B72] mt-0.5">
              Minimal satu kucing dengan pedigree ICA aktif.
            </p>
          </div>

          {/* DAFTAR PET DENGAN RADIO SELECTOR */}
          <div className="space-y-2 pt-1">
            {pets.map((pet) => (
              <div
                key={pet.id}
                onClick={() => togglePetSelect(pet.id)}
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  pet.selected
                    ? "bg-[#FFF8F3] border-[#FADEC9]"
                    : "bg-white border-[#EAE5DF]"
                }`}
              >
                {/* RADIO BUTTON CUSTOM */}
                <div
                  className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                    pet.selected
                      ? "border-[#D96B27] bg-[#D96B27]"
                      : "border-[#C4B9AD] bg-white"
                  }`}
                >
                  {pet.selected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>

                {/* INFO KUCING */}
                <div>
                  <h4 className="text-xs font-bold text-[#1F1B18]">{pet.name}</h4>
                  <p className="text-[10px] text-[#857B72]">
                    {pet.breed} · {pet.regNumber}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* TOMBOL TAMBAH PET BARU */}
          <button
            type="button"
            onClick={() => alert("Membuka form pendaftaran pet baru")}
            className="w-full py-2.5 mt-2 bg-[#FFF8F3] border border-[#FADEC9] rounded-xl text-xs font-bold text-[#D96B27] hover:bg-[#FCEEE2] active:scale-98 transition-all"
          >
            Tambah pet baru
          </button>
        </div>

        {/* TOMBOL SUBMIT */}
        <button
          type="submit"
          className="w-full py-3.5 bg-[#D96B27] hover:bg-[#C25A1C] active:scale-98 text-white text-xs font-bold rounded-xl transition-all shadow-xs mt-4"
        >
          Kirim Pengajuan Cattery
        </button>
      </form>
    </div>
  );
}