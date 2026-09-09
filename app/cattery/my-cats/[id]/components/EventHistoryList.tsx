import DashboardIcon from "@/components/anggota/DashboardIcon";
import type { CatEventResult } from "@/types/cattery";
import { StatusBadge } from "./StatusBadge";
import { eventResultTone } from "./badge-utils";

interface EventHistoryListProps {
  catName: string;
  events: CatEventResult[];
}

export function EventHistoryList({ catName, events }: EventHistoryListProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Riwayat event</h3>
        <span className="text-sm text-slate-400">{events.length} event</span>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        Keikutsertaan {catName} pada cat show resmi ICA beserta hasil penjurian.
      </p>

      {events.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {events.map((event) => (
            <li
              key={event.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <DashboardIcon name="calendar" size={16} />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-900">{event.eventName}</p>
                  <p className="text-xs text-slate-500">
                    {event.date} · {event.ring} · {event.category}
                  </p>
                </div>
              </div>
              <StatusBadge label={event.result} tone={eventResultTone(event.result)} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-slate-500">Kucing ini belum pernah mengikuti event.</p>
      )}

      <p className="mt-5 text-xs text-slate-400">
        Hasil penjurian diisi komite event ICA — read-only di sisi cattery.
      </p>
    </div>
  );
}
