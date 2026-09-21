"use client";

import React, { useState } from "react";
import LeaderboardHeader from "@/components/superadmin/leaderboard/LeaderboardHeader";
import GlobalRankingTable from "@/components/superadmin/leaderboard/GlobalRankingTable";
import EventJudgingSection from "@/components/superadmin/leaderboard/EventJudgingSection";
import HealthScoreModal from "@/components/superadmin/leaderboard/HealthScoreModal";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"global" | "event">("global");
  const [selectedEvent, setSelectedEvent] = useState("ICA Cat Show Bandung 2026");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-[#231A14]">
      {/* Header Utama dengan Trigger Modal */}
      <LeaderboardHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        onOpenModal={() => setIsModalOpen(true)}
      />
      
      <GlobalRankingTable activeTab={activeTab} selectedEvent={selectedEvent} />
      <EventJudgingSection />
      <HealthScoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}