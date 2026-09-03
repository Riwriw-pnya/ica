"use client";

import { Cattery } from "../types";
import ImageCarousel from "./ImageCarousel";

interface CatteryCardProps {
  cattery: Cattery;
  isExpanded: boolean;
  onToggle: () => void;
  view: "list" | "grid";
}

export default function CatteryCard({ cattery, isExpanded, onToggle, view }: CatteryCardProps) {
  const cleanWhatsapp = cattery.whatsapp.replace(/[^0-9]/g, "");

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

          <div className="flex items-center gap-2 pt-1">
            <a
              href={`https://wa.me/${cleanWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 py-2 text-[11px] font-semibold text-emerald-600 transition hover:bg-emerald-100"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 1117 0z" />
              </svg>
              WhatsApp
            </a>
            
            <a
              href={cattery.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Buka di Google Maps"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#E9E2DC] text-[#4A3D34] transition hover:border-[#EE6B28] hover:text-[#EE6B28]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // view === "list"
  return (
    <div className="bg-white rounded-2xl border border-[#E9E2DC] p-5 shadow-xs transition-all hover:border-[#F3D1BD]">
      {/* Bagian Header Kartu */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Icon Box */}
          <div className="w-12 h-12 rounded-xl bg-[#FFF6EC] border border-[#F3D1BD]/50 flex items-center justify-center text-[#EE6B28]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>

          {/* Nama & Info Singkat */}
          <div>
            <h3 className="text-base font-bold text-[#231A14] flex items-center gap-2">
              {cattery.name}
            </h3>
            <p className="text-xs text-[#7A6E65] mt-0.5">
              {cattery.locationText}
            </p>
          </div>
        </div>

        {/* Tombol Aksi Kanan (WhatsApp Hijau & Accordion Toggle) */}
        <div className="flex items-center gap-2">
          {/* Tombol Icon WhatsApp */}
          <a
            href={`https://wa.me/${cleanWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition border border-emerald-200"
            title="Chat WhatsApp"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 1117 0z" />
            </svg>
          </a>

          <button
            onClick={onToggle}
            className="w-10 h-10 rounded-xl bg-[#F7F4F1] hover:bg-[#E9E2DC] text-[#7A6E65] flex items-center justify-center transition cursor-pointer"
            title={isExpanded ? "Tutup detail" : "Buka detail"}
          >
                    <svg
              className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bagian Konten Detail Tersembunyi (Accordion) */}
      {isExpanded && (
        <div className="mt-5 pt-4 border-t border-[#F3D1BD]/30 space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Alamat Lengkap */}
            <div className="space-y-1">
              <span className="text-[#7A6E65] font-medium block">Alamat lengkap</span>
              <p className="text-[#231A14] font-semibold">{cattery.fullAddress}</p>
            </div>

            {/* Ras Kucing yang Dimiliki */}
            <div className="space-y-1">
              <span className="text-[#7A6E65] font-medium block">Ras kucing yang dimiliki</span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {cattery.breeds.map((breed, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#FFF6EC] text-[#EE6B28] font-medium text-[11px] border border-[#F3D1BD]/50"
                  >
                    {breed}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tombol Aksi Bawah */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={cattery.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E9E2DC] hover:border-[#EE6B28] text-xs font-semibold text-[#4A3D34] hover:text-[#EE6B28] bg-white transition"
            >
              <svg className="w-4 h-4 text-[#EE6B28]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Buka di Google Maps
            </a>

            {/* Tombol Cek WhatsApp */}
            <a
              href={`https://wa.me/${cleanWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold text-emerald-600 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 1117 0z" />
              </svg>
              Cek WhatsApp {cattery.whatsapp}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}