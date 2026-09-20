"use client";

import { useState, useMemo } from "react";
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

const INITIAL_CATEGORIES: Category[] = [
  { id: "semua", label: "Semua" },
  { id: "apparel", label: "Apparel" },
  { id: "aksesori", label: "Aksesori" },
  { id: "publikasi", label: "Publikasi" },
  { id: "perawatan", label: "Perawatan" },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Kaos ICA Official 2026",
    category: "apparel",
    categoryLabel: "Apparel",
    price: 185000,
    stock: 48,
    badge: "Terlaris",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9RVxIUO5Rb9G1qfWawYCygc5ru_KMrPrnfW1ezYp2Nj4hxUnixmyS7mM&s",
  },
  {
    id: "2",
    title: "Polo Shirt Panitia Cat Show",
    category: "apparel",
    categoryLabel: "Apparel",
    price: 245000,
    stock: 22,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMTdyhgBoM0uyNqIAI9S_TI68hvitWb0yu2vz8R9WetQ&s=10",
  },
  {
    id: "3",
    title: "Tote Bag Kanvas ICA",
    category: "aksesori",
    categoryLabel: "Aksesori",
    price: 95000,
    stock: 60,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80",
  },
  {
    id: "4",
    title: "Lanyard & ID Card Holder",
    category: "aksesori",
    categoryLabel: "Aksesori",
    price: 45000,
    stock: 120,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3URMhgKPZcJb9pYj9BpvOM-M0Y7M-EO3tjLJWvVclXg&s=10",
  },
  {
    id: "5",
    title: "Pin Enamel Paw ICA",
    category: "aksesori",
    categoryLabel: "Aksesori",
    price: 35000,
    stock: 200,
    image: "/images/LOGO-ICA.webp",
  },
  {
    id: "6",
    title: "Buku Panduan Breeding & Pedigree",
    category: "publikasi",
    categoryLabel: "Publikasi",
    price: 120000,
    stock: 35,
    badge: "Baru",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6oh0fvKgQK2Cw5OZ7pW8ccaxLjRJKWPBxG04G9Sug_A&s=10",
  },
  {
    id: "7",
    title: "Formulir Pedigree Fisik (10 lembar)",
    category: "publikasi",
    categoryLabel: "Publikasi",
    price: 60000,
    stock: 90,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQC8Gl5VGcIWtKLbBeKEVlUdP2W8Zia3F9ihoZFUAftw&s=10",
  },
  {
    id: "8",
    title: "Grooming Kit Starter",
    category: "perawatan",
    categoryLabel: "Perawatan",
    price: 320000,
    stock: 12,
    badge: "Stok terbatas",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9x33g3q-zDoXztUMnxEuCEr2dvkJElkOu5aK92XmYOA&s=10",
  },
];

interface CartItem {
  product: Product;
  quantity: number;
}

function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default function StoreMemberPage() {
  const [activeCategory, setActiveCategory] = useState<string>("semua");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "semua") return INITIAL_PRODUCTS;
    return INITIAL_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

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

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      {/* HEADER STORE */}
      <div>
        <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
          Store ICA
        </h1>
        <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
          Merchandise dan perlengkapan resmi organisasi Indonesian Cat Association.
        </p>
      </div>

      {/* KATEGORI FILTER */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {INITIAL_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`cursor-pointer px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#FFF2E8] text-[#F05A1B] border border-[#FCE3D2] font-semibold"
                  : "bg-white text-[#7E7267] border border-[#EEDFD5] hover:bg-[#FAF7F5]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* GRID PRODUK 3 KOLOM */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EEDFD5] py-16 text-center">
          <p className="text-sm font-semibold text-[#1A1513]">Barang tidak ditemukan</p>
          <p className="text-xs text-[#8C8074] mt-1">Belum ada produk untuk kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white rounded-2xl border border-[#EEDFD5] overflow-hidden flex flex-col justify-between hover:shadow-xs transition-all duration-200 cursor-pointer group"
            >
              {/* Visual Gambar / Placeholder */}
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

              {/* Info Produk */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[11px] text-[#8C8074] font-medium">
                    {product.categoryLabel}
                  </span>
                  <h2 className="text-sm font-bold text-[#1A1513] mt-0.5 leading-snug line-clamp-1">
                    {product.title}
                  </h2>
                </div>

                {/* Harga & Status Stok */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-extrabold text-[#F05A1B]">
                    {formatRupiah(product.price)}
                  </span>
                  <span className="text-xs text-[#8C8074] font-medium">
                    Stok {product.stock}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FLOATING CART BUTTON */}
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#EE6B28] hover:bg-[#C8601D] text-white p-4 rounded-full shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        {totalCartItems > 0 && (
          <span className="bg-white text-[#EE6B28] font-bold text-xs px-2 py-0.5 rounded-full">
            {totalCartItems}
          </span>
        )}
      </button>

      {/* DRAWER KERANJANG */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs">
          <div className="flex-1" onClick={() => setIsCartOpen(false)} />
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EEDFD5]">
                <h2 className="text-sm font-bold text-[#1A1513] flex items-center gap-2">
                  <span>Keranjang Belanja</span>
                  <span className="text-[11px] bg-[#FFF2E8] text-[#F05A1B] border border-[#FCE3D2] px-2 py-0.5 rounded-full font-semibold">
                    {totalCartItems} Item
                  </span>
                </h2>
                <button 
                  type="button" 
                  onClick={() => setIsCartOpen(false)} 
                  className="text-[#8C8074] hover:text-[#1A1513] text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {cart.length === 0 ? (
                  <p className="text-center text-xs text-[#8C8074] py-12">Keranjang masih kosong.</p>
                ) : (
                  cart.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-[#EEDFD5] bg-[#FAF7F5]">
                      {/* Thumbnail Gambar Produk di Cart */}
                      {product.image && (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#EEDFD5]">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-semibold text-[#1A1513] truncate">{product.title}</h3>
                        <p className="text-xs text-[#F05A1B] font-bold mt-0.5">{formatRupiah(product.price)}</p>
                      </div>

                      {/* QUANTITY CONTROL */}
                      <div className="flex items-center border border-[#EEDFD5] rounded-lg bg-white overflow-hidden">
                        <button 
                          type="button" 
                          onClick={() => updateQuantity(product.id, -1)} 
                          className="px-2 py-0.5 text-xs font-bold text-[#574D45] hover:bg-[#FAF7F5] hover:text-[#1A1513] cursor-pointer transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-[#1A1513]">
                          {quantity}
                        </span>
                        <button 
                          type="button" 
                          onClick={() => updateQuantity(product.id, 1)} 
                          className="px-2 py-0.5 text-xs font-bold text-[#574D45] hover:bg-[#FAF7F5] hover:text-[#1A1513] cursor-pointer transition-colors"
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
              <div className="pt-4 border-t border-[#EEDFD5] space-y-3 mt-6">
                <div className="flex justify-between items-center text-xs font-bold text-[#1A1513]">
                  <span>Total Pembayaran:</span>
                  <span className="text-sm text-[#F05A1B]">{formatRupiah(totalCartPrice)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Lanjut ke pembayaran!")}
                  className="w-full py-2.5 bg-[#EE6B28] hover:bg-[#C8601D] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
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