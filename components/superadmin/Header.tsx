"use client";

import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-[#EFE9E1] px-6 flex items-center justify-between relative">
      <div className="text-xs text-[#8C8078]">
        Base Mating Report ICA Cattery · <span className="text-[#A0948C]">Content is user-generated and unverified.</span>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#FAF8F5] transition cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#FFE3D1] text-[#EE6B28] flex items-center justify-center font-bold text-xs">
            RN
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-[#231A14]">Rina Nurhayati</div>
            <div className="text-[10px] text-[#8C8078]">Super Admin Pusat</div>
          </div>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-12 w-48 bg-white border border-[#EFE9E1] rounded-2xl shadow-lg p-2 text-xs z-50">
            <div className="p-2 border-b border-[#F2EFE9]">
              <p className="font-bold text-[#231A14]">Rina Nurhayati</p>
              <p className="text-[10px] text-[#8C8078]">rina@ica.or.id</p>
            </div>
            <button className="w-full text-left p-2 hover:bg-[#FAF8F5] rounded-lg text-[#7A6E65] mt-1 transition">
              Pengaturan Profil
            </button>
            <button className="w-full text-left p-2 hover:bg-rose-50 rounded-lg text-rose-600 font-semibold transition">
              Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}