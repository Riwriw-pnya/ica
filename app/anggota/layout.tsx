"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/anggota/Sidebar";
import Header from "@/components/anggota/Header";
import BottomNav from "@/components/anggota/BottomNav"; 
import MobileNotification from "@/components/anggota/MobileNotification";
import { UserMenuProvider } from "@/context/UserMenuContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { initialNotifications } from "@/data/anggota";
import type { NotificationItem } from "@/types/cattery";

export default function AnggotaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [isMobileNotifOpen, setIsMobileNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleMarkOneRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Cek apakah saat ini sedang berada di halaman dashboard mobile
  const isDashboardMobile = pathname === "/anggota/dashboard";

  return (
    <UserMenuProvider>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden bg-[#faf8f5] relative">
          
          {/* Sidebar (Desktop) */}
          <div className="hidden lg:block bg-[var(--color-sidebar)]">
            <Sidebar />
          </div>

          <div className="flex min-w-0 flex-1 flex-col h-full relative">
            {/* Header: Sembunyikan di mobile HANYA KETIKA di halaman dashboard. Di halaman lain tetap tampil. */}
            <div className={isDashboardMobile ? "hidden lg:block" : "block"}>
              <Header 
                unreadNotificationCount={unreadCount}
                onOpenMobileNotif={() => setIsMobileNotifOpen(true)} 
              />
            </div>

            <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#faf8f5] px-0 sm:px-6 lg:px-8 py-0 sm:py-4 pb-24 lg:pb-8">
              {children}
            </main>
          </div>

          {/* Bottom Navigation (Mobile) */}
          <div className="lg:hidden">
            <BottomNav />
          </div>

          {/* Mobile Notification Slide-in */}
          <MobileNotification
            isOpen={isMobileNotifOpen}
            onClose={() => setIsMobileNotifOpen(false)}
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
            onMarkOneRead={handleMarkOneRead}
          />

        </div>
      </SidebarProvider>
    </UserMenuProvider>
  );
}