interface SilsilahProps {
  sireName?: string;
  damName?: string;
}

export default function Silsilah({ sireName, damName }: SilsilahProps) {
  const lines = [
    { label: "Generasi 1 — Pejantan (Sire)", value: sireName },
    { label: "Generasi 1 — Induk (Dam)", value: damName },
  ];

  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-6">
      <h2 className="font-display text-[15px] font-semibold text-[var(--color-ink-900)]">Silsilah</h2>
      <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">Catatan garis keturunan yang terdaftar di sistem ICA.</p>

      <div className="mt-4 divide-y divide-[var(--color-ink-100)] border-t border-[var(--color-ink-100)]">
        {lines.map((line) => (
          <div key={line.label} className="flex items-center justify-between py-3">
            <span className="text-[12px] text-[var(--color-ink-700)]">{line.label}</span>
            <span className="text-[12px] font-medium text-[var(--color-ink-900)]">{line.value ?? "Belum tercatat"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}