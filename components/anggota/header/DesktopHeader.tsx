"use client";

import { useRef } from "react";
import DashboardIcon from "../DashboardIcon";
import UserMenuDropdown from "../UserMenuDropdown";
import { useUserMenu } from "@/context/UserMenuContext";
import { useClickOutside } from "@/hooks/useClickOutside";

interface DesktopHeaderProps {
  desktopTitle: string;
  cartCount: number;
  onCartClick: (e: React.MouseEvent) => void;
  onLogout: () => void;
}

export default function DesktopHeader({
  desktopTitle,
  cartCount,
  onCartClick,
  onLogout,
}: DesktopHeaderProps) {
  const { openMenu, toggleMenu, closeMenu } = useUserMenu();
  const containerRef = useRef<HTMLDivElement>(null);
  const isUserMenuOpen = openMenu === "header";

  useClickOutside(containerRef, () => {
    if (isUserMenuOpen) closeMenu();
  });

  return (
    <div className="hidden md:flex w-full items-center justify-between h-13.5">
      {/* Judul Desktop */}
      <h1 className="font-display text-sm font-semibold text-[#231A14]">
        {desktopTitle}
      </h1>

      {/* Action Right Desktop */}
      <div className="flex items-center gap-3">
        {/* Cart Icon Desktop */}
        <button
        type="button"
        onClick={onCartClick}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2D7CC] bg-white text-[#231A14] transition hover:bg-[#FAF7F5] cursor-pointer active:scale-95 shrink-0 shadow-xs"
        aria-label="Keranjang"
        >
        <svg className="w-4.5 h-4.5 text-[#1F1B18]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>

        {/* Badge dot oranye dengan angka putih */}
        {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#EE6B28] text-white text-[9px] font-bold leading-none border border-white shadow-xs">
            {cartCount}
            </span>
        )}
        </button>

        {/* Profile Dropdown Desktop */}
        <div ref={containerRef} className="relative">
          <button
            type="button"
            onClick={() => toggleMenu("header")}
            className={`flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 transition-all cursor-pointer active:scale-98 ${
              isUserMenuOpen ? "bg-[#FFF2E8]" : "bg-white hover:bg-[#FFF2E8]"
            }`}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FEE4CC] text-[10px] font-bold text-[#A85822] shrink-0">
              AP
            </div>
            <div className="flex flex-col text-left leading-tight pr-0.5">
              <span className="text-xs font-bold text-[#1A1513]">
                Ayu Prameswari
              </span>
              <span className="text-[10px] font-medium text-[#8C8074]">
                ICA-M-004821
              </span>
            </div>
            <span className="text-[#8C8074] flex items-center pl-0.5">
              <DashboardIcon name="chevron" size={12} />
            </span>
          </button>

          {isUserMenuOpen && (
            <UserMenuDropdown
              position="bottom"
              widthClass="w-64 right-0"
              onNavigate={closeMenu}
              onLogout={onLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
}