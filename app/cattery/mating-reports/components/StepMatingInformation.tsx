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

export default function StepMatingInformation({
  maleRegCode,
  femaleRegCode,
  matingDate,
  onMatingDateChange,
  estimatedBirthDate,
  onEstimatedBirthDateChange,
  isEstimateAuto,
  witnessName,
  onWitnessNameChange,
  showError = false,
}: StepMatingInformationProps) {
  const matingDateInvalid = showError && matingDate === "";
  const estimatedInvalid = showError && estimatedBirthDate === "";
  const witnessInvalid = showError && witnessName.trim() === "";

  return (
    <div className="rounded-xl border border-[#EEDFD5] bg-white p-6 transition shadow-xs">
      <h2 className="font-display text-[16px] font-bold text-[#1A1513]">
        Mating information
      </h2>
      <p className="mt-1 text-[12px] text-[#8C8074]">
        Isi tanggal, nomor sertifikat kedua induk, dan saksi yang menyaksikan proses mating.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-5 border-t border-[#F4EFE9] pt-5 sm:grid-cols-2">
        <Field label="Tanggal mating" error={matingDateInvalid ? "Wajib diisi" : undefined}>
          <input
            type="date"
            value={matingDate}
            onChange={(e) => onMatingDateChange(e.target.value)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-[13px] text-[#1A1513] outline-none transition ${
              matingDateInvalid
                ? "border-red-500 focus:border-red-500"
                : "border-[#EEDFD5] focus:border-[#F05A1B]"
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
            placeholder="Isi tanggal mating lebih dulu"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-[13px] text-[#1A1513] placeholder-[#A39990] outline-none transition ${
              estimatedInvalid
                ? "border-red-500 focus:border-red-500"
                : "border-[#EEDFD5] focus:border-[#F05A1B]"
            }`}
          />
          <p className="mt-1.5 text-[11px] text-[#8C8074] leading-normal">
            Dihitung otomatis dari tanggal mating (+60 s.d. +68 hari) sebagai rentang, dan tetap bisa diubah manual.
          </p>
        </Field>

        <Field label="Nomor sertifikat pejantan" badge="AUTO">
          <input
            type="text"
            value={maleRegCode}
            readOnly
            className="w-full cursor-not-allowed rounded-xl border border-[#EEDFD5] bg-[#F5F2ED] px-3.5 py-2.5 text-[13px] font-medium text-[#1A1513] outline-none"
          />
          <p className="mt-1.5 text-[11px] text-[#8C8074] leading-normal">
            Terisi otomatis dari pejantan yang dipilih di Step 2 — read-only.
          </p>
        </Field>

        <Field label="Nomor sertifikat induk" badge="AUTO">
          <input
            type="text"
            value={femaleRegCode}
            readOnly
            className="w-full cursor-not-allowed rounded-xl border border-[#EEDFD5] bg-[#F5F2ED] px-3.5 py-2.5 text-[13px] font-medium text-[#1A1513] outline-none"
          />
          <p className="mt-1.5 text-[11px] text-[#8C8074] leading-normal">
            Terisi otomatis dari induk yang dipilih di Step 3 — read-only.
          </p>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Nama saksi / breeder pendamping" error={witnessInvalid ? "Wajib diisi" : undefined}>
            <input
              type="text"
              value={witnessName}
              onChange={(e) => onWitnessNameChange(e.target.value)}
              placeholder="Nama lengkap saksi"
              className={`w-full rounded-xl border px-3.5 py-2.5 text-[13px] text-[#1A1513] placeholder-[#A39990] outline-none transition ${
                witnessInvalid
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#EEDFD5] focus:border-[#F05A1B]"
              }`}
            />
          </Field>
        </div>

        <div className="sm:col-span-2 rounded-2xl bg-[#F5F2ED] border border-[#E8DED5] p-4 text-[11px] text-[#574D45] leading-relaxed space-y-1">
          <p>
            <span className="font-bold text-[#1A1513]">Format nomor sertifikat:</span> ICA-PD-0000 (empat angka). Nomor ditarik otomatis dari data kucing terpilih — <span className="font-bold text-[#1A1513]">[PRD TBD]</span> apakah nomor dicocokkan ke database pedigree ICA.
          </p>
          <p>
            <span className="font-bold text-[#1A1513]">[CATATAN DESAIN]</span> Rentang kehamilan 60–68 hari sebaiknya jadi nilai configurable di Settings admin, bukan hardcode — field di atas didesain sebagai representasi nilai yang bisa berubah.
          </p>
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
        <label className="text-[12px] font-bold text-[#1A1513]">{label}</label>
        {badge && (
          <span className="flex items-center gap-1 rounded-md bg-[#FFF2E8] px-2 py-0.5 text-[10px] font-bold text-[#C26D0A] border border-[#FCE3D2]">
            <svg className="h-2.5 w-2.5 fill-current text-[#C26D0A]" viewBox="0 0 20 20">
              <path d="M11 3L5 12h4l-1 5 6-9h-4l1-5z" />
            </svg>
            {badge}
          </span>
        )}
      </div>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-[10px] font-medium text-red-500">{error}</p>}
    </div>
  );
}