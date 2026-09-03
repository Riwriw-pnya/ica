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
  },
];

export default function CatteryNamesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWilayah, setSelectedWilayah] = useState("Semua wilayah");
  const [selectedRas, setSelectedRas] = useState("Semua ras");
  const [sortBy, setSortBy] = useState("name-az");

  // State kartu mana saja yang terbuka (default item ID 1 terbuka)
  const [expandedIds, setExpandedIds] = useState<number[]>([1]);

  const toggleExpand = (id: number) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  // Logika Filter & Pencarian
  const filteredCatteries = initialCatteries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWilayah =
      selectedWilayah === "Semua wilayah" || item.wilayah === selectedWilayah;

    const matchesRas =
      selectedRas === "Semua ras" || item.breeds.includes(selectedRas);

    return matchesSearch && matchesWilayah && matchesRas;
  });

  // Logika Sorting
  const sortedCatteries = [...filteredCatteries].sort((a, b) => {
    if (sortBy === "name-az") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "name-za") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  const resetFilter = () => {
    setSearchQuery("");
    setSelectedWilayah("Semua wilayah");
    setSelectedRas("Semua ras");
    setSortBy("name-az");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#231A14] flex flex-col">
      <Navbar />
      
      {/* Diubah py-6 agar lebih ke atas, dan space-y-8 untuk jarak antar section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-6 space-y-8 w-full">
        
        {/* Bagian Judul dengan Garis Kiri-Kanan */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-[#E9E2DC]"></div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#231A14] tracking-tight text-center">
              Cattery <span className="text-[#EE6B28]">Names</span>
            </h1>
            <div className="flex-1 h-[1px] bg-[#E9E2DC]"></div>
          </div>
          <p className="text-xs sm:text-sm text-[#7A6E65] text-center max-w-lg mx-auto">
            Temukan berbagai inspirasi nama dan daftar cattery terpercaya di Indonesia.
          </p>
        </div>

        {/* Komponen Filter */}
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

        {/* Daftar Kartu Cattery */}
        <div className="space-y-4">
          {sortedCatteries.length > 0 ? (
            sortedCatteries.map((cattery) => (
              <CatteryCard
                key={cattery.id}
                cattery={cattery}
                isExpanded={expandedIds.includes(cattery.id)}
                onToggle={() => toggleExpand(cattery.id)}
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-[#E9E2DC] p-12 text-center space-y-2">
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