"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DashboardIcon from "../../../../components/anggota/DashboardIcon";
import type { CatteryItem } from "@/types/anggota";

interface CatteryCardMobileProps {
  item: CatteryItem;
}

export default function CatteryCardMobile({ item }: CatteryCardMobileProps) {
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);
  
  // State untuk gesture drag ke bawah
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef<number>(0);

  const formattedPhone = item.whatsapp
    ? item.whatsapp.replace(/[^0-9]/g, "").replace(/^0/, "62")
    : "";

  const defaultMessage = encodeURIComponent(
    `Halo ${item.name}, saya mendapatkan kontak Anda dari direktori member ICA.`
  );

  const waUrl = `https://wa.me/${formattedPhone}?text=${defaultMessage}`;

  const handleOpenModal = () => {
    setIsWaModalOpen(true);
    setDragY(0);
    setTimeout(() => setIsAnimate(true), 10);
  };

  const handleCloseModal = () => {
    setIsAnimate(false);
    setTimeout(() => {
      setIsWaModalOpen(false);
      setDragY(0);
    }, 300);
  };

  // Event handler gesture geser (drag) ke bawah
  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startYRef.current;
    
    // Hanya izinkan drag ke arah bawah
    if (deltaY > 0) {
      setDragY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Jika digeser ke bawah lebih dari 80px, tutup sheet
    if (dragY > 80) {
      handleCloseModal();
    } else {
      // Kembali ke posisi semula jika tidak cukup jauh
      setDragY(0);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isWaModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isWaModalOpen]);

  return (
    <>
      <div className="sm:hidden overflow-hidden rounded-2xl border border-[#EEDFD5] bg-white shadow-xs">
        {/* Info Cattery */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF2E8] text-[#D95D1E]">
                <DashboardIcon name="home" size={22} />
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <h3 className="truncate text-sm font-bold text-[#1A1513]">
                  {item.name}
                </h3>
                <p className="mt-0.5 truncate text-xs text-[#8C8074]">
                  {item.region} · {item.breeds.join(", ")}
                </p>

                <div className="mt-2.5">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      item.status === "Terverifikasi"
                        ? "bg-[#EAF6ED] text-[#28844B]"
                        : "bg-[#FFF6EE] text-[#D95D1E]"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0 pt-0.5">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#8C8074]">
                SKOR
              </p>
              <p className="text-lg font-black text-[#D95D1E] leading-tight mt-0.5">
                {item.score}
              </p>
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="grid grid-cols-2 border-t border-[#EEDFD5] text-xs font-semibold">
          <button
            type="button"
            onClick={handleOpenModal}
            className="flex items-center justify-center gap-2 py-3 text-[#117B34] border-r border-[#EEDFD5] hover:bg-[#FAF7F5] transition"
          >
            <DashboardIcon name="chat" size={16} />
            WhatsApp
          </button>

          <Link
            href={item.href || `/anggota/direktori/${item.id}`}
            className="flex items-center justify-center gap-1 py-3 text-[#D95D1E] hover:bg-[#FAF7F5] transition"
          >
            Detail <span className="text-[11px]">&gt;</span>
          </Link>
        </div>
      </div>

      {/* MODAL BUKA WHATSAPP DENGAN GESTURE DRAG */}
      {isWaModalOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end sm:hidden">
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
              isAnimate ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleCloseModal}
          />

          {/* Sheet Container */}
          <div
            style={{
              transform: isAnimate
                ? `translateY(${dragY}px)`
                : "translateY(100%)",
              transition: isDragging ? "none" : "transform 0.3s ease-out",
            }}
            className="relative z-10 flex w-full flex-col rounded-t-3xl bg-white p-5 shadow-2xl touch-none"
          >
            {/* Grab Handle Icon "-" (Area Drag/Geser) */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={handleCloseModal}
              className="w-full py-2 -mt-2 flex justify-center items-center shrink-0 cursor-grab active:cursor-grabbing mb-1"
            >
              <div className="h-1.5 w-12 rounded-full bg-[#E2D7CC]" />
            </div>

            {/* Judul & Deskripsi */}
            <h3 className="text-base font-bold text-[#1A1513]">Buka WhatsApp</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#7E7267]">
              Aplikasi membuka chat WhatsApp ke{" "}
              <span className="font-semibold text-[#1A1513]">{item.name}</span> ·{" "}
              <span className="font-semibold text-[#1A1513]">{item.whatsapp}</span>{" "}
              dengan pesan perkenalan dari member ICA sudah terisi.
            </p>

            {/* Tombol Aksi */}
            <div className="mt-6 space-y-2.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCloseModal}
                className="flex w-full items-center justify-center rounded-2xl bg-[#25D366] py-3 text-xs font-bold text-white shadow-sm active:scale-98 transition-transform"
              >
                Buka WhatsApp
              </a>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full rounded-2xl border border-[#EEDFD5] bg-white py-3 text-xs font-semibold text-[#1A1513] active:bg-[#FAF7F5]"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}