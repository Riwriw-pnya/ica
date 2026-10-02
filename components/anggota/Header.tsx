"use client";

import { usePathname, useRouter } from "next/navigation";
import DesktopHeader from "./header/DesktopHeader";
import MobileHeader from "./header/MobileHeader";
import { useUserMenu } from "@/context/UserMenuContext";

interface PageMeta {
  desktopTitle: string;
  mobileTitle: string;
  mobileSubtitle?: string;
}

const pageMetaMap: Record<string, PageMeta> = {
  "/anggota/dashboard": {
    desktopTitle: "Beranda",
    mobileTitle: "Halo, Ayu",
    mobileSubtitle: "Ringkasan keanggotaan Anda",
  },
  "/anggota/direktori": {
    desktopTitle: "Direktori Cattery",
    mobileTitle: "Direktori Cattery",
    mobileSubtitle: "Cattery terdaftar ICA",
  },
  "/anggota/berita": {
    desktopTitle: "Berita",
    mobileTitle: "Berita",
    mobileSubtitle: "Informasi dan pengumuman terbaru",
  },
  "/anggota/keanggotaan": {
    desktopTitle: "Keanggotaan",
    mobileTitle: "Keanggotaan",
    mobileSubtitle: "Kelola status dan data keanggotaan",
  },
  "/anggota/event": {
    desktopTitle: "Event",
    mobileTitle: "Event",
    mobileSubtitle: "Jadwal dan pendaftaran event ICA",
  },
  "/anggota/store": {
    desktopTitle: "Store",
    mobileTitle: "Store ICA",
    mobileSubtitle: "Merchandise dan publikasi resmi",
  },
  "/anggota/leaderboard": {
    desktopTitle: "Leaderboard",
    mobileTitle: "Leaderboard",
    mobileSubtitle: "Peringkat cattery dan kucing",
  },
};

function getPageMeta(pathname: string): PageMeta {
  if (pageMetaMap[pathname]) return pageMetaMap[pathname];

  const match = Object.keys(pageMetaMap)
    .filter((path) => path !== "/anggota" && pathname.startsWith(`${path}/`))
    .sort((a, b) => b.length - a.length)[0];

  return match
    ? pageMetaMap[match]
    : { desktopTitle: "Beranda", mobileTitle: "Beranda" };
}

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
  unreadNotificationCount?: number;
  onOpenMobileNotif?: () => void;
}

export default function Header({
  cartCount = 0,
  onOpenCart,
  unreadNotificationCount = 0,
  onOpenMobileNotif,
}: HeaderProps) {
  const { closeMenu } = useUserMenu();
  const router = useRouter();
  const pathname = usePathname();

  const pageMeta = getPageMeta(pathname);
  const isStorePage = pathname.startsWith("/anggota/store");

  const handleLogout = () => {
    closeMenu();
    router.push("/auth/login/member");
  };

  const handleCartClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onOpenCart) onOpenCart();

    if (typeof window !== "undefined") {
      sessionStorage.setItem("open_cart_on_load", "true");
      window.dispatchEvent(new CustomEvent("open-mobile-cart"));
      window.dispatchEvent(new CustomEvent("open-store-cart"));
    }

    // Jika sedang tidak di halaman store, pindahkan ke halaman store
    if (!isStorePage) {
      router.push("/anggota/store");
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#EFE9E1] bg-[#FAF8F5] px-4 pt-[max(env(safe-area-inset-top),0.75rem)] pb-2.5 md:bg-white md:px-6 md:py-0">
      {/* Khusus Mobile View */}
      <MobileHeader
        mobileTitle={pageMeta.mobileTitle}
        mobileSubtitle={pageMeta.mobileSubtitle}
        isStorePage={isStorePage}
        cartCount={cartCount}
        unreadNotificationCount={unreadNotificationCount}
        onOpenMobileCart={handleCartClick}
        onOpenMobileNotif={onOpenMobileNotif}
      />

      {/* Khusus Desktop View */}
      <DesktopHeader
        desktopTitle={pageMeta.desktopTitle}
        cartCount={cartCount}
        onCartClick={handleCartClick}
        onLogout={handleLogout}
      />
    </header>
  );
}