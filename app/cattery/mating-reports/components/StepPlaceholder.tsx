export default function StepPlaceholder({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-6">
      <h2 className="font-display text-[16px] font-semibold text-[var(--color-ink-900)]">{title}</h2>
      <div className="mt-4 rounded-lg bg-[var(--color-ink-50)] p-6 text-center text-[12px] font-bold text-[var(--color-ink-400)]">
        Langkah ini masih dalam pengembangan.
      </div>
    </div>
  );
}