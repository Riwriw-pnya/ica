"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CatteryBanner from "./components/CatteryBanner";
import QuickLinks from "./components/QuickLinks";
import LatestProgressCard from "./components/ProgressCard";
import StatIndicatorCards from "./components/IndicatorCards";
import SavedDraftsCard from "./components/DraftsCard";
import TopHealthScoresCard from "./components/TopHealth";
import MatingReportsCard from "./components/MatingCard";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2d2825] p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Banner Profil Cattery */}
        <CatteryBanner />

        {/* Tombol Buat Mating Report khusus Mobile (lg:hidden) */}
        <div className="lg:hidden">
          <button
            onClick={() => router.push("/cattery/mating-reports")}
            className="w-full cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] py-3 text-sm font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 active:scale-[0.99] flex items-center justify-center gap-1.5"
          >
            <span>+</span> Buat Mating Report
          </button>
        </div>

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