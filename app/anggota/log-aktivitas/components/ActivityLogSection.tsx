"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ActivityLogItem } from "@/types/anggota";

interface ActivityLogSectionProps {
  activities: ActivityLogItem[];
  mobile?: boolean;
  onBack?: () => void;
  idMember?: string;
}

export default function ActivityLogSection({
  activities,
  mobile = false,
  onBack,
  idMember = "ICA-M-004821",
}: ActivityLogSectionProps) {
  const latestActivities = mobile
    ? activities
    : activities.slice(0, 5);

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case "Login":
      case "Keamanan":
        return "bg-[#EBF3FE] text-[#2563EB]";

      case "Pengajuan":
        return "bg-[#E8F8EE] text-[#1E7E43]";

      case "Perubahan data":
        return "bg-[#FFF2E8] text-[#D96B27]";

      default:
        return "bg-[#F5F2ED] text-[#857B72]";
    }
  };

  if (mobile) {
    return (
      <>
        <style jsx>{`
          @keyframes slideInFromRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }

          .animate-slide-in {
            animation: slideInFromRight 0.28s
              cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>

        <div className="fixed inset-0 z-50 bg-[#F7F4EE] animate-slide-in flex flex-col justify-between">
          <div className="w-full max-w-md mx-auto h-full overflow-y-auto font-sans pt-3 pb-24 px-4 space-y-3.5 text-[#1F1B18]">
            
            {/* HEADER */}
            <div className="flex items-center gap-2.5 pt-1 pb-1">
              <button
                type="button"
                onClick={onBack}
                className="p-1 -ml-1 text-[#C85A17] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
                aria-label="Kembali"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div>
                <h1 className="text-base font-bold leading-tight text-[#1F1B18]">
                  Log aktivitas
                </h1>
                <p className="text-[11px] font-medium text-[#857B72]">
                  Akun {idMember}
                </p>
              </div>
            </div>

            {/* KETERANGAN */}
            <p className="text-[11px] text-[#8C827A] leading-relaxed px-0.5">
              Catatan masuk, perubahan data, dan pengajuan. Log bersifat
              read-only.
            </p>

            {/* LIST LOG */}
            <div className="space-y-3">
              {latestActivities.map((log) => (
                <div
                  key={log.id}
                  className="bg-white rounded-[20px] p-4 border border-[#EAE5DF] shadow-2xs space-y-2.5"
                >
                  <div>
                    <h3 className="text-xs font-bold text-[#111111] leading-snug">
                      {log.title}
                    </h3>

                    <p className="text-[11px] text-[#8C827A] mt-0.5 font-medium leading-relaxed">
                      {log.description}
                    </p>
                  </div>

                  {/* BADGE + TIMESTAMP */}
                  <div className="flex items-center gap-2.5 pt-0.5">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${getBadgeStyle(
                        log.category
                      )}`}
                    >
                      {log.category}
                    </span>

                    <span className="text-[10px] font-medium text-[#A0958B]">
                      {log.date} · {log.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM NAVIGATION */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAE5DF] py-2 px-4 flex justify-around items-center z-50 max-w-md mx-auto">
            <button className="flex flex-col items-center gap-1 text-[#857B72]">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-[9px] font-medium">Home</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-[#857B72]">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-[9px] font-medium">Direktori</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-[#857B72]">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="text-[9px] font-medium">Store</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-[#857B72]">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-[9px] font-medium">Event</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-[#D96B27]">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-[9px] font-bold">Profil</span>
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* HEADER DESKTOP */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-[var(--color-ink-900)]">
            Log Aktivitas
          </h2>

          <p className="mt-1 text-[11px] text-[var(--color-ink-700)]">
            Aktivitas terbaru pada akun anggota.
          </p>
        </div>

        <Link
          href="/anggota/log-aktivitas"
          className="inline-flex items-center gap-1 text-xs font-medium text-[#D95D1E] transition hover:opacity-80"
        >
          Detail
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* LIST DESKTOP */}
      <div className="divide-y divide-gray-100">
        {latestActivities.length === 0 ? (
          <div className="px-5 py-10 text-center text-xs text-gray-400">
            Belum ada aktivitas.
          </div>
        ) : (
          latestActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 px-5 py-3"
            >
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D95D1E]" />

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium text-[#D95D1E]">
                  {activity.date} · {activity.time}
                </p>

                <div className="mt-0.5 flex items-center gap-2">
                  <p className="text-xs font-medium text-[var(--color-ink-900)]">
                    {activity.title}
                  </p>

                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                    {activity.category}
                  </span>
                </div>

                <p className="mt-0.5 text-[11px] text-[var(--color-ink-700)]">
                  {activity.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}