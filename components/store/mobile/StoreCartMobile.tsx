"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import type { CartItem } from "../StorePage";

interface StoreCartMobileProps {
  cartItems: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (
    productId: string,
    size: string | undefined,
    delta: number
  ) => void;
  onRemoveItem: (
    productId: string,
    size: string | undefined
  ) => void;
  onProceedToCheckout: () => void;
  formatRupiah: (val: number) => string;
}

export default function StoreCartMobile({
  cartItems,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  formatRupiah,
}: StoreCartMobileProps) {
  const [slideIn, setSlideIn] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlideIn(true), 20);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setSlideIn(false);

    setTimeout(() => {
      onBack();
    }, 280);
  };

  const totalPayable = cartItems.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col bg-[#F7F5F0] font-sans transition-transform duration-300 ease-out ${
        slideIn ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* HEADER KERANJANG */}
      <div
        className="shrink-0 sticky top-0 z-30 bg-[#F7F5F0] px-4 pb-3 border-b border-[#EAE5DF]/60 shadow-2xs"
        style={{
          paddingTop:
            "calc(env(safe-area-inset-top, 0px) + 24px)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="text-[#D96B27] active:opacity-60 cursor-pointer p-1.5 -ml-1 rounded-full hover:bg-[#EAE5DF]/50 transition-colors"
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

            <h1 className="text-base font-bold text-[#1F1B18] leading-tight">
              Keranjang Belanja
            </h1>
          </div>

          <span className="text-xs font-semibold text-[#857B72]">
            {totalItems} item
          </span>
        </div>
      </div>

      {/* DAFTAR ITEM KERANJANG */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-36 scrollbar-none">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#EAE5DF]/60 flex items-center justify-center text-[#857B72] text-2xl">
              🛒
            </div>

            <p className="text-sm font-bold text-[#1F1B18]">
              Keranjang kamu masih kosong
            </p>

            <p className="text-xs text-[#857B72]">
              Pilih produk dari katalog untuk menambah ke
              keranjang.
            </p>
          </div>
        ) : (
          cartItems.map((item) => {
            const product = item.product;

            return (
              <div
                key={`${product.id}-${item.size ?? "default"}`}
                className="bg-white rounded-2xl p-3 border border-[#EAE5DF] shadow-2xs flex items-center gap-3"
              >
                {/* GAMBAR BARANG */}
                <div className="relative w-16 h-16 rounded-xl bg-[#F8F6F2] overflow-hidden shrink-0 border border-[#EAE5DF]">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[10px] text-[#A09387]">
                      Foto
                    </div>
                  )}
                </div>

                {/* RINCIAN PRODUK */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <h3 className="text-xs font-bold text-[#1F1B18] truncate">
                    {product.title}
                  </h3>

                  {item.size && (
                    <p className="text-[10px] text-[#857B72]">
                      Ukuran {item.size}
                    </p>
                  )}

                  <p className="text-xs font-extrabold text-[#D96B27] pt-0.5">
                    {formatRupiah(product.price)}
                  </p>
                </div>

                {/* KONTROL JUMLAH & HAPUS */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      onRemoveItem(product.id, item.size)
                    }
                    className="text-[#857B72] hover:text-[#D9534F] p-0.5 text-xs transition-colors"
                  >
                    ✕
                  </button>

                  <div className="flex items-center border border-[#EAE5DF] rounded-lg bg-[#FAF8F5] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => {
                        if (item.quantity > 1) {
                          onUpdateQuantity(
                            product.id,
                            item.size,
                            -1
                          );
                        } else {
                          onRemoveItem(
                            product.id,
                            item.size
                          );
                        }
                      }}
                      className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#1F1B18] active:bg-[#EAE5DF]"
                    >
                      -
                    </button>

                    <span className="w-6 text-center text-xs font-bold text-[#1F1B18]">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        onUpdateQuantity(
                          product.id,
                          item.size,
                          1
                        )
                      }
                      className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#1F1B18] active:bg-[#EAE5DF]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* BOTTOM CTA */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-[#EAE5DF] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-lg space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#857B72]">
              Total pembayaran
            </span>

            <span className="text-base font-extrabold text-[#D96B27]">
              {formatRupiah(totalPayable)}
            </span>
          </div>

          <button
            type="button"
            onClick={onProceedToCheckout}
            className="w-full py-3 bg-[#D96B27] hover:bg-[#C25A1C] active:scale-98 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Lanjut ke Checkout
          </button>
        </div>
      )}
    </div>
  );
}