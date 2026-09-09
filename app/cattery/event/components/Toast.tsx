"use client";

import React, { useState, useEffect } from "react";

export type ToastVariant = "payment" | "outlined";

interface ToastProps {
  title?: string;
  message?: string;
  duration?: number;
  variant?: ToastVariant;
  onClose?: () => void;
}

export default function Toast({
  title = "Sertifikat diunduh.",
  message = "PDF hasil generate otomatis — placeholder prototype.",
  duration = 4000,
  variant = "payment",
  onClose,
}: ToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const intervalTime = 20;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= step) {
          clearInterval(timer);
          if (onClose) onClose();
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [duration, onClose]);

  return (
    <div className="relative flex items-start gap-3 bg-white rounded-xl border border-[var(--color-ink-100,#eadecd)] border-l-[5px] border-l-[#15803D] p-3 pr-3.5 shadow-lg overflow-hidden max-w-sm w-full animate-fadeIn">
      {/* Circle Icon Badge di Kiri (Lebih Kecil) */}
      <div className="w-6 h-6 rounded-full bg-[#EAF6ED] flex items-center justify-center shrink-0 text-[#15803D] mt-0.5">
        <svg
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>

      {/* Text Content (Title & Message Lebih Ringkas) */}
      <div className="flex-1 min-w-0 pr-2 space-y-0.5">
        <h4 className="text-xs font-bold text-[var(--color-ink-900,#1a1513)] leading-tight">
          {title}
        </h4>
        <p className="text-[11px] text-[var(--color-ink-500,#7e7267)] leading-relaxed">
          {message}
        </p>
      </div>

      {/* Close Button di Kanan Atas */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-[var(--color-ink-400,#8c8074)] hover:text-[var(--color-ink-900,#1a1513)] transition-colors p-0.5 shrink-0 cursor-pointer -mt-0.5"
          aria-label="Tutup"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* Auto-close Progress Bar di Bagian Bawah */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EAF6ED]">
        <div
          className="h-full bg-[#15803D] transition-all ease-linear duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}