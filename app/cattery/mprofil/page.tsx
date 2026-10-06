"use client";

import { useState } from "react";
import Link from "next/link";
import { catteryProfile } from "@/data/cattery";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import StoreOrderHistoryMobile from "@/components/store/mobile/StoreOrderHistoryMobile";

// List data lencana (3 sudah diikuti, selebihnya belum diikuti)
const badgesData = [
  {
    id: "1",
    title: "Cat Show",
    subtitle: "ICA Cat Show Bandung 2026",
    isEarned: true,
  },
  {
    id: "2",
    title: "Regional",
    subtitle: "Regional Show Bandung 2026",
    isEarned: true,
  },
  {
    id: "3",
    title: "Cattery",
    subtitle: "Diklat Cattery Dasar",
    isEarned: true,
  },
  {
    id: "4",
    title: "Grooming",
    subtitle: "Belum diikuti",
    isEarned: false,
  },
  {
    id: "5",
    title: "Breeder",
    subtitle: "Belum diikuti",
    isEarned: false,
  },
];

// Helper Format Rupiah
const formatRupiah = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

// Helper Icon Pita (Award Ribbon Badge)
function RibbonBadgeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-5 h-5"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="9" r="6" />
      <path d="M9.09 14.5L7 22l5-3 5 3-2.09-7.5" />
      <polygon points="12 6 13 8 15 8.3 13.5 10 14 12 12 11 10 12 10.5 10 9 8.3 11 8 12 6" fill="currentColor" />
    </svg>
  );
}

