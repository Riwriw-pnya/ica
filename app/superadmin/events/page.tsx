"use client";

import React from "react";
import { useRouter } from "next/navigation";
import EventsHeader from "@/components/superadmin/events/EventsHeader";
import EventCard, { EventItemProps } from "@/components/superadmin/events/EventCard";
import EventsFooterNotice from "@/components/superadmin/events/EventsFooterNotice";

export default function EventsPage() {
  const router = useRouter();

  const eventsData: EventItemProps[] = [
    {
      id: "ica-cat-show-bandung-2026",
      badges: [
        { label: "Upcoming", variant: "upcoming" },
        { label: "Cat Show", variant: "default" },
        { label: "Bandung", variant: "default" },
      ],
      title: "ICA Cat Show Bandung 2026",
      subtitle: "18–19 Okt 2026 · Trans Convention Center · timeout pembayaran 10:00",
      slots: [
        {
          name: "Umum",
          statusText: "6 slot tersisa",
          statusColor: "text-[#C88500]",
          percentage: "70%",
          barColor: "bg-[#E5A93B]",
        },
        {
          name: "Member",
          statusText: "8 slot tersisa",
          statusColor: "text-[#C88500]",
          percentage: "85%",
          barColor: "bg-[#E5A93B]",
        },
        {
          name: "Cattery",
          statusText: "Kuota penuh",
          statusColor: "text-rose-600",
          badgeBg: "bg-rose-50",
          percentage: "100%",
          barColor: "bg-rose-500",
        },
        {
          name: "Sponsor (Cattery)",
          statusText: "6 slot tersisa",
          statusColor: "text-emerald-600",
          percentage: "60%",
          barColor: "bg-emerald-500",
        },
      ],
    },
    {
      id: "diklat-breeder-pemula-batch-3",
      badges: [
        { label: "Ongoing", variant: "ongoing" },
        { label: "Diklat Cattery", variant: "default" },
        { label: "Daring · Nasional", variant: "default" },
      ],
      title: "Diklat Breeder Pemula — Batch 3",
      subtitle: "2–5 Sep 2026 · daring · 41 peserta lunas",
      noticeText: "Kuota per kategori belum diatur — event ini masih memakai pendaftaran manual.",
    },
  ];

  // Handler ke halaman Form/Edit Kuota
  const handleManageQuota = (item: EventItemProps) => {
    router.push(`/superadmin/events/create?id=${item.id}`);
  };

  // Handler ke halaman Detail Review Pendaftaran
  const handleManageRegistration = (item: EventItemProps) => {
    router.push(`/superadmin/events/detail?id=${item.id}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-[#231A14]">
      {/* Header Halaman */}
      <EventsHeader />

      {/* Grid Kartu Event */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {eventsData.map((item) => (
          <EventCard
            key={item.id}
            item={item}
            onManageQuota={handleManageQuota}
            onManageRegistration={handleManageRegistration}
          />
        ))}
      </div>

      {/* Footer Callout Note */}
      <EventsFooterNotice />
    </div>
  );
}