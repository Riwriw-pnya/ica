"use client";

import { useState } from "react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string; // kontrol ukuran/rounded dari parent
}

export default function ImageCarousel({ images, alt, className = "" }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`group/carousel relative overflow-hidden bg-[#F7F4F1] ${className}`}>
      <img
        src={images[index]}
        alt={`${alt} - foto ${index + 1}`}
        className="h-full w-full object-cover"
      />

      {hasMultiple && (
        <>
          <button
            onClick={goPrev}
            aria-label="Foto sebelumnya"
            className="absolute left-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#231A14] opacity-0 shadow transition group-hover/carousel:opacity-100 hover:bg-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goNext}
            aria-label="Foto berikutnya"
            className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#231A14] opacity-0 shadow transition group-hover/carousel:opacity-100 hover:bg-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIndex(i);
                }}
                aria-label={`Ke foto ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-4 bg-white" : "w-1.5 bg-white/70"
                }`}
              />
            ))}
          </div>

          <span className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white">
            {index + 1}/{images.length}
          </span>
        </>
      )}
    </div>
  );
}