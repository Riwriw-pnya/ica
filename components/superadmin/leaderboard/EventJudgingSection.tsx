"use client";

import React, { useState } from "react";
import { Upload, Download, ChevronUp, ChevronDown, Award, Edit3, Newspaper } from "lucide-react";
import EditJudgingReportModal, { ParticipantScore } from "./EditJudgingReportModal";

// Data peserta per event
const bandungParticipants: ParticipantScore[] = [
  { id: "b1", name: "Bagas · Persian", owner: "Damar Wicaksono", category: "Umum", score: 92 },
  { id: "b2", name: "Kimo · Exotic Shorthair", owner: "Sinta Rahayu", category: "Umum", score: 88 },
  { id: "b3", name: "Momo · British Shorthair", owner: "Yoga Pratama", category: "Umum", score: 81 },
  { id: "b4", name: "Nara · Maine Coon", owner: "Hana Maheswari · ICA-2024-0871", category: "Member", score: 95 },
  { id: "b5", name: "Luna · Ragdoll", owner: "Ayu Kartika · ICA-2026-0388", category: "Member", score: 90 },
  { id: "b6", name: "Aksa · Maine Coon", owner: "Rumah Hana Cattery", category: "Cattery", score: 97 },
  { id: "b7", name: "Dena · Persian", owner: "Bandung Paws Cattery", category: "Cattery", score: 93 },
  { id: "b8", name: "Lila · Norwegian Forest", owner: "Whiskerlane Cattery", category: "Sponsor", score: 89 },
];

const jakartaParticipants: ParticipantScore[] = [
  { id: "j1", name: "Tama · Scottish Fold", owner: "Rian Nugraha", category: "Umum", score: 78 },
  { id: "j2", name: "Cleo · Bengal", owner: "Mira Anjani", category: "Umum", score: 85 },
  { id: "j3", name: "Nino · Persian", owner: "Bimo Saputra · ICA-2025-1330", category: "Member", score: 92 },
  { id: "j4", name: "Suri · Ragdoll", owner: "Sumatra Cats", category: "Cattery", score: 81 },
];

const medanParticipants: ParticipantScore[] = [
  { id: "m1", name: "Rio · Persian", owner: "Fajar Setiawan", category: "Umum", score: 84 },
  { id: "m2", name: "Sasa · Maine Coon", owner: "Dewi Larasati · ICA-2023-0455", category: "Member", score: 91 },
  { id: "m3", name: "Kirana · Persian", owner: "Medan Royal Cattery", category: "Cattery", score: 94 },
];

