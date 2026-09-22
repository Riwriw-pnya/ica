"use client";

import { useState } from "react";
import CreateArticleModal from "./CreateArticleModal";

interface NewsSectionHeaderProps {
  onCreateNew?: () => void;
}

export default function NewsSectionHeader({ onCreateNew }: NewsSectionHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (onCreateNew) {
      onCreateNew();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white border border-[#EFE9E1] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-[#231A14]">News & artikel</h2>
          <p className="text-xs text-[#8C8078] mt-1">
            Konten yang diterbitkan di sini tampil di halaman News dan di Member Portal.
          </p>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)] active:translate-y-0 active:shadow-xs"
        >
          {/* SVG Plus Icon sejajar presisi di tengah */}
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="leading-none">Tulis artikel</span>
        </button>
      </div>

      {/* Hanya tampilkan modal lokal jika tidak dikontrol oleh parent */}
      {!onCreateNew && (
        <CreateArticleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}