"use client";

import React, { useState } from "react";
import EventDetailDropdown from "./components/EventDetailDropdown";
import EventCheckoutView from "./components/EventCheckoutView";
import EventPaymentView from "./components/EventPaymentView";
import EventCatRegistrationView from "./components/EventCatRegistration";
import EventCatSubmittedView from "./components/EventCatSubmitted";
import { useToast } from "@/context/ToastContext";

type FlowStep =
  | "list"
  | "checkout"
  | "payment"
  | "cat-registration"
  | "cat-submitted";

export default function EventsPage() {
  const { showToast } = useToast();
  const [step, setStep] = useState<FlowStep>("list");
  const [openEventId, setOpenEventId] = useState<string | null>("1");

  const handlePaymentSuccess = () => {
    showToast("Pembayaran diterima.", "Slot Anda terkunci. Lanjut isi data kucing.");
    setStep("cat-registration");
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#2D2825] font-sans relative">
      <main className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        {step === "checkout" && (
          <EventCheckoutView
            onBack={() => setStep("list")}
            onNext={() => setStep("payment")}
          />
        )}

        {step === "payment" && (
          <EventPaymentView
            onBack={() => setStep("checkout")}
            onNext={handlePaymentSuccess}
          />
        )}

        {step === "cat-registration" && (
          <EventCatRegistrationView onNext={() => setStep("cat-submitted")} />
        )}

        {step === "cat-submitted" && (
          <EventCatSubmittedView
            onBackToEvent={() => setStep("list")}
            onEditCatData={() => setStep("cat-registration")}
          />
        )}

        {step === "list" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-[#1A1513]">
                Event &amp; Cat Show
              </h1>
              <p className="text-xs sm:text-sm text-[#7E7267] leading-relaxed max-w-3xl">
                Kuota tiket dibagi per kategori peserta. Akun cattery hanya bisa
                membeli dari kuota kategori{" "}
                <span className="font-semibold text-[#1A1513]">Cattery</span>.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#EEDFD5] p-4 sm:p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#FFF2E8] flex flex-col items-center justify-center shrink-0 border border-[#FCE3D2]">
                      <span className="text-lg font-black text-[#F05A1B] leading-none">18</span>
                      <span className="text-[10px] font-bold text-[#F05A1B] tracking-wider mt-0.5">OKT</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#EAF6ED] text-[#28844B]">
                          Pendaftaran dibuka
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#FFF4E5] text-[#C26D0A]">
                          2 slot tersisa
                        </span>
                      </div>
                      <h2 className="font-bold text-base text-[#1A1513]">ICA Cat Show Bandung 2026</h2>
                      <p className="text-xs text-[#8C8074]">
                        18–19 Okt 2026 · Trans Convention Center, Bandung · Rp 150.000
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenEventId(openEventId === "1" ? null : "1")}
                    className={`cursor-pointer rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-150 shrink-0 ${
                      openEventId === "1"
                        ? "border border-[#EEDFD5] bg-white text-[#574D45] hover:bg-[#FAF7F5]"
                        : "border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5"
                    }`}
                  >
                    {openEventId === "1" ? "Tutup detail" : "Ikut"}
                  </button>
                </div>

                {openEventId === "1" && (
                  <EventDetailDropdown eventId="1" onCheckout={() => setStep("checkout")} />
                )}
              </div>

              <div className="bg-white rounded-2xl border border-[#EEDFD5] p-4 sm:p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#FFF2E8] flex flex-col items-center justify-center shrink-0 border border-[#FCE3D2]">
                      <span className="text-lg font-black text-[#F05A1B] leading-none">04</span>
                      <span className="text-[10px] font-bold text-[#F05A1B] tracking-wider mt-0.5">NOV</span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#EAF6ED] text-[#28844B]">
                          Pendaftaran dibuka
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#F5EBE2] text-[#7E7267]">
                          Kuota Cattery
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#FEE2E2] text-[#DC2626]">
                          Kuota penuh
                        </span>
                      </div>
                      <h2 className="font-bold text-base text-[#1A1513]">ICA Kitten Fest Jakarta</h2>
                      <p className="text-xs text-[#8C8074]">4 Nov 2026 · Kuningan City Hall, Jakarta · Rp 120.000</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenEventId(openEventId === "2" ? null : "2")}
                    className={`cursor-pointer rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-150 shrink-0 ${
                      openEventId === "2"
                        ? "border border-[#EEDFD5] bg-white text-[#574D45] hover:bg-[#FAF7F5]"
                        : "border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5"
                    }`}
                  >
                    {openEventId === "2" ? "Tutup detail" : "Ikut"}
                  </button>
                </div>

                {openEventId === "2" && (
                  <EventDetailDropdown eventId="2" onCheckout={() => setStep("checkout")} />
                )}
              </div>

              <div className="bg-white rounded-2xl border border-[#EEDFD5] p-4 sm:p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#FFF2E8] flex flex-col items-center justify-center shrink-0 border border-[#FCE3D2]">
                      <span className="text-lg font-black text-[#F05A1B] leading-none">12</span>
                      <span className="text-[10px] font-bold text-[#F05A1B] tracking-wider mt-0.5">DES</span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#FFF4E5] text-[#C26D0A]">
                          Segera dibuka
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#F5EBE2] text-[#7E7267]">
                          Kuota Cattery
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#EAF6ED] text-[#28844B]">
                          20 slot tersisa
                        </span>
                      </div>
                      <h2 className="font-bold text-base text-[#1A1513]">Diklat Breeder Pemula — Batch 4</h2>
                      <p className="text-xs text-[#8C8074]">12–14 Des 2026 · Daring · Zoom · Rp 250.000</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenEventId(openEventId === "3" ? null : "3")}
                    className={`cursor-pointer rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-150 shrink-0 ${
                      openEventId === "3"
                        ? "border border-[#EEDFD5] bg-white text-[#574D45] hover:bg-[#FAF7F5]"
                        : "border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5"
                    }`}
                  >
                    {openEventId === "3" ? "Tutup detail" : "Ikut"}
                  </button>
                </div>

                {openEventId === "3" && (
                  <EventDetailDropdown eventId="3" onCheckout={() => setStep("checkout")} />
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}