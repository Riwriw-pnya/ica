"use client";

import Link from "next/link";
import DashboardIcon from "./DashboardIcon";

interface UserMenuDropdownProps {
  position?: "top" | "bottom";
  widthClass?: string;
  onNavigate: () => void;
  onLogout: () => void;
}

export default function UserMenuDropdown({
  position = "bottom",
  widthClass = "w-64 right-0",
  onNavigate,
  onLogout,
}: UserMenuDropdownProps) {
  return (
    <div
      className={`absolute z-50 ${widthClass} rounded-xl border border-[var(--color-ink-100)] bg-white p-2 shadow-lg ${
        position === "top" ? "bottom-full mb-2" : "top-full mt-2"
      }`}
    >
      <div className="border-b border-[var(--color-ink-100)] px-3 py-2.5">
        <p className="font-heading text-[13px] font-semibold text-[var(--color-ink-900)]">
          Ayu Prameswari
        </p>
        <p className="text-[11px] text-[var(--color-ink-400)]">
          ICA-M-004821 · Member
        </p>
      </div>

      <div className="py-1.5">
        <Link
          href="/dashboard_member/keanggotaan"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-[var(--color-ink-700)] transition hover:bg-[var(--color-brand-orange-50)]"
        >
          <DashboardIcon name="user" size={16} />
          Lihat profil
        </Link>

        <Link
          href="/dashboard_member/pengaturan"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-[var(--color-ink-700)] transition hover:bg-[var(--color-brand-orange-50)]"
        >
          <DashboardIcon name="settings" size={16} />
          Pengaturan akun
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