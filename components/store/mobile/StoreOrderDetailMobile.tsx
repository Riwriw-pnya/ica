"use client";

import React, { useState, useEffect } from "react";

export interface OrderDetailData {
  orderId: string;
  orderDate: string;
  itemsSummary: string;
  paymentMethod: string;
  totalAmount: number;
  courier: string;
  trackingNumber?: string;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
}

interface StoreOrderDetailMobileProps {
  order: OrderDetailData;
  onBack: () => void;
  formatRupiah: (val: number) => string;
}

export default function StoreOrderDetailMobile({
  order,
  onBack,
  formatRupiah,
}: StoreOrderDetailMobileProps) {
  const [slideIn, setSlideIn] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setSlideIn(true), 20);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    setSlideIn(false);
    setTimeout(() => {
      onBack();
    }, 280);
  };

  return (
    <div
      /* Menggunakan z-[60] agar menutupi seluruh layar dan Bottom Navigation */
      className={`fixed inset-0 z-[60] flex flex-col bg-[#F7F5F0] font-sans transition-transform duration-300 ease-out ${
        slideIn ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* 1. HEADER DETAIL PESANAN */}
      <div
        className="shrink-0 sticky top-0 z-30 bg-[#F7F5F0] px-4 pb-4 border-b border-[#EAE5DF]/60 shadow-2xs"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 28px)",
        }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="text-[#D96B27] active:opacity-60 cursor-pointer p-2 -ml-1.5 rounded-full hover:bg-[#EAE5DF]/50 transition-colors"
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
            <h1 className="text-base font-bold text-[#1F1B18] leading-tight">
              {order.orderId}
            </h1>
            <p className="text-xs text-[#857B72] mt-0.5">{order.orderDate}</p>
          </div>
        </div>
      </div>

      {/* 2. AREA KONTEN SCROLLABLE */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-32 scrollbar-none">
        {/* KARTU 1: STATUS PESANAN & TOTAL */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3">
          <div>
            <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#FFF2E8] text-[#D96B27]">
              Diproses
            </span>
          </div>

          <p className="text-xs font-semibold text-[#1F1B18]">
            {order.itemsSummary}
          </p>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-[#EAE5DF]/60">
            <span className="text-[#857B72]">Metode bayar</span>
            <span className="font-bold text-[#1F1B18]">
              {order.paymentMethod}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-[#EAE5DF]/60">
            <span className="text-[#857B72]">Total</span>
            <span className="font-extrabold text-[#1F1B18]">
              {formatRupiah(order.totalAmount)}
            </span>
          </div>
        </div>

        {/* KARTU 2: DETAIL PENGIRIMAN */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-2.5">
          <h2 className="text-xs font-bold text-[#1F1B18]">Pengiriman</h2>

          <div className="flex justify-between items-start text-xs pb-2 border-b border-[#EAE5DF]/60">
            <span className="text-[#857B72]">Kurir</span>
            <span className="font-bold text-[#1F1B18] text-right">
              {order.courier}
            </span>
          </div>

          <div className="flex justify-between items-start text-xs pb-2 border-b border-[#EAE5DF]/60">
            <span className="text-[#857B72]">Nomor resi</span>
            <span className="text-[11px] text-[#857B72] text-right">
              {order.trackingNumber ||
                "Terbit setelah paket diserahkan ke kurir"}
            </span>
          </div>

          <div className="space-y-1 text-xs pt-1">
            <span className="text-[#857B72] block">Alamat pengiriman</span>
            <p className="text-[#1F1B18] leading-relaxed">
              {order.shippingAddress.name} · {order.shippingAddress.phone} ·{" "}
              {order.shippingAddress.address}, {order.shippingAddress.city}
            </p>
          </div>
        </div>

        {/* KARTU 3: STATUS PENGIRIMAN (TIMELINE) */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-4">
          <h2 className="text-xs font-bold text-[#1F1B18]">Status pengiriman</h2>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EAE5DF]">
            {/* Step 1: Diproses */}
            <div className="relative flex items-start gap-3">
              <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-[#D96B27] text-white text-[10px] font-bold flex items-center justify-center z-10">
                1
              </div>
              <div>
                <p className="text-xs font-bold text-[#1F1B18]">Diproses</p>
                <p className="text-[10px] text-[#857B72] mt-0.5">
                  Pembayaran terverifikasi · dikemas sekretariat ICA ·{" "}
                  {order.orderDate} · 10:16
                </p>
              </div>
            </div>

            {/* Step 2: Dikirim */}
            <div className="relative flex items-start gap-3">
              <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-[#EAE5DF] text-[#857B72] text-[10px] font-bold flex items-center justify-center z-10">
                2
              </div>
              <div>
                <p className="text-xs font-bold text-[#857B72]">Dikirim</p>
                <p className="text-[10px] text-[#A09387] mt-0.5">Menunggu</p>
              </div>
            </div>

            {/* Step 3: Dalam Perjalanan */}
            <div className="relative flex items-start gap-3">
              <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-[#EAE5DF] text-[#857B72] text-[10px] font-bold flex items-center justify-center z-10">
                3
              </div>
              <div>
                <p className="text-xs font-bold text-[#857B72]">
                  Dalam Perjalanan
                </p>
                <p className="text-[10px] text-[#A09387] mt-0.5">Menunggu</p>
              </div>
            </div>

            {/* Step 4: Sampai Tujuan */}
            <div className="relative flex items-start gap-3">
              <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-[#EAE5DF] text-[#857B72] text-[10px] font-bold flex items-center justify-center z-10">
                4
              </div>
              <div>
                <p className="text-xs font-bold text-[#857B72]">Sampai Tujuan</p>
                <p className="text-[10px] text-[#A09387] mt-0.5">Menunggu</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TOAST POP-UP NOTIFIKASI SUKSES PEMBAYARAN */}
      {showToast && (
        <div className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-4 right-4 z-[70] transition-all duration-300 ease-out">
          <div className="bg-white rounded-2xl p-3.5 shadow-2xl border border-[#EAE5DF] flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#FFF8F3] text-[#D96B27] border border-[#FADEC9] flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold">i</span>
            </div>
            <p className="text-xs text-[#1F1B18] leading-snug flex-1">
              Pembayaran berhasil. Pesanan{" "}
              <span className="font-bold">{order.orderId}</span> sedang diproses
              sekretariat ICA.
            </p>
            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="text-[#857B72] hover:text-[#1F1B18] p-1 text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}