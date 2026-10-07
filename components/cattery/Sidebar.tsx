"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import CatteryUserMenuDropdown from "./CatteryUserMenuDropdown";
import { useUserMenu } from "@/context/UserMenuContext";
import { useSidebar } from "@/context/SidebarContext";
import { useClickOutside } from "@/hooks/useClickOutside";

const menus = [
  { label: "Dashboard", icon: "dashboard", href: "/cattery/dashboard" },
  { label: "My Cats", icon: "cat", href: "/cattery/my-cats" },
  { label: "Applications", icon: "news", href: "/cattery/applications" },
  { label: "Mating Reports", icon: "mating", href: "/cattery/mating-reports" },
  { label: "Documents", icon: "news", href: "/cattery/documents" },
  { label: "Leaderboard", icon: "trophy", href: "/cattery/leaderboard" },
  { label: "Events", icon: "calendar", href: "/cattery/event" },
  { label: "Store", icon: "shopping-cart", href: "/cattery/store" },
];

const secondaryMenus = [
  { label: "Profil Cattery", icon: "home", href: "/cattery/profil" },
  { label: "Settings", icon: "settings", href: "/cattery/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { openMenu, toggleMenu, closeMenu } = useUserMenu();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = openMenu === "sidebar";

  useClickOutside(containerRef, () => {
    if (isOpen) closeMenu();
  });

  const handleLogout = () => {
    closeMenu();
    router.push("/auth/login/cattery");
  };

  const renderMenu = (menu: (typeof menus)[number]) => {
    const isActive =
      menu.href === "/cattery"
        ? pathname === menu.href
        : pathname === menu.href || pathname.startsWith(`${menu.href}/`);

    return (
      <Link
        key={menu.label}
        href={menu.href}
        title={!isSidebarOpen ? menu.label : undefined}
        className={`flex items-center rounded-lg py-2.5 text-[13px] font-sans font-semibold transition ${
          isSidebarOpen ? "gap-3 pl-3 pr-3" : "justify-center px-0"
        } ${
          isActive
            ? isSidebarOpen
              ? "border-l-[3px] border-[var(--color-brand-orange-500)] shadow-sm bg-gradient-to-r from-[var(--color-brand-orange-100)] to-white text-[var(--color-brand-orange-700)]"
              : "bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)]"
            : "text-[var(--color-ink-700)] hover:bg-[var(--color-brand-orange-50)]"
        }`}
      >
        <DashboardIcon
          name={menu.icon}
          size={17}
          className={
            isActive
              ? "text-[var(--color-brand-orange-700)]"
              : "text-[var(--color-ink-700)]"
          }
        />
        {isSidebarOpen && <span>{menu.label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={`hidden lg:flex shrink-0 flex-col border-r border-[var(--color-ink-100)] bg-[var(--color-sidebar)] transition-all duration-200 h-screen sticky top-0 ${
        isSidebarOpen ? "w-[240px]" : "w-[64px]"
      }`}
    >
      {/* Header Sidebar */}
      <div
        className={`flex h-[54px] items-center border-b border-[var(--color-ink-100)] ${
          isSidebarOpen ? "justify-between gap-3 px-4" : "justify-center px-2"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="flex shrink-0 items-center gap-3 rounded-md transition cursor-pointer"
          aria-label={isSidebarOpen ? "" : "Open sidebar"}
          title={isSidebarOpen ? "" : "Open sidebar"}
        >
          <Image
            src="/images/LOGO-ICA.webp"
            alt="ICA Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          {isSidebarOpen && (
            <span className="font-display text-sm font-semibold text-[var(--color-ink-900)]">
              Cattery Portal
            </span>
          )}
        </button>

        {isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="flex h-7 w-6 shrink-0 items-center justify-center rounded-md text-[#F05A1B] hover:text-[#D95D1E] transition hover:bg-[var(--color-brand-orange-50)] cursor-pointer"
            aria-label="Close sidebar"
            title="Close sidebar"
          >
            <DashboardIcon name="panel" size={17} className="text-[#F05A1B]" />
          </button>
        )}
      </div>

      {/* Navigasi Utama */}
      <nav className={`flex-1 overflow-y-auto py-3 ${isSidebarOpen ? "px-3" : "px-2"}`}>
        <div className="space-y-1">{menus.map(renderMenu)}</div>

        <div className="mt-4 border-t border-[var(--color-ink-100)] pt-4">
          <div className="space-y-1">{secondaryMenus.map(renderMenu)}</div>
        </div>
      </nav>

      {/* Profile / Avatar User Desktop */}
      <div
        ref={containerRef}
        className={`relative border-t border-[var(--color-ink-100)] p-3 bg-[var(--color-sidebar)] shrink-0 ${
          !isSidebarOpen && "flex justify-center"
        }`}
      >
        <button
          onClick={() => toggleMenu("sidebar")}
          className={`flex items-center rounded-lg p-1.5 transition hover:bg-[var(--color-brand-orange-50)] cursor-pointer ${
            isSidebarOpen ? "w-full gap-2.5" : "justify-center"
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[11px] font-medium text-[var(--color-brand-orange-700)]">
            RH
          </div>

          {isSidebarOpen && (
            <>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-[12px] font-semibold text-[var(--color-ink-900)]">
                  Rumah Hana Cattery
                </p>
                <p className="text-[10px] text-[var(--color-ink-400)]">
                  Cattery · Bandung
                </p>
              </div>
              <DashboardIcon name="chevron" size={14} className="text-[var(--color-ink-700)]" />
            </>
          )}
        </button>

        {isOpen && (
          <CatteryUserMenuDropdown
            position="top"
            widthClass={isSidebarOpen ? "inset-x-0" : "left-0 w-64"}
            onNavigate={closeMenu}
            onLogout={handleLogout}
          />
        )}
      </div>
    </aside>
  );
}