"use client";

import { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import { useToast } from "@/context/ToastContext";
import type { CatItem } from "@/types/cattery";

// Tipe dan Konfigurasi Badge
export type BadgeType =
  | "BoB"
  | "CH"
  | "NOM"
  | "Pedigree aktif"
  | "Indukan aktif"
  | "Sehat terverifikasi"
  | "Vaksin lengkap"
  | "Pedigree diproses"
  | "Belum pedigree";

interface BadgeConfig {
  label: string;
  bgColor: string;
  textColor: string;
  title: string;
  description: string;
}

const BADGE_CONFIGS: Record<BadgeType, BadgeConfig> = {
  BoB: {
    label: "BoB",
    bgColor: "bg-[#FFF4E5]",
    textColor: "text-[#C26D0A]",
    title: "Best of Best (BoB)",
    description: "Meraih gelar piala Best of Best pada pameran resmi Cat Show ICA.",
  },
  CH: {
    label: "CH",
    bgColor: "bg-[#EAF6ED]",
    textColor: "text-[#28844B]",
    title: "Champion (CH)",
    description: "Telah memenuhi sertifikat poin Championship resmi dari juri FIFe/ICA.",
  },
  NOM: {
    label: "NOM",
    bgColor: "bg-[#EBF3FF]",
    textColor: "text-[#1E62D0]",
    title: "Nomination (NOM)",
    description: "Berhasil meraih nominasi panggung Best in Show pada pameran Cat Show.",
  },
  "Pedigree aktif": {
    label: "Pedigree aktif",
    bgColor: "bg-[#EAF6ED]",
    textColor: "text-[#28844B]",
    title: "Pedigree aktif",
    description: "Sertifikat pedigree sudah diterbitkan admin ICA dan masih berlaku.",
  },
  "Indukan aktif": {
    label: "Indukan aktif",
    bgColor: "bg-[#EBF3FF]",
    textColor: "text-[#1E62D0]",
    title: "Indukan aktif",
    description: "Terdaftar resmi sebagai indukan/pejantan aktif di sistem Cattery.",
  },
  "Sehat terverifikasi": {
    label: "Sehat terverifikasi",
    bgColor: "bg-[#EAF6ED]",
    textColor: "text-[#28844B]",
    title: "Sehat terverifikasi",
    description: "Telah lolos verifikasi berkas kesehatan dan pemeriksaan dokter hewan.",
  },
  "Vaksin lengkap": {
    label: "Vaksin lengkap",
    bgColor: "bg-[#EAF6ED]",
    textColor: "text-[#28844B]",
    title: "Vaksin lengkap",
    description: "Buku vaksin rutin sudah diunggah dan terverifikasi lengkap.",
  },
  "Pedigree diproses": {
    label: "Pedigree diproses",
    bgColor: "bg-[#EBF3FF]",
    textColor: "text-[#1E62D0]",
    title: "Pedigree diproses",
    description: "Pengajuan pedigree sedang dalam tahap peninjauan oleh admin ICA.",
  },
  "Belum pedigree": {
    label: "Belum pedigree",
    bgColor: "bg-[#FAF7F2]",
    textColor: "text-[#8C8074]",
    title: "Belum pedigree",
    description: "Sertifikat silsilah keturunan belum diterbitkan atau belum diajukan.",
  },
};

// Pemetaan Badge Default Berdasarkan Kucing
function getBadgesForCat(cat: CatItem): BadgeType[] {
  if (cat.name.includes("Bagas")) {
    return ["BoB", "CH", "Pedigree aktif", "Vaksin lengkap"];
  }
  if (cat.name.includes("Kirana")) {
    return ["NOM", "Pedigree aktif", "Indukan aktif", "Sehat terverifikasi"];
  }
  if (cat.name.includes("Nara")) {
    return ["BoB", "Pedigree diproses", "Vaksin lengkap"];
  }
  if (cat.name.includes("Rimba")) {
    return ["Pedigree aktif", "Indukan aktif"];
  }
  if (cat.name.includes("Sekar")) {
    return ["Belum pedigree", "Vaksin lengkap"];
  }
  if (cat.name.includes("Damar")) {
    return ["Belum pedigree"];
  }
  return ["Pedigree aktif", "Vaksin lengkap"];
}

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

  const catBadges = getBadgesForCat(cat);

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-ink-100)] bg-white flex flex-col justify-between">
      {/* Input File Tersembunyi */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* BOX FOTO (BADGE KIRI ATAS DAHULU DIHAPUS) */}
      <div className="relative flex h-32 flex-col items-center justify-center gap-1 rounded-t-xl border-b border-[var(--color-ink-100)] bg-[var(--color-ink-50)] text-[var(--color-ink-400)]">
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
          className="absolute bottom-2 right-2 flex items-center gap-1 rounded-lg border border-dashed border-[var(--color-brand-orange-300)] bg-white px-2.5 py-1 text-[10px] font-medium text-[var(--color-brand-orange-700)] shadow-xs transition hover:bg-[var(--color-brand-orange-50)]"
        >
          <DashboardIcon name="upload" size={11} />
          {imageUrl ? "Ubah foto" : "Unggah foto"}
        </button>
      </div>

      {/* DESKRIPSI & BADGES */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[13px] font-bold text-[#1A1513]">{cat.name}</h3>
            <span
              className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                cat.gender === "Male"
                  ? "bg-[#EBF3FF] text-[#1E62D0]"
                  : "bg-[#FFF0F1] text-[#D93848]"
              }`}
            >
              {cat.gender}
            </span>
          </div>

          <p className="mt-0.5 text-[11px] text-[var(--color-ink-400)]">
            {cat.breed} · {cat.regCode}
          </p>

          {/* LIST BADGES DENGAN POPOVER HOVER */}
          <div className="mt-3 flex flex-wrap gap-1 min-h-[28px]">
            {catBadges.map((badgeKey) => {
              const badge = BADGE_CONFIGS[badgeKey];
              if (!badge) return null;

              return (
                <div key={badgeKey} className="group relative inline-block">
                  {/* Chip Badge */}
                  <span
                    className={`cursor-pointer rounded-md px-2 py-0.5 text-[10px] font-bold transition-all ${badge.bgColor} ${badge.textColor} hover:opacity-85`}
                  >
                    {badge.label}
                  </span>

                  {/* Popover Card Penjelasan (Tampil Pas Hover) */}
                  <div className="pointer-events-none absolute left-0 bottom-full hidden w-40 rounded-2xl bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.11)] border border-[#EEDFD5] transition-all duration-200 group-hover:block z-30">
                    <h4 className="text-[12px] font-bold text-[#1A1513]">{badge.title}</h4>
                    <p className="mt-1 text-[10px] text-[#8C8074] leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STATISTIK SKOR */}
        <div className="mt-2 pt-3 border-t border-[var(--color-ink-100)] flex items-end justify-between">
          <div>
            <p className="text-[10px] text-[var(--color-ink-400)]">Skor kesehatan (admin)</p>
            <p className="text-[15px] font-bold text-[#28844B]">
              {cat.healthScore}
            </p>
          </div>
          <p className="text-[11px] text-right text-[var(--color-ink-400)]">
            Cat show dibayar
            <br />
            <span className="font-bold text-[#1A1513]">{cat.paidShows} event</span>
          </p>
        </div>

        {/* TOMBOL DETAIL */}
        <Link
          href={`/cattery/my-cats/${cat.id}`}
          className="mt-3 block w-full rounded-full border border-[var(--color-ink-100)] py-2 text-center text-[12px] font-bold text-[var(--color-ink-700)] transition-all duration-200 hover:border-[var(--color-brand-orange-300)] hover:bg-gradient-to-r hover:from-white hover:to-[var(--color-brand-orange-100)] hover:text-[var(--color-brand-orange-700)]"
        >
          Lihat detail
        </Link>
      </div>
    </div>
  );
}