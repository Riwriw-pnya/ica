"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardIcon from "../../anggota/DashboardIcon";

interface MobileHeaderProps {
  title: string;
  headerTitle: string | null;
  headerSubTitle: string | null;
  isCatDetailPage: boolean;
  isApplicationDetailPage: boolean;
  isNotifications: boolean;
  isMatingReportForm: boolean;
  isProfile: boolean;
  isStorePage: boolean; 
  unreadCount: number;
  initials: string;
  catteryName: string;
  catteryRegion: string;
  onCartClick: () => void;
} 

interface NotificationItem {
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
];

export default function MobileHeader({
  title,
  headerTitle,
  headerSubTitle,
  isCatDetailPage,
  isApplicationDetailPage,
  isNotifications,
  isMatingReportForm,
  isProfile,
  isStorePage,
  unreadCount,
  initials,
  catteryName,
  catteryRegion,
  onCartClick,
}: MobileHeaderProps) {
  const router = useRouter();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  
  // Mencegah Mismatch Hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Hitung jumlah unread
  const localUnreadCount = notifications.filter((n) => n.isUnread).length;
  // Saat SSR/awal mount pakai unreadCount dari props, setelah mounted pakai localUnreadCount
  const displayUnreadCount = mounted ? localUnreadCount : unreadCount;

  const handleNotifClick = (id: number, link: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isUnread: false } : item))
    );
    setIsNotifOpen(false);
    router.push(link);
  };

  return (
    <>
      <div className="flex md:hidden w-full items-center justify-between">
        {/* SISI KIRI: CHEVRON BACK ORANGE & JUDUL */}
        <div className="flex items-center gap-2">
          {(isNotifications || isMatingReportForm || isCatDetailPage || isApplicationDetailPage) && (
            <button
              type="button"
              onClick={() => {
                if (isCatDetailPage) {
                  router.push("/cattery/my-cats");
                } else if (isApplicationDetailPage) {
                  router.push("/cattery/applications");
                } else {
                  router.back();
                }
              }}
              className="text-[#F05A1B] hover:text-[#D95D1E] active:scale-95 transition-all cursor-pointer -ml-1 mr-0.5"
              aria-label="Kembali"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div className="flex flex-col">
            <h1 className="font-display text-sm font-bold text-[#231A14]">
              {isApplicationDetailPage ? "Detail Aplikasi" : isCatDetailPage && headerTitle ? headerTitle : title}
            </h1>

            {isApplicationDetailPage && (
              <span className="text-[10px] text-[#8C8074] font-medium leading-none mt-0.5">
                Kembali ke applications
              </span>
            )}

            {isCatDetailPage && headerSubTitle && (
              <span className="text-[10px] text-[#8C8074] font-medium leading-none mt-0.5">
                {headerSubTitle}
              </span>
            )}

            {isNotifications && (
              <span className="text-[10px] text-[#8C8074] font-medium leading-none mt-0.5">
                {displayUnreadCount} belum dibaca
              </span>
            )}

            {isProfile && (
              <span className="text-[10px] text-[#8C8074] font-medium leading-none mt-0.5">
                {catteryName} · Cattery
              </span>
            )}

            {isMatingReportForm && (
              <span className="text-[10px] text-[#8C8074] font-medium leading-none mt-0.5">
                {catteryName} · {catteryRegion}
              </span>
            )}
          </div>
        </div>

        {/* SISI KANAN: ACTIONS MOBILE */}
        <div className="flex items-center gap-3">
          {isNotifications ? null : (
            <>
              {isMatingReportForm ? (
                <Link
                  href="/cattery/draft"
                  className="text-xs font-semibold text-[#1a1513] hover:text-[#EE6B28] transition-colors"
                >
                  Draft
                </Link>
              ) : (
                <>
                  {/* Cart Icon Mobile */}
                  {isStorePage && (
                    <button
                      type="button"
                      onClick={onCartClick}
                      className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[#231A14] hover:bg-[#FAF7F2] transition cursor-pointer"
                      aria-label="Store Cart Mobile"
                    >
                      <svg className="w-5 h-5 text-[#231A14]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 000-4z" />
                      </svg>
                      <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#D95D1E] text-[9px] font-bold text-white">
                        1
                      </span>
                    </button>
                  )}

                  {/* Tombol Notifikasi Mobile */}
                  <button
                    type="button"
                    onClick={() => setIsNotifOpen(true)}
                    className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[#231A14] transition hover:bg-[#FAF7F2] cursor-pointer"
                    aria-label="Notifikasi Mobile"
                  >
                    <DashboardIcon name="bell" size={20} />
                    {displayUnreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D95D1E] px-1 text-[9px] font-bold leading-none text-white shadow-xs">
                        {displayUnreadCount}
                      </span>
                    )}
                  </button>

                  {/* Avatar Mobile */}
                  <div className="flex items-center px-0.5 select-none pointer-events-none">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFE8DB] text-[10px] font-bold text-[#D95D1E] shrink-0">
                      {initials}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* SLIDE OVER PANEL NOTIFIKASI MOBILE */}
      <div
        className={`fixed inset-0 z-50 bg-[#F8F6F2] flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          isNotifOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#EEDFD5] bg-white px-4 py-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsNotifOpen(false)}
              className="text-[#F05A1B] hover:text-[#D95D1E] cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h2 className="font-bold text-sm text-[#1A1513]">Notifikasi</h2>
              <p className="text-[10px] text-[#8C8074]">
                {displayUnreadCount > 0 ? `${displayUnreadCount} belum dibaca` : "Semua telah dibaca"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-[10px] font-extrabold text-[#A09488] tracking-wider uppercase px-1">
              HARI INI
            </h3>
            <div className="rounded-2xl border border-[#EEDFD5] bg-white divide-y divide-[#EEDFD5] overflow-hidden">
              {notifications.map((item) => (
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
        </div>
      </div>
    </>
  );
}