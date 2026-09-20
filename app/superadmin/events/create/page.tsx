"use client";

import React from "react";
import EventFormHeader from "@/components/superadmin/events/EventFormHeader";
import EventDetail from "@/components/superadmin/events/EventDetailSection";
import EventQuota from "@/components/superadmin/events/EventQuota";
import EventType from "@/components/superadmin/events/EventType";
import EventBenching from "@/components/superadmin/events/EventBenching";
import EventLinkValidity from "@/components/superadmin/events/EventLinkValidity";
import EventTimeout from "@/components/superadmin/events/EventTimeout";
import EventFormActions from "@/components/superadmin/events/EventFormActions";

export default function CreateEventPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-[#231A14]">
      <EventFormHeader />
      <EventDetail />
      <EventQuota />
      <EventType />
      <EventBenching />
      <EventLinkValidity />
      <EventTimeout />
      <EventFormActions />
    </div>
  );
}