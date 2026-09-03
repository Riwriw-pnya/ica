import { membershipInfo, membershipHistory } from "@/data/anggota";
import MembershipStatus from "@/components/anggota/MembershipStatus";

export default function KeanggotaanPage() {
  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="mx-auto max-w-[1200px] p-5 lg:p-6">
        <section className="mb-5">
          <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
            Status Keanggotaan
          </h1>
          <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
            Masa berlaku, riwayat, dan pengajuan status cattery.
          </p>
        </section>

        <MembershipStatus info={membershipInfo} history={membershipHistory} />
      </div>
    </main>
  );
}