"use client";

import { useState, TouchEvent, MouseEvent } from "react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

export default function ImageCarousel({ images, alt, className = "" }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-[#F7F4F1] text-xs text-[#7A6E65] ${className}`}>
        Tidak ada foto
      </div>
    );
  }

  const hasMultiple = images.length > 1;

  const goPrev = (e?: MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = (e?: MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Klik langsung di area gambar
  const handleImageClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!hasMultiple) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    // Klik 30% area kiri = Foto Sebelumnya
    if (clickX < width * 0.3) {
      goPrev(e);
    } else {
      // Klik 70% area kanan = Foto Selanjutnya
      goNext(e);
    }
  };

  // Fitur swipe layar di HP
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) goNext();
    if (diff < -50) goPrev();

    setTouchStart(null);
  };

  return (
    <div
      onClick={handleImageClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`group/carousel relative overflow-hidden bg-[#F7F4F1] ${
        hasMultiple ? "cursor-pointer" : ""
      } ${className}`}
    >
      <img
        src={images[index]}
        alt={`${alt} - foto ${index + 1}`}
        className="h-full w-full select-none object-cover transition-all duration-300"
      />

      {hasMultiple && (
        <>
          {/* Tombol Panah Kiri */}
          <button
            onClick={goPrev}
            aria-label="Foto sebelumnya"
            className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#231A14] opacity-0 shadow transition hover:bg-white group-hover/carousel:opacity-100"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Tombol Panah Kanan */}
          <button
            onClick={goNext}
            aria-label="Foto berikutnya"
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#231A14] opacity-0 shadow transition hover:bg-white group-hover/carousel:opacity-100"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indikator Dots berbentuk Kapsul/Pill persis seperti di gambar contoh */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1.5 backdrop-blur-xs">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIndex(i);
                }}
                aria-label={`Ke foto ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-[#EE6B28]" : "w-2 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>

          {/* Label Jumlah Foto */}
          <span className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white">
            {index + 1}/{images.length}
          </span>
        </>
      )}
    </div>
  );
}