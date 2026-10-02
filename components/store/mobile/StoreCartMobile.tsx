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
    (acc, item) => acc + item.product.price * item.quantity,
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
        className="sticky top-0 z-30 shrink-0 border-b border-[#EAE5DF]/60 bg-[#F7F5F0] px-4 pb-3 shadow-2xs"
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
              className="-ml-1 cursor-pointer rounded-full p-1.5 text-[#D96B27] transition-colors hover:bg-[#EAE5DF]/50 active:opacity-60"
            >
              <svg
                className="h-5 w-5 stroke-[2.5]"
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

            <h1 className="text-base font-bold leading-tight text-[#1F1B18]">
              Keranjang Belanja
            </h1>
          </div>

          <span className="text-xs font-semibold text-[#857B72]">
            {totalItems} item
          </span>
        </div>
      </div>

      {/* DAFTAR ITEM KERANJANG */}
      <div className="scrollbar-none flex-1 space-y-3 overflow-y-auto px-4 py-4 pb-36">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-2 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAE5DF]/60 text-2xl text-[#857B72]">
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
                className="flex items-center gap-3 rounded-2xl border border-[#EAE5DF] bg-white p-3 shadow-2xs"
              >
                {/* GAMBAR BARANG */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#EAE5DF] bg-[#F8F6F2]">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[10px] text-[#A09387]">
                      Foto
                    </div>
                  )}
                </div>

                {/* RINCIAN PRODUK */}
                <div className="min-w-0 flex-1 space-y-0.5">
                  <h3 className="truncate text-xs font-bold text-[#1F1B18]">
                    {product.title}
                  </h3>

                  {item.size && (
                    <p className="text-[10px] text-[#857B72]">
                      Ukuran {item.size}
                    </p>
                  )}

                  <p className="pt-0.5 text-xs font-extrabold text-[#D96B27]">
                    {formatRupiah(product.price)}
                  </p>
                </div>

                {/* KONTROL JUMLAH & HAPUS */}
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onRemoveItem(product.id, item.size)
                    }
                    className="p-0.5 text-xs text-[#857B72] transition-colors hover:text-[#D9534F]"
                  >
                    ✕
                  </button>

                  <div className="flex items-center overflow-hidden rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]">
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
                      className="flex h-6 w-6 items-center justify-center text-xs font-bold text-[#1F1B18] active:bg-[#EAE5DF]"
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
                      className="flex h-6 w-6 items-center justify-center text-xs font-bold text-[#1F1B18] active:bg-[#EAE5DF]"
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
        <div className="fixed bottom-0 left-0 right-0 z-[60] space-y-3 border-t border-[#EAE5DF] bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-lg">
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
            className="w-full cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-3 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)] active:translate-y-0 active:shadow-xs"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}