"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "./StoreMobile";

interface StoreProductDetailMobileProps {
  product: Product;
  onBack: () => void;
  onOpenCart: () => void;
  addToCart: (product: Product, quantity: number, size: string) => void;
  totalCartItems: number;
  formatRupiah: (val: number) => string;
}

export default function StoreProductDetailMobile({
  product,
  onBack,
  onOpenCart,
  addToCart,
  totalCartItems,
  formatRupiah,
}: StoreProductDetailMobileProps) {
  const [selectedSize, setSelectedSize] = useState<string>("S");
  const [quantity, setQuantity] = useState<number>(1);

  // State untuk animasi slide
  const [slideIn, setSlideIn] = useState<boolean>(false);

  // State untuk Toast Notifikasi
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const sizes = ["S", "M", "L", "XL", "XXL"];

  // Jalankan animasi slide-in setelah mount
  useEffect(() => {
    const timer = setTimeout(() => setSlideIn(true), 20);
    return () => clearTimeout(timer);
  }, []);

  // Handler untuk tombol back dengan animasi slide-out
  const handleBack = () => {
    setSlideIn(false);
    setTimeout(() => {
      onBack();
    }, 280);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);

    setToastMessage(`${product.title} ditambahkan ke keranjang.`);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-[#F7F5F0] font-sans transition-transform duration-300 ease-out ${
        slideIn ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* 1. HEADER LEGA & AMAN UNTUK KAMERA TENAN / NOTCH / DYNAMIC ISLAND */}
      <div
        className="shrink-0 sticky top-0 z-30 bg-[#F7F5F0] px-4 pb-4 border-b border-[#EAE5DF]/60 shadow-2xs"
        style={{
          // Padding atas mengecek safe-area-inset-top (untuk kamera/notch HP) + tambahan 28px agar sangat lega
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 28px)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="text-[#D96B27] active:opacity-60 cursor-pointer p-2 -ml-1.5 rounded-full hover:bg-[#EAE5DF]/50 transition-colors"
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
            <div>
              <h1 className="text-base font-bold text-[#1F1B18] leading-tight line-clamp-1">
                {product.title}
              </h1>
              <p className="text-xs text-[#857B72] mt-0.5">
                {product.categoryLabel || "Apparel"} · Store ICA
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. KONTEN UTAMA (SCROLLABLE AREA) */}
      <div className="flex-1 overflow-y-auto pb-44">
        {/* AREA GAMBAR PRODUK */}
        <div className="relative w-full h-[360px] bg-[#EFECE6] flex flex-col items-center justify-center text-[#A09387] space-y-2">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <>
              <svg
                className="w-10 h-10 stroke-1"
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
              <span className="text-xs font-medium">Foto produk belum diunggah</span>
            </>
          )}
        </div>

        {/* INFORMASI PRODUK */}
        <div className="bg-[#F7F5F0] px-5 pt-5 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-[#1F1B18] leading-tight">
              {product.title}
            </h2>
            <p className="text-lg font-extrabold text-[#D96B27] mt-1.5">
              {formatRupiah(product.price)}
            </p>
            <p className="text-xs text-[#857B72] mt-0.5">
              Stok {product.stock}
            </p>
          </div>

          <p className="text-xs text-[#554E48] leading-relaxed">
            Kaos cotton combed 24s dengan bordir logo ICA di dada kiri. Sablon
            nama wilayah opsional saat checkout.
          </p>

          {/* Pilih Ukuran */}
          <div className="space-y-2.5 pt-1">
            <label className="text-xs font-bold text-[#1F1B18] block">
              Ukuran
            </label>
            <div className="flex items-center gap-2.5">
              {sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`w-10 h-10 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                    selectedSize === sz
                      ? "bg-[#FFF2E8] text-[#D96B27] border-2 border-[#D96B27]"
                      : "bg-white text-[#857B72] border border-[#EAE5DF]"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Pilih Jumlah */}
          <div className="space-y-2.5 pt-1">
            <label className="text-xs font-bold text-[#1F1B18] block">
              Jumlah
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl border border-[#EAE5DF] bg-white text-[#1F1B18] text-base font-medium flex items-center justify-center active:bg-gray-50"
              >
                -
              </button>
              <span className="text-xs font-bold text-[#1F1B18] w-5 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 rounded-xl border border-[#EAE5DF] bg-white text-[#1F1B18] text-base font-medium flex items-center justify-center active:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FIXED BOTTOM BUTTON (SELALU DIAM DI ATAS BOTTOM NAV BAR) */}
      <div
        className="fixed bottom-[64px] left-0 right-0 z-40 px-5 py-3.5 bg-[#F7F5F0]/90 backdrop-blur-md border-t border-[#EAE5DF]/60"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
      >
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FFA26B] via-[#EE6B28] to-[#E35610] shadow-[0_4px_12px_rgba(238,107,40,0.25)] active:scale-98 transition-transform"
        >
          Tambahkan ke keranjang
        </button>
      </div>

      {/* 4. TOAST NOTIFIKASI POP-UP DARI BAWAH */}
      <div
        className={`fixed bottom-[136px] left-4 right-4 z-50 transition-all duration-300 ease-out transform ${
          showToast
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-10 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-[#1F1B18] text-white rounded-2xl px-4 py-3.5 shadow-2xl flex items-center justify-between border border-white/10 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-6 h-6 rounded-full bg-[#28844B] flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5 text-white stroke-[3]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-xs font-medium text-gray-100 truncate">
              {toastMessage}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            className="shrink-0 text-xs font-bold text-[#FFA26B] hover:underline"
          >
            Lihat
          </button>
        </div>
      </div>
    </div>
  );
}