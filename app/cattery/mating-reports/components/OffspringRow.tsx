"use client";

import React from "react";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import type { OffspringItem, OffspringGender } from "@/types/cattery";
import type { SaveStatus } from "./StepAddOffspring";

const registeredMembers: Record<string, string> = {
  "08123456789": "ICA-2024-0871",
  "08771686055": "",
  "081299998888": "ICA-2023-0124",
  "085712345678": "ICA-2025-0452",
};

interface ExtendedOffspringItem extends OffspringItem {
  emsCode?: string;
  microchipNumber?: string;
  adopterName?: string;
  adopterPhone?: string;
  adopterCategory?: "ICA Member" | "Kategori Umum";
  icaMemberNumber?: string; // Field tambahan untuk nomor ICA member
}

interface OffspringRowProps {
  index: number;
  item?: ExtendedOffspringItem;
  saveStatus?: SaveStatus;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onChange: (updated: ExtendedOffspringItem) => void;
  onRemove: () => void;
  defaultBreed?: string;
}

export default function OffspringRow({
  index,
  item = {
    id: Date.now(),
    name: "",
    gender: "" as OffspringGender,
    color: "",
    birthDate: "",
    birthWeight: "",
    breed: "",
    status: "" as any,
    emsCode: "",
    microchipNumber: "",
    adopterName: "",
    adopterPhone: "",
    adopterCategory: undefined,
    icaMemberNumber: "",
  },
  saveStatus = "belum lengkap",
  isExpanded,
  onToggleExpand,
  onChange,
  onRemove,
  defaultBreed = "Persian Longhair",
}: OffspringRowProps) {
  if (!item) return null;

  const update = (patch: Partial<ExtendedOffspringItem>) => onChange({ ...item, ...patch });

  const handlePhotoPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) update({ photoName: file.name });
  };

  const isGenderSelected = (label: "M" | "F") => {
    const rawGender = String(item.gender);
    return rawGender === "M" || rawGender === "F"
      ? rawGender === label
      : rawGender === (label === "M" ? "Jantan" : "Betina");
  };

  const handleGenderSelect = (label: "M" | "F") => {
    update({ gender: (label as unknown) as OffspringGender });
  };

  const isComplete = Boolean(item.name && item.gender && item.birthDate);
  const isPartial = Boolean(item.name || item.gender || item.birthDate) && !isComplete;

  const phoneClean = (item.adopterPhone || "").replace(/[^0-9]/g, "");
  const memberCode = phoneClean ? registeredMembers[phoneClean] : null;

  const currentCategory = item.adopterCategory || "ICA Member";

  return (
    <div>
      {/* ========================================================= */}
      {/* 1. MOBILE VIEW CARD LAYOUT                                */}
      {/* ========================================================= */}
      <div className="block sm:hidden rounded-2xl border border-[#EEDFD5] bg-white p-4 space-y-4 shadow-2xs">
        
        {/* Header Mobile Card Kitten */}
        <div className="flex items-center justify-between border-b border-[#F4EFE9] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-8 rounded-lg bg-[#FFF2E8] border border-[#FCE3D2] flex items-center justify-center text-xs font-bold text-[#F05A1B]">
              {index + 1}
            </span>
            <div>
              <h3 className="font-bold text-xs text-[#1A1513]">
                {item.name || `Kitten ${index + 1}`}
              </h3>
              <p className="text-[11px] text-[#8C8074]">
                {item.birthDate ? item.birthDate : "Nama, jenis kelamin..."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveStatus === "tersimpan" || isComplete ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success-bg)] px-2.5 py-1 text-[9px] font-bold text-[var(--color-success)] border border-[#D3EEDD]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" /> TERSIMPAN
              </span>
            ) : isPartial ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-warning-bg)] px-2.5 py-1 text-[9px] font-bold text-[#B58514] border border-[#FCE3D2]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-warning)]" /> SEBAGIAN
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F4EFE9] px-2.5 py-1 text-[9px] font-bold text-[#8C8074] border border-[#E8DED5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C8074]" /> BELUM DIISI
              </span>
            )}

            <button
              type="button"
              onClick={onRemove}
              className="text-xs text-gray-500 font-semibold px-1.5 py-1 rounded-md hover:bg-red-50"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Input 1: Nama Kitten */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#1A1513]">
            Nama kitten <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={item.name || ""}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Nama kitten"
            className="w-full rounded-2xl border border-[#EEDFD5] px-4 py-2.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
          />
        </div>

        {/* Input 2: Jenis Kelamin Mobile - Model Dropdown Select */}
        <div className="space-y-1 relative">
          <label className="text-xs font-bold text-[#1A1513]">
            Jenis kelamin <span className="text-red-500">*</span>
          </label>
          
          <div className="relative">
            <select
              value={
                String(item.gender) === "M" || String(item.gender) === "Jantan"
                  ? "M"
                  : String(item.gender) === "F" || String(item.gender) === "Betina"
                  ? "F"
                  : ""
              }
              onChange={(e) => {
                const val = e.target.value;
                update({ gender: (val as unknown) as OffspringGender });
              }}
              className="w-full appearance-none rounded-2xl border border-[#EEDFD5] bg-white px-4 py-2.5 text-xs text-[#1A1513] outline-none focus:border-[#F05A1B] cursor-pointer pr-10"
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8C8074]">
              <DashboardIcon name="chevron" size={12} />
            </div>
          </div>
        </div>

        {/* Input 3: Tanggal Lahir */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#1A1513]">
            Tanggal lahir <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={item.birthDate || ""}
            onChange={(e) => update({ birthDate: e.target.value })}
            className="w-full max-w-full rounded-2xl border border-[#EEDFD5] px-4 py-2.5 text-xs text-[#1A1513] bg-white outline-none focus:border-[#F05A1B]"
          />
        </div>

        {/* Input 4: Ras */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#1A1513]">Ras</label>
          <input
            type="text"
            value={item.breed || defaultBreed}
            onChange={(e) => update({ breed: e.target.value })}
            placeholder="Persian Longhair"
            className="w-full rounded-2xl border border-[#EEDFD5] px-4 py-2.5 text-xs text-[#1A1513] outline-none focus:border-[#F05A1B]"
          />
          <p className="text-[10px] text-[#8C8074]">Terisi otomatis dari kombinasi ras pejantan dan induk</p>
        </div>

        {/* Input 5: Kode Warna Turunan */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#1A1513]">Kode warna turunan</label>
          <input
            type="text"
            value={item.color || ""}
            onChange={(e) => update({ color: e.target.value })}
            placeholder="Blue Tabby / Silver Tabby"
            className="w-full rounded-2xl border border-[#EEDFD5] px-4 py-2.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
          />
        </div>

        {/* Input 6: Nomor Microchip */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#1A1513]">Nomor microchip</label>
          <input
            type="text"
            value={item.microchipNumber || ""}
            onChange={(e) => update({ microchipNumber: e.target.value })}
            placeholder="985 1410 0067 2281"
            className="w-full rounded-2xl border border-[#EEDFD5] px-4 py-2.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
          />
        </div>

        {/* Section 7: Data Adopter Mobile */}
        <div className="border-t border-dashed border-[#EEDFD5] pt-3 space-y-3">
          <p className="text-[11px] text-[#8C8074]">Data adopter (opsional)</p>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1513]">Nama adopter kucing</label>
            <input
              type="text"
              value={item.adopterName || ""}
              onChange={(e) => update({ adopterName: e.target.value })}
              placeholder="Nama lengkap adopter"
              className="w-full rounded-2xl border border-[#EEDFD5] px-4 py-2.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1513]">Nomor telepon adopter</label>
            <input
              type="text"
              value={item.adopterPhone || ""}
              onChange={(e) => update({ adopterPhone: e.target.value })}
              placeholder="+62"
              className="w-full rounded-2xl border border-[#EEDFD5] px-4 py-2.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1513]">Kategori adopter</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => update({ adopterCategory: "ICA Member" })}
                className={`py-2.5 rounded-2xl border text-xs font-bold transition ${
                  currentCategory === "ICA Member"
                    ? "border-[#F05A1B] bg-[#FFF2E8] text-[#F05A1B]"
                    : "border-[#EEDFD5] bg-white text-[#8C8074]"
                }`}
              >
                ICA Member
              </button>
              <button
                type="button"
                onClick={() => update({ adopterCategory: "Kategori Umum" })}
                className={`py-2.5 rounded-2xl border text-xs font-bold transition ${
                  currentCategory === "Kategori Umum"
                    ? "border-[#F05A1B] bg-[#FFF2E8] text-[#F05A1B]"
                    : "border-[#EEDFD5] bg-white text-[#8C8074]"
                }`}
              >
                Kategori Umum
              </button>
            </div>
          </div>

          {/* FIELD DINAMIS NOMOR ICA MEMBER (MUNCUL KETIKA ICA MEMBER DIPILIH DI MOBILE) */}
          {currentCategory === "ICA Member" && (
            <div className="space-y-1 pt-1 animate-in fade-in duration-200">
              <label className="text-xs font-bold text-[#1A1513]">Nomor ICA Member</label>
              <input
                type="text"
                value={item.icaMemberNumber || ""}
                onChange={(e) => update({ icaMemberNumber: e.target.value })}
                placeholder="ICA-MBR-0000"
                className="w-full rounded-2xl border border-[#EEDFD5] bg-white px-4 py-2.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
              />
              <p className="text-[10px] text-[#8C8074]">Diverifikasi admin ICA saat review</p>
            </div>
          )}
        </div>

        {/* Section 8: Keterangan Tambahan Mobile - Model Dropdown Select */}
        <div className="border-t border-dashed border-[#EEDFD5] pt-3 space-y-3">
          <p className="text-[11px] text-[#8C8074]">Keterangan tambahan (opsional)</p>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1513]">Berat</label>
            <div className="relative">
              <input
                type="text"
                value={item.birthWeight || ""}
                onChange={(e) => update({ birthWeight: e.target.value })}
                placeholder="0"
                className="w-full rounded-2xl border border-[#EEDFD5] px-4 py-2.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
              />
              <span className="absolute right-4 top-2.5 text-xs font-semibold text-[#EE6B28]">gram</span>
            </div>
          </div>

          {/* STATUS KITTEN MOBILE: Dropdown Select biasa */}
          <div className="space-y-1 relative">
            <label className="text-xs font-bold text-[#1A1513]">Status</label>
            <div className="relative">
              <select
                value={item.status || ""}
                onChange={(e) => update({ status: e.target.value as any })}
                className="w-full appearance-none rounded-2xl border border-[#EEDFD5] bg-white px-4 py-2.5 text-xs text-[#1A1513] outline-none focus:border-[#F05A1B] cursor-pointer pr-10"
              >
                <option value="">Pilih status</option>
                <option value="Hidup">Hidup</option>
                <option value="Mati">Mati</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8C8074]">
                <DashboardIcon name="chevron" size={12} />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1513]">Foto kitten</label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-[#EEDFD5] bg-[#FAF7F5] p-3 text-xs font-semibold text-[#8C8074]">
              <span>Ambil foto atau pilih dari galeri</span>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoPick} />
            </label>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. DESKTOP VIEW TABLE LAYOUT (TIDAK ADA YANG DIUBAH)      */}
      {/* ========================================================= */}
      <div className="hidden sm:block border-b border-[#EEDFD5] last:border-b-0 bg-white">
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="text-xs font-bold text-[#8C8074] w-5">
            {index + 1}
          </span>

          <div className="flex-1">
            <input
              type="text"
              value={item.name || ""}
              onChange={(e) => update({ name: e.target.value })}
              placeholder="Belum diisi"
              className="w-full rounded-xl border border-[#EEDFD5] px-3 py-1.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
            />
          </div>

          <div className="flex gap-1 w-20 shrink-0 justify-center">
            {(["M", "F"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => handleGenderSelect(g)}
                className={`flex h-7 w-7 items-center justify-center rounded-lg border text-xs font-bold transition ${
                  isGenderSelected(g)
                    ? "border-[#F05A1B] bg-[#FFF2E8] text-[#F05A1B]"
                    : "border-[#EEDFD5] bg-white text-[#8C8074] hover:bg-gray-50"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="w-40 shrink-0">
            <input
              type="text"
              value={item.color || ""}
              onChange={(e) => update({ color: e.target.value })}
              placeholder="mis. Blue tabby"
              className="w-full rounded-xl border border-[#EEDFD5] px-3 py-1.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
            />
          </div>

          <div className="w-36 shrink-0">
            <input
              type="date"
              value={item.birthDate || ""}
              onChange={(e) => update({ birthDate: e.target.value })}
              className="w-full rounded-xl border border-[#EEDFD5] px-3 py-1.5 text-xs text-[#1A1513] outline-none focus:border-[#F05A1B]"
            />
          </div>

          {/* Badge Status Simpan Desktop */}
          <div className="w-32 text-center shrink-0">
            {saveStatus === "tersimpan" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#EFF8F3] px-2.5 py-0.5 text-[10px] font-bold text-[#28844B] border border-[#D3EEDD]">
                Tersimpan
              </span>
            )}
            {saveStatus === "belum disimpan" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF2E8] px-2.5 py-0.5 text-[10px] font-bold text-[#EE6B28] border border-[#FCE3D2]">
                Belum disimpan
              </span>
            )}
            {(saveStatus === "belum lengkap" || !saveStatus) && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F4EFE9] px-2.5 py-0.5 text-[10px] font-bold text-[#8C8074] border border-[#E8DED5]">
                Belum lengkap
              </span>
            )}
            {saveStatus === "gagal disimpan" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FDE8E8] px-2.5 py-0.5 text-[10px] font-bold text-[#E02424] border border-[#F8B4B4]">
                Gagal disimpan
              </span>
            )}
          </div>

          {/* Tombol Detail (Panah Segitiga ▼ / ▲) */}
          <div className="flex items-center justify-end gap-1.5 w-16 shrink-0">
            <button
              type="button"
              onClick={onToggleExpand}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#EEDFD5] bg-white text-[#1A1513] transition hover:bg-[#FAF7F5] shadow-2xs"
              aria-label={isExpanded ? "Tutup detail" : "Buka detail"}
            >
              <span className="text-[10px] text-[#1A1513]">
                {isExpanded ? "▲" : "▼"}
              </span>
            </button>

            <button
              type="button"
              onClick={onRemove}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#EEDFD5] bg-white text-[#8C8074] transition hover:border-red-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Baris Detail Desktop */}
        {isExpanded && (
          <div className="border-t border-[#F4EFE9] bg-[#FAF7F5] px-4 py-4 space-y-4">
            <div className="grid grid-cols-5 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#8C8074]">Berat lahir (gram)</label>
                <input
                  type="text"
                  value={item.birthWeight || ""}
                  onChange={(e) => update({ birthWeight: e.target.value })}
                  placeholder="mis. 105"
                  className="mt-1 w-full rounded-xl border border-[#EEDFD5] bg-white px-3 py-1.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#8C8074]">Kode warna (EMS)</label>
                <input
                  type="text"
                  value={item.emsCode || ""}
                  onChange={(e) => update({ emsCode: e.target.value })}
                  placeholder="mis. PER n 22"
                  className="mt-1 w-full rounded-xl border border-[#EEDFD5] bg-white px-3 py-1.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#8C8074]">Ras / breed kitten</label>
                <input
                  type="text"
                  value={item.breed || ""}
                  onChange={(e) => update({ breed: e.target.value })}
                  placeholder="mis. Persian"
                  className="mt-1 w-full rounded-xl border border-[#EEDFD5] bg-white px-3 py-1.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
                />
              </div>

              {/* Status Kitten Desktop */}
              <div>
                <label className="text-[11px] font-bold text-[#8C8074]">Status</label>
                <div className="mt-1 grid grid-cols-3 gap-1">
                  {(["Hidup", "Mati"] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => update({ status })}
                      className={`rounded-xl border px-1.5 py-1.5 text-[10px] font-semibold transition truncate ${
                        item.status === status
                          ? status === "Hidup"
                            ? "border-[#28844B] bg-[#EFF8F3] text-[#28844B]"
                            : status === "Mati"
                            ? "border-[#E02424] bg-[#FDE8E8] text-[#E02424]"
                            : "border-[#EE6B28] bg-[#FFF2E8] text-[#EE6B28]"
                          : "border-[#EEDFD5] bg-white text-[#8C8074] hover:bg-[#FAF7F5]"
                      }`}
                    >
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#8C8074]">Foto kitten</label>
                <label className="mt-1 flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#F05A1B] bg-white px-3 py-1.5 text-xs font-semibold text-[#F05A1B] transition hover:bg-[#FFF2E8]">
                  <span className="truncate">{item.photoName ?? "Pilih foto"}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoPick} />
                </label>
              </div>
            </div>

            <div className="border-t border-[#EEDFD5] pt-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#8C8074]">
                MICROCHIP & ADOPTER
              </h4>

              <div className="mt-2 grid grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#8C8074]">Nomor microchip</label>
                  <input
                    type="text"
                    value={item.microchipNumber || ""}
                    onChange={(e) => update({ microchipNumber: e.target.value })}
                    placeholder="360098004471237"
                    className="mt-1 w-full rounded-xl border border-[#EEDFD5] bg-white px-3 py-1.5 text-xs text-[#8C8074] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
                  />
                  <p className="mt-1 text-[10px] text-[#8C8074]">15 digit ISO · kode negara 360</p>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#8C8074]">Nama adopter kucing</label>
                  <input
                    type="text"
                    value={item.adopterName || ""}
                    onChange={(e) => update({ adopterName: e.target.value })}
                    placeholder="Kosongkan jika belum diadopsi"
                    className="mt-1 w-full rounded-xl border border-[#EEDFD5] bg-white px-3 py-1.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#8C8074]">Nomor telepon adopter</label>
                  <input
                    type="text"
                    value={item.adopterPhone || ""}
                    onChange={(e) => update({ adopterPhone: e.target.value })}
                    placeholder="08xx-xxxx-xxxx"
                    className="mt-1 w-full rounded-xl border border-[#EEDFD5] bg-white px-3 py-1.5 text-xs text-[#1A1513] placeholder-[#A39990] outline-none focus:border-[#F05A1B]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#8C8074]">Kategori adopter</label>
                  <div className="mt-1.5 flex items-center min-h-[32px]">
                    {!item.adopterPhone ? (
                      <span className="text-xs text-[#A39990] italic">Menunggu nomor telepon</span>
                    ) : memberCode ? (
                      <span className="inline-flex items-center rounded-full bg-[#EAF6ED] px-3 py-1 text-xs font-bold text-[#1F7A42] border border-[#D1EBD9]">
                        ICA Member - {memberCode}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-[#EFE9E1] px-3 py-1 text-xs font-medium text-[#574D45]">
                        Kategori Umum
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}