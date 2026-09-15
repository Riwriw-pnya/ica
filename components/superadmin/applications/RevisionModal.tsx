"use client";

import { useState } from "react";

interface RevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { reasons: string[]; notes: string }) => void;
}

export default function RevisionModal({
  isOpen,
  onClose,
  onSubmit,
}: RevisionModalProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const options = [
    "Sertifikat pedigree induk betina kurang jelas",
    "Tanggal mating tidak sesuai rentang kehamilan",
    "Foto pasangan tidak menampilkan kedua induk",
  ];

  const handleCheckboxChange = (option: string) => {
    setSelectedReasons((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ reasons: selectedReasons, notes });
    setSelectedReasons([]);
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#EFE9E1] relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-1 mb-6">
          <h2 className="text-lg font-bold text-[#231A14]">Minta revisi ke pemohon</h2>
          <p className="text-xs text-[#8C8078] leading-relaxed">
            Pemohon menerima notifikasi berisi daftar perbaikan di bawah. Status aplikasi berubah menjadi <span className="font-semibold text-[#231A14]">Perlu revisi</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            {options.map((option, idx) => (
              <label key={idx} className="flex items-center gap-3 text-xs text-[#231A14] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selectedReasons.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="w-4 h-4 rounded border-[#D2C9BF] text-[#EE6B28] focus:ring-[#EE6B28] accent-[#EE6B28]"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#231A14]">
              Catatan untuk pemohon
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jelaskan perbaikan yang diperlukan dengan singkat."
              className="w-full text-xs p-3 border border-[#EFE9E1] rounded-2xl focus:outline-none focus:border-[#EE6B28] placeholder:text-[#A89F95]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#5A4F48] bg-[#FAF8F5] border border-[#EFE9E1] hover:bg-[#F2EFE9] transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-b from-[#FFA066] via-[#EE6B28] to-[#E05510] border border-[#D95A19] shadow-[0_3px_6px_rgba(238,107,40,0.35)] hover:brightness-105 transition"
            >
              Kirim permintaan revisi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}