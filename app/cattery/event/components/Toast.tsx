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
  title = "Data kucing terkirim.",
  message = "Auto-fill dari My Cats · 2 kucing terdaftar.",
  duration = 4000,
  variant = "outlined",
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

  // Varian 2: Outlined Green (Sesuai gambar Data Kucing Terkirim)
  if (variant === "outlined") {
    return (
      <div className="relative flex items-center gap-3 bg-white rounded-2xl border border-[#15803D] px-4 py-3 shadow-md overflow-hidden max-w-md animate-fadeIn">
        {/* Simple Checkmark Icon */}
        <div className="text-[#15803D] shrink-0">
          <svg
            className="w-4 h-4"
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

        {/* Text Content */}
        <div className="flex-1 space-y-0.5">
          <h4 className="text-sm font-bold text-[#1A1513] leading-tight">
            {title}
          </h4>
          <p className="text-xs text-[#7E7267] leading-tight">{message}</p>
        </div>

        {/* Auto-close Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EAF6ED]">
          <div
            className="h-full bg-[#15803D] transition-all ease-linear duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  // Varian 1: Left Border Accent (Sesuai gambar Pembayaran)
  return (
    <div className="relative flex items-start gap-3 bg-white rounded-xl border border-[#EEDFD5] border-l-[5px] border-l-[#15803D] p-3.5 pr-4 shadow-lg overflow-hidden max-w-md animate-fadeIn">
      {/* Circle Icon Badge */}
      <div className="w-6 h-6 rounded-full bg-[#EAF6ED] flex items-center justify-center shrink-0 text-[#15803D] mt-0.5">
        <svg
          className="w-3.5 h-3.5"
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

      {/* Text Content */}
      <div className="flex-1 pr-2 space-y-0.5">
        <h4 className="text-sm font-bold text-[#1A1513] leading-snug">
          {title}
        </h4>
        <p className="text-xs text-[#574D45] leading-relaxed">{message}</p>
      </div>

      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="text-[#8C8074] hover:text-[#1A1513] transition-colors p-0.5 cursor-pointer -mt-0.5"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Auto-close Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#EAF6ED]">
        <div
          className="h-full bg-[#15803D] transition-all ease-linear duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}