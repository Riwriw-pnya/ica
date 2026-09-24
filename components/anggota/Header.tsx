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

interface PageMeta {
  desktopTitle: string;
  mobileTitle: string;
  mobileSubtitle?: string;
}

const pageMetaMap: Record<string, PageMeta> = {
  "/anggota/dashboard": {
    desktopTitle: "Beranda",
    mobileTitle: "Halo, Ayu",
    mobileSubtitle: "Ringkasan keanggotaan Anda",
  },
  "/anggota/direktori": {
    desktopTitle: "Direktori Cattery",
    mobileTitle: "Direktori Cattery",
    mobileSubtitle: "Cattery terdaftar ICA",
  },
  "/anggota/berita": {
    desktopTitle: "Berita",
    mobileTitle: "Berita",
    mobileSubtitle: "Informasi dan pengumuman terbaru",
  },
  "/anggota/keanggotaan": {
    desktopTitle: "Keanggotaan",
    mobileTitle: "Keanggotaan",
    mobileSubtitle: "Kelola status dan data keanggotaan",
  },
  "/anggota/event": {
    desktopTitle: "Event",
    mobileTitle: "Event",
    mobileSubtitle: "Jadwal dan pendaftaran event ICA",
  },
  "/anggota/store": {
    desktopTitle: "Store",
    mobileTitle: "Store",
    mobileSubtitle: "Merchandise resmi ICA",
  },
  "/anggota/leaderboard": {
    desktopTitle: "Leaderboard",
    mobileTitle: "Leaderboard",
    mobileSubtitle: "Peringkat cattery dan kucing",
  },
};

function getPageMeta(pathname: string): PageMeta {
  if (pageMetaMap[pathname]) return pageMetaMap[pathname];

  const match = Object.keys(pageMetaMap)
    .filter((path) => path !== "/anggota" && pathname.startsWith(`${path}/`))
    .sort((a, b) => b.length - a.length)[0];

  return match
    ? pageMetaMap[match]
    : { desktopTitle: "Beranda", mobileTitle: "Beranda" };
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

  const pageMeta = getPageMeta(pathname);

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
        {/* Sisi Kiri: Judul Mobile vs Desktop */}
        <div className="flex items-center gap-3">
          {/* Tampilan Mobile (< md) */}
          <div className="md:hidden">
            <h1 className="text-[18px] font-bold tracking-tight text-[#231A14] leading-tight">
              {pageMeta.mobileTitle}
            </h1>
            {pageMeta.mobileSubtitle && (
              <p className="text-[11px] text-[#8C827A] mt-0.5">
                {pageMeta.mobileSubtitle}
              </p>
            )}
          </div>

          {/* Tampilan Desktop (>= md) */}
          <h1 className="hidden md:block font-display text-sm font-semibold text-[#231A14]">
            {pageMeta.desktopTitle}
          </h1>
        </div>

        {/* Sisi Kanan: Notifikasi & Profil */}
        <div className="flex items-center gap-2 md:gap-3">
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