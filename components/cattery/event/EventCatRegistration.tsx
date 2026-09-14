"use client";

import React, { useState } from "react";

interface CatItem {
  id: string;
  name: string;
  breed: string;
  ems: string;
  code: string;
}

const MY_CATS_DATA: CatItem[] = [
  {
    id: "1",
    name: "Bagas of Rumah Hana",
    breed: "Persian",
    ems: "EMS PER n 22",
    code: "ICA-2023-0451",
  },
  {
    id: "2",
    name: "Kirana of Rumah Hana",
    breed: "Persian",
    ems: "EMS PER f 22",
    code: "ICA-2023-0488",
  },
  {
    id: "3",
    name: "Nara Kencana",
    breed: "Exotic Shorthair",
    ems: "EMS EXO d 03",
    code: "ICA-2024-0210",
  },
  {
    id: "4",
    name: "Rimba of Rumah Hana",
    breed: "Persian",
    ems: "EMS PER a 21",
    code: "ICA-2023-0612",
  },
  {
    id: "5",
    name: "Sekar Ayu",
    breed: "Exotic Shorthair",
    ems: "EMS EXO n 24",
    code: "ICA-2024-0733",
  },
  {
    id: "6",
    name: "Damar of Rumah Hana",
    breed: "Persian",
    ems: "EMS PER g 24",
    code: "ICA-2025-0094",
  },
];

interface EventCatRegistrationViewProps {
  onNext: () => void;
}

export default function EventCatRegistrationView({
  onNext,
}: EventCatRegistrationViewProps) {
  const [tab, setTab] = useState<"my-cats" | "manual">("my-cats");
  const [selectedCatIds, setSelectedCatIds] = useState<string[]>([]);

  const toggleSelectCat = (id: string) => {
    setSelectedCatIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn relative">
      <h1 className="text-xl sm:text-2xl font-bold text-[#1A1513]">
        Pendaftaran Event
      </h1>

      {/* Success Status Banner */}
      <div className="bg-white rounded-2xl border border-[#EEDFD5] p-4 sm:p-5 shadow-xs flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-full bg-[#EAF6ED] text-[#28844B] flex items-center justify-center font-bold text-sm shrink-0">
          ✓
        </div>
        <div>
          <h3 className="font-bold text-sm text-[#1A1513]">
            Pembayaran berhasil · slot terkunci
          </h3>
          <p className="text-xs text-[#7E7267] mt-0.5 leading-relaxed">
            ICA Cat Show Bandung 2026 · 1 slot kategori Cattery. Nomor registrasi{" "}
            <span className="font-semibold text-[#1A1513]">REG--011-0142</span>.
            Nomor batching diisi admin ICA setelah pendaftaran ditutup.
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-[#EEDFD5] p-5 sm:p-6 shadow-xs space-y-5">
        <div>
          <h2 className="text-base font-bold text-[#1A1513]">
            Isi data kucing yang diikutkan
          </h2>
          <p className="text-xs text-[#8C8074] mt-0.5 leading-relaxed">
            Wajib diisi sebelum hari acara. Pilih dari data kucing yang sudah
            terdaftar di My Cats, atau isi manual kalau kucing belum pernah
            didaftarkan.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTab("my-cats")}
            className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition ${
              tab === "my-cats"
                ? "bg-[#FFF2E8] text-[#C26D0A]"
                : "bg-white border border-[#EEDFD5] text-[#8C8074] hover:bg-[#FAF7F5]"
            }`}
          >
            Pilih dari My Cats
          </button>
          <button
            type="button"
            onClick={() => setTab("manual")}
            className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition ${
              tab === "manual"
                ? "bg-[#FFF2E8] text-[#C26D0A]"
                : "bg-white border border-[#EEDFD5] text-[#8C8074] hover:bg-[#FAF7F5]"
            }`}
          >
            Isi manual
          </button>
        </div>

        {/* TAB 1: PILIH DARI MY CATS */}
        {tab === "my-cats" && (
          <div className="space-y-4 pt-1">
            <p className="text-xs text-[#8C8074]">
              Klik salah satu kucing untuk mengisi data pendaftaran otomatis — pola
              yang sama dipakai di Mating Report.
            </p>

            {/* Grid Kartu Kucing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {MY_CATS_DATA.map((cat) => {
                const isSelected = selectedCatIds.includes(cat.id);
                return (
                  <div
                    key={cat.id}
                    onClick={() => toggleSelectCat(cat.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 relative ${
                      isSelected
                        ? "border-[#EE6B28] bg-[#FFF8F5]"
                        : "border-[#EEDFD5] bg-white hover:border-[#D6C2B4]"
                    }`}
                  >
                    {/* Icon Cat */}
                    <div className="w-8 h-8 rounded-full bg-[#FFF2E8] text-[#EE6B28] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      🐱
                    </div>

                    <div className="pr-6">
                      <h4 className="font-bold text-xs text-[#1A1513] leading-snug">
                        {cat.name}
                      </h4>
                      <p className="text-[11px] text-[#8C8074] mt-0.5 leading-tight">
                        {cat.breed} · {cat.ems} · {cat.code}
                      </p>
                    </div>

                    {/* Centang Indicator */}
                    <div className="absolute top-3.5 right-3.5">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-[#EE6B28] bg-[#EE6B28] text-white"
                            : "border-[#D6C2B4] bg-white"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="3.5"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Area */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onNext}
                disabled={selectedCatIds.length === 0}
                className={`cursor-pointer rounded-full px-6 py-2.5 text-xs font-bold transition-all ${
                  selectedCatIds.length > 0
                    ? "border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5"
                    : "bg-[#EEDFD5] text-[#8C8074] cursor-not-allowed"
                }`}
              >
                Daftarkan kucing terpilih
              </button>
              <span className="text-xs text-[#8C8074]">
                {selectedCatIds.length} kucing dipilih
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: ISI MANUAL */}
        {tab === "manual" && (
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#574D45] mb-1">
                  Nama kucing
                </label>
                <input
                  type="text"
                  placeholder="mis. Lila of Rumah Hana"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEDFD5] text-xs focus:outline-none focus:border-[#EE6B28]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#574D45] mb-1">
                  Ras
                </label>
                <input
                  type="text"
                  placeholder="mis. Persian"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEDFD5] text-xs focus:outline-none focus:border-[#EE6B28]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#574D45] mb-1">
                  EMS code
                </label>
                <input
                  type="text"
                  placeholder="mis. PER n 22"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEDFD5] text-xs focus:outline-none focus:border-[#EE6B28]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#574D45] mb-1">
                  Tanggal lahir
                </label>
                <input
                  type="date"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEDFD5] text-xs text-[#8C8074] focus:outline-none focus:border-[#EE6B28]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#574D45] mb-1">
                  Jenis kelamin
                </label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEDFD5] text-xs text-[#1A1513] focus:outline-none focus:border-[#EE6B28]">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#574D45] mb-1">
                  Nomor pedigree (opsional)
                </label>
                <input
                  type="text"
                  placeholder="ICA-PD-0000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEDFD5] text-xs focus:outline-none focus:border-[#EE6B28]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onNext}
                className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5"
              >
                Daftarkan kucing ini
              </button>
              <span className="text-xs text-[#8C8074]">
                Nama dan ras wajib diisi.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}