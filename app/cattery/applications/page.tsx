"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ApplicationStepper from "./components/ApplicationStepper";
import { mockApplications } from "@/data/cattery";
import { ApplicationItem } from "@/types/cattery";

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        return <span className="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-bold text-sky-700">{label}</span>;
      case "revision":
        return <span className="rounded-full bg-[var(--color-brand-orange-100)] px-3 py-1 text-[11px] font-bold text-amber-700">{label}</span>;
      case "approved":
        return <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">{label}</span>;
      default:
        return <span className="rounded-full bg-gray-50 px-3 py-1 text-[11px] font-bold text-gray-700">{label}</span>;
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-[var(--color-ink-400)]">Memuat data pengajuan...</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--color-ink-50)] p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-4">
        
        {/* Header Section */}
        <div>
          <h1 className="hidden md:block font-display text-xl sm:text-2xl font-bold text-[#1a1513]">
            Applications
          </h1>
          <p className="text-xs sm:text-sm text-[#8c8074] leading-relaxed mt-1">
            Semua pengajuan mating report dan pengajuan cattery beserta progres statusnya.
          </p>
        </div>

        {/* Tombol Mating Report Mobile */}
        <div className="block md:hidden pt-1">
          <Link
            href="/cattery/mating-reports"
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-sm shadow-md flex items-center justify-center active:scale-[0.98] transition"
          >
            Buat mating report
          </Link>
        </div>

        {/* List Applications */}
        <div className="space-y-4 pt-2"> 
          {applications.map((item) => (
            <div 
              key={item.id} 
              className="rounded-3xl border border-[#eedfd5] p-5 sm:p-6 shadow-xs bg-white space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1a1513]">
                    {item.code} · {item.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#8c8074]">{item.subtitle}</p>
                </div>

                {/* Badge Status & Tombol Detail (Desktop) */}
                <div className="flex items-center gap-3 shrink-0">
                  {getStatusBadge(item.status, item.statusLabel)}
                  <button
                    onClick={() => router.push(`/cattery/applications/${item.id}`)}
                    className="hidden md:inline-block rounded-xl border border-[var(--color-ink-100)] px-3.5 py-1.5 text-[12px] font-medium text-[var(--color-ink-400)] hover:bg-[var(--color-ink-50)] bg-gradient-to-b from-white to-[var(--color-ink-300)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
                  >
                    Detail
                  </button>
                </div>
              </div>

              <ApplicationStepper currentStep={item.currentStep} />

              {/* Tombol Detail Mobile */}
              <div className="block md:hidden pt-2">
                <button
                  onClick={() => router.push(`/cattery/applications/${item.id}`)}
                  className="w-full py-2.5 rounded-full border border-[#eedfd5] text-xs font-bold text-[#1a1513] hover:bg-[#faf7f2] transition"
                >
                  Detail
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}