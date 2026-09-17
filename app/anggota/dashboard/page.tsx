import { eventListItems } from "@/data/anggota";
import MemberCard from "@/app/anggota/dashboard/components/MemberCard";
import QuickAccess from "@/app/anggota/dashboard/components/QuickAccess";
import NewsSection from "@/app/anggota/dashboard/components/NewsSection";
import UpcomingEvents from "@/app/anggota/dashboard/components/UpcomingEvents";
import StoreSection from "@/components/store/StoreSection";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <section className="mb-5">
        <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
          Halo, Ayu
        </h1>
        <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
          Ringkasan keanggotaan dan kegiatan ICA untuk Anda.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <MemberCard />
        <QuickAccess />
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <NewsSection />
        <UpcomingEvents items={eventListItems.slice(0, 3)} />
      </section>

      {/* Store ICA Section */}
      <section className="mt-4">
        <StoreSection />
      </section>
    </div>
  );
}