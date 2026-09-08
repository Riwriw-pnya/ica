"use client";

import { useState } from "react";
import type { CatEventResult, CatProfileDetail, PedigreeChart as PedigreeChartData } from "@/types/cattery";
import { PedigreeChart } from "./PedigreeChart";
import { EventHistoryList } from "./EventHistoryList";

type TabKey = "profile" | "events";

const TABS: { key: TabKey; label: string }[] = [
  { key: "profile", label: "Profil & silsilah" },
  { key: "events", label: "Riwayat event" },
];

interface CatDetailTabsProps {
  cat: CatProfileDetail;
  pedigree?: PedigreeChartData;
  events: CatEventResult[];
}

export function CatDetailTabs({ cat, pedigree, events }: CatDetailTabsProps) {
  const [active, setActive] = useState<TabKey>("profile");

  return (
    <div className="bg-[var(--color-ink-50)]">
      <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === tab.key
                ? "bg-orange-100 text-orange-700"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {active === "profile" ? (
          <PedigreeChart cat={cat} pedigree={pedigree} />
        ) : (
          <EventHistoryList catName={cat.name} events={events} />
        )}
      </div>
    </div>
  );
}
