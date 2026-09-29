"use client";

import React, { useState, useEffect } from "react";
import { CartItem } from "./StoreCartMobile";

interface StorePaymentMobileProps {
  cartItems: CartItem[];
  totalPayable: number;
  courierName: string;
  courierPrice: number;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  onBack: () => void;
  formatRupiah: (val: number) => string;
  onSuccessPayment: () => void;
}

export default function StorePaymentMobile({
  cartItems,
  totalPayable,
  courierName,
  courierPrice,
  shippingAddress,
  onBack,
  formatRupiah,
  onSuccessPayment,
}: StorePaymentMobileProps) {
  const [slideIn, setSlideIn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"qris" | "va" | "ewallet" | "kartu">("qris");

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

  const subtotalProducts = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-[#F7F5F0] font-sans transition-transform duration-300 ease-out ${
        slideIn ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* 1. HEADER PEMBAYARAN LEGA & AMAN NOTCH */}
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
              Pembayaran
            </h1>
            <p className="text-xs text-[#857B72] mt-0.5">
              Langkah 2 dari 2 · Bayar sebelum 26 Sep 2026, 10:14
            </p>
          </div>
        </div>
      </div>

      {/* 2. KONTEN AREA PEMBAYARAN (SCROLLABLE) */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-44 scrollbar-none">
        {/* KARTU METODE PEMBAYARAN */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-4">
          <h2 className="text-xs font-bold text-[#1F1B18]">Metode pembayaran</h2>

          {/* TAB PILIHAN METODE */}
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("qris")}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "qris"
                  ? "bg-[#FFF2E8] text-[#D96B27] border-2 border-[#D96B27]"
                  : "bg-white text-[#857B72] border border-[#EAE5DF]"
              }`}
            >
              QRIS
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("va")}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "va"
                  ? "bg-[#FFF2E8] text-[#D96B27] border-2 border-[#D96B27]"
                  : "bg-white text-[#857B72] border border-[#EAE5DF]"
              }`}
            >
              VA
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ewallet")}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "ewallet"
                  ? "bg-[#FFF2E8] text-[#D96B27] border-2 border-[#D96B27]"
                  : "bg-white text-[#857B72] border border-[#EAE5DF]"
              }`}
            >
              E-wallet
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("kartu")}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "kartu"
                  ? "bg-[#FFF2E8] text-[#D96B27] border-2 border-[#D96B27]"
                  : "bg-white text-[#857B72] border border-[#EAE5DF]"
              }`}
            >
              Kartu
            </button>
          </div>

          {/* TAMPILAN DETAIL SETIAP TAB METODE */}
          {activeTab === "qris" && (
            <div className="rounded-2xl border border-[#EAE5DF] p-5 bg-[#FAF8F5] flex flex-col items-center text-center space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F1B18]">
                <span>QRIS</span>
                <span className="text-[10px] text-[#857B72] font-medium">· ICA STORE</span>
              </div>

              {/* BOX QR CODE */}
              <div className="w-48 h-48 bg-white border border-[#EAE5DF] rounded-2xl flex items-center justify-center p-2 shadow-2xs">
                {/* Visual Barcode QRIS */}
                <div className="w-full h-full bg-[#F4EFEA] rounded-xl flex flex-col items-center justify-center text-[#857B72] gap-1">
                  <svg className="w-12 h-12 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <span className="text-[10px] font-semibold">QR Code</span>
                </div>
              </div>

              <span className="text-[10px] font-bold tracking-wider text-[#857B72]">
                NMID ID1026354789012
              </span>

              <p className="text-[11px] text-[#857B72] leading-relaxed max-w-xs">
                Scan dengan aplikasi m-banking atau e-wallet yang mendukung QRIS. Status pesanan berubah otomatis setelah pembayaran diterima.
              </p>
            </div>
          )}

          {activeTab !== "qris" && (
            <div className="rounded-2xl border border-[#EAE5DF] p-6 bg-[#FAF8F5] text-center space-y-2">
              <p className="text-xs font-bold text-[#1F1B18]">
                Metode {activeTab.toUpperCase()} Dipilih
              </p>
              <p className="text-[11px] text-[#857B72]">
                Petunjuk instruksi pembayaran via {activeTab.toUpperCase()} akan ditampilkan di sini.
              </p>
            </div>
          )}
        </div>

        {/* KARTU DIKIRIM KE */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-1.5">
          <h2 className="text-xs font-bold text-[#1F1B18]">Dikirim ke</h2>
          <p className="text-xs font-medium text-[#554E48] leading-relaxed">
            {shippingAddress.name} · {shippingAddress.phone} · {shippingAddress.address}, {shippingAddress.city}
          </p>
          <p className="text-[11px] text-[#857B72] pt-0.5">
            {courierName}
          </p>
        </div>

        {/* KARTU RINGKASAN PESANAN */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3">
          <h2 className="text-xs font-bold text-[#1F1B18]">Ringkasan pesanan</h2>

          <div className="space-y-2.5 border-b border-[#EAE5DF]/60 pb-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-[#1F1B18]">{item.title}</p>
                  <p className="text-[10px] text-[#857B72]">
                    {item.variant.replace("Warna: ", "").replace("Ukuran: ", "")} ·{" "}
                    {item.quantity} x {formatRupiah(item.price)}
                  </p>
                </div>
                <p className="font-bold text-[#1F1B18]">
                  {formatRupiah(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-[#857B72]">
              <span>Subtotal produk</span>
              <span className="font-semibold text-[#1F1B18]">
                {formatRupiah(subtotalProducts)}
              </span>
            </div>
            <div className="flex justify-between text-[#857B72]">
              <span>Ongkir · {courierName.split("·")[0] || "Kurir"}</span>
              <span className="font-semibold text-[#1F1B18]">
                {formatRupiah(courierPrice)}
              </span>
            </div>
            <div className="flex justify-between font-extrabold text-[#1F1B18] pt-2 border-t border-[#EAE5DF]/60">
              <span>Total bayar</span>
              <span className="text-sm">{formatRupiah(totalPayable)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FIXED BOTTOM BUTTON BAYAR */}
      <div
        className="fixed bottom-[64px] left-0 right-0 z-40 px-5 py-3.5 bg-[#F7F5F0]/90 backdrop-blur-md border-t border-[#EAE5DF]/60 space-y-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#857B72]">Total bayar</p>
          <p className="text-base font-extrabold text-[#1F1B18]">
            {formatRupiah(totalPayable)}
          </p>
        </div>

        <button
          type="button"
          onClick={onSuccessPayment}
          className="w-full py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FFA26B] via-[#EE6B28] to-[#E35610] shadow-[0_4px_12px_rgba(238,107,40,0.25)] active:scale-98 transition-transform"
        >
          Bayar {formatRupiah(totalPayable)}
        </button>
      </div>
    </div>
  );
}