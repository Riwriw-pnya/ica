"use client";

import React, { useEffect } from "react";

interface ToastMobileProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number; // Default 3000ms (3 detik)
}

export default function ToastMobile({
  message,
  isOpen,
  onClose,
  duration = 3000,
}: ToastMobileProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Keyframe Animasi Mumble / Slide Down dari atas ke bawah */}
      <style jsx>{`
        @keyframes toastSlideDown {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          60% {
            transform: translateY(10px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-toast-down {
          animation: toastSlideDown 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      {/* Container Toast di Atas Layar */}
      <div className="fixed top-4 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
        <div className="max-w-md w-full bg-[#1F1B18] text-white px-4 py-3 rounded-2xl shadow-xl border border-white/10 flex items-center justify-between pointer-events-auto animate-toast-down">
          <div className="flex items-center gap-2.5">
            {/* Icon Check / Sukses */}
            <div className="w-6 h-6 rounded-full bg-[#D96B27] flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs font-semibold">{message}</span>
          </div>

          {/* Tombol Close silang */}
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 ml-2 rounded-full cursor-pointer transition-colors"
            aria-label="Tutup"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}