import type { PedigreeAdminStatus } from "@/types/superadmin";

export default function PedigreeStatusBadge({ status }: { status: PedigreeAdminStatus }) {
  const style =
    status === "Aktif"
      ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
      : status === "Draft"
        ? "bg-[var(--color-ink-100)] text-[var(--color-ink-700)]"
        : "bg-[var(--color-warning-bg)] text-[var(--color-warning)]";

  const dotColor =
    status === "Aktif"
      ? "bg-[var(--color-success)]"
      : status === "Draft"
        ? "bg-[var(--color-ink-400)]"
        : "bg-[var(--color-warning)]";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${style}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
}