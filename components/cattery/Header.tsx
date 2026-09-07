"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import CatteryUserMenuDropdown from "./CatteryUserMenuDropdown";
import { useUserMenu } from "@/context/UserMenuContext";
import { useSidebar } from "@/context/SidebarContext";
import { useClickOutside } from "@/hooks/useClickOutside";

const pageTitles: Record<string, string> = {
  "/cattery": "Dashboard",
  "/cattery/my-cats": "My Cats",
  "/cattery/applications": "Applications",
  "/cattery/mating-reports": "Buat Mating Reports",
  "/cattery/documents": "Documents",
  "/cattery/leaderboard": "Leaderboard",
  "/cattery/events": "Events",
  "/cattery/profil": "Profil Cattery",
  "/cattery/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  const match = Object.keys(pageTitles)
    .filter((p) => p !== "/cattery/mating-reports" && pathname.startsWith(`${p}/`))
    .sort((a, b) => b.length - a.length)[0];
  return match ? pageTitles[match] : "Dashboard";
}

// Tipe data notifikasi
interface NotificationItem {
  id: string;
  type: "news" | "event" | "pedigree" | "mating";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

// Dummy data notifikasi awal
const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "event",
    title: "Event Terbaru",
    message: "Cat Show Internasional 2026 telah dibuka untuk pendaftaran peserta!",
    time: "2 jam yang lalu",
    isRead: false,
  },
  {
    id: "2",
    type: "pedigree",
    title: "Update Pedigree",
    message: "Pengajuan dokumen pedigree #PED-8831 telah disetujui.",
    time: "1 hari yang lalu",
    isRead: false,
  },
  {
    id: "3",
    type: "mating",
    title: "Update Mating Report",
    message: "Laporan mating #MR-104 membutuhkan verifikasi ulang foto bukti.",
    time: "2 hari yang lalu",
    isRead: true,
  },
];

export default function Header() {
  const { openMenu, toggleMenu, closeMenu } = useUserMenu();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  
  // State untuk Notifikasi
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  
  const isMatingReportForm = pathname.startsWith("/cattery/mating-reports");
  const isOpen = openMenu === "header";

  // Hitung berapa notifikasi yang belum dibaca
  const unreadCount = notifications.filter((item) => !item.isRead).length;

  // Closes dropdown ketika mengklik luar area
  useClickOutside(containerRef, () => {
    if (isOpen) closeMenu();
  });

  useClickOutside(notifRef, () => {
    if (isNotifOpen) setIsNotifOpen(false);
  });

  const title = getPageTitle(pathname);

  const handleLogout = () => {
    closeMenu();
    router.push("/auth/login/cattery");
  };

  // Fungsi untuk menandai semua notifikasi telah dibaca
  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  // Fungsi untuk menandai 1 notifikasi spesifik telah dibaca saat di-klik
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  // Helper untuk warna badge tipe notifikasi
  const getTypeBadge = (type: NotificationItem["type"]) => {
    switch (type) {
      case "event":
        return <span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-semibold text-purple-700">Event</span>;
      case "pedigree":
        return <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">Pedigree</span>;
      case "mating":
        return <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">Mating</span>;
      default:
        return null;
    }
  };

  return (
    <header className="flex h-[54px] items-center justify-between border-b border-[var(--color-ink-100)] bg-white px-5">
      <div className="flex items-center gap-3">
        {!isSidebarOpen && (
          <button onClick={toggleSidebar} className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--color-ink-700)] transition hover:bg-[var(--color-brand-orange-50)]" aria-label="Tampilkan sidebar">
            <DashboardIcon name="panel" size={17} />
          </button>
        )}
        <h1 className="font-display text-sm font-semibold text-[var(--color-ink-900)]">{title}</h1>
        {isMatingReportForm && (
          <span className="rounded-full bg-[var(--color-ink-100)] px-2.5 py-0.5 text-[10px] font-medium text-[var(--color-ink-700)]">
            Draft
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        {isMatingReportForm && (
          <>
            <span className="text-[11px] text-[var(--color-ink-400)]">Tersimpan otomatis 14:32</span>
            <button className="rounded-full border border-[var(--color-brand-orange-300)] px-4 py-1.5 text-[12px] font-medium text-[var(--color-brand-orange-700)] transition hover:bg-[var(--color-brand-orange-50)]">
              Simpan draft
            </button>
            <button
              onClick={() => router.push("/cattery")}
              className="text-[12px] font-medium text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)]"
            >
              Keluar
            </button>
          </>
        )}

        {/* --- FITUR NOTIFIKASI --- */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              if (isOpen) closeMenu();
            }}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-ink-700)] transition hover:bg-[var(--color-brand-orange-50)]"
            aria-label="Notifikasi"
          >
            {/* SVG Icon Lonceng */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 0 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 0-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>

            {/* Titik Merah (Indicator unread) */}
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
            )}
          </button>

          {/* Card Popover Notifikasi */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-[var(--color-ink-100)] bg-white shadow-lg ring-1 ring-black/5 z-50 overflow-hidden">
              {/* Header Card Notifikasi */}
              <div className="flex items-center justify-between border-b border-[var(--color-ink-100)] bg-neutral-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-[var(--color-ink-900)]">Notifikasi</h3>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-[var(--color-brand-orange-100)] px-2 py-0.5 text-[10px] font-bold text-[var(--color-brand-orange-700)]">
                      {unreadCount} baru
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-[11px] font-sans font-medium text-[var(--color-brand-orange-700)] transition hover:text-[var(--color-brand-orange-700)] hover:underline"
                  >
                    Tandai telah dibaca
                  </button>
                )}
              </div>

              {/* Daftar Isi Notifikasi */}
              <div className="max-h-[360px] overflow-y-auto divide-y divide-[var(--color-ink-100)]">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[var(--color-ink-400)]">
                    Tidak ada notifikasi
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleMarkAsRead(item.id)}
                      className={`cursor-pointer p-3.5 transition hover:bg-neutral-50 ${
                        !item.isRead ? "border-l-2 border-[var(--color-brand-orange-100)] bg-gradient-to-r from-[var(--color-brand-orange-50)] to-white" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {getTypeBadge(item.type)}
                          <p className="text-xs font-semibold text-[var(--color-ink-900)]">
                            {item.title}
                          </p>
                        </div>
                        <span className="text-[10px] text-[var(--color-ink-400)] whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-[var(--color-ink-700)]">
                        {item.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* --- MENU PROFIL USER --- */}
        <div ref={containerRef} className="relative">
          <button
            onClick={() => {
              toggleMenu("header");
              if (isNotifOpen) setIsNotifOpen(false);
            }}
            className="flex items-center gap-2.5 rounded-lg px-1.5 py-1 transition hover:bg-[var(--color-brand-orange-50)]"
          > 
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[11px] font-medium text-[var(--color-brand-orange-700)]">
              RH
            </div>
            <DashboardIcon name="chevron" size={14} />
          </button>

          {isOpen && (
            <CatteryUserMenuDropdown
              position="bottom"
              widthClass="w-64 right-0"
              onNavigate={closeMenu}
              onLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </header>
  );
}