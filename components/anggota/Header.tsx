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
  "/anggota": "Beranda",
  "/anggota/berita": "Berita",
  "/anggota/direktori": "Direktori Cattery",
  "/anggota/keanggotaan": "Keanggotaan",
  "/anggota/event": "Event",
  "/anggota/store": "Store",
  "/anggota/leaderboard": "Leaderboard",
  "/anggota/pengaturan": "Pengaturan akun",
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
    <header className="flex h-[54px] items-center justify-between border-b border-[var(--color-ink-100)] bg-white px-5">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-sm font-semibold text-[var(--color-ink-900)]">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <div ref={notifRef} className="relative">
          <button
            onClick={() => toggleMenu("notifications")}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-ink-700)] transition hover:bg-[var(--color-brand-orange-50)]"
            aria-label="Notifikasi"
          >
            <DashboardIcon name="bell" size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-danger)] px-1 text-[9px] font-bold leading-none text-white shadow-sm">
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

        <div ref={containerRef} className="relative">
          <button
            onClick={() => toggleMenu("header")}
            className="flex items-center gap-2.5 rounded-lg px-1.5 py-1 transition hover:bg-[var(--color-brand-orange-50)]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[11px] font-medium text-[var(--color-brand-orange-700)]">
              AP
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-[12px] font-semibold text-[var(--color-ink-900)]">
                Ayu Prameswari
              </p>
              <p className="text-[10px] text-[var(--color-ink-400)]">
                ICA-M-004821
              </p>
            </div>

            <DashboardIcon name="chevron" size={14} />
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