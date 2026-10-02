import {
  membershipInfo,
  membershipHistory,
  activityLogItems,
} from "@/data/anggota";

import MembershipStatus from "@/app/anggota/keanggotaan/components/MembershipStatus";

import MembershipTierSection from "@/app/anggota/keanggotaan/components/MembershipTier";

import OrderTrackingSection from "@/app/anggota/keanggotaan/components/OrderTracking";

import KeanggotaanMobile from "./components/KeanggotaanMobile";

import ActivityLogSection from "@/app/anggota/log-aktivitas/components/ActivityLogSection";

export default function KeanggotaanPage() {
  return (
    <>
      {/* ========================================================= */}
      {/* 1. TAMPILAN DESKTOP (>= sm) */}
      {/* ========================================================= */}

      <div className="hidden sm:block mx-auto max-w-[1200px] space-y-4">
        <section className="mb-2">
          <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
            Status Keanggotaan
          </h1>

          <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
            Masa berlaku, riwayat, dan pengajuan status cattery.
          </p>
        </section>

        <MembershipStatus
          info={membershipInfo}
          history={membershipHistory}
        />

        <MembershipTierSection />

        <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <OrderTrackingSection />
          <ActivityLogSection activities={activityLogItems} />
        </section>
      </div>

      {/* ========================================================= */}
      {/* 2. TAMPILAN MOBILE (< sm) */}
      {/* ========================================================= */}

      <KeanggotaanMobile
        info={membershipInfo}
        activities={activityLogItems}
      />
    </>
  );
}