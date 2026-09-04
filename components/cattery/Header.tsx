"use client";

import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import CatteryUserMenuDropdown from "./CatteryUserMenuDropdown";
import { useUserMenu } from "@/context/UserMenuContext";
import { useSidebar } from "@/context/SidebarContext";
import { useClickOutside } from "@/hooks/useClickOutside";

const pageTitles: Record<string, string> = {
  "/cattery": "Dashboard",
  "/cattery/my-cats": "My Cats",
  "/cattery/applications": "Applications",
  "/cattery/mating-reports": "Mating Reports",
  "/cattery/documents": "Documents",
  "/cattery/leaderboard": "Leaderboard",
  "/cattery/events": "Events",
  "/cattery/profil": "Profil Cattery",
  "/cattery/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  const match = Object.keys(pageTitles)
    .filter((p) => p !== "/cattery" && pathname.startsWith(`${p}/`))
    .sort((a, b) => b.length - a.length)[0];
  return match ? pageTitles[match] : "Dashboard";
}

export default function Header() {
  const { openMenu, toggleMenu, closeMenu } = useUserMenu();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = openMenu === "header";

  useClickOutside(containerRef, () => {
    if (isOpen) closeMenu();
  });

  const title = getPageTitle(pathname);

  const handleLogout = () => {
    closeMenu();
    router.push("/auth/login/cattery");
  };

  return (
    <header className="flex h-[54px] items-center justify-between border-b border-[var(--color-ink-100)] bg-white px-5">
      <div className="flex items-center gap-3">
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--color-ink-700)] transition hover:bg-[var(--color-brand-orange-50)]"
            aria-label="Tampilkan sidebar"
          >
            <DashboardIcon name="panel" size={17} />
          </button>
        )}
        <h1 className="font-display text-sm font-semibold text-[var(--color-ink-900)]">
          {title}
        </h1>
      </div>

      <div ref={containerRef} className="relative">
        <button
          onClick={() => toggleMenu("header")}
          className="flex items-center gap-2.5 rounded-lg px-1.5 py-1 transition hover:bg-[var(--color-brand-orange-50)]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[11px] font-medium text-[var(--color-brand-orange-700)]">
            RH
          </div>
          <DashboardIcon name="chevron" size={14} />
        </button>

        {isOpen && (
          <CatteryUserMenuDropdown
            position="bottom"
            widthClass="w-64 right-0"
            onNavigate={closeMenu}
            onLogout={handleLogout}
          />
        )}
      </div>
    </header>
  );
}