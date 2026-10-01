"use client";

import { useState } from "react";
import Link from "next/link";
import { catteryProfile as initialProfile } from "@/data/cattery";
import type { CatteryProfile } from "@/types/cattery";
import { useToast } from "@/context/ToastContext";
import DashboardIcon from "@/components/anggota/DashboardIcon";

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

export default function CatteryProfilePage() {
  const { showToast } = useToast();

  const [profile, setProfile] = useState<CatteryProfile>(initialProfile);
  const [placePhoto, setPlacePhoto] = useState<string | null>(initialProfile.placePhotoUrl ?? null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(initialProfile.profilePhotoUrl ?? null);

  const update = (patch: Partial<CatteryProfile>) => setProfile((prev) => ({ ...prev, ...patch }));

  const handlePlacePhotoPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPlacePhoto((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  const handleProfilePhotoPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfilePhoto((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  const handleSave = () => {
    showToast("Profil cattery disimpan.", "Perubahan Anda sudah tersimpan.");
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setPlacePhoto(initialProfile.placePhotoUrl ?? null);
    setProfilePhoto(initialProfile.profilePhotoUrl ?? null);
  };

  const initials = (profile.name ?? "Rumah Hana")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const earnedCount = badgesData.filter((b) => b.isEarned).length;

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#2d2825] font-sans pb-20 lg:pb-8">
      
      {/* ========================================================= */}
      {/* 1. TAMPILAN MOBILE                                        */}
      {/* ========================================================= */}
      <div className="block lg:hidden px-4 pt-4 space-y-4 max-w-md mx-auto">
        
        {/* Card 1: Identitas Utama Cattery */}
        <div className="bg-white rounded-3xl p-5 border border-[#eedfd5] shadow-2xs flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#fff4eb] border border-[#fce3d2] text-[#f05a1b] font-extrabold text-xl flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div className="space-y-1 min-w-0">
            <h2 className="font-bold text-base text-[#1a1513] leading-tight truncate">
              {profile.name}
            </h2>
            <p className="text-xs text-[#8c8074] truncate">
              {profile.regNumber} · Cattery
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
            <span className="text-xs font-bold text-[#1a1513]">{profile.ownerName}</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-xs font-medium text-[#8c8074]">Email</span>
            <span className="text-xs font-bold text-[#1a1513]">hana@rumahhana.id</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-xs font-medium text-[#8c8074]">WhatsApp</span>
            <span className="text-xs font-bold text-[#1a1513]">{profile.whatsapp}</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-xs font-medium text-[#8c8074]">Wilayah ICA</span>
            <span className="text-xs font-bold text-[#1a1513]">{profile.provinceRegion || profile.region}</span>
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
            <div className="bg-[#f05a1b] h-full w-[60%] rounded-full" />
          </div>

          <p className="text-[11px] text-[#8c8074]">Ikuti 2 event lagi untuk tingkat Emas.</p>

          <div className="pt-2 space-y-3">
            <span className="block text-[10px] font-bold tracking-wider uppercase text-[#a09488]">
              LENCANA EVENT &amp; DIKLAT ASOSIASI
            </span>

            {/* Horizontal Badge Carousel */}
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
                  {/* Style Icon & Card: Terang (Sudah Diikuti) vs Pudar (Belum Diikuti) */}
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

          <Link href="/cattery/orders" className="flex items-center justify-between p-4 hover:bg-[#faf7f2] transition">
            <div className="flex items-center gap-3">
              <div className="text-[var(--color-brand-orange-700)]/90">
                <DashboardIcon name="payment" size={18} />
              </div>
              <span className="font-bold text-xs text-[#1a1513]">Riwayat pesanan</span>
            </div>
            <span className="text-xs text-[#8c8074]">3 pesanan</span>
          </Link>

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
      </div>

      {/* ========================================================= */}
      {/* 2. TAMPILAN DESKTOP (Sama Sekali Tidak Diubah / Utuh)     */}
      {/* ========================================================= */}
      <main className="hidden lg:block p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1a1513]">
            Profil Cattery
          </h1>
          <p className="text-xs sm:text-sm text-[#7e7267]">
            Data yang tampil di Direktori Cattery untuk member ICA.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#eedfd5] overflow-hidden shadow-xs">
          {/* Top Banner (Cattery Place Photo) */}
          <div className="bg-[#FFEFE3] p-8 relative flex flex-col items-center justify-center min-h-[180px] border-b border-[#F7E1CE] overflow-hidden">
            {placePhoto ? (
              <img src={placePhoto} alt="Foto tempat cattery" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-center gap-2">
                <div className="text-[#c26d0a]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#c26d0a]">
                  Foto tempat cattery belum diunggah
                </span>
              </div>
            )}

            <label className="relative z-10 mt-4 sm:mt-0 sm:absolute sm:bottom-4 sm:right-4 cursor-pointer px-4 py-2 rounded-xl border border-dashed border-[#EE6B28] bg-white/90 hover:bg-white text-xs font-semibold text-[#EE6B28] transition">
              {placePhoto ? "Ganti foto tempat" : "Unggah foto tempat"}
              <input type="file" accept="image/*" className="hidden" onChange={handlePlacePhotoPick} />
            </label>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Owner Profile Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#fce8d8] rounded-full text-[#c26d0a] font-bold text-lg flex items-center justify-center shrink-0 overflow-hidden">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt={profile.ownerName} className="h-full w-full object-cover" />
                  ) : (
                    initials || "?"
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    value={profile.ownerName ?? ""}
                    onChange={(e) => update({ ownerName: e.target.value })}
                    className="block w-full bg-transparent text-base sm:text-lg font-bold text-[#1a1513] outline-none focus:border-b focus:border-[#EE6B28]"
                  />
                  <p className="text-xs text-[#8c8074] mt-0.5">
                    Pemilik cattery · member {profile.memberCode}
                  </p>
                </div>
              </div>

              <label className="self-start sm:self-center cursor-pointer px-4 py-2 rounded-xl border border-dashed border-[#EE6B28] bg-white hover:bg-[#FFF8F2] text-xs font-semibold text-[#EE6B28] transition hover:bg-gradient-to-r hover:from-[var(--color-brand-orange-50)] hover:to-[var(--color-brand-orange-100)] hover:text[var(--color-brand-orange-900)]">
                {profilePhoto ? "Ganti foto profil" : "Unggah foto profil"}
                <input type="file" accept="image/*" className="hidden" onChange={handleProfilePhotoPick} />
              </label>
            </div>

            {/* Form & Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm">
              <div className="space-y-1">
                <span className="block text-xs font-medium text-[#8c8074]">Nama cattery</span>
                <input
                  type="text"
                  value={profile.name}
                  readOnly
                  className="w-full bg-transparent font-bold text-[#1a1513] outline-none cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <span className="block text-xs font-medium text-[#8c8074]">Nomor registrasi</span>
                <input
                  type="text"
                  value={profile.regNumber}
                  readOnly
                  className="w-full cursor-not-allowed bg-transparent font-bold text-[#1a1513] outline-none"
                />
              </div>

              <div className="space-y-1">
                <span className="block text-xs font-medium text-[#8c8074]">Wilayah</span>
                <input
                  type="text"
                  value={profile.provinceRegion ?? ""}
                  onChange={(e) => update({ provinceRegion: e.target.value })}
                  className="w-full bg-transparent font-bold text-[#1a1513] outline-none focus:border-b focus:border-[#EE6B28]"
                />
              </div>

              <div className="space-y-1">
                <span className="block text-xs font-medium text-[#8c8074]">Nomor WhatsApp</span>
                <input
                  type="text"
                  value={profile.whatsapp ?? ""}
                  onChange={(e) => update({ whatsapp: e.target.value })}
                  className="w-full bg-transparent font-bold text-[#1a1513] outline-none  focus:border-b focus:border-[#EE6B28]"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <span className="block text-xs font-medium text-[#8c8074]">Alamat</span>
                <textarea
                  value={profile.address ?? ""}
                  onChange={(e) => update({ address: e.target.value })}
                  rows={2}
                  className="w-full resize-none bg-transparent font-bold leading-relaxed text-[#1a1513] outline-none focus:border-b focus:border-[#EE6B28]"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <span className="block text-xs font-medium text-[#8c8074]">Ras yang dikembangkan</span>
                <div className="flex flex-wrap gap-2">
                  {(profile.breeds ?? []).map((breed) => (
                    <span
                      key={breed}
                      className="px-3 py-1 rounded-lg bg-[#FFEFE3] text-[#c26d0a] text-xs font-medium"
                    >
                      {breed}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-[#eedfd5]" />

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSave}
                className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
              >
                Simpan perubahan
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="cursor-pointer rounded-full border border-[#eedfd5] bg-white px-6 py-2.5 text-xs font-bold text-[#574d45] hover:bg-[#faf7f5] transition-all duration-150 active:translate-y-0.5"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}