import MemberCard from "@/components/dashboard_member/MemberCard";
import QuickAccess from "@/components/dashboard_member/QuickAccess";
import NewsSection from "@/components/dashboard_member/NewsSection";
import UpcomingEvents from "@/components/dashboard_member/UpcomingEvents";

export default function DashboardPage() {
  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="mx-auto max-w-[1200px] p-5 lg:p-6">
        {/* Welcome */}
        <section className="mb-5">
          <h1 className="font-heading text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
            Halo, Ayu
          </h1>

          <p className="mt-1 font-body text-[12px] text-[var(--color-ink-700)]">
            Ringkasan keanggotaan dan kegiatan ICA untuk Anda.
          </p>
        </section>

        {/* Top cards */}
        <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <MemberCard />
          <QuickAccess />
        </section>

        {/* Bottom cards */}
        <section className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <NewsSection />
          <UpcomingEvents />
        </section>
      </div>
    </main>
  );
}