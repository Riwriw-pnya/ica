"use client";

import React from "react";

interface EventItem {
  id: string;
  day: string;
  month: string;
  title: string;
  details: string;
  statusBadge: { label: string; type: "green" | "orange" };
  categoryBadge: string;
  slotBadge: { label: string; type: "orange" | "red" | "green" };
}

const eventsData: EventItem[] = [
  {
    id: "1",
    day: "18",
    month: "OKT",
    title: "ICA Cat Show Bandung 2026",
    details: "18–19 Okt 2026 · Trans Convention Center, Bandung · Rp 150.000",
    statusBadge: { label: "Pendaftaran dibuka", type: "green" },
    categoryBadge: "Kuota Cattery",
    slotBadge: { label: "2 slot tersisa", type: "orange" },
  },
  {
    id: "2",
    day: "04",
    month: "NOV",
    title: "ICA Kitten Fest Jakarta",
    details: "4 Nov 2026 · Kuningan City Hall, Jakarta · Rp 120.000",
    statusBadge: { label: "Pendaftaran dibuka", type: "green" },
    categoryBadge: "Kuota Cattery",
    slotBadge: { label: "Kuota penuh", type: "red" },
  },
  {
    id: "3",
    day: "12",
    month: "DES",
    title: "Diklat Breeder Pemula — Batch 4",
    details: "12–14 Des 2026 · Daring · Zoom · Rp 250.000",
    statusBadge: { label: "Segera dibuka", type: "orange" },
    categoryBadge: "Kuota Cattery",
    slotBadge: { label: "20 slot tersisa", type: "green" },
  },
];

export default function EventsPage() {
  const getBadgeStyle = (type: "green" | "orange" | "red" | "neutral") => {
    switch (type) {
      case "green":
        return "bg-[#eaf6ed] text-[#28844b]";
      case "orange":
        return "bg-[#fff4e5] text-[#c26d0a]";
      case "red":
        return "bg-[#fce8e6] text-[#c5221f]";
      case "neutral":
      default:
        return "bg-[#f1ede8] text-[#6b5f54]";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#2d2825] font-sans">
      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1a1513]">
            Event &amp; Cat Show
          </h1>
          <p className="text-xs sm:text-sm text-[#7e7267] leading-relaxed max-w-3xl">
            Kuota tiket dibagi per kategori peserta. Akun cattery hanya bisa
            membeli dari kuota kategori <span className="font-semibold text-[#1a1513]">Cattery</span>.
            Slot ditahan sementara saat checkout dan dilepas otomatis kalau
            pembayaran melewati batas waktu.
          </p>
        </div>

        {/* Event List */}
        <div className="space-y-4 pt-2">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-[#eedfd5] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#f05a1b]/30 transition"
            >
              {/* Left Side: Date Box + Content */}
              <div className="flex items-start gap-4">
                {/* Date Box */}
                <div className="w-14 h-14 rounded-2xl bg-[#fff2e8] flex flex-col items-center justify-center shrink-0 border border-[#fce3d2]">
                  <span className="text-lg font-black text-[#f05a1b] leading-none">
                    {event.day}
                  </span>
                  <span className="text-[10px] font-bold text-[#f05a1b] tracking-wider mt-0.5">
                    {event.month}
                  </span>
                </div>

                {/* Event Details */}
                <div className="space-y-1.5">
                  {/* Badges Container */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${getBadgeStyle(
                        event.statusBadge.type
                      )}`}
                    >
                      {event.statusBadge.label}
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${getBadgeStyle(
                        "neutral"
                      )}`}
                    >
                      {event.categoryBadge}
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${getBadgeStyle(
                        event.slotBadge.type
                      )}`}
                    >
                      {event.slotBadge.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-bold text-base text-[#1a1513]">
                    {event.title}
                  </h2>

                  {/* Subtitle Info */}
                  <p className="text-xs text-[#8c8074]">{event.details}</p>
                </div>
              </div>

              {/* Right Side: Action Button dengan Style Sesuai Request */}
              <div className="self-end sm:self-center shrink-0">
                <button
                  type="button"
                  className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
                >
                  Ikut
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}