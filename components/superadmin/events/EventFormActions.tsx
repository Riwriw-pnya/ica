"use client";

import React from "react";
import Link from "next/link";

export default function EventFormActions() {
  return (
    <div className="flex items-center justify-end gap-3 pt-4">
      <button
        type="button"
        className="px-6 py-2.5 rounded-xl border border-[#EFE9E1] bg-white text-[#7A6E65] hover:bg-[#FAF8F5] text-xs font-bold transition cursor-pointer"
      >
        Simpan sebagai draft
      </button>
      <Link
        href="/superadmin/events/detail" 
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white text-xs font-bold shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] transition cursor-pointer"
      >
        <span>Lanjut ke review</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}