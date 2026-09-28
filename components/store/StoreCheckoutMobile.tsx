"use client";

import React, { useState, useEffect } from "react";
import { CartItem } from "./StoreCartMobile";

interface CourierOption {
  id: string;
  name: string;
  code: string;
  estimate: string;
  price: number;
  category: "REGULER" | "INSTANT";
}

// 1. PERBAIKAN INTERFACE PROPS
interface StoreCheckoutMobileProps {
  cartItems: CartItem[];
  onBack: () => void;
  formatRupiah: (val: number) => string;
  onProceedToPayment: (data: {
    address: { name: string; phone: string; address: string; city: string };
    courierName: string;
    courierPrice: number;
    totalPayable: number;
  }) => void;
}

export default function StoreCheckoutMobile({
  cartItems,
  onBack,
  formatRupiah,
  onProceedToPayment, // 2. AMBIL PROP DI SINI
}: StoreCheckoutMobileProps) {
  const [slideIn, setSlideIn] = useState<boolean>(false);

  const [name, setName] = useState("Ayu Prameswari");
  const [phone, setPhone] = useState("0812-2045-7781");
  const [address, setAddress] = useState(
    "Jl. Cigadung Raya Barat No. 18, Cibeunying Kaler"
  );
  const [city, setCity] = useState("Kota Bandung");

  const couriers: CourierOption[] = [
    {
      id: "jne-reg",
      name: "JNE REG",
      code: "JNE",
      estimate: "Estimasi tiba 2–3 hari",
      price: 11000,
      category: "REGULER",
    },
    {
      id: "jnt-ez",
      name: "J&T Express EZ",
      code: "J&T",
      estimate: "Estimasi tiba 2–4 hari",
      price: 10000,
      category: "REGULER",
    },
    {
      id: "sicepat-reg",
      name: "SiCepat REG",
      code: "SiCepat",
      estimate: "Estimasi tiba 1–3 hari",
      price: 10000,
      category: "REGULER",
    },
    {
      id: "gosend-instant",
      name: "GoSend Instant",
      code: "GoSend",
      estimate: "Estimasi tiba 1–3 jam, hari ini",
      price: 24000,
      category: "INSTANT",
    },
  ];

  const [selectedCourierId, setSelectedCourierId] = useState<string>("jne-reg");

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

  const selectedCourier =
    couriers.find((c) => c.id === selectedCourierId) || couriers[0];

  const subtotalProducts = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalPayable = subtotalProducts + selectedCourier.price;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-[#F7F5F0] font-sans transition-transform duration-300 ease-out ${
        slideIn ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="shrink-0 sticky top-0 z-30 bg-[#F7F5F0] px-4 pb-4 border-b border-[#EAE5DF]/60"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 28px)" }}
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
              Checkout
            </h1>
            <p className="text-xs text-[#857B72] mt-0.5">
              Langkah 1 dari 2 · Alamat & kurir
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-44 scrollbar-none">
        {/* Form Alamat */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3">
          <h2 className="text-xs font-bold text-[#1F1B18]">Alamat pengiriman</h2>

          <div className="space-y-1">
            <label className="text-[10px] text-[#857B72] block">Nama penerima</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-[#1F1B18] border border-[#EAE5DF] rounded-xl outline-none focus:border-[#D96B27]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-[#857B72] block">Nomor HP</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-[#1F1B18] border border-[#EAE5DF] rounded-xl outline-none focus:border-[#D96B27]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-[#857B72] block">Alamat lengkap</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-[#1F1B18] border border-[#EAE5DF] rounded-xl outline-none focus:border-[#D96B27] resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-[#857B72] block">Kota / wilayah</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-[#1F1B18] border border-[#EAE5DF] rounded-xl outline-none focus:border-[#D96B27]"
            />
          </div>
        </div>

        {/* Pilih Kurir */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3">
          <h2 className="text-xs font-bold text-[#1F1B18]">Pilih kurir</h2>
          <div className="space-y-2">
            {couriers.map((c) => {
              const isSelected = selectedCourierId === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCourierId(c.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#D96B27] bg-[#FFF8F3]"
                      : "border-[#EAE5DF] bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-7 rounded bg-gray-50 border border-gray-100 flex items-center justify-center text-[9px] font-black text-gray-700 uppercase shrink-0">
                      {c.code}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1F1B18]">{c.name}</p>
                      <p className="text-[10px] text-[#857B72]">{c.estimate}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#1F1B18]">
                    {formatRupiah(c.price)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ringkasan Pesanan */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE5DF] shadow-2xs space-y-3">
          <h2 className="text-xs font-bold text-[#1F1B18]">Ringkasan pesanan</h2>
          <div className="space-y-2 border-b border-[#EAE5DF]/60 pb-3 text-xs">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.title} ({item.quantity}x)</span>
                <span className="font-bold">{formatRupiah(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-extrabold text-xs text-[#1F1B18]">
            <span>Total bayar</span>
            <span>{formatRupiah(totalPayable)}</span>
          </div>
        </div>
      </div>

      {/* 3. TOMBOL AKSI AKHIR YANG MEMANGGIL onProceedToPayment */}
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
          onClick={() =>
            onProceedToPayment({
              address: { name, phone, address, city },
              courierName: `${selectedCourier.name} · ${selectedCourier.estimate}`,
              courierPrice: selectedCourier.price,
              totalPayable: totalPayable,
            })
          }
          className="w-full py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FFA26B] via-[#EE6B28] to-[#E35610] shadow-[0_4px_12px_rgba(238,107,40,0.25)] active:scale-98 transition-transform"
        >
          Lanjut ke pembayaran
        </button>
      </div>
    </div>
  );
}