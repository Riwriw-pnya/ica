"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import DashboardIcon from "../../../../components/anggota/DashboardIcon";
import type { CatteryItem } from "@/types/anggota";
import CatteryCardMobile from "./CatteryCardMobile";
import CatteryBottomSheetFilter from "./CatteryBottomSheetFilter";

interface CatteryDirectoryProps {
  items: CatteryItem[];
}

function FilterIconCustom() {
  return (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  );
}

export default function CatteryDirectory({ items = [] }: CatteryDirectoryProps) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("Semua wilayah");
  const [breed, setBreed] = useState("Semua ras");
  const [sortBy, setSortBy] = useState("Skor cattery tertinggi");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Bottom Sheet Mobile
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempRegion, setTempRegion] = useState(region);
  const [tempBreed, setTempBreed] = useState(breed);
  const [tempSortBy, setTempSortBy] = useState(sortBy);

  const regions = useMemo(
    () => ["Semua wilayah", ...Array.from(new Set(items.map((i) => i.region)))],
    [items]
  );

  const breeds = useMemo(
    () => ["Semua ras", ...Array.from(new Set(items.flatMap((i) => i.breeds)))],
    [items]
  );

  const sortOptions = ["Skor tertinggi", "Skor terendah", "Nama A-Z"];

  const handleOpenFilter = () => {
    setTempRegion(region);
    setTempBreed(breed);
    setTempSortBy(sortBy === "Skor cattery tertinggi" ? "Skor tertinggi" : sortBy);
    setIsFilterOpen(true);
  };

  const handleApplyFilter = () => {
    setRegion(tempRegion);
    setBreed(tempBreed);
    setSortBy(tempSortBy === "Skor tertinggi" ? "Skor cattery tertinggi" : tempSortBy);
    setIsFilterOpen(false);
  };

  const handleResetFilter = () => {
    setSearch("");
    setRegion("Semua wilayah");
    setBreed("Semua ras");
    setSortBy("Skor cattery tertinggi");
    setTempRegion("Semua wilayah");
    setTempBreed("Semua ras");
    setTempSortBy("Skor tertinggi");
  };

  const tempFilteredCount = useMemo(() => {
    return items.filter((i) => {
      const matchSearch = !search.trim() || i.name.toLowerCase().includes(search.toLowerCase());
      const matchRegion = tempRegion === "Semua wilayah" || i.region === tempRegion;
      const matchBreed = tempBreed === "Semua ras" || i.breeds.includes(tempBreed);
      return matchSearch && matchRegion && matchBreed;
    }).length;
  }, [items, search, tempRegion, tempBreed]);

  const filteredItems = useMemo(() => {
    let res = items.filter((i) => {
      const matchSearch = !search.trim() || i.name.toLowerCase().includes(search.toLowerCase());
      const matchRegion = region === "Semua wilayah" || i.region === region;
      const matchBreed = breed === "Semua ras" || i.breeds.includes(breed);
      return matchSearch && matchRegion && matchBreed;
    });

    if (sortBy.includes("tertinggi")) {
      res = [...res].sort((a, b) => b.score - a.score);
    } else if (sortBy.includes("terendah")) {
      res = [...res].sort((a, b) => a.score - b.score);
    } else if (sortBy === "Nama A-Z") {
      res = [...res].sort((a, b) => a.name.localeCompare(b.name));
    }

    return res;
  }, [items, search, region, breed, sortBy]);

  return (
    <>
      {/* 1. SEARCH & FILTER BAR MOBILE (< sm) */}
      <div className="sm:hidden mb-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8074]">
              <DashboardIcon name="search" size={16} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama cattery atau pemilik.."
              className="w-full rounded-xl border border-[#EEDFD5] bg-white py-2 pl-9 pr-3 text-[12px] text-[#1A1513] outline-none shadow-xs"
            />
          </div>

          <button
            onClick={handleOpenFilter}
            className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-[12px] font-semibold shadow-xs transition-colors ${
              region !== "Semua wilayah" || breed !== "Semua ras"
                ? "border-[#D95D1E] bg-[#FFF2E8] text-[#D95D1E]"
                : "border-[#EEDFD5] bg-white text-[#1A1513]"
            }`}
          >
            <FilterIconCustom />
            Filter
          </button>
        </div>
        <p className="text-[11px] text-[#8C8074]">{filteredItems.length} hasil</p>
      </div>

      {/* 2. MODAL FILTER BOTTOM SHEET MOBILE */}
      <CatteryBottomSheetFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onReset={handleResetFilter}
        onApply={handleApplyFilter}
        regions={regions}
        breeds={breeds}
        sortOptions={sortOptions}
        tempRegion={tempRegion}
        setTempRegion={setTempRegion}
        tempBreed={tempBreed}
        setTempBreed={setTempBreed}
        tempSortBy={tempSortBy}
        setTempSortBy={setTempSortBy}
        matchCount={tempFilteredCount}
      />

      {/* 3. FILTER DESKTOP (>= sm) */}
      <div className="hidden sm:block rounded-xl border border-[#EEDFD5] bg-white p-5 shadow-sm mb-4">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8074]">
            <DashboardIcon name="search" size={16} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama cattery atau pemilik..."
            className="w-full rounded-lg border border-[#EEDFD5] bg-white py-2.5 pl-9 pr-3 text-[13px] text-[#1A1513] outline-none"
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <label className="text-[12px] font-medium text-[#7E7267]">Wilayah</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[#EEDFD5] bg-white px-3 py-2 text-[13px] text-[#1A1513] outline-none cursor-pointer"
            >
              {regions.map((r) => (
                <option key={r} value={r} className="bg-white text-[#1A1513]">
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[12px] font-medium text-[#7E7267]">Ras kucing</label>
            <select
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[#EEDFD5] bg-white px-3 py-2 text-[13px] text-[#1A1513] outline-none cursor-pointer"
            >
              {breeds.map((b) => (
                <option key={b} value={b} className="bg-white text-[#1A1513]">
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[12px] font-medium text-[#7E7267]">Urutkan</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[#EEDFD5] bg-white px-3 py-2 text-[13px] text-[#1A1513] outline-none cursor-pointer"
            >
              <option value="Skor cattery tertinggi" className="bg-white text-[#1A1513]">
                Skor cattery tertinggi
              </option>
              <option value="Nama A-Z" className="bg-white text-[#1A1513]">
                Nama A-Z
              </option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[12px] text-[#8C8074]">{filteredItems.length} cattery ditemukan</p>
          <button
            onClick={handleResetFilter}
            className="rounded-lg border border-[#EEDFD5] bg-white px-3 py-1.5 text-[12px] font-medium text-[#2D2825] hover:bg-[#FFF2E8] transition-colors"
          >
            Reset filter
          </button>
        </div>
      </div>

      {/* 4. LIST ITEM CATTERY */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <React.Fragment key={item.id}>
              {/* Tampilan Mobile Card */}
              <CatteryCardMobile item={item} />

              {/* Tampilan Desktop Card */}
              <div className="hidden sm:block overflow-hidden rounded-xl border border-[#EEDFD5] bg-white shadow-xs">
                <div className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FFF2E8] text-[#D95D1E]">
                      <DashboardIcon name="home" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-sm font-bold text-[#1A1513]">{item.name}</h3>
                        <span className="shrink-0 rounded-full bg-[#EAF6ED] px-2 py-0.5 text-[10px] font-semibold text-[#28844B]">
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-[#7E7267]">
                        {item.region} · {item.breeds.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right pr-2">
                      <p className="text-[9px] font-bold uppercase text-[#8C8074]">SKOR</p>
                      <p className="text-base font-bold text-[#D95D1E]">{item.score}</p>
                    </div>
                    <a
                      href={`https://wa.me/${item.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EEDFD5] bg-[#EAF6ED] text-[#28844B]"
                    >
                      <DashboardIcon name="chat" size={16} />
                    </a>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EEDFD5] text-[#2D2825]"
                    >
                      <span className={`inline-block transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                        <DashboardIcon name="chevron" size={14} />
                      </span>
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-[#EEDFD5] bg-[#FAF7F5] p-4">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold text-[#7E7267]">Alamat lengkap</p>
                        <p className="mt-1 text-[#1A1513]">{item.address}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-[#7E7267]">Ras kucing yang dimiliki</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.breeds.map((b) => (
                            <span key={b} className="rounded-md bg-[#FFF2E8] px-2 py-0.5 text-[11px] font-semibold text-[#D95D1E]">
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3 pt-2">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#EEDFD5] bg-white px-3 py-1 text-xs font-semibold text-[#2D2825]"
                      >
                        <DashboardIcon name="pin" size={12} /> Buka Google Maps
                      </a>
                      <Link
                        href={item.href || `/anggota/direktori/${item.id}`}
                        className="text-xs font-bold text-[#D95D1E] hover:underline"
                      >
                        Lihat detail cattery →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <p className="mt-8 text-center text-xs text-[#8C8074]">
          Tidak ada cattery yang cocok dengan filter ini.
        </p>
      )}
    </>
  );
}