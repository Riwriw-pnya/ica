"use client";

import React, { useState, useEffect } from "react";

export type ToastVariant = "payment" | "outlined";
export type ToastTone = "success" | "error";

interface ToastProps {
  title: string;
  message: string;
  duration?: number;
  variant?: ToastVariant;
  tone?: ToastTone;
  onClose?: () => void;
}

const TONE_COLORS = {
  success: { main: "#209f4e", bg: "#EAF6ED", border: "#1ea34f" },
  error: { main: "var(--color-danger)", bg: "var(--color-danger-bg)", border: "var(--color-danger)" },
};

export default function Toast({
  title,
  message,
  duration = 4000,
  tone = "success",
  onClose,
}: ToastProps) {
  const [progress, setProgress] = useState(100);
  const colors = TONE_COLORS[tone];

  useEffect(() => {
    const intervalTime = 20;
    const step = (intervalTime / duration) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.max(prev - step, 0));
    }, intervalTime);

    const closeTimer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      className="relative w-[300px] overflow-hidden rounded-md border-l-4 bg-white py-3 pl-4 pr-8 shadow-md animate-in fade-in slide-in-from-top-2"
      style={{ borderLeftColor: colors.border }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-2 top-2 cursor-pointer rounded-full p-1 text-[#8C8074] transition-colors hover:bg-black/5 hover:text-[#1A1513]"
        aria-label="Tutup"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-start gap-2.5">
        <span
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.bg, color: colors.main }}
        >
          {tone === "success" ? (
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <span className="text-[10px] font-bold leading-none">!</span>
          )}
        </span>

        <div className="min-w-0 flex-1 space-y-0.5 pt-0.5">
          <h4 className="text-[12px] font-bold leading-snug text-[#1A1513]">{title}</h4>
          <p className="text-[11px] leading-snug text-[#7E7267]">{message}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: colors.bg }}>
        <div
          className="h-full transition-all duration-75 ease-linear"
          style={{ width: `${progress}%`, backgroundColor: colors.main }}
        />
      </div>
    </div>
  );
}