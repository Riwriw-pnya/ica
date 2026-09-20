"use client";

import Link from "next/link";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import { regionalAdminProfile } from "@/data/regionalAdmin";

interface UserMenuDropdownProps {
  position?: "top" | "bottom";
  widthClass?: string;
  onNavigate?: () => void;
  onLogout?: () => void;
}

export default function UserMenuDropdown({
  position = "bottom",
  widthClass = "right-0 w-64",
  onNavigate,
  onLogout,
}: UserMenuDropdownProps) {
  const positionClasses =
    position === "top"
      ? "bottom-full mb-2"
      : "top-full mt-2";

  return (
    <div
      className={`absolute ${positionClasses} ${widthClass} z-50 rounded-2xl border border-[#efe9e2] bg-white p-3 shadow-xl transition-all`}
    >
      {/* Header Profile Info */}
      <div className="px-2 py-1.5 border-b border-[#f3efe9] mb-2">
        <p className="text-xs font-bold text-[#1a1817]">
          {regionalAdminProfile.name}
        </p>
        <p className="text-[11px] text-[#8c857b] truncate mt-0.5">
          {regionalAdminProfile.email}
        </p>
        <span className="inline-block mt-1 rounded-full bg-[#fff8f3] border border-[#fde8d7] px-2 py-0.5 text-[10px] font-bold text-[#ee6b28]">
          {regionalAdminProfile.role} - {regionalAdminProfile.region}
        </span>
      </div>

      {/* Links */}
      <div className="space-y-1">
        <Link
          href="/regionaladmin/profil"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#1a1817] hover:bg-[#faf8f5] transition"
        >
          <DashboardIcon name="users" size={16} />
          <span>Profil saya</span>
        </Link>

        <Link
          href="/regionaladmin/pengaturan"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#1a1817] hover:bg-[#faf8f5] transition"
        >
          <DashboardIcon name="panel" size={16} />
          <span>Pengaturan akun</span>
        </Link>
      </div>

      {/* Logout */}
      <div className="mt-2 pt-2 border-t border-[#f3efe9]">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#dc2626] hover:bg-[#fef2f2] transition cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );
}