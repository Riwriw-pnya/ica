"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import UserMenuDropdown from "../anggota/UserMenuDropdown";
import { useUserMenu } from "@/context/UserMenuContext";
import { useSidebar } from "@/context/SidebarContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { regionalAdminProfile } from "@/data/regionalAdmin";

const menus = [
  { label: "Dashboard", icon: "dashboard", href: "/regionaladmin/dashboard" },
  { label: "Applications", icon: "news", href: "/regionaladmin/applications" },
  { label: "Members", icon: "users", href: "/regionaladmin/members" },
  { label: "Catteries", icon: "home", href: "/regionaladmin/catteries" },
  { label: "Cats", icon: "cat", href: "/regionaladmin/cats" },
  { label: "Payments", icon: "payment", href: "/regionaladmin/payments" },
  { label: "Events", icon: "calendar", href: "/regionaladmin/events" },
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
    router.push("/auth/login/regional-admin");
  };

  const initials = regionalAdminProfile.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-[var(--color-ink-100)] bg-[var(--color-sidebar)] transition-all duration-200 ${
        isSidebarOpen ? "w-[208px]" : "w-[64px]"
      }`}
    >
      {/* Top Brand & Toggle Button (Poin 2 & 3) */}
      <div
        className={`flex h-[64px] items-center ${
          isSidebarOpen ? "justify-between pl-4 pr-3" : "justify-center px-2"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="flex shrink-0 items-center gap-2.5 rounded-md transition"
          aria-label={isSidebarOpen ? "Sembunyikan sidebar" : "Tampilkan sidebar"}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--color-brand-orange-500)] text-xs font-bold text-white">
            ICA
          </div>
          {isSidebarOpen && (
            <span className="font-display text-sm font-semibold text-[var(--color-ink-900)] truncate">
              Regional Admin
            </span>
          )}
        </button>

        {isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[var(--color-brand-orange-700)]/50 transition hover:bg-[var(--color-brand-orange-50)]"
            aria-label="Sembunyikan sidebar"
          >
            <DashboardIcon name="panel" size={18} />
          </button>
        )}
      </div>

      {/* Navigation Menus */}
      <nav className={`flex-1 py-2 ${isSidebarOpen ? "px-2.5" : "px-2"}`}>
        <div className="space-y-1">
          {menus.map((menu) => {
            const isActive =
              menu.href === "/regionaladmin/dashboard"
                ? pathname === menu.href
                : pathname === menu.href || pathname.startsWith(`${menu.href}/`);

            return (
              <Link
                key={menu.href}
                href={menu.href}
                title={!isSidebarOpen ? menu.label : undefined}
                className={`flex items-center rounded-lg py-2.5 text-[13px] font-sans font-semibold transition ${
                  isSidebarOpen ? "gap-3 pl-[9px] pr-3" : "justify-center px-0"
                } ${
                  isActive
                    ? isSidebarOpen
                      ? "border-l-[3px] border-[var(--color-brand-orange-500)] bg-gradient-to-r from-[var(--color-brand-orange-100)] to-white text-[var(--color-brand-orange-700)]"
                      : "bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)]"
                    : "text-[var(--color-ink-700)] hover:bg-[var(--color-brand-orange-50)]"
                }`}
              >
                <DashboardIcon name={menu.icon} size={17} />
                {isSidebarOpen && <span>{menu.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Profil Mentok di Kiri Bawah (Poin 1) */}
      <div
        ref={containerRef}
        className={`relative mt-auto border-t border-[var(--color-ink-100)] p-3 ${
          !isSidebarOpen && "flex justify-center"
        }`}
      >
        <button
          onClick={() => toggleMenu("sidebar")}
          className={`flex items-center rounded-lg p-1 transition hover:bg-[var(--color-brand-orange-50)] ${
            isSidebarOpen ? "w-full gap-2" : "justify-center"
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[11px] font-bold text-[var(--color-brand-orange-700)]">
            {initials}
          </div>

          {isSidebarOpen && (
            <>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-[12px] font-semibold text-[var(--color-ink-900)]">
                  {regionalAdminProfile.name}
                </p>
                <p className="truncate text-[10px] text-[var(--color-ink-400)]">
                  {regionalAdminProfile.role} · {regionalAdminProfile.region}
                </p>
              </div>
              <DashboardIcon name="chevron" size={14} />
            </>
          )}
        </button>

        {isOpen && (
          <UserMenuDropdown
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