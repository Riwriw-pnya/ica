"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";

export interface ArticleItem {
  id?: string;
  title: string;
  category: string;
  status?: "Aktif" | "Draft" | "Arsip";
  publishedDate?: string;
  savedDate?: string;
  views?: number;
  imagePlaceholder?: string;
  content?: string;
}

interface CreateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  articleToEdit?: ArticleItem | null;
}

export default function CreateArticleModal({
  isOpen,
  onClose,
  onSuccess,
  articleToEdit,
}: CreateArticleModalProps) {
  const { showToast } = useToast();

  const isEditMode = Boolean(articleToEdit);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [publishDate, setPublishDate] = useState("2026-09-04");
  const [content, setContent] = useState("");

  // Mengisi form secara otomatis jika articleToEdit berganti/tersedia
  useEffect(() => {
    if (isOpen) {
      if (articleToEdit) {
        setTitle(articleToEdit.title || "");
        setCategory(articleToEdit.category || "");
        setPublishDate(articleToEdit.publishedDate || "2026-09-04");
        setContent(
          articleToEdit.content ||
            "Ini adalah isi konten artikel yang sudah disimpan sebelumnya."
        );
      } else {
        // Reset form jika buat artikel baru
        setTitle("");
        setCategory("");
        setPublishDate("2026-09-04");
        setContent("");
      }
    }
  }, [isOpen, articleToEdit]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Pesan toast menyesuaikan aksi (Edit vs Buat Baru)
    if (isEditMode) {
      showToast("Perubahan artikel berhasil disimpan.", "success");
    } else {
      showToast("Artikel diterbitkan di halaman News.", "success");
    }

    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white p-6 shadow-2xl transition-all max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#231A14]">
              {isEditMode ? "Edit artikel" : "Artikel baru"}
            </h3>
            <p className="mt-0.5 text-xs text-[#8C8078]">
              Artikel yang diterbitkan tampil di halaman News dan Member Portal.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#8C8078] hover:bg-[#F5F2ED] hover:text-[#231A14] transition cursor-pointer"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Text Fields */}
            <div className="lg:col-span-7 space-y-4">
              {/* Judul Input */}
              <div>
                <label className="block text-xs font-semibold text-[#231A14] mb-1.5">
                  Judul <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masukkan judul artikel"
                  className="w-full rounded-xl border border-[#EFE9E1] bg-white px-3.5 py-2.5 text-xs text-[#231A14] placeholder-[#A0948C] focus:border-[#EE6B28] focus:outline-none"
                />
              </div>

              {/* Category & Publish Date Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#231A14] mb-1.5">
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-[#EFE9E1] bg-white px-3 py-2.5 text-xs text-[#231A14] focus:border-[#EE6B28] focus:outline-none cursor-pointer"
                  >
                    <option value="">Pilih kategori</option>
                    <option value="Regulasi">Regulasi</option>
                    <option value="Diklat">Diklat</option>
                    <option value="Organisasi">Organisasi</option>
                    <option value="Event">Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#231A14] mb-1.5">
                    Tanggal publish
                  </label>
                  <input
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="w-full rounded-xl border border-[#EFE9E1] bg-white px-3 py-2.5 text-xs text-[#231A14] focus:border-[#EE6B28] focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Isi Artikel (Rich Text Editor Mockup) */}
              <div>
                <label className="block text-xs font-semibold text-[#231A14] mb-1.5">
                  Isi artikel
                </label>
                <div className="rounded-xl border border-[#EFE9E1] overflow-hidden bg-white">
                  {/* Editor Toolbar */}
                  <div className="flex items-center gap-1 border-b border-[#EFE9E1] bg-[#FAF8F5] p-2 text-xs text-[#7A6E65]">
                    <button type="button" className="px-2 py-1 rounded hover:bg-[#EFE9E1] font-bold">
                      B
                    </button>
                    <button type="button" className="px-2 py-1 rounded hover:bg-[#EFE9E1] italic">
                      I
                    </button>
                    <div className="h-4 w-px bg-[#EFE9E1] mx-1" />
                    <button type="button" className="p-1 rounded hover:bg-[#EFE9E1]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                    <button type="button" className="p-1 rounded hover:bg-[#EFE9E1]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </button>
                  </div>

                  {/* Textarea Input */}
                  <textarea
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tulis isi artikel di sini. Editor rich text menyusul saat implementasi."
                    className="w-full p-3 text-xs text-[#231A14] placeholder-[#A0948C] focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Cover Image Upload */}
            <div className="lg:col-span-5 flex flex-col">
              <label className="block text-xs font-semibold text-[#231A14] mb-1.5">
                Cover image
              </label>

              <div className="flex-1 rounded-2xl border border-dashed border-[#D0C5BC] bg-[#F5F2ED] p-6 flex flex-col items-center justify-center text-center text-[#8C8078] min-h-[220px] cursor-pointer hover:bg-[#EFE9E1]/70 transition">
                <svg className="w-8 h-8 text-[#A0948C] mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="text-xs font-medium text-[#7A6E65]">
                  {articleToEdit?.imagePlaceholder || "Cover · 1200×630"}
                </span>
              </div>

              <p className="text-[11px] text-[#A0948C] mt-2">
                Cover dipakai di kartu artikel dan preview Member Portal.
              </p>
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F2EFE9]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#EFE9E1] text-xs font-bold text-[#231A14] hover:bg-[#FAF8F5] transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer rounded-xl border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)] active:translate-y-0 active:shadow-xs"
            >
              {isEditMode ? "Simpan perubahan" : "Terbitkan artikel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}