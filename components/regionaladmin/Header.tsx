"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import UserMenuDropdown from "./RegionalUserMenuDropdown";
import { useUserMenu } from "@/context/UserMenuContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { regionalAdminProfile, regionalNotifications } from "@/data/regionalAdmin";

export default function Header() {
    const router = useRouter();
    const { openMenu, toggleMenu, closeMenu } = useUserMenu();
    const [showNotifications, setShowNotifications] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const isProfileOpen = openMenu === "header";

    useClickOutside(notifRef, () => setShowNotifications(false));
    useClickOutside(profileRef, () => {
        if (isProfileOpen) closeMenu();
    });

    const handleLogout = () => {
        closeMenu();
        router.push("/auth/login/regional-admin");
    };

    const unreadCount = regionalNotifications.filter((n) => !n.isRead).length;

    const initials = regionalAdminProfile.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <header className="sticky top-0 z-20 flex h-[64px] shrink-0 items-center justify-between border-b border-[#efe9e2] bg-white px-6">
        {/* Search Bar */}
        <div className="flex flex-1 items-center max-w-md">
            <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#a39c94]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>
            <input
                type="text"
                placeholder="Cari nomor aplikasi, member, cattery"
                className="w-full rounded-xl border border-[#e8e2da] bg-[#faf8f5] py-2 pl-9 pr-4 text-xs font-sans text-[#1a1817] placeholder-[#a39c94] focus:border-[#ee6b28] focus:bg-white focus:outline-none transition-colors"
            />
            </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
            {/* Notification Bell & Card */}
            <div className="relative" ref={notifRef}>
            <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#e8e2da] bg-white text-[#5e5852] hover:bg-[#faf8f5] transition cursor-pointer"
                aria-label="Notifikasi"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ee6b28] text-[9px] font-bold text-white">
                    {unreadCount}
                </span>
                )}
            </button>

            {/* Regional Admin Notification Dropdown Card */}
            {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-[#efe9e2] bg-white p-4 shadow-xl z-50">
                <div className="flex items-center justify-between pb-3 border-b border-[#f3efe9]">
                    <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#1a1817]">Notifikasi Regional</h3>
                    <span className="rounded-full bg-[#fff8f3] border border-[#fde8d7] px-2 py-0.5 text-[10px] font-bold text-[#ee6b28]">
                        {regionalAdminProfile.region}
                    </span>
                    </div>
                    <span className="text-[11px] text-[#8c857b]">
                    {unreadCount} belum dibaca
                    </span>
                </div>

                <div className="mt-3 max-h-[320px] overflow-y-auto space-y-2.5 pr-1">
                    {regionalNotifications.map((item) => (
                    <div
                        key={item.id}
                        className={`p-3 rounded-xl border text-xs transition ${
                        item.isRead
                            ? "bg-[#faf8f5] border-[#f3efe9] text-[#5e5852]"
                            : "bg-[#fff8f3] border-[#fde8d7] text-[#1a1817]"
                        }`}
                    >
                        <div className="flex items-start justify-between gap-2">
                        <p className="font-bold text-[12px]">{item.title}</p>
                        <span className="shrink-0 text-[10px] text-[#a39c94]">{item.time}</span>
                        </div>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#5e5852]">{item.message}</p>
                    </div>
                    ))}
                </div>

                <div className="mt-3 pt-2 border-t border-[#f3efe9] text-center">
                    <Link
                    href="/regionaladmin/applications"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-semibold text-[#ee6b28] hover:underline"
                    >
                    Lihat Semua Antrean Wilayah
                    </Link>
                </div>
                </div>
            )}
            </div>

            {/* User Profile Menu */}
            <div className="relative" ref={profileRef}>
            <button
                onClick={() => toggleMenu("header")}
                className="flex items-center gap-2.5 rounded-xl border border-[#e8e2da] bg-white p-1.5 pr-3 hover:bg-[#faf8f5] transition cursor-pointer"
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fde8d7] text-xs font-bold text-[#ee6b28]">
                {initials}
                </div>
                <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-[#1a1817] leading-tight">{regionalAdminProfile.name}</p>
                <p className="text-[10px] text-[#8c857b]">{regionalAdminProfile.role} · {regionalAdminProfile.region}</p>
                </div>
                <DashboardIcon name="chevron" size={14} />
            </button>

            {isProfileOpen && (
                <UserMenuDropdown
                position="bottom"
                widthClass="right-0 w-64"
                onNavigate={closeMenu}
                onLogout={handleLogout}
                />
            )}
            </div>
        </div>
        </header>
    );
}