"use client";

import { useMemo, useState } from "react";
import type { CartItem } from "../StorePage";

interface StoreCheckoutDesktopProps {
  cartItems: CartItem[];
  onBack: () => void;
  formatRupiah: (val: number) => string;
  onProceedToPayment: (data: {
    address: {
      name: string;
      phone: string;
      address: string;
      city: string;
      postalCode?: string;
    };
    courierName: string;
    courierPrice: number;
    totalPayable: number;
  }) => void;
}

const COURIERS = [
  {
    id: "jne",
    name: "JNE",
    estimate: "2–3 hari",
    price: 18000,
  },
  {
    id: "jnt",
    name: "J&T Express",
    estimate: "2–3 hari",
    price: 15000,
  },
  {
    id: "sicepat",
    name: "SiCepat",
    estimate: "2–4 hari",
    price: 17000,
  },
];

export default function StoreCheckoutDesktop({
  cartItems,
  onBack,
  formatRupiah,
  onProceedToPayment,
}: StoreCheckoutDesktopProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [selectedCourierId, setSelectedCourierId] = useState("jne");

  const selectedCourier = useMemo(
    () =>
      COURIERS.find(
        (courier) => courier.id === selectedCourierId
      ) ?? COURIERS[0],
    [selectedCourierId]
  );

  const subtotalProducts = cartItems.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );

  const totalPayable =
    subtotalProducts + selectedCourier.price;

  const isFormValid =
    name.trim() !== "" &&
    phone.trim() !== "" &&
    address.trim() !== "" &&
    city.trim() !== "" &&
    postalCode.trim() !== "";

  const handleCheckoutSubmit = () => {
    if (!isFormValid) return;

    onProceedToPayment({
      address: {
        name,
        phone,
        address,
        city,
        postalCode,
      },
      courierName: `${selectedCourier.name} · ${selectedCourier.estimate}`,
      courierPrice: selectedCourier.price,
      totalPayable,
    });
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

        <span>Kembali ke keranjang</span>
      </button>

      <div>
        <h1 className="font-display text-[22px] font-bold tracking-tight text-[#1F1B18]">
          Checkout
        </h1>

        <p className="mt-1 text-[12px] text-[#857B72]">
          Lengkapi alamat pengiriman dan pilih kurir untuk melanjutkan
          pembayaran.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-4">
          <section className="bg-white rounded-2xl border border-[#EEDFD5] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-[#1F1B18]">
                  Alamat Pengiriman
                </h2>

                <p className="text-[11px] text-[#8C8074] mt-1">
                  Pastikan data penerima sudah benar.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-[#5F554E] mb-1.5">
                  Nama Penerima
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap"
                  className="w-full h-10 px-3 rounded-xl border border-[#EEDFD5] bg-[#FFFCFA] text-xs text-[#1F1B18] outline-none focus:border-[#EE6B28] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5F554E] mb-1.5">
                  Nomor Telepon
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full h-10 px-3 rounded-xl border border-[#EEDFD5] bg-[#FFFCFA] text-xs text-[#1F1B18] outline-none focus:border-[#EE6B28] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5F554E] mb-1.5">
                  Kota
                </label>

                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Kota / Kabupaten"
                  className="w-full h-10 px-3 rounded-xl border border-[#EEDFD5] bg-[#FFFCFA] text-xs text-[#1F1B18] outline-none focus:border-[#EE6B28] transition-colors"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-[#5F554E] mb-1.5">
                  Alamat Lengkap
                </label>

                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah, kecamatan, dan detail lainnya"
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#EEDFD5] bg-[#FFFCFA] text-xs text-[#1F1B18] outline-none focus:border-[#EE6B28] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5F554E] mb-1.5">
                  Kode Pos
                </label>

                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="401xx"
                  className="w-full h-10 px-3 rounded-xl border border-[#EEDFD5] bg-[#FFFCFA] text-xs text-[#1F1B18] outline-none focus:border-[#EE6B28] transition-colors"
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-[#EEDFD5] p-5">
            <div className="mb-4">
              <h2 className="text-sm font-bold text-[#1F1B18]">
                Pilih Kurir
              </h2>

              <p className="text-[11px] text-[#8C8074] mt-1">
                Pilih layanan pengiriman yang tersedia.
              </p>
            </div>

            <div className="space-y-2.5">
              {COURIERS.map((courier) => {
                const selected =
                  selectedCourierId === courier.id;

                return (
                  <button
                    key={courier.id}
                    type="button"
                    onClick={() =>
                      setSelectedCourierId(courier.id)
                    }
                    className={`w-full flex items-center justify-between gap-4 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selected
                        ? "border-[#EE6B28] bg-[#FFF7F0]"
                        : "border-[#EEDFD5] bg-white hover:border-[#F4C7A9]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selected
                            ? "border-[#EE6B28]"
                            : "border-[#CFC4BB]"
                        }`}
                      >
                        {selected && (
                          <div className="w-2 h-2 rounded-full bg-[#EE6B28]" />
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-bold text-[#1F1B18]">
                          {courier.name}
                        </p>

                        <p className="text-[10px] text-[#8C8074] mt-0.5">
                          Estimasi {courier.estimate}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#1F1B18]">
                      {formatRupiah(courier.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-[#EEDFD5] p-5">
            <h2 className="text-sm font-bold text-[#1F1B18] mb-4">
              Produk
            </h2>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.size ?? "default"}`}
                  className="flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#1F1B18] truncate">
                      {item.product.title}
                    </p>

                    <p className="text-[10px] text-[#857B72] mt-0.5">
                      {item.size
                        ? `Ukuran ${item.size}`
                        : "Standar"}{" "}
                      · {item.quantity}x @{" "}
                      {formatRupiah(item.product.price)}
                    </p>
                  </div>

                  <span className="text-xs font-bold text-[#1F1B18] shrink-0">
                    {formatRupiah(
                      item.product.price * item.quantity
                    )}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="bg-white rounded-2xl border border-[#EEDFD5] p-5 space-y-4 sticky top-24">
          <h2 className="text-sm font-bold text-[#1F1B18] pb-3 border-b border-[#EEDFD5]">
            Ringkasan Pesanan
          </h2>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between text-[#8C8074]">
              <span>Total Produk</span>

              <span className="font-semibold text-[#1F1B18]">
                {formatRupiah(subtotalProducts)}
              </span>
            </div>

            <div className="flex justify-between text-[#8C8074]">
              <span>Pengiriman</span>

              <span className="font-semibold text-[#1F1B18]">
                {formatRupiah(selectedCourier.price)}
              </span>
            </div>

            <div className="flex justify-between text-[#8C8074]">
              <span>Kurir</span>

              <span className="text-[10px] font-semibold text-[#1F1B18] text-right max-w-[130px]">
                {selectedCourier.name}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#EEDFD5] flex justify-between items-center">
            <span className="text-xs font-bold text-[#1F1B18]">
              Total Pembayaran
            </span>

            <span className="text-base font-extrabold text-[#D96B27]">
              {formatRupiah(totalPayable)}
            </span>
          </div>

          <button
            type="button"
            disabled={!isFormValid}
            onClick={handleCheckoutSubmit}
            className={`w-full py-3 text-xs font-bold rounded-xl transition-all ${
              isFormValid
                ? "bg-[#EE6B28] hover:bg-[#C8601D] text-white cursor-pointer"
                : "bg-[#E9E2DD] text-[#A99D93] cursor-not-allowed"
            }`}
          >
            Lanjut ke Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}