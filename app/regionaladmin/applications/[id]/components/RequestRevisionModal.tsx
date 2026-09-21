"use client";

import { useState } from "react";

interface RequestRevisionModalProps {
  onCancel: () => void;
  onConfirm: (selectedCheckboxes: string[], notes: string) => void;
}

const DEFAULT_REVISION_OPTIONS = [
  "Sertifikat pedigree induk betina kurang jelas",
  "Tanggal mating tidak sesuai rentang kehamilan",
  "Foto pasangan tidak menampilkan kedua induk",
];

export default function RequestRevisionModal({ onCancel, onConfirm }: RequestRevisionModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const toggleOption = (opt: string) => {
    setSelectedOptions((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(selectedOptions, notes);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onCancel}>
      <div className="w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[16px] font-semibold text-[var(--color-ink-900)]">Minta revisi ke pemohon</h2>
            <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
              Pemohon menerima notifikasi berisi daftar perbaikan di bawah. Status aplikasi berubah menjadi Perlu revisi.
            </p>
          </div>
          <button onClick={onCancel} className="shrink-0 rounded-full p-1 text-[var(--color-ink-400)] hover:bg-gray-100" aria-label="Tutup">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            {DEFAULT_REVISION_OPTIONS.map((option) => (
              <label key={option} className="flex items-center gap-3 rounded-lg border border-gray-100 p-2.5 text-[13px] text-[var(--color-ink-900)] cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="h-4 w-4 rounded border-gray-300 text-[var(--color-brand-orange-500)] focus:ring-[var(--color-brand-orange-300)]"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[var(--color-ink-900)] mb-1">
              Catatan untuk pemohon
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jelaskan perbaikan yang diperlukan dengan singkat."
              rows={3}
              className="w-full resize-none rounded-lg border border-[var(--color-ink-100)] p-3 text-[13px] outline-none focus:border-[var(--color-brand-orange-300)]"
            />
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
              className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D]"
            >
              Kirim permintaan revisi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}