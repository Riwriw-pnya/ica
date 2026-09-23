import type { ApplicationStatus } from "@/types/regionalAdmin";

const STYLES: Record<ApplicationStatus, string> = {
    Baru: "bg-[var(--color-ink-100)] text-[var(--color-ink-700)]",
    "Sedang direview": "bg-[var(--color-info-bg)] text-[var(--color-info)]",
    "Perlu revisi": "bg-[var(--color-warning-bg)]/60 text-[var(--color-warning)]",
    Disetujui: "bg-[var(--color-success-bg)] text-[var(--color-success)]",
    Ditolak: "bg-[var(--color-danger-bg)] text-[var(--color-danger)]",
};

export default function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STYLES[status]}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {status}
        </span>
    );
}