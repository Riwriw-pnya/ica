"use client";

import { useState } from "react";

interface RejectModalProps {
  onCancel: () => void;
  onConfirm: (reason: string, notes: string) => void;
}

const REASON_OPTIONS = [
  "Data pemohon tidak valid",
  "Dokumen palse atau tidak dapat diverifikasi",
  "Pengajuan duplikat",
  "Tidak memenuhi syarat ICA",
];

export default function RejectModal({ onCancel, onConfirm }: RejectModalProps) {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !notes.trim()) return;
    onConfirm(reason, notes);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onCancel}>
      <div className="w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[16px] font-semibold text-[var(--color-ink-900)]">Tolak aplikasi</h2>
            <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
              Aplikasi ditutup dan pemohon harus mengirim pengajuan baru. Gunakan Minta revisi bila masih bisa diperbaiki.
            </p>
          </div>
          <button onClick={onCancel} className="shrink-0 rounded-full p-1 text-[var(--color-ink-400)] hover:bg-gray-100" aria-label="Tutup">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-[var(--color-ink-900)] mb-1">
              Alasan penolakan
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
            >
              <option value="" disabled>Pilih alasan</option>
              {REASON_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[var(--color-ink-900)] mb-1">
              Penjelasan untuk pemohon
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Wajib diisi — dikirim bersama notifikasi penolakan."
              rows={4}
              required
              className="w-full text-[var(--color-ink-700)] resize-none rounded-lg border border-[var(--color-ink-100)] p-3 text-[13px] outline-none focus:border-[var(--color-brand-orange-500)]"
            />
          </div>

          <div className="rounded-xl border border-[var(--color-ink-100)] bg-[var(--color-ink-50)] p-3 text-[12px] text-[var(--color-ink-700)]">
            <span className="font-semibold">[PRD TBD]</span> Status "Ditolak" belum resmi final di PRD. Aksi ini dapat dinonaktifkan dari App Configuration.
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-[var(--color-ink-100)] px-5 py-2.5 text-[13px] font-medium text-[var(--color-ink-700)] hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!reason || !notes.trim()}
              className="rounded-full bg-[var(--color-danger)] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:brightness-95 disabled:opacity-50"
            >
              Tolak aplikasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}