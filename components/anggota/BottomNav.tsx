"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Newspaper, Building2, UserCheck, Calendar } from "lucide-react";

const mobileNavItems = [
  { label: "Beranda", href: "/anggota/beranda", icon: Home },
  { label: "Berita", href: "/anggota/berita", icon: Newspaper },
  { label: "Cattery", href: "/anggota/direktori", icon: Building2 },
  { label: "Keanggotaan", href: "/anggota/keanggotaan", icon: UserCheck },
  { label: "Event", href: "/anggota/event", icon: Calendar },
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
                ? "text-[var(--color-brand-orange-500,#f48637)] font-bold"
                : "text-[var(--color-ink-500,#7e7267)] font-medium hover:text-[var(--color-ink-900,#1a1513)]"
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] tracking-tight">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}