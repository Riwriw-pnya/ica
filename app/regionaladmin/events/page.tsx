"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { useState, useEffect } from "react"; 
import ShareEventModal from "./components/ShareEventModal";

interface TicketQuota {
  id?: string;
  category: string;
  total?: number;
  quota?: number;
  remaining?: number;
  color?: "orange" | "red" | "green";
}

interface EventItem {
  id: string;
  slug?: string;
  title?: string;
  name?: string;
  type?: string;
  locationType?: string;
  locationName?: string;
  dateRange?: string;
  status?: string;
  activePeriod?: string;
  timeoutInfo?: string;
  quotas?: TicketQuota[];
  manualNote?: string;
  paidParticipantsCount?: number;
}

const mockEvents: EventItem[] = [
  {
    id: "1",
    slug: "ev-2026-011-cat-show-bandung",
    title: "ICA Cat Show Bandung 2026",
    type: "Cat Show",
    locationType: "Bandung",
    locationName: "Trans Convention Center",
    dateRange: "18–19 Okt 2026",
    status: "Upcoming",
    activePeriod: "15 Sep 2026 09:00 sampai 12 Okt 2026 23:59 WIB",
    timeoutInfo: "timeout pembayaran 10:00",
    quotas: [
      { category: "Umum", total: 20, remaining: 6, color: "orange" },
      { category: "Member", total: 30, remaining: 8, color: "orange" },
      { category: "Cattery", total: 15, remaining: 0, color: "red" },
      { category: "Sponsor (Cattery)", total: 10, remaining: 6, color: "green" },
    ],
  },
  {
    id: "2",
    slug: "diklat-breeder-pemula-batch-3",
    title: "Diklat Breeder Pemula — Batch 3",
    type: "Diklat Cattery",
    locationType: "Daring · Nasional",
    locationName: "daring",
    dateRange: "2–5 Sep 2026",
    status: "Ongoing",
    activePeriod: "1 Aug 2026 00:00 sampai 1 Sep 2026 23:59 WIB",
    paidParticipantsCount: 41,
    manualNote: "Kuota per kategori belum diatur — event ini masih memakai pendaftaran manual.",
  },
];

function TrophyIcon() {
  return (
    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 4h8v4c0 3-1.5 5-4 6-2.5-1-4-3-4-6V4z" />
      <path strokeLinecap="round" d="M8 6H5v2c0 2 1.5 3 3 3M16 6h3v2c0 2-1.5 3-3 3" />
      <path strokeLinecap="round" d="M12 14v4M8 21h8M9 18h6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path strokeLinecap="round" d="M8.6 13.5l6.8 3.9M15.4 6.6L8.6 10.5" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg className="h-8 w-8 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path strokeLinecap="round" d="M21 16l-5.5-5.5L9 17" />
    </svg>
  );
}

