"use client";

import React from "react";
import { useRouter } from "next/navigation";

export interface MemberNotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  url?: string;
}

interface MemberNotificationDropdownProps {
  notifications: MemberNotificationItem[];
  onMarkAllRead: () => void;
  onMarkOneRead: (id: string) => void;
  onClose?: () => void;
}

export default function MemberNotificationDropdown({
  notifications,
  onMarkAllRead,
  onMarkOneRead,
  onClose,
}: MemberNotificationDropdownProps) {
  const router = useRouter();

  const handleItemClick = (notif: MemberNotificationItem) => {
    if (!notif.isRead) {
      onMarkOneRead(notif.id);
    }

    if (onClose) {
      onClose();
    }

    if (notif.url) {
      router.push(notif.url);
    }
  };

  return (
    <div
      className="
        fixed inset-x-4 top-16 z-50 mx-auto w-[calc(100vw-2rem)] max-w-sm rounded-xl border border-[#EDE3DA] bg-white shadow-xl
        sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 sm:w-80 sm:max-w-none
      "
    >
      <div className="flex items-center justify-between border-b border-[#F0E8E2] px-4 py-3">
        <p className="font-display text-[13px] font-semibold text-[#231A14]">
          Notifikasi
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onMarkAllRead();
          }}
          className="text-[11px] font-medium text-[#EE6B28] hover:underline cursor-pointer"
        >
          Tandai semua dibaca
        </button>
      </div>

      <div className="max-h-80 divide-y divide-[#F5EEE9] overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="p-6 text-center text-[12px] text-[#8C8074]">
            Belum ada notifikasi.
          </p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleItemClick(notif)}
              className={`flex cursor-pointer gap-2.5 px-4 py-3 transition hover:bg-[#FFF8F3] ${
                !notif.isRead ? "bg-transparent" : ""
              }`}
            >
              {/* Dot Oranye (Hanya tampil jika belum dibaca) */}
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                  notif.isRead ? "bg-transparent" : "bg-[#EE6B28]"
                }`}
              />
              <div className="min-w-0">
                <p
                  className={`text-[12px] ${
                    notif.isRead ? "font-normal text-[#524B43]" : "font-bold text-[#231A14]"
                  }`}
                >
                  {notif.title}
                </p>
                <p className="mt-0.5 text-[11px] text-[#8C8074]">
                  {notif.message}
                </p>
                <p className="mt-1 text-[10px] text-[#B0A49B]">{notif.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}