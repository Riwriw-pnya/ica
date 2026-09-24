"use client";

import { useMemo, useState } from "react";
import { catAdminItems } from "@/data/superadmin";
import PedigreeStatusBadge from "./components/PedigreeStatusBadge.";

export default function CatsPage() {
  const [selectedBreed, setSelectedBreed] = useState("Semua ras");

  const breeds = useMemo(
    () => ["Semua ras", ...Array.from(new Set(catAdminItems.map((c) => c.breed)))],
    [],
  );

  const filteredItems = useMemo(() => {
    if (selectedBreed === "Semua ras") return catAdminItems;
    return catAdminItems.filter((c) => c.breed === selectedBreed);
  }, [selectedBreed]);

  return (
    <main className="space-y-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-4 sm:p-5">
          {/* Responsive Header Card */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[15px] font-semibold text-[var(--color-ink-900)]">
                Semua kucing terdaftar
              </h2>
              <p className="mt-0.5 text-[12px] text-[var(--color-ink-400)]">
                Kode pola mengikuti EMS code. Skor kesehatan diisi manual oleh admin ICA.
              </p>
            </div>

            {/* Select Filter responsif di HP */}
            <select
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              className="w-full shrink-0 rounded-lg border border-[var(--color-brand-orange-300)] bg-white px-3 py-2 text-[13px] font-medium text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-500)] sm:w-auto"
            >
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>

          {/* Table Container dengan Scroll Horizontal */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead>
                <tr className="border-b border-[var(--color-ink-100)]">
                  <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                    Reg. No
                  </th>
                  <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                    Kucing
                  </th>
                  <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                    EMS Code
                  </th>
                  <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                    Owner
                  </th>
                  <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                    Cattery
                  </th>
                  <th className="px-2 py-2.5 text-right text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                    Skor
                  </th>
                  <th className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                    Pedigree
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-ink-100)]">
                {filteredItems.map((cat) => (
                  <tr key={cat.id} className="transition hover:bg-[var(--color-ink-50)]">
                    <td className="px-2 py-3 text-[13px] text-[var(--color-ink-700)]">{cat.regNo}</td>
                    <td className="px-2 py-3">
                      <p className="text-[13px] font-semibold text-[var(--color-ink-900)]">{cat.name}</p>
                      <p className="text-[11px] text-[var(--color-ink-400)]">{cat.breed}</p>
                    </td>
                    <td className="px-2 py-3 text-[13px] text-[var(--color-ink-700)]">{cat.emsCode}</td>
                    <td className="px-2 py-3 text-[13px] text-[var(--color-ink-700)]">{cat.ownerName}</td>
                    <td className="px-2 py-3 text-[13px] text-[var(--color-ink-700)]">{cat.catteryName}</td>
                    <td className="px-2 py-3 text-right text-[13px] font-semibold text-[var(--color-ink-900)]">
                      {cat.healthScore}
                    </td>
                    <td className="px-2 py-3">
                      <PedigreeStatusBadge status={cat.pedigreeStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <p className="py-8 text-center text-[12px] text-[var(--color-ink-400)]">
                Tidak ada kucing dengan ras ini.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}