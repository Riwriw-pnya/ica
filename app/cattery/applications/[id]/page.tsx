"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ApplicationStepper from "../components/ApplicationStepper";
import { mockApplications } from "@/data/cattery";
import { ApplicationItem } from "@/types/cattery";

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState<ApplicationItem | null>(null);

  useEffect(() => {
    const item = mockApplications.find((app) => app.id === id);
    if (item) setData(item);
  }, [id]);

  if (!data) {
    return (
      <div className="p-8 text-center text-xs text-[var(--color-ink-400)]">
        Pengajuan tidak ditemukan.
      </div>
    );
  }

  // Membersihkan teks subtitle agar tidak muncul kata "dikirim" ganda
  const cleanSubtitle = data.subtitle.replace(/^Dikirim\s*/i, "");

  return (
    <div className="p-8 bg-[var(--color-ink-50)] min-h-full">
      {/* Tombol Kembali */}
      <button
        onClick={() => router.back()}
        className="mb-5 hidden sm:flex items-center gap-1.5 text-xs font-medium text-[var(--color-brand-orange-700)] hover:underline"
      >
        ‹ Kembali ke applications
      </button>

      <div className="max-w-4xl rounded-xl border border-[var(--color-ink-100)] bg-white p-6 shadow-xs">
        <div className="flex items-start justify-between border-b border-[var(--color-ink-100)] pb-4">
          <div>
            <h1 className="font-display text-lg font-bold text-[var(--color-ink-900)]">{data.code}</h1>
            <p className="mt-1 text-xs text-[var(--color-ink-400)]">
              {data.title} · dikirim {cleanSubtitle}
            </p>
          </div>
          <span className="rounded-full bg-sky-50 px-3.5 py-1 text-xs font-semibold text-sky-700">
            {data.statusLabel}
          </span>
        </div>

        {/* Stepper Section */}
        <div className="border-b border-[var(--color-ink-100)] py-6">
          <ApplicationStepper currentStep={data.currentStep} />
        </div>

        {/* Timeline (Desktop view) */}
        <div className="mt-5 hidden sm:block relative pl-4 space-y-5 border-l-2 border-gray-200">
          {data.timeline?.map((log, idx) => (
            <div key={idx} className="relative flex items-start gap-3">
              <span className="absolute -left-[21px] mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gray-300 ring-4 ring-white" />
              <div>
                <p className="text-xs font-bold text-[var(--color-ink-900)]">{log.title}</p>
                <p className="mt-0.5 text-[11px] text-[var(--color-ink-400)]">
                  {log.date} · {log.actor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Log Aktivitas (Khusus Mobile) */}
      <div className="mt-4 block sm:hidden rounded-2xl border border-[var(--color-ink-100)] bg-white p-5 shadow-xs">
        <h2 className="text-sm font-bold text-[var(--color-ink-900)] mb-3">
          Log aktivitas
        </h2>
        <div className="space-y-4">
          {data.timeline?.map((log, idx) => (
            <div key={idx} className="flex items-start gap-3">
              {/* Bulatan Kuning/Oranye di samping kiri */}
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-warning)]" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[var(--color-ink-900)] leading-tight">
                  {log.title}
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--color-ink-400)]">
                  {log.date} · {log.actor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}