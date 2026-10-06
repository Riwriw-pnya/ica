"use client";

import { useEffect, useState } from "react";

export interface NewsThumbnailProps {
  href?: string;
  title: string;
  image?: string;
  src?: string;
}

export default function NewsThumbnail({
  href,
  title,
  image,
  src,
}: NewsThumbnailProps) {
  // Gunakan foto lokal jika tersedia dari data berita
  const localImage = image || src;

  const [imageUrl, setImageUrl] = useState<string | null>(localImage || null);
  const [loading, setLoading] = useState(!localImage && !!href?.startsWith("http"));

  useEffect(() => {
    // Jika sudah ada gambar lokal atau bukan URL luar, langsung pakai gambar lokal
    if (localImage || !href || !href.startsWith("http")) {
      setImageUrl(localImage || null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    // Ambil gambar secara otomatis dari URL berita luar
    fetch(`/api/fetch-img?url=${encodeURIComponent(href)}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setImageUrl(data.image || null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setImageUrl(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [href, localImage]);

  // 1. Skeleton Loading saat memuat foto
  if (loading) {
    return (
      <div className="h-12 w-20 shrink-0 animate-pulse rounded-xl bg-[var(--color-ink-100,#EFE9E1)]" />
    );
  }

  // 2. Jika foto ada (foto lokal atau dari fetch API), tampilkan fotonya
  if (imageUrl) {
    return (
      <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-xl border border-[#FCE3D2] bg-[#FFF2E8]">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageUrl(null)}
        />
      </div>
    );
  }

  // 3. Jika foto tidak ada, tampilkan kotak oranye soft dengan ikon gambar persis contoh desain
  return (
    <div className="relative flex h-12 w-20 shrink-0 items-center justify-center rounded-xl border border-[#FCE3D2] bg-[#FFF2E8]">
      <svg
        className="h-5 w-5 text-[#D95D1E]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
    </div>
  );
}