"use client";

import { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import QualityBadge from "@/app/cattery/my-cats/components/QualityBadge";
import { useToast } from "@/context/ToastContext";
import type { CatItem } from "@/types/cattery";

export default function CatCard({ cat }: { cat: CatItem }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showToast("Format Tidak Sesuai", "Harap unggah file gambar (JPG, PNG, WebP).", {
          tone: "error",
        });
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
      showToast("Foto Diunggah", `Foto untuk ${cat.name} berhasil diperbarui.`);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-ink-100)] bg-white transition hover:border-[var(--color-brand-orange-300)] hover:shadow-md hover:shadow-orange-300/50">
      {/* Input File Tersembunyi */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="relative flex h-32 flex-col items-center justify-center gap-1 rounded-t-xl border-b border-[var(--color-ink-100)] bg-[var(--color-brand-orange-50)] text-[var(--color-brand-orange-500)]">
        {imageUrl ? (
          <Image src={imageUrl} alt={cat.name} fill className="object-cover" />
        ) : (
          <>
            <DashboardIcon name="cat" size={24} />
            <p className="text-[11px] text-[var(--color-ink-700)]">Foto belum diunggah</p>
          </>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full border border-[var(--color-brand-orange-300)] bg-white px-2.5 py-1 text-[10px] font-medium text-[var(--color-brand-orange-700)] shadow-xs transition hover:bg-[var(--color-brand-orange-50)]"
        >
          <DashboardIcon name="upload" size={11} />
          {imageUrl ? "Ubah foto" : "Unggah foto"}
        </button>

        {cat.qualityBadge && (
          <span className="absolute left-2 top-2 z-10">
            <QualityBadge badge={cat.qualityBadge} />
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-[13px] font-semibold text-[var(--color-ink-900)]">{cat.name}</h3>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              cat.gender === "Male"
                ? "bg-[var(--color-info-bg)] text-[var(--color-info)]"
                : "bg-[var(--color-brand-rose-50)] text-[#ac3d43]"
            }`}
          >
            {cat.gender}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-[var(--color-ink-400)]">
          {cat.breed} · {cat.regCode}
        </p>

        <div className="mt-3 flex items-end justify-between border-t border-[var(--color-ink-100)] hover:text-[var(--color-brand-orange-300)] pt-3">
          <div>
            <p className="text-[10px] text-[var(--color-ink-400)]">Skor kesehatan (admin)</p>
            <p className="text-[15px] font-semibold text-[var(--color-brand-orange-700)]">
              {cat.healthScore}
            </p>
          </div>
          <p className="text-[11px] text-[var(--color-ink-400)]">
            Cat show dibayar
            <br />
            <span className="font-medium text-[var(--color-ink-700)]">{cat.paidShows} event</span>
          </p>
        </div>

        <Link
          href={`/cattery/my-cats/${cat.id}`}
          className="mt-4 block w-full rounded-full border border-[var(--color-ink-100)] py-2 text-center text-[12px] font-medium text-[var(--color-ink-700)] transition-all duration-200 hover:border-[var(--color-brand-orange-300)] hover:bg-gradient-to-r hover:from-white hover:to-[var(--color-brand-orange-100)] hover:text-[var(--color-brand-orange-700)]"
        >
          Lihat detail
        </Link>
      </div>
    </div>
  );
}