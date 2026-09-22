"use client";

import React from "react";
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

export default function CreateEventPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  // Deteksi apakah sedang edit dari "Atur kuota & timer"
  const eventId = searchParams.get("id");
  const isEditMode = Boolean(eventId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      showToast("Pengaturan kuota & timer event berhasil diperbarui.", "success");
    } else {
      showToast("Event baru berhasil dibuat dan disimpan.", "success");
    }

    // Kembali ke daftar event
    router.push("/superadmin/events");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-7xl mx-auto space-y-6 text-[#231A14]">
      {/* Header dengan tombol kembali & Judul Dinamis */}
      <EventFormHeader
        isEditMode={isEditMode}
        onBack={handleCancel}
      />

      {/* Bagian Detail Utama Event */}
      <EventDetail />

      {/* Pengaturan Kuota Event */}
      <EventQuota />

      {/* Tipe / Kategori Event */}
      <EventType />

      {/* Pengaturan Benching */}
      <EventBenching />

      {/* Masa Berlaku Link */}
      <EventLinkValidity />

      {/* Pengaturan Timer / Timeout Pendaftaran */}
      <EventTimeout />

      {/* Tombol Batal & Simpan */}
      <EventFormActions
        isEditMode={isEditMode}
        onCancel={handleCancel}
      />
    </form>
  );
}