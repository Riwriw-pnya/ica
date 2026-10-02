"use client";

import React, { useEffect, useState } from "react";

interface EventPaymentMobileProps {
  secondsLeft: number;
  setSecondsLeft: React.Dispatch<React.SetStateAction<number>>;
  onBack: () => void;
  onNext: () => void;
}

export default function EventPaymentMobile({
  secondsLeft,
  setSecondsLeft,
  onBack,
  onNext,
}: EventPaymentMobileProps) {
  const [selectedMethod, setSelectedMethod] = useState("qris");
  const [selectedBank, setSelectedBank] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const bankOptions = [
    { id: "bca", name: "BCA" },
    { id: "mandiri", name: "Bank Mandiri" },
    { id: "bni", name: "BNI" },
    { id: "bri", name: "BRI" },
    { id: "btn", name: "BTN" },
    { id: "bsi", name: "Bank Syariah Indonesia" },
    { id: "cimb", name: "CIMB Niaga" },
    { id: "danamon", name: "Danamon" },
    { id: "permata", name: "PermataBank" },
    { id: "ocbc", name: "OCBC" },
    { id: "uob", name: "UOB Indonesia" },
    { id: "maybank", name: "Maybank Indonesia" },
    { id: "mega", name: "Bank Mega" },
    { id: "panin", name: "PaninBank" },
    { id: "btpn", name: "Bank SMBC Indonesia" },
  ];

  const selectedBankObj = bankOptions.find(
    (bank) => bank.id === selectedBank
  );

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, setSecondsLeft]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60)
      .toString()
      .padStart(2, "0");

    const secs = (totalSec % 60)
      .toString()
      .padStart(2, "0");

    return `${mins}:${secs}`;
  };

  if (secondsLeft <= 0) {
    return (
      <div className="fixed inset-0 bottom-[56px] z-50 bg-[#F7F5F0] flex flex-col">
        <div className="shrink-0 px-5 pt-10 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="text-[#D96B27] active:opacity-60 cursor-pointer"
            >
              <svg
                className="w-5 h-5 stroke-[2.5]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div>
              <h1 className="text-base font-bold text-[#1F1B18]">
                Payment
              </h1>

              <p className="text-[11px] text-[#857B72] mt-0.5">
                ICA Cat Show Bandung 2026
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-5 flex items-center">
          <div className="w-full rounded-2xl border border-[#EAE5DF] bg-white p-6 text-center shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#1F1B18]">
                Waktu pembayaran habis
              </h2>

              <p className="text-xs text-[#857B72] leading-relaxed mt-1.5">
                Sesi pembayaran telah berakhir dan slot tidak lagi ditahan.
              </p>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="w-full cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-3 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)] active:translate-y-0 active:shadow-xs"
            >
              Kembali ke Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bottom-[56px] z-50 bg-[#F7F5F0] flex flex-col">
      <div className="shrink-0 bg-[#F7F5F0] px-5 pt-10 pb-3">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={onBack}
            className="text-[#D96B27] active:opacity-60 cursor-pointer shrink-0"
          >
            <svg
              className="w-5 h-5 stroke-[2.5]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="min-w-0">
            <h1 className="text-base font-bold text-[#1F1B18] leading-tight">
              Payment
            </h1>

            <p className="text-[11px] text-[#857B72] mt-0.5">
              ICA Cat Show Bandung 2026
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-28 space-y-3 scrollbar-none">
        <div className="rounded-2xl border border-[#FADEC9] bg-[#FFF8F2] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[9px] font-bold tracking-wider text-[#A09387] uppercase">
                Sisa waktu pembayaran
              </p>

              <p className="text-3xl font-extrabold text-[#F05A1B] font-mono leading-tight mt-0.5">
                {formatTime(secondsLeft)}
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-[#FFE5D4] text-[#EE6B28] flex items-center justify-center">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M12 6v6l4 2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle cx="12" cy="12" r="9" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div className="mt-3 w-full h-1.5 rounded-full bg-[#F3EAE1] overflow-hidden">
            <div
              className="h-full bg-[#F05A1B] transition-all duration-1000"
              style={{
                width: `${Math.max(
                  0,
                  Math.min(100, (secondsLeft / 600) * 100)
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-[#EAE5DF] bg-white p-4 shadow-xs">
          <p className="text-[9px] font-bold tracking-wider text-[#A09387] uppercase">
            Ringkasan tiket
          </p>

          <div className="flex items-start justify-between gap-4 mt-1.5">
            <div>
              <h2 className="text-sm font-bold text-[#1F1B18]">
                ICA Cat Show Bandung 2026
              </h2>

              <p className="text-[10px] text-[#857B72] mt-1">
                1 slot kategori Cattery
              </p>
            </div>

            <span className="text-sm font-bold text-[#F05A1B] whitespace-nowrap">
              Rp 150.000
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#EAE5DF] bg-white p-4 shadow-xs space-y-3">
          <label className="block text-xs font-bold text-[#574D45]">
            Metode pembayaran
          </label>

          <div
            onClick={() => {
              setSelectedMethod("qris");
              setIsDropdownOpen(false);
            }}
            className={`rounded-xl border p-3.5 cursor-pointer transition-all ${
              selectedMethod === "qris"
                ? "border-[#EE6B28] bg-[#FFF8F5]"
                : "border-[#EEDFD5] bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="mobile-payment"
                checked={selectedMethod === "qris"}
                onChange={() => {
                  setSelectedMethod("qris");
                  setIsDropdownOpen(false);
                }}
                className="accent-[#EE6B28]"
              />

              <div>
                <p className="font-bold text-xs text-[#1A1513]">
                  QRIS
                </p>

                <p className="text-[10px] text-[#8C8074] mt-0.5">
                  Scan sekali bayar · verifikasi otomatis
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedMethod("transfer");

              if (!selectedBank) {
                setIsDropdownOpen(true);
              }
            }}
            className={`rounded-xl border p-3.5 cursor-pointer transition-all ${
              selectedMethod === "transfer"
                ? "border-[#EE6B28] bg-[#FFF8F5]"
                : "border-[#EEDFD5] bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <input
                  type="radio"
                  name="mobile-payment"
                  checked={selectedMethod === "transfer"}
                  onChange={() => {
                    setSelectedMethod("transfer");
                    setIsDropdownOpen(true);
                  }}
                  className="accent-[#EE6B28]"
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-xs text-[#1A1513]">
                      Transfer Bank
                    </p>

                    {selectedBankObj && (
                      <span className="text-[9px] font-bold text-[#EE6B28] bg-[#FFE5D4] px-2 py-0.5 rounded-full">
                        {selectedBankObj.name}
                      </span>
                    )}
                  </div>

                  <p className="text-[10px] text-[#8C8074] mt-0.5">
                    {selectedBankObj
                      ? "Virtual Account aktif"
                      : "Virtual account / Transfer manual"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  if (selectedMethod !== "transfer") {
                    setSelectedMethod("transfer");
                    setIsDropdownOpen(true);
                    return;
                  }

                  setIsDropdownOpen((prev) => !prev);
                }}
                className="p-1.5 rounded-full hover:bg-[#FFE5D4]/60 text-[#8C8074] transition-colors cursor-pointer shrink-0"
              >
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180 text-[#EE6B28]" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {selectedMethod === "transfer" && isDropdownOpen && (
              <div
                className="pt-3 mt-3 border-t border-[#EEDFD5] space-y-1.5"
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
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[11px] font-semibold text-left transition ${
                      selectedBank === bank.id
                        ? "bg-[#FFF2E8] text-[#EE6B28] border border-[#EE6B28]"
                        : "bg-white text-[#1A1513] border border-[#EEDFD5]"
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
          </div>
        </div>

        <div className="rounded-2xl border border-[#EAE5DF] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1F1B18]">
              Total bayar
            </span>

            <span className="text-base font-bold text-[#F05A1B]">
              Rp 150.000
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#FCE3D2] bg-[#FFF8F5] p-4">
          <p className="text-[10px] text-[#857B72] leading-relaxed">
            Pembayaran akan diverifikasi otomatis setelah transaksi
            berhasil. Pastikan Anda menyelesaikan pembayaran sebelum timer
            berakhir.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-[#F7F5F0] border-t border-[#EAE5DF]/70 px-5 pt-3 pb-3">
        <button
          type="button"
          onClick={onNext}
          className="w-full cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-3.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)] active:translate-y-0 active:shadow-xs"
        >
          Bayar sekarang
        </button>
      </div>
    </div>
  );
}