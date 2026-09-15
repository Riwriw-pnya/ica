import Link from "next/link";
import { catteryAdminItems, matingReportsByCatteryId } from "@/data/superadmin";
import CatteryStatusBadge from "../components/CatteryStatusBadge";
import RegionBadge from "../components/RegionBadge";
import type { MatingReportAdminStatus } from "@/types/superadmin";

function getReportStatusStyle(status: MatingReportAdminStatus) {
    switch (status) {
        case "Baru":
        return "bg-[var(--color-ink-100)] text-[var(--color-ink-700)]";
        case "Sedang direview":
        return "bg-[var(--color-info-bg)] text-[var(--color-info)]";
        case "Disetujui":
        return "bg-[var(--color-success-bg)] text-[var(--color-success)]";
        case "Ditolak":
        return "bg-[var(--color-danger-bg)] text-[var(--color-danger)]";
    }
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CatteryDetailPage({ params }: PageProps) {
    const { id } = await params;
    const cattery = catteryAdminItems.find((item) => item.id === id);
    const reports = matingReportsByCatteryId[id] ?? [];

    if (!cattery) {
        return (
            <main className="flex min-h-full items-center justify-center bg-[var(--color-ink-50)] p-5">
                <p className="text-[13px] text-[var(--color-ink-400)]">Cattery tidak ditemukan.</p>
            </main>
        );
    }

    return (
        <main className="min-h-full bg-[var(--color-ink-50)]">
            <div className="mx-auto max-w-[1200px] p-5 lg:p-6">
                <section className="mb-5">
                    <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
                        Cattery Detail
                    </h1>
                    <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
                        Profil cattery dan riwayat pengajuannya.
                    </p>
                </section>

                <Link
                href="/admin/catteries"
                className="text-[12px] font-medium text-[var(--color-brand-orange-700)] hover:underline"
                >
                ← Kembali ke Cattery List
                </Link>

                <div className="mt-3 rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-[17px] font-semibold text-[var(--color-ink-900)]">
                                {cattery.name}
                                </h2>
                                <CatteryStatusBadge status={cattery.status} />
                                <RegionBadge region={cattery.region} />
                            </div>
                            <p className="mt-1 text-[12px] text-[var(--color-ink-400)]">
                                {cattery.catteryCode} · pemilik {cattery.ownerName} · terdaftar {cattery.registeredDate}
                            </p>
                        </div>

                        <div className="flex shrink-0 gap-6">
                            <div className="text-center">
                                <p className="text-[10px] text-[var(--color-ink-400)]">Male</p>
                                <p className="text-[18px] font-semibold text-[var(--color-ink-900)]">{cattery.maleCount}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] text-[var(--color-ink-400)]">Female</p>
                                <p className="text-[18px] font-semibold text-[var(--color-ink-900)]">{cattery.femaleCount}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] text-[var(--color-ink-400)]">Mating report</p>
                                <p className="text-[18px] font-semibold text-[var(--color-ink-900)]">{cattery.reportCount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
                <h3 className="text-[15px] font-semibold text-[var(--color-ink-900)]">
                    Mating report dari cattery ini
                </h3>

                <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left">
                        <thead>
                            <tr className="border-b border-[var(--color-ink-100)]">
                            <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                                Nomor
                            </th>
                            <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                                Pemohon
                            </th>
                            <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                                Wilayah
                            </th>
                            <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                                Menunggu
                            </th>
                            <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                                Status
                            </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-ink-100)]">
                            {reports.map((report) => (
                            <tr key={report.id} className="transition hover:bg-[var(--color-ink-50)]">
                                <td className="px-2 py-3 text-[13px] font-medium text-[var(--color-ink-900)]">
                                {report.reportCode}
                                </td>
                                <td className="px-2 py-3">
                                    <p className="text-[13px] font-medium text-[var(--color-ink-900)]">{report.applicantName}</p>
                                    <p className="text-[11px] text-[var(--color-ink-400)]">{report.applicantType}</p>
                                </td>
                                <td className="px-2 py-3">
                                    <RegionBadge region={report.region} />
                                </td>
                                <td className="px-2 py-3 text-[13px] text-[var(--color-ink-900)]">
                                    {report.waitingDays} hari
                                </td>
                                <td className="px-2 py-3">
                                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${getReportStatusStyle(report.status)}`}>
                                        {report.status}
                                    </span>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>

                    {reports.length === 0 && (
                        <p className="py-8 text-center text-[12px] text-[var(--color-ink-400)]">
                            Belum ada mating report dari cattery ini.
                        </p>
                    )}
                    </div>
                </div>
            </div>
        </main>
    );
}