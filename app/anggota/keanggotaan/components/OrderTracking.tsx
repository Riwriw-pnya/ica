"use client";

import React from "react";

const orderSteps = [
  {
    id: 1,
    title: "Pesanan dibuat",
    desc: "05 Sep 2026, 10:22 · MRC-2026-0231",
    status: "completed",
  },
  {
    id: 2,
    title: "Pembayaran terverifikasi",
    desc: "05 Sep 2026, 11:40 · Virtual Account",
    status: "completed",
  },
  {
    id: 3,
    title: "Dikemas sekretariat ICA",
    desc: "Sedang berjalan · estimasi 1x24 jam kerja",
    status: "active",
  },
  {
    id: 4,
    title: "Dikirim",
    desc: "Nomor resi tampil di sini setelah paket diserahkan ke kurir",
    status: "pending",
  },
  {
    id: 5,
    title: "Diterima",
    desc: "Konfirmasi penerimaan oleh Anda",
    status: "pending",
  },
];

interface OrderTrackingSectionProps {
  onTrackOrder: () => void;
}

export default function OrderTrackingSection({
  onTrackOrder,
}: OrderTrackingSectionProps) {
  const currentStepIndex = orderSteps.findIndex(
    (step) => step.status === "active"
  );

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--color-ink-100,#eadecd)] bg-white p-6 shadow-sm">
      {/* Header Baris Utama */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-base font-bold text-[var(--color-ink-900,#1a1513)]">
            Pesanan merchandise · MRC-2026-0231
          </h2>

          <p className="mt-0.5 text-xs text-[var(--color-ink-700,#544940)]">
            Kaos ICA Official 2026 (L, 1 pcs) · Rp 185.000
          </p>

          <p className="mt-0.5 text-[11px] text-[var(--color-ink-400,#8c8074)]">
            Dibuat 05 Sep 2026, 10:22 · pengiriman ke Bandung
          </p>
        </div>

        {/* Tombol Lacak Pesanan */}
        <button
          type="button"
          onClick={onTrackOrder}
          className="self-start cursor-pointer rounded-full border border-[var(--color-ink-200,#d9cfc1)] bg-white px-4 py-1.5 text-xs font-semibold text-[var(--color-ink-900,#1a1513)] transition-colors hover:bg-[var(--color-ink-50,#f7f5f0)] active:scale-[0.98]"
        >
          Lacak pesanan
        </button>
      </div>

      {/* Divider */}
      <div className="my-5 h-px w-full bg-[var(--color-ink-100,#eadecd)]" />

      {/* Timeline Status Pesanan */}
      <div className="relative pl-9">
        {/* Base Line */}
        <div className="absolute bottom-3 left-[12px] top-3 w-[3px] rounded-full bg-[#EEE7E2] shadow-[inset_1px_1px_2px_rgba(120,100,90,0.12),inset_-1px_-1px_2px_rgba(255,255,255,0.9)]" />

        {/* Progress Line */}
        {currentStepIndex > 0 && (
          <div
            className="absolute left-[12px] top-3 w-[3px] rounded-full bg-[#EE6B28] shadow-[1px_1px_3px_rgba(180,80,25,0.25),-1px_-1px_2px_rgba(255,255,255,0.6)] transition-all duration-500"
            style={{
              height: `calc(${
                (currentStepIndex / (orderSteps.length - 1)) * 100
              }% - 6px)`,
            }}
          />
        )}

        <div className="space-y-8">
          {orderSteps.map((step, index) => {
            const isCompleted =
              index < currentStepIndex || step.status === "completed";

            const isCurrent = step.status === "active";

            return (
              <div
                key={step.id}
                className="relative flex items-start gap-4"
              >
                {/* Polymorphic Circle */}
                <div
                  className={`absolute -left-[36px] top-0 flex h-6 w-6 items-center justify-center rounded-full ${
                    isCompleted || isCurrent
                      ? "bg-[#EE6B28] text-white shadow-[3px_3px_7px_rgba(194,91,35,0.28),-2px_-2px_5px_rgba(255,255,255,0.9)]"
                      : "bg-[#F7F3F0] text-[#A99B92] shadow-[3px_3px_6px_rgba(150,135,125,0.16),-2px_-2px_5px_rgba(255,255,255,0.95)]"
                  }`}
                >
                  {/* Inner Highlight */}
                  <div
                    className={`absolute inset-[3px] rounded-full ${
                      isCompleted || isCurrent
                        ? "bg-gradient-to-br from-[#FFB47D] via-[#EE6B28] to-[#D45F20]"
                        : "bg-gradient-to-br from-white via-[#F7F3F0] to-[#EAE3DE]"
                    }`}
                  />

                  <span className="relative z-10 text-[9px] font-extrabold">
                    {isCompleted ? "✓" : index + 1}
                  </span>
                </div>

                {/* Detail Timeline */}
                <div className="min-w-0 flex-1 pt-0.5">
                  <h4
                    className={`text-xs font-bold leading-tight ${
                      isCompleted || isCurrent
                        ? "text-[var(--color-ink-900,#1a1513)]"
                        : "text-[var(--color-ink-400,#8c8074)]"
                    }`}
                  >
                    {step.title}
                  </h4>

                  <p
                    className={`mt-0.5 text-[11px] leading-relaxed ${
                      isCurrent
                        ? "font-medium text-[var(--color-brand-orange-600,#e06c16)]"
                        : "text-[var(--color-ink-500,#7e7267)]"
                    }`}
                  >
                    {step.desc}
                  </p>

                  {/* Status Saat Ini */}
                  {isCurrent && (
                    <div className="mt-2 inline-flex items-center rounded-full border border-[#F7D4BE] bg-[#FFF7F1] px-2 py-0.5 shadow-[inset_1px_1px_2px_rgba(210,120,70,0.08),1px_1px_3px_rgba(180,100,60,0.08)]">
                      <span className="text-[9px] font-bold text-[#D96B27]">
                        Status saat ini
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Catatan Kaki */}
      <p className="mt-8 text-[11px] italic text-[var(--color-ink-400,#8c8074)]">
        Timeline pesanan bersifat informasi (read-only) — perubahan status
        dilakukan sekretariat ICA.
      </p>
    </section>
  );
}