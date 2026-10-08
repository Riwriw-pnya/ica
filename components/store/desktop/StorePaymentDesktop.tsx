"use client";

import { useState } from "react";
import type { CartItem } from "../StorePage";

interface StorePaymentDesktopProps {
  cartItems: CartItem[];
  totalPayable: number;
  courierName: string;
  courierPrice: number;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postalCode?: string;
  };
  onBack: () => void;
  formatRupiah: (val: number) => string;
  onSuccessPayment: () => void;
}

export default function StorePaymentDesktop({
  cartItems,
  totalPayable,
  courierName,
  courierPrice,
  shippingAddress,
  onBack,
  formatRupiah,
  onSuccessPayment,
}: StorePaymentDesktopProps) {
  const [activeTab, setActiveTab] = useState<"qris" | "va">("qris");

  const [selectedBank, setSelectedBank] = useState("BCA");
  const [isBankDropdownOpen, setIsBankDropdownOpen] =
    useState(false);

  const subtotalProducts = cartItems.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );

  const bankOptions = [
    "BCA",
    "Mandiri",
    "BNI",
    "BRI",
    "BTN",
    "BSI",
    "CIMB Niaga",
    "Danamon",
    "PermataBank",
    "OCBC",
    "UOB Indonesia",
    "Maybank Indonesia",
    "Bank Mega",
    "PaninBank",
    "Bank SMBC Indonesia",
  ];

  const paymentTabs = [
    {
      id: "qris" as const,
      label: "QRIS",
    },
    {
      id: "va" as const,
      label: "Virtual Account",
    },
  ];

  const handlePay = () => {
    onSuccessPayment();
  };

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

        <span>Kembali ke checkout</span>
      </button>

      <div>
        <h1 className="font-display text-[22px] font-bold tracking-tight text-[#1F1B18]">
          Pembayaran
        </h1>

        <p className="mt-1 text-[12px] text-[#857B72]">
          Pilih metode pembayaran untuk menyelesaikan pesanan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-4">
          <section className="bg-white rounded-2xl border border-[#EEDFD5] p-5">
            <div className="mb-4">
              <h2 className="text-sm font-bold text-[#1F1B18]">
                Metode Pembayaran
              </h2>

              <p className="text-[11px] text-[#8C8074] mt-1">
                Pilih salah satu metode pembayaran.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-5">
              {paymentTabs.map((tab) => {
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2.5 px-2 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                      active
                        ? "border-[#EE6B28] bg-[#FFF7F0] text-[#D96B27]"
                        : "border-[#EEDFD5] text-[#756A62] hover:border-[#F2C7AB]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activeTab === "qris" && (
              <div className="border border-[#EEDFD5] rounded-2xl p-6 bg-[#FFFCFA]">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-44 h-44 rounded-xl border border-[#E4D8D0] bg-white p-4 flex items-center justify-center">
                    <div className="w-full h-full grid grid-cols-9 grid-rows-9 gap-1">
                      {Array.from({ length: 81 }).map(
                        (_, index) => (
                          <div
                            key={index}
                            className={`rounded-[1px] ${
                              (
                                index * 17 +
                                index * index +
                                7
                              ) %
                                5 <
                              2
                                ? "bg-[#1F1B18]"
                                : "bg-white"
                            }`}
                          />
                        )
                      )}
                    </div>
                  </div>

                  <p className="mt-4 text-sm font-bold text-[#1F1B18]">
                    Scan QRIS
                  </p>

                  <p className="mt-1 text-[11px] text-[#8C8074] max-w-sm">
                    Gunakan aplikasi mobile banking atau e-wallet
                    yang mendukung QRIS untuk membayar pesanan.
                  </p>

                  <div className="mt-4 px-4 py-2 rounded-xl bg-[#FFF2E8] text-[#D96B27] text-xs font-extrabold">
                    {formatRupiah(totalPayable)}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "va" && (
              <div className="border border-[#EEDFD5] rounded-2xl p-5 bg-[#FFFCFA]">
                <p className="text-xs font-bold text-[#1F1B18] mb-3">
                  Pilih Bank
                </p>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setIsBankDropdownOpen(
                        (prev) => !prev
                      )
                    }
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border bg-white text-left transition-all cursor-pointer ${
                      isBankDropdownOpen
                        ? "border-[#EE6B28] ring-1 ring-[#F9D7C0]"
                        : "border-[#EEDFD5] hover:border-[#F2C7AB]"
                    }`}
                  >
                    <div>
                      <p className="text-[10px] text-[#8C8074]">
                        Bank
                      </p>

                      <p className="mt-0.5 text-xs font-bold text-[#1F1B18]">
                        {selectedBank}
                      </p>
                    </div>

                    <svg
                      className={`w-4 h-4 text-[#8C8074] transition-transform ${
                        isBankDropdownOpen
                          ? "rotate-180"
                          : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isBankDropdownOpen && (
                    <div className="absolute z-20 left-0 right-0 mt-2 rounded-xl border border-[#EEDFD5] bg-white shadow-lg overflow-hidden">
                      <div className="max-h-64 overflow-y-auto p-1.5">
                        {bankOptions.map((bank) => {
                          const active =
                            selectedBank === bank;

                          return (
                            <button
                              key={bank}
                              type="button"
                              onClick={() => {
                                setSelectedBank(bank);
                                setIsBankDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-all cursor-pointer ${
                                active
                                  ? "bg-[#FFF7F0] text-[#D96B27]"
                                  : "text-[#574D45] hover:bg-[#FAF7F5]"
                              }`}
                            >
                              <span>{bank}</span>

                              {active && (
                                <svg
                                  className="w-4 h-4 text-[#EE6B28]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 12l4 4L19 6"
                                  />
                                </svg>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-5 p-4 rounded-xl bg-white border border-[#EEDFD5]">
                  <p className="text-[10px] text-[#8C8074]">
                    Nomor Virtual Account
                  </p>

                  <p className="mt-1 text-lg font-extrabold tracking-wider text-[#1F1B18]">
                    8808 2026 0148 9271
                  </p>

                  <p className="mt-1 text-[10px] text-[#8C8074]">
                    {selectedBank}
                  </p>
                </div>
              </div>
            )}
          </section>

          <section className="bg-white rounded-2xl border border-[#EEDFD5] p-5">
            <h2 className="text-sm font-bold text-[#1F1B18] mb-4">
              Alamat Pengiriman
            </h2>

            <div className="rounded-xl bg-[#FFFCFA] border border-[#EEDFD5] p-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-xs font-bold text-[#1F1B18]">
                    {shippingAddress.name}
                  </p>

                  <p className="text-[11px] text-[#8C8074] mt-1">
                    {shippingAddress.phone}
                  </p>

                  <p className="text-[11px] text-[#8C8074] mt-2 leading-relaxed">
                    {shippingAddress.address}
                    <br />
                    {shippingAddress.city}
                    {shippingAddress.postalCode
                      ? `, ${shippingAddress.postalCode}`
                      : ""}
                  </p>
                </div>

                <span className="text-[10px] font-bold text-[#D96B27] bg-[#FFF2E8] px-2 py-1 rounded-lg shrink-0">
                  {courierName}
                </span>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-4 sticky top-24">
          <section className="bg-white rounded-2xl border border-[#EEDFD5] p-5">
            <h2 className="text-sm font-bold text-[#1F1B18] pb-3 border-b border-[#EEDFD5]">
              Ringkasan Pesanan
            </h2>

            <div className="space-y-3 py-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.size ?? "default"}`}
                  className="flex justify-between items-start gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-[#1F1B18] line-clamp-2">
                      {item.product.title}
                    </p>

                    <p className="text-[10px] text-[#8C8074] mt-0.5">
                      {item.size
                        ? `Ukuran ${item.size}`
                        : "Standar"}{" "}
                      · {item.quantity}x
                    </p>
                  </div>

                  <span className="text-[11px] font-bold text-[#1F1B18] shrink-0">
                    {formatRupiah(
                      item.product.price * item.quantity
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EEDFD5] space-y-2.5 text-xs">
              <div className="flex justify-between text-[#8C8074]">
                <span>Subtotal Produk</span>

                <span className="font-semibold text-[#1F1B18]">
                  {formatRupiah(subtotalProducts)}
                </span>
              </div>

              <div className="flex justify-between text-[#8C8074]">
                <span>Pengiriman</span>

                <span className="font-semibold text-[#1F1B18]">
                  {formatRupiah(courierPrice)}
                </span>
              </div>

              <div className="pt-3 border-t border-[#EEDFD5] flex justify-between items-center">
                <span className="text-xs font-bold text-[#1F1B18]">
                  Total
                </span>

                <span className="text-base font-extrabold text-[#D96B27]">
                  {formatRupiah(totalPayable)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePay}
              className="w-full mt-4 cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-3 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)] active:translate-y-0 active:shadow-xs"
            >
              Bayar {formatRupiah(totalPayable)}
            </button>
          </section>

          <div className="rounded-xl bg-[#FFF8EE] border border-[#FADEC9] px-4 py-3">
            <p className="text-[10px] text-[#8C8074] leading-relaxed">
              Pesanan akan diproses setelah pembayaran berhasil
              dikonfirmasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}