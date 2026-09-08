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
        className="mb-5 flex items-center gap-1.5 text-xs font-medium text-[var(--color-brand-orange-700)] hover:underline"
      >
        ‹ Kembali ke applications
      </button>

      {/* Main Container Card */}
      <div className="max-w-4xl rounded-2xl border border-[var(--color-ink-100)] bg-white p-6 shadow-xs">
        {/* Header Application */}
        <div className="flex items-start justify-between border-b border-[var(--color-ink-100)] pb-6">
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

        {/* Timeline Log Section */}
        <div className="mt-6 space-y-4">
          {data.timeline?.map((log, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-orange-500)]" />
              <div>
                <p className="text-xs font-bold text-[var(--color-ink-900)]">{log.title}</p>
                <p className="mt-0.5 text-[11px] text-[var(--color-ink-4  00)]">
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