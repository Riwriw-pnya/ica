"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import MobileHeader from "./header/MobileHeader";
import DesktopHeader from "./header/DesktopHeader";
import type { NotificationItem } from "@/types/cattery";
import { initialNotifications, catteryProfile } from "@/data/cattery";
import { useUserMenu } from "@/context/UserMenuContext";
import { useHeaderAction } from "@/context/HeaderActionContext";

const pageTitles: Record<string, string> = {
  "/cattery": "Dashboard",
  "/cattery/dashboard": "Dashboard",
  "/cattery/notifications": "Notifikasi",
  "/cattery/draft": "Drafts",
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
  const { customAction, headerTitle, headerSubTitle } = useHeaderAction();
  const { openMenu, toggleMenu, closeMenu } = useUserMenu();
  const router = useRouter();
  const pathname = usePathname();

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const isMatingReportSuccess = pathname === "/cattery/mating-reports/success";
  const isMatingReportForm = pathname.startsWith("/cattery/mating-reports") && !isMatingReportSuccess;
  const isDashboard = pathname === "/cattery" || pathname === "/cattery/dashboard";
  const isNotifications = pathname === "/cattery/notifications"; 
  const isProfile = pathname === "/cattery/profil";
  const isCatDetailPage = pathname.startsWith("/cattery/my-cats/") && pathname !== "/cattery/my-cats";
  
  // DETEKSI HALAMAN DETAIL APLIKASI & DRAFT
  const isApplicationDetailPage = pathname.startsWith("/cattery/applications/") && pathname !== "/cattery/applications";
  const isDraftPage = pathname === "/cattery/draft";

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const title = getPageTitle(pathname);

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

  const handleMarkOneAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const handleCartClick = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("open_cart_on_load", "true");
      window.dispatchEvent(new CustomEvent("open-mobile-cart"));
      window.dispatchEvent(new CustomEvent("open-store-cart"));
    }
    router.push("/cattery/store");
  };

  const isStorePage = pathname.startsWith("/cattery/store");

  return (
    <header className={`${isDashboard ? "hidden md:flex" : "flex"} h-[54px] items-center justify-between border-b border-[var(--color-ink-100,#EFE9E1)] bg-white px-5`}>
      {/* Khusus Mobile View */}
      <MobileHeader
        title={title}
        headerTitle={headerTitle}
        headerSubTitle={headerSubTitle}
        isCatDetailPage={isCatDetailPage}
        isApplicationDetailPage={isApplicationDetailPage}
        isDraftPage={isDraftPage}
        isNotifications={isNotifications}
        isMatingReportForm={isMatingReportForm}
        isProfile={isProfile}
        isStorePage={isStorePage}
        unreadCount={unreadCount}
        initials={initials}
        catteryName={catteryProfile.name}
        catteryRegion={catteryProfile.region}
        onCartClick={handleCartClick}
      />

      {/* Khusus Desktop View */}
      <DesktopHeader
        title={title}
        isDashboard={isDashboard}
        isMatingReportForm={isMatingReportForm}
        isNotifications={isNotifications}
        customAction={customAction}
        unreadCount={unreadCount}
        notifications={notifications}
        initials={initials}
        openMenu={openMenu}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
        onMarkAllRead={handleMarkAllAsRead}
        onMarkOneRead={handleMarkOneAsRead}
        onCartClick={handleCartClick}
        onLogout={handleLogout}
      />
    </header>
  );
}