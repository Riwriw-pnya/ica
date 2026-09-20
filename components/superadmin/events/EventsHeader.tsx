"use client";

import React from "react";
import Link from "next/link";

export default function EventsHeader() {
  return (
    <div className="bg-white border border-[#EFE9E1] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
      <div>
        <h1 className="text-base font-bold text-[#231A14]">Agenda event & war ticketing</h1>
        <p className="text-xs text-[#8C8078] mt-0.5 leading-relaxed">
          Kuota tiket dibagi per kategori peserta. Slot ditahan sementara saat checkout dan dilepas otomatis kalau pembayaran melewati batas waktu.
        </p>
      </div>
      <Link
        href="/superadmin/events/create"
        className="inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:from-[#EE6B28] hover:to-[#C8601D]"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span>Buat event</span>
      </Link>
    </div>
  );
}