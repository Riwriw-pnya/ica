"use client";

import Image from "next/image";
import type { Product, Category } from "../StorePage";

interface Props {
  products: Product[];
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onOpenProduct: (product: Product) => void;
  onOpenHistory: () => void;
  formatRupiah: (value: number) => string;
}

export default function StoreCatalogDesktop({
  products,
  categories,
  activeCategory,
  setActiveCategory,
  onOpenProduct,
  onOpenHistory,
  formatRupiah,
}: Props) {
  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
            Store ICA
          </h1>

          <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
            Merchandise, publikasi, dan perlengkapan resmi yang
            diterbitkan ICA. Pesanan dikemas sekretariat setelah
            pembayaran terverifikasi.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 pt-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#FADEC9] bg-[#FFF2E8]/60 text-xs font-semibold text-[#D96B27]">
            <svg
              className="w-4 h-4 text-[#D96B27]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>

            <span>{products.length} produk tersedia</span>
          </div>

          <button
            type="button"
            onClick={onOpenHistory}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#EEDFD5] bg-white hover:bg-[#FFF2E8] hover:border-[#FADEC9] text-xs font-bold text-[#231A14] transition-all cursor-pointer shadow-2xs group"
          >
            <svg
              className="w-4 h-4 text-[#8C8074] group-hover:text-[#D96B27] transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>

            <span className="group-hover:text-[#D96B27] transition-colors">
              Riwayat pesanan
            </span>

            <span className="ml-0.5 rounded-full bg-[#FFF2E8] border border-[#FADEC9] px-2 py-0.5 text-[10px] font-extrabold text-[#D96B27]">
              5 aktif
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
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

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EEDFD5] py-16 text-center">
          <p className="text-sm font-semibold text-[#1A1513]">
            Barang tidak ditemukan
          </p>

          <p className="text-xs text-[#8C8074] mt-1">
            Belum ada produk untuk kategori ini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => onOpenProduct(product)}
              className="bg-white rounded-2xl border border-[#EEDFD5] overflow-hidden flex flex-col justify-between hover:shadow-xs transition-all duration-200 cursor-pointer group"
            >
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
                    <svg
                      className="w-7 h-7 stroke-[1.5]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>

                    <span className="text-[11px] font-medium text-[#B5A89B]">
                      Foto produk belum diunggah
                    </span>
                  </div>
                )}

                {product.badge && (
                  <span className="absolute bottom-3 left-3 bg-[#FFF2E8]/90 backdrop-blur-xs text-[#F05A1B] border border-[#FCE3D2] text-[10px] font-semibold px-3 py-0.5 rounded-full shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[11px] text-[#8C8074] font-medium">
                    {product.categoryLabel}
                  </span>

                  <h2 className="text-sm font-bold text-[#1A1513] mt-0.5 leading-snug line-clamp-1">
                    {product.title}
                  </h2>
                </div>

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
    </>
  );
}