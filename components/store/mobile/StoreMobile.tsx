"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import StoreOrderHistoryMobile from "./StoreOrderHistoryMobile";
import StoreProductDetailMobile from "./StoreProductDetailMobile";
import StoreCartMobile from "./StoreCartMobile";
import StoreCheckoutMobile from "./StoreCheckoutMobile";
import StorePaymentMobile from "./StorePaymentMobile";
import StoreOrderDetailMobile, {
  OrderDetailData,
} from "./StoreOrderDetailMobile";

import type { CartItem } from "../StorePage";

export interface Product {
  id: string;
  title: string;
  category: "apparel" | "aksesori" | "publikasi" | "perawatan";
  categoryLabel: string;
  price: number;
  stock: number;
  image?: string;
  badge?: "Terlaris" | "Baru" | "Stok terbatas";
  description?: string;
}

interface Category {
  id: string;
  label: string;
}

export interface StoreMobileProps {
  products: Product[];
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;

  cart: CartItem[];

  addToCart: (
    product: Product,
    quantity?: number,
    size?: string
  ) => void;

  updateQuantity: (
    productId: string,
    size: string | undefined,
    delta: number
  ) => void;

  removeCartItem: (
    productId: string,
    size: string | undefined
  ) => void;

  totalCartItems: number;

  isCartOpenProp?: boolean;
  setIsCartOpen?: (open: boolean) => void;

  formatRupiah: (val: number) => string;
}

export default function StoreMobile({
  products,
  categories,
  activeCategory,
  setActiveCategory,
  addToCart: addToCartExternal,
  cart,
  updateQuantity,
  removeCartItem,
  totalCartItems: totalCartItemsProp,
  isCartOpenProp,
  setIsCartOpen: setIsCartOpenExternal,
  formatRupiah,
}: StoreMobileProps) {
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [isCartOpenInternal, setIsCartOpenInternal] =
    useState<boolean>(false);

  const [isCheckoutOpen, setIsCheckoutOpen] =
    useState<boolean>(false);

  const [isPaymentOpen, setIsPaymentOpen] =
    useState<boolean>(false);

  const [isOrderDetailOpen, setIsOrderDetailOpen] =
    useState<boolean>(false);

  const [completedOrder, setCompletedOrder] =
    useState<OrderDetailData | null>(null);

  // State untuk Pencarian, Filter & Sorting Mobile
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("relevan");
  const [priceFilter, setPriceFilter] = useState<string>("semua");
  const [stockFilter, setStockFilter] = useState<string>("semua");
  const [badgeFilter, setBadgeFilter] = useState<string>("semua");
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);

  const [paymentData, setPaymentData] = useState<{
    address: {
      name: string;
      phone: string;
      address: string;
      city: string;
    };
    courierName: string;
    courierPrice: number;
    totalPayable: number;
  }>({
    address: {
      name: "Ayu Prameswari",
      phone: "0812-2045-7781",
      address:
        "Jl. Cigadung Raya Barat No. 18, Cibeunying Kaler",
      city: "Kota Bandung",
    },
    courierName: "JNE · REG · estimasi 2–3 hari",
    courierPrice: 11000,
    totalPayable: 846000,
  });

  // Logika Filter & Search
  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // Filter Kata Kunci Pencarian
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      );
    }

    // Filter Kategori
    if (activeCategory !== "semua") {
      list = list.filter((p) => p.category === activeCategory);
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
  }, [
    products,
    searchQuery,
    activeCategory,
    priceFilter,
    stockFilter,
    badgeFilter,
    sortOption,
  ]);

  const handleResetFilter = () => {
    setSearchQuery("");
    setSortOption("relevan");
    setPriceFilter("semua");
    setStockFilter("semua");
    setBadgeFilter("semua");
    setActiveCategory("semua");
  };

  const hasActiveFilter =
    searchQuery !== "" ||
    priceFilter !== "semua" ||
    stockFilter !== "semua" ||
    badgeFilter !== "semua" ||
    sortOption !== "relevan";

  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    size?: string
  ) => {
    addToCartExternal(product, quantity, size);
  };

  const forceOpenCart = () => {
    setSelectedProduct(null);
    setShowHistory(false);
    setIsCheckoutOpen(false);
    setIsPaymentOpen(false);
    setIsOrderDetailOpen(false);
    setIsCartOpenInternal(true);

    if (setIsCartOpenExternal) {
      setIsCartOpenExternal(true);
    }
  };

  const handleCloseCart = () => {
    setIsCartOpenInternal(false);

    if (setIsCartOpenExternal) {
      setIsCartOpenExternal(false);
    }
  };

  useEffect(() => {
    if (isCartOpenProp) {
      forceOpenCart();
    }
  }, [isCartOpenProp]);

  useEffect(() => {
    const handleCartEvent = () => {
      forceOpenCart();
    };

    window.addEventListener(
      "open-store-cart",
      handleCartEvent
    );

    window.addEventListener(
      "open-mobile-cart",
      handleCartEvent
    );

    return () => {
      window.removeEventListener(
        "open-store-cart",
        handleCartEvent
      );

      window.removeEventListener(
        "open-mobile-cart",
        handleCartEvent
      );
    };
  }, []);

  const isCartOpen =
    isCartOpenProp || isCartOpenInternal;

  const cartBadgeCount = totalCartItemsProp;

  return (
    <div className="block sm:hidden w-full bg-[#F7F5F0] font-sans pb-28 pt-2">
      {/* Katalog Utama */}
      <div className="px-4 space-y-3">
        <p className="text-xs text-[#857B72] leading-relaxed">
          Merchandise, publikasi, dan perlengkapan resmi yang
          diterbitkan ICA. Pesanan dikemas sekretariat setelah
          pembayaran terverifikasi.
        </p>

        {/* Search Bar & Tombol Filter Mobile */}
        <div className="flex items-center gap-2 pt-1">
          <div className="relative flex-1">
            <svg
              className="w-4 h-4 text-[#8C8074] absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk..."
              className="w-full rounded-2xl border border-[#EAE5DF] bg-white pl-10 pr-4 py-2.5 text-xs text-[#1F1B18] outline-none focus:border-[#D96B27]"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilterDrawer(true)}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl border text-xs font-bold transition-all shrink-0 cursor-pointer ${
              hasActiveFilter
                ? "bg-[#FFF2E8] border-[#FADEC9] text-[#D96B27]"
                : "bg-white border-[#EAE5DF] text-[#857B72]"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filter</span>
            {hasActiveFilter && (
              <span className="w-2 h-2 rounded-full bg-[#D96B27]" />
            )}
          </button>
        </div>

        {/* Filter Kategori */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#FFF2E8] text-[#D96B27] font-bold border border-[#FADEC9]"
                  : "bg-white text-[#857B72] border border-[#EAE5DF]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-[#857B72]">
            {filteredAndSortedProducts.length} produk
          </span>

          <button
            type="button"
            onClick={() => setShowHistory(true)}
            className="font-semibold text-[#D96B27] hover:underline cursor-pointer"
          >
            Riwayat pemesanan
          </button>
        </div>

        {/* Grid Produk */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#EAE5DF] py-12 text-center p-4">
            <p className="text-sm font-bold text-[#1F1B18]">Barang tidak ditemukan</p>
            <p className="text-xs text-[#857B72] mt-1">
              Coba ganti kata kunci atau ubah filter Anda.
            </p>
            <button
              type="button"
              onClick={handleResetFilter}
              className="mt-3 inline-block px-4 py-2 rounded-full bg-[#FFF2E8] text-[#D96B27] font-bold text-xs border border-[#FADEC9]"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pt-1">
            {filteredAndSortedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="overflow-hidden rounded-2xl bg-white shadow-xs flex flex-col justify-between cursor-pointer active:scale-98 transition-transform"
              >
                <div className="relative h-36 w-full bg-[#F8F6F2] flex flex-col items-center justify-center overflow-hidden">
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
                        className="w-7 h-7 stroke-[1.2]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>

                      <span className="text-[10px]">
                        Foto produk
                      </span>
                    </div>
                  )}
                </div>

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
        )}
      </div>

