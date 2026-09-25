"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface Product {
  id: string;
  title: string;
  category: "apparel" | "aksesori" | "publikasi" | "perawatan";
  categoryLabel: string;
  price: number;
  stock: number;
  image?: string;
  badge?: "Terlaris" | "Baru" | "Stok terbatas";
}

interface Category {
  id: string;
  label: string;
}

interface StoreMobileProps {
  products: Product[];
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  addToCart: (product: Product) => void;
  totalCartItems: number;
  setIsCartOpen: (open: boolean) => void;
  formatRupiah: (val: number) => string;
}

export default function StoreMobile({
  products,
  categories,
  activeCategory,
  setActiveCategory,
  addToCart,
  totalCartItems,
  setIsCartOpen,
  formatRupiah,
}: StoreMobileProps) {
  const [showHistory, setShowHistory] = useState(false);

  // Data pesanan sesuai screenshot referensi
  const mockOrders = [
    {
      id: "MRC-2026-0231",
      itemSummary: "Kaos ICA Official 2026 (L) · 1 barang",
      price: 205000,
      status: "Dikemas sekretariat",
      statusColor: "bg-[#FFF2E8] text-[#D96B27]",
      date: "05 Sep 2026",
    },
    {
      id: "MRC-2026-0198",
      itemSummary: "Tote Bag Kanvas ICA (Natural) · Pin Enamel Paw ICA · 2 barang",
      price: 150000,
      status: "Diterima",
      statusColor: "bg-[#E8F5E9] text-[#2E7D32]",
      date: "21 Agu 2026",
    },
    {
      id: "MRC-2026-0154",
      itemSummary: "Buku Panduan Breeding & Pedigree (Cetak + PDF) · 1 barang",
      price: 140000,
      status: "Dibatalkan",
      statusColor: "bg-gray-100 text-gray-600",
      date: "02 Jul 2026",
    },
  ];

  return (
    <div className="block sm:hidden fixed inset-0 z-50 flex flex-col bg-[#F7F5F0] font-sans">
      {/* 1. TOP HEADER MOBILE */}
      <div
        className="shrink-0 bg-[#F7F5F0] px-5 pb-4 border-b border-[#EAE5DF]/60 z-20 space-y-3"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 24px)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {showHistory && (
              <button
                type="button"
                onClick={() => setShowHistory(false)}
                className="text-[#D96B27] p-1 -ml-1"
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
            )}
            <div>
              <h1 className="text-xl font-bold text-[#1F1B18] leading-tight">
                {showHistory ? "Riwayat pemesanan" : "Store ICA"}
              </h1>
              <p className="text-xs text-[#857B72] mt-0.5">
                {showHistory
                  ? "Pesanan produk Store ICA"
                  : "Merchandise dan publikasi resmi"}
              </p>
            </div>
          </div>

          {!showHistory && (
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#1F1B18] active:opacity-70"
            >
              <svg
                className="w-6 h-6 stroke-[1.8]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#E06328] text-[9px] font-bold text-white">
                  {totalCartItems}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* 2. TAMPILAN HALAMAN RIWAYAT PEMESANAN */}
      {showHistory ? (
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28 space-y-3">
          {mockOrders.map((ord) => (
            <div
              key={ord.id}
              className="rounded-2xl border border-[#EAE5DF] bg-white p-4 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F8F6F2] text-[#857B72]">
                    <svg
                      className="w-5 h-5 stroke-[1.5]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1F1B18]">{ord.id}</h3>
                    <p className="mt-0.5 text-[11px] text-[#857B72] line-clamp-2">
                      {ord.itemSummary}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1F1B18] shrink-0">
                  {formatRupiah(ord.price)}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#F4EFEA]">
                <span
                  className={`inline-block rounded-md px-2.5 py-0.5 text-[10px] font-semibold ${ord.statusColor}`}
                >
                  {ord.status}
                </span>
                <span className="text-[10px] text-[#857B72]">{ord.date}</span>
              </div>
            </div>
          ))}

          {/* Catatan Keterangan Tambahan */}
          <div className="rounded-2xl border border-[#EAE5DF] bg-[#FAF8F5] p-4 text-[11px] text-[#857B72] leading-relaxed flex items-start gap-2.5">
            <span className="text-[#E06328] font-bold">ⓘ</span>
            <p>
              Screen baru — belum ada padanannya di prototype Store versi web. [PRD TBD] status pesanan dan integrasi ekspedisi masih menunggu keputusan.
            </p>
          </div>
        </div>
      ) : (
        /* 3. TAMPILAN KATALOG PRODUK STORE */
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-28 space-y-4">
          <p className="text-xs text-[#857B72] leading-relaxed">
            Merchandise, publikasi, dan perlengkapan resmi yang diterbitkan ICA. Pesanan dikemas sekretariat setelah pembayaran terverifikasi.
          </p>

          {/* Kategori Filter Horizontal */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#FDF2E9] text-[#D96B27] font-bold border border-[#FADEC9]"
                      : "bg-white text-[#857B72] border border-[#EAE5DF]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Header Baris Jumlah Produk & Link Riwayat */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[#857B72]">{products.length} produk</span>
            <button
              type="button"
              onClick={() => setShowHistory(true)}
              className="font-semibold text-[#D96B27] hover:underline"
            >
              Riwayat pemesanan
            </button>
          </div>

          {/* Grid Produk 2 Kolom Sesuai Referensi Gambar */}
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => addToCart(product)}
                className="overflow-hidden rounded-2xl bg-white border border-[#F2ECE6] shadow-xs flex flex-col justify-between cursor-pointer active:scale-98 transition-transform"
              >
                {/* Visual Frame Gambar / Placeholder */}
                <div className="relative h-36 w-full bg-[#F8F6F2] flex flex-col items-center justify-center p-2">
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 rounded-md bg-[#FFF2E8] px-2 py-0.5 text-[10px] font-semibold text-[#D96B27] z-10">
                      {product.badge}
                    </span>
                  )}

                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-[#A09387]">
                      <svg
                        className="w-6 h-6 stroke-[1.5]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-[10px]">Foto produk</span>
                    </div>
                  )}
                </div>

                {/* Info Text Produk */}
                <div className="p-3 space-y-1">
                  <h3 className="text-xs font-bold text-[#1F1B18] line-clamp-2 leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-xs font-extrabold text-[#D96B27]">
                    {formatRupiah(product.price)}
                  </p>
                  <p className="text-[10px] text-[#857B72]">
                    Stok {product.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}