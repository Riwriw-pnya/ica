"use client";

import { useState, useEffect } from "react";
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

  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const [isMobileNotifOpen, setIsMobileNotifOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  // Sync jumlah cart secara realtime dari StoreMemberPage
  useEffect(() => {
    const handleCartUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ count: number }>;

      if (typeof customEvent.detail?.count === "number") {
        setCartCount(customEvent.detail.count);
      }
    };

    window.addEventListener("cart-count-updated", handleCartUpdate);

    return () => {
      window.removeEventListener("cart-count-updated", handleCartUpdate);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        isRead: true,
      }))
    );
  };

  const handleMarkOneRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              isRead: true,
            }
          : n
      )
    );
  };

  const isDashboardMobile = pathname === "/anggota/dashboard";

  return (
    <UserMenuProvider>
      <SidebarProvider>
        <div className="relative flex h-screen overflow-hidden bg-[#F7F4EF]">
          {/* Sidebar Desktop */}
          <div className="hidden bg-[var(--color-sidebar)] lg:block">
            <Sidebar />
          </div>

          <div className="relative flex h-full min-w-0 flex-1 flex-col">
            {/* Header */}
            <div
              className={
                isDashboardMobile ? "hidden lg:block" : "block"
              }
            >
              <Header
                cartCount={cartCount}
                unreadNotificationCount={unreadCount}
                onOpenMobileNotif={() =>
                  setIsMobileNotifOpen(true)
                }
              />
            </div>

            {/* Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F7F4EF] px-0 py-0 sm:px-6 sm:py-4 lg:px-8 lg:py-4 lg:pb-8">
              {children}
            </main>
          </div>

          {/* Bottom Navigation Mobile */}
          <div className="lg:hidden">
            <BottomNav />
          </div>

          {/* Mobile Notification */}
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