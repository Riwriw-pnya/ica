"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  badge?: number;
  icon: React.ReactNode;
}

interface NavGroup {
  items: NavItem[];
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navGroups: NavGroup[] = [
    {
      items: [
        {
          label: "Dashboard",
          href: "/regionaladmin/dashboard",
          icon: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          ),
        },
        {
          label: "Applications",
          href: "/regionaladmin/applications",
          badge: 3,
          icon: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
        },
      ],
    },
    {
      items: [
        {
          label: "Members",
          href: "/regionaladmin/members",
          icon: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
        },
        {
          label: "Catteries",
          href: "/regionaladmin/catteries",
          icon: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          ),
        },
        {
          label: "Cats",
          href: "/regionaladmin/cats",
          icon: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
        {
          label: "Payments",
          href: "/regionaladmin/payments",
          badge: 2,
          icon: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          label: "Events",
          href: "/regionaladmin/events",
          icon: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <aside
      className={`bg-white border-r border-[#EFE9E1] h-screen flex flex-col justify-between flex-shrink-0 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header / Logo */}
        <div className="p-4 flex items-center justify-between border-b border-[#F2EFE9] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EE6B28] flex items-center justify-center font-bold text-white text-xs shadow-sm">
              ICA
            </div>
            {!isCollapsed && (
              <span className="font-bold text-base text-[#231A14] tracking-tight">
                Regional Admin
              </span>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md text-[#C27231] hover:bg-[#FFF8F3] transition cursor-pointer"
            title="Toggle Sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 4v16" />
            </svg>
          </button>
        </div>

        {/* Navigation Items - Jarak kelompok menggunakan space-y-5 tanpa garis */}
        <nav className="p-3 flex-1 overflow-y-auto space-y-5">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#FFF8F3] text-[#C25115]"
                        : "text-[#5C5046] hover:bg-[#FAF8F5] hover:text-[#231A14]"
                    }`}
                  >
                    {/* Active Indicator Line di Sebelah Kiri */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#EE6B28] rounded-r-full" />
                    )}

                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className={isActive ? "text-[#D95A19]" : "text-[#7A6E65]"}>
                        {item.icon}
                      </span>
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-bold ml-2 ${
                          isActive
                            ? "bg-[#FFEAD8] text-[#C25115]"
                            : "bg-[#EFE9E1] text-[#7A6E65]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Profile */}
      <div className="p-3 border-t border-[#F2EFE9] flex-shrink-0">
        <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-[#FAF8F5] transition cursor-pointer">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#FFE3D1] text-[#EE6B28] flex items-center justify-center font-bold text-xs flex-shrink-0">
              RN
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <div className="font-bold text-xs text-[#231A14] truncate">Dewi Larasati</div>
                <div className="text-[10px] text-[#8C8078] truncate">Regional Admin · Bandung</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}