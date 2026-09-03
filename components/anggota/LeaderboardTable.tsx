"use client";

import { useMemo, useState } from "react";
import DashboardIcon from "./DashboardIcon";
import type { LeaderboardEntry, LeaderboardCategory } from "@/types/anggota";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

const categoryOptions: (LeaderboardCategory | "Semua kategori")[] = [
  "Semua kategori",
  "Kitten",
  "Adult",
  "Household Pet",
];

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  const [category, setCategory] = useState<(typeof categoryOptions)[number]>("Semua kategori");
  const [season, setSeason] = useState("Musim 2026");

  const filteredEntries = useMemo(() => {
    const result =
      category === "Semua kategori"
        ? entries
        : entries.filter((e) => e.category === category);

    return [...result].sort((a, b) => a.rank - b.rank);
  }, [entries, category]);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as (typeof categoryOptions)[number])}
          className="rounded-lg border border-[var(--color-ink-100)] bg-white px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
        >
          {categoryOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="font-sans rounded-lg border border-[var(--color-ink-100)] bg-white px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
        >
          <option>Musim 2026</option>
          <option>Musim 2025</option>
        </select>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--color-ink-100)] bg-white">
        <table className="w-full min-w-[650px] text-left">
          <thead>
            <tr className="border-b border-[var(--color-ink-100)] bg-[var(--color-ink-50)] font-semibold">
              <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wide font-semibold text-[var(--color-ink-700)]">Rank</th>
              <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wide font-semibold text-[var(--color-ink-700)]">Foto</th>
              <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wide font-semibold text-[var(--color-ink-700)]">Kucing</th>
              <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wide font-semibold text-[var(--color-ink-700)]">Ras</th>
              <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wide font-semibold text-[var(--color-ink-700)]">Cattery</th>
              <th className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-wide font-semibold text-[var(--color-ink-700)]">Poin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-ink-100)]">
            {filteredEntries.map((entry) => (
              <tr key={entry.id} className="transition hover:bg-[var(--color-brand-orange-50)]">
                <td className="px-4 py-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[12px] font-semibold text-[var(--color-brand-orange-700)]">
                    {entry.rank}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-ink-100)] text-[var(--color-ink-400)]">
                    <DashboardIcon name="cat" size={16} />
                  </span>
                </td>
                <td className="px-4 py-3 text-[13px] font-medium text-[var(--color-ink-900)]">
                  {entry.catName}
                </td>
                <td className="px-4 py-3 text-[13px] text-[var(--color-ink-700)]">
                  {entry.breed}
                </td>
                <td className="px-4 py-3 text-[13px] text-[var(--color-ink-700)]">
                  {entry.cattery}
                </td>
                <td className="px-4 py-3 text-right text-[13px] font-semibold text-[var(--color-ink-900)]">
                  {entry.points.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredEntries.length === 0 && (
          <p className="p-6 text-center text-[12px] text-[var(--color-ink-400)]">
            Belum ada data leaderboard untuk kategori ini.
          </p>
        )}
      </div>
    </>
  );
}