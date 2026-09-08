"use client";

import { useRouter } from "next/navigation";
import type { NotificationItem } from "@/types/cattery";

interface NotificationDropdownProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onMarkOneRead: (id: string) => void;
  onClose?: () => void;
}

export default function NotificationDropdown({
  notifications,
  onMarkAllRead,
  onMarkOneRead,
  onClose,
}: NotificationDropdownProps) {
  const router = useRouter();

  // Fungsi untuk menangani klik pada salah satu notifikasi
  const handleItemClick = (notif: NotificationItem) => {
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
    <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-[var(--color-ink-100)] bg-white shadow-lg">
      <div className="flex items-center justify-between border-b border-[var(--color-ink-100)] px-4 py-3">
        <p className="font-display text-[13px] font-semibold text-[var(--color-ink-900)]">Notifikasi</p>
        <button
          onClick={onMarkAllRead}
          className="text-[11px] font-medium text-[var(--color-brand-orange-700)] hover:underline"
        >
          Tandai semua dibaca
        </button>
      </div>

      <div className="max-h-80 divide-y divide-[var(--color-ink-100)] overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="p-6 text-center text-[12px] text-[var(--color-ink-400)]">
            Belum ada notifikasi.
          </p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleItemClick(notif)}
              className={`flex cursor-pointer gap-2.5 px-4 py-3 transition hover:bg-[var(--color-ink-50)] ${
                !notif.isRead ? "bg-[var(--color-brand-orange-50)]" : ""
              }`}
            >
              <span
                className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                  notif.isRead ? "bg-transparent" : "bg-[var(--color-brand-orange-500)]"
                }`}
              />
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-[var(--color-ink-900)]">{notif.title}</p>
                <p className="mt-0.5 text-[11px] text-[var(--color-ink-700)]">{notif.message}</p>
                <p className="mt-1 text-[10px] text-[var(--color-ink-400)]">{notif.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}