import Link from "next/link";
import { eventListItems, leaderboardEntries } from "@/data/anggota";
import LeaderboardTable from "@/components/anggota/LeaderboardTable";

interface PageProps {
  searchParams: Promise<{ event?: string }>;
}

export default async function LeaderboardPage({ searchParams }: PageProps) {
  const { event: eventId } = await searchParams;
  const event = eventId
    ? eventListItems.find((item) => item.id === Number(eventId))
    : undefined;

  const title = event ? `Leaderboard — ${event.title}` : "Leaderboard";
  const backHref = event
    ? `/anggota/event/${event.id}`
    : "/anggota/event";

  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="mx-auto max-w-[1200px] p-5 lg:p-6">
        <Link
          href={backHref}
          className="text-[12px] font-sans font-medium text-[var(--color-brand-orange-700)] hover:underline"
        >
          ←  Kembali ke event
        </Link>

        <section className="mb-5 mt-2 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
              {title}
            </h1>
            <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
              Tabel peringkat generik. Formula perhitungan poin dan kategori ring belum
              ditentukan, menunggu konfirmasi PO.
            </p>
          </div>
        </section>

        <LeaderboardTable entries={leaderboardEntries} />
      </div>
    </main>
  );
}