export default function CatteryProfileMobilePage() {
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);

  const initials = (catteryProfile.name ?? "Rumah Hana")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const earnedCount = badgesData.filter((b) => b.isEarned).length;

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#2d2825] font-sans px-4 pt-4 pb-5 space-y-4 max-w-md mx-auto">
      {/* Card 1: Identitas Utama Cattery */}
      <div className="bg-white rounded-3xl p-5 border border-[#eedfd5] shadow-2xs flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#fff4eb] border border-[#fce3d2] text-[#f05a1b] font-extrabold text-xl flex items-center justify-center shrink-0">
          {initials}
        </div>
        <div className="space-y-1 min-w-0">
          <h2 className="font-bold text-base text-[#1a1513] leading-tight truncate">
            {catteryProfile.name}
          </h2>
          <p className="text-xs text-[#8c8074] truncate">
            {catteryProfile.regNumber} · Cattery
          </p>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#eaf8f0] text-[#1b804d] text-[10px] font-bold border border-[#c3f0d5]">
            Terverifikasi
          </span>
        </div>
      </div>

      {/* Card 2: Personal Details Table */}
      <div className="bg-white rounded-3xl p-4 border border-[#eedfd5] shadow-2xs divide-y divide-[#f4efe9]">
        <div className="flex items-center justify-between py-2.5">
          <span className="text-xs font-medium text-[#8c8074]">Pemilik</span>
          <span className="text-xs font-bold text-[#1a1513]">{catteryProfile.ownerName}</span>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <span className="text-xs font-medium text-[#8c8074]">Email</span>
          <span className="text-xs font-bold text-[#1a1513]">hana@rumahhana.id</span>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <span className="text-xs font-medium text-[#8c8074]">WhatsApp</span>
          <span className="text-xs font-bold text-[#1a1513]">{catteryProfile.whatsapp}</span>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <span className="text-xs font-medium text-[#8c8074]">Wilayah ICA</span>
          <span className="text-xs font-bold text-[#1a1513]">{catteryProfile.provinceRegion || catteryProfile.region}</span>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <span className="text-xs font-medium text-[#8c8074]">Member sejak</span>
          <span className="text-xs font-bold text-[#1a1513]">24 Jul 2024</span>
        </div>
      </div>

      {/* Card 3: Keanggotaan & Lencana Event Dinamis */}
      <div className="bg-white rounded-3xl p-5 border border-[#eedfd5] shadow-2xs space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-xs text-[#1a1513]">Tingkat keanggotaan · Perak</h3>
            <p className="text-[10px] text-[#8c8074] mt-0.5">{earnedCount} dari 5 event diikuti</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#fff4eb] text-[#f05a1b] text-[10px] font-bold border border-[#fce3d2]">
            60% lengkap
          </span>
        </div>

        <div className="w-full bg-[#f4efe9] h-2 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-[var(--color-brand-orange-500)] to-[#f05a1b] h-full w-[60%] rounded-full" />
        </div>

        <p className="text-[11px] text-[#8c8074]">Ikuti 2 event lagi untuk tingkat Emas.</p>

        <div className="pt-2 space-y-3">
          <span className="block text-[10px] font-bold tracking-wider uppercase text-[#a09488]">
            LENCANA EVENT &amp; DIKLAT ASOSIASI
          </span>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-1 px-1">
            {badgesData.map((badge) => (
              <div
                key={badge.id}
                className={`min-w-[130px] rounded-2xl p-3 border shadow-2xs flex flex-col justify-between space-y-3 shrink-0 transition-all ${
                  badge.isEarned
                    ? "bg-white border-[#eedfd5]"
                    : "bg-[#FAFAFA] border-[#F0EBE5]"
                }`}
              >
                {badge.isEarned ? (
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFC299] to-[#EE6B28] shadow-[0_6px_16px_rgba(238,107,40,0.25)] flex items-center justify-center">
                    <RibbonBadgeIcon className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-[#F2F0ED] flex items-center justify-center">
                    <RibbonBadgeIcon className="w-6 h-6 text-[#A39990]" />
                  </div>
                )}

                <div>
                  <h4
                    className={`font-bold text-xs leading-tight truncate ${
                      badge.isEarned ? "text-[#1a1513]" : "text-[#70665D]"
                    }`}
                  >
                    {badge.title}
                  </h4>
                  <p
                    className={`text-[10px] leading-tight mt-0.5 line-clamp-2 ${
                      badge.isEarned ? "text-[#8c8074]" : "text-[#B0A69D]"
                    }`}
                  >
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[#a09488] pt-1">
            Lencana diberikan admin ICA setelah event selesai.
          </p>
        </div>
      </div>

      {/* Quick Menu Navigation Links */}
      <div className="bg-white rounded-3xl border border-[#eedfd5] shadow-2xs divide-y divide-[#f4efe9] overflow-hidden">
        <Link href="/cattery/mating-reports" className="flex items-center justify-between p-4 hover:bg-[#faf7f2] transition">
          <div className="flex items-center gap-3">
            <div className="text-[var(--color-brand-orange-700)]/90">
              <DashboardIcon name="mating" size={18} />
            </div>
            <span className="font-bold text-xs text-[#1a1513]">Mating Report</span>
          </div>
          <span className="text-xs text-[#8c8074]">Buat baru</span>
        </Link>

        <Link href="/cattery/profil" className="flex items-center justify-between p-4 hover:bg-[#faf7f2] transition">
          <div className="flex items-center gap-3">
            <div className="text-[var(--color-brand-orange-700)]/90">
              <DashboardIcon name="home" size={18} />
            </div>
            <span className="font-bold text-xs text-[#1a1513]">Profil Cattery</span>
          </div>
          <span className="text-xs text-[#8c8074]"></span>
        </Link>

        <Link href="/cattery/documents" className="flex items-center justify-between p-4 hover:bg-[#faf7f2] transition">
          <div className="flex items-center gap-3">
            <div className="text-[var(--color-brand-orange-700)]/90">
              <DashboardIcon name="news" size={18} />
            </div>
            <span className="font-bold text-xs text-[#1a1513]">Documents</span>
          </div>
          <span className="text-xs text-[#8c8074]">5 berkas</span>
        </Link>

        <Link href="/cattery/leaderboard" className="flex items-center justify-between p-4 hover:bg-[#faf7f2] transition">
          <div className="flex items-center gap-3">
            <div className="text-[var(--color-brand-orange-700)]/90">
              <DashboardIcon name="trophy" size={18} />
            </div>
            <span className="font-bold text-xs text-[#1a1513]">Leaderboard</span>
          </div>
          <span className="text-xs text-[#8c8074]"></span>
        </Link>

        <Link href="/cattery/store" className="flex items-center justify-between p-4 hover:bg-[#faf7f2] transition">
          <div className="flex items-center gap-3">
            <div className="text-[var(--color-brand-orange-700)]/90">
              <DashboardIcon name="shopping-cart" size={18} />
            </div>
            <span className="font-bold text-xs text-[#1a1513]">Store</span>
          </div>
          <span className="text-xs text-[#8c8074]"></span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOrderHistoryOpen(true)}
          className="w-full flex items-center justify-between p-4 hover:bg-[#faf7f2] transition text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="text-[var(--color-brand-orange-700)]/90">
              <DashboardIcon name="payment" size={18} />
            </div>
            <span className="font-bold text-xs text-[#1a1513]">Riwayat pesanan</span>
          </div>
          <span className="text-xs text-[#8c8074]">3 pesanan</span>
        </button>

        <Link href="/cattery/settings" className="flex items-center justify-between p-4 hover:bg-[#faf7f2] transition">
          <div className="flex items-center gap-3">
            <div className="text-[var(--color-brand-orange-700)]/90">
              <DashboardIcon name="settings" size={18} />
            </div>
            <span className="font-bold text-xs text-[#1a1513]">Pengaturan akun</span>
          </div>
          <span className="text-xs text-[#8c8074]"></span>
        </Link>
      </div>

      {/* Logout Action Button */}
      <div className="pt-1">
        <Link href="/auth/login/cattery">
          <button className="w-full bg-white text-[#c23c3c] border border-[#fde9e9] hover:bg-[#fde9e9]/30 rounded-3xl py-3.5 font-bold text-xs shadow-2xs transition">
            Keluar dari akun
          </button>
        </Link>
      </div>

      {/* Slider Riwayat Pemesanan */}
      {isOrderHistoryOpen && (
        <StoreOrderHistoryMobile
          onClose={() => setIsOrderHistoryOpen(false)}
          formatRupiah={formatRupiah}
        />
      )}
    </div>
  );
}