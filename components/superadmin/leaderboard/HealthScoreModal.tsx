"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useToast } from "@/context/ToastContext";

interface HealthScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HealthScoreModal({ isOpen, onClose }: HealthScoreModalProps) {
  const { showToast } = useToast();

  const [selectedCat, setSelectedCat] = useState("Bagas");
  const [selectedEvent, setSelectedEvent] = useState("Ranking global");
  const [physicalScore, setPhysicalScore] = useState<number | "">(36);
  const [historyScore, setHistoryScore] = useState<number | "">(27);
  const [vaccineScore, setVaccineScore] = useState<number | "">(29);
  const [totalScore, setTotalScore] = useState<number>(92);

  // Kalkulasi total skor secara otomatis dari 3 komponen
  useEffect(() => {
    const p = typeof physicalScore === "number" ? physicalScore : 0;
    const h = typeof historyScore === "number" ? historyScore : 0;
    const v = typeof vaccineScore === "number" ? vaccineScore : 0;
    setTotalScore(p + h + v);
  }, [physicalScore, historyScore, vaccineScore]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Skor kesehatan tersimpan dan tampil read-only di sisi cattery.", "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Ukuran diperbesar: max-w-2xl, p-8, space-y-6 */}
      <div className="bg-white border border-[#EFECE6] rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl relative">
        
        {/* Header Modal */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#231A14]">Input skor kesehatan</h3>
            <p className="text-xs text-[#8C7A6B]">
              Skor diisi manual oleh admin ICA. Di sisi cattery nilai ini tampil read-only.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8C7A6B] hover:text-[#231A14] transition cursor-pointer p-1.5 rounded-xl hover:bg-[#FAF8F5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Modal */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Field: Kucing */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#231A14]">Kucing</label>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-4 py-3 outline-none focus:border-[#EE6B28] transition cursor-pointer"
              >
                <option value="">Pilih kucing</option>
                <option value="Bagas">Bagas (PER n 22)</option>
                <option value="Kimo">Kimo (EXO n 24)</option>
                <option value="Nara">Nara (PER f 03)</option>
                <option value="Sasa">Sasa (MCO ns 22)</option>
                <option value="Rico">Rico (MCO n 09 22)</option>
              </select>
            </div>

            {/* Field: Event Penilaian */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#231A14]">Event penilaian</label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-4 py-3 outline-none focus:border-[#EE6B28] transition cursor-pointer"
              >
                <option value="Ranking global">Ranking global</option>
                <option value="ICA Cat Show Bandung 2026">ICA Cat Show Bandung 2026</option>
                <option value="ICA Cat Show Medan 2026">ICA Cat Show Medan 2026</option>
              </select>
            </div>

            {/* Field: Kondisi fisik */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#231A14]">Kondisi fisik (0–40)</label>
              <input
                type="number"
                min="0"
                max="40"
                value={physicalScore}
                onChange={(e) => setPhysicalScore(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-[#FAF8F5] border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-4 py-3 outline-none focus:border-[#EE6B28] transition"
              />
            </div>

            {/* Field: Riwayat kesehatan */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#231A14]">Riwayat kesehatan (0–30)</label>
              <input
                type="number"
                min="0"
                max="30"
                value={historyScore}
                onChange={(e) => setHistoryScore(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-[#FAF8F5] border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-4 py-3 outline-none focus:border-[#EE6B28] transition"
              />
            </div>

            {/* Field: Kelengkapan vaksin */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#231A14]">Kelengkapan vaksin (0–30)</label>
              <input
                type="number"
                min="0"
                max="30"
                value={vaccineScore}
                onChange={(e) => setVaccineScore(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-[#FAF8F5] border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-4 py-3 outline-none focus:border-[#EE6B28] transition"
              />
            </div>

            {/* Field: Total skor (Readonly) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#231A14]">Total skor</label>
              <input
                type="number"
                readOnly
                value={totalScore}
                className="w-full bg-[#F5F2EB] border border-[#EFECE6] text-[#231A14] text-xs font-bold rounded-xl px-4 py-3 outline-none cursor-not-allowed"
              />
            </div>

          </div>

          <p className="text-[11px] text-[#8C7A6B]">
            Terisi otomatis dari tiga komponen di atas.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-[#EFECE6] bg-white text-[#7A6E65] hover:bg-[#FAF8F5] text-xs font-bold transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white text-xs font-bold shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] transition cursor-pointer"
            >
              Simpan skor
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}