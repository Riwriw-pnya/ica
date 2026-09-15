"use client";

import React, { useEffect, useState } from "react";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  onErrorToast: (message: string) => void;
}

export default function WithdrawalModal({
  isOpen,
  onClose,
  onSubmitSuccess,
  onErrorToast,
}: WithdrawalModalProps) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericAmount = Number(amount.replace(/\D/g, ""));

    if (!amount || numericAmount <= 0) {
      onErrorToast("Nominal penarikan wajib diisi.");
      return;
    }

    if (numericAmount < 500000) {
      onErrorToast("Nominal penarikan minimum Rp 500.000.");
      return;
    }

    onSubmitSuccess();
    onClose();
    setAmount("");
    setNote("");
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between border-b border-[#EEDFD5] pb-4">
          <div>
            <h3 className="text-base font-bold text-[#1A1513]">Tarik dana</h3>
            <p className="mt-0.5 text-xs text-[#8C8074]">
              Pengajuan penarikan dari saldo settlement ke rekening resmi ICA.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-[#8C8074] hover:bg-[#FAF7F5] hover:text-[#1A1513] transition"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="rounded-xl border border-[#EEDFD5] bg-[#FAF8F5] p-3.5 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#8C8074]">Saldo tersedia</span>
              <span className="font-bold text-[#1A1513]">Rp 38.200.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C8074]">Rekening tujuan</span>
              <span className="font-bold text-[#1A1513]">BCA 018–2233–4455</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1513]">
              Nominal penarikan (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="10.000.000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#EEDFD5] bg-white px-3.5 py-2.5 text-xs text-[#1A1513] outline-none focus:border-[#EE6B28] focus:ring-1 focus:ring-[#EE6B28]"
            />
            <p className="mt-1 text-[11px] text-[#8C8074]">Minimum Rp 500.000.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1513]">Keterangan</label>
            <textarea
              rows={3}
              placeholder="Misalnya: operasional cat show Bandung."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#EEDFD5] bg-white px-3.5 py-2.5 text-xs text-[#1A1513] outline-none focus:border-[#EE6B28] focus:ring-1 focus:ring-[#EE6B28]"
            />
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-[#FCE3D2] bg-[#FFF7F2] p-3 text-xs text-[#EE6B28]">
            <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
            </svg>
            <p className="text-[11px] leading-relaxed">
              Pengajuan hanya dapat dilakukan Super Admin atau admin berotorisasi, dan tercatat di log audit.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-full border border-[#EEDFD5] bg-white px-5 py-2 text-xs font-bold text-[#574D45] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FAF7F5] active:translate-y-0"
            >
              Batal
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)] active:translate-y-0"
            >
              Ajukan penarikan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}