interface PedigreeChartProps {
  catName: string;
  sireName?: string;
  damName?: string;
}

export default function PedigreeChart({ catName, sireName, damName }: PedigreeChartProps) {
  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-6">
      <h2 className="font-display text-[15px] font-semibold text-[var(--color-ink-900)]">Bagan silsilah</h2>
      <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">Hubungan induk dan pejantan yang tercatat.</p>

      <div className="mt-5 flex flex-col items-center gap-3">
        <div className="rounded-lg border-2 border-[var(--color-brand-orange-500)] bg-[var(--color-brand-orange-50)] px-4 py-2 text-center">
          <p className="text-[12px] font-semibold text-[var(--color-brand-orange-700)]">{catName}</p>
        </div>

        <div className="h-4 w-[2px] bg-[var(--color-ink-100)]" />

        <div className="flex w-full max-w-md items-start justify-between gap-4">
          <div className="flex flex-1 flex-col items-center gap-1">
            <div className="h-4 w-[2px] bg-[var(--color-ink-100)]" />
            <div className="w-full rounded-lg border border-[var(--color-ink-100)] bg-[var(--color-foreground)] px-3 py-2 text-center">
              <p className="text-[10px] text-[var(--color-ink-400)]">Pejantan (Sire)</p>
              <p className="text-[12px] font-medium text-[var(--color-ink-900)]">{sireName ?? "Belum tercatat"}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center gap-1">
            <div className="h-4 w-[2px] bg-[var(--color-ink-100)]" />
            <div className="w-full rounded-lg border border-[var(--color-ink-100)] bg-[var(--color-foreground)] px-3 py-2 text-center">
              <p className="text-[10px] text-[var(--color-ink-400)]">Induk (Dam)</p>
              <p className="text-[12px] font-medium text-[var(--color-ink-900)]">{damName ?? "Belum tercatat"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}