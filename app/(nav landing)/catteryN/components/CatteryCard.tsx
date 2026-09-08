"use client";

import { Cattery } from "../types";
import ImageCarousel from "./ImageCarousel";

interface CatteryCardProps {
  cattery: Cattery;
  view: "list" | "grid";
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function CatteryCard({ cattery, view }: CatteryCardProps) {
  if (view === "grid") {
    return (
      <div className="overflow-hidden rounded-2xl border border-[#E9E2DC] bg-white shadow-xs transition-all hover:border-[#F3D1BD] hover:shadow-sm">
        <ImageCarousel
          images={cattery.images}
          alt={cattery.name}
          className="aspect-[4/3] w-full rounded-t-2xl"
        />

        <div className="space-y-3 p-4">
          <div>
            <h3 className="text-sm font-bold text-[#231A14]">{cattery.name}</h3>
            <p className="mt-0.5 text-xs text-[#7A6E65]">{cattery.locationText}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {cattery.breeds.slice(0, 2).map((breed, idx) => (
              <span
                key={idx}
                className="rounded-lg border border-[#F3D1BD]/50 bg-[#FFF6EC] px-2 py-0.5 text-[10px] font-medium text-[#EE6B28]"
              >
                {breed}
              </span>
            ))}
            {cattery.breeds.length > 2 && (
              <span className="rounded-lg bg-[#F7F4F1] px-2 py-0.5 text-[10px] font-medium text-[#7A6E65]">
                +{cattery.breeds.length - 2}
              </span>
            )}
          </div>

          <div className="pt-1">
            <a
              href={cattery.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E9E2DC] bg-white py-2 text-xs font-semibold text-[#4A3D34] transition hover:border-[#EE6B28] hover:text-[#EE6B28]"
            >
              <svg className="h-4 w-4 text-[#EE6B28]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Buka di Google Maps
            </a>
          </div>
        </div>
      </div>
    );
  }

  // view === "list"
  return (
    <div className="flex overflow-hidden rounded-2xl border border-[#E9E2DC] bg-white shadow-xs transition-all hover:border-[#F3D1BD]">
      <ImageCarousel
        images={cattery.images}
        alt={cattery.name}
        className="min-h-[160px] w-48 shrink-0 self-stretch rounded-l-2xl sm:w-56"
      />

      <div className="min-w-0 flex-1 p-4">
        <div>
          <h3 className="text-base font-bold text-[#231A14]">{cattery.name}</h3>
          <p className="mt-0.5 text-xs text-[#7A6E65]">{cattery.locationText}</p>
        </div>

        <div className="mt-4 space-y-4 border-t border-[#F3D1BD]/30 pt-4">
          <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2">
            <div className="space-y-1">
              <span className="block font-medium text-[#7A6E65]">Alamat lengkap</span>
              <p className="font-semibold text-[#231A14]">{cattery.fullAddress}</p>
            </div>
            <div className="space-y-1">
              <span className="block font-medium text-[#7A6E65]">Ras kucing yang dimiliki</span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {cattery.breeds.map((breed, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg border border-[#F3D1BD]/50 bg-[#FFF6EC] px-2.5 py-1 text-[11px] font-medium text-[#EE6B28]"
                  >
                    {breed}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={cattery.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2DC] bg-white px-4 py-2 text-xs font-semibold text-[#4A3D34] transition hover:border-[#EE6B28] hover:text-[#EE6B28]"
            >
              <svg className="h-4 w-4 text-[#EE6B28]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Buka di Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}