"use client";

interface CatteryFilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedWilayah: string;
  setSelectedWilayah: (val: string) => void;
  selectedRas: string;
  setSelectedRas: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  totalCount: number;
  resetFilter: () => void;
}

export default function CatteryFilter({
  searchQuery,
  setSearchQuery,
  selectedWilayah,
  setSelectedWilayah,
  selectedRas,
  setSelectedRas,
  sortBy,
  setSortBy,
  totalCount,
  resetFilter,
}: CatteryFilterProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-[#E9E2DC] shadow-xs space-y-5">
      {/* Input Search */}
      <div className="relative">
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#A89F95]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama cattery atau pemilik..."
          className="w-full pl-12 pr-4 py-3.5 text-xs md:text-sm rounded-2xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] transition bg-white text-[#231A14] placeholder:text-[#A89F95]"
        />
      </div>

      {/* Baris Dropdown Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filter Wilayah */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#4A3D34]">Wilayah</label>
          <select
            value={selectedWilayah}
            onChange={(e) => setSelectedWilayah(e.target.value)}
            className="w-full px-4 py-3 text-xs md:text-sm rounded-xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] transition bg-white text-[#231A14] cursor-pointer"
          >
            <option value="Semua wilayah">Semua wilayah</option>
            <option value="Jawa Barat">Jawa Barat</option>
            <option value="DKI Jakarta">DKI Jakarta</option>
            <option value="Jawa Timur">Jawa Timur</option>
          </select>
        </div>

        {/* Filter Ras Kucing */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#4A3D34]">Ras kucing</label>
          <select
            value={selectedRas}
            onChange={(e) => setSelectedRas(e.target.value)}
            className="w-full px-4 py-3 text-xs md:text-sm rounded-xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] transition bg-white text-[#231A14] cursor-pointer"
          >
            <option value="Semua ras">Semua ras</option>
            <option value="Persian">Persian</option>
            <option value="Exotic Shorthair">Exotic Shorthair</option>
            <option value="Maine Coon">Maine Coon</option>
            <option value="British Shorthair">British Shorthair</option>
            <option value="Ragdoll">Ragdoll</option>
          </select>
        </div>

        {/* Urutkan */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#4A3D34]">Urutkan</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-3 text-xs md:text-sm rounded-xl border border-[#E9E2DC] focus:outline-none focus:border-[#EE6B28] transition bg-white text-[#231A14] cursor-pointer"
          >
            <option value="name-az">Nama Cattery (A - Z)</option>
            <option value="name-za">Nama Cattery (Z - A)</option>
          </select>
        </div>
      </div>

      {/* Info Jumlah Hasil & Tombol Reset */}
      <div className="flex justify-between items-center pt-2 border-t border-[#F3D1BD]/30">
        <p className="text-xs text-[#7A6E65] font-medium">
          <strong className="text-[#231A14]">{totalCount}</strong> cattery ditemukan
        </p>
        <button
          onClick={resetFilter}
          className="text-xs text-[#EE6B28] font-semibold hover:underline cursor-pointer bg-[#FFF6EC] px-3.5 py-1.5 rounded-lg border border-[#F3D1BD]/50 transition"
        >
          Reset filter
        </button>
      </div>
    </div>
  );
}