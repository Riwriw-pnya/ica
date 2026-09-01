"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "./DashboardIcon";

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

  return (
    <aside className="hidden w-[208px] shrink-0 border-r border-[var(--color-ink-100)] bg-[var(--color-sidebar)] lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-[54px] items-center gap-3 border-b border-[var(--color-ink-100)] px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-brand-orange-500)] text-xs font-bold text-white">
          ICA
        </div>

        <span className="text-sm font-semibold text-[var(--color-ink-900)]">
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
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] transition ${
                isActive
                  ? "bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)]"
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
      <div className="border-t border-[var(--color-ink-100)] p-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[11px] font-medium text-[var(--color-brand-orange-700)]">
            AP
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-[var(--color-ink-900)]">
              Ayu Prameswari
            </p>
            <p className="text-[10px] text-[var(--color-ink-400)]">
              Member · Jawa Barat
            </p>
          </div>

          <DashboardIcon name="chevron" size={14} />
        </div>
      </div>
    </aside>
  );
}