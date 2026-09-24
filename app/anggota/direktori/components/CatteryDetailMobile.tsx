"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import DashboardIcon from "@/components/anggota/DashboardIcon";

interface CatteryDetailMobileProps {
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

export default function CatteryDetailMobile({
  cattery,
  ownerName,
  regNo,
  cats,
  events,
}: CatteryDetailMobileProps) {
  const [animateIn, setAnimateIn] = useState(false);
  const [activeModal, setActiveModal] = useState<"maps" | "wa" | null>(null);
  const [isRendered, setIsRendered] = useState(false); // Penanda modal dipasang di DOM
  const [isOpen, setIsOpen] = useState(false); // Penanda animasi memicu slide-up
  const [mounted, setMounted] = useState(false);

  // State & Ref untuk gesture drag-to-dismiss
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setAnimateIn(true), 20);
    return () => clearTimeout(timer);
  }, []);

  // Control siklus animasi Buka / Tutup Modal
  const handleOpenModal = (type: "maps" | "wa") => {
    setActiveModal(type);
    setIsRendered(true);
    setDragY(0);
    // Beri jeda 1 frame agar browser bisa menerapkan class CSS transition (Slide-Up)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    });
  };

  const handleCloseModal = () => {
    setIsOpen(false); // picu animasi slide-down
    setTimeout(() => {
      setIsRendered(false);
      setActiveModal(null);
      setDragY(0);
    }, 300); // Waktu animasi keluar
  };

  const formattedPhone = cattery.whatsapp
    ? cattery.whatsapp.replace(/[^0-9]/g, "").replace(/^0/, "62")
    : "";

  const defaultMessage = encodeURIComponent(
    `Halo ${cattery.name}, saya mendapatkan kontak Anda dari direktori member ICA.`
  );

  const waUrl = `https://wa.me/${formattedPhone}?text=${defaultMessage}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    cattery.address
  )}`;

  // Handler Event Touch untuk Swipe Down
  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startYRef.current;
    if (deltaY > 0) {
      setDragY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragY > 90) {
      handleCloseModal();
    } else {
      setDragY(0);
    }
  };

  // Komponen Modal Bottom Sheet yang di-portal
  const renderModal = () => {
    if (!isRendered || !mounted || !activeModal) return null;

    return createPortal(
      <div className="fixed inset-0 z-[99999] flex items-end justify-center overflow-hidden">
        {/* Backdrop Gelap dengan Transisi Fade */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleCloseModal}
        />

        {/* Sheet Box dengan Transisi Slide Up & Swipe Down */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: isDragging
              ? `translateY(${dragY}px)`
              : isOpen
              ? `translateY(${dragY}px)`
              : "translateY(100%)",
            transition: isDragging
              ? "none"
              : "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="relative w-full max-w-md rounded-t-[32px] bg-white p-6 shadow-2xl z-10 space-y-5 pb-10"
        >
          {/* Indikator Geser (Drag Handle) */}
          <div className="flex justify-center -mt-2">
            <div className="h-1.5 w-12 rounded-full bg-gray-300 cursor-grab active:cursor-grabbing" />
          </div>

          {/* KONTEN MODAL MAPS */}
          {activeModal === "maps" && (
            <>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">
                  Buka di Google Maps
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Alamat dikirim ke aplikasi peta perangkat: {cattery.address}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCloseModal}
                  className="flex h-13 w-full items-center justify-center rounded-full bg-[#F39C5A] text-base font-bold text-white shadow-xs active:opacity-90"
                >
                  Buka peta
                </a>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex h-13 w-full items-center justify-center rounded-full border border-gray-200 bg-white text-base font-bold text-gray-700 active:bg-gray-50"
                >
                  Batal
                </button>
              </div>
            </>
          )}

          {/* KONTEN MODAL WHATSAPP */}
          {activeModal === "wa" && (
            <>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">
                  Buka WhatsApp
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Aplikasi membuka chat WhatsApp ke {cattery.name} (
                  {cattery.whatsapp || "nomor tidak tersedia"}) dengan pesan
                  perkenalan dari member ICA sudah terisi.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCloseModal}
                  className="flex h-13 w-full items-center justify-center rounded-full bg-[#3B9E60] text-base font-bold text-white shadow-xs active:opacity-90"
                >
                  Buka WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex h-13 w-full items-center justify-center rounded-full border border-gray-200 bg-white text-base font-bold text-gray-700 active:bg-gray-50"
                >
                  Batal
                </button>
              </div>
            </>
          )}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div
      className={`block sm:hidden fixed inset-0 z-50 flex flex-col bg-[#F7F5F0] font-sans transition-all duration-300 ease-out ${
        animateIn ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
      }`}
    >
      {/* TOP HEADER */}
      <div
        className="shrink-0 flex items-center gap-3.5 bg-[#F7F5F0] px-5 pb-5 border-b border-[#EAE5DF]/60 z-20"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 36px)" }}
      >
        <Link
          href="/anggota/direktori"
          className="flex items-center text-[#E06328] active:opacity-60 p-1 -ml-1"
        >
          <svg
            className="w-6 h-6 stroke-[2.5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-bold text-[#1F1B18] leading-snug">
            {cattery.name}
          </h1>
          <p className="truncate text-xs font-medium text-[#857B72] mt-0.5">
            {cattery.region} · Skor {cattery.score}
          </p>
        </div>
      </div>

      {/* AREA KONTEN (SCROLLABLE) */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-36 space-y-4">
        {/* BANNER PLACEHOLDER */}
        <div className="flex h-44 w-full flex-col items-center justify-center rounded-3xl bg-[#FDEFE3] p-4 text-center">
          <div className="text-[#D96B27] mb-1.5">
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <p className="text-xs font-medium text-[#C8733B]">
            Foto tempat cattery belum diunggah
          </p>
        </div>

        {/* CARD PROFILE UTAMA */}
        <div className="rounded-3xl bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1F1B18]">
                {cattery.name}
              </h2>
              <p className="mt-0.5 text-xs text-[#857B72]">
                Pemilik {ownerName}
              </p>
              <div className="mt-2.5">
                <span className="inline-block rounded-md bg-[#E8F5E9] px-2.5 py-1 text-[11px] font-medium text-[#2E7D32]">
                  {cattery.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-wider text-[#9E948A]">
                SKOR
              </p>
              <p className="text-2xl font-black text-[#D96B27] leading-none mt-1">
                {cattery.score}
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-1 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-[#F4EFEA]">
              <span className="text-[#857B72]">No. registrasi</span>
              <span className="font-semibold text-[#1F1B18]">{regNo}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-[#F4EFEA]">
              <span className="text-[#857B72]">Wilayah ICA</span>
              <span className="font-semibold text-[#1F1B18]">
                {cattery.region}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-[#F4EFEA]">
              <span className="text-[#857B72]">Kucing</span>
              <span className="font-semibold text-[#1F1B18]">
                14 kucing terdaftar
              </span>
            </div>
            <div className="pt-1">
              <p className="text-[#857B72] text-[11px] mb-1">Alamat lengkap</p>
              <p className="font-normal leading-relaxed text-[#1F1B18]">
                {cattery.address}
              </p>
            </div>
          </div>
        </div>

        {/* RAS KUCING YANG DIMILIKI */}
        <div className="rounded-3xl bg-white p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-[#1F1B18]">
            Ras kucing yang dimiliki
          </h3>
          <div className="flex flex-wrap gap-2">
            {cattery.breeds.map((b) => (
              <span
                key={b}
                className="rounded-xl bg-[#FDF2E9] px-3.5 py-1.5 text-xs font-semibold text-[#D96B27]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* KUCING TERDAFTAR */}
        <div className="rounded-3xl bg-white p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-[#1F1B18]">Kucing terdaftar</h3>
          <div className="grid grid-cols-2 gap-3">
            {cats.map((cat, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl bg-[#F8F6F2]"
              >
                <div className="flex h-24 w-full items-center justify-center bg-[#EFECE6] text-[#A09387]">
                  <DashboardIcon name="home" size={20} />
                </div>
                <div className="p-3">
                  <p className="truncate text-xs font-bold text-[#1F1B18]">
                    {cat.name}
                  </p>
                  <p className="mt-0.5 truncate text-[10px] text-[#857B72]">
                    {cat.breed} · {cat.code}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIWAYAT EVENT */}
        <div className="rounded-3xl bg-white p-5 shadow-xs space-y-3">
          <div>
            <h3 className="text-sm font-bold text-[#1F1B18]">Riwayat event</h3>
            <p className="mt-0.5 text-[11px] text-[#857B72] leading-relaxed">
              Keikutsertaan cattery ini pada event resmi ICA. Hasil diisi komite
              event — read-only
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            {events.map((ev, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#F2ECE6] bg-white p-3.5 space-y-2"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F8F6F2] text-[#D96B27]">
                    <DashboardIcon name="home" size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-[#1F1B18]">
                      {ev.title}
                    </h4>
                    <p className="mt-0.5 text-[10px] text-[#857B72]">
                      {ev.date}
                    </p>
                  </div>
                </div>
                <div>
                  <span
                    className={`inline-block rounded-full px-3 py-0.5 text-[10px] font-semibold ${ev.badgeColor}`}
                  >
                    {ev.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FLOATING ACTION BAR */}
      <div className="fixed bottom-[60px] left-0 right-0 z-40 bg-white border-t border-[#EAE5DF] px-4 py-3 shadow-md">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          {/* Tombol Lokasi */}
          <button
            type="button"
            onClick={() => handleOpenModal("maps")}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#DCD5CB] bg-white text-[#1F1B18] active:bg-[#F8F6F2] transition-colors"
            aria-label="Buka Lokasi Google Maps"
          >
            <svg
              className="w-5 h-5 text-[#1F1B18]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          {/* Tombol Chat WhatsApp */}
          <button
            type="button"
            onClick={() => handleOpenModal("wa")}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#3B9E60] px-6 text-sm font-bold text-white shadow-xs active:bg-[#328752] transition-colors"
          >
            <svg
              className="w-5 h-5 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Chat WhatsApp
          </button>
        </div>
      </div>

      {/* RENDER MODAL PORTAL */}
      {renderModal()}
    </div>
  );
}