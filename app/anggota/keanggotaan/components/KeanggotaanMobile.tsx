"use client";

import React from "react";
import Link from "next/link";
import { membershipInfo } from "@/data/anggota";

export type MembershipInfoType = typeof membershipInfo;

interface KeanggotaanMobileProps {
  info?: MembershipInfoType | any;
}

export default function KeanggotaanMobile({ info }: KeanggotaanMobileProps) {
  const badgeDict = [
    { title: "Nutrisi", desc: "Diklat Nutrisi Kucing", active: false },
    { title: "Steward", desc: "Diklat Steward Cat Show", active: true },
    { title: "Juri", desc: "Diklat Juri Pendamping", active: true },
  ];

  const menuList = [
    {
      title: "My Cats",
      subtitle: "4 kucing",
      icon: (
        <svg className="w-5 h-5 text-[#D96B27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      href: "#",
    },
    {
      title: "Riwayat pemesanan",
      icon: (
        <svg className="w-5 h-5 text-[#D96B27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      href: "/anggota/store",
    },
    {
      title: "Status keanggotaan",
      icon: (
        <svg className="w-5 h-5 text-[#D96B27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      href: "#",
    },
    {
      title: "Log aktivitas",
      icon: (
        <svg className="w-5 h-5 text-[#D96B27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: "#",
    },
    {
      title: "Pengaturan akun",
      icon: (
        <svg className="w-5 h-5 text-[#D96B27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      href: "#",
    },
  ];

  const nama = info?.nama || info?.memberName || "Ayu Prameswari";
  const idMember = info?.idMember || info?.memberId || "ICA-M-004821";
  const email = info?.email || "ayu.prameswari@email.com";
  const whatsapp = info?.whatsapp || info?.phone || "0813-4455-7788";
  const wilayah = info?.wilayah || info?.chapter || "Jawa Barat";
  const sejak = info?.sejak || info?.joinedDate || "12 Agu 2024";

  return (
    <div className="block sm:hidden w-full bg-[#F7F5F0] font-sans pb-8 pt-3 px-4 space-y-4">
      {/* 1. KARTU PROFIL UTAMA */}
      <div className="bg-white rounded-2xl p-5 border border-[#EAE5DF] shadow-xs flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#FCE3D2] text-[#D96B27] font-bold text-base flex items-center justify-center shrink-0 border border-[#FADEC9]">
          AP
        </div>
        <div>
          <h2 className="text-base font-bold text-[#1F1B18] leading-snug">{nama}</h2>
          <p className="text-xs font-medium text-[#857B72] mt-0.5">{idMember} · Member</p>
        </div>
      </div>

      {/* 2. DETAIL INFORMASI KONTAK */}
      <div className="bg-white rounded-2xl p-5 border border-[#EAE5DF] shadow-xs space-y-3.5 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#F5F2ED]">
          <span className="text-[#857B72] font-medium">Email</span>
          <span className="font-semibold text-[#1F1B18]">{email}</span>
        </div>
        <div className="flex items-center justify-between pb-3 border-b border-[#F5F2ED]">
          <span className="text-[#857B72] font-medium">WhatsApp</span>
          <span className="font-semibold text-[#1F1B18]">{whatsapp}</span>
        </div>
        <div className="flex items-center justify-between pb-3 border-b border-[#F5F2ED]">
          <span className="text-[#857B72] font-medium">Wilayah ICA</span>
          <span className="font-semibold text-[#1F1B18]">{wilayah}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#857B72] font-medium">Member sejak</span>
          <span className="font-semibold text-[#1F1B18]">{sejak}</span>
        </div>
      </div>

      {/* 3. TINGKAT KEANGGOTAAN & PROGRESS */}
      <div className="bg-white rounded-2xl p-5 border border-[#EAE5DF] shadow-xs space-y-3.5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#1F1B18]">Tingkat keanggotaan · Perak</h3>
            <p className="text-xs text-[#857B72] mt-0.5">3 dari 5 diklat diikuti</p>
          </div>
          <span className="px-2.5 py-1 bg-[#E2F0D9] text-[#385723] text-xs font-bold rounded-lg border border-[#C5E0B4]">
            60% lengkap
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full h-2.5 bg-[#F5F2ED] rounded-full overflow-hidden">
          <div className="h-full bg-[#D96B27] w-[60%] rounded-full" />
        </div>
        <p className="text-xs text-[#857B72]">Selesaikan 1 diklat lagi untuk tingkat Emas</p>

        {/* LENCANA DIKLAT ASOSIASI */}
        <div className="pt-2">
        <span className="text-[11px] font-bold tracking-wider text-[#9C8F84] uppercase">
            Lencana Diklat Asosiasi
        </span>
        
        <div className="flex items-center gap-3 overflow-x-auto pt-3 pb-1 scrollbar-none -mx-1 px-1">
            {[
            { title: "Kesehatan", desc: "Diklat Kesehatan & Nutrisi", active: true },
            { title: "Steward", desc: "Diklat Steward Cat Show", active: false },
            { title: "Juri", desc: "Diklat Juri Pendamping", active: false },
            ].map((badge, idx) => (
            <div
                key={idx}
                className={`shrink-0 w-36 p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                badge.active
                    ? "bg-white border-[#EAE5DF] shadow-xs"
                    : "bg-white border-[#EAE5DF] opacity-80"
                }`}
            >
                {/* KOTAK IKON DENGAN GRADIEN UNTUK STATUS AKTIF */}
                <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                    badge.active
                    ? "bg-gradient-to-b from-[#FFAE66] to-[#F26E27] text-white shadow-[0_4px_12px_rgba(242,110,39,0.3)]"
                    : "bg-[#F7F5F2] text-[#C4B9AD]"
                }`}
                >
                {/* SVG RIBBON / MEDAL WITH STAR */}
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15l-3.5 2 1-4-3-3 4-.5L12 6l1.5 3.5 4 .5-3 3 1 4L12 15z"
                    />
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M8.21 13.89L7 21l5-2.5L17 21l-1.21-7.11"
                    />
                </svg>
                </div>

                <div>
                <h4
                    className={`text-xs font-bold ${
                    badge.active ? "text-[#1F1B18]" : "text-[#857B72]"
                    }`}
                >
                    {badge.title}
                </h4>
                <p className="text-[10px] text-[#A0958B] leading-snug line-clamp-2 mt-0.5 font-medium">
                    {badge.desc}
                </p>
                </div>
            </div>
            ))}
        </div>
        </div>
      </div>

      {/* 4. BANNER CATTERY */}
      <div className="bg-[#FFF2E8] rounded-2xl p-4 border border-[#FADEC9] flex items-center justify-between cursor-pointer active:scale-98 transition-transform shadow-2xs">
        <div className="flex items-center gap-3.5">
          {/* IKON RUMAH CATTERY SVG */}
          <div className="w-10 h-10 rounded-xl bg-white border border-[#FADEC9] flex items-center justify-center text-[#D96B27] shrink-0 shadow-2xs">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#D96B27]">Ajukan sebagai Cattery</h4>
            <p className="text-[11px] text-[#857B72] leading-tight mt-0.5">
              Isi form cattery dan tambahkan pet — direview admin ICA.
            </p>
          </div>
        </div>
        <span className="text-[#D96B27] font-bold text-base pl-2">›</span>
      </div>

      {/* 5. MENU NAVIGASI PROFIL */}
      <div className="bg-white rounded-2xl border border-[#EAE5DF] shadow-xs divide-y divide-[#F5F2ED] overflow-hidden">
        {menuList.map((menu, idx) => (
          <Link
            key={idx}
            href={menu.href}
            className="flex items-center justify-between p-4 hover:bg-[#FAF8F5] active:bg-[#F5F2ED] transition-colors"
          >
            <div className="flex items-center gap-3.5">
              {menu.icon}
              <span className="text-xs font-bold text-[#1F1B18]">{menu.title}</span>
            </div>
            <div className="flex items-center gap-2">
              {menu.subtitle && (
                <span className="text-xs font-medium text-[#857B72]">{menu.subtitle}</span>
              )}
              <span className="text-[#857B72] text-sm font-semibold">›</span>
            </div>
          </Link>
        ))}
      </div>

      {/* 6. TOMBOL KELUAR */}
      <button
        type="button"
        onClick={() => alert("Keluar dari akun")}
        className="w-full py-3.5 bg-white border border-[#EAE5DF] rounded-2xl text-xs font-bold text-[#D9534F] active:bg-[#FAF8F5] transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg className="w-4.5 h-4.5 text-[#D9534F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Keluar dari akun</span>
      </button>
    </div>
  );
}