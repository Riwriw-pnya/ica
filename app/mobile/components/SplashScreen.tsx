"use client";

import React from "react";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-gradient-to-b from-[#FFB074] via-[#F06A2B] to-[#D95D1E] text-white p-6 overflow-hidden select-none">
      
      {/* CSS Animasi */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shine {
          background: linear-gradient(
            110deg,
            #d95d1e 30%,
            #ffffff 50%,
            #d95d1e 70%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 2.5s infinite linear;
        }

        @keyframes floatPaw {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.8);
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
            transform: translateY(-25px) scale(1.1);
          }
        }
        .animate-paw-1 {
          animation: floatPaw 2s infinite ease-out 0s;
        }
        .animate-paw-2 {
          animation: floatPaw 2.2s infinite ease-out 0.6s;
        }
        .animate-paw-3 {
          animation: floatPaw 1.8s infinite ease-out 1.2s;
        }

        /* ANIMASI LOADING BAR BERJALAN */
        @keyframes loadingProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-loading {
          animation: loadingProgress 2.5s ease-in-out forwards;
        }
      `}</style>

      {/* Ornamen Lingkaran Transparan Atas */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />

      {/* Area Tengah: Logo & Teks */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10">
        <div className="w-24 h-24 rounded-[28px] bg-[#FFF8F2] shadow-xl flex items-center justify-center mb-6">
          <span className="font-extrabold text-3xl tracking-tight animate-shine">
            ICA
          </span>
        </div>

        <h1 className="font-bold text-xl leading-tight text-white mb-2">
          Indonesian Cat<br />Association
        </h1>

        <p className="text-xs text-white/90 leading-relaxed max-w-[240px]">
          Rumahnya pencinta kucing se-Indonesia. Satu aplikasi untuk kucing, cattery, dan komunitasnya.
        </p>
      </div>

      {/* Area Bawah: Floating Paws + Loading Bar */}
      <div className="relative z-10 pb-8 flex flex-col items-center w-full max-w-[280px] mx-auto">
        
        {/* Floating Paw Icons */}
        <div className="w-full h-8 relative mb-1 pointer-events-none">
          <span className="absolute left-6 bottom-0 text-white/50 text-xs animate-paw-1">
            🐾
          </span>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 text-white/50 text-sm animate-paw-2">
            🐾
          </span>
          <span className="absolute right-8 bottom-0 text-white/50 text-xs animate-paw-3">
            🐾
          </span>
        </div>

        {/* Loading Bar Track & Progress */}
        <div className="w-full bg-black/15 h-1.5 rounded-full overflow-hidden mb-4">
          <div className="bg-white h-full rounded-full animate-loading" />
        </div>

        <p className="text-[11px] font-medium text-white/90 mb-1">
          Menyiapkan kandang digital Anda...
        </p>

        <span className="text-[9px] font-bold tracking-wider text-white/70 uppercase">
          FULL MEMBER FIFE SEJAK 2007
        </span>
      </div>

      {/* Ornamen Lingkaran Transparan Bawah */}
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-black/5 pointer-events-none" />
    </div>
  );
}