"use client";

import React from "react";

export default function EventsFooterNotice() {
  return (
    <div className="flex items-start gap-3 bg-[#F0F5FA] border border-[#D5E3F0] rounded-2xl p-4 text-[#1B365D]">
      <svg className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p className="text-xs leading-relaxed">
        Perubahan scope resmi: War Ticket System sekarang masuk scope sesuai update PRD. Dokumen lama yang menandai modul ini "di luar scope" sudah usang.
      </p>
    </div>
  );
}