"use client";

import { useEffect, useState } from "react";

interface NewsThumbnailProps {
  href?: string;
  title: string;
}

export default function NewsThumbnail({ href, title }: NewsThumbnailProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!href || !href.startsWith("http")) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    // Menggunakan API route /api/fetch-img seperti di landing page
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
  }, [href]);

  // Skeleton loading kecil saat fetching gambar
  if (loading) {
    return (
      <div className="h-11 w-11 shrink-0 animate-pulse rounded-lg bg-[var(--color-ink-100)]" />
    );
  }

  // Jika tidak ditemukan gambar pada link tersebut, sembunyikan kotaknya
  if (!imageUrl) return null;

  return (
    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[var(--color-brand-orange-100)]">
      <img
        src={imageUrl}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={() => setImageUrl(null)}
      />
    </div>
  );
}