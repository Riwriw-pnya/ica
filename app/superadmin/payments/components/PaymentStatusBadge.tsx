import type { PaymentStatus } from "@/types/superadmin";

export default function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
    const style =
        status === "Disetujui" || status === "Lunas"
        ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
        : status === "Menunggu verifikasi"
            ? "bg-[var(--color-warning-bg)] text-[var(--color-warning)]"
            : "bg-[var(--color-danger-bg)] text-[var(--color-danger)]";

    const dot =
        status === "Disetujui" || status === "Lunas"
        ? "bg-[var(--color-success)]"
        : status === "Menunggu verifikasi"
            ? "bg-[var(--color-warning)]"
            : "bg-[var(--color-danger)]";

    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${style}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        {status}
        </span>
    );
}