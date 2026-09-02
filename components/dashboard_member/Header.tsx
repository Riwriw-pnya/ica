"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import DashboardIcon from "./DashboardIcon";
import UserMenuDropdown from "./UserMenuDropdown";
import { useUserMenu } from "@/context/UserMenuContext";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function Header() {
  const { openMenu, toggleMenu, closeMenu } = useUserMenu();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, closeMenu);

  const isOpen = openMenu === "header";

  const handleLogout = () => {
    closeMenu();
    router.push("/auth/login/member");
  };

  return (
    <header className="flex h-[54px] items-center justify-between border-b border-[var(--color-ink-100)] bg-white px-5">
      <h1 className="font-heading text-sm font-semibold text-[var(--color-ink-900)]">
        Beranda
      </h1>

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