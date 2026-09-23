"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "./DashboardIcon";
import UserMenuDropdown from "./UserMenuDropdown";
import NotificationDropdown from "@/components/cattery/NotificationDropdown";
import type { NotificationItem } from "@/types/cattery";
import { initialNotifications } from "@/data/anggota";
import { useUserMenu } from "@/context/UserMenuContext";
import { useClickOutside } from "@/hooks/useClickOutside";

const pageTitles: Record<string, string> = {
  "/anggota/dashboard": "Beranda",
  "/anggota/berita": "Berita",
  "/anggota/direktori": "Direktori Cattery",
  "/anggota/keanggotaan": "Keanggotaan",
  "/anggota/event": "Event",
  "/anggota/store": "Store",
  "/anggota/leaderboard": "Leaderboard",
  "/anggota/pengaturan": "Pengaturan akun",
  "/anggota/log-aktivitas": "Log Aktivitas",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];

  const match = Object.keys(pageTitles)
    .filter((path) => path !== "/anggota" && pathname.startsWith(`${path}/`))
    .sort((a, b) => b.length - a.length)[0];

  return match ? pageTitles[match] : "Beranda";
}

export default function Header() {
  const { openMenu, toggleMenu, closeMenu } = useUserMenu();
  const router = useRouter();
  const pathname = usePathname();

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const containerRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

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
  const isDashboard = pathname === "/anggota/dashboard";

  const handleLogout = () => {
    closeMenu();
    router.push("/auth/login/member");
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#EFE9E1] bg-[#FAF8F5] px-4 pt-[max(env(safe-area-inset-top),2.5rem)] pb-3 md:bg-white md:px-5 md:py-0">
      <div className="flex items-center justify-between md:h-[54px]">
        {/* Sisi Kiri */}
        <div className="flex items-center gap-3">
          {isDashboard ? (
            <div className="md:hidden">
              <h1 className="text-[20px] font-bold tracking-tight text-[#231A14] leading-tight">
                Halo, Ayu
              </h1>
              <p className="text-[12px] text-[#8C827A] mt-0.5">
                Ringkasan keanggotaan Anda
              </p>
            </div>
          ) : (
            <h1 className="md:hidden font-display text-base font-semibold text-[#231A14]">
              {title}
            </h1>
          )}

          <h1 className="hidden md:block font-display text-sm font-semibold text-[#231A14]">
            {title}
          </h1>
        </div>

        {/* Sisi Kanan */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Dropdown Notifikasi */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => toggleMenu("notifications")}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#231A14] transition hover:bg-[#EFE9E1]/50 md:h-8 md:w-8 md:rounded-lg"
              aria-label="Notifikasi"
            >
              <DashboardIcon name="bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D95D1E] px-1 text-[9px] font-bold leading-none text-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <NotificationDropdown
                notifications={notifications}
                onMarkAllRead={handleMarkAllRead}
                onMarkOneRead={(id: string) =>
                  setNotifications((prev) =>
                    prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
                  )
                }
              />
            )}
          </div>

          {/* Profile Pill Desktop */}
          <div ref={containerRef} className="relative hidden md:block">
            <button
              onClick={() => toggleMenu("header")}
              className="flex items-center gap-2 rounded-full border border-[#E2D7CC] bg-gradient-to-b from-white to-[#F7F3ED] px-2 py-1 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04)] hover:border-[#D1C2B3] hover:from-white hover:to-[#F0E7DC] active:scale-98"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-[#FFCF9E] to-[#F26E27] text-[10px] font-bold text-white shrink-0">
                AP
              </div>
              <span className="text-[#6E6359] flex items-center pr-1">
                <DashboardIcon name="chevron" size={12} />
              </span>
            </button>

            {isUserMenuOpen && (
              <UserMenuDropdown
                position="bottom"
                widthClass="w-64 right-0"
                onNavigate={closeMenu}
                onLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}