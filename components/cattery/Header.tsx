"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import NotificationDropdown from "./NotificationDropdown";
import CatteryUserMenuDropdown from "./CatteryUserMenuDropdown";
import type { NotificationItem } from "@/types/cattery";
import { initialNotifications, catteryProfile } from "@/data/cattery";
import { useUserMenu } from "@/context/UserMenuContext";
import { useSidebar } from "@/context/SidebarContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useHeaderAction } from "@/context/HeaderActionContext";

const pageTitles: Record<string, string> = {
  "/cattery": "Dashboard",
  "/cattery/dashboard": "Dashboard",
  "/cattery/notifications": "Notifikasi",
  "/cattery/my-cats": "My Cats",
  "/cattery/my-cats/[id]": "Detail Kucing",
  "/cattery/applications": "Applications",
  "/cattery/mating-reports": "Buat Mating Report",
  "/cattery/documents": "Documents",
  "/cattery/leaderboard": "Leaderboard",
  "/cattery/event": "Events",
  "/cattery/store": "Store",
  "/cattery/profil": "Profil",
  "/cattery/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/cattery/mating-reports")) return "Buat Mating Report";
  if (pageTitles[pathname]) return pageTitles[pathname];
  const match = Object.keys(pageTitles)
    .filter((p) => p !== "/cattery/mating-reports" && pathname.startsWith(`${p}/`))
    .sort((a, b) => b.length - a.length)[0];
  return match ? pageTitles[match] : "Dashboard";
}

