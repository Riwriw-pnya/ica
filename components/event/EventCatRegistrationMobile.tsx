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

interface EventCatRegistrationMobileProps {
  onNext: () => void;
}

export default function EventCatRegistrationMobile({
  onNext,
}: EventCatRegistrationMobileProps) {
  const [tab, setTab] = useState<"my-cats" | "manual">("my-cats");
  const [selectedCatIds, setSelectedCatIds] = useState<string[]>([]);

  const toggleSelectCat = (id: string) => {
    setSelectedCatIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bottom-[56px] z-50 bg-[#F7F5F0] flex flex-col">
      {/* HEADER */}
      <div className="shrink-0 bg-[#F7F5F0] px-5 pt-10 pb-3">
        <div>
          <h1 className="text-base font-bold text-[#1F1B18]">
            Pendaftaran Event
          </h1>

          <p className="text-[11px] text-[#857B72] mt-0.5">
            ICA Cat Show Bandung 2026
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-5 pb-28 space-y-3 scrollbar-none">
        {/* SUCCESS STATUS */}
        <div className="rounded-2xl border border-[#D9ECDD] bg-white p-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EAF6ED] text-[#28844B] flex items-center justify-center font-bold text-sm shrink-0">
              ✓
            </div>

            <div className="min-w-0">
              <h3 className="font-bold text-xs text-[#1F1B18] leading-snug">
                Pembayaran berhasil · slot terkunci
              </h3>

              <p className="text-[10px] text-[#857B72] mt-1 leading-relaxed">
                ICA Cat Show Bandung 2026 · 1 slot kategori Cattery.
                Nomor registrasi{" "}
                <span className="font-bold text-[#1F1B18]">
                  REG--011-0142
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* INTRO */}
        <div className="rounded-2xl border border-[#EAE5DF] bg-white p-4 shadow-xs">
          <h2 className="text-sm font-bold text-[#1F1B18]">
            Isi data kucing yang diikutkan
          </h2>

          <p className="text-[10px] text-[#857B72] mt-1 leading-relaxed">
            Pilih kucing dari My Cats atau isi data secara manual jika kucing
            belum terdaftar.
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTab("my-cats")}
            className={`px-3.5 py-2 rounded-full text-[10px] font-bold cursor-pointer transition ${
              tab === "my-cats"
                ? "bg-[#FFF2E8] text-[#C26D0A] border border-[#FADEC9]"
                : "bg-white border border-[#EEDFD5] text-[#8C8074]"
            }`}
          >
            Pilih dari My Cats
          </button>

          <button
            type="button"
            onClick={() => setTab("manual")}
            className={`px-3.5 py-2 rounded-full text-[10px] font-bold cursor-pointer transition ${
              tab === "manual"
                ? "bg-[#FFF2E8] text-[#C26D0A] border border-[#FADEC9]"
                : "bg-white border border-[#EEDFD5] text-[#8C8074]"
            }`}
          >
            Isi manual
          </button>
        </div>

        {/* ===================================================== */}
        {/* MY CATS */}
        {/* ===================================================== */}
        {tab === "my-cats" && (
          <div className="space-y-3">
            <div className="rounded-2xl border border-[#EAE5DF] bg-white p-4">
              <p className="text-[10px] text-[#857B72] leading-relaxed">
                Pilih kucing yang akan mengikuti event. Data dari My Cats akan
                digunakan otomatis untuk pendaftaran.
              </p>
            </div>

            <div className="space-y-2.5">
              {MY_CATS_DATA.map((cat) => {
                const isSelected = selectedCatIds.includes(cat.id);

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleSelectCat(cat.id)}
                    className={`w-full text-left rounded-2xl border p-3.5 transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#EE6B28] bg-[#FFF8F5]"
                        : "border-[#EAE5DF] bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* CAT ICON */}
                      <div className="w-9 h-9 rounded-full bg-[#FFF2E8] text-[#EE6B28] flex items-center justify-center text-sm shrink-0">
                        🐱
                      </div>

                      {/* DATA */}
                      <div className="min-w-0 flex-1 pr-1">
                        <h4 className="font-bold text-xs text-[#1A1513] leading-snug">
                          {cat.name}
                        </h4>

                        <p className="text-[10px] text-[#8C8074] mt-1 leading-relaxed">
                          {cat.breed}
                        </p>

                        <p className="text-[9px] text-[#A09387] mt-0.5">
                          {cat.ems} · {cat.code}
                        </p>
                      </div>

                      {/* CHECK */}
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
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
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-[#EAE5DF] bg-white p-3.5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] text-[#857B72]">
                  Kucing dipilih
                </span>

                <span className="text-xs font-bold text-[#1F1B18]">
                  {selectedCatIds.length} kucing
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* MANUAL */}
        {/* ===================================================== */}
        {tab === "manual" && (
          <div className="rounded-2xl border border-[#EAE5DF] bg-white p-4 shadow-xs space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-[#574D45] mb-1.5">
                Nama kucing
              </label>

              <input
                type="text"
                placeholder="mis. Lila of Rumah Hana"
                className="w-full px-3.5 py-3 rounded-xl border border-[#EEDFD5] bg-white text-xs text-[#1A1513] placeholder:text-[#A09387] focus:outline-none focus:border-[#EE6B28]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#574D45] mb-1.5">
                Ras
              </label>

              <input
                type="text"
                placeholder="mis. Persian"
                className="w-full px-3.5 py-3 rounded-xl border border-[#EEDFD5] bg-white text-xs text-[#1A1513] placeholder:text-[#A09387] focus:outline-none focus:border-[#EE6B28]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#574D45] mb-1.5">
                EMS code
              </label>

              <input
                type="text"
                placeholder="mis. PER n 22"
                className="w-full px-3.5 py-3 rounded-xl border border-[#EEDFD5] bg-white text-xs text-[#1A1513] placeholder:text-[#A09387] focus:outline-none focus:border-[#EE6B28]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#574D45] mb-1.5">
                Tanggal lahir
              </label>

              <input
                type="date"
                className="w-full px-3.5 py-3 rounded-xl border border-[#EEDFD5] bg-white text-xs text-[#1A1513] focus:outline-none focus:border-[#EE6B28]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#574D45] mb-1.5">
                Jenis kelamin
              </label>

              <select
                className="w-full px-3.5 py-3 rounded-xl border border-[#EEDFD5] bg-white text-xs text-[#1A1513] focus:outline-none focus:border-[#EE6B28]"
                defaultValue="Male"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#574D45] mb-1.5">
                Nomor pedigree
                <span className="font-normal text-[#A09387]">
                  {" "}
                  (opsional)
                </span>
              </label>

              <input
                type="text"
                placeholder="ICA-PD-0000"
                className="w-full px-3.5 py-3 rounded-xl border border-[#EEDFD5] bg-white text-xs text-[#1A1513] placeholder:text-[#A09387] focus:outline-none focus:border-[#EE6B28]"
              />
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM ACTION */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#F7F5F0] border-t border-[#EAE5DF]/70 px-5 pt-3 pb-3">
        {tab === "my-cats" ? (
          <>
            <button
              type="button"
              onClick={onNext}
              disabled={selectedCatIds.length === 0}
              className={`w-full py-3.5 rounded-full text-xs font-bold transition-transform ${
                selectedCatIds.length > 0
                  ? "bg-gradient-to-r from-[#FFA26B] via-[#EE6B28] to-[#E35610] text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] active:scale-98 cursor-pointer"
                  : "bg-[#EEDFD5] text-[#8C8074] cursor-not-allowed"
              }`}
            >
              Daftarkan kucing terpilih
            </button>

            <p className="text-center text-[10px] text-[#857B72] mt-1.5">
              {selectedCatIds.length} kucing dipilih
            </p>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onNext}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFA26B] via-[#EE6B28] to-[#E35610] text-white text-xs font-bold shadow-[0_4px_12px_rgba(238,107,40,0.25)] active:scale-98 cursor-pointer"
            >
              Daftarkan kucing ini
            </button>

            <p className="text-center text-[10px] text-[#857B72] mt-1.5">
              Nama dan ras wajib diisi.
            </p>
          </>
        )}
      </div>
    </div>
  );
}