"use client";

import DashboardIcon from "../DashboardIcon";

interface MobileHeaderProps {
  mobileTitle: string;
  mobileSubtitle?: string;
  isStorePage: boolean;
  cartCount: number;
  unreadNotificationCount: number;
  onOpenMobileCart?: (e?: React.MouseEvent) => void;
  onOpenMobileNotif?: () => void;
}

export default function MobileHeader({
  mobileTitle,
  mobileSubtitle,
  isStorePage,
  cartCount,
  unreadNotificationCount,
  onOpenMobileCart,
  onOpenMobileNotif,
}: MobileHeaderProps) {
  return (
    <div className="flex md:hidden w-full items-center justify-between">
      {/* Title Mobile */}
      <div>
        <h1 className="text-[18px] font-bold tracking-tight text-[#231A14] leading-tight">
          {mobileTitle}
        </h1>
        {mobileSubtitle && (
          <p className="text-[11px] text-[#8C827A] mt-0.5">
            {mobileSubtitle}
          </p>
        )}
      </div>

      {/* Actions Mobile */}
      <div className="flex items-center gap-2">
        {/* Cart Mobile */}
        {isStorePage && (
          <button
            type="button"
            onClick={onOpenMobileCart}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2D7CC] bg-white text-[#231A14] transition hover:bg-[#FAF7F5] active:scale-95 shrink-0 shadow-xs cursor-pointer"
            aria-label="Keranjang"
          >
            <svg className="w-4.5 h-4.5 text-[#1F1B18]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#E54D2E] text-white text-[9px] font-bold leading-none border border-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        )}

        {/* Notifikasi Mobile */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={onOpenMobileNotif}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#231A14] transition hover:bg-[#EFE9E1]/50 cursor-pointer"
            aria-label="Notifikasi"
          >
            <DashboardIcon name="bell" size={18} />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#D95D1E] text-white text-[9px] font-bold leading-none border border-white shadow-xs">
                {unreadNotificationCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}