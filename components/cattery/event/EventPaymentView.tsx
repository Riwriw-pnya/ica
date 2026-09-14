"use client";

import React, { useState } from "react";

interface EventPaymentViewProps {
  onBack: () => void;
  onNext: () => void;
}

export default function EventPaymentView({ onBack, onNext }: EventPaymentViewProps) {
  const [selectedMethod, setSelectedMethod] = useState("qris");

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-xl sm:text-2xl font-bold text-[#1A1513]">Payment</h1>

      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-xs font-semibold text-[#EE6B28] hover:underline cursor-pointer"
      >
        &lt; Kembali ke Checkout Ticket
      </button>

      {/* Timer Card Header */}
      <div className="bg-white rounded-2xl border border-[#EEDFD5] p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#8C8074]">
            SISA WAKTU PEMBAYARAN
          </span>
          <span className="text-xl font-bold text-[#F05A1B] font-mono">09:44</span>
        </div>
        <div className="w-full bg-[#F3EAE1] h-1.5 rounded-full overflow-hidden">
          <div className="bg-[#F05A1B] h-full w-[85%]" />
        </div>
      </div>

      {/* Payment Selection Form */}
      <div className="bg-white rounded-2xl border border-[#EEDFD5] p-5 sm:p-6 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-[#1A1513]">Ringkasan tiket</h2>
          <p className="text-xs text-[#8C8074] mt-0.5">
            ICA Cat Show Bandung 2026 · 1 slot kategori Cattery · Rp 150.000
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-semibold text-[#574D45]">Metode pembayaran</label>

          {/* Option 1: QRIS */}
          <div
            onClick={() => setSelectedMethod("qris")}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
              selectedMethod === "qris"
                ? "border-[#EE6B28] bg-[#FFF8F5]"
                : "border-[#EEDFD5] bg-white hover:border-[#D6C2B4]"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={selectedMethod === "qris"}
              onChange={() => setSelectedMethod("qris")}
              className="accent-[#EE6B28]"
            />
            <div>
              <p className="font-bold text-xs text-[#1A1513]">QRIS</p>
              <p className="text-[11px] text-[#8C8074]">Scan sekali bayar · verifikasi otomatis</p>
            </div>
          </div>

          {/* Option 2: Transfer BCA */}
          <div
            onClick={() => setSelectedMethod("bca")}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
              selectedMethod === "bca"
                ? "border-[#EE6B28] bg-[#FFF8F5]"
                : "border-[#EEDFD5] bg-white hover:border-[#D6C2B4]"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={selectedMethod === "bca"}
              onChange={() => setSelectedMethod("bca")}
              className="accent-[#EE6B28]"
            />
            <div>
              <p className="font-bold text-xs text-[#1A1513]">Transfer BCA</p>
              <p className="text-[11px] text-[#8C8074]">Virtual account · verifikasi otomatis</p>
            </div>
          </div>

          {/* Option 3: Transfer Mandiri */}
          <div
            onClick={() => setSelectedMethod("mandiri")}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
              selectedMethod === "mandiri"
                ? "border-[#EE6B28] bg-[#FFF8F5]"
                : "border-[#EEDFD5] bg-white hover:border-[#D6C2B4]"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={selectedMethod === "mandiri"}
              onChange={() => setSelectedMethod("mandiri")}
              className="accent-[#EE6B28]"
            />
            <div>
              <p className="font-bold text-xs text-[#1A1513]">Transfer Mandiri</p>
              <p className="text-[11px] text-[#8C8074]">Virtual account · verifikasi otomatis</p>
            </div>
          </div>
        </div>

        {/* Total & Pay Button */}
        <div className="pt-2 space-y-4">
          <div className="flex justify-between items-center text-sm font-bold">
            <span className="text-[#1A1513]">Total bayar</span>
            <span className="text-[#F05A1B] text-base">Rp 150.000</span>
          </div>

          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-8 py-3 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5"
          >
            Bayar sekarang
          </button>
        </div>
      </div>
    </div>
  );
}