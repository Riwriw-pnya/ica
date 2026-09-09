"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  submessage?: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, submessage, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-6 right-6 z-50 flex w-80 items-start gap-3 rounded-xl border border-emerald-200 bg-white p-4 shadow-lg transition-all animate-in fade-in slide-in-from-top-2">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-[12px] font-semibold text-[var(--color-ink-900)]">{message}</p>
        {submessage && (
          <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--color-ink-400)]">{submessage}</p>
        )}
      </div>
      <button onClick={onClose} className="text-[var(--color-ink-400)] hover:text-[var(--color-ink-700)]">
        ×
      </button>
      <div className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-emerald-500" />
    </div>
  );
}