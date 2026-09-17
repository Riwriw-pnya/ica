"use client";

import React, { useState } from "react";

export interface BadgeItem {
  id: string;
  code: string; // Misal: "DC", "DG"
  title: string;
  subtitle: string;
  badgeCount: number;
}

const mockBadges: BadgeItem[] = [
  {
    id: "1",
    code: "DC",
    title: "Diklat Cattery",
    subtitle: "Batch 2 · Batch 3",
    badgeCount: 2,
  },
  {
    id: "2",
    code: "DG",
    title: "Diklat Grooming",
    subtitle: "Level dasar 2025",
    badgeCount: 1,
  },
];

export default function IcaBadgeCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalBadges = mockBadges.reduce((acc, b) => acc + b.badgeCount, 0);

  return (
    <>
      {/* Card Utama */}
      <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#1A1513]">Badge dari diklat ICA</h2>
            <p className="mt-0.5 text-xs text-[#8C8074]">
              Badge diberikan otomatis setelah kehadiran diklat diverifikasi admin ICA, dan bersifat akumulatif.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#8C8074]">
            {totalBadges} badge terkumpul
          </span>
        </div>

        {/* List Items Grid */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {mockBadges.map((item) => (
            <div
              key={item.id}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-between rounded-xl border border-[#EEDFD5] bg-white p-3.5 transition"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF4EB] border border-[var(--color-rose-200)] text-xs font-bold text-[var(--color-brand-orange-700)]/80">
                  {item.code}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1A1513]">{item.title}</h3>
                  <p className="text-[11px] text-[#8C8074]">{item.subtitle}</p>
                </div>
              </div>

              <span className="rounded-full bg-[#EAF6ED] px-2.5 py-1 text-[11px] font-semibold text-[#28844B]">
                {item.badgeCount} badge
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}