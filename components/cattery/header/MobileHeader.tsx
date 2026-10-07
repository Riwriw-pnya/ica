"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardIcon from "../../anggota/DashboardIcon";
import NotificationDrawer from "../NotificationMobile";

interface MobileHeaderProps {
  title: string;
  headerTitle: string | null;
  headerSubTitle: string | null;
  isCatDetailPage: boolean;
  isApplicationDetailPage: boolean;
  isDraftPage?: boolean;
  isNotifications: boolean;
  isMatingReportForm: boolean;
  isProfile: boolean;
  isProfileMobile: boolean;
  isEventsPage?: boolean;
  isStorePage: boolean;
  unreadCount: number;
  initials: string;
  catteryName: string;
  catteryRegion: string;
  onCartClick: () => void;
}

export default function MobileHeader({
  title,
  headerTitle,
  headerSubTitle,
  isCatDetailPage,
  isApplicationDetailPage,
  isDraftPage = false,
  isNotifications,
  isMatingReportForm,
  isProfile,
  isProfileMobile,
  isEventsPage = false,
  isStorePage,
  unreadCount,
  initials,
  catteryName,
  catteryRegion,
  onCartClick,
}: MobileHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDraftMode = searchParams.get("draft");

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleOpenNotif = () => setIsNotifOpen(true);
    window.addEventListener("open-mobile-notif", handleOpenNotif);
    return () => window.removeEventListener("open-mobile-notif", handleOpenNotif);
  }, []);

  const isSubPageWithBack =
    isProfile ||
    isEventsPage ||
    title === "Documents" ||
    title === "Leaderboard" ||
    title === "Store" ||
    title === "Settings";

  const showBackButton =
    isNotifications ||
    isMatingReportForm ||
    isCatDetailPage ||
    isApplicationDetailPage ||
    isDraftPage ||
    isSubPageWithBack;

  return (
    <>
      <div className="flex md:hidden w-full items-center justify-between">
        {/* SISI KIRI: BACK BUTTON & TITLE */}
        <div className="flex items-center gap-2">
          {showBackButton && (
            <button
              type="button"
              onClick={() => {
                if (isCatDetailPage) {
                  router.push("/cattery/my-cats");
                } else if (isDraftPage || isApplicationDetailPage || (isMatingReportForm && !isDraftMode)) {
                  router.push("/cattery/applications");
                } else if (isMatingReportForm && isDraftMode) {
                  router.push("/cattery/draft");
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
              {isApplicationDetailPage
                ? "Detail Aplikasi"
                : isDraftPage
                ? "Drafts"
                : isCatDetailPage && headerTitle
                ? headerTitle
                : title}
            </h1>

            {(isDraftPage || isApplicationDetailPage) && (
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
                {unreadCount} belum dibaca
              </span>
            )}

            {(isProfile || isProfileMobile) && (
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
        <div className="flex items-center gap-2.5">
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
                  <button
                    type="button"
                    onClick={onCartClick}
                    className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[#231A14] hover:bg-[#FAF7F2] transition cursor-pointer"
                    aria-label="Store Cart Mobile"
                  >
                    <svg className="w-5 h-5 text-[#231A14]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 000-4z" />
                    </svg>
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#D95D1E] text-[9px] font-bold text-white shadow-xs">
                      1
                    </span>
                  </button>

                  {/* Tombol Notifikasi Mobile */}
                  <button
                    type="button"
                    onClick={() => setIsNotifOpen(true)}
                    className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[#231A14] transition hover:bg-[#FAF7F2] cursor-pointer"
                    aria-label="Notifikasi Mobile"
                  >
                    <DashboardIcon name="bell" size={20} />
                    {mounted && unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D95D1E] px-1 text-[9px] font-bold leading-none text-white shadow-xs">
                        {unreadCount}
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

      {/* DRAWER NOTIFIKASI MOBILE */}
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
}