import Link from "next/link";
import { eventListItems } from "@/data/anggota";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = eventListItems.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <main className="flex min-h-full items-center justify-center bg-[var(--color-background)] p-5">
        <p className="text-[13px] text-[var(--color-ink-400)]">Event tidak ditemukan.</p>
      </main>
    );
  }

  return (
    <main className="min-h-full bg-[var(--color-background)]">
      <div className="mx-auto max-w-[700px] p-5 lg:p-6">
        <Link
          href="/anggota/event"
          className="text-[12px] font-medium text-[var(--color-brand-orange-700)] hover:underline"
        >
          ← Kembali ke Event
        </Link>

        <div className="mt-4 rounded-xl border border-[var(--color-ink-100)] bg-white p-6">
          <h1 className="font-display text-[20px] font-semibold text-[var(--color-ink-900)]">
            {event.title}
          </h1>
          <p className="mt-1 text-[13px] text-[var(--color-ink-700)]">
            {event.location} · {event.scope} · Kuota {event.quota} peserta
          </p>

          <div className="mt-6 rounded-lg bg-[var(--color-background)] p-4 text-center text-[12px] text-[var(--color-ink-400)]">
            Formulir pendaftaran event masih dalam pengembangan.
          </div>
        </div>
      </div>
    </main>
  );
}