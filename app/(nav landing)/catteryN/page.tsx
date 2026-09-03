"use client";

import { useState } from "react";
import Navbar from "@/app/landing-page/components/Navbar";
import Footer from "@/app/landing-page/components/Footer";
import CatteryFilter from "./components/CatteryFilter";
import CatteryCard from "./components/CatteryCard";
import { Cattery } from "./types";

const initialCatteries: Cattery[] = [
  {
    id: 1,
    name: "Auroria Cattery",
    owner: "Rizky Pratama",
    wilayah: "Jawa Barat",
    locationText: "Jawa Barat • Persian, Exotic Shorthair",
    fullAddress: "Jl. Cimanuk No. 24, Citarum, Bandung Wetan, Kota Bandung 40115",
    breeds: ["Persian", "Exotic Shorthair"],
    whatsapp: "0812-8890-1122",
    mapsUrl: "https://maps.google.com",
    images: [
      "https://picsum.photos/seed/auroria1/600/450",
      "https://picsum.photos/seed/auroria2/600/450",
      "https://picsum.photos/seed/auroria3/600/450",
    ],
  },
  {
    id: 2,
    name: "Bintang Kecil Cattery",
    owner: "Siti Rahma",
    wilayah: "DKI Jakarta",
    locationText: "DKI Jakarta • Maine Coon",
    fullAddress: "Jl. Kemang Raya No. 12, Mampang Prapatan, Jakarta Selatan",
    breeds: ["Maine Coon"],
    whatsapp: "0813-5544-7788",
    mapsUrl: "https://maps.google.com",
    images: [
      "https://picsum.photos/seed/bintang1/600/450",
      "https://picsum.photos/seed/bintang2/600/450",
    ],
  },
  {
    id: 3,
    name: "Cendana Cats",
    owner: "Budi Santoso",
    wilayah: "Jawa Timur",
    locationText: "Jawa Timur • British Shorthair",
    fullAddress: "Jl. Darmo Permai Selatan III, Surabaya",
    breeds: ["British Shorthair"],
    whatsapp: "0818-9922-3344",
    mapsUrl: "https://maps.google.com",
    images: ["https://picsum.photos/seed/cendana1/600/450"],
  },
  {
    id: 4,
    name: "Velvet Paws Cattery",
    owner: "Jessica Wijaya",
    wilayah: "Jawa Barat",
    locationText: "Jawa Barat • Ragdoll, Persian",
    fullAddress: "Jl. Setiabudi No. 193, Isola, Sukasari, Bandung",
    breeds: ["Ragdoll", "Persian"],
    whatsapp: "0821-3344-5566",
    mapsUrl: "https://maps.google.com",
    images: [
      "https://picsum.photos/seed/velvet1/600/450",
      "https://picsum.photos/seed/velvet2/600/450",
      "https://picsum.photos/seed/velvet3/600/450",
      "https://picsum.photos/seed/velvet4/600/450",
    ],
  },
];

export default function CatteryNamesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWilayah, setSelectedWilayah] = useState("Semua wilayah");
  const [selectedRas, setSelectedRas] = useState("Semua ras");
  const [sortBy, setSortBy] = useState("name-az");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [expandedIds, setExpandedIds] = useState<number[]>([1]);

  const toggleExpand = (id: number) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const filteredCatteries = initialCatteries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWilayah = selectedWilayah === "Semua wilayah" || item.wilayah === selectedWilayah;
    const matchesRas = selectedRas === "Semua ras" || item.breeds.includes(selectedRas);
    return matchesSearch && matchesWilayah && matchesRas;
  });

  const sortedCatteries = [...filteredCatteries].sort((a, b) => {
    if (sortBy === "name-az") return a.name.localeCompare(b.name);
    if (sortBy === "name-za") return b.name.localeCompare(a.name);
    return 0;
  });

  const resetFilter = () => {
    setSearchQuery("");
    setSelectedWilayah("Semua wilayah");
    setSelectedRas("Semua ras");
    setSortBy("name-az");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFBF7] text-[#231A14]">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-6 py-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-[#E9E2DC]"></div>
            <h1 className="text-center text-2xl font-extrabold tracking-tight text-[#231A14] sm:text-3xl">
              Cattery <span className="text-[#EE6B28]">Names</span>
            </h1>
            <div className="h-[1px] flex-1 bg-[#E9E2DC]"></div>
          </div>
          <p className="mx-auto max-w-lg text-center text-xs text-[#7A6E65] sm:text-sm">
            Temukan berbagai inspirasi nama dan daftar cattery terpercaya di Indonesia.
          </p>
        </div>

        <CatteryFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedWilayah={selectedWilayah}
          setSelectedWilayah={setSelectedWilayah}
          selectedRas={selectedRas}
          setSelectedRas={setSelectedRas}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCount={sortedCatteries.length}
          resetFilter={resetFilter}
        />

        <div className="flex items-center justify-end">
          <div className="flex items-center gap-1 rounded-xl border border-[#E9E2DC] bg-white p-1">
            <button
              onClick={() => setViewMode("list")}
              aria-label="Tampilan list"
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                viewMode === "list" ? "bg-[#FFF6EC] text-[#EE6B28]" : "text-[#A89F95] hover:bg-[#F7F4F1]"
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Tampilan grid"
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                viewMode === "grid" ? "bg-[#FFF6EC] text-[#EE6B28]" : "text-[#A89F95] hover:bg-[#F7F4F1]"
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
          </div>
        </div>

        <div className={viewMode === "grid" ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
          {sortedCatteries.length > 0 ? (
            sortedCatteries.map((cattery) => (
              <CatteryCard
                key={cattery.id}
                cattery={cattery}
                isExpanded={expandedIds.includes(cattery.id)}
                onToggle={() => toggleExpand(cattery.id)}
                view={viewMode}
              />
            ))
          ) : (
            <div className="space-y-2 rounded-2xl border border-[#E9E2DC] bg-white p-12 text-center">
              <p className="text-sm font-bold text-[#231A14]">Tidak ada cattery yang ditemukan</p>
              <p className="text-xs text-[#7A6E65]">Coba ubah kata kunci atau filter pencarian Anda.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}