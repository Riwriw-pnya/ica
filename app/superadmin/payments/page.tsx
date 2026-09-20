"use client";

import { useState } from "react";
import { PaymentProvider, usePayments } from "@/context/PaymentContext";
import PaymentStatusBadge from "./components/PaymentStatusBadge";
import PaymentMethodsTab from "./components/PaymentMethodsTab";
import SettlementTab from "./components/SettlemanTab";

type Tab = "transaksi" | "metode" | "settlement";

function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

// 1. Pindahkan logika utama ke komponen internal ini
function PaymentsContent() {
  const { transactions } = usePayments();
  const [activeTab, setActiveTab] = useState<Tab>("transaksi");

  return (
    <main className="space-y-5">
      {/* Top Banner Card */}
      <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#1A1513]">Payment &amp; settlement</h2>
            <p className="mt-1 max-w-xl text-xs text-[#8C8074]">
              Transaksi iuran, registrasi, dan tiket event. Metode pembayaran dan penarikan dana dikelola pada percabangan terpisah di bawah.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("transaksi")}
          className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 ${
            activeTab === "transaksi"
              ? "border border-[var(--color-brand-orange-500)] bg-[#FFF2E8] font-semibold text-[var(--color-brand-orange-700)]"
              : "border border-[var(--color-brand-orange-300)] bg-white text-[var(--color-brand-orange-700)]/80 hover:bg-[#FAF7F5]"
          }`}
        >
          Transaksi
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("metode")}
          className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 ${
            activeTab === "metode"
              ? "border border-[var(--color-brand-orange-500)] bg-[#FFF2E8] font-semibold text-[var(--color-brand-orange-700)]"
              : "border border-[var(--color-brand-orange-300)] bg-white text-[var(--color-brand-orange-700)]/80 hover:bg-[#FAF7F5]"
          }`}
        >
          Metode pembayaran
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("settlement")}
          className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 ${
            activeTab === "settlement"
              ? "border border-[var(--color-brand-orange-500)] bg-[#FFF2E8] font-semibold text-[var(--color-brand-orange-700)]"
              : "border border-[var(--color-brand-orange-300)] bg-white text-[var(--color-brand-orange-700)]/80 hover:bg-[#FAF7F5]"
          }`}
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settlement · tarik dana
        </button>
      </div>

      {/* Tab Content: Transaksi */}
      {activeTab === "transaksi" && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8074]">LUNAS SEPT 2026</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF6ED] text-[#28844B]">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              </div>
              <p className="mt-3 text-2xl font-black text-[#1A1513]">Rp 41,7 jt</p>
              <p className="mt-0.5 text-xs text-[#8C8074]">132 transaksi</p>
            </div>

            <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8074]">MENUNGGU KONFIRMASI</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFF4E5] text-[#C26D0A]">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                  </svg>
                </span>
              </div>
              <p className="mt-3 text-2xl font-black text-[#1A1513]">14</p>
              <p className="mt-0.5 text-xs text-[#8C8074]">Bukti transfer perlu dicek</p>
            </div>

            <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8074]">TIKET EVENT TERJUAL</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EBF3FF] text-[#2563EB]">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </span>
              </div>
              <p className="mt-3 text-2xl font-black text-[#1A1513]">86</p>
              <p className="mt-0.5 text-xs text-[#8C8074]">ICA Cat Show Bandung 2026</p>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-[#1A1513]">Dana masuk terakhir</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EEDFD5] text-[10px] font-bold uppercase tracking-wider text-[#8C8074]">
                    <th className="pb-3 pr-4">INVOICE</th>
                    <th className="pb-3 pr-4">PEMBAYAR</th>
                    <th className="pb-3 pr-4 text-right">JUMLAH</th>
                    <th className="pb-3 pr-4">METODE</th>
                    <th className="pb-3 pr-4">TANGGAL</th>
                    <th className="pb-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEDFD5]">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#FAF7F5]">
                      <td className="py-3.5 pr-4 font-semibold text-[#F05A1B]">{tx.invoice}</td>
                      <td className="py-3.5 pr-4">
                        <p className="font-bold text-[#1A1513]">{tx.payerName}</p>
                        <p className="text-[11px] text-[#8C8074]">{tx.description}</p>
                      </td>
                      <td className="py-3.5 pr-4 text-right font-bold text-[#1A1513]">{formatRupiah(tx.amount)}</td>
                      <td className="py-3.5 pr-4 text-[#574D45]">{tx.method}</td>
                      <td className="py-3.5 pr-4 text-[#574D45]">{tx.paidDate}</td>
                      <td className="py-3.5">
                        <PaymentStatusBadge status={tx.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Tab Content: Metode Pembayaran */}
      {activeTab === "metode" && <PaymentMethodsTab />}

      {/* Tab Content: Settlement */}
      {activeTab === "settlement" && <SettlementTab />}
    </main>
  );
}

// 2. Export default komponen utama yang membungkus komponen konten dengan PaymentProvider
export default function PaymentsPage() {
  return (
    <PaymentProvider>
      <PaymentsContent />
    </PaymentProvider>
  );
}