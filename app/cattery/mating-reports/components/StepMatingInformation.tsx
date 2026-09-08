"use client";

interface StepMatingInformationProps {
  maleRegCode: string;
  femaleRegCode: string;
  matingDate: string;
  onMatingDateChange: (value: string) => void;
  estimatedBirthDate: string;
  onEstimatedBirthDateChange: (value: string) => void;
  witnessName: string;
  onWitnessNameChange: (value: string) => void;
}

export default function StepMatingInformation({
  maleRegCode,
  femaleRegCode,
  matingDate,
  onMatingDateChange,
  estimatedBirthDate,
  onEstimatedBirthDateChange,
  witnessName,
  onWitnessNameChange,
}: StepMatingInformationProps) {
  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-6">
      <h2 className="font-display text-[16px] font-semibold text-[var(--color-ink-900)]">
        Mating Information
      </h2>
      <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
        Isi tanggal, nomor sertifikat kedua induk, dan saksi yang menyaksikan proses mating.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[var(--color-ink-100)] pt-5 sm:grid-cols-2">
        <Field label="Tanggal mating">
          <input
            type="date"
            value={matingDate}
            onChange={(e) => onMatingDateChange(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2.5 text-[13px] text-[var(--color-ink-900)] outline-none transition focus:border-[var(--color-brand-orange-300)]"
          />
        </Field>

        <Field label="Estimasi tanggal lahir" hint="Otomatis 63–67 hari setelah tanggal mating.">
          <input
            type="date"
            value={estimatedBirthDate}
            onChange={(e) => onEstimatedBirthDateChange(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-brand-orange-300)] px-3 py-2.5 text-[13px] text-[var(--color-ink-900)] outline-none transition focus:border-[var(--color-brand-orange-500)]"
          />
          
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
          <Field label="Nama saksi / breeder pendamping">
            <input
              type="text"
              value={witnessName}
              onChange={(e) => onWitnessNameChange(e.target.value)}
              placeholder="Contoh: Salmawati"
              className="w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2.5 text-[13px] text-[var(--color-ink-900)] outline-none transition focus:border-[var(--color-brand-orange-300)]"
            />
          </Field>
        </div>
      </div>

{/* 
      <div className="mt-5 rounded-lg border border-[var(--color-warning)]/30 bg-[var(--color-warning-bg)] p-4 text-[12px] text-[var(--color-warning)]">
        Format nomor sertifikat: ICA-PD-0000 (empat angka). Nomor diisi manual dan divalidasi format
        saja — nomor dicocokkan ke database pedigree ICA.
      </div> */}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[12px] font-medium text-[var(--color-ink-700)]">{label}</label>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1 text-[10px] text-[var(--color-ink-400)]">{hint}</p>}
    </div>
  );
}