"use client";

import Image from "next/image";

import type { CartItem } from "../StorePage";

interface Props {
  cart: CartItem[];
  totalCartItems: number;
  totalCartPrice: number;
  onBack: () => void;
  onUpdateQuantity: (
    productId: string,
    size?: string,
    delta?: number
  ) => void;
  onRemoveItem: (productId: string, size?: string) => void;
  formatRupiah: (value: number) => string;
  onProceedToCheckout: () => void;
}

export default function StoreCartDesktop({
  cart,
  totalCartItems,
  totalCartPrice,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  formatRupiah,
  onProceedToCheckout,
}: Props) {
  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D96B27] hover:underline cursor-pointer"
      >
        <svg
          className="w-4 h-4 stroke-[2.5]"
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

        <span>Kembali ke store</span>
      </button>

      <div>
        <h1 className="font-display text-[22px] font-bold tracking-tight text-[#1F1B18] flex items-center gap-3">
          Keranjang Belanja

          <span className="text-xs bg-[#FFF2E8] text-[#D96B27] border border-[#FADEC9] px-2.5 py-0.5 rounded-full font-bold">
            {totalCartItems} item
          </span>
        </h1>

        <p className="mt-1 text-[12px] text-[#857B72]">
          Periksa daftar produk yang ingin dibeli sebelum melanjutkan
          ke pembayaran.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EEDFD5] py-16 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#FFF8EE] border border-[#FADEC9] flex items-center justify-center text-[#D96B27] mx-auto text-2xl">
            🛒
          </div>

          <p className="text-sm font-bold text-[#1F1B18]">
            Keranjang belanja Anda masih kosong
          </p>

          <p className="text-xs text-[#8C8074]">
            Pilih produk dari katalog untuk menambah ke keranjang.
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-2 inline-flex items-center px-4 py-2 bg-[#EE6B28] text-white text-xs font-bold rounded-xl hover:bg-[#C8601D] transition-colors cursor-pointer"
          >
            Jelajahi Produk
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-3">
            {cart.map(({ product, quantity, size }) => (
              <div
                key={`${product.id}-${size || "std"}`}
                className="bg-white rounded-2xl border border-[#EEDFD5] p-4 flex items-center gap-4 shadow-2xs hover:border-[#FADEC9] transition-all"
              >
                <div className="relative w-16 h-16 bg-[#FFF8EE] rounded-xl overflow-hidden shrink-0 border border-[#EEDFD5]">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[10px] text-[#C8BDB2]">
                      Foto
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <h3 className="text-xs font-bold text-[#1F1B18] truncate">
                    {product.title}
                  </h3>

                  {size && (
                    <p className="text-[11px] text-[#8C8074]">
                      Ukuran: {size}
                    </p>
                  )}

                  <p className="text-xs font-extrabold text-[#D96B27] pt-0.5">
                    {formatRupiah(product.price)}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center border border-[#EEDFD5] rounded-xl bg-[#FAF7F5] overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateQuantity(product.id, size, -1)
                      }
                      className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#1F1B18] hover:bg-[#EEDFD5] cursor-pointer"
                    >
                      -
                    </button>

                    <span className="w-8 text-center text-xs font-bold text-[#1F1B18]">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        onUpdateQuantity(product.id, size, 1)
                      }
                      className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#1F1B18] hover:bg-[#EEDFD5] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onRemoveItem(product.id, size)
                    }
                    className="text-[#8C8074] hover:text-[#D9534F] text-xs font-semibold p-1 cursor-pointer transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-[#EEDFD5] p-5 space-y-4 shadow-2xs sticky top-24">
            <h2 className="text-xs font-bold text-[#1F1B18] pb-2 border-b border-[#EEDFD5]">
              Ringkasan Belanja
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#8C8074]">
                <span>
                  Total Harga ({totalCartItems} barang)
                </span>

                <span className="font-semibold text-[#1F1B18]">
                  {formatRupiah(totalCartPrice)}
                </span>
              </div>

              <div className="flex justify-between text-[#8C8074]">
                <span>Estimasi Pengiriman</span>

                <span className="text-[11px] text-[#22C55E] font-semibold">
                  Dihitung saat checkout
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EEDFD5] flex justify-between items-center">
              <span className="text-xs font-bold text-[#1F1B18]">
                Total Pembayaran
              </span>

              <span className="text-base font-extrabold text-[#D96B27]">
                {formatRupiah(totalCartPrice)}
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
        </div>
      )}
    </div>
  );
}