"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useToast } from "@/context/ToastContext"; // Menggunakan ToastContext dari project kamu

interface MenuItem {
  path: string;
  title: string;
  description: string;
}

const MENU_MAP: MenuItem[] = [
  {
    path: "/regionaladmin/dashboard",
    title: "Dashboard",
    description: "Ringkasan antrean dan aktivitas admin ICA",
  },
  {
    path: "/regionaladmin/members",
    title: "Members",
    description: "Data keanggotaan ICA - wilayah Bandung",
  },
  {
    path: "/regionaladmin/catteries",
    title: "Catteries",
    description: "Cattery terdaftar dan kode resmi",
  },
  {
    path: "/regionaladmin/payments",
    title: "Payments",
    description: "Iuran, registrasi, dan tiket event",
  },
  {
    path: "/regionaladmin/cats",
    title: "Cats",
    description: "Semua kucing terdaftar beserta EMS code",
  },
  {
    path: "/regionaladmin/applications",
    title: "Applications",
    description: "Semua pengajuan member, cattery yang masuk.",
  },
  {
    path: "/regionaladmin/events",
    title: "Events",
    description: "Agenda cat show, kuota war ticketing, dan pendaftaran peserta",
  },
  {
    path: "/regionaladmin/profil",
    title: "Profil Cattery",
    description: "Informasi detail dan identitas cattery.",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const rawPathname = usePathname();
  
  const { showToast } = useToast();

  const pathname =
    rawPathname?.endsWith("/") && rawPathname.length > 1
      ? rawPathname.slice(0, -1)
      : rawPathname;

  const activeMenu = MENU_MAP.find((item) => {
    if (item.path === pathname) return true;
    if (pathname?.startsWith(item.path + "/")) return true;
    return false;
  });

  const currentTitle = activeMenu ? activeMenu.title : "Superadmin Portal";
  const currentDescription = activeMenu
    ? activeMenu.description
    : "Ringkasan antrean dan aktivitas admin ICA";

  const handleNotificationClick = () => {
    showToast(
      "", // Title sengaja dikosongkan jika pesan hanya 1 baris/kalimat langsung
      "3 notifikasi baru: 2 aplikasi menunggu review, 1 pembayaran perlu konfirmasi.",
      {
        variant: "outlined",
        tone: "success",
      }
    );
  };

  return (
    <header className="h-16 bg-white border-b border-[#EFE9E1] px-6 flex items-center justify-between relative shrink-0">
      {/* Title & Subtitle */}
      <div className="flex flex-col justify-center">
        <h1 className="text-lg font-bold text-[#231A14] leading-tight md:text-xl">
          {currentTitle}
        </h1>
        <p className="text-xs text-[#8C8078] leading-normal mt-0.5 md:text-sm">
          {currentDescription}
        </p>
      </div>

      {/* Right Side: Search, Notification, & Profile */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative hidden md:block w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nomor aplikasi, member, ca..."
            className="w-full px-4 py-2 text-xs rounded-xl border border-[#EFE9E1] bg-white text-[#231A14] placeholder-[#A0948C] focus:outline-none focus:border-[#EE6B28] transition"
          />
        </div>

        {/* Notification Button dengan Red Indicator Dot */}
        <button
          onClick={handleNotificationClick}
          className="relative p-2.5 rounded-xl border border-[#EFE9E1] hover:bg-[#FAF8F5] transition cursor-pointer text-[#231A14]"
          aria-label="Notifications"
        >
          {/* Icon Bell SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
          
          {/* Red Indicator Dot */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#E54D42] rounded-full ring-2 ring-white" />
        </button>

        {/* Separator Divider */}
        <div className="h-8 w-[1px] bg-[#EFE9E1] mx-1 hidden sm:block" />

        {/* Profile User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-[#FAF8F5] transition cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFE3D1] text-[#EE6B28] flex items-center justify-center font-bold text-xs shrink-0">
              RN
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-[#231A14]">
                Rina Nurhayati
              </div>
              <div className="text-[10px] text-[#8C8078] leading-tight">
                Super Admin <br className="hidden" />· Pusat
              </div>
            </div>
          </button>

          {isOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white border border-[#EFE9E1] rounded-2xl shadow-lg p-2 text-xs z-50">
              <div className="p-2 border-b border-[#F2EFE9]">
                <p className="font-bold text-[#231A14]">Rina Nurhayati</p>
                <p className="text-[10px] text-[#8C8078]">rina@ica.or.id</p>
              </div>
              <button className="w-full text-left p-2 hover:bg-[#FAF8F5] rounded-lg text-[#7A6E65] mt-1 transition">
                Pengaturan Profil
              </button>
              <button className="w-full text-left p-2 hover:bg-rose-50 rounded-lg text-rose-600 font-semibold transition">
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}