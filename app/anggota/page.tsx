import { eventListItems } from "@/data/anggota";
import MemberCard from "@/components/anggota/MemberCard";
import QuickAccess from "@/components/anggota/QuickAccess";
import NewsSection from "@/components/anggota/NewsSection";
import UpcomingEvents from "@/components/anggota/UpcomingEvents";

export default function DashboardPage() {
  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="mx-auto max-w-[1200px] p-5 lg:p-6">
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
      </div>
    </main>
  );
}