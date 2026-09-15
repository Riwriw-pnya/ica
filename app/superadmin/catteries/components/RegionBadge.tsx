export default function RegionBadge({ region }: { region: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-ink-100)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-ink-700)]">
      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      {region}
    </span>
  );
}