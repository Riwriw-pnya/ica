"use client";

import React from "react";
import { useRouter } from "next/navigation";

export interface SlotItem {
  name: string;
  statusText: string;
  statusColor: string;
  badgeBg?: string;
  percentage: string;
  barColor: string;
}

export interface EventItemProps {
  id: string;
  bannerLabel?: string;
  badges: Array<{ label: string; variant: "upcoming" | "ongoing" | "default" }>;
  title: string;
  subtitle: string;
  slots?: SlotItem[];
  noticeText?: string;
}

interface EventCardComponentProps {
  item: EventItemProps;
  onManageQuota?: (item: EventItemProps) => void;
  onManageRegistration?: (item: EventItemProps) => void;
  onShare?: (item: EventItemProps) => void;
}

export default function EventCard({
  item,
  onManageQuota,
  onManageRegistration,
  onShare,
}: EventCardComponentProps) {
  const router = useRouter();

  const handleAturKuotaClick = () => {
    if (onManageQuota) {
      onManageQuota(item);
    } else {
      router.push(`/superadmin/events/create?id=${item.id}`);
    }
  };

  const handleKelolaPendaftaranClick = () => {
    if (onManageRegistration) {
      onManageRegistration(item);
    } else {
      router.push(`/superadmin/events/detail?id=${item.id}`);
    }
  };

  return (
    <div className="bg-white border border-[#EFE9E1] rounded-3xl p-5 space-y-4 shadow-xs">
      {/* Banner Placeholder */}
      <div className="w-full h-36 bg-[#F5F2ED] border border-dashed border-[#D0C5BC] rounded-2xl flex flex-col items-center justify-center text-[#8C8078] gap-1.5">
        <svg className="w-6 h-6 text-[#A0948C]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span className="text-xs font-medium text-[#7A6E65]">{item.bannerLabel || "Banner event · 1600×600"}</span>
      </div>

      {/* Badges Status & Kategori */}
      <div className="flex flex-wrap items-center gap-2">
        {item.badges.map((badge, idx) => {
          if (badge.variant === "upcoming") {
            return (
              <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF6EE] border border-[#FFD6B8] text-[#EE6B28] text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EE6B28]"></span>
                {badge.label}
              </span>
            );
          }
          if (badge.variant === "ongoing") {
            return (
              <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                {badge.label}
              </span>
            );
          }
          return (
            <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#EFE9E1] text-[#7A6E65] text-[11px] font-medium">
              {badge.label}
            </span>
          );
        })}
      </div>

      {/* Title & Info */}
      <div>
        <h3 className="text-sm font-bold text-[#231A14]">{item.title}</h3>
        <p className="text-xs text-[#8C8078] mt-0.5">{item.subtitle}</p>
      </div>

      {/* Slot Kategori Progress Bars */}
      {item.slots && (
        <div className="space-y-3 pt-1">
          {item.slots.map((slot, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#231A14] font-medium">{slot.name}</span>
                <span className={`font-bold text-[11px] ${slot.badgeBg ? `px-2 py-0.5 rounded-md ${slot.badgeBg}` : ""} ${slot.statusColor}`}>
                  {slot.statusText}
                </span>
              </div>
              <div className="w-full h-2 bg-[#F5F2ED] rounded-full overflow-hidden">
                <div className={`h-full ${slot.barColor} rounded-full`} style={{ width: slot.percentage }}></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notice Box Info */}
      {item.noticeText && (
        <div className="bg-[#FAF8F5] border border-[#EFE9E1] rounded-2xl p-3 text-xs text-[#7A6E65] leading-relaxed">
          {item.noticeText}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-[#F2EFE9]">
        {/* Tombol Atur Kuota & Timer */}
        <button
          type="button"
          onClick={handleAturKuotaClick}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-[#EFE9E1] bg-white text-[#7A6E65] hover:bg-[#FAF8F5] text-xs font-bold transition cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 text-[#8C8078]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Atur kuota & timer
        </button>

        {/* Tombol Kelola Pendaftaran -> Buka Detail Review */}
        <button
          type="button"
          onClick={handleKelolaPendaftaranClick}
          className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-[#EFE9E1] bg-white text-[#231A14] hover:bg-[#FAF8F5] text-xs font-bold transition cursor-pointer"
        >
          Kelola pendaftaran
          <svg className="w-3.5 h-3.5 text-[#8C8078]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <button
        type="button"
        onClick={() => onShare?.(item)}
        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-[#EFE9E1] bg-white text-[#7A6E65] hover:bg-[#FAF8F5] text-xs font-bold transition cursor-pointer"
      >
        <svg className="w-3.5 h-3.5 text-[#8C8078]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share event
      </button>
    </div>
  );
}