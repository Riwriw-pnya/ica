"use client";

import { useState, useEffect } from "react";

export interface BatchModalData {
  id: string;
  name: string;
  catteryOrRole: string;
  quotaCategory: string;
  catData: string;
  batchNumber?: string;
}

interface SetBatchModalProps {
  isOpen: boolean;
  data: BatchModalData | null;
  onClose: () => void;
  onSave: (id: string, batchVal: string) => void;
}

export default function SetBatchModal({
  isOpen,
  data,
  onClose,
  onSave,
}: SetBatchModalProps) {
  const [batchInput, setBatchInput] = useState("");

  useEffect(() => {
    if (data) {
      // Ambil hanya angka jika nilainya dalam format "Batch 1", atau langsung gunakan stringnya
      const existingVal = data.batchNumber ? data.batchNumber.replace(/\D/g, "") : "";
      setBatchInput(existingVal || data.batchNumber || "");
    }
  }, [data]);

  if (!isOpen || !data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchInput.trim()) return;
    onSave(data.id, batchInput.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">Set nomor batching</h3>
            <p className="text-[12px] text-gray-500 mt-1 leading-snug">
              Nomor batching mengelompokkan giliran penilaian peserta di hari acara. Peserta menerima nomornya di detail event.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1 rounded-lg cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Info Peserta (Gray Box) */}
        <div className="rounded-xl bg-gray-50/80 p-3.5 space-y-2 border border-gray-100 text-[12px]">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Peserta</span>
            <span className="col-span-2 font-bold text-gray-900">
              {data.name} · <span className="font-normal text-gray-700">{data.catteryOrRole}</span>
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Kategori kuota</span>
            <span className="col-span-2 font-semibold text-gray-900">{data.quotaCategory}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Kucing didaftarkan</span>
            <span className="col-span-2 font-semibold text-gray-900">{data.catData}</span>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[12px] font-semibold text-gray-800">
              Nomor batching
            </label>
            <input
              type="text"
              value={batchInput}
              onChange={(e) => setBatchInput(e.target.value)}
              placeholder="Masukkan nomor (contoh: 1)"
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-[13px] text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition"
              autoFocus
            />
            <p className="text-[11px] text-gray-400">
              Kelompok penilaian 1–4 untuk event ini.
            </p>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-200 bg-white px-5 py-2 text-[12px] font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!batchInput.trim()}
              className="rounded-full bg-gradient-to-b from-[#FFA066] to-[#EE6B28] px-5 py-2 text-[12px] font-semibold text-white shadow-xs hover:brightness-105 transition disabled:opacity-50 cursor-pointer"
            >
              Simpan nomor batching
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}