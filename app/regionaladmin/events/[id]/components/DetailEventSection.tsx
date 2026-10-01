"use client";

import { REGIONS } from "@/data/regionalAdmin";
import type { EventFormData } from "@/types/regionalAdmin";

interface DetailEventSectionProps {
  formData: EventFormData;
  onChange: (patch: Partial<EventFormData>) => void;
  onBannerPick: (file: File) => void;
}

export default function DetailEventSection({ formData, onChange, onBannerPick }: DetailEventSectionProps) {
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onBannerPick(file);
  };

  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
      <h2 className="text-[15px] font-semibold text-[var(--color-ink-900)]">Detail event</h2>
      <p className="mt-0.5 text-[12px] text-[var(--color-ink-400)]">
        Data ini tampil di agenda event Member dan Cattery Portal.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label className="text-[12px] font-medium text-[var(--color-ink-700)]">
            Nama event <span className="text-[var(--color-danger)]">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Contoh: ICA Cat Show Bandung 2026"
            className="cursor-pointer mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
          />
        </div>

        <div>
          <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Wilayah</label>
          <select
            value={formData.region}
            onChange={(e) => onChange({ region: e.target.value })}
            className="cursor-pointer mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Tanggal mulai</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => onChange({ startDate: e.target.value })}
            className="cursor-pointer mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
          />
        </div>

        <div>
          <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Tanggal selesai</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => onChange({ endDate: e.target.value })}
            className="cursor-pointer mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
          />
        </div>

        <div>
          <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Lokasi</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="Contoh: Trans Convention Center"
            className="cursor-pointer mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
          />
        </div>

        <div>
          <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Harga tiket per slot</label>
          <input
            type="number"
            value={formData.pricePerSlot}
            onFocus={(e) => e.target.select()}
            onChange={(e) => onChange({ pricePerSlot: Number(e.target.value) })}
            className="cursor-pointer mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Kas penerima pendapatan</label>
        <input
          type="text"
          value={`Kas Regional Bandung`}
          readOnly
          className="mt-1.5 w-full cursor-not-allowed rounded-lg border border-[var(--color-ink-100)] bg-gray-50 px-3 py-2 text-[13px] text-[var(--color-ink-700)] outline-none"
        />
        <p className="mt-1 text-[11px] text-[var(--color-brand-orange-700)]">
          Seluruh pendapatan event ini masuk ke kas Regional Bandung.
        </p>
      </div>

      <div className="mt-4">
        <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Banner event</label>
        <label className="mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--color-ink-200)] bg-gray-50 py-10 text-[var(--color-ink-400)] transition hover:bg-gray-100">
          {formData.bannerUrl ? (
            <img src={formData.bannerUrl} alt="Banner event" className="h-40 w-full max-w-2xl rounded-lg object-cover" />
          ) : (
            <>
              <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="9" cy="10" r="2" />
                <path strokeLinecap="round" d="M21 16l-5.5-5.5L9 17" />
              </svg>
              <span className="text-[11px] font-medium">Banner event · 1600×600</span>
            </>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
        </label>
      </div>
    </div>
  );
}