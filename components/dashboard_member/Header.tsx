"use client";

import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "./DashboardIcon";
import UserMenuDropdown from "./UserMenuDropdown";
import { useUserMenu } from "@/context/UserMenuContext";
import { useSidebar } from "@/context/SidebarContext";
import { useClickOutside } from "@/hooks/useClickOutside";

const pageTitles: Record<string, string> = {
  "/dashboard_member": "Beranda",
  "/dashboard_member/berita": "Berita",
  "/dashboard_member/direktori": "Direktori Cattery",
  "/dashboard_member/keanggotaan": "Keanggotaan",
  "/dashboard_member/event": "Event",
  "/dashboard_member/leaderboard": "Leaderboard",
  "/dashboard_member/pengaturan": "Pengaturan akun",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];

  // Cari prefix match terpanjang buat halaman detail/dinamis (mis. /berita/1)
  const match = Object.keys(pageTitles)
    .filter((path) => path !== "/dashboard_member" && pathname.startsWith(`${path}/`))
    .sort((a, b) => b.length - a.length)[0];

  return match ? pageTitles[match] : "Beranda";
}

export default function Header() {
  const { openMenu, toggleMenu, closeMenu } = useUserMenu();
  const { toggleSidebar } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = openMenu === "header";

  useClickOutside(containerRef, () => {
    if (isOpen) closeMenu();
  });
  const title = getPageTitle(pathname);

  const handleLogout = () => {
    closeMenu();
    router.push("/auth/login/member");
  };

  return (
    <header className="flex h-[54px] items-center justify-between border-b border-[var(--color-ink-100)] bg-white px-5">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-brand-orange-700)] transition hover:bg-[var(--color-brand-orange-50)]"
          aria-label="Toggle sidebar"
        >
          <DashboardIcon name="menu" size={18} />
        </button>

        <h1 className="font-heading text-sm font-semibold text-[var(--color-ink-900)]">
          {title}
        </h1>
      </div>

      <div ref={containerRef} className="relative">
        <button
          onClick={() => toggleMenu("header")}
          className="flex items-center gap-2.5 rounded-lg px-1.5 py-1 transition hover:bg-[var(--color-brand-orange-50)]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[11px] font-medium text-[var(--color-brand-orange-700)]">
            AP
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-[12px] font-semibold text-[var(--color-ink-900)]">
              Ayu Prameswari
            </p>
            <p className="text-[10px] text-[var(--color-ink-400)]">
              ICA-M-004821
            </p>
          </div>

          <DashboardIcon name="chevron" size={14} />
        </button>

        {isOpen && (
          <UserMenuDropdown
            position="bottom"
            widthClass="w-64 right-0"
            onNavigate={closeMenu}
            onLogout={handleLogout}
          />
        )}
      </div>
    </header>
  );
}