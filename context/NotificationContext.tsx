"use client";

import React, { createContext, useContext, useState } from "react";
import { initialNotifications } from "@/data/anggota";
import type { NotificationItem } from "@/types/cattery";

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  isMobileNotifOpen: boolean;
  setIsMobileNotifOpen: (open: boolean) => void;
  handleMarkAllRead: () => void;
  handleMarkOneRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
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

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isMobileNotifOpen,
        setIsMobileNotifOpen,
        handleMarkAllRead,
        handleMarkOneRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}