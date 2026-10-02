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
  status: "Diproses" | "Dikirim" | "Dalam Perjalanan" | "Sampai Tujuan";
  productImage?: string;
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
  backLabel?: string;
}

export default function StoreOrderDetailDesktop({
  order,
  onBack,
  formatRupiah,
  backLabel = "Kembali ke Store",
}: StoreOrderDetailDesktopProps) {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [order.orderId]);

  const statusOrder: OrderDetailData["status"][] = [
    "Diproses",
    "Dikirim",
    "Dalam Perjalanan",
    "Sampai Tujuan",
  ];

  const currentStatusIndex = statusOrder.indexOf(order.status);

  const getStatusStyle = () => {
    switch (order.status) {
      case "Sampai Tujuan":
        return "bg-[#EAF7EE] text-[#31834A]";
      case "Dikirim":
      case "Dalam Perjalanan":
        return "bg-[#FFF2E8] text-[#D96B27]";
      default:
        return "bg-[#F3F0EE] text-[#756962]";
    }
  };

  const getShippingTitle = () => {
    switch (order.status) {
      case "Diproses":
        return "Pesanan sedang diproses";
      case "Dikirim":
        return "Pesanan telah dikirim";
      case "Dalam Perjalanan":
        return "Pesanan sedang dalam perjalanan";
      case "Sampai Tujuan":
        return "Pesanan telah sampai";
      default:
        return "Status pengiriman";
    }
  };

  const getShippingDescription = () => {
    switch (order.status) {
      case "Diproses":
        return "Pesanan sedang disiapkan dan belum diserahkan kepada kurir.";
      case "Dikirim":
        return "Pesanan telah diserahkan kepada kurir dan siap dikirim ke alamat tujuan.";
      case "Dalam Perjalanan":
        return "Pesanan sedang dalam perjalanan menuju alamat tujuan.";
      case "Sampai Tujuan":
        return "Pesanan telah diterima di alamat tujuan. Pengiriman selesai.";
      default:
        return "";
    }
  };

  const getToastMessage = () => {
    switch (order.status) {
      case "Diproses":
        return (
          <>
            Pesanan{" "}
            <span className="font-bold">{order.orderId}</span>{" "}
            sedang diproses sekretariat ICA.
          </>
        );
      case "Dikirim":
        return (
          <>
            Pesanan{" "}
            <span className="font-bold">{order.orderId}</span>{" "}
            telah diserahkan kepada kurir.
          </>
        );
      case "Dalam Perjalanan":
        return (
          <>
            Pesanan{" "}
            <span className="font-bold">{order.orderId}</span>{" "}
            sedang dalam perjalanan menuju alamat tujuan.
          </>
        );
      case "Sampai Tujuan":
        return (
          <>
            Pesanan{" "}
            <span className="font-bold">{order.orderId}</span>{" "}
            telah sampai dan diterima di alamat tujuan.
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-[#D96B27] hover:underline"
      >
        <svg
          className="h-4 w-4 stroke-[2.5]"
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

        <span>{backLabel}</span>
      </button>

      <div>
        <h1 className="font-display text-[22px] font-bold tracking-tight text-[#1F1B18]">
          Detail Pesanan
        </h1>

        <p className="mt-1 text-[12px] text-[#857B72]">
          Informasi pesanan dan status pengiriman Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* STATUS & TOTAL */}
          <div className="space-y-4 rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-2xs">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-1 text-[11px] text-[#857B72]">
                  Nomor Pesanan
                </p>

                <h2 className="text-sm font-bold text-[#1F1B18]">
                  {order.orderId}
                </h2>

                <p className="mt-1 text-[11px] text-[#857B72]">
                  {order.orderDate}
                </p>
              </div>

              <span
                className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold ${getStatusStyle()}`}
              >
                {order.status}
              </span>
            </div>

            <div className="border-t border-[#EEDFD5] pt-3">
              <div className="flex items-start gap-4">
                {order.productImage && (
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#EEDFD5] bg-[#FAF7F5]">
                    <img
                      src={order.productImage}
                      alt={order.itemsSummary}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <p className="pt-1 text-xs font-semibold text-[#1F1B18]">
                  {order.itemsSummary}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="rounded-xl border border-[#EEDFD5] bg-[#FAF7F5] p-3">
                <p className="text-[10px] text-[#857B72]">
                  Metode Bayar
                </p>

                <p className="mt-1 text-xs font-bold text-[#1F1B18]">
                  {order.paymentMethod}
                </p>
              </div>

              <div className="rounded-xl border border-[#EEDFD5] bg-[#FAF7F5] p-3">
                <p className="text-[10px] text-[#857B72]">
                  Total Pembayaran
                </p>

                <p className="mt-1 text-xs font-extrabold text-[#1F1B18]">
                  {formatRupiah(order.totalAmount)}
                </p>
              </div>
            </div>
          </div>

          {/* PENGIRIMAN */}
          <div className="space-y-4 rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-2xs">
            <div>
              <h2 className="text-sm font-bold text-[#1F1B18]">
                Pengiriman
              </h2>

              <p className="mt-1 text-xs font-semibold text-[#D96B27]">
                {getShippingTitle()}
              </p>

              <p className="mt-1 text-[10px] leading-relaxed text-[#857B72]">
                {getShippingDescription()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#EEDFD5] pt-4">
              <div>
                <p className="mb-1 text-[10px] text-[#857B72]">
                  Kurir
                </p>

                <p className="text-xs font-bold text-[#1F1B18]">
                  {order.courier}
                </p>
              </div>

              <div>
                <p className="mb-1 text-[10px] text-[#857B72]">
                  Nomor Resi
                </p>

                <p className="text-[11px] text-[#857B72]">
                  {order.trackingNumber ||
                    (order.status === "Diproses"
                      ? "Belum diterbitkan"
                      : "Tidak tersedia")}
                </p>
              </div>
            </div>

            <div className="border-t border-[#EEDFD5] pt-3">
              <p className="mb-1.5 text-[10px] text-[#857B72]">
                Alamat Pengiriman
              </p>

              <p className="text-xs leading-relaxed text-[#1F1B18]">
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
          <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-2xs">
            <h2 className="mb-6 text-sm font-bold text-[#1F1B18]">
              Status Pengiriman
            </h2>

            <div className="relative pl-9">
              {/* Base Line */}
              <div className="absolute bottom-3 left-[12px] top-3 w-[3px] rounded-full bg-[#EEE7E2] shadow-[inset_1px_1px_2px_rgba(120,100,90,0.12),inset_-1px_-1px_2px_rgba(255,255,255,0.9)]" />

              {/* Progress Line */}
              {currentStatusIndex > 0 && (
                <div
                  className="absolute left-[12px] top-3 w-[3px] rounded-full bg-[#EE6B28] shadow-[1px_1px_3px_rgba(180,80,25,0.25),-1px_-1px_2px_rgba(255,255,255,0.6)] transition-all duration-500"
                  style={{
                    height: `calc(${(currentStatusIndex / (statusOrder.length - 1)) * 100}% - 6px)`,
                  }}
                />
              )}

              <div className="space-y-8">
                {statusOrder.map((status, index) => {
                  const isCompleted = index <= currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;

                  const descriptions: Record<
                    OrderDetailData["status"],
                    string
                  > = {
                    Diproses:
                      "Pembayaran terverifikasi · pesanan sedang disiapkan",
                    Dikirim:
                      "Pesanan telah diserahkan kepada kurir",
                    "Dalam Perjalanan":
                      "Pesanan sedang menuju alamat tujuan",
                    "Sampai Tujuan":
                      "Pesanan telah diterima · pengiriman selesai",
                  };

                  return (
                    <div
                      key={status}
                      className="relative flex items-start gap-4"
                    >
                      {/* Polymorphic Circle */}
                      <div
                        className={`absolute -left-[36px] top-0 flex items-center justify-center rounded-full transition-all duration-300 ${
                          isCurrent
                            ? "h-7 w-7 -translate-x-[2px] -translate-y-[1px]"
                            : "h-6 w-6"
                        } ${
                          isCompleted
                            ? "bg-[#EE6B28] text-white shadow-[3px_3px_7px_rgba(194,91,35,0.28),-2px_-2px_5px_rgba(255,255,255,0.9)]"
                            : "bg-[#F7F3F0] text-[#A99B92] shadow-[3px_3px_6px_rgba(150,135,125,0.16),-2px_-2px_5px_rgba(255,255,255,0.95)]"
                        }`}
                      >
                        {/* Inner Highlight */}
                        <div
                          className={`absolute inset-[3px] rounded-full ${
                            isCompleted
                              ? "bg-gradient-to-br from-[#FFB47D] via-[#EE6B28] to-[#D45F20]"
                              : "bg-gradient-to-br from-white via-[#F7F3F0] to-[#EAE3DE]"
                          }`}
                        />

                        <span className="relative z-10 text-[9px] font-extrabold">
                          {isCompleted ? "✓" : index + 1}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="min-w-0">
                        <p
                          className={`text-xs font-bold ${
                            isCurrent
                              ? "text-[#D96B27]"
                              : isCompleted
                                ? "text-[#1F1B18]"
                                : "text-[#857B72]"
                          }`}
                        >
                          {status}
                        </p>

                        <p
                          className={`mt-1 text-[10px] leading-relaxed ${
                            isCompleted
                              ? "text-[#857B72]"
                              : "text-[#A09387]"
                          }`}
                        >
                          {isCompleted
                            ? descriptions[status]
                            : "Menunggu"}
                        </p>

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

            {order.status === "Sampai Tujuan" && (
              <div className="mt-6 rounded-xl border border-[#D9EBDD] bg-[#F3FAF5] p-3 shadow-[inset_1px_1px_3px_rgba(80,130,90,0.05),2px_2px_5px_rgba(80,130,90,0.06)]">
                <p className="text-xs font-bold text-[#31834A]">
                  Pengiriman selesai
                </p>

                <p className="mt-1 text-[10px] leading-relaxed text-[#5F7866]">
                  Pesanan telah sampai di alamat tujuan dan proses
                  pengiriman telah selesai.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RINGKASAN */}
        <div className="sticky top-24 space-y-4 rounded-2xl border border-[#EEDFD5] bg-white p-5">
          <h2 className="border-b border-[#EEDFD5] pb-3 text-sm font-bold text-[#1F1B18]">
            Ringkasan Pesanan
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-[#857B72]">
                Nomor Pesanan
              </span>

              <span className="text-right font-semibold text-[#1F1B18]">
                {order.orderId}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[#857B72]">
                Status
              </span>

              <span
                className={`text-right font-semibold ${
                  order.status === "Sampai Tujuan"
                    ? "text-[#31834A]"
                    : "text-[#D96B27]"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[#857B72]">
                Metode Bayar
              </span>

              <span className="text-right font-semibold text-[#1F1B18]">
                {order.paymentMethod}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[#857B72]">
                Kurir
              </span>

              <span className="text-right font-semibold text-[#1F1B18]">
                {order.courier}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#EEDFD5] pt-3">
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
            className="w-full cursor-pointer rounded-xl border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-3 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)] active:translate-y-0 active:shadow-xs"
          >
            {backLabel}
          </button>
        </div>
      </div>

      {/* SUCCESS / STATUS TOAST */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[70] w-[360px]">
          <div className="flex items-start gap-3 rounded-2xl border border-[#EAE5DF] bg-white p-3.5 shadow-2xl">
            <div
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                order.status === "Sampai Tujuan"
                  ? "border-[#D9EBDD] bg-[#F3FAF5] text-[#31834A]"
                  : "border-[#FADEC9] bg-[#FFF8F3] text-[#D96B27]"
              }`}
            >
              <span className="text-xs font-bold">
                {order.status === "Sampai Tujuan" ? "✓" : "i"}
              </span>
            </div>

            <p className="flex-1 text-xs leading-snug text-[#1F1B18]">
              {getToastMessage()}
            </p>

            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="cursor-pointer p-1 text-xs text-[#857B72] hover:text-[#1F1B18]"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}