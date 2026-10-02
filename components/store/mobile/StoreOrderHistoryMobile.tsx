"use client";

import React, { useState, useEffect } from "react";

interface StoreOrderHistoryMobileProps {
  onClose: () => void;
  formatRupiah: (val: number) => string;
}

export default function StoreOrderHistoryMobile({
  onClose,
  formatRupiah,
}: StoreOrderHistoryMobileProps) {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlideIn(true), 20);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    setSlideIn(false);
    setTimeout(() => {
      onClose();
    }, 280);
  };

  const mockOrders = [
    {
      id: "MRC-2026-0231",
      itemSummary: "Kaos ICA Official 2026 (L) · 1 barang",
      price: 205000,
      status: "Dikemas sekretariat",
      statusColor: "bg-[#FFF2E8] text-[#D96B27]",
      date: "05 Sep 2026",
    },
    {
      id: "MRC-2026-0198",
      itemSummary:
        "Tote Bag Kanvas ICA (Natural) · Pin Enamel Paw ICA · 2 barang",
      price: 150000,
      status: "Diterima",
      statusColor: "bg-[#E8F5E9] text-[#2E7D32]",
      date: "21 Agu 2026",
    },
    {
      id: "MRC-2026-0154",
      itemSummary: "Buku Panduan Breeding & Pedigree (Cetak + PDF) · 1 barang",
      price: 140000,
      status: "Dibatalkan",
      statusColor: "bg-gray-100 text-gray-600",
      date: "02 Jul 2026",
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-[#F7F5F0] font-sans transition-transform duration-300 ease-out ${
        slideIn ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="shrink-0 flex items-center gap-3 bg-[#F7F5F0] px-4 pb-3 border-b border-[#EAE5DF]/60 z-20"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)" }}
      >
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center text-[#D96B27] p-1 -ml-1 active:opacity-60 cursor-pointer"
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
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-[#1F1B18] leading-tight">
            Riwayat pemesanan
          </h2>
          <p className="text-[11px] text-[#857B72]">Pesanan produk Store ICA</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-28 space-y-3">
        {mockOrders.map((ord) => (
          <div
            key={ord.id}
            className="rounded-2xl border border-[#EAE5DF] bg-white p-4 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F8F6F2] text-[#857B72]">
                  <svg
                    className="w-5 h-5 stroke-[1.5]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1F1B18]">{ord.id}</h3>
                  <p className="mt-0.5 text-[11px] text-[#857B72] line-clamp-2">
                    {ord.itemSummary}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#1F1B18] shrink-0">
                {formatRupiah(ord.price)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#F4EFEA]">
              <span
                className={`inline-block rounded-md px-2.5 py-0.5 text-[10px] font-semibold ${ord.statusColor}`}
              >
                {ord.status}
              </span>
              <span className="text-[10px] text-[#857B72]">{ord.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}