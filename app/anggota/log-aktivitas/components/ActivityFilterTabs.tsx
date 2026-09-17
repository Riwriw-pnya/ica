"use client";

import type { ActivityCategory } from "@/types/anggota";

const TABS: ("Semua" | ActivityCategory)[] = ["Semua", "Login", "Perubahan data", "Pengajuan", "Keamanan"];

interface ActivityFilterTabsProps {
    active: string;
    onChange: (value: string) => void;
}

export default function ActivityFilterTabs({ active, onChange }: ActivityFilterTabsProps) {
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
                            ? "border border-[#ee6b28] bg-[#fff1e4] text-[#ee6b28]"
                            : "border border-[#eee8e2] bg-white text-[#5e5852] hover:bg-[#fcfbf9]"
                        }`}
                    >
                        {tab}
                    </button>
                );
            })}
        </div>
    );
}