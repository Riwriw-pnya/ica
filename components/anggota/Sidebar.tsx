"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "./DashboardIcon";
import UserMenuDropdown from "./UserMenuDropdown";
import { useUserMenu } from "@/context/UserMenuContext";
import { useSidebar } from "@/context/SidebarContext";
import { useClickOutside } from "@/hooks/useClickOutside";

const menus = [
  { label: "Beranda", icon: "dashboard", href: "/anggota" },
  { label: "Berita", icon: "news", href: "/anggota/berita" },
  { label: "Direktori Cattery", icon: "users", href: "/anggota/direktori" },
  { label: "Keanggotaan", icon: "shield", href: "/anggota/keanggotaan" },
  { label: "Event", icon: "calendar", href: "/anggota/event" },
  { label: "Leaderboard", icon: "trophy", href: "/anggota/leaderboard" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { openMenu, toggleMenu, closeMenu } = useUserMenu();
  const { isSidebarOpen } = useSidebar();
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = openMenu === "sidebar";

  useClickOutside(containerRef, () => {
    if (isOpen) closeMenu();
  });

  const handleLogout = () => {
    closeMenu();
    router.push("/auth/login/member");
  };

  return (
    <aside
      className={`flex shrink-0 flex-col overflow-hidden border-r border-[var(--color-ink-100)] bg-[var(--color-sidebar)] transition-all duration-200 ${
        isSidebarOpen ? "w-[208px]" : "w-0 border-r-0"
      }`}
    >
      <div className="flex w-[208px] flex-1 flex-col">
        {/* Logo */}
        <div className="flex h-[54px] items-center gap-3 border-b border-[var(--color-ink-100)] px-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-brand-orange-500)] text-xs font-bold text-white">
            ICA
          </div>
          <span className="font-display text-sm font-semibold text-[var(--color-ink-900)]">
            Member Portal
          </span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-2.5 py-3">
          <div className="space-y-1">
            {menus.map((menu) => {
              const isActive =
                menu.href === "/anggota"
                  ? pathname === menu.href
                  : pathname === menu.href || pathname.startsWith(`${menu.href}/`);

              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={`flex w-full items-center gap-3 rounded-lg py-2.5 pl-[9px] pr-3 text-left text-[13px] transition ${
                    isActive
                      ? "border-l-[3px] border-[var(--color-brand-orange-500)] bg-gradient-to-r from-[var(--color-brand-orange-100)] to-white text-[var(--color-brand-orange-700)]"
                      : "text-[var(--color-ink-700)] hover:bg-[var(--color-brand-orange-100)] hover:text-[var(--color-brand-orange-700)]"
                  }`}
                >
                  <DashboardIcon name={menu.icon} size={17} />
                  <span>{menu.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom profile */}
        <div ref={containerRef} className="relative border-t border-[var(--color-ink-100)] p-3">
          <button
            onClick={() => toggleMenu("sidebar")}
            className="flex w-full items-center gap-2 rounded-lg p-1 transition hover:bg-[var(--color-brand-orange-50)]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[11px] font-medium text-[var(--color-brand-orange-700)]">
              AP
            </div>

            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-[12px] font-semibold text-[var(--color-ink-900)]">
                Ayu Prameswari
              </p>
              <p className="text-[10px] text-[var(--color-ink-400)]">
                Member · Jawa Barat
              </p>
            </div>

            <DashboardIcon name="chevron" size={14} />
          </button>

          {isOpen && (
            <UserMenuDropdown
              position="top"
              widthClass="inset-x-0"
              onNavigate={closeMenu}
              onLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </aside>
  );
}