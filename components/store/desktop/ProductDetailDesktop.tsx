"use client";

import Image from "next/image";
import type { Product } from "../StorePage";

interface Props {
  product: Product;
  quantity: number;
  size: string;
  setQuantity: (value: number | ((prev: number) => number)) => void;
  setSize: (value: string) => void;
  onBack: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  formatRupiah: (value: number) => string;
}

export default function StoreProductDetailDesktop({
  product,
  quantity,
  size,
  setQuantity,
  setSize,
  onBack,
  onAddToCart,
  onBuyNow,
  formatRupiah,
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-[#FFF8EE] rounded-2xl border border-[#EEDFD5] p-8 min-h-[380px] flex flex-col items-center justify-center relative overflow-hidden shadow-2xs">
          {product.image ? (
            <div className="relative w-full h-[320px]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#C8BDB2]">
              <svg
                className="w-10 h-10 stroke-[1.2]"
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

              <span className="text-xs font-medium text-[#B5A89B]">
                Foto produk belum diunggah
              </span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-[#EEDFD5] p-6 space-y-5 shadow-2xs">
          <div>
            <span className="text-xs text-[#8C8074] font-medium">
              {product.categoryLabel}
            </span>

            <h1 className="text-xl font-bold text-[#1A1513] mt-1 leading-snug">
              {product.title}
            </h1>
          </div>

          <div className="space-y-1">
            <div className="text-xl font-extrabold text-[#F05A1B]">
              {formatRupiah(product.price)}
            </div>

            <p className="text-xs text-[#8C8074]">
              Stok {product.stock} · dikirim dari sekretariat ICA
            </p>
          </div>

          <p className="text-xs text-[#574D45] leading-relaxed">
            {product.description ||
              "Merchandise dan perlengkapan resmi organisasi Indonesian Cat Association."}
          </p>

          {product.category === "apparel" && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1A1513] block">
                Ukuran
              </label>

              <div className="flex items-center gap-2">
                {["M", "L", "XL"].map((itemSize) => (
                  <button
                    key={itemSize}
                    type="button"
                    onClick={() => setSize(itemSize)}
                    className={`w-10 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      size === itemSize
                        ? "bg-[#FFF2E8] text-[#F05A1B] border-2 border-[#FCE3D2]"
                        : "bg-white text-[#574D45] border border-[#EEDFD5] hover:bg-[#FAF7F5]"
                    }`}
                  >
                    {itemSize}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2 pt-1">
            <label className="text-xs font-bold text-[#1A1513] block">
              Jumlah
            </label>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#EEDFD5] rounded-xl bg-white overflow-hidden h-9">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  className="w-8 h-full flex items-center justify-center text-xs font-bold text-[#574D45] hover:bg-[#FAF7F5] cursor-pointer"
                >
                  -
                </button>

                <span className="w-10 text-center text-xs font-bold text-[#1A1513]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(10, q + 1))
                  }
                  className="w-8 h-full flex items-center justify-center text-xs font-bold text-[#574D45] hover:bg-[#FAF7F5] cursor-pointer"
                >
                  +
                </button>
              </div>

              <span className="text-[11px] text-[#8C8074]">
                Maksimal 10 pcs per pesanan
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={onAddToCart}
              className="flex-1 py-3 px-4 bg-[#EE6B28] hover:bg-[#C8601D] active:scale-98 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Tambah ke keranjang
            </button>

            <button
              type="button"
              onClick={onBuyNow}
              className="flex-1 py-3 px-4 bg-white hover:bg-[#FAF7F5] border border-[#EEDFD5] text-[#1A1513] font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Beli sekarang
            </button>
          </div>

          <p className="text-[11px] text-[#8C8074] leading-relaxed pt-2 border-t border-[#F7F2EB]">
            Dikirim sekretariat ICA melalui JNE, J&T Express, SiCepat,
            AnterAja, atau Ninja Express.
          </p>
        </div>
      </div>
    </div>
  );
}