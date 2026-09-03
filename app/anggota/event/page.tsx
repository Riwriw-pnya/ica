import { eventListItems } from "@/data/anggota";
import EventList from "@/components/anggota/EventList";

export default function EventPage() {
  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="mx-auto max-w-[1200px] p-5 lg:p-6">
        <section className="mb-5">
          <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
            Event & Cat Show
          </h1>
          <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
            Jadwal kegiatan resmi ICA sepanjang musim 2026.
          </p>
        </section>

        <EventList items={eventListItems} />
      </div>
    </main>
  );
}