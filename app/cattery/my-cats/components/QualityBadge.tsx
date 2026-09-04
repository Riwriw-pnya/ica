import type { CatQualityBadge } from "@/types/cattery";

const styles: Record<CatQualityBadge, string> = {
  Excellent: "bg-[var(--color-success-bg)] text-[var(--color-success)]",
  Good: "bg-[var(--color-info-bg)] text-[var(--color-info)]",
  BOB: "bg-[var(--color-brand-orange-500)] text-white",
};

export default function QualityBadge({ badge }: { badge: CatQualityBadge }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${styles[badge]}`}>
      {badge}
    </span>
  );
}