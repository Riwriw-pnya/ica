"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { catteryAdminItems } from "../../../data/superadmin";
import CatteryStatusBadge from "./components/CatteryStatusBadge";
import RegionBadge from "./components/RegionBadge";

const REGIONS = ["Semua wilayah", "Bandung", "Jakarta", "Surabaya", "Medan"];

export default function CatteriesPage() {
    const router = useRouter();
    const [selectedRegion, setSelectedRegion] = useState("Semua wilayah");

    const filteredItems = useMemo(() => {
        if (selectedRegion === "Semua wilayah") return catteryAdminItems;
        return catteryAdminItems.filter((item) => item.region === selectedRegion);
    }, [selectedRegion]);

    return (
        <main className="min-h-full bg-[var(--color-ink-50)]">
        <div className="mx-auto max-w-[1200px] p-5 lg:p-6">
            <section className="mb-5">
            <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
                Catteries
            </h1>
            <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
                Cattery terdaftar dan kode resminya.
            </p>
            </section>

            <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                <h2 className="text-[15px] font-semibold text-[var(--color-ink-900)]">
                    Cattery terdaftar
                </h2>
                <p className="mt-0.5 text-[12px] text-[var(--color-ink-400)]">
                    Kode cattery diterbitkan admin ICA setelah pengajuan disetujui.
                </p>
                </div>

                <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="shrink-0 rounded-lg border border-[var(--color-brand-orange-300)] bg-white px-3 py-2 text-[13px] font-medium text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-500)]"
                >
                {REGIONS.map((region) => (
                    <option key={region} value={region}>
                    {region}
                    </option>
                ))}
                </select>
            </div>

            <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                <thead>
                    <tr className="border-b border-[var(--color-ink-100)]">
                    <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                        Kode Cattery
                    </th>
                    <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                        Cattery
                    </th>
                    <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                        Wilayah
                    </th>
                    <th className="px-2 py-2.5 text-right text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                        Kucing
                    </th>
                    <th className="px-2 py-2.5 text-right text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                        Report
                    </th>
                    <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                        Status
                    </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-ink-100)]">
                    {filteredItems.map((item) => (
                    <tr
                        key={item.id}
                        onClick={() => router.push(`/admin/catteries/${item.id}`)}
                        className="cursor-pointer transition hover:bg-[var(--color-ink-50)]"
                    >
                        <td className="px-2 py-3 text-[13px] text-[var(--color-ink-700)]">
                        {item.catteryCode}
                        </td>
                        <td className="px-2 py-3">
                        <p className="text-[13px] font-semibold text-[var(--color-ink-900)]">{item.name}</p>
                        <p className="text-[11px] text-[var(--color-ink-400)]">Pemilik {item.ownerName}</p>
                        </td>
                        <td className="px-2 py-3">
                        <RegionBadge region={item.region} />
                        </td>
                        <td className="px-2 py-3 text-right text-[13px] text-[var(--color-ink-900)]">
                        {item.catCount}
                        </td>
                        <td className="px-2 py-3 text-right text-[13px] text-[var(--color-ink-900)]">
                        {item.reportCount}
                        </td>
                        <td className="px-2 py-3">
                        <CatteryStatusBadge status={item.status} />
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>

                {filteredItems.length === 0 && (
                <p className="py-8 text-center text-[12px] text-[var(--color-ink-400)]">
                    Tidak ada cattery di wilayah ini.
                </p>
                )}
            </div>

            <p className="mt-3 text-[11px] italic text-[var(--color-ink-400)]">Data contoh.</p>
            </div>
        </div>
        </main>
    );
}