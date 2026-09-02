"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "./DashboardIcon";
import UserMenuDropdown from "./UserMenuDropdown";
import { useUserMenu } from "@/context/UserMenuContext";
import { useClickOutside } from "@/hooks/useClickOutside";

const menus = [
  { label: "Beranda", icon: "dashboard", href: "/dashboard_member" },
  { label: "Berita", icon: "news", href: "/dashboard_member/berita" },
  { label: "Direktori Cattery", icon: "users", href: "/dashboard_member/direktori" },
  { label: "Keanggotaan", icon: "shield", href: "/dashboard_member/keanggotaan" },
  { label: "Event", icon: "calendar", href: "/dashboard_member/event" },
  { label: "Leaderboard", icon: "trophy", href: "/dashboard_member/leaderboard" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { openMenu, toggleMenu, closeMenu } = useUserMenu();
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, closeMenu);

  const isOpen = openMenu === "sidebar";

  const handleLogout = () => {
    closeMenu();
    router.push("/auth/login/member");
  };

  return (
    <aside className="hidden w-[208px] shrink-0 border-r border-[var(--color-ink-100)] bg-[var(--color-sidebar)] lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-[54px] items-center gap-3 border-b border-[var(--color-ink-100)] px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-brand-orange-500)] text-xs font-bold text-white">
          ICA
        </div>

        <span className="font-heading text-sm font-semibold text-[var(--color-ink-900)]">
          Member Portal
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2.5 py-3">
        <div className="space-y-1">
          {menus.map((menu) => {
            const isActive =
              menu.href === "/dashboard_member"
                ? pathname === menu.href
                : pathname === menu.href || pathname.startsWith(`${menu.href}/`);

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`flex w-full items-center gap-3 rounded-lg py-2.5 pl-[9px] pr-3 text-left text-[13px] transition ${
                isActive
                  ? "border-[var(--color-brand-orange-500)] border-l-[3px] bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)]"
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
    </aside>
  );
}