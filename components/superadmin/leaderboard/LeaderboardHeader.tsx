"use client";

import React from "react";
import { Plus, ChevronDown } from "lucide-react";

interface LeaderboardHeaderProps {
  activeTab: "global" | "event";
  setActiveTab: (tab: "global" | "event") => void;
  selectedEvent: string;
  setSelectedEvent: (event: string) => void;
  onOpenModal: () => void;
}

export default function LeaderboardHeader({
  activeTab,
  setActiveTab,
  selectedEvent,
  setSelectedEvent,
  onOpenModal,
}: LeaderboardHeaderProps) {
  return (
    <div className="bg-white border border-[#EFECE6] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-[#FAF8F5] p-1 rounded-full border border-[#EFECE6]">
          <button
            type="button"
            onClick={() => setActiveTab("global")}
            className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
              activeTab === "global"
                ? "bg-[#FFF0E6] text-[#EE6B28] border border-[#FFE5D4]"
                : "text-[#8C7A6B] hover:text-[#231A14]"
            }`}
          >
            Ranking global
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("event")}
            className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
              activeTab === "event"
                ? "bg-[#FFF0E6] text-[#EE6B28] border border-[#FFE5D4]"
                : "text-[#8C7A6B] hover:text-[#231A14]"
            }`}
          >
            Per event
          </button>
        </div>

        {activeTab === "event" && (
          <div className="relative">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="appearance-none bg-white border border-[#EFECE6] text-[#231A14] text-xs font-semibold rounded-xl px-4 py-2 pr-8 outline-none cursor-pointer hover:border-[#EE6B28] transition"
            >
              <option value="ICA Cat Show Bandung 2026">ICA Cat Show Bandung 2026</option>
              <option value="ICA Cat Show Medan 2026">ICA Cat Show Medan 2026</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#8C7A6B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onOpenModal}
        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white text-xs font-bold shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] transition cursor-pointer shrink-0"
      >
        <Plus className="w-4 h-4" />
        <span>Input skor kesehatan</span>
      </button>
    </div>
  );
}