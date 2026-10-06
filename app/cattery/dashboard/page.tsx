"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import { catteryProfile } from "@/data/cattery";
import { useState } from "react";
import NotificationDrawer from "@/components/cattery/NotificationMobile";

import CatteryBanner from "./components/CatteryBanner";
import QuickLinks from "./components/QuickLinks";
import LatestProgressCard from "./components/ProgressCard";
import StatIndicatorCards from "./components/IndicatorCards";
import SavedDraftsCard from "./components/DraftsCard";
import TopHealthScoresCard from "./components/TopHealth";
import MatingReportsCard from "./components/MatingCard";

export default function DashboardPage() {
  const router = useRouter();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return "CT";
    const words = name.split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  const truncateName = (name: string, maxLength: number = 15) => {
    if (!name) return "";
    return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
  };

  const initials = getInitials(catteryProfile.name);
  const displayNameMobile = truncateName(catteryProfile.name);

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2d2825] md:p-6 lg:p-8 font-sans">
      
      {/* ========================================= */}
      {/* 1. TAMPILAN DESKTOP                       */}
      {/* ========================================= */}
      <div className="hidden md:block max-w-5xl mx-auto space-y-7">
        <CatteryBanner profile={catteryProfile} />
        <QuickLinks />
        <LatestProgressCard />
        <StatIndicatorCards />
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <SavedDraftsCard />
          <TopHealthScoresCard />
        </section>
        <MatingReportsCard />
      </div>

      {/* ========================================= */}
      {/* 2. TAMPILAN MOBILE                        */}
      {/* ========================================= */}
      <div className="block md:hidden pb-6">
        
        {/* Header Banner Oranye */}
        <div className="bg-[#FF9B54] rounded-b-[32px] px-4 pt-6 pb-8 shadow-sm">
          
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-[#F05A1B] shrink-0 text-base shadow-sm">
              {initials}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-white/90 text-[11px] leading-tight mb-0.5">Selamat pagi,</p>
              <h1 className="text-white font-bold text-[15px] leading-tight truncate">{displayNameMobile}</h1>
            </div>
            <div className="bg-white rounded-full px-3 py-1 text-[10px] font-bold text-[#F05A1B] shadow-sm">
              Cattery
            </div>
            
            <button 
              onClick={() => setIsNotifOpen(true)}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative shrink-0 text-white cursor-pointer hover:bg-white/30 transition-colors"
            >
              <DashboardIcon name="bell" size={16} />
              <div className="w-[6px] h-[6px] bg-[#EF4444] rounded-full absolute top-[7px] right-[8px]"></div>
            </button>
          </div>

          <div className="bg-white rounded-[14px] px-4 py-3.5 mb-6 flex items-center gap-2 shadow-sm">
            <span className="text-slate-400 text-xs">Cari kucing, report, atau event</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            <Link href="/cattery/mating-reports" className="bg-white aspect-square rounded-[14px] flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-transform p-1.5">
              <DashboardIcon className="mb-1.5 text-[var(--color-brand-orange-700)]" name="mating" size={17}/>
              <span className="font-bold text-[9px] leading-[1.1] text-[#2d2825]">Mating<br/>Report</span>
            </Link>
            
            <Link href="/cattery/my-cats" className="bg-white aspect-square rounded-[14px] flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-transform p-1.5">
              <div className="text-[var(--color-brand-orange-700)]/90 mb-1.5">
                <DashboardIcon name="cat" size={20} />
              </div>
              <span className="font-bold text-[9px] leading-[1.1] text-[#2d2825]">My Cats</span>
            </Link>

            <Link href="/cattery/event" className="bg-white aspect-square rounded-[14px] flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-transform p-1.5">
              <svg className="w-[20px] h-[20px] text-[var(--color-brand-orange-700)]/90 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-bold text-[9px] leading-[1.1] text-[#2d2825]">Events</span>
            </Link>

            <Link href="/cattery/store" className="bg-white aspect-square rounded-[14px] flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-transform p-1.5">
              <svg className="w-[20px] h-[20px] text-[var(--color-brand-orange-700)]/90 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="font-bold text-[9px] leading-[1.1] text-[#2d2825]">Store</span>
            </Link>
          </div>
        </div>

        {/* Isi Konten Utama Mobile */}
        <div className="px-4 mt-5 space-y-8">
          
          {/* Card Cattery Terverifikasi dengan Icon Home */}
          <div className="bg-white rounded-[16px] p-4 border border-[#F5E6DA] flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFF5EC] rounded-[10px] border border-[#F5E6DA] flex items-center justify-center shrink-0">
                <Home className="w-5 h-5 text-[var(--color-brand-orange-700)]" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-[#2d2825]">Cattery terverifikasi</h3>
                <p className="text-[10px] text-[#8c8074]">Berlaku sampai 31 Des 2026</p>
              </div>
            </div>
            <Link href="/cattery/profil" className="rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-bold text-slate-700 shadow-xs shrink-0 hover:bg-slate-50 transition">
              Lihat profil
            </Link>
          </div>

          {/* Jumlah Statistik Kucing */}
          <div className="grid grid-cols-3 gap-3 -mt-3">
            <div className="bg-white rounded-[14px] p-3 border border-[#F5E6DA] shadow-xs flex flex-col">
              <span className="font-bold text-xl text-[#2d2825] mb-0.5">4</span>
              <span className="text-[10px] text-[#8c8074]">Male</span>
            </div>
            <div className="bg-white rounded-[14px] p-3 border border-[#F5E6DA] shadow-xs flex flex-col">
              <span className="font-bold text-xl text-[#2d2825] mb-0.5">7</span>
              <span className="text-[10px] text-[#8c8074]">Female</span>
            </div>
            <div className="bg-white rounded-[14px] p-3 border border-[#F5E6DA] shadow-xs flex flex-col">
              <span className="font-bold text-xl text-[#2d2825] mb-0.5">12</span>
              <span className="text-[10px] text-[#8c8074]">Offspring</span>
            </div>
          </div>

          <MatingReportsCard />
          <SavedDraftsCard />
          <TopHealthScoresCard />
          
        </div>
      </div>
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </main>
  );
}