"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

// Import tipe dan data bawaan
import type { ProductCategory, Product } from "@/types/store";
import { productCategories, products } from "@/data/store";

// Tipe Item Keranjang Belanja
interface CartItem {
  product: Product;
  quantity: number;
}

// Format Angka ke Rupiah
function formatRupiah(value: number) {
  return `Rp${value.toLocaleString("id-ID")}`;
}

// ============================================================================
// COMPONENT 1: CategorySidebar
// ============================================================================
interface CategorySidebarProps {
  categories: ProductCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}

function CategorySidebar({ categories, activeId, onSelect }: CategorySidebarProps) {
  return (
    <div className="w-full shrink-0 rounded-2xl border border-[var(--color-ink-100)] bg-white p-5 shadow-xs sm:w-64">
      <div className="flex items-center gap-2 border-b border-[var(--color-ink-100)] pb-3">
        <svg className="h-4 w-4 text-[var(--color-brand-orange-700)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <h2 className="font-display text-[13px] font-semibold text-[var(--color-ink-900)]">Kategori Produk</h2>
      </div>

      <div className="mt-3 space-y-1">
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] transition ${
                isActive
                  ? "bg-[var(--color-brand-orange-100)] font-semibold text-[var(--color-brand-orange-700)]"
                  : "text-[var(--color-ink-700)] hover:bg-[var(--color-brand-orange-50)]"
              }`}
            >
              <span>{cat.label}</span>
              <span className={isActive ? "text-[var(--color-brand-orange-700)]" : "text-[var(--color-ink-400)]"}>
                ({cat.count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT 2: EmptyState
// ============================================================================
function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-[var(--color-ink-100)] bg-white py-20 text-center shadow-xs">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)]">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="4" y="7" width="16" height="14" rx="2" />
          <path d="M8 7V5a4 4 0 018 0v2M10 12h4" />
        </svg>
      </div>
      <p className="mt-4 text-[14px] font-semibold text-[var(--color-ink-900)]">Barang tidak ditemukan</p>
      <p className="mt-1 max-w-xs text-center text-[12px] text-[var(--color-ink-400)]">
        Saat ini belum ada produk yang tersedia di kategori ini. Silakan cek kembali di lain waktu.
      </p>
    </div>
  );
}

// ============================================================================
// COMPONENT 3: ProductCard
// ============================================================================
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-ink-100)] bg-white transition hover:border-[var(--color-brand-orange-300)] hover:shadow-md">
      <div>
        {/* GAMBAR PRODUK */}
        <div className="relative aspect-square bg-[#FAF4F0] overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[var(--color-ink-100)]">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="9" cy="10" r="2" />
                <path d="M21 16l-5.5-5.5L9 17" />
              </svg>
            </div>
          )}

          {product.discountPercent && (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-[var(--color-danger)] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
              {product.discountPercent}%
            </span>
          )}
        </div>

        {/* DETAIL PRODUK */}
        <div className="space-y-1.5 p-3.5">
          <p className="line-clamp-2 text-[12px] font-semibold leading-snug text-[var(--color-ink-900)]">
            {product.title}
          </p>

          <div className="flex items-baseline gap-1.5">
            <p className="text-[14px] font-bold text-[var(--color-ink-900)]">{formatRupiah(product.price)}</p>
            {product.originalPrice && (
              <p className="text-[10px] text-[var(--color-ink-400)] line-through">{formatRupiah(product.originalPrice)}</p>
            )}
          </div>

          <div className="flex items-center gap-1 text-[10px] text-[var(--color-ink-700)]">
            <svg className="h-3 w-3 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
              <path d="M10 1l2.6 5.9L19 8l-4.7 4.2L15.5 19 10 15.6 4.5 19l1.2-6.8L1 8l6.4-1.1z" />
            </svg>
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-[var(--color-ink-400)]">· {product.soldLabel}</span>
          </div>

          <p className="truncate text-[10px] text-[var(--color-ink-400)]">{product.location}</p>
        </div>
      </div>

      {/* TOMBOL ADD TO CART */}
      <div className="p-3.5 pt-0">
        <button
          onClick={() => onAddToCart(product)}
          className="w-full rounded-xl bg-[var(--color-brand-orange-500)] py-2 text-xs font-bold text-white transition hover:bg-[var(--color-brand-orange-700)] active:scale-95"
        >
          + Beli
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT: StorePage
// ============================================================================
export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<string>("semua");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter Produk berdasarkan Kategori
  const filteredProducts = useMemo(
    () => (activeCategory === "semua" ? products : products.filter((p) => p.categoryId === activeCategory)),
    [activeCategory]
  );

  // Kategori Dinamis dengan Hitungan Produk
  const categoriesWithCount = useMemo(() => {
    return productCategories.map((cat) => ({
      ...cat,
      count: cat.id === "semua" ? products.length : products.filter((p) => p.categoryId === cat.id).length,
    }));
  }, []);

  // Fungsi Keranjang
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
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: number, delta: number) => {
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

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#231A14] flex flex-col justify-between font-sans relative">
      <div>

        {/* HERO BANNER SECTION */}
        <section className="relative border-b border-[var(--color-brand-orange-100)] bg-gradient-to-r from-[#FFF6EC] via-[#FDFBF9] to-[#FFF6EC] py-10 md:py-14 px-4 md:px-6 overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[var(--color-brand-orange-500)]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-6xl mx-auto text-center space-y-2 relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)] text-xs font-bold tracking-widest uppercase">
              Merchandise & Official Shop
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              <span>ICA </span>
              <span className="text-[var(--color-brand-orange-500)]">Store</span>
            </h1>
            <p className="text-xs md:text-sm text-[var(--color-ink-700)] max-w-md mx-auto">
              Belanja produk resmi, tiket event, dan perlengkapan kucing terpercaya.
            </p>
          </div>
        </section>

        {/* MAIN STORE CONTENT */}
        <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="flex flex-col gap-6 sm:flex-row items-start">
            
            {/* Sidebar Kategori */}
            <CategorySidebar
              categories={categoriesWithCount}
              activeId={activeCategory}
              onSelect={setActiveCategory}
            />

            {/* Grid Produk / Empty State */}
            <div className="flex flex-1 flex-col w-full">
              {filteredProducts.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                  ))}
                </div>
              )}
            </div>

          </div>
        </main>
      </div>

      {/* FLOATING CART BUTTON */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[var(--color-brand-orange-500)] hover:bg-[var(--color-brand-orange-700)] text-white p-4 rounded-full shadow-xl flex items-center gap-2 transition-transform active:scale-90"
        aria-label="Buka Keranjang"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        {totalCartItems > 0 && (
          <span className="bg-white text-[var(--color-brand-orange-700)] font-bold text-xs px-2 py-0.5 rounded-full">
            {totalCartItems}
          </span>
        )}
      </button>

      {/* DRAWER KERANJANG BELANJA */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
          <div className="flex-1" onClick={() => setIsCartOpen(false)} />
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-ink-100)]">
                <h2 className="text-base font-bold text-[var(--color-ink-900)] flex items-center gap-2">
                  <span>Keranjang Belanja</span>
                  <span className="text-xs bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)] px-2.5 py-0.5 rounded-full font-semibold">
                    {totalCartItems} Item
                  </span>
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {cart.length === 0 ? (
                  <p className="text-center text-xs text-[var(--color-ink-400)] py-12">
                    Keranjang belanja kamu masih kosong.
                  </p>
                ) : (
                  cart.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[var(--color-ink-100)] bg-[#FDFBF9]"
                    >
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 bg-[#FAF4F0]">
                        {product.image && (
                          <Image src={product.image} alt={product.title} fill className="object-cover" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-[var(--color-ink-900)] truncate">{product.title}</h4>
                        <p className="text-xs text-[var(--color-brand-orange-700)] font-bold mt-0.5">
                          {formatRupiah(product.price)}
                        </p>
                      </div>

                      <div className="flex items-center border border-[var(--color-ink-100)] rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="px-2 py-1 text-xs hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="px-2 py-1 text-xs hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-[var(--color-ink-100)] space-y-3 mt-6">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span>Total Pembayaran:</span>
                  <span className="text-base text-[var(--color-brand-orange-700)]">{formatRupiah(totalCartPrice)}</span>
                </div>
                <button
                  onClick={() => alert("Lanjut ke pembayaran!")}
                  className="w-full py-2.5 bg-[var(--color-brand-orange-500)] hover:bg-[var(--color-brand-orange-700)] text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}