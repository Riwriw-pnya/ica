"use client";

import React, { useState } from "react";
import Link from "next/link";
import { membershipInfo } from "@/data/anggota";
import AjukanCatteryMobile from "./AjukanCatteryMobile";
import MyCatsMobile from "./MyCatsMobile";
import StatusKeanggotaanMobile from "./StatusKeanggotaanMobile";
import PengaturanAkunMobile from "./PengaturanAkunMobile";
import type { ActivityLogItem } from "@/types/anggota";
import ActivityLogSection from "@/app/anggota/log-aktivitas/components/ActivityLogSection";

export type MembershipInfoType = typeof membershipInfo;

interface KeanggotaanMobileProps {
  info?: MembershipInfoType | any;
  activities: ActivityLogItem[];
}

export default function KeanggotaanMobile({
  info,
  activities,
}: KeanggotaanMobileProps) {
  const [showAjukanCattery, setShowAjukanCattery] = useState<boolean>(false);
  const [showMyCats, setShowMyCats] = useState<boolean>(false);
  const [showStatusKeanggotaan, setShowStatusKeanggotaan] = useState<boolean>(false);
  const [showLogAktivitas, setShowLogAktivitas] = useState<boolean>(false);
  const [showPengaturanAkun, setShowPengaturanAkun] = useState<boolean>(false);

  const badgeDict = [
    { title: "Kesehatan", desc: "Diklat Kesehatan & Nutrisi", active: true },
    { title: "Steward", desc: "Diklat Steward Cat Show", active: false },
    { title: "Juri", desc: "Diklat Juri Pendamping", active: false },
  ];

  const nama = info?.nama || info?.memberName || "Ayu Prameswari";
  const idMember = info?.idMember || info?.memberId || "ICA-M-004821";
  const email = info?.email || "ayu.prameswari@email.com";
  const whatsapp = info?.whatsapp || info?.phone || "0813-4455-7788";
  const wilayah = info?.wilayah || info?.chapter || "Jawa Barat";
  const sejak = info?.sejak || info?.joinedDate || "12 Agu 2024";

  return (
    <div className="block sm:hidden w-full max-w-md mx-auto bg-[#FBF9F5] font-sans pb-8 pt-2 px-3 space-y-3">
      {/* 1. KARTU PROFIL UTAMA */}
      <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs flex items-center gap-3.5">
        <div className="w-13 h-13 rounded-full bg-[#FCE3D2] text-[#D96B27] font-bold text-sm flex items-center justify-center shrink-0 border border-[#FADEC9]">
          AP
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-[#1F1B18] leading-snug truncate">{nama}</h2>
          <p className="text-[11px] font-medium text-[#857B72] mt-0.5">{idMember} · Member</p>
        </div>
      </div>

      {/* 2. DETAIL INFORMASI KONTAK */}
      <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3 text-xs">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#F5F2ED]">
          <span className="text-[#857B72] font-medium">Email</span>
          <span className="font-semibold text-[#1F1B18] truncate max-w-[200px] text-right">{email}</span>
        </div>
        <div className="flex items-center justify-between pb-2.5 border-b border-[#F5F2ED]">
          <span className="text-[#857B72] font-medium">WhatsApp</span>
          <span className="font-semibold text-[#1F1B18]">{whatsapp}</span>
        </div>
        <div className="flex items-center justify-between pb-2.5 border-b border-[#F5F2ED]">
          <span className="text-[#857B72] font-medium">Wilayah ICA</span>
          <span className="font-semibold text-[#1F1B18]">{wilayah}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#857B72] font-medium">Member sejak</span>
          <span className="font-semibold text-[#1F1B18]">{sejak}</span>
        </div>
      </div>

      {/* 3. TINGKAT KEANGGOTAAN & PROGRESS BAR & LENCANA */}
      <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-xs font-bold text-[#1F1B18]">Tingkat keanggotaan · Perak</h3>
            <p className="text-[11px] text-[#857B72] mt-0.5">3 dari 5 diklat diikuti</p>
          </div>
          <span className="shrink-0 whitespace-nowrap px-2 py-0.5 bg-[#E2F0D9] text-[#385723] text-[10px] font-bold rounded-lg border border-[#C5E0B4]">
            60% lengkap
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full h-2 bg-[#F5F2ED] rounded-full overflow-hidden">
          <div className="h-full bg-[#D96B27] w-[60%] rounded-full" />
        </div>
        <p className="text-[11px] text-[#857B72]">Selesaikan 1 diklat lagi untuk tingkat Emas</p>

        {/* LENCANA DIKLAT ASOSIASI */}
        <div className="pt-1">
          <span className="text-[10px] font-bold tracking-wider text-[#9C8F84] uppercase">
            Lencana Diklat Asosiasi
          </span>

          <div className="flex items-center gap-2.5 overflow-x-auto pt-2.5 pb-1 scrollbar-none -mx-1 px-1">
            {badgeDict.map((badge, idx) => (
              <div
                key={idx}
                className="shrink-0 w-32 p-3 rounded-xl border border-[#EAE5DF] bg-white text-left flex flex-col justify-between shadow-2xs"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all ${
                    badge.active
                      ? "bg-gradient-to-b from-[#FFA85A] to-[#F26E27] text-white shadow-[0_4px_12px_rgba(242,110,39,0.3)]"
                      : "bg-[#F5F2ED] text-[#C0B4A8]"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="9" r="5" />
                    <path
                      d="M12 7.2l.6 1.2 1.4.2-1 1 .2 1.4-1.2-.6-1.2.6.2-1.4-1-1 1.4-.2z"
                      fill={badge.active ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path d="M8.5 13.5L7 20l5-2.2" />
                    <path d="M15.5 13.5L17 20l-5-2.2" />
                  </svg>
                </div>

                <div>
                  <h4
                    className={`text-xs font-bold ${
                      badge.active ? "text-[#1F1B18]" : "text-[#7A6F65]"
                    }`}
                  >
                    {badge.title}
                  </h4>
                  <p className="text-[10px] text-[#A0958B] leading-tight line-clamp-2 mt-0.5 font-medium">
                    {badge.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. BANNER CATTERY */}
      <div
        onClick={() => setShowAjukanCattery(true)}
        className="bg-[#FFF2E8] rounded-2xl p-3.5 border border-[#FADEC9] flex items-center justify-between cursor-pointer active:scale-98 transition-transform shadow-2xs"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-[#FADEC9] flex items-center justify-center text-[#D96B27] shrink-0 shadow-2xs">
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#D96B27]">Ajukan sebagai Cattery</h4>
            <p className="text-[10px] text-[#857B72] leading-tight mt-0.5">
              Isi form cattery dan tambahkan pet — direview admin ICA.
            </p>
          </div>
        </div>
        <span className="text-[#D96B27] font-bold text-sm pl-1">›</span>
      </div>

      {/* 5. MENU NAVIGASI PROFIL */}
      <div className="bg-white rounded-2xl border border-[#EAE5DF] shadow-2xs divide-y divide-[#F5F2ED] overflow-hidden">
        {/* ITEM 1: MY CATS 
        <button
          type="button"
          onClick={() => setShowMyCats(true)}
          className="flex items-center justify-between p-3.5 hover:bg-[#FAF8F5] active:bg-[#F5F2ED] transition-colors cursor-pointer w-full text-left"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[#D96B27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-xs font-bold text-[#1F1B18]">My Cats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-[#857B72]">4 kucing</span>
            <span className="text-[#857B72] text-sm font-semibold">›</span>
          </div>
        </button> */} 

        {/* ITEM 2: RIWAYAT PEMESANAN */}
        <Link href="/anggota/store" className="flex items-center justify-between p-3.5 hover:bg-[#FAF8F5] active:bg-[#F5F2ED] transition-colors w-full">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[#D96B27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-xs font-bold text-[#1F1B18]">Riwayat pemesanan</span>
          </div>
          <span className="text-[#857B72] text-sm font-semibold">›</span>
        </Link>

        {/* ITEM 3: STATUS KEANGGOTAAN */}
        <button
          type="button"
          onClick={() => setShowStatusKeanggotaan(true)}
          className="flex items-center justify-between p-3.5 hover:bg-[#FAF8F5] active:bg-[#F5F2ED] transition-colors cursor-pointer w-full text-left"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[#D96B27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-bold text-[#1F1B18]">Status keanggotaan</span>
          </div>
          <span className="text-[#857B72] text-sm font-semibold">›</span>
        </button>

       {/* ITEM 4: LOG AKTIVITAS */}
      <button
        type="button"
        onClick={() => setShowLogAktivitas(true)}
        className="flex items-center justify-between p-3.5 hover:bg-[#FAF8F5] active:bg-[#F5F2ED] transition-colors cursor-pointer w-full text-left"
      >
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-[#D96B27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-bold text-[#1F1B18]">Log aktivitas</span>
        </div>
        <span className="text-[#857B72] text-sm font-semibold">›</span>
      </button>

        {/* ITEM 5: PENGATURAN AKUN */}
        <button
          type="button"
          onClick={() => setShowPengaturanAkun(true)}
          className="flex items-center justify-between p-3.5 hover:bg-[#FAF8F5] active:bg-[#F5F2ED] transition-colors cursor-pointer w-full text-left"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[#D96B27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-bold text-[#1F1B18]">Pengaturan akun</span>
          </div>
          <span className="text-[#857B72] text-sm font-semibold">›</span>
        </button>
      </div>

      {/* 6. TOMBOL KELUAR */}
      <button
        type="button"
        onClick={() => alert("Keluar dari akun")}
        className="w-full py-3 bg-white border border-[#EAE5DF] rounded-2xl text-xs font-bold text-[#D9534F] active:bg-[#FAF8F5] transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg className="w-4 h-4 text-[#D9534F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Keluar dari akun</span>
      </button>

      {/* OVERLAY MY CATS */}
      {showMyCats && (
        <MyCatsMobile onBack={() => setShowMyCats(false)} />
      )}

      {/* OVERLAY STATUS KEANGGOTAAN */}
      {showStatusKeanggotaan && (
        <StatusKeanggotaanMobile onBack={() => setShowStatusKeanggotaan(false)} />
      )}

      {/* OVERLAY PENGAJUAN CATTERY */}
      {showAjukanCattery && (
        <AjukanCatteryMobile onBack={() => setShowAjukanCattery(false)} />
      )}
      
      {/* OVERLAY LOG AKTIVITAS */}
      {showLogAktivitas && (
  <ActivityLogSection
    activities={activities}
    mobile
    onBack={() => setShowLogAktivitas(false)}
  />
)}

    {/* OVERLAY PENGATURAN AKUN */}
    {showPengaturanAkun && (
      <PengaturanAkunMobile onBack={() => setShowPengaturanAkun(false)} />
    )}
    </div>
  );
}