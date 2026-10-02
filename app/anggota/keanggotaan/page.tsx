"use client";

import { useState } from "react";

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

import OrderDetailDesktop, {
  type OrderDetailData,
} from "@/components/store/desktop/OrderDetailDesktop";

export default function KeanggotaanPage() {
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const orderDetail: OrderDetailData = {
    orderId: "MRC-2026-0231",
    orderDate: "05 Sep 2026, 10:22",
    itemsSummary: "Kaos ICA Official 2026 (L, 1 pcs)",
    paymentMethod: "Virtual Account",
    totalAmount: 185000,
    courier: "Belum ditentukan",
    status: "Diproses",
    shippingAddress: {
      name: "Ayu Prameswari",
      phone: "0812 3456 7890",
      address: "Jl. Contoh No. 12",
      city: "Bandung",
    },
  };

  return (
    <>
      {/* =========================================================
          1. TAMPILAN DESKTOP (>= sm)
          ========================================================= */}
      <div className="hidden sm:block mx-auto max-w-[1200px]">
        {showOrderDetail ? (
          <OrderDetailDesktop
            order={orderDetail}
            onBack={() => setShowOrderDetail(false)}
            formatRupiah={formatRupiah}
            backLabel="Kembali"
          />
        ) : (
          <div className="space-y-4">
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
              <OrderTrackingSection
                onTrackOrder={() => setShowOrderDetail(true)}
              />

              <ActivityLogSection activities={activityLogItems} />
            </section>
          </div>
        )}
      </div>

      {/* =========================================================
          2. TAMPILAN MOBILE (< sm)
          ========================================================= */}
      <KeanggotaanMobile
        info={membershipInfo}
        activities={activityLogItems}
      />
    </>
  );
}