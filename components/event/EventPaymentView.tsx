"use client";
import React, { useState, useEffect } from "react";

interface EventPaymentViewProps {
  onBack: () => void;
  onNext: () => void;
}

export default function EventPaymentView({ onBack, onNext }: EventPaymentViewProps) {
  const [selectedMethod, setSelectedMethod] = useState("qris");
  const [secondsLeft, setSecondsLeft] = useState(584);

useEffect(() => {
  if (secondsLeft <= 0) return;

  const timer = setInterval(() => {
    setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
  }, 1000);

  return () => clearInterval(timer);
}, [secondsLeft]);

const formatTime = (totalSec: number) => {
  const mins = Math.floor(totalSec / 60)
    .toString()
    .padStart(2, "0");

  const secs = (totalSec % 60)
    .toString()
    .padStart(2, "0");

  return `${mins}:${secs}`;
};
  const [selectedBank, setSelectedBank] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const bankOptions = [
  { id: "bca", name: "BCA", va: "8808123456789012" },
  { id: "mandiri", name: "Bank Mandiri", va: "8908123456789012" },
  { id: "bni", name: "BNI", va: "8108123456789012" },
  { id: "bri", name: "BRI", va: "7708123456789012" },
  { id: "btn", name: "BTN", va: "7508123456789012" },
  { id: "bsi", name: "Bank Syariah Indonesia", va: "9208123456789012" },
  { id: "cimb", name: "CIMB Niaga", va: "7808123456789012" },
  { id: "danamon", name: "Danamon", va: "7308123456789012" },
  { id: "permata", name: "PermataBank", va: "8208123456789012" },
  { id: "ocbc", name: "OCBC", va: "8308123456789012" },
  { id: "uob", name: "UOB Indonesia", va: "8408123456789012" },
  { id: "maybank", name: "Maybank Indonesia", va: "8508123456789012" },
  { id: "mega", name: "Bank Mega", va: "8608123456789012" },
  { id: "panin", name: "PaninBank", va: "8708123456789012" },
  { id: "btpn", name: "Bank SMBC Indonesia", va: "9108123456789012" },
];

  const selectedBankObj = bankOptions.find((b) => b.id === selectedBank);

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
          <span className="text-xl font-bold text-[#F05A1B] font-mono">
            {formatTime(secondsLeft)}
          </span>
        </div>
        <div className="w-full bg-[#F3EAE1] h-1.5 rounded-full overflow-hidden">
          <div
  className="bg-[#F05A1B] h-full transition-all duration-1000"
  style={{ width: `${(secondsLeft / 600) * 100}%` }}
/>
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

          {/* Option 2: Transfer Bank dengan Icon Dropdown Saja */}
          <div
            onClick={() => {
              setSelectedMethod("transfer");
              if (!isDropdownOpen && !selectedBank) setIsDropdownOpen(true);
            }}
            className={`p-4 rounded-xl border cursor-pointer transition-all space-y-3 ${
              selectedMethod === "transfer"
                ? "border-[#EE6B28] bg-[#FFF8F5]"
                : "border-[#EEDFD5] bg-white hover:border-[#D6C2B4]"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedMethod === "transfer"}
                  onChange={() => {
                    setSelectedMethod("transfer");
                    setIsDropdownOpen(true);
                  }}
                  className="accent-[#EE6B28]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-xs text-[#1A1513]">Transfer Bank</p>
                    {selectedBankObj && (
                      <span className="text-[10px] font-bold text-[#EE6B28] bg-[#FFE5D4] px-2 py-0.5 rounded-full">
                        {selectedBankObj.name}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#8C8074]">
                    {selectedBankObj ? "Virtual Account aktif" : "Virtual account / Transfer manual"}
                  </p>
                </div>
              </div>

              {/* Icon Dropdown Saja */}
              {selectedMethod === "transfer" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="p-2 rounded-full hover:bg-[#FFE5D4]/60 text-[#8C8074] transition-colors cursor-pointer"
                >
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180 text-[#EE6B28]" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>

            {/* List Pilihan Bank Tersembunyi (Muncul saat Icon/Card diklik) */}
            {selectedMethod === "transfer" && isDropdownOpen && (
          <div
            className="pt-2 border-t border-[#EEDFD5] space-y-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            {bankOptions.map((bank) => (
              <button
                key={bank.id}
                type="button"
                onClick={() => {
                  setSelectedBank(bank.id);
                  setIsDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                  selectedBank === bank.id
                    ? "bg-[#FFF2E8] text-[#EE6B28] border border-[#EE6B28]"
                    : "bg-white text-[#1A1513] border border-[#EEDFD5] hover:border-[#EE6B28] hover:bg-[#FFF8F5]"
                }`}
              >
                <span>{bank.name}</span>

                {selectedBank === bank.id && (
                  <svg
                    className="w-4 h-4 text-[#EE6B28]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}

        {selectedMethod === "transfer" && selectedBankObj && !isDropdownOpen && (
          <div className="pt-3 border-t border-[#EEDFD5] space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-wider uppercase text-[#8C8074]">
                  Nomor Virtual Account
                </p>
                <p className="text-base font-extrabold text-[#1A1513] tracking-wide">
                  {selectedBankObj.va}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(selectedBankObj.va)
                }
                className="cursor-pointer rounded-full border border-[#EEDFD5] bg-white px-3.5 py-2 text-[11px] font-bold text-[#EE6B28] hover:bg-[#FFF8F5]"
              >
                Salin
              </button>
            </div>

            <p className="text-[11px] text-[#8C8074]">
              Pembayaran melalui {selectedBankObj.name}
            </p>
          </div>
        )}

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