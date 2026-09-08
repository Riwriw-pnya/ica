import type { CatteryProfile } from "@/types/cattery";

export default function StepDataCattery({ profile }: { profile: CatteryProfile }) {
  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-6">
      <h2 className="font-display text-[16px] font-semibold text-[var(--color-ink-900)]">
        Konfirmasi data cattery
      </h2>
      <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
        Pastikan identitas cattery yang mengajukan sudah benar sebelum mengisi detail mating.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[var(--color-ink-100)] pt-5 sm:grid-cols-2">
        <Field label="Nama cattery" value={profile.name} />
        <Field label="Nomor registrasi ICA" value={profile.regNumber} />
        <Field label="Wilayah" value={profile.region} />
        <Field label="Penanggung jawab" value={profile.personInCharge} />
      </div>

      <div className="mt-5 rounded-lg border border-[var(--color-warning)]/30 bg-[var(--color-warning-bg)] p-4 text-[12px] text-[var(--color-warning)]">
        Data ini diambil dari profil cattery dan tidak bisa diubah di sini. Kalau ada yang
        salah, perbaiki lewat{" "}
        <a href="/cattery/profil" className="font-semibold underline">
          Profil Cattery
        </a>{" "}
        sebelum mengirim report.
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-[var(--color-ink-400)]">{label}</p>
      <div className="mt-1 rounded-lg border border-[var(--color-ink-100)] bg-[var(--color-foreground)] px-3 py-2.5 text-[13px] text-[var(--color-ink-900)]">
        {value}
      </div>
    </div>
  );
}