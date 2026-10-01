"use client";

import { useState } from "react";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import type { MaleCat } from "@/types/cattery";

interface StepPilihPejantanProps {
  cats?: MaleCat[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  showError?: boolean;
}

const breeds = ["Semua ras", "Persian Longhair", "Maine Coon", "British Shorthair"];

export default function StepPilihPejantan({
  cats = [],
  selectedId,
  onSelect,
  showError = false,
}: StepPilihPejantanProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBreed, setActiveBreed] = useState("Semua ras");

  const isInvalid = showError && selectedId === null;

  // Temukan objek kucing yang sedang dipilih untuk informasi dinamis
  const selectedCat = (cats || []).find((c) => c.id === selectedId);

  // Filter Kucing berdasarkan Search Query & Ras
  const filteredCats = (cats || []).filter((cat) => {
    const matchesSearch =
      cat.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.regCode?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBreed =
      activeBreed === "Semua ras" ||
      cat.breed?.toLowerCase() === activeBreed.toLowerCase();

    return matchesSearch && matchesBreed;
  });

  return (
    <div className="rounded-2xl sm:rounded-xl border border-[#EEDFD5] md:border-[var(--color-ink-100)] bg-white p-4 sm:p-6 transition shadow-2xs">
      {/* Header Info */}
      <div>
        <h2 className="font-display text-sm sm:text-base font-bold text-[#1A1513]">
          Pilih pejantan (Male)
        </h2>
        <p className="mt-1 text-xs text-[#8C8074] leading-relaxed">
          Hanya kucing milik cattery Anda yang sudah terdaftar dan bersertifikat pedigree yang muncul di daftar ini.
        </p>
      </div>

      {/* Search Input & Filter Breed */}
      <div className="mt-4 space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari nama atau nomor registrasi"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl md:rounded-xl border border-[#EEDFD5] bg-white px-4 py-2.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B] focus:ring-1 focus:ring-[#F05A1B] transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {breeds.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setActiveBreed(b)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeBreed === b
                  ? "bg-[#FFF2E8] text-[#F05A1B] border border-[#FCE3D2]"
                  : "bg-white text-[#7E7267] border border-[#EEDFD5] hover:bg-[#FAF7F5]"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* List Pejantan */}
      <div className="mt-4 space-y-3 border-t border-[#F4EFE9] pt-4">
        {filteredCats.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#8C8074]">
            Kucing pejantan tidak ditemukan.
          </div>
        ) : (
          filteredCats.map((cat) => {
            const isSelected = selectedId === cat.id;
            const isEligible = cat.certStatus === "Aktif";

            return (
              <button
                key={cat.id}
                type="button"
                disabled={!isEligible}
                onClick={() => onSelect(cat.id)}
                className={`flex w-full items-start md:items-center justify-between gap-3 rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? "border-[#F05A1B] bg-[#FFF8F2]"
                    : isInvalid
                    ? "border-red-400 hover:bg-[#FFF8F2]"
                    : "border-[#EEDFD5] hover:bg-[#FAF7F5]"
                } ${!isEligible ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#EFE9E1] flex items-center justify-center shrink-0 text-[#8C8074]">
                    <DashboardIcon name="cat" size={20} />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <h3 className="font-bold text-xs sm:text-sm text-[#1A1513] leading-tight truncate">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-[#8C8074] leading-tight">
                      {cat.regCode} · lahir {cat.birthDate}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="rounded-full bg-[#F4EFE9] px-2.5 py-0.5 text-[10px] font-semibold text-[#574D45]">
                        {cat.breed}
                      </span>
                      <span className="rounded-full bg-[#EAF6ED] px-2.5 py-0.5 text-[10px] font-semibold text-[#28844B]">
                        {cat.emsCode}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-1 md:pt-0 shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                      isSelected ? "border-[#F05A1B] bg-white" : "border-[#D1C2B3]"
                    }`}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#F05A1B]" />}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* ========================================================= */}
      {/* Card Pemberitahuan Pejantan Dipilih (MOBILE VIEW ONLY)   */}
      {/* ========================================================= */}
      {selectedCat && (
        <div className="md:hidden mt-4 rounded-2xl bg-[#EFF8F3] border border-[#D3EEDD] p-3.5 space-y-1 transition-all">
          <p className="text-xs font-bold text-[#1B804D]">
            Pejantan dipilih: <span className="font-extrabold">{selectedCat.name}</span>
          </p>
          <p className="text-[11px] text-[#2C6E49] leading-tight">
            Nomor sertifikat {selectedCat.regCode.replace("ICA", "PED")} akan terisi otomatis di step Mating Information.
          </p>
        </div>
      )}
    </div>
  );
}