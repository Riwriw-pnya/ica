"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import DashboardIcon from "../../anggota/DashboardIcon";
import NotificationDropdown from "../NotificationDropdown";
import CatteryUserMenuDropdown from "../CatteryUserMenuDropdown";
import type { NotificationItem } from "@/types/cattery";
import { useClickOutside } from "@/hooks/useClickOutside";

export type MenuSource = "header" | "sidebar" | "notifications";

interface DesktopHeaderProps {
  title: string;
  isDashboard: boolean;
  isMatingReportForm: boolean;
  isNotifications: boolean;
  customAction: (() => void) | null;
  unreadCount: number;
  notifications: NotificationItem[];
  initials: string;
  openMenu: MenuSource | null;
  toggleMenu: (menu: MenuSource) => void;
  closeMenu: () => void;
  onMarkAllRead: () => void;
  onMarkOneRead: (id: string) => void;
  onCartClick: () => void;
  onLogout: () => void;
}

export default function DesktopHeader({
  title,
  isDashboard,
  isMatingReportForm,
  isNotifications,
  customAction,
  unreadCount,
  notifications,
  initials,
  openMenu,
  toggleMenu,
  closeMenu,
  onMarkAllRead,
  onMarkOneRead,
  onCartClick,
  onLogout,
}: DesktopHeaderProps) {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const isUserMenuOpen = openMenu === "header";
  const isNotifOpen = openMenu === "notifications";

  useClickOutside(containerRef, () => {
    if (isUserMenuOpen) closeMenu();
  });

  useClickOutside(notifRef, () => {
    if (isNotifOpen) closeMenu();
  });

  return (
    <div className="hidden md:flex w-full items-center justify-between">
      {/* SISI KIRI DESKTOP */}
      <div className="flex items-center gap-3">
        <h1 className="font-display text-base font-bold text-[#231A14]">
          {title}
        </h1>

        {isMatingReportForm && (
          <span className="rounded-full bg-[#EFEFEF] px-2.5 py-0.5 text-[10px] font-medium text-[#7A6E65]">
            Draft
          </span>
        )}
      </div>

      {/* SISI KANAN DESKTOP */}
      <div className="flex items-center gap-4 justify-end">
        {isNotifications ? (
          <button 
            type="button" 
            onClick={onMarkAllRead} 
            className="text-xs font-bold text-[#F05A1B] hover:text-[#D95D1E] cursor-pointer"
          >
            Tandai semua dibaca
          </button>
        ) : (
          <>
            {isDashboard && (
              <button
                type="button"
                onClick={() => router.push("/cattery/mating-reports")}
                className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
              >
                + Buat Mating Report
              </button>
            )}

            {!isMatingReportForm && (
              <button
                type="button"
                onClick={onCartClick}
                className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#231A14] hover:bg-[#FAF7F2] transition cursor-pointer"
                aria-label="Store Cart Desktop"
              >
                <svg className="w-4 h-4 text-[#231A14]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 000-4z" />
                </svg>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D95D1E] text-[9px] font-bold text-white">
                  1
                </span>
              </button>
            )}

            {isMatingReportForm && (
              <>
                <span className="text-[11px] text-[#A89F95]">
                  Tersimpan otomatis 14:32
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if (customAction) customAction();
                  }}
                  className="cursor-pointer rounded-full border border-[#EE6B28] px-4 py-1.5 text-[12px] font-medium text-[#EE6B28] transition hover:bg-[#FFF2E8] active:scale-95"
                >
                  Simpan draft
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/cattery/dashboard")}
                  className="text-[12px] font-medium text-[#7A6E65] hover:text-[#231A14] mr-1 cursor-pointer"
                >
                  Keluar
                </button>
              </>
            )}

            {/* Dropdown Notifikasi */}
            <div ref={notifRef} className="relative">
              <button
                type="button"
                onClick={() => toggleMenu("notifications")}
                className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#231A14] transition hover:bg-[#FAF7F2] cursor-pointer"
                aria-label="Notifikasi Desktop"
              >
                <DashboardIcon name="bell" size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D95D1E] px-1 text-[9px] font-bold leading-none text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <NotificationDropdown
                  notifications={notifications}
                  onMarkAllRead={onMarkAllRead}
                  onMarkOneRead={onMarkOneRead}
                  onClose={closeMenu}
                />
              )}
            </div>

            {/* Dropdown User Menu */}
            <div ref={containerRef} className="relative">
              <button
                type="button"
                onClick={() => toggleMenu("header")}
                className="cursor-pointer flex items-center gap-1.5 rounded-lg transition-all hover:opacity-80"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFE8DB] text-[11px] font-bold text-[#D95D1E] shrink-0">
                  {initials}
                </div>
                <span className="text-[#6E6359] flex items-center pr-1">
                  <DashboardIcon name="chevron" size={12} />
                </span>
              </button>

              {isUserMenuOpen && (
                <CatteryUserMenuDropdown
                  position="bottom"
                  widthClass="w-64 right-0"
                  onNavigate={closeMenu}
                  onLogout={onLogout}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}