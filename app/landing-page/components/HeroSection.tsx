"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/images/cattt.jpg",
  "/images/twinC.jpg",
  "/images/cat.jpg",
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden bg-black">
      {/* Slideshow Background */}
      {images.map((src, index) => {
        const isCurrent = index === currentImageIndex;
        const isPrev = index === (currentImageIndex - 1 + images.length) % images.length;

        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              isCurrent
                ? "z-10 opacity-100"
                : isPrev
                ? "z-5 opacity-100"
                : "z-0 opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`Hero Background ${index + 1}`}
              fill
              priority={index === 0}
              className={`object-cover contrast-100 brightness-70 transition-transform duration-[6000ms] ease-out ${
                isCurrent ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        );
      })}

      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black/40 z-20" />
      <div className="relative z-37 max-w-4xl px-4 text-white pb-28 md:pb-36">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase mb-3 drop-shadow-lg">
          Indonesian Cat Association
        </h1>
        <p className="text-lg md:text-xl font-light tracking-wide text-gray-100 drop-shadow">
          Indonesian Professional Cat Lover Organization
        </p>
      </div>
    </section>
  );
}