"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { Product, Category } from "../StorePage";

interface Props {
  products: Product[];
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onOpenProduct: (product: Product) => void;
  onOpenHistory: () => void;
  formatRupiah: (value: number) => string;
}

export default function StoreCatalogDesktop({
  products,
  categories,
  activeCategory,
  setActiveCategory,
  onOpenProduct,
  onOpenHistory,
  formatRupiah,
}: Props) {
  // State untuk Pencarian, Filter & Sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("relevan");
  const [priceFilter, setPriceFilter] = useState("semua");
  const [stockFilter, setStockFilter] = useState("semua");
  const [badgeFilter, setBadgeFilter] = useState("semua");

  // Logika Filter & Search
  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // Filter Kata Kunci
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      );
    }

    // Filter Rentang Harga
    if (priceFilter === "under100") {
      list = list.filter((p) => p.price < 100000);
    } else if (priceFilter === "100to200") {
      list = list.filter((p) => p.price >= 100000 && p.price <= 200000);
    } else if (priceFilter === "above200") {
      list = list.filter((p) => p.price > 200000);
    }

    // Filter Ketersediaan Stok
    if (stockFilter === "limited") {
      list = list.filter((p) => p.stock > 0 && p.stock <= 20);
    } else if (stockFilter === "available") {
      list = list.filter((p) => p.stock >= 20);
    }

    // Filter Label Produk
    if (badgeFilter !== "semua") {
      list = list.filter((p) => p.badge === badgeFilter);
    }

    // Pengurutan (Sort)
    if (sortOption === "termurah") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === "termahal") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === "stok_terbanyak") {
      list.sort((a, b) => b.stock - a.stock);
    } else if (sortOption === "nama_asc") {
    list.sort((a, b) => a.title.localeCompare(b.title));
  }

    return list;
  }, [products, searchQuery, priceFilter, stockFilter, badgeFilter, sortOption]);

  const handleResetFilter = () => {
    setSearchQuery("");
    setSortOption("relevan");
    setPriceFilter("semua");
    setStockFilter("semua");
    setBadgeFilter("semua");
    setActiveCategory("semua");
  };

  return (
    <>
      {/* Header Store */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
            Store ICA
          </h1>

          <p className="mt-1 text-[12px] text-[var(--color-ink-700)] max-w-2xl">
            Merchandise, publikasi, dan perlengkapan resmi yang diterbitkan ICA. Pesanan dikemas sekretariat setelah pembayaran terverifikasi.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 pt-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FADEC9] bg-[#FFF2E8]/80 text-xs font-semibold text-[#D96B27]">
            <svg className="w-4 h-4 text-[#D96B27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>{products.length} produk tersedia</span>
          </div>

          <button
            type="button"
            onClick={onOpenHistory}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#EEDFD5] bg-white hover:bg-[#FFF2E8] hover:border-[#FADEC9] text-xs font-bold text-[#231A14] transition-all cursor-pointer shadow-2xs group"
          >
            <svg className="w-4 h-4 text-[#8C8074] group-hover:text-[#D96B27] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="group-hover:text-[#D96B27] transition-colors">Riwayat pesanan</span>
            <span className="ml-0.5 rounded-full bg-[#FFF2E8] border border-[#FADEC9] px-2 py-0.5 text-[10px] font-extrabold text-[#D96B27]">
              4 aktif
            </span>
          </button>
        </div>
      </div>

      {/* PANEL FILTER & SEARCH (Sesuai Desain Foto) */}
      <div className="bg-white rounded-2xl border border-[#EEDFD5] p-5 space-y-4 shadow-2xs">
        {/* Search Bar & Dropdown Urutkan */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <svg className="w-4 h-4 text-[#8C8074] absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk, mis. kaos, pin, buku pedigree..."
              className="w-full rounded-xl border border-[#EEDFD5] bg-[#FAF8F5] pl-10 pr-4 py-2 text-xs font-medium text-[#1A1513] outline-none focus:border-[#F05A1B] focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="rounded-xl border border-[#EEDFD5] bg-[#FAF8F5] px-3 py-2 text-xs font-semibold text-[#1A1513] outline-none focus:border-[#F05A1B] cursor-pointer"
            >
              <option value="relevan">Paling relevan</option>
              <option value="termurah">Harga: Termurah</option>
              <option value="termahal">Harga: Termahal</option>
              <option value="stok_terbanyak">Stok Terbanyak</option>
              <option value="nama_asc">Nama A-Z</option>
            </select>
          </div>
        </div>

        {/* Kategori Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`cursor-pointer px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#FFF2E8] text-[#F05A1B] border border-[#FCE3D2] font-bold shadow-2xs"
                    : "bg-[#FAF8F5] text-[#7E7267] border border-[#EEDFD5] hover:bg-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dropdown Filter Baris Bawah */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="block text-[10px] font-bold text-[#8C8074] mb-1">Rentang harga</label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full rounded-xl border border-[#EEDFD5] bg-[#FAF8F5] px-3 py-2 text-xs font-medium text-[#1A1513] outline-none focus:border-[#F05A1B] cursor-pointer"
            >
              <option value="semua">Semua harga</option>
              <option value="under100">Di bawah Rp 100.000</option>
              <option value="100to200">Rp 100.000 - Rp 200.000</option>
              <option value="above200">Di atas Rp 200.000</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#8C8074] mb-1">Ketersediaan</label>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full rounded-xl border border-[#EEDFD5] bg-[#FAF8F5] px-3 py-2 text-xs font-medium text-[#1A1513] outline-none focus:border-[#F05A1B] cursor-pointer"
            >
              <option value="semua">Semua stok</option>
              <option value="limited">Stok Terbatas (≤ 20)</option>
              <option value="available">Stok Tersedia (≥ 20)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#8C8074] mb-1">Label produk</label>
            <select
              value={badgeFilter}
              onChange={(e) => setBadgeFilter(e.target.value)}
              className="w-full rounded-xl border border-[#EEDFD5] bg-[#FAF8F5] px-3 py-2 text-xs font-medium text-[#1A1513] outline-none focus:border-[#F05A1B] cursor-pointer"
            >
              <option value="semua">Semua label</option>
              <option value="Terlaris">Terlaris</option>
              <option value="Baru">Baru</option>
              <option value="Stok terbatas">Stok terbatas</option>
            </select>
          </div>
        </div>

        {/* Counter & Reset Filter */}
        <div className="flex items-center justify-between border-t border-[#F4EFE9] pt-3 text-xs">
          <span className="text-[#8C8074] font-medium">
            {filteredAndSortedProducts.length} dari {products.length} produk
          </span>

          <button
            type="button"
            onClick={handleResetFilter}
            className="rounded-xl border border-[#EEDFD5] bg-white px-4 py-1.5 text-xs font-semibold text-[#70665D] hover:bg-[#FAF7F5] active:scale-95 transition-all cursor-pointer"
          >
            Reset filter
          </button>
        </div>
      </div>

      {/* LIST PRODUK CATALOG */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EEDFD5] py-16 text-center">
          <p className="text-sm font-semibold text-[#1A1513]">Barang tidak ditemukan</p>
          <p className="text-xs text-[#8C8074] mt-1">Coba sesuaikan kata kunci pencarian atau ubah filter Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredAndSortedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onOpenProduct(product)}
              className="bg-white rounded-2xl border border-[#EEDFD5] overflow-hidden flex flex-col justify-between hover:shadow-xs transition-all duration-200 cursor-pointer group"
            >
              <div className="relative h-44 w-full bg-[#FFF8EE] flex flex-col items-center justify-center border-b border-[#F7F2EB] overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1.5 text-[#C8BDB2]">
                    <svg className="w-7 h-7 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="text-[11px] font-medium text-[#B5A89B]">Foto produk belum diunggah</span>
                  </div>
                )}

                {product.badge && (
                  <span className="absolute bottom-3 left-3 bg-[#FFF2E8]/90 backdrop-blur-xs text-[#F05A1B] border border-[#FCE3D2] text-[10px] font-semibold px-3 py-0.5 rounded-full shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[11px] text-[#8C8074] font-medium">{product.categoryLabel}</span>
                  <h2 className="text-sm font-bold text-[#1A1513] mt-0.5 leading-snug line-clamp-1">
                    {product.title}
                  </h2>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-extrabold text-[#F05A1B]">
                    {formatRupiah(product.price)}
                  </span>
                  <span className="text-xs text-[#8C8074] font-medium">Stok {product.stock}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}