{/* Modal Filter Drawer Mobile (z-[999] agar Pasti Menutupi Bottom Nav) */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-[999] flex items-end bg-black/60 backdrop-blur-xs animate-fade-in">
          <div 
            className="w-full bg-white rounded-t-[28px] p-5 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl animate-slide-up"
            style={{
              paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)"
            }}
          >
            {/* Header Drawer */}
            <div className="flex items-center justify-between border-b border-[#EAE5DF] pb-3">
              <h2 className="text-sm font-extrabold text-[#1F1B18]">
                Filter &amp; Urutkan Produk
              </h2>
              <button
                type="button"
                onClick={() => setShowFilterDrawer(false)}
                className="w-8 h-8 rounded-full bg-[#F8F6F2] text-[#857B72] flex items-center justify-center font-bold text-xs active:scale-95 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Urutkan */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#857B72]">Urutkan berdasarkan</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full rounded-xl border border-[#EAE5DF] bg-[#F8F6F2] px-3.5 py-2.5 text-xs font-semibold text-[#1F1B18] outline-none focus:border-[#D96B27] cursor-pointer"
              >
                <option value="relevan">Paling relevan</option>
                <option value="termurah">Harga: Termurah</option>
                <option value="termahal">Harga: Termahal</option>
                <option value="stok_terbanyak">Stok Terbanyak</option>
                <option value="nama_asc">Nama A-Z</option>
              </select>
            </div>

            {/* Rentang Harga */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#857B72]">Rentang harga</label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full rounded-xl border border-[#EAE5DF] bg-[#F8F6F2] px-3.5 py-2.5 text-xs font-semibold text-[#1F1B18] outline-none focus:border-[#D96B27] cursor-pointer"
              >
                <option value="semua">Semua harga</option>
                <option value="under100">Di bawah Rp 100.000</option>
                <option value="100to200">Rp 100.000 - Rp 200.000</option>
                <option value="above200">Di atas Rp 200.000</option>
              </select>
            </div>

            {/* Ketersediaan Stok */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#857B72]">Ketersediaan</label>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="w-full rounded-xl border border-[#EAE5DF] bg-[#F8F6F2] px-3.5 py-2.5 text-xs font-semibold text-[#1F1B18] outline-none focus:border-[#D96B27] cursor-pointer"
              >
                <option value="semua">Semua stok</option>
                <option value="limited">Stok Terbatas (≤ 20)</option>
                <option value="available">Stok Tersedia (≥ 20)</option>
              </select>
            </div>

            {/* Label Produk */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#857B72]">Label produk</label>
              <select
                value={badgeFilter}
                onChange={(e) => setBadgeFilter(e.target.value)}
                className="w-full rounded-xl border border-[#EAE5DF] bg-[#F8F6F2] px-3.5 py-2.5 text-xs font-semibold text-[#1F1B18] outline-none focus:border-[#D96B27] cursor-pointer"
              >
                <option value="semua">Semua label</option>
                <option value="Terlaris">Terlaris</option>
                <option value="Baru">Baru</option>
                <option value="Stok terbatas">Stok terbatas</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex items-center gap-3 border-t border-[#EAE5DF]">
              <button
                type="button"
                onClick={handleResetFilter}
                className="w-1/3 py-3 rounded-full border border-[#EAE5DF] bg-white text-xs font-bold text-[#857B72] active:scale-95 transition-all cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setShowFilterDrawer(false)}
                className="w-2/3 py-3 rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-xs font-bold text-white shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                Terapkan Filter
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Detail Produk */}
      {selectedProduct && (
        <StoreProductDetailMobile
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onOpenCart={forceOpenCart}
          addToCart={handleAddToCart}
          totalCartItems={cartBadgeCount}
          formatRupiah={formatRupiah}
        />
      )}

      {/* Riwayat */}
      {showHistory && (
        <StoreOrderHistoryMobile
          onClose={() => setShowHistory(false)}
          formatRupiah={formatRupiah}
        />
      )}

      {/* Cart */}
      {isCartOpen && (
        <StoreCartMobile
          cartItems={cart}
          onBack={handleCloseCart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeCartItem}
          onProceedToCheckout={() => {
            handleCloseCart();
            setIsCheckoutOpen(true);
          }}
          formatRupiah={formatRupiah}
        />
      )}

      {/* Checkout */}
      {isCheckoutOpen && (
        <StoreCheckoutMobile
          cartItems={cart}
          onBack={() => {
            setIsCheckoutOpen(false);
            forceOpenCart();
          }}
          formatRupiah={formatRupiah}
          onProceedToPayment={(data) => {
            setPaymentData(data);
            setIsCheckoutOpen(false);
            setIsPaymentOpen(true);
          }}
        />
      )}

      {/* Payment */}
      {isPaymentOpen && (
        <StorePaymentMobile
          cartItems={cart}
          totalPayable={paymentData.totalPayable}
          courierName={paymentData.courierName}
          courierPrice={paymentData.courierPrice}
          shippingAddress={paymentData.address}
          onBack={() => {
            setIsPaymentOpen(false);
            setIsCheckoutOpen(true);
          }}
          formatRupiah={formatRupiah}
          onSuccessPayment={() => {
            const itemsCount = cart.reduce(
              (total, item) => total + item.quantity,
              0
            );

            const firstItemTitle =
              cart[0]?.product.title ||
              "Produk Store ICA";

            const newOrder: OrderDetailData = {
              orderId: `MRC-2026-${Math.floor(
                1000 + Math.random() * 9000
              )}`,
              orderDate: "25 Sep 2026",
              itemsSummary: `${firstItemTitle} · ${itemsCount} barang`,
              paymentMethod: "QRIS",
              totalAmount: paymentData.totalPayable,
              courier: paymentData.courierName,
              shippingAddress: paymentData.address,
            };

            setCompletedOrder(newOrder);

            setIsPaymentOpen(false);
            setIsOrderDetailOpen(true);
          }}
        />
      )}

      {/* Order Detail */}
      {isOrderDetailOpen && completedOrder && (
        <StoreOrderDetailMobile
          order={completedOrder}
          onBack={() => setIsOrderDetailOpen(false)}
          formatRupiah={formatRupiah}
        />
      )}
    </div>
  );
}