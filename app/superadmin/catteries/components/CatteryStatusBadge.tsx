import type { CatteryAdminStatus } from "@/types/superadmin";

export default function CatteryStatusBadge({ status }: { status: CatteryAdminStatus }) {
  const isActive = status === "Aktif";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
        isActive
          ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
          : "bg-[var(--color-ink-100)] text-[var(--color-ink-700)]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[var(--color-success)]" : "bg-[var(--color-ink-400)]"}`}
      />
      {status}
    </span>
  );
}