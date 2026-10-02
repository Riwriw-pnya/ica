"use client";

import React from "react";

interface EventCheckoutMobileProps {
  secondsLeft: number;
  onBack: () => void;
  onNext: () => void;
}

export default function EventCheckoutMobile({
  secondsLeft,
  onBack,
  onNext,
}: EventCheckoutMobileProps) {
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60)
      .toString()
      .padStart(2, "0");

    const secs = (totalSec % 60).toString().padStart(2, "0");

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
                Checkout Ticket
              </h1>

              <p className="text-[11px] text-[#857B72] mt-0.5">
                ICA Cat Show Bandung 2026
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-6 flex items-center">
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

            <div className="space-y-1.5">
              <h2 className="text-base font-bold text-[#1F1B18]">
                Sesi checkout berakhir
              </h2>

              <p className="text-xs text-[#857B72] leading-relaxed">
                Batas waktu pembayaran telah terlewati. Slot dilepas kembali
                ke kuota kategori Cattery.
              </p>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="w-full cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-3 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)] active:translate-y-0 active:shadow-xs"
            >
              Kembali ke Event
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
              Checkout Ticket
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

            <div className="w-9 h-9 rounded-full bg-[#FFE5D4] text-[#EE6B28] flex items-center justify-center shrink-0">
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

                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  strokeWidth="2"
                />
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

          <p className="text-[10px] text-[#857B72] mt-2 leading-relaxed">
            Selesaikan pembayaran sebelum waktu habis agar slot tetap
            ditahan untuk Anda.
          </p>
        </div>

        <div className="rounded-2xl border border-[#EAE5DF] bg-white p-4 shadow-xs space-y-4">
          <div>
            <p className="text-[9px] font-bold tracking-wider text-[#A09387] uppercase">
              Detail event
            </p>

            <h2 className="text-sm font-bold text-[#1F1B18] mt-1">
              ICA Cat Show Bandung 2026
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start justify-between gap-4">
              <span className="text-[#857B72]">Tanggal</span>

              <span className="font-semibold text-[#1F1B18] text-right">
                18–19 Okt 2026
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-[#857B72]">Lokasi</span>

              <span className="font-semibold text-[#1F1B18] text-right">
                Trans Convention Center, Bandung
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-[#857B72]">Kategori</span>

              <span className="font-semibold text-[#1F1B18] text-right">
                Cattery · Rumah Hana Cattery
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-[#857B72]">Sisa slot</span>

              <span className="font-semibold text-[#1F1B18] text-right">
                2 slot tersisa
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#EAE5DF] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold text-[#574D45]">
              Total pembayaran
            </span>

            <span className="text-base font-bold text-[#F05A1B]">
              Rp 150.000
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#FCE3D2] bg-[#FFF8F5] p-4">
          <p className="text-[10px] text-[#857B72] leading-relaxed">
            Data kucing yang diikutkan diisi setelah pembayaran berhasil,
            sehingga slot tidak perlu ditahan lebih lama selama proses
            pengisian data.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-[#F7F5F0] border-t border-[#EAE5DF]/70 px-5 pt-3 pb-3">
        <button
          type="button"
          onClick={onNext}
          className="w-full cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-3.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)] active:translate-y-0 active:shadow-xs"
        >
          Lanjut ke pembayaran
        </button>
      </div>
    </div>
  );
}