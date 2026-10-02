"use client";

import React, { useEffect, useState } from "react";
import IcaBadgeCard from "@/components/event/IcaBadgeCard";
import EventCheckoutMobile from "@/components/event/EventCheckoutMobile";
import EventPaymentMobile from "@/components/event/EventPaymentMobile";
import EventCatRegistrationMobile from "@/components/event/EventCatRegistrationMobile";
import EventCatSubmittedMobile from "@/components/event/EventCatSubmittedMobile";

interface EventMobileProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function EventMobile({
  categories,
  activeCategory,
  setActiveCategory,
}: EventMobileProps) {
  const [activeTab, setActiveTab] = useState<"jadwal" | "riwayat">("jadwal");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const [mobileView, setMobileView] = useState<
    "event" | "checkout" | "payment" | "registration" | "submitted"
  >("event");

  const [secondsLeft, setSecondsLeft] = useState<number>(600);

  const eventsData = [
    {
      id: "1",
      displayDay: "18",
      monthLabel: "OKT",
      title: "ICA Cat Show Bandung 2026",
      date: "18–19 Okt 2026",
      location: "Trans Convention Center, Bandung",
      price: "Rp 150.000",
      paymentDeadline: "10:00 setelah checkout",
      topBadges: [
        {
          label: "Pendaftaran dibuka",
          color: "bg-[#EAF6ED] text-[#28844B]",
        },
        {
          label: "Cat Show",
          color: "bg-[#F2ECE6] text-[#63584E]",
        },
      ],
      bottomBadge: {
        label: "Sisa 8 dari 60",
        color: "bg-[#FFF4E5] text-[#C26D0A]",
      },
      detailBadges: [
        {
          label: "Pendaftaran dibuka",
          color: "bg-[#EAF6ED] text-[#28844B]",
        },
        {
          label: "Cat Show",
          color: "bg-[#F2ECE6] text-[#63584E]",
        },
        {
          label: "Sisa 8 slot dari 60",
          color: "bg-[#FFF4E5] text-[#C26D0A]",
        },
      ],
      isFull: false,
      quotaUmum: "6 / 80",
      quotaMember: "8 / 60",
      quotaCattery: "2 / 50",
      quotaSponsor: "6 / 10",
      description:
        "Penilaian juri FIFe. Nomor meja dan denah area diatur admin ICA. Nomor meja (benching) dibagikan admin ICA 3 hari sebelum event.",
    },
    {
      id: "2",
      displayDay: "4",
      monthLabel: "NOV",
      title: "ICA Kitten Fest Jakarta",
      date: "4 Nov 2026",
      location: "Kuningan City Hall, Jakarta",
      price: "Rp 120.000",
      paymentDeadline: "10:00 setelah checkout",
      topBadges: [
        {
          label: "Pendaftaran dibuka",
          color: "bg-[#EAF6ED] text-[#28844B]",
        },
        {
          label: "Cat Show",
          color: "bg-[#F2ECE6] text-[#63584E]",
        },
      ],
      bottomBadge: {
        label: "Kuota penuh",
        color: "bg-[#FEE2E2] text-[#DC2626]",
      },
      detailBadges: [
        {
          label: "Pendaftaran dibuka",
          color: "bg-[#EAF6ED] text-[#28844B]",
        },
        {
          label: "Cat Show",
          color: "bg-[#F2ECE6] text-[#63584E]",
        },
        {
          label: "Kuota penuh",
          color: "bg-[#FEE2E2] text-[#DC2626]",
        },
      ],
      isFull: true,
      quotaUmum: "12 / 60",
      quotaMember: "0 / 40",
      quotaCattery: "3 / 30",
      quotaSponsor: "2 / 8",
      description:
        "Penilaian juri FIFe khusus kelas kitten. Benching dibagi per ring kitten.",
    },
  ];

  const mockHistory = [
    {
      id: "h1",
      title: "ICA National Cat Show Bandung 2026",
      meta: "16 Agu 2026 · Bandung · Peserta · 2 kucing",
      badge: "Best in Show — Ring 3",
    },
    {
      id: "h2",
      title: "Diklat Breeder Pemula — Batch 3",
      meta: "12 Jul 2026 · Daring · Peserta diklat",
      badge: "Badge diterbitkan",
    },
  ];

  const selectedEvent =
    eventsData.find((ev) => ev.id === selectedEventId) || eventsData[0];

  useEffect(() => {
    if (
      mobileView === "event" ||
      mobileView === "registration" ||
      mobileView === "submitted" ||
      secondsLeft <= 0
    ) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [mobileView, secondsLeft]);

  // ============================================================
  // MOBILE CHECKOUT
  // ============================================================
  if (mobileView === "checkout") {
    return (
      <EventCheckoutMobile
        secondsLeft={secondsLeft}
        onBack={() => {
          setMobileView("event");
          setSecondsLeft(600);
        }}
        onNext={() => {
          setMobileView("payment");
        }}
      />
    );
  }

  // ============================================================
  // MOBILE PAYMENT
  // ============================================================
  if (mobileView === "payment") {
    return (
      <EventPaymentMobile
        secondsLeft={secondsLeft}
        setSecondsLeft={setSecondsLeft}
        onBack={() => {
          setMobileView("checkout");
        }}
        onNext={() => {
          setMobileView("registration");
        }}
      />
    );
  }

  // ============================================================
  // MOBILE CAT REGISTRATION
  // ============================================================
  if (mobileView === "registration") {
    return (
      <EventCatRegistrationMobile
        onNext={() => {
          setMobileView("submitted");
        }}
      />
    );
  }

  // ============================================================
  // MOBILE CAT SUBMITTED
  // ============================================================
  if (mobileView === "submitted") {
    return (
      <EventCatSubmittedMobile
        onBackToEvent={() => {
          setMobileView("event");
          setSelectedEventId(null);
          setSecondsLeft(600);
        }}
        onEditCatData={() => {
          setMobileView("registration");
        }}
      />
    );
  }

  return (
    <div className="relative block sm:hidden w-full bg-[#F7F5F0] font-sans min-h-screen">
      {/* ========================================================= */}
      {/* MAIN VIEW: TAB JADWAL & RIWAYAT SAYA                     */}
      {/* ========================================================= */}
      <div className="px-4 space-y-3 pb-24 pt-4">
        {/* Toggle Pills */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("jadwal")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === "jadwal"
                ? "bg-[#FFF2E8] text-[#D96B27] border border-[#FADEC9]"
                : "bg-white text-[#857B72] border border-[#EAE5DF]"
            }`}
          >
            Jadwal
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("riwayat")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === "riwayat"
                ? "bg-[#FFF2E8] text-[#D96B27] border border-[#FADEC9]"
                : "bg-white text-[#857B72] border border-[#EAE5DF]"
            }`}
          >
            Riwayat saya
          </button>
        </div>

        {activeTab === "jadwal" ? (
          <div className="space-y-3 pt-1">
            {/* Box Keterangan Kuota */}
            <div className="rounded-2xl border border-[#FADEC9] bg-[#FFF8F2] p-3.5 text-xs text-[#857B72] leading-relaxed">
              Kuota tiket dibagi per kategori peserta. Akun member hanya bisa
              membeli dari kuota kategori{" "}
              <span className="font-bold text-[#1F1B18]">Member</span>.
            </div>

            {/* Filter Kategori Horizontal */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-[#FFF2E8] text-[#D96B27] font-bold border border-[#FADEC9]"
                      : "bg-white text-[#857B72] border border-[#EAE5DF]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <IcaBadgeCard />

            {/* Daftar Event Card */}
            <div className="space-y-3">
              {eventsData.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEventId(ev.id)}
                  className="rounded-2xl border border-[#EAE5DF] bg-white p-4 shadow-xs cursor-pointer active:scale-98 transition-transform"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#FFF8F2] flex flex-col items-center justify-center shrink-0 border border-[#FADEC9]/60">
                      <span className="text-xl font-black text-[#D96B27] leading-none">
                        {ev.displayDay}
                      </span>

                      <span className="text-[10px] font-bold text-[#D96B27] tracking-wider mt-1">
                        {ev.monthLabel}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {ev.topBadges.map((b, idx) => (
                          <span
                            key={idx}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${b.color}`}
                          >
                            {b.label}
                          </span>
                        ))}
                      </div>

                      <h2 className="font-bold text-sm text-[#1F1B18] leading-snug">
                        {ev.title}
                      </h2>

                      <p className="text-[11px] text-[#857B72] leading-tight">
                        {ev.date} · {ev.location}
                      </p>

                      {ev.bottomBadge && (
                        <div className="pt-1">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-semibold ${ev.bottomBadge.color}`}
                          >
                            {ev.bottomBadge.label}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            {mockHistory.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#EAE5DF] bg-[#FAF8F5] p-4 shadow-xs space-y-2"
              >
                <h3 className="text-xs font-bold text-[#1F1B18]">
                  {item.title}
                </h3>

                <p className="text-[10px] text-[#857B72]">{item.meta}</p>

                <span className="inline-block rounded-md px-2.5 py-0.5 text-[10px] font-semibold bg-[#E8F5E9] text-[#2E7D32]">
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* SLIDE OVER PANEL: DETAIL EVENT                           */}
      {/* ========================================================= */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-[56px] z-40 bg-[#F7F5F0] flex flex-col transition-transform duration-300 ease-in-out ${
          selectedEventId ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="shrink-0 bg-[#F7F5F0] px-5 pt-10 pb-3 z-10">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => setSelectedEventId(null)}
              className="text-[#D96B27] active:opacity-60 cursor-pointer shrink-0"
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

            <div className="min-w-0">
              <h2 className="text-base font-bold text-[#1F1B18] leading-tight truncate">
                {selectedEvent.title}
              </h2>

              <p className="text-[11px] text-[#857B72] mt-0.5">
                {selectedEvent.date}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 space-y-4 pb-6 scrollbar-none">
          {/* Badge Status */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {selectedEvent.detailBadges.map((b, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-md text-[10px] font-semibold ${b.color}`}
              >
                {b.label}
              </span>
            ))}
          </div>

          {/* Kartu Detail Informasi Event */}
          <div className="rounded-2xl bg-white p-4 border border-[#EAE5DF] space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2.5 border-b border-[#F4EFEA]">
              <span className="text-[#857B72]">Tanggal</span>

              <span className="font-bold text-[#1F1B18]">
                {selectedEvent.date}
              </span>
            </div>

            <div className="flex justify-between items-center pb-2.5 border-b border-[#F4EFEA]">
              <span className="text-[#857B72]">Lokasi</span>

              <span className="font-semibold text-[#1F1B18] text-right">
                {selectedEvent.location}
              </span>
            </div>

            <div className="flex justify-between items-center pb-2.5 border-b border-[#F4EFEA]">
              <span className="text-[#857B72]">Harga per slot</span>

              <span className="font-bold text-[#1F1B18]">
                {selectedEvent.price}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#857B72]">Batas bayar</span>

              <span className="font-semibold text-[#1F1B18]">
                {selectedEvent.paymentDeadline}
              </span>
            </div>
          </div>

          {/* Kartu Progress Kuota */}
          <div className="rounded-2xl bg-white p-4 border border-[#EAE5DF] space-y-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-[#1F1B18]">
              Kuota per kategori peserta
            </h3>

            {/* Umum */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#1F1B18]">Umum</span>

                <span className="text-[#857B72] font-semibold">
                  {selectedEvent.quotaUmum}
                </span>
              </div>

              <div className="h-1.5 w-full bg-[#EAE5DF] rounded-full overflow-hidden">
                <div className="h-full bg-[#857B72] w-1/5 rounded-full" />
              </div>

              <p className="text-[10px] text-[#A09387]">
                Tidak tersedia untuk akun member.
              </p>
            </div>

            {/* Member */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#1F1B18]">Member</span>

                <span
                  className={`font-bold ${
                    selectedEvent.isFull
                      ? "text-[#DC2626]"
                      : "text-[#D96B27]"
                  }`}
                >
                  {selectedEvent.quotaMember}
                </span>
              </div>

              <div className="h-1.5 w-full bg-[#EAE5DF] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    selectedEvent.isFull
                      ? "bg-[#DC2626]"
                      : "bg-[#D96B27]"
                  } ${selectedEvent.isFull ? "w-full" : "w-[15%]"}`}
                />
              </div>

              <p className="text-[10px] text-[#857B72]">
                Kuota yang bisa Anda beli.
              </p>
            </div>

            {/* Cattery */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#1F1B18]">Cattery</span>

                <span className="text-[#857B72] font-semibold">
                  {selectedEvent.quotaCattery}
                </span>
              </div>

              <div className="h-1.5 w-full bg-[#EAE5DF] rounded-full overflow-hidden">
                <div className="h-full bg-[#857B72] w-1/12 rounded-full" />
              </div>

              <p className="text-[10px] text-[#A09387]">
                Tidak tersedia untuk akun member.
              </p>
            </div>

            {/* Sponsor */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#1F1B18]">Sponsor</span>

                <span className="text-[#857B72] font-semibold">
                  {selectedEvent.quotaSponsor}
                </span>
              </div>

              <div className="h-1.5 w-full bg-[#EAE5DF] rounded-full overflow-hidden">
                <div className="h-full bg-[#857B72] w-1/3 rounded-full" />
              </div>

              <p className="text-[10px] text-[#A09387]">
                Tidak tersedia untuk akun member.
              </p>
            </div>
          </div>

          {/* Kartu Deskripsi */}
          <div className="rounded-2xl bg-white p-4 border border-[#EAE5DF] space-y-1.5 text-xs">
            <p className="text-[10px] font-bold tracking-wider text-[#A09387]">
              JENIS EVENT · CAT SHOW
            </p>

            <p className="text-[#1F1B18] leading-relaxed">
              {selectedEvent.description}
            </p>
          </div>

          {selectedEvent.isFull && (
            <div className="rounded-2xl bg-[#FEF2F2] p-4 border border-[#FECACA] text-xs text-[#DC2626] leading-relaxed">
              Kuota kategori Member untuk event ini penuh. Slot bisa terbuka
              lagi kalau ada peserta yang gagal membayar sebelum batas waktu.
            </div>
          )}
        </div>

        {/* Bottom Action */}
        <div className="shrink-0 bg-[#F7F5F0] border-t border-[#EAE5DF]/60 px-5 pt-3 pb-3 z-10">
          <div className="space-y-1.5">
            <button
              type="button"
              disabled={selectedEvent.isFull}
              onClick={() => {
                setSecondsLeft(600);
                setMobileView("checkout");
              }}
              className={`w-full rounded-full border-t px-5 py-3.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 active:translate-y-0 active:shadow-xs ${
                selectedEvent.isFull
                  ? "cursor-not-allowed border-[#FECACA] bg-[#FCA5A5] shadow-none"
                  : "cursor-pointer border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)]"
              }`}
            >
              Ikut event — lanjut checkout
            </button>

            <p className="text-center text-[10px] text-[#857B72]">
              Slot ditahan begitu Anda masuk checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}