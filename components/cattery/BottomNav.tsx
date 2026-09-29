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

  const mainNavItems = [
    menus.find((m) => m.label === "Dashboard")!,
    menus.find((m) => m.label === "My Cats")!,
    menus.find((m) => m.label === "Applications")!,
    menus.find((m) => m.label === "Events")!,
    menus.find((m) => m.label === "Profil Cattery")!,
  ].filter(Boolean);

  return (
    <>
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
      </nav>
    </>
  );
}