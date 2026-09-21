"use client";

import React, { useState, useEffect } from "react";
import { X, Upload, Download, HelpCircle } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export interface ParticipantScore {
  id: string;
  name: string;
  owner: string;
  category: string;
  score: number | "";
}

interface EditJudgingReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle?: string;
  totalParticipants?: number;
  initialParticipants?: ParticipantScore[];
}

export default function EditJudgingReportModal({
  isOpen,
  onClose,
  eventTitle = "ICA Cat Show Bandung 2026",
  totalParticipants = 132,
  initialParticipants = [],
}: EditJudgingReportModalProps) {
  const { showToast } = useToast();

  const [judgeName, setJudgeName] = useState("Nama juri FIFe");
  const [ringSession, setRingSession] = useState("Ring A · sesi pagi");
  const [participants, setParticipants] = useState<ParticipantScore[]>(initialParticipants);

  // Sync data peserta saat modal dibuka dengan event yang dipilih
  useEffect(() => {
    if (isOpen) {
      setParticipants(initialParticipants);
    }
  }, [isOpen, initialParticipants]);

  if (!isOpen) return null;

  const handleScoreChange = (id: string, value: string) => {
    setParticipants((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, score: value === "" ? "" : Number(value) } : item
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      `Judging report ${eventTitle} berhasil diperbarui.`,
      "success"
    );
    onClose();
  };

  const judgedCount = participants.filter((p) => p.score !== "").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#EFECE6] rounded-2xl max-w-4xl w-full p-5 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header Modal */}
        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-[#231A14]">Judging report</h3>
            <p className="text-xs text-[#8C7A6B]">
              {eventTitle} · {totalParticipants} peserta terdaftar. Skor yang disimpan langsung dipakai tabel ranking dan banner leaderboard.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8C7A6B] hover:text-[#231A14] transition cursor-pointer p-1 rounded-lg hover:bg-[#FAF8F5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tombol Utilitas Import/Export */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EFECE6] bg-white text-[#231A14] hover:bg-[#FAFAF7] text-xs font-semibold transition cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[#EE6B28]" />
            Import dari file peserta
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EFECE6] bg-white text-[#231A14] hover:bg-[#FAFAF7] text-xs font-semibold transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#EE6B28]" />
            Export template
          </button>
        </div>

        {/* Form Modal */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row Juri & Ring */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#231A14]">Juri penilai</label>
              <input
                type="text"
                value={judgeName}
                onChange={(e) => setJudgeName(e.target.value)}
                placeholder="Nama juri"
                className="w-full bg-[#FAF8F5] border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-3 py-2 outline-none focus:border-[#EE6B28] transition"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#231A14]">Ring / sesi</label>
              <input
                type="text"
                value={ringSession}
                onChange={(e) => setRingSession(e.target.value)}
                placeholder="Ring A · sesi pagi"
                className="w-full bg-[#FAF8F5] border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-3 py-2 outline-none focus:border-[#EE6B28] transition"
              />
            </div>
          </div>

          {/* Tabel Nilai Peserta */}
          <div className="border border-[#EFECE6] rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EFECE6] bg-[#FAF8F5] text-[#8C7A6B] font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-2 px-3">PESERTA</th>
                  <th className="py-2 px-3">KATEGORI</th>
                  <th className="py-2 px-3 text-center w-28">SKOR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6]">
                {participants.length > 0 ? (
                  participants.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAFAF7]/50 transition-colors">
                      <td className="py-2 px-3">
                        <p className="font-bold text-[#231A14]">{item.name}</p>
                        <p className="text-[11px] text-[#8C7A6B]">{item.owner}</p>
                      </td>
                      <td className="py-2 px-3 text-[#6B5D52] font-medium">{item.category}</td>
                      <td className="py-2 px-3 text-center">
                        <input
                          type="number"
                          value={item.score}
                          onChange={(e) => handleScoreChange(item.id, e.target.value)}
                          className="w-20 text-center bg-white border border-[#EFECE6] rounded-lg py-1 text-xs font-bold text-[#231A14] outline-none focus:border-[#EE6B28] transition"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-[#8C7A6B]">
                      Belum ada data peserta untuk event ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-[#8C7A6B]">
            {judgedCount} dari {participants.length} peserta dalam daftar ini telah dinilai
          </p>

          {/* Warning Box Import Standard */}
          <div className="p-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl flex items-start gap-2 text-xs text-[#7A6E65]">
            <HelpCircle className="w-4 h-4 text-[#8C7A6B] shrink-0 mt-0.5" />
            <span>
              [PRD TBD] Format file import (CSV atau XLSX) dan skema kolom skor belum ditetapkan bersama tim juri.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-[#EFECE6] bg-white text-[#7A6E65] hover:bg-[#FAF8F5] text-xs font-bold transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white text-xs font-bold shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] transition cursor-pointer"
            >
              Simpan judging report
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}