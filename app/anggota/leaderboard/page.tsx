import Link from "next/link";
import { eventListItems, leaderboardEntries } from "@/data/anggota";
import LeaderboardTable from "@/components/anggota/LeaderboardTable";
import LeaderboardMobile from "@/components/anggota/LeaderboardMobile";

interface PageProps {
  searchParams: Promise<{ event?: string }>;
}

export default async function LeaderboardPage({ searchParams }: PageProps) {
  const { event: eventId } = await searchParams;
  const event = eventId
    ? eventListItems.find((item) => item.id === Number(eventId))
    : undefined;

  const title = event ? `Leaderboard — ${event.title}` : "Leaderboard Skor Kucing";
  const backHref = event
    ? `/anggota/event/${event.id}`
    : "/anggota/direktori";

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-2 pb-6 md:px-6 md:pt-4 md:py-8">
      
      {/* TOMBOL KEMBALI */}
      <Link
        href={backHref}
        className="inline-flex items-center text-[12px] font-sans font-medium text-[var(--color-brand-orange-700)] hover:underline mb-2 md:mb-3"
      >
        ← Kembali
      </Link>

      {/* 1. TAMPILAN MOBILE */}
      <div className="block md:hidden">
        <LeaderboardMobile 
          entries={leaderboardEntries} 
          eventTitle={event?.title} 
        />
      </div>

      {/* 2. TAMPILAN DESKTOP */}
      <div className="hidden md:block">
        <section className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-[24px] font-semibold tracking-tight text-[var(--color-ink-900)]">
              {title}
            </h1>
            <p className="mt-0.5 text-sm text-[#857B72]">
              Peringkat resmi musim 2026 yang dikelola oleh komite penjurian.
            </p>
          </div>
        </section>

        <LeaderboardTable entries={leaderboardEntries} />
      </div>

    </div>
  );
}