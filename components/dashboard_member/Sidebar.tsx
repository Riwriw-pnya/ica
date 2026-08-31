"use client";

import DashboardIcon from "./DashboardIcon";

const menus = [
  {
    label: "Beranda",
    icon: "dashboard",
    active: true,
  },
  {
    label: "Berita",
    icon: "news",
  },
  {
    label: "Direktori Cattery",
    icon: "users",
  },
  {
    label: "Keanggotaan",
    icon: "shield",
  },
  {
    label: "Event",
    icon: "calendar",
  },
  {
    label: "Leaderboard",
    icon: "trophy",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-[208px] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-sidebar)] lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-[54px] items-center gap-3 border-b border-[var(--color-border)] px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-brand-orange-500)] text-xs font-bold text-white">
          ICA
        </div>

        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
          Member Portal
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2.5 py-3">
        <div className="space-y-1">
          {menus.map((menu) => (
            <button
              key={menu.label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] transition ${
                menu.active
                  ? "bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-brand-orange-100)] hover:text-[var(--color-brand-orange-700)]"
              }`}
            >
              <DashboardIcon name={menu.icon} size={17} />
              <span>{menu.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom profile */}
      <div className="border-t border-[var(--color-border)] p-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[11px] font-medium text-[var(--color-brand-orange-700)]">
            AP
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-[var(--color-text-primary)]">
              Ayu Prameswari
            </p>
            <p className="text-[10px] text-[var(--color-text-muted)]">
              Member · Jawa Barat
            </p>
          </div>

          <DashboardIcon name="chevron" size={14} />
        </div>
      </div>
    </aside>
  );
}