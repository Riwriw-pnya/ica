"use client";

import { useState, useEffect } from "react";
import type { CartItem } from "../StorePage";

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

  const [activeTab, setActiveTab] = useState<"qris" | "va">("qris");

  const [selectedBank, setSelectedBank] = useState("BCA");
  const [isBankDropdownOpen, setIsBankDropdownOpen] =
    useState(false);

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
  ];

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
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-[#F7F5F0] font-sans transition-transform duration-300 ease-out ${
        slideIn ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* HEADER */}
      <div
        className="shrink-0 sticky top-0 z-30 bg-[#F7F5F0] px-4 pb-4 border-b border-[#EAE5DF]/60 shadow-2xs"
        style={{
          paddingTop:
            "calc(env(safe-area-inset-top, 0px) + 28px)",
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

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-44 scrollbar-none">
        {/* METODE PEMBAYARAN */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-4">
          <h2 className="text-xs font-bold text-[#1F1B18]">
            Metode pembayaran
          </h2>

          {/* TAB */}
          <div className="grid grid-cols-2 gap-2">
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
              Virtual Account
            </button>
          </div>

          {/* QRIS */}
          {activeTab === "qris" && (
            <div className="rounded-2xl border border-[#EAE5DF] p-5 bg-[#FAF8F5] flex flex-col items-center text-center space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F1B18]">
                <span>QRIS</span>

                <span className="text-[10px] text-[#857B72] font-medium">
                  · ICA STORE
                </span>
              </div>

              <div className="w-48 h-48 bg-white border border-[#EAE5DF] rounded-2xl flex items-center justify-center p-2 shadow-2xs">
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

              <span className="text-[10px] font-bold tracking-wider text-[#857B72]">
                NMID ID1026354789012
              </span>

              <p className="text-[11px] text-[#857B72] leading-relaxed max-w-xs">
                Scan dengan aplikasi m-banking atau aplikasi
                pembayaran yang mendukung QRIS. Status pesanan
                berubah otomatis setelah pembayaran diterima.
              </p>

              <div className="px-4 py-2 rounded-xl bg-[#FFF2E8] text-[#D96B27] text-xs font-extrabold">
                {formatRupiah(totalPayable)}
              </div>
            </div>
          )}

          {/* VIRTUAL ACCOUNT */}
          {activeTab === "va" && (
            <div className="rounded-2xl border border-[#EAE5DF] p-4 bg-[#FAF8F5] space-y-4">
              <div>
                <p className="text-xs font-bold text-[#1F1B18]">
                  Virtual Account
                </p>

                <p className="mt-1 text-[11px] text-[#857B72]">
                  Pilih bank untuk mendapatkan nomor Virtual
                  Account pembayaran.
                </p>
              </div>

              {/* DROPDOWN BANK */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setIsBankDropdownOpen(
                      (prev) => !prev
                    )
                  }
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border bg-white text-left transition-all ${
                    isBankDropdownOpen
                      ? "border-[#D96B27] ring-1 ring-[#F9D7C0]"
                      : "border-[#EAE5DF]"
                  }`}
                >
                  <div>
                    <p className="text-[10px] text-[#857B72]">
                      Bank
                    </p>

                    <p className="mt-0.5 text-xs font-bold text-[#1F1B18]">
                      {selectedBank}
                    </p>
                  </div>

                  <svg
                    className={`w-4 h-4 text-[#857B72] transition-transform ${
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
                  <div className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-xl border border-[#EAE5DF] bg-white shadow-lg">
                    <div className="max-h-60 overflow-y-auto p-1.5">
                      {bankOptions.map((bank) => {
                        const active = selectedBank === bank;

                        return (
                          <button
                            key={bank}
                            type="button"
                            onClick={() => {
                              setSelectedBank(bank);
                              setIsBankDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-all ${
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

              {/* VIRTUAL ACCOUNT CODE */}
              <div className="rounded-xl border border-[#EAE5DF] bg-white p-4">
                <p className="text-[10px] text-[#857B72]">
                  Nomor Virtual Account
                </p>

                <p className="mt-1 text-lg font-extrabold tracking-wider text-[#1F1B18]">
                  {selectedBank === "BCA" &&
                    "8808 2026 0148 9271"}
                  {selectedBank === "Mandiri" &&
                    "8808 2026 0148 9272"}
                  {selectedBank === "BNI" &&
                    "8808 2026 0148 9273"}
                  {selectedBank === "BRI" &&
                    "8808 2026 0148 9274"}
                  {selectedBank === "BTN" &&
                    "8808 2026 0148 9275"}
                  {selectedBank === "BSI" &&
                    "8808 2026 0148 9276"}
                  {selectedBank === "CIMB Niaga" &&
                    "8808 2026 0148 9277"}
                  {selectedBank === "Danamon" &&
                    "8808 2026 0148 9278"}
                  {selectedBank === "PermataBank" &&
                    "8808 2026 0148 9279"}
                  {selectedBank === "OCBC" &&
                    "8808 2026 0148 9280"}
                  {selectedBank === "UOB Indonesia" &&
                    "8808 2026 0148 9281"}
                  {selectedBank === "Maybank Indonesia" &&
                    "8808 2026 0148 9282"}
                </p>

                <p className="mt-1 text-[10px] text-[#857B72]">
                  {selectedBank}
                </p>

                <div className="mt-3 rounded-lg bg-[#FFF7F0] px-3 py-2">
                  <p className="text-[10px] leading-relaxed text-[#8C8074]">
                    Gunakan nomor Virtual Account di atas untuk
                    menyelesaikan pembayaran sebesar{" "}
                    <span className="font-bold text-[#D96B27]">
                      {formatRupiah(totalPayable)}
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DIKIRIM KE */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-1.5">
          <h2 className="text-xs font-bold text-[#1F1B18]">
            Dikirim ke
          </h2>

          <p className="text-xs font-medium text-[#554E48] leading-relaxed">
            {shippingAddress.name} · {shippingAddress.phone} ·{" "}
            {shippingAddress.address}, {shippingAddress.city}
          </p>

          <p className="text-[11px] text-[#857B72] pt-0.5">
            {courierName}
          </p>
        </div>

        {/* RINGKASAN PESANAN */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3">
          <h2 className="text-xs font-bold text-[#1F1B18]">
            Ringkasan pesanan
          </h2>

          <div className="space-y-2.5 border-b border-[#EAE5DF]/60 pb-3">
            {cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.size ?? "default"}`}
                className="flex items-start justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-[#1F1B18]">
                    {item.product.title}
                  </p>

                  <p className="text-[10px] text-[#857B72]">
                    {item.size
                      ? `Ukuran: ${item.size} · `
                      : ""}
                    {item.quantity} x{" "}
                    {formatRupiah(item.product.price)}
                  </p>
                </div>

                <p className="font-bold text-[#1F1B18]">
                  {formatRupiah(
                    item.product.price * item.quantity
                  )}
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
              <span>
                Ongkir · {courierName.split("·")[0] || "Kurir"}
              </span>

              <span className="font-semibold text-[#1F1B18]">
                {formatRupiah(courierPrice)}
              </span>
            </div>

            <div className="flex justify-between font-extrabold text-[#1F1B18] pt-2 border-t border-[#EAE5DF]/60">
              <span>Total bayar</span>

              <span className="text-sm">
                {formatRupiah(totalPayable)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FIXED BOTTOM */}
      <div
        className="fixed bottom-[64px] left-0 right-0 z-40 px-5 py-3.5 bg-[#F7F5F0]/90 backdrop-blur-md border-t border-[#EAE5DF]/60 space-y-3"
        style={{
          paddingBottom:
            "calc(env(safe-area-inset-bottom, 0px) + 12px)",
        }}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#857B72]">
            Total bayar
          </p>

          <p className="text-base font-extrabold text-[#1F1B18]">
            {formatRupiah(totalPayable)}
          </p>
        </div>

        <button
          type="button"
          onClick={onSuccessPayment}
          className="w-full cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-3 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)] active:translate-y-0 active:scale-[0.98] active:shadow-xs"
        >
          Bayar {formatRupiah(totalPayable)}
        </button>
      </div>
    </div>
  );
}