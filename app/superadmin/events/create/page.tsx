"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EventFormHeader from "@/components/superadmin/events/EventFormHeader";
import EventDetail from "@/components/superadmin/events/EventDetailSection";
import EventQuota from "@/components/superadmin/events/EventQuota";
import EventType from "@/components/superadmin/events/EventType";
import EventBenching from "@/components/superadmin/events/EventBenching";
import EventLinkValidity from "@/components/superadmin/events/EventLinkValidity";
import EventTimeout from "@/components/superadmin/events/EventTimeout";
import EventFormActions from "@/components/superadmin/events/EventFormActions";
import { useToast } from "@/context/ToastContext";

function CreateEventFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const eventId = searchParams.get("id");
  const isEditMode = Boolean(eventId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      showToast("Pengaturan kuota & timer event berhasil diperbarui.", "success");
    } else {
      showToast("Event baru berhasil dibuat dan disimpan.", "success");
    }

    router.push("/superadmin/events");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-7xl mx-auto space-y-6 text-[#231A14]">
      <EventFormHeader
        isEditMode={isEditMode}
        onBack={handleCancel}
      />
      <EventDetail />
      <EventQuota />
      <EventType />
      <EventBenching />
      <EventLinkValidity />
      <EventTimeout />
      <EventFormActions
        isEditMode={isEditMode}
        onCancel={handleCancel}
      />
    </form>
  );
}

export default function CreateEventPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-[#8C8078]">Memuat formulir...</div>}>
      <CreateEventFormContent />
    </Suspense>
  );
}