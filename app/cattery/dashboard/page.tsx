"use client";

import React from "react";
import CatteryBanner from "./components/CatteryBanner";
import QuickLinks from "./components/QuickLinks";
import LatestProgressCard from "./components/ProgressCard";
import StatIndicatorCards from "./components/IndicatorCards";
import SavedDraftsCard from "./components/DraftsCard";
import TopHealthScoresCard from "./components/TopHealth";
import MatingReportsCard from "./components/MatingCard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2d2825] p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Banner Profil Cattery */}
        <CatteryBanner />

        {/* Tautan Cepat Navigasi */}
        <QuickLinks />

        {/* Progres Pengajuan Terakhir & Stepper */}
        <LatestProgressCard />

        {/* Kartu Indikator Statistik */}
        <StatIndicatorCards />

        {/* Baris 2 Kolom: Draft Tersimpan & Top Health Scores */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <SavedDraftsCard />
          <TopHealthScoresCard />
        </section>

        {/* Mating Report Terakhir */}
        <MatingReportsCard />
      </div>
    </main>
  );
}