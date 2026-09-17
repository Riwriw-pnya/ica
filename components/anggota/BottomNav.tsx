"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, User, Calendar, Handbag } from "lucide-react";
import DashboardIcon from "./DashboardIcon";

const mobileNavItems = [
  { label: "Beranda", href: "/anggota/dashboard", icon: Home },
  { label: "Direktori", href: "/anggota/direktori", icon: Search },
  { label: "Store", href: "/anggota/store", icon: Handbag },
  { label: "Event", href: "/anggota/event", icon: Calendar },
  { label: "Profil", href: "/anggota/keanggotaan", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-ink-100,#eadecd)] px-2 py-2 z-50 flex items-center justify-around shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2 transition-colors ${
              isActive
                ? "text-[var(--color-brand-orange-700,#f48637)] font-bold"
                : "text-[var(--color-ink-500,#7e7267)] font-medium hover:text-[var(--color-ink-900,#1a1513)]"
            }`}
          >
            {/* Wrapper Ikon & Indikator Garis */}
            <div className="relative flex flex-col items-center pb-1">
              {isActive && (
                <span className="absolute -top-1.5 h-[2.5px] w-4 rounded-full bg-[#ee6b28]" />
              )}
              <Icon className="h-5 w-5 stroke-[2.25]" />
            </div>

            <span className="text-[10px] tracking-tight">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}