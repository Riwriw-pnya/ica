"use client";

import { useState } from "react";
import type { OffspringItem, CatCertificateFile } from "@/types/cattery";

interface StepReviewSubmitProps {
  maleName: string;
  femaleName: string;
  maleRegCode: string;
  femaleRegCode: string;
  matingDate: string;
  estimatedBirthDate: string;
  witnessName: string;
  offspringItems: OffspringItem[];
  documents: { label: string; file: CatCertificateFile | null }[];
  onEditStep: (step: number) => void;
  onSubmit: () => void;
}

function formatDateRange(dateStr: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export default function StepReviewSubmit({
  maleName,
  femaleName,
  maleRegCode,
  femaleRegCode,
  matingDate,
  estimatedBirthDate,
  witnessName,
  offspringItems,
  documents,
  onEditStep,
  onSubmit,
}: StepReviewSubmitProps) {
  const [agreed, setAgreed] = useState(false);
  const uploadedDocs = documents.filter((d) => d.file !== null);

  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-6">
      <h2 className="font-display text-[16px] font-semibold text-[var(--color-ink-900)]">
        Review & submit
      </h2>
      <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
        Periksa sekali lagi. Setelah dikirim, perubahan hanya bisa lewat permintaan revisi admin.
      </p>

      <div className="mt-4 space-y-3 border-t border-[var(--color-ink-100)] pt-4">
        {/* Pasangan */}
        <ReviewSection title="Pasangan" onEdit={() => onEditStep(2)}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ReviewField label="Pejantan" value={maleName} />
            <ReviewField label="Induk" value={femaleName} />
          </div>
        </ReviewSection>

        {/* Mating information */}
        <ReviewSection title="Mating information" onEdit={() => onEditStep(4)}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ReviewField label="Tanggal mating" value={formatDateRange(matingDate)} />
            <ReviewField label="Estimasi lahir" value={formatDateRange(estimatedBirthDate)} />
            <ReviewField label="Sertifikat pejantan" value={maleRegCode} />
            <ReviewField label="Sertifikat induk" value={femaleRegCode} />
            {witnessName && (
              <div className="sm:col-span-2">
                <ReviewField label="Saksi" value={witnessName} />
              </div>
            )}
          </div>
        </ReviewSection>

        {/* Offspring */}
        <ReviewSection title={`Offspring · ${offspringItems.length} kitten`} onEdit={() => onEditStep(5)}>
          <div className="divide-y divide-[var(--color-ink-100)]">
            {offspringItems.map((kitten) => (
              <div key={kitten.id} className="flex items-center justify-between py-2 text-[13px]">
                <span className="font-medium text-[var(--color-ink-900)]">{kitten.name || "Belum diisi"}</span>
                <span className="text-[12px] text-[var(--color-ink-400)]">
                  {kitten.gender || "-"} · {kitten.color || "-"} · {formatDateRange(kitten.birthDate)}
                </span>
              </div>
            ))}
          </div>
        </ReviewSection>

        {/* Dokumen */}
        <ReviewSection title={`Dokumen · ${uploadedDocs.length} terunggah`} onEdit={() => onEditStep(6)}>
          <div className="flex flex-wrap gap-2">
            {uploadedDocs.map((doc) => (
              <span
                key={doc.label}
                className="rounded-full bg-[var(--color-success-bg)] px-3 py-1 text-[11px] font-medium text-[var(--color-success)]"
              >
                {doc.label}
              </span>
            ))}
          </div>
        </ReviewSection>
      </div>

      {/* Konfirmasi */}
      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-[var(--color-brand-orange-300)] bg-[var(--color-brand-orange-50)] p-4">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--color-ink-100)] text-[var(--color-brand-orange-500)] focus:ring-[var(--color-brand-orange-300)]"
        />
        <span className="text-[12px] text-[var(--color-ink-900)]">
          Saya menyatakan data mating dan offspring di atas benar, dan bersedia data pedigree
          diverifikasi oleh admin ICA.
        </span>
      </label>

      <div className="mt-5 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={!agreed}
          className={`rounded-full border-t px-8 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 ${
            agreed
              ? "cursor-pointer border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
              : "border-gray-200 bg-gray-300 shadow-none"
          }`}
        >
          Kirim mating report
        </button>
      </div>
    </div>
  );
}

function ReviewSection({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--color-ink-100)]">
      <div className="flex items-center justify-between bg-[var(--color-ink-50)] px-4 py-2.5">
        <h3 className="text-[13px] font-semibold text-[var(--color-ink-900)]">{title}</h3>
        <button
          onClick={onEdit}
          className="text-[12px] font-medium text-[var(--color-brand-orange-700)] hover:underline"
        >
          Ubah
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-[var(--color-ink-400)]">{label}</p>
      <p className="mt-0.5 text-[13px] font-semibold text-[var(--color-ink-900)]">{value}</p>
    </div>
  );
}