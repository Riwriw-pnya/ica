type BadgeTone = "orange" | "green" | "blue" | "grey" | "red";

const toneClasses: Record<BadgeTone, string> = {
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  blue: "bg-sky-50 text-sky-700 border-sky-200",
  grey: "bg-slate-100 text-slate-600 border-slate-200",
  red: "bg-rose-50 text-rose-700 border-rose-200",
};

interface StatusBadgeProps {
  label: string;
  tone: BadgeTone;
}

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
