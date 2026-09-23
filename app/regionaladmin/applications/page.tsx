"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { applicationQueueItems } from "@/data/regionalAdmin";
import StatusFilterTabs from "./components/StatusFilterTabs";
import ApplicationStatusBadge from "./components/ApplicationStatusBadge";   
import type { ApplicationStatus } from "@/types/regionalAdmin";
import DashboardIcon from "@/components/anggota/DashboardIcon";

function ApplicationQueueContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil query param "status", jika tidak ada gunakan "Semua"
  const statusParam = searchParams.get("status") || "Semua";

  const [activeFilter, setActiveFilter] = useState(statusParam);
  const [region, setRegion] = useState("Bandung");

  // Sinkronkan state jika parameter di URL berubah
  useEffect(() => {
    const status = searchParams.get("status");
    if (status) {
      setActiveFilter(status);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    if (activeFilter === "Semua") return applicationQueueItems;
    return applicationQueueItems.filter((item) => item.status === activeFilter);
  }, [activeFilter]);

  const counts = useMemo(() => {
    const base: Record<string, number> = { Semua: applicationQueueItems.length, Baru: 0, "Sedang direview": 0, "Perlu revisi": 0, Disetujui: 0, Ditolak: 0 };
    applicationQueueItems.forEach((item) => { base[item.status]++; });
    return base as Record<"Semua" | ApplicationStatus, number>;
  }, []);

  return (
    <main className="min-h-full">
      <div className="mx-auto max-w-[1200px]">
        <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StatusFilterTabs counts={counts} active={activeFilter} onChange={setActiveFilter} />

            <div className="flex items-center gap-2">
              <select
                disabled
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="cursor-not-allowed rounded-lg border border-[var(--color-ink-100)] px-5 py-1.5 bg-[var(--color-ink-50)]/70 text-left text-[12px] font-medium text-[var(--color-ink-700)]/80 outline-none focus:border-[var(--color-brand-orange-300)]"
              >
                <option>Bandung</option>
              </select>
              <span className="text-[11px] font-medium text-[var(--color-ink-400)]">
                Terkunci
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--color-ink-100)] bg-white px-2 mt-5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="border-b border-[var(--color-ink-100)]">
                  <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">Nomor</th>
                  <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">Pemohon</th>
                  <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">Wilayah</th>
                  <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">Menunggu</th>
                  <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">Status</th>
                  <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">Dikirim</th>
                  <th className="px-2 py-2.5 text-right text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-ink-100)]">
                {filtered.map((item) => (
                  <tr key={item.id} className="transition hover:bg-[var(--color-brand-orange-50)]">
                    <td className="px-2 py-3 text-[13px] font-medium text-[var(--color-ink-900)]">{item.code}</td>
                    <td className="px-2 py-3">
                      <p className="text-[13px] font-medium text-[var(--color-ink-900)]">{item.applicantName}</p>
                      <p className="text-[11px] text-[var(--color-ink-400)]">{item.applicantType}</p>
                    </td>
                    <td className="px-2 py-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        <DashboardIcon name="pin" size={12} /> {item.region}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-[13px] text-[var(--color-ink-900)]">{item.waitingLabel}</td>
                    <td className="px-2 py-3"><ApplicationStatusBadge status={item.status} /></td>
                    <td className="px-2 py-3 text-[13px] text-[var(--color-ink-700)]">{item.submittedDate}</td>
                    <td className="px-2 py-3 text-right">
                      <button
                        onClick={() => router.push(`/regionaladmin/applications/${item.id}`)}
                        className="text-[12px] font-semibold text-[var(--color-brand-orange-700)] hover:underline cursor-pointer"
                      >
                        Review →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-ink-100)] pt-2 px-3 space-y-1">
            <p className="text-[12px] text-[var(--color-ink-400)]">
              Menampilkan {filtered.length} dari {filtered.length} aplikasi di wilayah {region}
            </p>
            <div className="flex items-center gap-3 pb-2">
              <span className="text-[12px] text-[var(--color-ink-400)]">Baris per halaman</span>
              <select className="rounded-lg border border-[var(--color-ink-100)] text-[var(--color-ink-400)] px-2 py-1 text-[12px]">
                <option>8</option>
              </select>
              <button className="cursor-not-allowed rounded-full border border-[var(--color-ink-100)] px-4 py-1.5 text-[12px] font-medium text-[var(--color-ink-400)]">
                Sebelumnya
              </button>
              <button className="rounded-full border border-[var(--color-brand-orange-300)] px-4 py-1.5 text-[12px] font-medium text-[var(--color-brand-orange-700)] hover:bg-[var(--color-brand-orange-50)]">
                Berikutnya →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[var(--color-info)]/30 bg-[var(--color-info-bg)] p-4 text-[12px] text-[var(--color-info)]">
          <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Filter wilayah terkunci ke {region}. Aplikasi dari wilayah lain tidak masuk ke antrean akun ini — pembatasan ini disengaja, bukan error.
        </div>
      </div>
    </main>
  );
}

// Wrapper Suspense wajib saat menggunakan useSearchParams di App Router Next.js
export default function ApplicationQueuePage() {
  return (
    <Suspense fallback={<div className="p-5 text-xs text-[var(--color-ink-400)]">Memuat...</div>}>
      <ApplicationQueueContent />
    </Suspense>
  );
}