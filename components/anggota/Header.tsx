"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "./DashboardIcon";
import UserMenuDropdown from "./UserMenuDropdown";
import NotificationDropdown from "@/components/cattery/NotificationDropdown";
import type { NotificationItem } from "@/types/cattery";
import { initialNotifications } from "@/data/anggota";
import { useUserMenu } from "@/context/UserMenuContext";
import { useSidebar } from "@/context/SidebarContext";
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
  const { isSidebarOpen, toggleSidebar } = useSidebar();
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

  const handleLogout = () => {
    closeMenu();
    router.push("/auth/login/member");
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <header className="flex h-[54px] items-center justify-between border-b border-[var(--color-ink-100,#EFE9E1)] bg-white px-5">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-sm font-semibold text-[var(--color-ink-900)]">
          {title}
        </h1>
      </div>

      {/* Disamakan gap-3 seperti Cattery */}
      <div className="flex items-center gap-3">
        <div ref={notifRef} className="relative">
          <button
            onClick={() => toggleMenu("notifications")}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-ink-700,#231A14)] transition hover:bg-[#FAF7F2]"
            aria-label="Notifikasi"
          >
            <DashboardIcon name="bell" size={20} />
            {unreadCount > 0 && (
              /* Disamakan warna badge ke Oranye Cattery (#D95D1E) */
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
                setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
              }
            />
          )}
        </div>

        {/* Profile Pill Style (Samakan Cattery) */}
        <div ref={containerRef} className="relative">
          <button
            onClick={() => toggleMenu("header")}
            className="flex items-center gap-2 rounded-full border border-[#E2D7CC] bg-gradient-to-b from-white to-[#F7F3ED] px-2 py-1 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04)] hover:border-[#D1C2B3] hover:from-white hover:to-[#F0E7DC] active:scale-98"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-[#FFCF9E] to-[#F26E27] text-[10px] font-bold text-white shadow-xs shrink-0">
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
    </header>
  );
}