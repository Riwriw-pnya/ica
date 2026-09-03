"use client";

import { useState } from "react";
import Navbar from "@/app/landing-page/components/Navbar";
import Footer from "@/app/landing-page/components/Footer";

const CATEGORIES = [
  { id: "all", name: "Semua Produk", count: 0 },
  { id: "perlengkapan", name: "Perlengkapan Kucing", count: 0 },
  { id: "tiket", name: "Tiket Event", count: 0 },
  { id: "uncategorized", name: "Uncategorized", count: 0 },
];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#231A14] flex flex-col justify-between font-sans">
      <div>
        <Navbar />

        {/* Hero Banner Section */}
        <section className="relative bg-gradient-to-r from-[#FFF6EC] via-[#FDFBF9] to-[#FFF6EC] border-b border-[#F3D1BD]/40 py-12 md:py-16 px-4 md:px-6 overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#EE6B28]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto text-center space-y-2 relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#EE6B28]/10 text-[#EE6B28] text-xs font-bold tracking-widest uppercase">
              Merchandise & Official Shop
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              <span className="text-[#231A14]">ICA </span>
              <span className="text-[#EE6B28]">Store</span>
            </h1>
            <p className="text-xs md:text-sm text-[#7A6E65] max-w-md mx-auto">
              Belanja produk resmi, tiket event, dan perlengkapan kucing terpercaya.
            </p>
          </div>
        </section>

        {/* Main Store Content */}
        <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            
            {/* Sidebar Kategori */}
            <aside className="bg-white rounded-2xl border border-[#E9E2DC] p-5 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#231A14] border-b border-[#F4EFEA] pb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#EE6B28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Kategori Produk
              </h2>
              
              <ul className="space-y-1 text-sm">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                        activeCategory === cat.id
                          ? "bg-[#FFF0E6] text-[#EE6B28] font-bold"
                          : "text-[#7A6E65] hover:bg-[#FAF4F0] hover:text-[#231A14]"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs opacity-75">({cat.count})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Area Display Produk / Empty State */}
            <section className="md:col-span-3 bg-white rounded-2xl border border-[#E9E2DC] p-8 md:p-14 text-center min-h-[380px] flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full bg-[#FFF0E6] text-[#EE6B28] flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6m-3-3h6M3.75 7.5h16.5l-1.5-4.5h-13.5l-1.5 4.5z" />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-[#231A14] mb-1">
                Barang tidak ditemukan
              </h3>
              <p className="text-xs md:text-sm text-[#A89F95] max-w-sm">
                Saat ini belum ada produk yang tersedia di kategori ini. Silakan cek kembali di lain waktu.
              </p>
            </section>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}