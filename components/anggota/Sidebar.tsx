"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const { isSidebarOpen, toggleSidebar } = useSidebar();
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
      className={`flex shrink-0 flex-col border-r border-[var(--color-ink-100)] bg-[var(--color-sidebar)] transition-all duration-200 ${
        isSidebarOpen ? "w-[208px]" : "w-[64px]"
      }`}
    >
      {/* Logo — sekaligus tombol toggle */}
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
              Member Portal
            </span>
          )}
        </button>

        {isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="flex h-7 w-6 shrink-0 items-center justify-center rounded-md text-[#db874b] transition hover:bg-[var(--color-brand-orange-50)] cursor-pointer"
            aria-label="Close sidebar"
            title="Close sidebar"
          >
            <DashboardIcon name="panel" size={17} />
          </button>
        )}
      </div>

      {/* Menu */}
      <nav className={`flex-1 py-3 ${isSidebarOpen ? "px-2.5" : "px-2"}`}>
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

      {/* Bottom profile */}
      <div
        ref={containerRef}
        className={`relative border-t border-[var(--color-ink-100)] p-3 ${
          !isSidebarOpen && "flex justify-center"
        }`}
      >
        <button
          onClick={() => toggleMenu("sidebar")}
          className={`flex items-center rounded-lg p-1 transition hover:bg-[var(--color-brand-orange-50)] ${
            isSidebarOpen ? "w-full gap-2" : "justify-center"
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[11px] font-medium text-[var(--color-brand-orange-700)]">
            AP
          </div>

          {isSidebarOpen && (
            <>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-[12px] font-semibold text-[var(--color-ink-900)]">
                  Ayu Prameswari
                </p>
                <p className="text-[10px] text-[var(--color-ink-400)]">
                  Member · Jawa Barat
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