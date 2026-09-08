"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/app/landing-page/components/Navbar";
import Footer from "@/app/landing-page/components/Footer";

// Tipe Data Produk & Keranjang
interface Product {
  id: string;
  name: string;
  category: "perlengkapan" | "tiket" | "uncategorized";
  price: number;
  image: string;
  badge?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Data Dummy Produk
const DUMMY_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Sisir Premium Grooming ICA Edition",
    category: "perlengkapan",
    price: 85000,
    image: "/images/cattt.jpg",
    badge: "Terlaris",
  },
  {
    id: "p2",
    name: "Shampo Kucing Anti-Kutu & Jamur 250ml",
    category: "perlengkapan",
    price: 65000,
    image: "/images/twinC.jpg",
  },
  {
    id: "p3",
    name: "Mangkok Makan Ergonomis Anti-Tumpah",
    category: "perlengkapan",
    price: 45000,
    image: "/images/cat.jpg",
  },
  {
    id: "t1",
    name: "Tiket Masuk ICA National Cat Show 2026",
    category: "tiket",
    price: 50000,
    image: "/images/cattt.jpg",
    badge: "Event",
  },
  {
    id: "t2",
    name: "Pass VIP Workshop Grooming & Health Kucing",
    category: "tiket",
    price: 150000,
    image: "/images/twinC.jpg",
    badge: "Terbatas",
  },
  {
    id: "u1",
    name: "Gantungan Kunci Akrilik Logo ICA",
    category: "uncategorized",
    price: 15000,
    image: "/images/cat.jpg",
  },
  {
    id: "u2",
    name: "Sticker Pack Official ICA Cat Lovers",
    category: "uncategorized",
    price: 20000,
    image: "/images/cattt.jpg",
  },
];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Kategori Dinamis
  const categories = [
    { id: "all", name: "Semua Produk", count: DUMMY_PRODUCTS.length },
    {
      id: "perlengkapan",
      name: "Perlengkapan Kucing",
      count: DUMMY_PRODUCTS.filter((p) => p.category === "perlengkapan").length,
    },
    {
      id: "tiket",
      name: "Tiket Event",
      count: DUMMY_PRODUCTS.filter((p) => p.category === "tiket").length,
    },
    {
      id: "uncategorized",
      name: "Uncategorized",
      count: DUMMY_PRODUCTS.filter((p) => p.category === "uncategorized").length,
    },
  ];

  // Filter produk
  const filteredProducts =
    activeCategory === "all"
      ? DUMMY_PRODUCTS
      : DUMMY_PRODUCTS.filter((p) => p.category === activeCategory);

  // Format Rupiah
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Funsi Tambah ke Keranjang
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true); // Otomatis buka drawer keranjang
  };

  // Fungsi Ubah Jumlah Item
  const updateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // Total Item & Total Harga
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#231A14] flex flex-col justify-between font-sans relative">
      <div>
        <Navbar />

        {/* Hero Banner Section */}
        <section className="relative bg-gradient-to-r from-[#FFF6EC] via-[#FDFBF9] to-[#FFF6EC] border-b border-[#F3D1BD]/40 py-12 md:py-16 px-4 md:px-6 overflow-hidden">
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
                {categories.map((cat) => (
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

            {/* Display Produk Grid / Empty State */}
            <div className="md:col-span-3">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-[#E9E2DC] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="relative h-48 w-full bg-[#FAF4F0] overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-[#EE6B28] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <span className="text-[10px] font-bold text-[#EE6B28] uppercase tracking-wider">
                            {product.category}
                          </span>
                          <h3 className="text-sm font-bold text-[#231A14] line-clamp-2 mt-1">
                            {product.name}
                          </h3>
                        </div>

                        <div className="pt-2 border-t border-[#F4EFEA] flex items-center justify-between">
                          <span className="text-base font-extrabold text-[#231A14]">
                            {formatRupiah(product.price)}
                          </span>

                          <button
                            onClick={() => addToCart(product)}
                            className="px-3 py-1.5 bg-[#EE6B28] hover:bg-[#d85a1a] text-white text-xs font-bold rounded-xl transition-colors shadow-xs active:scale-95"
                          >
                            + Beli
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <section className="bg-white rounded-2xl border border-[#E9E2DC] p-8 md:p-14 text-center min-h-[380px] flex flex-col items-center justify-center shadow-xs">
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
              )}
            </div>

          </div>
        </main>
      </div>

      {/* Floating Cart Trigger (Tombol Melayang di Kanan Bawah) */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#EE6B28] hover:bg-[#d85a1a] text-white p-4 rounded-full shadow-xl flex items-center gap-2 transition-transform active:scale-90"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        {totalCartItems > 0 && (
          <span className="bg-white text-[#EE6B28] font-bold text-xs px-2 py-0.5 rounded-full">
            {totalCartItems}
          </span>
        )}
      </button>

      {/* Drawer Overlay Keranjang (Modal Samping) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
          {/* Backdrop click to close */}
          <div className="flex-1" onClick={() => setIsCartOpen(false)} />

          {/* Drawer Content */}
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F4EFEA]">
                <h2 className="text-lg font-bold text-[#231A14] flex items-center gap-2">
                  <span>Keranjang Belanja</span>
                  <span className="text-xs bg-[#FFF0E6] text-[#EE6B28] px-2.5 py-0.5 rounded-full">
                    {totalCartItems} Item
                  </span>
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              {/* Daftar Item Keranjang */}
              <div className="mt-4 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-sm text-[#A89F95] py-10">
                    Keranjang belanja kamu masih kosong.
                  </p>
                ) : (
                  cart.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#E9E2DC] bg-[#FDFBF9]"
                    >
                      <div className="relative h-14 w-14 rounded-lg overflow-hidden shrink-0 bg-[#FAF4F0]">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#231A14] truncate">{product.name}</h4>
                        <p className="text-xs text-[#EE6B28] font-semibold mt-0.5">
                          {formatRupiah(product.price)}
                        </p>
                      </div>

                      {/* Pengatur Qty */}
                      <div className="flex items-center border border-[#E9E2DC] rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer Keranjang */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-[#F4EFEA] space-y-3 mt-6">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span>Total Pembayaran:</span>
                  <span className="text-lg text-[#EE6B28]">{formatRupiah(totalCartPrice)}</span>
                </div>
                <button
                  onClick={() => alert("Lanjut ke proses checkout!")}
                  className="w-full py-3 bg-[#EE6B28] hover:bg-[#d85a1a] text-white font-bold text-sm rounded-xl transition-colors shadow-md"
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}