"use client";

import React from "react";
import Link from "next/link";

interface EventFormHeaderProps {
  isEditMode?: boolean;
  onBack?: () => void;
}

export default function EventFormHeader({ isEditMode, onBack }: EventFormHeaderProps) {
  return (
    <div className="space-y-3">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EE6B28] hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke agenda event
        </button>
      ) : (
        <Link
          href="/superadmin/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EE6B28] hover:underline cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke agenda event
        </Link>
      )}
      <div>
        <h1 className="text-xl font-bold text-[#231A14]">
          {isEditMode ? "Atur Kuota & Timer Event" : "Events"}
        </h1>
        <p className="text-xs text-[#8C8078] mt-0.5">
          {isEditMode
            ? "Kelola kuota pendaftaran, timer timeout, dan parameter event."
            : "Agenda cat show, kuota war ticketing, dan pendaftaran peserta"}
        </p>
      </div>
    </div>
  );
}