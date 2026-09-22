"use client";

import React from "react";

export interface ProductItem {
  id: string;
  name: string;
  price: string;
  category: string;
  categoryIcon?: "folder" | "calendar";
  status: "Aktif" | "Draft";
  mainImage?: string;
  subImages: Array<{ id: number; image?: string; label?: string }>;
  photoCountNote: string;
  description?: string;
}

export interface ProductCardProps {
  item: ProductItem;
  onEdit?: (item: ProductItem) => void;
  onHide?: (item: ProductItem) => void;
  onDelete?: (item: ProductItem) => void;
}

export default function ProductCard({
  item,
  onEdit,
  onHide,
  onDelete,
}: ProductCardProps) {
  const isDraft = item.status === "Draft";

  return (
    <div className="bg-white border border-[#EFE9E1] rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-[#D0C5BC] transition space-y-4">
      <div className="space-y-3">
        {/* Foto Utama Box */}
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#F5F2ED] border border-dashed border-[#D0C5BC] flex flex-col items-center justify-center text-[#8C8078]">
          {item.mainImage ? (
            <img
              src={item.mainImage}
              alt={item.name}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <svg
                className="w-7 h-7 text-[#A0948C]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="text-xs font-medium text-[#7A6E65]">Foto utama produk</span>
            </div>
          )}
        </div>

        {/* Thumbnail Sub Photos Grid */}
        <div className="grid grid-cols-3 gap-2">
          {item.subImages.map((sub, idx) => (
            <div key={idx}>
              {sub.image ? (
                <div className="h-12 rounded-xl bg-[#F5F2ED] border border-[#EFE9E1] overflow-hidden">
                  <img src={sub.image} alt="sub" className="w-full h-full object-cover" />
                </div>
              ) : sub.label ? (
                <div className="h-12 rounded-xl bg-[#F5F2ED] border border-[#EFE9E1] flex items-center justify-center text-[11px] text-[#A0948C]">
                  {sub.label}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onEdit?.(item)}
                  className="w-full h-12 rounded-xl bg-[#FFF8F3] border border-dashed border-[#FFC299] flex items-center justify-center text-[11px] font-bold text-[#EE6B28] hover:bg-[#FFE5D4]/50 transition cursor-pointer"
                >
                  + Foto
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Badges: Kategori & Status */}
        <div className="flex items-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] text-[#5C5046] text-[11px] font-medium border border-[#EFE9E1]">
            {item.categoryIcon === "calendar" ? (
              <svg className="w-3.5 h-3.5 text-[#8C8078]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-[#8C8078]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            )}
            <span>{item.category}</span>
          </span>

          {!isDraft ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Aktif
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Draft
            </span>
          )}
        </div>

        {/* Informasi Nama & Harga Produk */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-[#231A14] leading-snug">
            {item.name}
          </h3>
          <p className="text-xs font-bold text-[#EE6B28]">
            {item.price}
          </p>
          <p className="text-[11px] text-[#A0948C]">
            {item.photoCountNote}
          </p>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="pt-3 border-t border-[#F2EFE9] flex items-center gap-2">
        {!isDraft ? (
          <>
            <button
              type="button"
              onClick={() => onEdit?.(item)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-xl border border-[#EE6B28] text-[#EE6B28] hover:bg-[#FFF8F3] text-xs font-bold transition cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              <span>Edit produk</span>
            </button>
            <button
              type="button"
              onClick={() => onHide?.(item)}
              className="px-4 py-1.5 rounded-xl border border-[#EFE9E1] text-[#7A6E65] hover:bg-[#FAF8F5] text-xs font-bold transition cursor-pointer"
            >
              Sembunyikan
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onEdit?.(item)}
              className="px-4 py-1.5 rounded-xl border border-[#EE6B28] text-[#EE6B28] hover:bg-[#FFF8F3] text-xs font-bold transition cursor-pointer"
            >
              Lengkapi produk
            </button>
            <button
              type="button"
              onClick={() => onDelete?.(item)}
              className="px-4 py-1.5 rounded-xl border border-[#EFE9E1] text-[#7A6E65] hover:bg-[#FAF8F5] text-xs font-bold transition cursor-pointer"
            >
              Hapus
            </button>
          </>
        )}
      </div>
    </div>
  );
}