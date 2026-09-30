"use client";

import { useState } from "react";
import DashboardIcon from "./DashboardIcon";
import type { NotificationItem } from "@/types/cattery";

interface ExtendedNotificationItem extends NotificationItem {
  category?: string;
  actionText?: string;
}

interface MobileNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onMarkOneRead: (id: string) => void;
}

export default function MobileNotification({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onMarkOneRead,
}: MobileNotificationProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  const items = notifications as ExtendedNotificationItem[];
  const unreadCount = items.filter((n) => !n.isRead).length;

  const getThemeStyle = (category?: string) => {
    const cat = (category || "").toLowerCase();
    if (cat.includes("event") || cat.includes("pesanan")) {
      return {
        iconBg: "bg-[#EAF6ED] text-[#28844B]",
        badgeBg: "bg-[#EAF6ED] text-[#28844B]",
      };
    } else if (cat.includes("pengajuan")) {
      return {
        iconBg: "bg-[#E5F0FA] text-[#1B6CA8]",
        badgeBg: "bg-[#E5F0FA] text-[#1B6CA8]",
      };
    } else if (cat.includes("keanggotaan")) {
      return {
        iconBg: "bg-[#FDF3E3] text-[#A67C1E]",
        badgeBg: "bg-[#FDF3E3] text-[#A67C1E]",
      };
    }
    return {
      iconBg: "bg-[#FFF2E8] text-[#D95D1E]",
      badgeBg: "bg-[#FFF2E8] text-[#D95D1E]",
    };
  };

  const handleConfirmMarkAll = () => {
    onMarkAllRead();
    setShowConfirmModal(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes panelSlideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes modalSlideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-panel-right {
          animation: panelSlideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-modal-slide {
          animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* Gunakan z-[9999] agar dipastikan berada di lapisan paling atas menutupi BottomNav sejak awal */}
      <div className="fixed inset-0 z-[9999] flex flex-col bg-[#FAF8F5] md:hidden animate-panel-right">
        {/* Header Slide */}
        <div className="flex items-center justify-between border-b border-[#EFE9E1] bg-white px-4 py-3 pt-[max(env(safe-area-inset-top),0.75rem)] shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#EFE9E1]/50 text-[#231A14] cursor-pointer"
              aria-label="Tutup"
            >
              <svg className="w-5 h-5 text-[#D95D1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-[18px] font-bold text-[#231A14] leading-tight">Notifikasi</h1>
              <p className="text-[11px] text-[#8C827A] mt-0.5">
                {unreadCount > 0 ? `${unreadCount} belum dibaca` : "Semua sudah dibaca"}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirmModal(true);
              }}
              className="text-xs font-semibold text-[#D95D1E] hover:underline cursor-pointer p-1"
            >
              Tandai
            </button>
          )}
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-28">
          {/* Bagian Hari Ini */}
          <div className="space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A]">
              Hari Ini
            </h2>

            {items.slice(0, 3).map((item) => {
              const theme = getThemeStyle(item.category || item.type);
              return (
                <div
                  key={item.id}
                  onClick={() => onMarkOneRead(item.id)}
                  className="relative rounded-2xl border border-[#EFE9E1] bg-white p-4 shadow-xs space-y-2.5 cursor-pointer transition hover:border-[#D1C2B3]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${theme.iconBg}`}>
                        <DashboardIcon name="bell" size={18} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#231A14]">{item.title}</h3>
                        <p className="mt-0.5 text-xs text-[#6E6359] leading-relaxed whitespace-pre-line">
                          {item.message}
                        </p>
                      </div>
                    </div>
                    {!item.isRead && (
                      <span className="h-2 w-2 rounded-full bg-[#D95D1E] shrink-0 mt-1" />
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#F7F3ED] text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-md px-2 py-0.5 font-semibold ${theme.badgeBg}`}>
                        {item.category || item.type || "Informasi"}
                      </span>
                      <span className="text-[#8C827A]">{item.time}</span>
                    </div>
                    <span className="font-semibold text-[#D95D1E] hover:underline flex items-center gap-1">
                      {item.actionText || "Detail"} &gt;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bagian Minggu Ini */}
          <div className="space-y-3 pt-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A]">
              Minggu Ini
            </h2>

            {items.slice(3).map((item) => {
              const theme = getThemeStyle(item.category || item.type);
              return (
                <div
                  key={item.id}
                  onClick={() => onMarkOneRead(item.id)}
                  className="relative rounded-2xl border border-[#EFE9E1] bg-white p-4 shadow-xs space-y-2.5 cursor-pointer transition hover:border-[#D1C2B3]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${theme.iconBg}`}>
                        <DashboardIcon name="bell" size={18} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#231A14]">{item.title}</h3>
                        <p className="mt-0.5 text-xs text-[#6E6359] leading-relaxed whitespace-pre-line">
                          {item.message}
                        </p>
                      </div>
                    </div>
                    {!item.isRead && (
                      <span className="h-2 w-2 rounded-full bg-[#D95D1E] shrink-0 mt-1" />
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#F7F3ED] text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-md px-2 py-0.5 font-semibold ${theme.badgeBg}`}>
                        {item.category || item.type || "Informasi"}
                      </span>
                      <span className="text-[#8C8074]">{item.time}</span>
                    </div>
                    <span className="font-semibold text-[#D95D1E] hover:underline flex items-center gap-1">
                      {item.actionText || "Detail"} &gt;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Toast Sukses */}
        {showToast && (
          <div className="absolute bottom-6 left-4 right-4 z-[10010] flex items-center justify-between rounded-2xl border border-[#EFE9E1] bg-white p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFF2E8] text-[#D95D1E]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-[#231A14]">
                Semua notifikasi ditandai terbaca.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="text-[#8C827A] hover:text-[#231A14] text-sm font-bold px-1 cursor-pointer"
            >
              &times;
            </button>
          </div>
        )}

        {/* Bottom Sheet Modal Konfirmasi */}
        {showConfirmModal && (
          <div 
            className="absolute inset-0 z-[10000] flex items-end bg-black/50 backdrop-blur-xs"
            onClick={() => setShowConfirmModal(false)}
          >
            <div 
              className="w-full rounded-t-3xl bg-white p-6 pb-8 space-y-5 shadow-2xl animate-modal-slide"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="mx-auto h-1.5 w-12 rounded-full bg-[#E2D7CC] cursor-pointer hover:bg-[#C8BCB2] transition" 
                onClick={() => setShowConfirmModal(false)}
                title="Tutup"
              />
              
              <div className="space-y-1.5">
                <h2 className="text-base font-bold text-[#231A14]">
                  Tandai semua terbaca?
                </h2>
                <p className="text-xs text-[#7E7267] leading-relaxed">
                  Notifikasi tetap tersimpan — hanya penanda belum dibaca yang dihapus.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={handleConfirmMarkAll}
                  className="w-full rounded-2xl bg-gradient-to-r from-[#F07A3B] to-[#E54D2E] py-3.5 text-xs font-bold text-white shadow-md active:scale-98 transition cursor-pointer"
                >
                  Tandai semua terbaca
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="w-full rounded-2xl border border-[#E2D7CC] bg-white py-3.5 text-xs font-bold text-[#231A14] hover:bg-[#FAF7F5] active:scale-98 transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}