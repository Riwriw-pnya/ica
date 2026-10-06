"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardIcon from "@/components/anggota/DashboardIcon";

export interface NotificationItem {
  id: number;
  title: string;
  desc: string;
  time: string;
  isUnread: boolean;
  link: string;
  category: "HARI INI" | "SEBELUMNYA";
}

const mockNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "MR-2026-0138 perlu revisi",
    desc: "Admin ICA wilayah Bandung meminta sertifikat induk yang lebih jelas.",
    time: "15 menit lalu",
    isUnread: true,
    link: "/cattery/applications",
    category: "HARI INI",
  },
  {
    id: 2,
    title: "Pesanan ICA-ST-2026-0902 dikirim",
    desc: "SiCepat REG - resi 0023 8841 7720.",
    time: "2 jam lalu",
    isUnread: true,
    link: "/cattery/store",
    category: "HARI INI",
  },
  {
    id: 3,
    title: "Vaksin Rabies Kirana belum diberikan",
    desc: "Jadwal disarankan Okt 2026. Booking lewat Mitra Klinik Pelihara.",
    time: "Kemarin · 08:00",
    isUnread: true,
    link: "/cattery/my-cats/2",
    category: "SEBELUMNYA",
  },
  {
    id: 4,
    title: "Pendaftaran ICA Cat Show Bandung 2026 dibuka",
    desc: "Kuota Cattery tersisa 2 slot.",
    time: "23 Sep 2026",
    isUnread: true,
    link: "/cattery/event",
    category: "SEBELUMNYA",
  },
];

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => n.isUnread).length;
  const todayNotifs = notifications.filter((n) => n.category === "HARI INI");
  const previousNotifs = notifications.filter((n) => n.category === "SEBELUMNYA");

  const handleNotifClick = (id: number, link: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isUnread: false } : item))
    );
    onClose();
    router.push(link);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isUnread: false })));
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#F8F6F2] flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
      }`}
    >
      {/* Header Slide-over */}
      <div className="flex items-center justify-between border-b border-[#EEDFD5] bg-white px-4 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="text-[#F05A1B] hover:text-[#D95D1E] cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h2 className="font-bold text-sm text-[#1A1513]">Notifikasi</h2>
            <p className="text-[10px] text-[#8C8074]">
              {unreadCount > 0 ? `${unreadCount} belum dibaca` : "Semua telah dibaca"}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            className="text-[11px] font-bold text-[#F05A1B] hover:text-[#D95D1E] transition-colors cursor-pointer"
          >
            Tandai semua dibaca
          </button>
        )}
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {todayNotifs.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-[10px] font-extrabold text-[#A09488] tracking-wider uppercase px-1">
              HARI INI
            </h3>
            <div className="rounded-2xl border border-[#EEDFD5] bg-white divide-y divide-[#EEDFD5] overflow-hidden">
              {todayNotifs.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotifClick(item.id, item.link)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    item.isUnread ? "bg-[#FFF8F2]" : "bg-white"
                  }`}
                >
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center border shrink-0 ${
                      item.isUnread
                        ? "bg-[#FFF2E8] border-[#FCE3D2] text-[#F05A1B]"
                        : "bg-[#FAF7F2] border-[#EEDFD5] text-[#8C8074]"
                    }`}
                  >
                    <DashboardIcon name="bell" size={18} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className={`text-xs font-bold ${item.isUnread ? "text-[#1A1513]" : "text-[#70665D]"}`}>
                        {item.title}
                      </h4>
                      {item.isUnread && <span className="h-2 w-2 rounded-full bg-[#F05A1B] shrink-0 mt-1" />}
                    </div>
                    <p className="text-[11px] text-[#8C8074] leading-relaxed mt-0.5">{item.desc}</p>
                    <span className="text-[9px] text-[#A09488] block mt-1">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {previousNotifs.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-[10px] font-extrabold text-[#A09488] tracking-wider uppercase px-1">
              SEBELUMNYA
            </h3>
            <div className="rounded-2xl border border-[#EEDFD5] bg-white divide-y divide-[#EEDFD5] overflow-hidden">
              {previousNotifs.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotifClick(item.id, item.link)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    item.isUnread ? "bg-[#FFF8F2]" : "bg-white"
                  }`}
                >
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center border shrink-0 ${
                      item.isUnread
                        ? "bg-[#FFF2E8] border-[#FCE3D2] text-[#F05A1B]"
                        : "bg-[#FAF7F2] border-[#EEDFD5] text-[#8C8074]"
                    }`}
                  >
                    <DashboardIcon name="bell" size={18} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className={`text-xs font-bold ${item.isUnread ? "text-[#1A1513]" : "text-[#70665D]"}`}>
                        {item.title}
                      </h4>
                      {item.isUnread && <span className="h-2 w-2 rounded-full bg-[#F05A1B] shrink-0 mt-1" />}
                    </div>
                    <p className="text-[11px] text-[#8C8074] leading-relaxed mt-0.5">{item.desc}</p>
                    <span className="text-[9px] text-[#A09488] block mt-1">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}