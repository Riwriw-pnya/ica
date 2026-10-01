"use client";

import type { EventFormData } from "@/types/regionalAdmin";

interface WarTicketingSectionProps {
  formData: EventFormData;
  onChange: (patch: Partial<EventFormData>) => void;
}

function formatDateID(dateStr: string) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export default function WarTicketingSection({ formData, onChange }: WarTicketingSectionProps) {
  const countdownLabel = `${String(formData.timeoutMinutes).padStart(2, "0")}:00`;

  return (
    <>
      <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
        <h2 className="text-[15px] font-semibold text-[var(--color-ink-900)]">Masa berlaku link war ticketing</h2>
        <p className="mt-0.5 text-[12px] text-[var(--color-ink-400)]">
          Setelah waktu ini lewat, link pendaftaran menolak checkout baru. Peserta yang sudah
          menahan slot tetap diberi waktu sampai timeout pembayarannya habis.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
            <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Link aktif mulai</label>
            <input
              type="date"
              value={formData.linkStartDate}
              onChange={(e) => onChange({ linkStartDate: e.target.value })}
              className="cursor-pointer mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
            />
          </div>

          <div>
            <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Jam mulai</label>
            <input
              type="time"
              value={formData.linkStartTime}
              onChange={(e) => onChange({ linkStartTime: e.target.value })}
              className="cursor-pointer mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
            />
          </div>

          <div>
            <label className="text-[12px] font-medium text-[var(--color-ink-700)]">
              Tanggal kedaluwarsa <span className="text-[var(--color-danger)]">*</span>
            </label>
            <input
              type="date"
              value={formData.linkExpiryDate}
              onChange={(e) => onChange({ linkExpiryDate: e.target.value })}
              className="cursor-pointer mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
            />
          </div>

          <div>
            <label className="text-[12px] font-medium text-[var(--color-ink-700)]">
              Jam kedaluwarsa <span className="text-[var(--color-danger)]">*</span>
            </label>
            <input
              type="time"
              value={formData.linkExpiryTime}
              onChange={(e) => onChange({ linkExpiryTime: e.target.value })}
              className="cursor-pointer mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[var(--color-ink-100)] pt-4">
          <div>
            <p className="text-[13px] font-medium text-[var(--color-ink-900)]">
              Tutup link otomatis saat semua kuota habis
            </p>
            <p className="mt-0.5 text-[11px] text-[var(--color-ink-400)]">
              Link berhenti menerima pendaftar sebelum tanggal kedaluwarsa kalau seluruh kategori
              sudah penuh.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onChange({ autoCloseWhenFull: !formData.autoCloseWhenFull })}
            className={`cursor-pointer relative h-6 w-11 shrink-0 rounded-full transition ${
              formData.autoCloseWhenFull ? "border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28]" : "bg-gray-300"
            }`}
          >
            <span
              className={`cursor-pointer absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                formData.autoCloseWhenFull ? "translate-x-0.5" : "-translate-x-5"
              }`}
            />
          </button>
        </div>

        <div className="mt-4 rounded-lg bg-[var(--color-brand-orange-50)] p-3.5 text-[12px] text-[var(--color-brand-orange-700)]">
          Link pendaftaran aktif {formatDateID(formData.linkStartDate)} {formData.linkStartTime} sampai{" "}
          {formatDateID(formData.linkExpiryDate)} {formData.linkExpiryTime} WIB.
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
        <h2 className="text-[15px] font-semibold text-[var(--color-ink-900)]">Time out payment</h2>
        <p className="mt-0.5 text-[12px] text-[var(--color-ink-400)]">
          Batas waktu peserta menyelesaikan pembayaran setelah slot ditahan. Nilai ini yang dipakai
          countdown di sisi peserta.
        </p>

        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div>
            <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Durasi (menit)</label>
            <input
              type="number"
              min={1}
              value={formData.timeoutMinutes}
              onChange={(e) => onChange({ timeoutMinutes: Math.max(1, Number(e.target.value)) })}
              className="mt-1.5 w-32 rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
            />
          </div>

          <span className="rounded-lg bg-gray-50 px-3 py-2 text-[13px] font-medium text-[var(--color-ink-700)]">
            Countdown peserta: {countdownLabel}
          </span>
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[var(--color-info)]/30 bg-[var(--color-info-bg)] p-3.5 text-[12px] text-[var(--color-info)]">
          <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
          <span>
            [PRD TBD] Perilaku setelah waktu habis belum ditetapkan: peserta diberi kesempatan retry
            langsung, atau harus mengulang dari halaman Event seperti pendaftar baru. Prototype
            memakai opsi kedua.
          </span>
        </div>
      </div>
    </>
  );
}