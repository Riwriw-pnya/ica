"use client";

import type { EventQuotaCategory } from "@/types/regionalAdmin";

interface QuotaSectionProps {
  quotas: EventQuotaCategory[];
  onChangeQuota: (id: string, patch: Partial<EventQuotaCategory>) => void;
}

function formatRupiah(value: number) {
  return `Rp${value.toLocaleString("id-ID")}`;
}

export default function QuotaSection({ quotas, onChangeQuota }: QuotaSectionProps) {
  const totalSlot = quotas.reduce((sum, q) => sum + q.quota, 0);
  const totalPotential = quotas.reduce((sum, q) => sum + q.quota * q.pricePerSlot, 0);

  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
      <h2 className="text-[15px] font-semibold text-[var(--color-ink-900)]">Kuota per kategori peserta</h2>
      <p className="mt-0.5 text-[12px] text-[var(--color-ink-400)]">
        Setiap peserta hanya bisa membeli dari kuota kategori yang sesuai role akunnya.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[500px] text-left">
          <thead>
            <tr className="border-b border-[var(--color-ink-100)]">
              <th className="px-2 py-2 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">Kategori</th>
              <th className="px-2 py-2 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">Kuota</th>
              <th className="px-2 py-2 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">Harga tiket (Rp)</th>
              <th className="px-2 py-2 text-right text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">Potensi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-ink-100)]">
            {quotas.map((q) => (
              <tr key={q.id}>
                <td className="px-2 py-3">
                  <p className="text-[13px] font-medium text-[var(--color-ink-900)]">{q.category}</p>
                  <p className="text-[11px] text-[var(--color-ink-400)]">{q.description}</p>
                </td>
                <td className="px-2 py-3">
                  <input
                    type="number"
                    value={q.quota}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => onChangeQuota(q.id, { quota: Number(e.target.value) })}
                    className="w-24 rounded-lg border border-[var(--color-ink-100)] px-2.5 py-1.5 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
                  />
                </td>
                <td className="px-2 py-3">
                  <input
                    type="number"
                    value={q.pricePerSlot}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => onChangeQuota(q.id, { pricePerSlot: Number(e.target.value) })}
                    className="w-28 rounded-lg border border-[var(--color-ink-100)] px-2.5 py-1.5 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
                  />
                </td>
                <td className="px-2 py-3 text-right text-[13px] font-semibold text-[var(--color-ink-900)]">
                  {formatRupiah((q.quota || 0) * (q.pricePerSlot || 0))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-[var(--color-brand-orange-50)] p-4">
        <div>
          <p className="text-[13px] font-semibold text-[var(--color-ink-900)]">Total slot event</p>
          <p className="text-[11px] text-[var(--color-ink-400)]">
            Potensi pendapatan maksimal {formatRupiah(totalPotential)}
          </p>
        </div>
        <p className="text-[22px] font-bold text-[var(--color-brand-orange-700)]">{totalSlot}</p>
      </div>

      <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-[var(--color-info)]/30 bg-[var(--color-info-bg)] p-3.5 text-[12px] text-[var(--color-info)]">
        <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
        </svg>
        <span>
          [PRD TBD] Kategori Sponsor (Cattery) masih didesain sebagai kuota biasa. Perlu konfirmasi:
          apakah sponsor ikut checkout kompetitif, atau slot di-assign langsung oleh admin ke cattery
          tertentu tanpa war ticketing?
        </span>
      </div>
    </div>
  );
}