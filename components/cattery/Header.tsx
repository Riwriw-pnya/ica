"use client";

import { useState, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";

import DesktopHeader from "./header/DesktopHeader";
import MobileHeader from "./header/MobileHeader";

import type { NotificationItem } from "@/types/cattery";
import { initialNotifications } from "@/data/cattery";

import { useUserMenu } from "@/context/UserMenuContext";
import { useHeaderAction } from "@/context/HeaderActionContext";

const pageTitles: Record<string, string> = {
  "/cattery": "Dashboard",
  "/cattery/dashboard": "Dashboard",
  "/cattery/notifications": "Notifikasi",
  "/cattery/my-cats": "My Cats",
  "/cattery/my-cats/[id]": "Detail Kucing",
  "/cattery/applications": "Applications",
  "/cattery/mating-reports": "Buat Mating Reports",
  "/cattery/documents": "Documents",
  "/cattery/leaderboard": "Leaderboard",
  "/cattery/event": "Event",
  "/cattery/store": "Store",
  "/cattery/profil": "Profil Cattery",
  "/cattery/mprofil": "Profil Cattery",
  "/cattery/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];

  const match = Object.keys(pageTitles)
    .filter(
      (p) =>
        p !== "/cattery/mating-reports" &&
        pathname.startsWith(`${p}/`)
    )
    .sort((a, b) => b.length - a.length)[0];

  return match ? pageTitles[match] : "Dashboard";
}

export default function Header() {
  const { customAction } = useHeaderAction();
  const { openMenu, toggleMenu, closeMenu } = useUserMenu();

  const router = useRouter();
  const pathname = usePathname();

  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const isMatingReportForm = pathname.startsWith("/cattery/mating-reports");
  const isDashboard = pathname === "/cattery" || pathname === "/cattery/dashboard";
  const isNotifications = pathname === "/cattery/notifications";
  const isCatDetailPage = pathname.startsWith("/cattery/my-cats/");
  const isApplicationDetailPage = pathname.startsWith("/cattery/applications/");
  const isDraftPage = pathname === "/cattery/draft";
  const isProfile = pathname === "/cattery/profil";
  const isProfileMobile = pathname === "/cattery/mprofil";
  const isEventsPage = pathname === "/cattery/events";
  const isStorePage = pathname === "/cattery/store";

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const title = getPageTitle(pathname);

  const handleCartClick = () => {
    if (!isStorePage) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("open_cart_on_load", "true");
      }
      router.push("/cattery/store");
    } else {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("open-store-cart"));
        window.dispatchEvent(new CustomEvent("open-mobile-cart"));
      }
    }
  };

  const handleLogout = () => {
    closeMenu();
    router.push("/auth/login/cattery");
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        isRead: true,
      }))
    );
  };

  const handleMarkOneRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-[var(--color-ink-100,#EFE9E1)] bg-white px-5 py-2.5 shadow-2xs ${
        isDashboard ? "hidden md:flex" : "flex"
      }`}
    >
      {/* TAMPILAN DESKTOP (Tetap Tampil di Dashboard Layar Komputer) */}
      <DesktopHeader
        title={title}
        isDashboard={isDashboard}
        isMatingReportForm={isMatingReportForm}
        isNotifications={isNotifications}
        customAction={customAction}
        unreadCount={unreadCount}
        notifications={notifications}
        initials="RH"
        openMenu={openMenu}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
        onMarkAllRead={handleMarkAllAsRead}
        onMarkOneRead={handleMarkOneRead}
        onCartClick={handleCartClick}
        onLogout={handleLogout}
      />

      {/* TAMPILAN MOBILE (Otomatis Tersembunyi Hanya di Dashboard Mobile) */}
      {!isDashboard && (
        <Suspense fallback={<div className="h-8 w-full" />}>
          <MobileHeader
            title={title}
            headerTitle={title}
            headerSubTitle={null}
            isCatDetailPage={isCatDetailPage}
            isApplicationDetailPage={isApplicationDetailPage}
            isDraftPage={isDraftPage}
            isNotifications={isNotifications}
            isMatingReportForm={isMatingReportForm}
            isProfile={isProfile}
            isProfileMobile={isProfileMobile}
            isEventsPage={isEventsPage}
            isStorePage={isStorePage}
            unreadCount={unreadCount}
            initials="RH"
            catteryName="Rumah Hana"
            catteryRegion="Bandung"
            onCartClick={handleCartClick}
          />
        </Suspense>
      )}
    </header>
  );
}