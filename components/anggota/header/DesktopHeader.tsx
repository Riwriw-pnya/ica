"use client";

import { useRef, useState, useEffect } from "react";

import DashboardIcon from "../DashboardIcon";

import UserMenuDropdown from "../UserMenuDropdown";

import MemberNotificationDropdown, {
  MemberNotificationItem,
} from "./MemberNotification";

import { useClickOutside } from "@/hooks/useClickOutside";

export type MenuSource = "header" | "notifications";

interface DesktopHeaderProps {
  desktopTitle: string;
  cartCount: number;
  onCartClick: (e: React.MouseEvent) => void;
  unreadCount?: number;
  unreadNotificationCount?: number;
  notifications?: MemberNotificationItem[];
  openMenu?: MenuSource | null;
  toggleMenu?: (menu: MenuSource) => void;
  closeMenu?: () => void;
  onMarkAllRead?: () => void;
  onMarkOneRead?: (id: string) => void;
  onOpenNotification?: () => void;
  onLogout?: () => void;
}

const DEFAULT_NOTIFICATIONS: MemberNotificationItem[] = [
  {
    id: "1",
    title: "Pesanan merchandise sedang diproses",
    message: "Pesanan MRC-2026-0231 sedang dikemas oleh sekretariat ICA.",
    time: "5 menit lalu",
    isRead: false,
    url: "/anggota/log-aktivitas",
  },
  {
    id: "2",
    title: "Event ICA tersedia",
    message: "Pendaftaran event terbaru ICA telah dibuka.",
    time: "1 jam lalu",
    isRead: false,
    url: "/anggota/event",
  },
];

export default function DesktopHeader({
  desktopTitle,
  cartCount,
  onCartClick,
  unreadCount,
  unreadNotificationCount,
  notifications = DEFAULT_NOTIFICATIONS,
  openMenu: externalOpenMenu,
  toggleMenu: externalToggleMenu,
  closeMenu: externalCloseMenu,
  onMarkAllRead,
  onMarkOneRead,
  onOpenNotification,
  onLogout = () => {},
}: DesktopHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const [internalOpenMenu, setInternalOpenMenu] =
    useState<MenuSource | null>(null);

  const [localNotifications, setLocalNotifications] =
    useState<MemberNotificationItem[]>(notifications);

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  const activeOpenMenu =
    externalOpenMenu !== undefined
      ? externalOpenMenu
      : internalOpenMenu;

  const handleToggleMenu = (menu: MenuSource) => {
    if (externalToggleMenu) {
      externalToggleMenu(menu);
    } else {
      setInternalOpenMenu((prev) =>
        prev === menu ? null : menu
      );
    }
  };

  const handleCloseMenu = () => {
    if (externalCloseMenu) {
      externalCloseMenu();
    } else {
      setInternalOpenMenu(null);
    }
  };

  const isUserMenuOpen = activeOpenMenu === "header";
  const isNotifOpen = activeOpenMenu === "notifications";

  useClickOutside(containerRef, () => {
    if (isUserMenuOpen) {
      handleCloseMenu();
    }
  });

  useClickOutside(notifRef, () => {
    if (isNotifOpen) {
      handleCloseMenu();
    }
  });

  const handleMarkAllRead = () => {
    if (onMarkAllRead) {
      onMarkAllRead();
    }

    setLocalNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        isRead: true,
      }))
    );
  };

  const handleMarkOneRead = (id: string) => {
    if (onMarkOneRead) {
      onMarkOneRead(id);
    }

    setLocalNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isRead: true,
            }
          : item
      )
    );
  };

  const currentUnreadCount =
    localNotifications.filter((n) => !n.isRead).length;

  return (
    <div className="hidden md:flex h-13.5 w-full items-center justify-between">
      {/* SISI KIRI DESKTOP */}
      <h1 className="font-display text-sm font-semibold text-[#231A14]">
        {desktopTitle}
      </h1>

      {/* SISI KANAN DESKTOP */}
      <div className="flex items-center gap-3">
        {/* Cart */}
        <button
          type="button"
          onClick={onCartClick}
          className="relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#1F1B18] transition hover:bg-[#F8F3EF] active:scale-95"
          aria-label="Keranjang"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>

          {cartCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-[#EE6B28] px-0.5 text-[8px] font-bold leading-none text-white">
              {cartCount}
            </span>
          )}
        </button>

        {/* Dropdown Notifikasi Member */}
        <div ref={notifRef} className="relative z-50">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();

              if (onOpenNotification) {
                onOpenNotification();
              }

              handleToggleMenu("notifications");
            }}
            className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#1F1B18] transition hover:bg-[#F8F3EF] active:scale-95"
            aria-label="Notifikasi"
          >
            <svg
              className="pointer-events-none h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>

            {currentUnreadCount > 0 && (
              <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-[#EE6B28] px-0.5 text-[8px] font-bold leading-none text-white">
                {currentUnreadCount > 9
                  ? "9+"
                  : currentUnreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <MemberNotificationDropdown
              notifications={localNotifications}
              onMarkAllRead={handleMarkAllRead}
              onMarkOneRead={handleMarkOneRead}
              onClose={handleCloseMenu}
            />
          )}
        </div>

        {/* User Menu */}
        <div ref={containerRef} className="relative z-50">
          <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleToggleMenu("header");
          }}
          className="flex h-9 w-[66px] cursor-pointer items-center justify-between rounded-full border border-[#D8C9BA] bg-gradient-to-b from-white to-[#F3ECE4] px-2 shadow-[0_2px_5px_rgba(0,0,0,0.07)] transition-all hover:border-[#CBB8A7] hover:from-white hover:to-[#EEE5DB] active:scale-[0.98]"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FFD09F] to-[#F27A32] text-[10px] font-bold text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.45),0_1px_3px_rgba(0,0,0,0.08)]">
            RH
          </div>

          <span className="flex items-center justify-center pr-1 text-[#D95D1E]">
            <DashboardIcon
              name="chevron"
              size={10}
            />
          </span>
        </button>

          {isUserMenuOpen && (
            <UserMenuDropdown
              position="bottom"
              widthClass="w-64 right-0"
              onNavigate={handleCloseMenu}
              onLogout={onLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
}