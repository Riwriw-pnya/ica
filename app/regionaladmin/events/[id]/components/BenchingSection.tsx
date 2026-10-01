"use client";

import type { BenchSeat } from "@/types/regionalAdmin";

interface BenchingSectionProps {
  tableCount: number;
  capacityPerTable: number;
  seats: BenchSeat[];
  showFloorPlan: boolean;
  onChangeTableCount: (value: number) => void;
  onChangeCapacity: (value: number) => void;
  onToggleShowFloorPlan: (value: boolean) => void;
}

export default function BenchingSection({
  tableCount,
  capacityPerTable,
  seats,
  showFloorPlan,
  onChangeTableCount,
  onChangeCapacity,
  onToggleShowFloorPlan,
}: BenchingSectionProps) {
  const capacityDenah = tableCount * capacityPerTable;

  const tables = Array.from({ length: tableCount }, (_, idx) => {
    const tableNumber = idx + 1;
    const seat = seats.find((s) => s.tableNumber === tableNumber);
    const occupied = Math.min(seat?.occupied ?? 0, capacityPerTable);
    return { tableNumber, occupied };
  });

  const totalOccupied = tables.reduce((sum, t) => sum + t.occupied, 0);

  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
      <h2 className="text-[15px] font-semibold text-[var(--color-ink-900)]">Pengaturan benching (meja)</h2>
      <p className="mt-0.5 text-[12px] text-[var(--color-ink-400)]">
        Denah meja dipakai untuk penempatan peserta di area event. Nomor meja dibagikan ke peserta
        setelah pendaftaran ditutup.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Jumlah meja</label>
          <input
            type="number"
            min={0}
            onFocus={(e) => e.target.select()}
            value={tableCount}
            onChange={(e) => onChangeTableCount(Math.max(0, Number(e.target.value)))}
            className="mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
          />
        </div>

        <div>
          <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Kapasitas per meja</label>
          <input
            type="number"
            min={0}
            onFocus={(e) => e.target.select()}
            value={capacityPerTable}
            onChange={(e) => onChangeCapacity(Math.max(0, Number(e.target.value)))}
            className="mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
          />
        </div>

        <div className="flex items-end">
          <span className="rounded-lg bg-gray-50 px-3 py-2 text-[13px] font-medium text-[var(--color-ink-700)]">
            Kapasitas denah: {capacityDenah} kucing
          </span>
        </div>
      </div>

      <p className="mt-5 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
        Denah area · Terisi {totalOccupied} dari {capacityDenah} tempat
      </p>

      {tableCount === 0 ? (
        <p className="mt-3 text-[12px] text-[var(--color-ink-400)]">Belum ada meja diatur.</p>
      ) : (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-8">
          {tables.map((t) => (
            <div
              key={t.tableNumber}
              className={`rounded-lg border p-2.5 text-center ${
                t.occupied > 0
                  ? "border-[var(--color-brand-orange-300)] bg-[var(--color-brand-orange-50)]"
                  : "border-[var(--color-ink-100)] bg-gray-50"
              }`}
            >
              <p className="text-[12px] font-semibold text-[var(--color-ink-900)]">Meja {t.tableNumber}</p>
              <p className="mt-0.5 text-[11px] text-[var(--color-ink-400)]">
                {t.occupied}/{capacityPerTable}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-[var(--color-ink-100)] pt-4">
        <div>
          <p className="text-[13px] font-medium text-[var(--color-ink-900)]">
            Tampilkan denah meja ke peserta
          </p>
          <p className="mt-0.5 text-[11px] text-[var(--color-ink-400)]">
            Peserta melihat nomor meja dan denah di detail event pada portalnya.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onToggleShowFloorPlan(!showFloorPlan)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            showFloorPlan ? "border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28]" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              showFloorPlan ? "translate-x-0.5" : "-translate-x-5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}