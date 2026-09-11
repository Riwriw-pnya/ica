"use client";

import React, { useState } from "react";
import EventDetailDropdown from "./components/EventDetailDropdown";
import EventCheckoutView from "./components/EventCheckoutView";
import EventPaymentView from "./components/EventPaymentView";
import EventCatRegistrationView from "./components/EventCatRegistration";
import EventCatSubmittedView from "./components/EventCatSubmitted";
import IcaBadgeCard from "./components/IcaBadgeCard";
import { useToast } from "@/context/ToastContext";

type FlowStep =
  | "list"
  | "checkout"
  | "payment"
  | "cat-registration"
  | "cat-submitted";

const categories = [
  "Semua event",
  "Diklat Cattery",
  "Diklat Grooming",
  "Cat Show",
  "Propaganda",
];

// 1. Definisikan Data Event dengan Kategori
const eventsData = [
  {
    id: "1",
    date: "18",
    month: "OKT",
    title: "ICA Cat Show Bandung 2026",
    subtitle: "18–19 Okt 2026 · Trans Convention Center, Bandung · Rp 150.000",
    category: "Cat Show",
    statusTag: { text: "Pendaftaran dibuka", bg: "bg-[#EAF6ED]", color: "text-[#28844B]" },
    quotaTag: { text: "2 slot tersisa", bg: "bg-[#FFF4E5]", color: "text-[#C26D0A]" },
  },
  {
    id: "2",
    date: "04",
    month: "NOV",
    title: "ICA Kitten Fest Jakarta",
    subtitle: "4 Nov 2026 · Kuningan City Hall, Jakarta · Rp 120.000",
    category: "Cat Show",
    statusTag: { text: "Pendaftaran dibuka", bg: "bg-[#EAF6ED]", color: "text-[#28844B]" },
    quotaTag: { text: "Kuota penuh", bg: "bg-[#FEE2E2]", color: "text-[#DC2626]" },
  },
  {
    id: "3",
    date: "12",
    month: "DES",
    title: "Diklat Breeder Pemula — Batch 4",
    subtitle: "12–14 Des 2026 · Daring · Zoom · Rp 250.000",
    category: "Diklat Cattery",
    statusTag: { text: "Segera dibuka", bg: "bg-[#FFF4E5]", color: "text-[#C26D0A]" },
    quotaTag: { text: "20 slot tersisa", bg: "bg-[#EAF6ED]", color: "text-[#28844B]" },
  },
];

export default function EventsPage() {
  const { showToast } = useToast();
  const [step, setStep] = useState<FlowStep>("list");
  const [openEventId, setOpenEventId] = useState<string | null>("1");
  const [activeCategory, setActiveCategory] = useState("Semua event");

  const handlePaymentSuccess = () => {
    showToast("Pembayaran diterima.", "Slot Anda terkunci. Lanjut isi data kucing.");
    setStep("cat-registration");
  };

  // 2. Filter Event Sesuai Kategori Aktif
  const filteredEvents = eventsData.filter((event) => {
    if (activeCategory === "Semua event") return true;
    return event.category === activeCategory;
  });

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
                Slot ditahan sementara saat checkout dan dilepas otomatis kalau pembayaran melewati batas waktu.
              </p>
            </div>

            {/* Filter Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-[#FFF2E8] text-[#F05A1B] border border-[#FCE3D2] font-semibold"
                      : "bg-white text-[#7E7267] border border-[#EEDFD5] hover:bg-[#FAF7F5]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Component Badge Card */}
            <IcaBadgeCard />

            {/* Event List Terfilter */}
            <div className="space-y-4">
              {filteredEvents.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#EEDFD5] p-8 text-center text-xs text-[#8C8074]">
                  Belum ada event untuk kategori <span className="font-bold text-[#1A1513]">{activeCategory}</span>.
                </div>
              ) : (
                filteredEvents.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-[#EEDFD5] p-4 sm:p-5 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#FFF2E8] flex flex-col items-center justify-center shrink-0 border border-[#FCE3D2]">
                          <span className="text-lg font-black text-[#F05A1B] leading-none">
                            {item.date}
                          </span>
                          <span className="text-[10px] font-bold text-[#F05A1B] tracking-wider mt-0.5">
                            {item.month}
                          </span>
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            <span
                              className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${item.statusTag.bg} ${item.statusTag.color}`}
                            >
                              {item.statusTag.text}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#F5EBE2] text-[#7E7267]">
                              {item.category}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#F5EBE2] text-[#7E7267]">
                              Kuota Cattery
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${item.quotaTag.bg} ${item.quotaTag.color}`}
                            >
                              {item.quotaTag.text}
                            </span>
                          </div>
                          <h2 className="font-bold text-base text-[#1A1513]">
                            {item.title}
                          </h2>
                          <p className="text-xs text-[#8C8074]">{item.subtitle}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setOpenEventId(openEventId === item.id ? null : item.id)
                        }
                        className={`cursor-pointer rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-150 shrink-0 ${
                          openEventId === item.id
                            ? "border border-[#EEDFD5] bg-white text-[#574D45] hover:bg-[#FAF7F5]"
                            : "border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5"
                        }`}
                      >
                        {openEventId === item.id ? "Tutup detail" : "Ikut"}
                      </button>
                    </div>

                    {openEventId === item.id && (
                      <EventDetailDropdown
                        eventId={item.id}
                        onCheckout={() => setStep("checkout")}
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}