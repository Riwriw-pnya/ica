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
    mobileTitle: "Store ICA",
    mobileSubtitle: "Merchandise dan publikasi resmi",
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

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Header({ cartCount = 1, onOpenCart }: HeaderProps) {
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
  const isStorePage = pathname.startsWith("/anggota/store");

  const handleLogout = () => {
    closeMenu();
    router.push("/auth/login/member");
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenCart) onOpenCart();

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-store-cart"));
      window.dispatchEvent(new CustomEvent("open-mobile-cart"));
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#EFE9E1] bg-[#FAF8F5] px-4 pt-[max(env(safe-area-inset-top),0.75rem)] pb-2.5 md:bg-white md:px-6 md:py-0">
      <div className="flex items-center justify-between md:h-13.5">
        {/* Sisi Kiri: Judul Halaman */}
        <div className="flex items-center gap-3">
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

          <h1 className="hidden md:block font-display text-sm font-semibold text-[#231A14]">
            {pageMeta.desktopTitle}
          </h1>
        </div>

        {/* Sisi Kanan */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Keranjang Mobile (Hanya muncul di Store) */}
          {isStorePage && (
            <button
              type="button"
              onClick={handleCartClick}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2D7CC] bg-white text-[#231A14] transition hover:bg-[#FAF7F5] md:hidden cursor-pointer active:scale-95 shrink-0 shadow-xs"
              aria-label="Keranjang"
            >
              <svg
                className="w-4.5 h-4.5 text-[#1F1B18]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#E54D2E] text-white text-[9px] font-bold leading-none border border-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Keranjang Desktop (Muncul di Semua Navigasi Desktop) */}
          <button
            type="button"
            onClick={handleCartClick}
            className="hidden md:flex relative h-9 w-9 items-center justify-center rounded-xl border border-[#E2D7CC] bg-white text-[#231A14] transition hover:bg-[#FAF7F5] cursor-pointer active:scale-95 shrink-0 shadow-xs"
            aria-label="Keranjang"
          >
            <svg
              className="w-4.5 h-4.5 text-[#1F1B18]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#E54D2E] text-white text-[9px] font-bold leading-none border border-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notifikasi Mobile */}
          <div ref={notifRef} className="relative shrink-0 md:hidden">
            <button
              onClick={() => toggleMenu("notifications")}
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#231A14] transition hover:bg-[#EFE9E1]/50"
              aria-label="Notifikasi"
            >
              <DashboardIcon name="bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#D95D1E] text-white text-[9px] font-bold leading-none border border-white shadow-xs">
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

          {/* Profil Pengguna Desktop */}
          <div ref={containerRef} className="relative hidden md:block">
            <button
              onClick={() => toggleMenu("header")}
              className={`flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 transition-all cursor-pointer active:scale-98 ${
                isUserMenuOpen ? "bg-[#FFF2E8]" : "bg-white hover:bg-[#FFF2E8]"
              }`}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FEE4CC] text-[10px] font-bold text-[#A85822] shrink-0">
                AP
              </div>
              <div className="flex flex-col text-left leading-tight pr-0.5">
                <span className="text-xs font-bold text-[#1A1513]">
                  Ayu Prameswari
                </span>
                <span className="text-[10px] font-medium text-[#8C8074]">
                  ICA-M-004821
                </span>
              </div>
              <span className="text-[#8C8074] flex items-center pl-0.5">
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