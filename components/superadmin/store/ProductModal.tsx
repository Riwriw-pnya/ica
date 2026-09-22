"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { ProductItem } from "./ProductCard";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  productToEdit?: ProductItem | null;
  onSave?: (savedProduct: ProductItem) => void; // Prop ditambahkan di sini
}

export default function ProductModal({
  isOpen,
  onClose,
  onSuccess,
  productToEdit,
  onSave,
}: ProductModalProps) {
  const { showToast } = useToast();
  const isEditMode = Boolean(productToEdit);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Perlengkapan Kucing");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Populate data saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      if (productToEdit) {
        setName(productToEdit.name || "");
        setCategory(productToEdit.category || "Perlengkapan Kucing");
        setPrice(productToEdit.price ? productToEdit.price.replace("Rp ", "") : "");
        setDescription(
          productToEdit.description || "Bahan, ukuran, dan catatan pengambilan produk."
        );
      } else {
        setName("");
        setCategory("Perlengkapan Kucing");
        setPrice("");
        setDescription("");
      }
    }
  }, [isOpen, productToEdit]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedPrice = price.trim()
      ? price.startsWith("Rp")
        ? price
        : `Rp ${price}`
      : "Rp 0";

    const savedProductData: ProductItem = {
      id: productToEdit ? productToEdit.id : Date.now().toString(),
      name: name || "Produk Baru",
      price: formattedPrice,
      category,
      categoryIcon: category === "Tiket Event" ? "calendar" : "folder",
      status: productToEdit ? productToEdit.status : "Aktif",
      mainImage: productToEdit?.mainImage || "/images/tas-kandang.jpg",
      subImages: productToEdit?.subImages || [
        { id: 1, label: "" },
        { id: 2, label: "" },
        { id: 3, label: "" },
      ],
      photoCountNote: productToEdit?.photoCountNote || "Foto utama diunggah",
      description,
    };

    if (onSave) {
      onSave(savedProductData);
    }

    if (isEditMode) {
      showToast("Perubahan produk disimpan di katalog Store.", "success");
    } else {
      showToast("Produk tersimpan di katalog Store.", "success");
    }

    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#EFE9E1] rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header Modal */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-[#F2EFE9]">
          <div>
            <h3 className="text-base font-bold text-[#231A14]">
              {isEditMode ? "Edit produk katalog" : "Tambah produk katalog"}
            </h3>
            <p className="text-xs text-[#8C8078] mt-0.5">
              Katalog bersifat display-only. Harga ditampilkan tanpa proses transaksi.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8C8078] hover:text-[#231A14] transition cursor-pointer p-1 rounded-lg hover:bg-[#FAF8F5]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body Modal / Form */}
        <form onSubmit={handleSave} className="flex flex-col flex-1">
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Kolom Kiri: Input Teks */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#231A14] mb-1.5">
                  Nama produk <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama produk"
                  required
                  className="w-full px-3.5 py-2 text-xs border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28] text-[#231A14] bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#231A14] mb-1.5">Kategori</label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28] text-[#231A14] bg-white appearance-none cursor-pointer"
                    >
                      <option value="Perlengkapan Kucing">Perlengkapan Kucing</option>
                      <option value="Tiket Event">Tiket Event</option>
                      <option value="Merchandise">Merchandise</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#8C8078]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#231A14] mb-1.5">Harga (Rp)</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="385.000"
                    className="w-full px-3.5 py-2 text-xs border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28] text-[#231A14] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#231A14] mb-1.5">Deskripsi</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Bahan, ukuran, dan catatan pengambilan produk."
                  className="w-full px-3.5 py-2 text-xs border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28] text-[#231A14] bg-white resize-none"
                />
              </div>
            </div>

            {/* Kolom Kanan: Foto Produk */}
            <div className="md:col-span-5 space-y-3">
              <label className="block text-xs font-bold text-[#231A14]">Foto produk</label>

              <div className="w-full h-40 bg-[#F5F2ED] border border-dashed border-[#D0C5BC] rounded-xl flex flex-col items-center justify-center text-[#8C8078] gap-1.5 p-4 cursor-pointer hover:bg-[#EFE9E1]/70 transition">
                <svg className="w-6 h-6 text-[#A0948C]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="text-xs font-medium text-[#7A6E65] text-center">Foto utama (thumbnail katalog)</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="h-12 rounded-xl bg-[#F5F2ED] border border-[#EFE9E1] flex items-center justify-center text-[11px] text-[#A0948C]">
                  Foto 2
                </div>
                <div className="h-12 rounded-xl bg-[#F5F2ED] border border-[#EFE9E1] flex items-center justify-center text-[11px] text-[#A0948C]">
                  Foto 3
                </div>
              </div>

              <p className="text-[11px] text-[#8C8078] leading-relaxed pt-1">
                Foto utama dipakai sebagai thumbnail di katalog Store.
              </p>
            </div>
          </div>

          {/* Footer Modal */}
          <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#F2EFE9] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-[#EFE9E1] bg-white text-[#7A6E65] hover:bg-[#FAF8F5] text-xs font-bold transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white text-xs font-bold shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] transition cursor-pointer"
            >
              {isEditMode ? "Simpan perubahan" : "Simpan produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}