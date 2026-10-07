"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardIcon from "@/components/anggota/DashboardIcon";

interface CatteryDetailDesktopProps {
  cattery: {
    id: number;
    name: string;
    status: string;
    region: string;
    breeds: string[];
    score: number;
    whatsapp: string;
    address: string;
  };
  ownerName: string;
  regNo: string;
  cats: { name: string; breed: string; code: string }[];
  events: {
    title: string;
    date: string;
    badge: string;
    badgeColor: string;
  }[];
}

const catteryPhotos = [
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80",
];

const catPhotos = [
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=800&q=80",
];

export default function CatteryDetailDesktop({
  cattery,
  ownerName,
  regNo,
  cats,
  events,
}: CatteryDetailDesktopProps) {
  const [activePhoto, setActivePhoto] = useState(0);

  const nextPhoto = () => {
    setActivePhoto((prev) =>
      prev === catteryPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setActivePhoto((prev) =>
      prev === 0 ? catteryPhotos.length - 1 : prev - 1
    );
  };

  return (
    <div className="hidden w-full space-y-6 sm:block">
      {/* Header Title & Back Link */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1513]">
          Detail Cattery
        </h1>

        <Link
          href="/anggota/direktori"
          className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-[#F05A1B] hover:underline"
        >
          &lt; Kembali ke direktori
        </Link>
      </div>

      {/* Main Card Detail Cattery */}
      <div className="overflow-hidden rounded-2xl border border-[#EEDFD5] bg-white shadow-xs">
        {/* Cattery Photo Gallery */}
        <div className="relative h-[340px] w-full overflow-hidden bg-[#FFF2E8]">
          <img
            src={catteryPhotos[activePhoto]}
            alt={`${cattery.name} foto ${activePhoto + 1}`}
            className="h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

          {/* Status */}
          <span className="absolute left-5 top-5 rounded-full bg-[#EAF6ED] px-3 py-1.5 text-xs font-semibold text-[#28844B] shadow-sm">
            {cattery.status}
          </span>

          {/* Photo Counter */}
          <div className="absolute right-5 top-5 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm">
            {activePhoto + 1}/{catteryPhotos.length}
          </div>

          {/* Previous Button */}
          {catteryPhotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevPhoto}
                aria-label="Foto sebelumnya"
                className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#2D2825] shadow-md transition hover:bg-white"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="M15 18l-6-6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={nextPhoto}
                aria-label="Foto berikutnya"
                className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#2D2825] shadow-md transition hover:bg-white"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {catteryPhotos.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActivePhoto(index)}
                aria-label={`Lihat foto ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  index === activePhoto
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6 p-6">
          {/* Header Profile Info */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF2E8] text-sm font-bold text-[#F05A1B]">
                DA
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1A1513]">
                  {cattery.name}
                </h2>

                <p className="text-xs text-[#7E7267]">
                  Pemilik: {ownerName}
                </p>
              </div>
            </div>

            <span className="shrink-0 rounded-full bg-[#EAF6ED] px-3 py-1 text-xs font-semibold text-[#28844B]">
              {cattery.status}
            </span>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-[#EEDFD5] bg-[#FAF7F5] p-4">
              <p className="text-[11px] font-medium text-[#8C8074]">
                Skor cattery
              </p>

              <p className="mt-1 text-2xl font-black text-[#F05A1B]">
                {cattery.score}
              </p>

              <p className="mt-1 text-[10px] text-[#A09387]">
                Diberikan admin ICA · read-only
              </p>
            </div>

            <div className="rounded-xl border border-[#EEDFD5] bg-[#FAF7F5] p-4">
              <p className="text-[11px] font-medium text-[#8C8074]">
                Wilayah
              </p>

              <p className="mt-1 text-base font-bold text-[#1A1513]">
                {cattery.region}
              </p>

              <p className="mt-1 text-[10px] text-[#A09387]">
                {regNo}
              </p>
            </div>

            <div className="rounded-xl border border-[#EEDFD5] bg-[#FAF7F5] p-4">
              <p className="text-[11px] font-medium text-[#8C8074]">
                Jumlah kucing terdaftar
              </p>

              <p className="mt-1 text-base font-bold text-[#1A1513]">
                14 kucing
              </p>

              <p className="mt-1 text-[10px] text-[#A09387]">
                Data profil cattery
              </p>
            </div>
          </div>

          {/* Breeds Section */}
          <div>
            <p className="mb-2 text-xs font-semibold text-[#7E7267]">
              Ras kucing yang dimiliki
            </p>

            <div className="flex flex-wrap gap-2">
              {cattery.breeds.map((b) => (
                <span
                  key={b}
                  className="rounded-lg border border-[#FCE3D2] bg-[#FFF2E8] px-3 py-1 text-xs font-semibold text-[#F05A1B]"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-[#7E7267]">
                Alamat
              </p>

              <p className="mt-1 text-xs font-medium text-[#1A1513]">
                {cattery.address}
              </p>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                cattery.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#EEDFD5] bg-white px-4 py-2 text-xs font-semibold text-[#2D2825] transition hover:bg-[#FAF7F5]"
            >
              <DashboardIcon name="pin" size={14} />
              Buka di Google Maps
            </a>
          </div>

          {/* Actions Bar */}
          <div className="flex items-center gap-3 border-t border-[#EEDFD5] pt-2">
            <a
              href={`https://wa.me/${cattery.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#219653] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2e9649]"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="shrink-0 text-white"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.82 11.82 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L.05 24l6.28-1.65a11.9 11.9 0 0 0 5.72 1.46h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.43-8.43ZM12.06 21.83h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.73.98.99-3.64-.23-.37a9.84 9.84 0 0 1-1.51-5.3c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.91 7.02c0 5.47-4.45 9.91-9.94 9.91Zm5.44-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
              </svg>

              <span className="text-white">Hubungi via WhatsApp</span>
            </a>

            <Link
              href="/anggota/direktori"
              className="inline-flex items-center justify-center rounded-full bg-[#F4F1EC] px-5 py-2.5 text-xs font-semibold text-[#2D2825] transition hover:bg-[#EAE5DF]"
            >
              Cattery lain
            </Link>
          </div>
        </div>
      </div>

      {/* Section: Kucing di Cattery Ini */}
      <div className="space-y-4 rounded-2xl border border-[#EEDFD5] bg-white p-6 shadow-xs">
        <h3 className="text-base font-bold text-[#1A1513]">
          Kucing di cattery ini
        </h3>

        <div className="grid grid-cols-3 gap-4">
          {cats.map((cat, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl border border-[#EEDFD5] bg-[#FAF7F5]"
            >
              <div className="h-[180px] w-full overflow-hidden bg-[#F2ECE6]">
                <img
                  src={catPhotos[idx % catPhotos.length]}
                  alt={cat.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-3">
                <p className="text-xs font-bold text-[#1A1513]">
                  {cat.name}
                </p>

                <p className="mt-0.5 text-[11px] text-[#7E7267]">
                  {cat.breed} · {cat.code}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Riwayat Event */}
      <div className="space-y-3 rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1A1513]">
            Riwayat event
          </h3>

          <span className="text-[9px] text-[#A09387]">
            Diisi admin ICA · read-only
          </span>
        </div>

        <p className="text-[11px] text-[#7E7267]">
          Keikutsertaan cattery ini pada event resmi ICA.
        </p>

        <div className="space-y-2">
          {events.map((ev, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 rounded-lg border border-[#EEDFD5] bg-white px-3 py-2.5"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                {/* Tanggal di kiri */}
                <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-md border border-[#FCE3D2] bg-[#FFF2E8]">
                  <span className="text-[8px] font-medium uppercase text-[#A09387]">
                    {ev.date.split(" ")[1] || "DATE"}
                  </span>

                  <span className="text-[10px] font-extrabold text-[#F05A1B]">
                    {ev.date.split(" ")[0] || "-"}
                  </span>
                </div>

                <div className="min-w-0">
                  <h4 className="truncate text-[11px] font-bold text-[#1A1513]">
                    {ev.title}
                  </h4>

                  <p className="mt-0.5 truncate text-[9px] text-[#8C8074]">
                    {ev.date}
                  </p>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${ev.badgeColor}`}
              >
                {ev.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}