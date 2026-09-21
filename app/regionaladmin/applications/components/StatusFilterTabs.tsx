"use client";

import type { ApplicationStatus } from "@/types/regionalAdmin";

interface StatusFilterTabsProps {
  counts: Record<"Semua" | ApplicationStatus, number>;
  active: string;
  onChange: (value: string) => void;
}

const TABS: ("Semua" | ApplicationStatus)[] = ["Semua", "Baru", "Sedang direview", "Perlu revisi", "Disetujui", "Ditolak"];

export default function StatusFilterTabs({ counts, active, onChange }: StatusFilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`rounded-full px-4 py-1.5 text-[12px] font-semibold transition ${
              isActive
                ? "border border-[var(--color-brand-orange-500)] bg-[var(--color-brand-orange-50)] text-[var(--color-brand-orange-700)]"
                : "border border-[var(--color-ink-100)] bg-white text-[var(--color-ink-700)] hover:bg-gray-50"
            }`}
          >
            {tab} ({counts[tab]})
          </button>
        );
      })}
    </div>
  );
}