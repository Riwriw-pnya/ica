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
    <div className="space-y-4">
      {/* ========================================================= */}
      {/* 1. TAMPILAN MOBILE VIEW                                   */}
      {/* ========================================================= */}
      <div className="block lg:hidden rounded-2xl border border-[#EEDFD5] bg-white p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1A1513]">Riwayat event</h3>
          <span className="text-[10px] text-[#8C8074]">{events.length} event</span>
        </div>
        <p className="text-[10px] text-[#8C8074] leading-relaxed -mt-1">
          Keikutsertaan {catName} pada cat show resmi ICA beserta hasil penjurian.
        </p>

        {events.length > 0 ? (
          <ul className="space-y-2.5 pt-1">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex items-center justify-between rounded-xl border border-[#EEDFD5] bg-[#FAF7F2] p-3 gap-2"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FCF3E3] text-[#B57A25] shrink-0">
                    <DashboardIcon name="calendar" size={16} />
                  </span>
                  <div className="truncate">
                    <p className="text-xs font-bold text-[#1A1513] truncate">{event.eventName}</p>
                    <p className="text-[10px] text-[#8C8074] leading-tight mt-0.5 truncate">
                      {event.date} · {event.ring} · {event.category}
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <StatusBadge label={event.result} tone={eventResultTone(event.result)} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-[#EEDFD5] bg-[#FAF7F2] p-3.5 text-center">
            <p className="text-xs text-[#8C8074]">Kucing ini belum pernah mengikuti event.</p>
          </div>
        )}

        <p className="text-[10px] text-[#8C8074] leading-relaxed pt-1">
          Hasil penjurian diisi komite event ICA — read-only di sisi cattery.
        </p>
      </div>

      {/* ========================================================= */}
      {/* 2. TAMPILAN DESKTOP VIEW                                  */}
      {/* ========================================================= */}
      <div className="hidden lg:block rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">Riwayat event</h3>
          <span className="text-xs text-slate-400">{events.length} event</span>
        </div>
        <p className="text-xs text-slate-500 -mt-2">
          Keikutsertaan {catName} pada cat show resmi ICA beserta hasil penjurian.
        </p>

        {events.length > 0 ? (
          <ul className="space-y-3">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 shrink-0">
                    <DashboardIcon name="calendar" size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{event.eventName}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {event.date} · {event.ring} · {event.category}
                    </p>
                  </div>
                </div>
                <StatusBadge label={event.result} tone={eventResultTone(event.result)} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-500">Kucing ini belum pernah mengikuti event.</p>
        )}

        <p className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
          Hasil penjurian diisi komite event ICA — read-only di sisi cattery.
        </p>
      </div>
    </div>
  );
}