export default function Header() {
  const { customAction } = useHeaderAction();
  const { openMenu, toggleMenu, closeMenu } = useUserMenu();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const containerRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const isMatingReportSuccess = pathname === "/cattery/mating-reports/success";
  const isMatingReportForm = pathname.startsWith("/cattery/mating-reports") && !isMatingReportSuccess;
  const isDashboard = pathname === "/cattery" || pathname === "/cattery/dashboard";
  const isNotifications = pathname === "/cattery/notifications"; 
  const isProfile = pathname === "/cattery/profil";
  
  const isUserMenuOpen = openMenu === "header";
  const isNotifOpen = openMenu === "notifications";
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useClickOutside(containerRef, () => {
    if (isUserMenuOpen) closeMenu();
  });

  useClickOutside(notifRef, () => {
    if (isNotifOpen) closeMenu();
  });

  const title = getPageTitle(pathname);

  // Inisial untuk avatar (RH)
  const initials = catteryProfile.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    closeMenu();
    router.push("/auth/login/cattery");
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <header className={`${isDashboard ? "hidden md:flex" : "flex"} h-[54px] items-center justify-between border-b border-[var(--color-ink-100,#EFE9E1)] bg-white px-5`}>
      {/* SISI KIRI: JUDUL & BADGE */}
      <div className="flex items-center gap-3">
        {/* Back Chevron Mobile */}
        {(isNotifications || isMatingReportForm) && (
          <button 
            onClick={() => router.back()} 
            className="text-[#8C8074] hover:text-[#F05A1B] transition-colors cursor-pointer -ml-1 mr-1 md:hidden"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div className="flex flex-col">
          <h1 className="font-display text-sm md:text-base font-bold text-[var(--color-ink-900,#231A14)]">
            {title}
          </h1>
          
          {/* Subtitle Mobile */}
          {isNotifications && (
            <span className="text-[10px] text-[#8C8074] font-medium leading-none mt-0.5 md:hidden">
              4 belum dibaca
            </span>
          )}

          {isProfile && (
            <span className="text-[10px] text-[#8C8074] font-medium leading-none mt-0.5 md:hidden">
              {catteryProfile.name} · Cattery
            </span>
          )}

          {isMatingReportForm && (
            <span className="text-[10px] text-[#8C8074] font-medium leading-none mt-0.5 md:hidden">
              {catteryProfile.name} · {catteryProfile.region}
            </span>
          )}
        </div>

        {/* Badge Draft Desktop */}
        {isMatingReportForm && (
          <span className="hidden md:inline-block rounded-full bg-[#EFEFEF] px-2.5 py-0.5 text-[10px] font-medium text-[#7A6E65]">
            Draft
          </span>
        )}
      </div>

      {/* SISI KANAN: ACTION CONTROLS & AVATAR */}
      <div className="flex items-center gap-3 md:gap-4">
        {isNotifications ? (
          <button className="text-xs font-bold text-[#F05A1B] hover:text-[#D95D1E] cursor-pointer">
            Tandai semua dibaca
          </button>
        ) : (
          <>
            {/* Tombol Buat Mating Report (Khusus Dashboard Desktop) */}
            {isDashboard && (
              <button
                onClick={() => router.push("/cattery/mating-reports")}
                className="hidden lg:block cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
              >
                + Buat Mating Report
              </button>
            )}

            {/* Icon Cart / Store (Muncul di SEMUA HALAMAN kecuali Mating Report) */}
            {!isMatingReportForm && (
              <button
                onClick={() => router.push("/cattery/store")}
                className="hidden md:flex relative h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#231A14] hover:bg-[#FAF7F2] transition cursor-pointer"
                aria-label="Store / Cart"
              >
                <svg className="w-4 h-4 text-[#231A14]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D95D1E] text-[9px] font-bold text-white">
                  1
                </span>
              </button>
            )}

            {/* Control Khusus Form Mating Report Desktop */}
            {isMatingReportForm && (
              <>
                {/* Mobile Direct ke Draft */}
                <Link
                  href="/cattery/draft"
                  className="text-xs font-semibold text-[#1a1513] hover:text-[#EE6B28] transition-colors md:hidden"
                >
                  Draft
                </Link>

                <span className="hidden md:inline-block text-[11px] text-[#A89F95]">
                  Tersimpan otomatis 14:32
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if (customAction) customAction();
                  }}
                  className="hidden md:inline-block cursor-pointer rounded-full border border-[#EE6B28] px-4 py-1.5 text-[12px] font-medium text-[#EE6B28] transition hover:bg-[#FFF2E8] active:scale-95"
                >
                  Simpan draft
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/cattery/dashboard")}
                  className="hidden md:inline-block text-[12px] font-medium text-[#7A6E65] hover:text-[#231A14] mr-1 cursor-pointer"
                >
                  Keluar
                </button>
              </>
            )}

            {/* IKON NOTIFIKASI DESKTOP */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => router.push("/cattery/notifications")}
                className="flex md:hidden relative h-8 w-8 items-center justify-center rounded-lg text-[var(--color-ink-700,#231A14)] transition hover:bg-[#FAF7F2]"
                aria-label="Notifikasi Mobile"
              >
                <DashboardIcon name="bell" size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D95D1E] px-1 text-[9px] font-bold leading-none text-white shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => toggleMenu("notifications")}
                className="hidden md:flex relative h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#231A14] transition hover:bg-[#FAF7F2] cursor-pointer"
                aria-label="Notifikasi Desktop"
              >
                <DashboardIcon name="bell" size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D95D1E] px-1 text-[9px] font-bold leading-none text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="hidden md:block">
                  <NotificationDropdown
                    notifications={notifications}
                    onMarkAllRead={handleMarkAllAsRead}
                    onMarkOneRead={(id: string) =>
                      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
                    }
                    onClose={closeMenu}
                  />
                </div>
              )}
            </div>

            {/* AVATAR USER DESKTOP */}
            <div ref={containerRef} className="relative">
              <div className="flex md:hidden items-center px-1 select-none pointer-events-none">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFE8DB] text-[10px] font-bold text-[#D95D1E] shrink-0">
                  {initials}
                </div>
              </div>

              <button
                onClick={() => toggleMenu("header")}
                className="hidden md:flex cursor-pointer items-center gap-1.5 rounded-lg transition-all hover:opacity-80"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFE8DB] text-[11px] font-bold text-[#D95D1E] shrink-0">
                  {initials}
                </div>
                <span className="text-[#6E6359] flex items-center pr-1">
                  <DashboardIcon name="chevron" size={12} />
                </span>
              </button>

              {isUserMenuOpen && (
                <div className="hidden md:block">
                  <CatteryUserMenuDropdown
                    position="bottom"
                    widthClass="w-64 right-0"
                    onNavigate={closeMenu}
                    onLogout={handleLogout}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}