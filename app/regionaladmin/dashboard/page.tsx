"use client";

import Link from "next/link";
import {
    dashboardSummary,
    applicationQueueItems,
    queueTypeSummaries,
    regionalActivityItems,
} from "@/data/regionalAdmin";

export default function RegionalAdminDashboardPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Title Bar */}
            <div>
                <h1 className="text-2xl font-bold text-[#1a1817]">Dashboard</h1>
                <p className="text-xs text-[#8c857b] mt-0.5">
                Ringkasan antrean dan aktivitas wilayah {dashboardSummary.region}
                </p>
            </div>

        <div className="flex items-center justify-between rounded-2xl border border-[var(--color-brand-orange-300)]/70 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-xs">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff0e5] text-[#ee6b28]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-base font-bold text-[#1a1817]">
                    {dashboardSummary.newMemberRequestCount} Request Member Baru
                    </h2>
                    <p className="text-xs text-[#8c857b] mt-0.5">
                    Menunggu approval Anda di wilayah {dashboardSummary.region}. Klik untuk membuka halaman approval member.
                    </p>
                </div>
            </div>

            <Link
            href="/regionaladmin/members"
            className="flex items-center gap-1.5 rounded-full border border-[#fde8d7] bg-[#fff8f3] px-4 py-2 text-xs font-bold text-[#ee6b28] hover:bg-[#ffe0c2] transition"
            >
            Buka approval
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
            </svg>
            </Link>
        </div>

        {/* Metric Cards Grid (Hover & Active added) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Baru Masuk */}
            <div className="relative rounded-2xl border border-[#efe9e2] bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-xs flex flex-col justify-between">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[11px] font-bold tracking-wider text-[#8c857b] uppercase">BARU MASUK</p>
                        <p className="text-3xl font-extrabold text-[#1a1817] mt-2">{dashboardSummary.newCount}</p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f2ed] text-[#5e5852]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-[11px] text-[#8c857b]">Belum Anda sentuh</p>
                    <div className="mt-2 h-1 w-full rounded-full bg-[#f3efe9]">
                        <div className="h-full rounded-full bg-[#a39c94] w-1/2" />
                    </div>
                </div>
            </div>

            {/* Sedang Direview */}
            <div className="relative rounded-2xl border border-[#efe9e2] bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-xs flex flex-col justify-between">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[11px] font-bold tracking-wider text-[#8c857b] uppercase">SEDANG DIREVIEW</p>
                        <p className="text-3xl font-extrabold text-[#1a1817] mt-2">{dashboardSummary.reviewingCount}</p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e3f2fd] text-[#1976d2]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-[11px] text-[#8c857b]">Rata-rata {dashboardSummary.reviewingAvgDays} hari di antrean</p>
                    <div className="mt-2 h-1 w-full rounded-full bg-[#f3efe9]">
                        <div className="h-full rounded-full bg-[#1976d2] w-1/3" />
                    </div>
                </div>
            </div>

            {/* Perlu Revisi */}
            <div className="relative rounded-2xl border border-[#efe9e2] bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-xs flex flex-col justify-between">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[11px] font-bold tracking-wider text-[#8c857b] uppercase">PERLU REVISI</p>
                        <p className="text-3xl font-extrabold text-[#1a1817] mt-2">{dashboardSummary.revisionCount}</p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff8e1] text-[#f57c00]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-[11px] text-[#8c857b]">Menunggu balasan pemohon wilayah {dashboardSummary.region}</p>
                    <div className="mt-2 h-1 w-full rounded-full bg-[#f3efe9]">
                        <div className="h-full rounded-full bg-[#f57c00] w-0" />
                    </div>
                </div>
            </div>

            {/* Disetujui */}
            <div className="relative rounded-2xl border border-[#efe9e2] bg-white p-5 shadow-xs transition-all active:translate-y-0 active:shadow-xs flex flex-col justify-between">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[11px] font-bold tracking-wider text-[#8c857b] uppercase">
                            DISETUJUI {dashboardSummary.approvedMonthLabel}
                        </p>
                        <p className="text-3xl font-extrabold text-[#1a1817] mt-2">{dashboardSummary.approvedCount}</p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f5e9] text-[#2e7d32]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-[11px] text-[#8c857b]">Semua final tanpa approval pusat</p>
                    <div className="mt-2 h-1 w-full rounded-full bg-[#f3efe9]">
                        <div className="h-full rounded-full bg-[#2e7d32] w-2/3" />
                    </div>
                </div>
            </div>
        </div>

        {/* Main Content Grid: Table & Summaries */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column: Antrean Aplikasi Paling Lama */}
            <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl border border-[#efe9e2] bg-white p-6 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                        <div>
                            <h3 className="text-base font-bold text-[#1a1817]">Antrean aplikasi paling lama</h3>
                            <p className="text-xs text-[#8c857b]">Urut dari yang paling lama menunggu review.</p>
                        </div>
                        <Link
                            href="/regionaladmin/applications"
                            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#e8e2da] bg-white px-4 py-2 text-xs font-semibold text-[#1a1817] hover:bg-[#faf8f5] transition"
                        >
                            Buka Application Queue
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </Link>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-[#f3efe9] text-[11px] font-bold tracking-wider text-[#8c857b] uppercase">
                                    <th className="py-3 px-2">NOMOR</th>
                                    <th className="py-3 px-2">PEMOHON</th>
                                    <th className="py-3 px-2">WILAYAH</th>
                                    <th className="py-3 px-2">MENUNGGU</th>
                                    <th className="py-3 px-2">STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f3efe9]">
                            {applicationQueueItems.map((item) => (
                                <tr key={item.id} className="hover:bg-[#faf8f5] transition-colors">
                                    <td className="py-3.5 px-2 font-medium text-[#1a1817]">{item.code}</td>
                                    <td className="py-3.5 px-2">
                                        <p className="font-bold text-[#1a1817]">{item.applicantName}</p>
                                        <p className="text-[11px] text-[#8c857b]">{item.applicantType}</p>
                                    </td>
                                    <td className="py-3.5 px-2">
                                        <span className="inline-flex items-center gap-1 rounded-full border border-[#e8e2da] bg-[#faf8f5] px-2.5 py-0.5 text-[11px] text-[#5e5852]">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            {item.region}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-2 text-[#5e5852] font-medium">{item.waitingLabel}</td>
                                    <td className="py-3.5 px-2">
                                        <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                            item.status === "Sedang direview"
                                            ? "bg-[#e3f2fd] text-[#1976d2]"
                                            : item.status === "Baru"
                                            ? "bg-[#f5f2ed] text-[#5e5852]"
                                            : "bg-[#e8f5e9] text-[#2e7d32]"
                                        }`}
                                        >
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${
                                            item.status === "Sedang direview"
                                                ? "bg-[#1976d2]"
                                                : item.status === "Baru"
                                                ? "bg-[#5e5852]"
                                                : "bg-[#2e7d32]"
                                            }`}
                                        />
                                        {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right Column: Antrean per Jenis & Aktivitas Review */}
            <div className="space-y-6">
                {/* Antrean Per Jenis Pengajuan */}
                <div className="rounded-2xl border border-[#efe9e2] bg-white p-6 shadow-xs">
                    <h3 className="text-base font-bold text-[#1a1817]">Antrean per jenis pengajuan</h3>
                    <p className="text-xs text-[#8c857b] mb-4">Hanya pengajuan dari wilayah {dashboardSummary.region}.</p>

                    <div className="space-y-4">
                    {queueTypeSummaries.map((summary, idx) => (
                        <div key={idx} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-[#1a1817]">{summary.label}</span>
                                <span className="text-[#8c857b]">{summary.count}</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-[#f3efe9] overflow-hidden">
                                <div
                                className="h-full bg-[#ee6b28] rounded-full"
                                style={{ width: `${(summary.count / summary.maxCount) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Aktivitas Review Wilayah */}
                <div className="rounded-2xl border border-[#efe9e2] bg-white p-6 shadow-xs">
                    <h3 className="text-base font-bold text-[#1a1817]">Aktivitas review wilayah {dashboardSummary.region}</h3>

                    <div className="mt-4 space-y-4">
                    {regionalActivityItems.map((act) => (
                        <div key={act.id} className="flex items-start gap-3">
                            <div
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                                act.icon === "approved"
                                    ? "bg-[#e8f5e9] text-[#2e7d32]"
                                    : act.icon === "revision"
                                    ? "bg-[#fff8e1] text-[#f57c00]"
                                    : act.icon === "queued"
                                    ? "bg-[#f5f2ed] text-[#5e5852]"
                                    : "bg-[#e3f2fd] text-[#1976d2]"
                                }`}
                            >
                            {act.icon === "approved" && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            )}
                            {act.icon === "revision" && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            )}
                            {act.icon === "queued" && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            </svg>
                            )}
                            {act.icon === "forwarded" && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="15 10 20 15 15 20" />
                                <path d="M4 4v7a4 4 0 0 0 4 4h12" />
                            </svg>
                            )}
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#1a1817] leading-snug">{act.title}</p>
                            <p className="text-[11px] text-[#8c857b] mt-0.5">
                            {act.actor} · {act.time}
                            </p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}