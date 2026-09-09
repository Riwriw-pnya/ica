"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ApplicationStepper from "./components/ApplicationStepper";
import { mockApplications } from "@/data/cattery";
import { ApplicationItem } from "@/types/cattery";

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SIMULASI FETCH API BE
    // Saat BE siap, ganti mockApplications dengan: await fetch('/api/applications').then(res => res.json())
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setApplications(mockApplications);
        setLoading(false);
      }, 300);
    };

    fetchData();
  }, []);

  const getStatusBadge = (status: string, label: string) => {
    switch (status) {
      case "review":
        return <span className="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-700">{label}</span>;
      case "revision":
        return <span className="rounded-full bg-[var(--color-brand-orange-100)] px-3 py-1 text-[11px] font-semibold text-amber-700">{label}</span>;
      case "approved":
        return <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">{label}</span>;
      default:
        return <span className="rounded-full bg-gray-50 px-3 py-1 text-[11px] font-semibold text-gray-700">{label}</span>;
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-[var(--color-ink-400)]">Memuat data pengajuan...</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--color-ink-50)] p-8">
    <div>
      <div className="bg-[var-(--color-ink-50)]">
        <h1 className="font-display text-xl font-bold text-[var(--color-ink-900)]">Applications</h1>
        <p className="mt-1 text-xs text-[var(--color-ink-400)]">
          Semua pengajuan mating report dan pengajuan cattery beserta progres statusnya.
        </p>
      </div>

      <div className="mt-6 space-y-4"> 
        {applications.map((item) => (
          <div key={item.id} className="rounded-2xl border border-[var(--color-ink-100)] p-6 shadow- bg-gradient-to-b from-[#fdf9f4] to-white">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-sm font-bold text-[var(--color-ink-900)]">
                  {item.code} · {item.title}
                </h3>
                <p className="mt-0.5 text-[11px] text-[var(--color-ink-400)]">{item.subtitle}</p>
              </div>

              <div className="flex items-center gap-3">
                {getStatusBadge(item.status, item.statusLabel)}
                <button
                  onClick={() => router.push(`/cattery/applications/${item.id}`)}
                  className="rounded-xl border border-[var(--color-ink-100)] px-3.5 py-1.5 text-[12px] font-medium text-[var(--color-ink-400)] hover:bg-[var(--color-ink-50)] bg-gradient-to-b from-white to-[var(--color-ink-300)] shadow-sm
                hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
                >
                  Detail
                </button>
              </div>
            </div>

            <ApplicationStepper currentStep={item.currentStep} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}