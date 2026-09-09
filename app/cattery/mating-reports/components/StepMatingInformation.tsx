"use client";

interface StepMatingInformationProps {
  maleRegCode: string;
  femaleRegCode: string;
  matingDate: string;
  onMatingDateChange: (value: string) => void;
  estimatedBirthDate: string;
  onEstimatedBirthDateChange: (value: string) => void;
  isEstimateAuto: boolean;
  rangeLabel: string;
  witnessName: string;
  onWitnessNameChange: (value: string) => void;
  showError?: boolean;
}

function formatDateShort(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function StepMatingInformation({
  maleRegCode,
  femaleRegCode,
  matingDate,
  onMatingDateChange,
  estimatedBirthDate,
  onEstimatedBirthDateChange,
  isEstimateAuto,
  rangeLabel,
  witnessName,
  onWitnessNameChange,
  showError = false,
}: StepMatingInformationProps) {
  const matingDateInvalid = showError && matingDate === "";
  const estimatedInvalid = showError && estimatedBirthDate === "";
  const witnessInvalid = showError && witnessName.trim() === "";
  const hasAnyError = matingDateInvalid || estimatedInvalid || witnessInvalid;

  return (
    <div className="rounded-xl border bg-white p-6 transition">
      <h2 className="font-display text-[16px] font-semibold text-[var(--color-ink-900)]">
        Mating Information
      </h2>
      <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
        Isi tanggal, nomor sertifikat kedua induk, dan saksi yang menyaksikan proses mating.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[var(--color-ink-100)] pt-5 sm:grid-cols-2">
        <Field label="Tanggal mating" error={matingDateInvalid ? "Wajib diisi" : undefined}>
          <input
            type="date"
            value={matingDate}
            onChange={(e) => onMatingDateChange(e.target.value)}
            className={`w-full rounded-lg border px-3 py-2.5 text-[13px] text-[var(--color-ink-900)] outline-none transition ${
              matingDateInvalid
                ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
                : "border-[var(--color-ink-100)] focus:border-[var(--color-brand-orange-300)]"
            }`}
          />
        </Field>

        <Field
          label="Estimasi tanggal lahir"
          badge={isEstimateAuto ? "AUTO" : undefined}
          error={estimatedInvalid ? "Wajib diisi" : undefined}
        >
          <input
            type="date"
            value={estimatedBirthDate}
            onChange={(e) => onEstimatedBirthDateChange(e.target.value)}
            className={`w-full rounded-lg border px-3 py-2.5 text-[13px] text-[var(--color-ink-900)] outline-none transition ${
              estimatedInvalid
                ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
                : "border-[var(--color-brand-orange-300)] focus:border-[var(--color-brand-orange-500)]"
            }`}
          />
          {rangeLabel && (
            <p className="mt-1 text-[10px] text-[var(--color-brand-orange-700)]">
              Rentang wajar: {rangeLabel} (+60 s.d. +68 hari dari tanggal mating). Tanggal di atas otomatis
              titik tengahnya, dan tetap bisa diubah manual.
            </p>
          )}
        </Field>

        <Field label="Nomor sertifikat pejantan">
          <input
            type="text"
            value={maleRegCode}
            readOnly
            className="w-full cursor-not-allowed rounded-lg border border-[var(--color-ink-100)] bg-gray-50 px-3 py-2.5 text-[13px] text-[var(--color-ink-700)] outline-none"
          />
        </Field>

        <Field label="Nomor sertifikat induk">
          <input
            type="text"
            value={femaleRegCode}
            readOnly
            className="w-full cursor-not-allowed rounded-lg border border-[var(--color-ink-100)] bg-gray-50 px-3 py-2.5 text-[13px] text-[var(--color-ink-700)] outline-none"
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Nama saksi / breeder pendamping" error={witnessInvalid ? "Wajib diisi" : undefined}>
            <input
              type="text"
              value={witnessName}
              onChange={(e) => onWitnessNameChange(e.target.value)}
              placeholder="Contoh: Salmawati"
              className={`w-full rounded-lg border px-3 py-2.5 text-[13px] text-[var(--color-ink-900)] outline-none transition ${
                witnessInvalid
                  ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
                  : "border-[var(--color-ink-100)] focus:border-[var(--color-brand-orange-300)]"
              }`}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  badge,
  error,
  children,
}: {
  label: string;
  badge?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <label className="text-[12px] font-medium text-[var(--color-ink-700)]">{label}</label>
        {badge && (
          <span className="flex items-center gap-1 rounded-full bg-[var(--color-brand-orange-100)] px-2 py-0.5 text-[9px] font-bold text-[var(--color-brand-orange-700)]">
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3L5 12h4l-1 5 6-9h-4l1-5z" />
            </svg>
            {badge}
          </span>
        )}
      </div>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-[10px] font-medium text-[var(--color-danger)]">{error}</p>}
    </div>
  );
}