export default function EventJudgingSection() {
  const [openEvent, setOpenEvent] = useState<string | null>("bandung");
  
  // State modal edit judging report
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState<{
    title: string;
    count: number;
    participants: ParticipantScore[];
  }>({
    title: "ICA Cat Show Bandung 2026",
    count: 132,
    participants: bandungParticipants,
  });

  const toggleEvent = (eventId: string) => {
    setOpenEvent(openEvent === eventId ? null : eventId);
  };

  const handleOpenEditModal = (
    title: string,
    count: number,
    participants: ParticipantScore[]
  ) => {
    setSelectedEventData({ title, count, participants });
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Header section dengan tombol aksi global */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-[#231A14]">Judging report per event</h2>
          <p className="text-xs text-[#8C7A6B] mt-0.5">
            Klik kartu event untuk melihat peserta terdaftar per kategori. Status kuning berarti penilaian belum diinput, hijau berarti sudah lengkap.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#EFECE6] bg-white text-[#231A14] hover:bg-[#FAFAF7] text-xs font-bold transition cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-[#EE6B28]" /> Import data peserta
          </button>
          <button type="button" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#EFECE6] bg-white text-[#231A14] hover:bg-[#FAFAF7] text-xs font-bold transition cursor-pointer">
            <Download className="w-3.5 h-3.5 text-[#EE6B28]" /> Export
          </button>
        </div>
      </div>

      {/* 1. ICA Cat Show Bandung 2026 Card */}
      <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 space-y-6 shadow-xs">
        <div 
          className="flex items-start justify-between cursor-pointer"
          onClick={() => toggleEvent("bandung")}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold text-[#231A14]">ICA Cat Show Bandung 2026</h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                • Sudah diinput ✓
              </span>
            </div>
            <p className="text-xs text-[#8C7A6B]">18–19 Okt 2026 · Bandung · Cat Show · 132 peserta</p>
          </div>
          <button type="button" className="text-[#8C7A6B] p-1 cursor-pointer">
            {openEvent === "bandung" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {openEvent === "bandung" && (
          <div className="space-y-6 pt-2 border-t border-[#EFECE6]">
            {/* KATEGORI Umum */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#231A14] bg-[#FAF8F5] px-4 py-2 rounded-xl">
                <span>KATEGORI Umum</span>
                <span className="text-[#8C7A6B] font-normal">3 peserta</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Bagas · Persian", owner: "Damar Wicaksono", pts: "92 pts" },
                  { name: "Kimo · Exotic Shorthair", owner: "Sinta Rahayu", pts: "88 pts" },
                  { name: "Momo · British Shorthair", owner: "Yoga Pratama", pts: "81 pts" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between px-4 py-3 bg-white border border-[#EFECE6] rounded-2xl">
                    <div>
                      <p className="text-xs font-bold text-[#231A14]">{item.name}</p>
                      <p className="text-[11px] text-[#8C7A6B]">{item.owner}</p>
                    </div>
                    <span className="text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full">
                      {item.pts}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* KATEGORI Member */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#231A14] bg-[#FAF8F5] px-4 py-2 rounded-xl">
                <span>KATEGORI Member</span>
                <span className="text-[#8C8078] font-normal">2 peserta</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Nara · Maine Coon", owner: "Hana Maheswari · ICA-2024-0871", pts: "95 pts" },
                  { name: "Luna · Ragdoll", owner: "Ayu Kartika · ICA-2026-0388", pts: "90 pts" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between px-4 py-3 bg-white border border-[#EFECE6] rounded-2xl">
                    <div>
                      <p className="text-xs font-bold text-[#231A14]">{item.name}</p>
                      <p className="text-[11px] text-[#8C7A6B]">{item.owner}</p>
                    </div>
                    <span className="text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full">
                      {item.pts}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* KATEGORI Cattery */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#231A14] bg-[#FAF8F5] px-4 py-2 rounded-xl">
                <span>KATEGORI Cattery</span>
                <span className="text-[#8C8078] font-normal">2 peserta</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Aksa · Maine Coon", owner: "Rumah Hana Cattery", pts: "97 pts" },
                  { name: "Dena · Persian", owner: "Bandung Paws Cattery", pts: "93 pts" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between px-4 py-3 bg-white border border-[#EFECE6] rounded-2xl">
                    <div>
                      <p className="text-xs font-bold text-[#231A14]">{item.name}</p>
                      <p className="text-[11px] text-[#8C7A6B]">{item.owner}</p>
                    </div>
                    <span className="text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full">
                      {item.pts}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* KATEGORI Sponsor */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#231A14] bg-[#FAF8F5] px-4 py-2 rounded-xl">
                <span>KATEGORI Sponsor</span>
                <span className="text-[#8C8078] font-normal">1 peserta</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between px-4 py-3 bg-white border border-[#EFECE6] rounded-2xl">
                  <div>
                    <p className="text-xs font-bold text-[#231A14]">Lila · Norwegian Forest</p>
                    <p className="text-[11px] text-[#8C7A6B]">Whiskerlane Cattery</p>
                  </div>
                  <span className="text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full">
                    89 pts
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="button" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white text-xs font-bold shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] transition cursor-pointer">
                <Award className="w-4 h-4" /> Preview judging
              </button>
              <button 
                type="button" 
                onClick={() => handleOpenEditModal("ICA Cat Show Bandung 2026", 132, bandungParticipants)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#EFECE6] bg-white text-[#231A14] hover:bg-[#FAFAF7] text-xs font-bold transition cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#EE6B28]" /> Edit
              </button>
              <button type="button" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#EFECE6] bg-white text-[#231A14] hover:bg-[#FAFAF7] text-xs font-bold transition cursor-pointer">
                <Download className="w-3.5 h-3.5 text-[#EE6B28]" /> Export peserta
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. ICA Kitten Fest Jakarta Card */}
      <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 space-y-6 shadow-xs">
        <div 
          className="flex items-start justify-between cursor-pointer"
          onClick={() => toggleEvent("jakarta")}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold text-[#231A14]">ICA Kitten Fest Jakarta</h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                • Sudah diinput ✓
              </span>
            </div>
            <p className="text-xs text-[#8C7A6B]">4 Nov 2026 · Jakarta · Cat Show · 74 peserta</p>
          </div>
          <button type="button" className="text-[#8C8078] p-1 cursor-pointer">
            {openEvent === "jakarta" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {openEvent === "jakarta" && (
          <div className="space-y-6 pt-2 border-t border-[#EFECE6]">
            {/* KATEGORI Umum */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#231A14] bg-[#FAF8F5] px-4 py-2 rounded-xl">
                <span>KATEGORI Umum</span>
                <span className="text-[#8C8078] font-normal">2 peserta</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Tama · Scottish Fold", owner: "Rian Nugraha", pts: "78 pts" },
                  { name: "Cleo · Bengal", owner: "Mira Anjani", pts: "85 pts" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between px-4 py-3 bg-white border border-[#EFECE6] rounded-2xl">
                    <div>
                      <p className="text-xs font-bold text-[#231A14]">{item.name}</p>
                      <p className="text-[11px] text-[#8C8078]">{item.owner}</p>
                    </div>
                    <span className="text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full">
                      {item.pts}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* KATEGORI Member */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#231A14] bg-[#FAF8F5] px-4 py-2 rounded-xl">
                <span>KATEGORI Member</span>
                <span className="text-[#8C8078] font-normal">1 peserta</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between px-4 py-3 bg-white border border-[#EFECE6] rounded-2xl">
                  <div>
                    <p className="text-xs font-bold text-[#231A14]">Nino · Persian</p>
                    <p className="text-[11px] text-[#8C8078]">Bimo Saputra · ICA-2025-1330</p>
                  </div>
                  <span className="text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full">
                    92 pts
                  </span>
                </div>
              </div>
            </div>

            {/* KATEGORI Cattery */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#231A14] bg-[#FAF8F5] px-4 py-2 rounded-xl">
                <span>KATEGORI Cattery</span>
                <span className="text-[#8C8078] font-normal">1 peserta</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between px-4 py-3 bg-white border border-[#EFECE6] rounded-2xl">
                  <div>
                    <p className="text-xs font-bold text-[#231A14]">Suri · Ragdoll</p>
                    <p className="text-[11px] text-[#8C8078]">Sumatra Cats</p>
                  </div>
                  <span className="text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full">
                    81 pts
                  </span>
                </div>
              </div>
            </div>

            {/* KATEGORI Sponsor */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#231A14] bg-[#FAF8F5] px-4 py-2 rounded-xl">
                <span>KATEGORI Sponsor</span>
                <span className="text-[#8C8078] font-normal">0 peserta</span>
              </div>
              <div className="p-4 bg-white border border-[#EFECE6] rounded-2xl text-xs text-[#8C8078]">
                Belum ada peserta pada kategori ini.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="button" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white text-xs font-bold shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] transition cursor-pointer">
                <Award className="w-4 h-4" /> Preview judging
              </button>
              <button 
                type="button" 
                onClick={() => handleOpenEditModal("ICA Kitten Fest Jakarta", 74, jakartaParticipants)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#EFECE6] bg-white text-[#231A14] hover:bg-[#FAFAF7] text-xs font-bold transition cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#EE6B28]" /> Edit
              </button>
              <button type="button" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#EFECE6] bg-white text-[#231A14] hover:bg-[#FAFAF7] text-xs font-bold transition cursor-pointer">
                <Download className="w-3.5 h-3.5 text-[#EE6B28]" /> Export peserta
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. ICA Cat Show Medan 2026 Card */}
      <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 space-y-6 shadow-xs">
        <div 
          className="flex items-start justify-between cursor-pointer"
          onClick={() => toggleEvent("medan")}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold text-[#231A14]">ICA Cat Show Medan 2026</h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                • Sudah diinput ✓
              </span>
            </div>
            <p className="text-xs text-[#8C7A6B]">12–13 Jul 2026 · Medan · Cat Show · 96 peserta</p>
          </div>
          <button type="button" className="text-[#8C8078] p-1 cursor-pointer">
            {openEvent === "medan" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {openEvent === "medan" && (
          <div className="space-y-6 pt-2 border-t border-[#EFECE6]">
            {/* KATEGORI Umum */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#231A14] bg-[#FAF8F5] px-4 py-2 rounded-xl">
                <span>KATEGORI Umum</span>
                <span className="text-[#8C8078] font-normal">1 peserta</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between px-4 py-3 bg-white border border-[#EFECE6] rounded-2xl">
                  <div>
                    <p className="text-xs font-bold text-[#231A14]">Rio · Persian</p>
                    <p className="text-[11px] text-[#8C8078]">Fajar Setiawan</p>
                  </div>
                  <span className="text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full">
                    84 pts
                  </span>
                </div>
              </div>
            </div>

            {/* KATEGORI Member */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#231A14] bg-[#FAF8F5] px-4 py-2 rounded-xl">
                <span>KATEGORI Member</span>
                <span className="text-[#8C8078] font-normal">1 peserta</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between px-4 py-3 bg-white border border-[#EFECE6] rounded-2xl">
                  <div>
                    <p className="text-xs font-bold text-[#231A14]">Sasa · Maine Coon</p>
                    <p className="text-[11px] text-[#8C8078]">Dewi Larasati · ICA-2023-0455</p>
                  </div>
                  <span className="text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full">
                    91 pts
                  </span>
                </div>
              </div>
            </div>

            {/* KATEGORI Cattery */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#231A14] bg-[#FAF8F5] px-4 py-2 rounded-xl">
                <span>KATEGORI Cattery</span>
                <span className="text-[#8C8078] font-normal">1 peserta</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between px-4 py-3 bg-white border border-[#EFECE6] rounded-2xl">
                  <div>
                    <p className="text-xs font-bold text-[#231A14]">Kirana · Persian</p>
                    <p className="text-[11px] text-[#8C8078]">Medan Royal Cattery</p>
                  </div>
                  <span className="text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full">
                    94 pts
                  </span>
                </div>
              </div>
            </div>

            {/* KATEGORI Sponsor */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#231A14] bg-[#FAF8F5] px-4 py-2 rounded-xl">
                <span>KATEGORI Sponsor</span>
                <span className="text-[#8C8078] font-normal">0 peserta</span>
              </div>
              <div className="p-4 bg-white border border-[#EFECE6] rounded-2xl text-xs text-[#8C8078]">
                Belum ada peserta pada kategori ini.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="button" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white text-xs font-bold shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] transition cursor-pointer">
                <Award className="w-4 h-4" /> Preview judging
              </button>
              <button 
                type="button" 
                onClick={() => handleOpenEditModal("ICA Cat Show Medan 2026", 96, medanParticipants)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#EFECE6] bg-white text-[#231A14] hover:bg-[#FAFAF7] text-xs font-bold transition cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#EE6B28]" /> Edit
              </button>
              <button type="button" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#EFECE6] bg-white text-[#231A14] hover:bg-[#FAFAF7] text-xs font-bold transition cursor-pointer">
                <Download className="w-3.5 h-3.5 text-[#EE6B28]" /> Export peserta
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Banner */}
      <div className="bg-[#F0F7FF] border border-[#D0E5FF] rounded-2xl p-4 flex items-center gap-3 text-xs text-[#231A14]">
        <Newspaper className="w-4 h-4 text-[#0066CC] shrink-0" />
        <span>Foto kucing juara tidak dimoderasi di sini. Pilih pemenang yang tampil ke publik lewat banner leaderboard di menu News / Artikel.</span>
      </div>

      {/* Modal Edit Judging Report */}
      <EditJudgingReportModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        eventTitle={selectedEventData.title}
        totalParticipants={selectedEventData.count}
        initialParticipants={selectedEventData.participants}
      />
    </div>
  );
}