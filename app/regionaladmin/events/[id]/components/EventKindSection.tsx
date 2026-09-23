"use client";

import type { EventKind } from "@/types/regionalAdmin";

interface EventKindOption {
  value: EventKind;
  label: string;
  description: string;
}

const OPTIONS: EventKindOption[] = [
  { value: "Diklat Cattery", label: "Diklat Cattery", description: "Badge otomatis di profil peserta · akumulatif" },
  { value: "Diklat Grooming", label: "Diklat Grooming", description: "Badge otomatis di profil peserta · akumulatif" },
  { value: "Cat Show", label: "Cat Show", description: "Penilaian juri · memakai pengaturan benching" },
  { value: "Propaganda", label: "Propaganda", description: "Sosialisasi publik · tidak menerbitkan badge" },
];

interface EventKindSectionProps {
  eventKind: EventKind;
  onChange: (value: EventKind) => void;
}

export default function EventKindSection({ eventKind, onChange }: EventKindSectionProps) {
  const infoText =
    eventKind === "Cat Show"
      ? "Jenis Cat Show tidak menerbitkan badge. Keikutsertaan tetap tercatat di riwayat event peserta."
      : eventKind === "Propaganda"
        ? "Event sosialisasi tidak menerbitkan badge apa pun ke profil peserta."
        : `Setiap peserta yang kehadirannya diverifikasi otomatis menerima badge ${eventKind} di profilnya. Badge bersifat akumulatif — ikut 2 kali berarti 2 badge.`;

  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
      <h2 className="text-[15px] font-semibold text-[var(--color-ink-900)]">Jenis event ICA</h2>
      <p className="mt-0.5 text-[12px] text-[var(--color-ink-400)]">
        Jenis event menentukan badge yang diterbitkan otomatis ke profil peserta di Member dan
        Cattery Portal.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {OPTIONS.map((opt) => {
          const isSelected = eventKind === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`cursor-pointer rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-[var(--color-brand-orange-500)] bg-[var(--color-brand-orange-50)]"
                  : "border-[var(--color-ink-100)] hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${isSelected ? "border-[var(--color-brand-orange-500)]" : "border-[var(--color-ink-100)]"}`}>
                  {isSelected && <span className="h-2 w-2 rounded-full bg-[var(--color-brand-orange-500)]" />}
                </span>
                <p className="text-[13px] font-semibold text-[var(--color-ink-900)]">{opt.label}</p>
              </div>
              <p className="mt-1.5 text-[11px] text-[var(--color-ink-400)]">{opt.description}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[var(--color-success)]/30 bg-[var(--color-success-bg)] p-3.5 text-[12px] text-[var(--color-success)]">
        <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3l7.5 7.5M6 9.5V20a1 1 0 001 1h10a1 1 0 001-1V9.5" />
        </svg>
        <span>{infoText}</span>
      </div>
    </div>
  );
}