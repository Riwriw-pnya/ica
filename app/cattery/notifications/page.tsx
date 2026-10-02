"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface NotificationItem {
  id: number;
  title: string;
  desc: string;
  time: string;
  isUnread: boolean;
  link: string;
  category: "HARI INI" | "SEBELUMNYA";
}

const initialNotificationsData: NotificationItem[] = [
  {
    id: 1,
    title: "MR-2026-0138 perlu revisi",
    desc: "Admin ICA wilayah Bandung meminta sertifikat induk yang lebih jelas.",
    time: "15 menit lalu",
    isUnread: true,
    link: "/cattery/mating-reports",
    category: "HARI INI",
  },
  {
    id: 2,
    title: "Pesanan ICA-ST-2026-0902 dikirim",
    desc: "SiCepat REG - resi 0023 8841 7720.",
    time: "2 jam lalu",
    isUnread: true,
    link: "/cattery/orders",
    category: "HARI INI",
  },
  {
    id: 3,
    title: "Vaksin Rabies Kirana belum diberikan",
    desc: "Jadwal disarankan Okt 2026. Booking lewat Mitra Klinik Pelihara.",
    time: "Kemarin · 08:00",
    isUnread: true,
    link: "/cattery/my-cats/1",
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
  {
    id: 5,
    title: "MR-2026-0131 disetujui",
    desc: "Pedigree 5 kitten diterbitkan admin ICA.",
    time: "09 Agu 2026",
    isUnread: false,
    link: "/cattery/mating-reports",
    category: "SEBELUMNYA",
  },
];

const STORAGE_KEY = "cattery_notifications_state";

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-5 h-5"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotificationsData);
  const [isAnimated, setIsAnimated] = useState(false);

  // 1. CARA 2: Tunda 1 frame browser dengan requestAnimationFrame agar efek slide terdeteksi
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsAnimated(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // 2. Load state dari sessionStorage saat pertama kali halaman dimuat
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isPageRefreshed = performance.getEntriesByType("navigation").some(
        (nav: any) => nav.type === "reload"
      );

      if (isPageRefreshed) {
        sessionStorage.removeItem(STORAGE_KEY);
        setNotifications(initialNotificationsData);
      } else {
        const savedData = sessionStorage.getItem(STORAGE_KEY);
        if (savedData) {
          try {
            setNotifications(JSON.parse(savedData));
          } catch {
            setNotifications(initialNotificationsData);
          }
        }
      }
    }
  }, []);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  // 3. Efek slide-out sebelum pindah halaman
  const handleItemClick = (id: number, link: string) => {
    const updated = notifications.map((item) =>
      item.id === id ? { ...item, isUnread: false } : item
    );
    setNotifications(updated);

    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

    // Geser balik ke kanan dulu, baru jalankan router.push
    setIsAnimated(false);
    setTimeout(() => {
      router.push(link);
    }, 300); // Samakan dengan durasi duration-300
  };

  const todayItems = notifications.filter((n) => n.category === "HARI INI");
  const previousItems = notifications.filter((n) => n.category === "SEBELUMNYA");

  return (
    <div
      className={`min-h-screen bg-[#F8F6F2] font-sans pb-24 pt-3 px-4 transition-transform duration-300 ease-out transform ${
        isAnimated ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <main className="max-w-md mx-auto space-y-4">
        {/* Header Summary */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-[#8C8074]">
            {unreadCount > 0 ? `${unreadCount} belum dibaca` : "Semua telah dibaca"}
          </span>
        </div>

        {/* KELOMPOK HARI INI */}
        {todayItems.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-[10px] font-extrabold text-[#A09488] tracking-wider uppercase px-1">
              HARI INI
            </h2>

            <div className="rounded-3xl border border-[#EEDFD5] shadow-2xs divide-y divide-[#EEDFD5] overflow-hidden bg-white">
              {todayItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item.id, item.link)}
                  className={`p-4 flex items-start gap-3.5 cursor-pointer transition-colors ${
                    item.isUnread
                      ? "bg-[#FFF8F2] hover:bg-[#FFF2E8]"
                      : "bg-white hover:bg-[#FAF7F2]"
                  }`}
                >
                  {/* Icon Box */}
                  <div
                    className={`h-10 w-10 rounded-2xl flex items-center justify-center border shrink-0 transition-colors ${
                      item.isUnread
                        ? "bg-[#FFF2E8] border-[#FCE3D2] text-[#F05A1B]"
                        : "bg-[#FAF7F2] border-[#EEDFD5] text-[#8C8074]"
                    }`}
                  >
                    <BellIcon className="w-5 h-5" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`text-xs font-bold leading-tight ${
                          item.isUnread ? "text-[#1A1513]" : "text-[#70665D]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {item.isUnread && (
                        <span className="h-2 w-2 rounded-full bg-[#F05A1B] shrink-0 mt-0.5" />
                      )}
                    </div>

                    <p className="text-[11px] text-[#8C8074] leading-relaxed mt-1">
                      {item.desc}
                    </p>

                    <span className="inline-block text-[10px] text-[#A09488] font-medium mt-1.5">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KELOMPOK SEBELUMNYA */}
        {previousItems.length > 0 && (
          <div className="space-y-2 pt-2">
            <h2 className="text-[10px] font-extrabold text-[#A09488] tracking-wider uppercase px-1">
              SEBELUMNYA
            </h2>

            <div className="rounded-3xl border border-[#EEDFD5] shadow-2xs divide-y divide-[#EEDFD5] overflow-hidden bg-white">
              {previousItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item.id, item.link)}
                  className={`p-4 flex items-start gap-3.5 cursor-pointer transition-colors ${
                    item.isUnread
                      ? "bg-[#FFF8F2] hover:bg-[#FFF2E8]"
                      : "bg-white hover:bg-[#FAF7F2]"
                  }`}
                >
                  {/* Icon Box */}
                  <div
                    className={`h-10 w-10 rounded-2xl flex items-center justify-center border shrink-0 transition-colors ${
                      item.isUnread
                        ? "bg-[#FFF2E8] border-[#FCE3D2] text-[#F05A1B]"
                        : "bg-[#FAF7F2] border-[#EEDFD5] text-[#8C8074]"
                    }`}
                  >
                    <BellIcon className="w-5 h-5" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`text-xs font-bold leading-tight ${
                          item.isUnread ? "text-[#1A1513]" : "text-[#70665D]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {item.isUnread && (
                        <span className="h-2 w-2 rounded-full bg-[#F05A1B] shrink-0 mt-0.5" />
                      )}
                    </div>

                    <p className="text-[11px] text-[#8C8074] leading-relaxed mt-1">
                      {item.desc}
                    </p>

                    <span className="inline-block text-[10px] text-[#A09488] font-medium mt-1.5">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}