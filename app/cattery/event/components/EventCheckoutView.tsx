"use client";

import React, { useState, useEffect } from "react";

interface EventCheckoutViewProps {
  onBack: () => void;
  onNext: () => void;
}

export default function EventCheckoutView({
  onBack,
  onNext,
}: EventCheckoutViewProps) {
  const [secondsLeft, setSecondsLeft] = useState(597); // Default: 09:57

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSec % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Tampilan ketika Sesi Checkout Berakhir (Waktu = 0)
  if (secondsLeft === 0) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1A1513]">
          Checkout Ticket
        </h1>

        {/* Back Link */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#EE6B28] hover:underline cursor-pointer"
        >
          &lt; Kembali ke Event
        </button>

        {/* Card Sesi Checkout Berakhir */}
        <div className="bg-white rounded-2xl border border-[#EEDFD5] p-8 sm:p-12 text-center shadow-xs space-y-4 max-w-2xl mx-auto my-6">
          {/* Clock Icon Circle */}
          <div className="w-12 h-12 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto shrink-0">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-lg sm:text-xl font-bold text-[#1A1513]">
              Sesi checkout berakhir
            </h2>
            <p className="text-xs sm:text-sm text-[#7E7267] max-w-md mx-auto leading-relaxed">
              Batas waktu 10:00 terlampaui, jadi slot dilepas kembali ke kuota
              kategori Cattery. Pendaftaran harus diulang dari halaman Event.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onBack}
              className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-7 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 transition-all"
            >
              Coba lagi dari Event
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan Normal Checkout
  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-xl sm:text-2xl font-bold text-[#1A1513]">
        Checkout Ticket
      </h1>

      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-xs font-semibold text-[#EE6B28] hover:underline cursor-pointer"
      >
        &lt; Kembali ke Event
      </button>

      {/* Countdown Timer Card */}
      <div className="bg-white rounded-2xl border border-[#EEDFD5] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="block text-[10px] font-bold tracking-wider uppercase text-[#8C8074]">
              SISA WAKTU PEMBAYARAN
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-[#F05A1B] font-mono leading-tight">
              {formatTime(secondsLeft)}
            </span>
          </div>
          <p className="text-xs text-[#7E7267] max-w-xs leading-relaxed sm:text-right">
            Selesaikan pembayaran dalam 10:00 atau slot dilepas ke peserta lain.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#F3EAE1] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#F05A1B] h-full transition-all duration-1000"
            style={{ width: `${(secondsLeft / 600) * 100}%` }}
          />
        </div>
      </div>

      {/* Checkout Details Card */}
      <div className="bg-white rounded-2xl border border-[#EEDFD5] p-5 sm:p-6 shadow-xs space-y-6">
        <h2 className="text-base sm:text-lg font-bold text-[#1A1513]">
          ICA Cat Show Bandung 2026
        </h2>

        <div className="space-y-3.5 text-xs">
          <div className="flex justify-between items-center py-1">
            <span className="text-[#8C8074]">Tanggal</span>
            <span className="font-semibold text-[#1A1513]">18–19 Okt 2026</span>
          </div>
          <hr className="border-[#F5EBE2]" />

          <div className="flex justify-between items-center py-1">
            <span className="text-[#8C8074]">Lokasi</span>
            <span className="font-semibold text-[#1A1513]">
              Trans Convention Center, Bandung
            </span>
          </div>
          <hr className="border-[#F5EBE2]" />

          <div className="flex justify-between items-center py-1">
            <span className="text-[#8C8074]">Kategori kuota</span>
            <span className="font-semibold text-[#1A1513]">
              Cattery · Rumah Hana Cattery
            </span>
          </div>
          <hr className="border-[#F5EBE2]" />

          <div className="flex justify-between items-center py-1">
            <span className="text-[#8C8074]">Sisa slot kategori ini</span>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#FFF4E5] text-[#C26D0A]">
              2 slot tersisa
            </span>
          </div>
          <hr className="border-[#F5EBE2]" />

          <div className="flex justify-between items-center py-1 pt-1">
            <span className="font-bold text-sm text-[#1A1513]">Total</span>
            <span className="font-extrabold text-base text-[#F05A1B]">
              Rp 150.000
            </span>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-3.5 rounded-xl bg-[#FFF8F5] border border-[#FCE3D2] text-xs text-[#8C8074] leading-relaxed">
          Data kucing yang diikutkan diisi setelah pembayaran berhasil, jadi slot
          Anda tidak tertahan lebih lama.
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onNext}
            className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5"
          >
            Lanjut ke pembayaran
          </button>

          {/* Tombol Simulasi Tetap "Simulasi: waktu hampir habis" (Mengubah ke 15 Detik) */}
          <button
            type="button"
            onClick={() => setSecondsLeft(15)}
            className="cursor-pointer rounded-full border border-[#EEDFD5] bg-white px-5 py-2.5 text-xs font-semibold text-[#574D45] hover:bg-[#FAF7F5] active:translate-y-0.5"
          >
            Simulasi: waktu hampir habis
          </button>
        </div>
      </div>
    </div>
  );
}