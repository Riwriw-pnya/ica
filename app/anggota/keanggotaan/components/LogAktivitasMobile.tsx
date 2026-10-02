"use client";

import React from "react";

interface LogAktivitasMobileProps {
  onBack?: () => void;
  idMember?: string;
}

interface LogItem {
  id: number;
  title: string;
  detail: string;
  category: string;
  categoryType:
    | "login"
    | "pengajuan"
    | "perubahan"
    | "keamanan_info"
    | "keamanan_warning";
  timestamp: string;
}

export default function LogAktivitasMobile({
  onBack,
  idMember = "ICA-M-004821",
}: LogAktivitasMobileProps) {
  const logs: LogItem[] = [
    {
      id: 1,
      title: "Masuk ke Member Portal",
      detail: "Chrome · Windows 11 · Bandung · IP 114.79.**.**",
      category: "Login",
      categoryType: "login",
      timestamp: "01 Sep 2026 · 09:14",
    },
    {
      id: 2,
      title: "Pengajuan status cattery dikirim",
      detail: "ICA-CTY-2026-0517 · admin wilayah Jawa Barat",
      category: "Pengajuan",
      categoryType: "pengajuan",
      timestamp: "31 Agu 2026 · 16:40",
    },
    {
      id: 3,
      title: "Nomor WhatsApp diperbarui",
      detail: "0812-****-1122 diganti menjadi 0813-****-4455",
      category: "Perubahan data",
      categoryType: "perubahan",
      timestamp: "28 Agu 2026 · 11:02",
    },
    {
      id: 4,
      title: "Kata sandi sementara diterbitkan admin",
      detail: "tiket ICA-PWD-2026-0148 · Admin Jawa Barat",
      category: "Keamanan",
      categoryType: "keamanan_info",
      timestamp: "27 Agu 2026 · 22:10",
    },
    {
      id: 5,
      title: "Percobaan masuk gagal",
      detail: "Kata sandi salah · Safari · iPhone · IP 36.72.**.**",
      category: "Keamanan",
      categoryType: "keamanan_warning",
      timestamp: "27 Agu 2026 · 21:33",
    },
  ];

  const getBadgeStyle = (type: LogItem["categoryType"]) => {
    switch (type) {
      case "login":
      case "keamanan_info":
        return "bg-[#EBF3FE] text-[#2563EB]";

      case "pengajuan":
        return "bg-[#E8F8EE] text-[#1E7E43]";

      case "perubahan":
        return "bg-[#FFF2E8] text-[#D96B27]";

      case "keamanan_warning":
        return "bg-[#FDF0F0] text-[#E11D48]";

      default:
        return "bg-[#F5F2ED] text-[#857B72]";
    }
  };

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

      <div className="fixed inset-0 z-50 flex flex-col bg-[#F7F4EE] animate-slide-in">
        {/* Scrollable Content */}
        <div className="mx-auto h-full w-full max-w-md overflow-y-auto px-4 pb-24 pt-3 font-sans text-[#1F1B18]">
          <div className="space-y-3.5">
            {/* Header */}
            <div className="flex items-center gap-2.5 pb-1 pt-1">
              <button
                type="button"
                onClick={onBack}
                className="-ml-1 cursor-pointer rounded-full p-1 text-[#C85A17] transition-colors hover:bg-black/5"
                aria-label="Kembali"
              >
                <svg
                  className="h-5 w-5"
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

            {/* Information */}
            <p className="px-0.5 text-[11px] leading-relaxed text-[#8C827A]">
              Catatan masuk, perubahan data, dan pengajuan. Log bersifat
              read-only.
            </p>

            {/* Activity List */}
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="space-y-2.5 rounded-[20px] border border-[#EAE5DF] bg-white p-4 shadow-2xs"
                >
                  <div>
                    <h3 className="text-xs font-bold leading-snug text-[#111111]">
                      {log.title}
                    </h3>

                    <p className="mt-0.5 text-[11px] font-medium leading-relaxed text-[#8C827A]">
                      {log.detail}
                    </p>
                  </div>

                  {/* Category + Timestamp */}
                  <div className="flex items-center gap-2.5 pt-0.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${getBadgeStyle(
                        log.categoryType
                      )}`}
                    >
                      {log.category}
                    </span>

                    <span className="text-[10px] font-medium text-[#A0958B]">
                      {log.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-w-md items-center justify-around border-t border-[#EAE5DF] bg-white px-4 py-2">
          <button
            type="button"
            className="flex flex-col items-center gap-1 text-[#857B72]"
          >
            <svg
              className="h-5 w-5"
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

          <button
            type="button"
            className="flex flex-col items-center gap-1 text-[#857B72]"
          >
            <svg
              className="h-5 w-5"
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

          <button
            type="button"
            className="flex flex-col items-center gap-1 text-[#857B72]"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M16 7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>

            <span className="text-[9px] font-medium">Store</span>
          </button>

          <button
            type="button"
            className="flex flex-col items-center gap-1 text-[#857B72]"
          >
            <svg
              className="h-5 w-5"
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

          <button
            type="button"
            className="flex flex-col items-center gap-1 text-[#D96B27]"
          >
            <svg
              className="h-5 w-5"
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