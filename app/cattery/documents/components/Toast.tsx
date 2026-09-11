"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  submessage?: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  submessage,
  onClose,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-5 right-5 z-50 flex w-80 items-start gap-3 overflow-hidden rounded-xl border border-[var(--color-ink-100,#eadecd)] bg-white p-3 shadow-lg transition-all animate-in fade-in slide-in-from-top-2">
      {/* Garis Aksen Vertikal di Sebelah Kiri */}
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-emerald-600 rounded-l-xl" />

      {/* Icon Lingkaran Hijau Kecil */}
      <div className="ml-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 font-bold">
        <svg
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Konten Teks */}
      <div className="flex-1 min-w-0 pr-1">
        <p className="text-[11px] font-bold text-[var(--color-ink-900,#1a1513)]">
          {message}
        </p>
        {submessage && (
          <p className="mt-0.5 text-[10px] leading-snug text-[var(--color-ink-500,#7e7267)]">
            {submessage}
          </p>
        )}
      </div>

      {/* Tombol Tutup (X) */}
      <button
        onClick={onClose}
        className="text-[var(--color-ink-400,#8c8074)] hover:text-[var(--color-ink-700,#544940)] text-xs font-bold transition px-0.5"
        aria-label="Tutup"
      >
        ×
      </button>

      {/* Animated Progress Bar di Bagian Bawah */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-100">
        <div
          className="h-full bg-emerald-600"
          style={{
            animation: `shrinkWidth ${duration}ms linear forwards`,
          }}
        />
      </div>

      {/* Keyframes Animasi Progress Bar */}
      <style jsx>{`
        @keyframes shrinkWidth {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}