"use client";

import { useState } from "react";
import { catteryProfile as initialProfile } from "@/data/cattery";
import type { CatteryProfile } from "@/types/cattery";
import { useToast } from "@/context/ToastContext";

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
    // Sementara — nanti diganti fetch/PATCH ke API, kirim `profile` + file foto
    showToast("Profil cattery disimpan.", "Perubahan Anda sudah tersimpan.");
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setPlacePhoto(initialProfile.placePhotoUrl ?? null);
    setProfilePhoto(initialProfile.profilePhotoUrl ?? null);
  };

  const initials = (profile.ownerName ?? "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#2d2825] font-sans">
      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
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