export default function EventsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [eventsList, setEventsList] = useState<EventItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("custom_events");
    const localEventsObj = stored ? JSON.parse(stored) : {};
    const localEventsArray: EventItem[] = Object.values(localEventsObj);

    setEventsList([...localEventsArray, ...mockEvents]);
  }, []);

  const [selectedShareEvent, setSelectedShareEvent] = useState<EventItem | null>(null);

  const handleCreateEvent = () => {
    router.push("/regionaladmin/events/new");
  };

  return (
    <main className="min-h-full pb-12 bg-[#F8F9FA] text-[var(--color-ink-900,#1E293B)] font-sans">
      <div className="mx-auto max-w-[1240px] space-y-4">
        
        {/* Header Section */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-2xs flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[15px] font-bold text-gray-900">Agenda event & war ticketing</h2>
            <p className="mt-1 text-[12px] text-gray-500 leading-relaxed max-w-[650px]">
              Kuota tiket dibagi per kategori peserta. Slot ditahan sementara saat checkout dan
              dilepas otomatis kalau pembayaran melewati batas waktu.
            </p>
          </div>
          <button
            onClick={handleCreateEvent}
            className="cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0 rounded-full bg-gradient-to-b from-[#FFA066] to-[#EE6B28] px-5 py-2.5 text-[12px] font-bold text-white shadow-md hover:brightness-105 hover:-translate-y-0.5 transition-all"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Buat event
          </button>
        </div>

        {/* Info Banner 1 */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-[12px] text-blue-700 shadow-2xs">
          <svg className="h-4 w-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          <span>
            Seluruh pendapatan tiket dan pendaftaran event yang Anda buat masuk langsung ke kas
            Regional Bandung. Event baru terbit di agenda setelah disetujui Super Admin Pusat.
          </span>
        </div>

        {/* List Card Event */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {eventsList.map((evt) => (
            <div key={evt.id} className="flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-2xs">
              <div className="flex flex-col items-center justify-center bg-gray-100 py-10 border-b border-dashed border-gray-300 text-gray-400">
                <ImageIcon />
                <span className="text-[11px] font-medium mt-1">Banner event · 1600×600</span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-orange-600 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      {evt.status || "Draft"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-gray-600">
                      <TrophyIcon /> {evt.type || (evt as any).eventType || (evt as any).category || "Tanpa Kategori"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-gray-600">
                      <PinIcon /> {evt.locationType || (evt as any).locationType || "Luring"}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[16px] font-bold text-gray-900 leading-snug">
                    {evt.name || evt.title || "Tanpa Judul"}
                  </h3>

                  <p className="mt-1 text-[11px] text-gray-400">
                    {evt.dateRange 
                      ? evt.dateRange 
                      : (evt as any).startDate && (evt as any).endDate 
                        ? `${(evt as any).startDate} - ${(evt as any).endDate}` 
                        : "Tanggal belum diatur"
                    }
                    {" · "}
                    {evt.locationName || (evt as any).location || "Lokasi belum diatur"}
                    {evt.paidParticipantsCount ? ` · ${evt.paidParticipantsCount} peserta lunas` : ""}
                    {evt.timeoutInfo ? (
                      ` · ${evt.timeoutInfo}`
                    ) : (evt as any).timeoutMinutes || (evt as any).paymentTimeoutMinutes ? (
                      ` · timeout pembayaran ${(evt as any).timeoutMinutes || (evt as any).paymentTimeoutMinutes} menit`
                    ) : null}
                  </p>

                  {evt.manualNote && (
                    <p className="mt-3 text-[12px] text-gray-500 leading-relaxed">{evt.manualNote}</p>
                  )}

                  {/* SECTION KUOTA TIKET */}
                  {evt.quotas && evt.quotas.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {evt.quotas.map((q: any, idx) => {
                        const rawQuota = q.total ?? q.quota;
                        const isUnset = rawQuota === undefined || rawQuota === null || rawQuota === "";
                        
                        const total = isUnset ? 0 : Number(rawQuota);
                        const remaining = q.remaining !== undefined ? Number(q.remaining) : total;
                        
                        const percent = total > 0 ? Math.round(((total - remaining) / total) * 100) : 0;
                        
                        // 1. Kondisi jika kuota pernah diset > 0 tapi sisanya 0 (Habis Dibeli)
                        const isSoldOut = !isUnset && total > 0 && remaining === 0;
                        
                        // 2. Kondisi jika admin dari awal mengisi angka 0
                        const isExplicitZero = !isUnset && total === 0;

                        let statusText = `${remaining} slot tersisa`;
                        let badgeStyle = "bg-amber-100 text-amber-700";

                        if (isUnset) {
                          statusText = "Belum diatur";
                          badgeStyle = "bg-gray-100 text-gray-500 font-medium";
                        } else if (isExplicitZero) {
                          statusText = "0 slot (Nonaktif)";
                          badgeStyle = "bg-gray-200 text-gray-600 font-semibold";
                        } else if (isSoldOut) {
                          statusText = "Kuota penuh"; // Atau "Habis terjual"
                          badgeStyle = "bg-red-100 text-red-600 font-semibold";
                        } else if (q.color === "green") {
                          badgeStyle = "bg-emerald-100 text-emerald-700 font-semibold";
                        }

                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-[11px] font-medium">
                              <span className="text-gray-700">{q.category}</span>
                              <span className={`rounded-md px-1.5 py-0.5 text-[10px] ${badgeStyle}`}>
                                {statusText}
                              </span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  isUnset || isExplicitZero
                                    ? "bg-gray-200"
                                    : isSoldOut
                                      ? "bg-red-500"
                                      : q.color === "green"
                                        ? "bg-emerald-500"
                                        : "bg-amber-500"
                                }`}
                                style={{ width: isUnset || isExplicitZero ? "0%" : `${percent}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => router.push(`/regionaladmin/events/${evt.id}`)}
                      className="flex-1 inline-flex items-center justify-center gap-1 rounded-full border border-[var(--color-brand-orange-700,#EE6B28)] bg-white px-3 py-1.5 text-[11px] font-semibold text-[var(--color-brand-orange-700,#EE6B28)] hover:bg-orange-50 transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      <PencilIcon /> Atur kuota & timer
                    </button>
                    <button
                      onClick={() => router.push(`/regionaladmin/events/${evt.id}/registration`)}
                      className="flex-1 inline-flex items-center justify-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-gray-900 hover:bg-gray-50 transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      Kelola pendaftaran →
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setSelectedShareEvent(evt)}
                      className="inline-flex items-center gap-1 rounded-full border border-[var(--color-brand-orange-700,#EE6B28)] bg-white px-3 py-1.5 text-[11px] font-semibold text-[var(--color-brand-orange-700,#EE6B28)] hover:bg-orange-50 transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      <ShareIcon /> Share event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner 2 */}
        <div className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-[12px] text-blue-700 shadow-2xs mt-6">
          <svg className="h-4 w-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Perubahan scope resmi: War Ticket System sekarang masuk scope sesuai update PRD. Dokumen
            lama yang menandai modul ini "di luar scope" sudah usang.
          </span>
        </div>
      </div>

      <ShareEventModal
        event={
          selectedShareEvent
            ? ({
                ...selectedShareEvent,
                slug: selectedShareEvent.slug || selectedShareEvent.id || "event",
                title: selectedShareEvent.title || selectedShareEvent.name || "Event",
              } as any)
            : null
        }
        onClose={() => setSelectedShareEvent(null)}
        onShowToast={showToast}
      />
    </main>
  );
}