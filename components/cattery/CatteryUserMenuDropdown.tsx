"use client";

import Link from "next/link";
import DashboardIcon from "@/components/anggota/DashboardIcon";

interface CatteryUserMenuDropdownProps {
  position?: "top" | "bottom";
  widthClass?: string;
  onNavigate: () => void;
  onLogout: () => void;
}

export default function CatteryUserMenuDropdown({
  position = "bottom",
  widthClass = "w-64 right-0",
  onNavigate,
  onLogout,
}: CatteryUserMenuDropdownProps) {
  return (
    <div
      className={`absolute z-50 ${widthClass} rounded-xl border border-[var(--color-ink-100)] bg-white p-2 shadow-lg ${
        position === "top" ? "bottom-full mb-2" : "top-full mt-2"
      }`}
    >
      <div className="border-b border-[var(--color-ink-100)] px-3 py-2.5">
        <p className="font-display text-[13px] font-semibold text-[var(--color-ink-900)]">
          Rumah Hana Cattery
        </p>
        <p className="text-[11px] text-[var(--color-ink-400)]">Cattery · Bandung</p>
      </div>

      <div className="py-1.5">
        <Link
          href="/cattery/profil"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-[var(--color-ink-700)] transition hover:bg-[var(--color-brand-orange-50)]"
        >
          <DashboardIcon name="home" size={16} />
          Profil Cattery
        </Link>

        <Link
          href="/cattery/settings"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-[var(--color-ink-700)] transition hover:bg-[var(--color-brand-orange-50)]"
        >
          <DashboardIcon name="settings" size={16} />
          Settings
        </Link>
      </div>

      <div className="border-t border-[var(--color-ink-100)] pt-1.5">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] text-[var(--color-danger)] transition hover:bg-[var(--color-danger-bg)]"
        >
          <DashboardIcon name="logout" size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}