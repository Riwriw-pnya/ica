"use client";

import React, { useState } from "react";

export default function PaymentMethodsTab() {
  const [methods, setMethods] = useState({
    creditCard: true,
    va: true,
    qris: true,
  });

  const [banks, setBanks] = useState({
    bca: true,
    mandiri: true,
    bri: true,
    bni: true,
    btn: true,
    bjb: true,
    permata: false,
    cimb: false,
  });

  const toggleMethod = (key: keyof typeof methods) => {
    setMethods((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleBank = (key: keyof typeof banks) => {
    setBanks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      {/* Alert Banner */}
      <div className="flex items-start gap-2.5 rounded-xl border border-[#D0E2FF] bg-[#EDF4FF] p-3.5 text-xs text-[#1E3A8A]">
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
        </svg>
        <p className="leading-relaxed">
          Metode yang dinonaktifkan langsung hilang dari halaman pembayaran peserta. Transaksi yang sudah berjalan tetap diproses sampai selesai.
        </p>
      </div>

      {/* Credit Card Section */}
      <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FCE3D2] bg-[#FFF2E8] text-[#F05A1B]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1A1513]">Credit Card</h3>
              <p className="text-[11px] text-[#8C8074]">Visa · Mastercard · JCB · verifikasi 3D Secure</p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={methods.creditCard}
            onClick={() => toggleMethod("creditCard")}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-all duration-200 focus:outline-none ${
              methods.creditCard
                ? "border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] shadow-[0_2px_8px_rgba(238,107,40,0.25)]"
                : "border border-[#EEDFD5] bg-[var(--color-ink-100)]"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                methods.creditCard ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Virtual Account (VA) Section */}
      <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FCE3D2] bg-[#FFF2E8] text-[#F05A1B]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1A1513]">Virtual Account (VA)</h3>
              <p className="text-[11px] text-[#8C8074]">
                Nomor VA diterbitkan otomatis per transaksi. Aktifkan bank yang ditawarkan ke peserta.
              </p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={methods.va}
            onClick={() => toggleMethod("va")}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-all duration-200 focus:outline-none ${
              methods.va
                ? "border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] shadow-[0_2px_8px_rgba(238,107,40,0.25)]"
                : "border border-[#EEDFD5] bg-[var(--color-ink-100)]"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                methods.va ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Bank List Sub-section */}
        <div className="mt-5 border-t border-[#EEDFD5] pt-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C8074]">BANK TUJUAN</p>
          <div className="mt-3 grid grid-cols-2 gap-y-3.5 gap-x-6 sm:grid-cols-4">
            {[
              { id: "bca", name: "BCA" },
              { id: "mandiri", name: "Mandiri" },
              { id: "bri", name: "BRI" },
              { id: "bni", name: "BNI" },
              { id: "btn", name: "BTN" },
              { id: "bjb", name: "BJB" },
              { id: "permata", name: "Permata" },
              { id: "cimb", name: "CIMB Niaga" },
            ].map((bank) => {
              const bankKey = bank.id as keyof typeof banks;
              const isChecked = banks[bankKey];
              return (
                <div key={bank.id} className="flex items-center justify-between pr-2">
                  <span className="text-xs font-medium text-[#1A1513]">{bank.name}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isChecked}
                    onClick={() => toggleBank(bankKey)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-all duration-200 focus:outline-none ${
                      isChecked
                        ? "border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] shadow-[0_2px_8px_rgba(238,107,40,0.25)]"
                        : "border border-[#EEDFD5] bg-[var(--color-ink-100)]"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                        isChecked ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* QRIS Section */}
      <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FCE3D2] bg-[#FFF2E8] text-[#F05A1B]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 14h3v3h-3zM18 18h3v3h-3zM14 18h3v3h-3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1A1513]">QRIS</h3>
              <p className="text-[11px] text-[#8C8074]">Satu kode untuk semua bank dan e-wallet nasional.</p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={methods.qris}
            onClick={() => toggleMethod("qris")}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-all duration-200 focus:outline-none ${
              methods.qris
                ? "border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] shadow-[0_2px_8px_rgba(238,107,40,0.25)]"
                : "border border-[#EEDFD5] bg-[var(--color-ink-100)]"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                methods.qris ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Biaya MDR Notice */}
        <div className="flex items-center gap-2 rounded-xl border border-[#FCE3D2] bg-[#FFF7F2] px-4 py-2.5 text-xs text-[#EE6B28]">
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
          <span className="font-semibold">Biaya MDR 0,75%</span>
        </div>
      </div>
    </div>
  );
}