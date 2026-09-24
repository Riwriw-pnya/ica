"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Cat, 
  FileText, 
  Users, 
  FolderDown, 
  Trophy, 
  Calendar, 
  ShoppingCart, 
  Home, 
  Settings, 
  MoreHorizontal,
  X
} from "lucide-react";

const menus = [
  { label: "Dashboard", icon: "dashboard", href: "/cattery/dashboard" },
  { label: "My Cats", icon: "cat", href: "/cattery/my-cats" },
  { label: "Applications", icon: "news", href: "/cattery/applications" },
  { label: "Mating Reports", icon: "users", href: "/cattery/mating-reports" },
  { label: "Documents", icon: "news", href: "/cattery/documents" },
  { label: "Leaderboard", icon: "trophy", href: "/cattery/leaderboard" },
  { label: "Events", icon: "calendar", href: "/cattery/event" },
  { label: "Store", icon: "shopping-cart", href: "/cattery/store" },
  { label: "Profil Cattery", icon: "home", href: "/cattery/profil" },
  { label: "Settings", icon: "settings", href: "/cattery/settings" },
];

function MenuIcon({ icon, className }: { icon: string; className?: string }) {
  switch (icon) {
    case "dashboard":
      return <LayoutDashboard className={className} />;
    case "cat":
      return <Cat className={className} />;
    case "news":
      return <FileText className={className} />;
    case "users":
      return <Users className={className} />;
    case "documents":
      return <FolderDown className={className} />;
    case "trophy":
      return <Trophy className={className} />;
    case "calendar":
      return <Calendar className={className} />;
    case "shopping-cart":
      return <ShoppingCart className={className} />;
    case "home":
      return <Home className={className} />;
    case "settings":
      return <Settings className={className} />;
    default:
      return <FileText className={className} />;
  }
}

export default function BottomNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // 4 Menu Utama untuk Bottom Nav Bar
  const mainNavItems = [
    menus.find((m) => m.label === "Dashboard")!,
    menus.find((m) => m.label === "My Cats")!,
    menus.find((m) => m.label === "Applications")!,
    menus.find((m) => m.label === "Events")!,
  ].filter(Boolean);

  // Sisanya masuk ke Card Modal "Lainnya"
  const moreNavItems = menus.filter(
    (item) => !mainNavItems.some((main) => main.label === item.label)
  );

  const isMoreActive = moreNavItems.some((item) => pathname.startsWith(item.href));

  return (
    <>
      {/* 1. BOTTOM NAV BAR (Ukuran Tetap Seperti Semula, Tersembunyi di Desktop/lg:hidden) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-ink-100,#eadecd)] px-2 py-1.5 z-50 flex items-center justify-around shadow-[0_-4px_12px_rgba(0,0,0,0.05)] lg:hidden">
        {mainNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-2 transition-colors min-w-[60px] ${
                isActive
                  ? "text-[#ee6b28] font-bold"
                  : "text-[#7e7267] font-medium hover:text-[#1a1513]"
              }`}
            >
              {isActive && (
                <span className="absolute -top-1.5 h-[3px] w-8 rounded-full bg-[#ee6b28]" />
              )}
              
              <MenuIcon icon={item.icon} className="h-5 w-5 stroke-[2]" />
              <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Tab "Lainnya" */}
        <button
          type="button"
          onClick={() => setIsMoreOpen(!isMoreOpen)}
          className={`relative flex flex-col items-center justify-center py-1 px-2 transition-colors min-w-[60px] cursor-pointer ${
            isMoreActive || isMoreOpen
              ? "text-[#ee6b28] font-bold"
              : "text-[#7e7267] font-medium hover:text-[#1a1513]"
          }`}
        >
          {(isMoreActive || isMoreOpen) && (
            <span className="absolute -top-1.5 h-[3px] w-8 rounded-full bg-[#ee6b28]" />
          )}

          <MoreHorizontal className="h-5 w-5 stroke-[2]" />
          <span className="text-[10px] tracking-tight mt-1">Lainnya</span>
        </button>
      </nav>

      {/* 2. CARD MODAL "LAINNYA" (Ukuran Card Dikecilkan) */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMoreOpen(false)}
          />

          {/* Card Sheet */}
          <div className="relative z-10 w-full max-w-sm rounded-t-2xl bg-white p-4 shadow-xl transition-transform animate-in slide-in-from-bottom duration-200">
            {/* Gagang Drag Bar */}
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200" />

            {/* Header Modal Ringkas */}
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Lainnya</h3>
                <p className="text-[11px] text-slate-500">Menu yang tidak masuk tab bar.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsMoreOpen(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* List Menu Ringkas */}
            <div className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1">
              {moreNavItems.map((item) => {
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMoreOpen(false)}
                    className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 transition-all ${
                      isActive
                        ? "border-[#fcd9bd] bg-[#fff8f3] text-[#ee6b28] font-bold shadow-2xs"
                        : "border-slate-100 bg-white text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                        isActive ? "bg-[#ffeee3] text-[#ee6b28]" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <MenuIcon icon={item.icon} className="h-4 w-4 stroke-[2]" />
                    </div>
                    <span className="text-xs font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}