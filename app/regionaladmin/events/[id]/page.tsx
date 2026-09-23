"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { eventFormDefaults, eventFormItems } from "@/data/regionalAdmin";
import type { EventFormData, EventQuotaCategory, EventKind } from "@/types/regionalAdmin";
import { useToast } from "@/context/ToastContext";
import DetailEventSection from "./components/DetailEventSection";
import QuotaSection from "./components/QuotaSection";
import EventKindSection from "./components/EventKindSection";
import BenchingSection from "./components/BenchingSection";
import WarTicketingSection from "./components/WarTicketingSection";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EventDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { showToast } = useToast();

  const getInitialData = (): EventFormData => {
    if (id === "new") return { ...eventFormDefaults, id: "new" };

    // Cek apakah data event ini ada di localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("custom_events");
      if (stored) {
        const localEvents = JSON.parse(stored);
        if (localEvents[id]) return localEvents[id];
      }
    }

    // Jika tidak ada di localStorage, ambil dari file mock data
    return eventFormItems[id] ?? { ...eventFormDefaults, id };
  };

  const [formData, setFormData] = useState<EventFormData>(getInitialData);

  const updateField = (patch: Partial<EventFormData>) => setFormData((prev) => ({ ...prev, ...patch }));

  const updateQuota = (quotaId: string, patch: Partial<EventQuotaCategory>) => {
    setFormData((prev) => ({
      ...prev,
      quotas: prev.quotas.map((q) => (q.id === quotaId ? { ...q, ...patch } : q)),
    }));
  };

  const handleBannerPick = (file: File) => {
    const url = URL.createObjectURL(file);
    updateField({ bannerUrl: url });
  };

  // Fungsi Helper untuk Menyimpan/Meng-update LocalStorage
  const handleSave = (status: "Draft" | "Review" | "Upcoming") => {
    const eventId = id === "new" ? `ev-${Date.now()}` : id;
    const newEventData = {
      ...formData,
      id: eventId,
      status,
      type: formData.eventKind || (formData as any).category,       
      locationType: formData.location || (formData as any).location,
      timeoutInfo: formData.timeoutMinutes 
    ? `timeout pembayaran ${formData.timeoutMinutes} menit` 
    : undefined,
    };
    const stored = localStorage.getItem("custom_events");
    const localEvents = stored ? JSON.parse(stored) : {};
    localEvents[eventId] = newEventData;
    localStorage.setItem("custom_events", JSON.stringify(localEvents));

    showToast(`Event berhasil disimpan dengan status ${status}`, "success");
    router.push("/regionaladmin/events");
  };

  return (
    <main className="min-h-full">
      <div className="mx-auto max-w-[1100px] space-y-5">
        <Link href="/regionaladmin/events" className="inline-block mb-3 text-[12px] font-semibold font-sans text-[var(--color-brand-orange-700)] hover:underline">
          ← Kembali ke agenda event
        </Link>
        
        <DetailEventSection formData={formData} onChange={updateField} onBannerPick={handleBannerPick} />

        <QuotaSection quotas={formData.quotas} onChangeQuota={updateQuota} />

        <EventKindSection
          eventKind={formData.eventKind}
          onChange={(value: EventKind) => updateField({ eventKind: value })}
        />

        <BenchingSection
          tableCount={formData.tableCount}
          capacityPerTable={formData.capacityPerTable}
          seats={formData.seats}
          showFloorPlan={formData.showFloorPlanToParticipants}
          onChangeTableCount={(value) => updateField({ tableCount: value })}
          onChangeCapacity={(value) => updateField({ capacityPerTable: value })}
          onToggleShowFloorPlan={(value) => updateField({ showFloorPlanToParticipants: value })}
        />

        <WarTicketingSection formData={formData} onChange={updateField} />

        <div className="flex justify-end gap-3 pt-4 pb-6">
          <button
            type="button"
            onClick={() => handleSave("Draft")}
            className="cursor-pointer rounded-full border border-[var(--color-brand-orange-300)] bg-white px-5 py-2.5 text-[13px] font-semibold text-[var(--color-brand-orange-700)] transition-all hover:-translate-y-0.5 hover:bg-[var(--color-brand-orange-50)]"
          >
            Simpan sebagai draft
          </button>
          <button
            onClick={() => handleSave("Review")}
            className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all hover:-translate-y-0.5 duration-150 hover:from-[#EE6B28] hover:to-[#C8601D]"
          >
            Lanjut ke review →
          </button>
        </div>
      </div>
    </main>
  );
}