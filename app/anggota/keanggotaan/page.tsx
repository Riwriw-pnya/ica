import { membershipInfo, membershipHistory } from "@/data/anggota";
import MembershipStatus from "@/components/anggota/MembershipStatus";
import MembershipTierSection from "@/components/anggota/MembershipTier";
import OrderTrackingSection from "@/components/anggota/OrderTracking";

export default function KeanggotaanPage() {
  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="mx-auto max-w-[1200px] p-5 lg:p-6 space-y-4">
        <section className="mb-2">
          <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
            Status Keanggotaan
          </h1>
          <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
            Masa berlaku, riwayat, dan pengajuan status cattery.
          </p>
        </section>

        {/* 1. Komponen Utama Masa Berlaku & Riwayat Keanggotaan */}
        <MembershipStatus info={membershipInfo} history={membershipHistory} />
        
        {/* 2. Komponen Tingkat Keanggotaan & Lencana Diklat */}
        <MembershipTierSection />

        {/* 3. Komponen Riwayat Pesanan Merchandise */}
        <OrderTrackingSection />
      </div>
    </main>
  );
}