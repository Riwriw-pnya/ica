"use client";

import { useEffect, useState } from "react";

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

interface StoreOrderDetailDesktopProps {
  order: OrderDetailData;
  onBack: () => void;
  formatRupiah: (val: number) => string;
}

export default function StoreOrderDetailDesktop({
  order,
  onBack,
  formatRupiah,
}: StoreOrderDetailDesktopProps) {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D96B27] hover:underline cursor-pointer"
      >
        <svg
          className="w-4 h-4 stroke-[2.5]"
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

        <span>Kembali ke store</span>
      </button>

      <div>
        <h1 className="font-display text-[22px] font-bold tracking-tight text-[#1F1B18]">
          Detail Pesanan
        </h1>

        <p className="mt-1 text-[12px] text-[#857B72]">
          Informasi pesanan dan status pengiriman Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-4">
          {/* STATUS & TOTAL */}
          <div className="bg-white rounded-2xl p-5 border border-[#EEDFD5] shadow-2xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] text-[#857B72] mb-1">
                  Nomor Pesanan
                </p>

                <h2 className="text-sm font-bold text-[#1F1B18]">
                  {order.orderId}
                </h2>

                <p className="text-[11px] text-[#857B72] mt-1">
                  {order.orderDate}
                </p>
              </div>

              <span className="inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#FFF2E8] text-[#D96B27]">
                Diproses
              </span>
            </div>

            <div className="pt-3 border-t border-[#EEDFD5]">
              <p className="text-xs font-semibold text-[#1F1B18]">
                {order.itemsSummary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="rounded-xl bg-[#FAF7F5] border border-[#EEDFD5] p-3">
                <p className="text-[10px] text-[#857B72]">
                  Metode Bayar
                </p>

                <p className="text-xs font-bold text-[#1F1B18] mt-1">
                  {order.paymentMethod}
                </p>
              </div>

              <div className="rounded-xl bg-[#FAF7F5] border border-[#EEDFD5] p-3">
                <p className="text-[10px] text-[#857B72]">
                  Total Pembayaran
                </p>

                <p className="text-xs font-extrabold text-[#1F1B18] mt-1">
                  {formatRupiah(order.totalAmount)}
                </p>
              </div>
            </div>
          </div>

          {/* PENGIRIMAN */}
          <div className="bg-white rounded-2xl p-5 border border-[#EEDFD5] shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-[#1F1B18]">
              Pengiriman
            </h2>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-[10px] text-[#857B72] mb-1">
                  Kurir
                </p>

                <p className="text-xs font-bold text-[#1F1B18]">
                  {order.courier}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-[#857B72] mb-1">
                  Nomor Resi
                </p>

                <p className="text-[11px] text-[#857B72]">
                  {order.trackingNumber ||
                    "Terbit setelah paket diserahkan ke kurir"}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EEDFD5]">
              <p className="text-[10px] text-[#857B72] mb-1.5">
                Alamat Pengiriman
              </p>

              <p className="text-xs text-[#1F1B18] leading-relaxed">
                <span className="font-bold">
                  {order.shippingAddress.name}
                </span>{" "}
                · {order.shippingAddress.phone}
                <br />
                {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}
              </p>
            </div>
          </div>

          {/* TIMELINE */}
          <div className="bg-white rounded-2xl p-5 border border-[#EEDFD5] shadow-2xs">
            <h2 className="text-sm font-bold text-[#1F1B18] mb-5">
              Status Pengiriman
            </h2>

            <div className="relative pl-8 space-y-7">
              <div className="absolute left-[10px] top-2 bottom-2 w-0.5 bg-[#EAE5DF]" />

              {/* STEP 1 */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-8 top-0 w-5 h-5 rounded-full bg-[#D96B27] text-white text-[10px] font-bold flex items-center justify-center z-10">
                  1
                </div>

                <div>
                  <p className="text-xs font-bold text-[#1F1B18]">
                    Diproses
                  </p>

                  <p className="text-[10px] text-[#857B72] mt-1">
                    Pembayaran terverifikasi · dikemas sekretariat ICA ·{" "}
                    {order.orderDate} · 10:16
                  </p>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-8 top-0 w-5 h-5 rounded-full bg-[#EAE5DF] text-[#857B72] text-[10px] font-bold flex items-center justify-center z-10">
                  2
                </div>

                <div>
                  <p className="text-xs font-bold text-[#857B72]">
                    Dikirim
                  </p>

                  <p className="text-[10px] text-[#A09387] mt-1">
                    Menunggu
                  </p>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-8 top-0 w-5 h-5 rounded-full bg-[#EAE5DF] text-[#857B72] text-[10px] font-bold flex items-center justify-center z-10">
                  3
                </div>

                <div>
                  <p className="text-xs font-bold text-[#857B72]">
                    Dalam Perjalanan
                  </p>

                  <p className="text-[10px] text-[#A09387] mt-1">
                    Menunggu
                  </p>
                </div>
              </div>

              {/* STEP 4 */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-8 top-0 w-5 h-5 rounded-full bg-[#EAE5DF] text-[#857B72] text-[10px] font-bold flex items-center justify-center z-10">
                  4
                </div>

                <div>
                  <p className="text-xs font-bold text-[#857B72]">
                    Sampai Tujuan
                  </p>

                  <p className="text-[10px] text-[#A09387] mt-1">
                    Menunggu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RINGKASAN */}
        <div className="bg-white rounded-2xl border border-[#EEDFD5] p-5 space-y-4 sticky top-24">
          <h2 className="text-sm font-bold text-[#1F1B18] pb-3 border-b border-[#EEDFD5]">
            Ringkasan Pesanan
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-[#857B72]">
                Nomor Pesanan
              </span>

              <span className="font-semibold text-[#1F1B18] text-right">
                {order.orderId}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[#857B72]">
                Metode Bayar
              </span>

              <span className="font-semibold text-[#1F1B18] text-right">
                {order.paymentMethod}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[#857B72]">
                Kurir
              </span>

              <span className="font-semibold text-[#1F1B18] text-right">
                {order.courier}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#EEDFD5] flex justify-between items-center">
            <span className="text-xs font-bold text-[#1F1B18]">
              Total
            </span>

            <span className="text-base font-extrabold text-[#D96B27]">
              {formatRupiah(order.totalAmount)}
            </span>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="w-full py-3 bg-[#EE6B28] hover:bg-[#C8601D] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Kembali ke Store
          </button>
        </div>
      </div>

      {/* SUCCESS TOAST */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[70] w-[360px]">
          <div className="bg-white rounded-2xl p-3.5 shadow-2xl border border-[#EAE5DF] flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#FFF8F3] text-[#D96B27] border border-[#FADEC9] flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold">
                i
              </span>
            </div>

            <p className="text-xs text-[#1F1B18] leading-snug flex-1">
              Pembayaran berhasil. Pesanan{" "}
              <span className="font-bold">
                {order.orderId}
              </span>{" "}
              sedang diproses sekretariat ICA.
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