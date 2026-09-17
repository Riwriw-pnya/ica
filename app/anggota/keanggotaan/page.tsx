import { membershipInfo, membershipHistory } from "@/data/anggota";
import MembershipStatus from "@/app/anggota/keanggotaan/components/MembershipStatus";
import MembershipTierSection from "@/app/anggota/keanggotaan/components/MembershipTier";
import OrderTrackingSection from "@/app/anggota/keanggotaan/components/OrderTracking";

export default function KeanggotaanPage() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-4">
      <section className="mb-2">
        <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
          Status Keanggotaan
        </h1>
        <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
          Masa berlaku, riwayat, dan pengajuan status cattery.
        </p>
      </section>

      <MembershipStatus info={membershipInfo} history={membershipHistory} />
      
      <MembershipTierSection />

      <OrderTrackingSection />
    </div>
  );
}