"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { catteryItems } from "@/data/anggota";
import DashboardIcon from "@/components/anggota/DashboardIcon";

export default function DetailCatteryPage() {
  const params = useParams();
  const catteryId = Number(params?.id);

  const selectedCattery = catteryItems.find((item) => item.id === catteryId);

  const cattery = selectedCattery || {
    id: 1,
    name: "Auroria Cattery",
    status: "Terverifikasi",
    region: "Jawa Barat",
    breeds: ["Persian", "Exotic Shorthair"],
    score: 92,
    whatsapp: "6281234567890",
    address: "Jl. Cimanuk No. 24, Citarum, Bandung Wetan, Kota Bandung 40115",
  };

  const ownerName = "Dewi Anggraini";
  const regNo = "Reg. ICA-CTY-2021-0044";

  const cats = [
    { name: "Auroria Kimi", breed: "Persian", code: "PER n 22" },
    { name: "Auroria Yuki", breed: "Exotic", code: "EXO d 03" },
    { name: "Auroria Miso", breed: "Persian", code: "PER f 22" },
  ];

  const events = [
    {
      title: "ICA National Cat Show Bandung 2026",
      date: "16–17 Agu 2026 · Bandung · 4 kucing",
      badge: "Best in Show — Ring 3",
      badgeColor: "bg-[#EAF6ED] text-[#28844B]",
    },
    {
      title: "ICA Regional Cat Show Jakarta",
      date: "12 Apr 2026 · Jakarta · 3 kucing",
      badge: "Nominasi Ring 1 & 2",
      badgeColor: "bg-[#EBF3FF] text-[#1D5BD8]",
    },
    {
      title: "ICA Kitten Fest 2025",
      date: "09 Nov 2025 · Bandung · 2 kucing",
      badge: "Best Kitten Ring 1",
      badgeColor: "bg-[#EAF6ED] text-[#28844B]",
    },
  ];

  return (
    <main className="min-h-full bg-[var(--color-ink-50,#F8F6F2)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* Header Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-[#1A1513]">
          Detail Cattery
        </h1>

        {/* Back Link */}
        <Link
          href="/anggota/direktori"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F05A1B] hover:underline"
        >
          &lt; Kembali ke direktori
        </Link>

        {/* Main Card Detail Cattery */}
        <div className="overflow-hidden rounded-2xl border border-[#EEDFD5] bg-white shadow-xs">
          {/* Banner Placeholder */}
          <div className="flex h-48 sm:h-56 w-full flex-col items-center justify-center bg-[#FFF2E8] p-4 text-center border-b border-[#EEDFD5]">
            <div className="text-[#F05A1B]">
              <DashboardIcon name="home" size={32} />
            </div>
            <p className="mt-2 text-xs font-medium text-[#7E7267]">
              Foto tempat cattery belum diunggah
            </p>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {/* Header Profile Info */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF2E8] text-sm font-bold text-[#F05A1B]">
                  DA
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1A1513]">
                    {cattery.name}
                  </h2>
                  <p className="text-xs text-[#7E7267]">
                    Pemilik: {ownerName}
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-[#EAF6ED] px-3 py-1 text-xs font-semibold text-[#28844B]">
                {cattery.status}
              </span>
            </div>

            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[#EEDFD5] bg-[#FAF7F5] p-4">
                <p className="text-[11px] font-medium text-[#8C8074]">
                  Skor cattery
                </p>
                <p className="mt-1 text-2xl font-black text-[#F05A1B]">
                  {cattery.score}
                </p>
                <p className="mt-1 text-[10px] text-[#A09387]">
                  Diberikan admin ICA · read-only
                </p>
              </div>

              <div className="rounded-xl border border-[#EEDFD5] bg-[#FAF7F5] p-4">
                <p className="text-[11px] font-medium text-[#8C8074]">
                  Wilayah
                </p>
                <p className="mt-1 text-base font-bold text-[#1A1513]">
                  {cattery.region}
                </p>
                <p className="mt-1 text-[10px] text-[#A09387]">
                  {regNo}
                </p>
              </div>

              <div className="rounded-xl border border-[#EEDFD5] bg-[#FAF7F5] p-4">
                <p className="text-[11px] font-medium text-[#8C8074]">
                  Jumlah kucing terdaftar
                </p>
                <p className="mt-1 text-base font-bold text-[#1A1513]">
                  14 kucing
                </p>
                <p className="mt-1 text-[10px] text-[#A09387]">
                  Data profil cattery
                </p>
              </div>
            </div>

            {/* Breeds Section */}
            <div>
              <p className="text-xs font-semibold text-[#7E7267] mb-2">
                Ras kucing yang dimiliki
              </p>
              <div className="flex flex-wrap gap-2">
                {cattery.breeds.map((b) => (
                  <span
                    key={b}
                    className="rounded-lg bg-[#FFF2E8] border border-[#FCE3D2] px-3 py-1 text-xs font-semibold text-[#F05A1B]"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-[#7E7267]">Alamat</p>
                <p className="mt-1 text-xs font-medium text-[#1A1513]">
                  {cattery.address}
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  cattery.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#EEDFD5] bg-white px-4 py-2 text-xs font-semibold text-[#2D2825] transition hover:bg-[#FAF7F5]"
              >
                <DashboardIcon name="pin" size={14} />
                Buka di Google Maps
              </a>
            </div>

            {/* Actions Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3 border-t border-[#EEDFD5]">
              <a
                href={`https://wa.me/${cattery.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#34A853] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2e9649]"
              >
                <DashboardIcon name="chat" size={16} />
                Hubungi via WhatsApp
              </a>

              <Link
                href="/anggota/direktori"
                className="inline-flex items-center justify-center rounded-full bg-[#F4F1EC] px-5 py-2.5 text-xs font-semibold text-[#2D2825] transition hover:bg-[#EAE5DF]"
              >
                Cattery lain
              </Link>
            </div>
          </div>
        </div>

        {/* Section: Kucing di Cattery Ini */}
        <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#1A1513]">
            Kucing di cattery ini
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cats.map((cat, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-[#EEDFD5] bg-[#FAF7F5]"
              >
                <div className="flex h-28 w-full items-center justify-center bg-[#F2ECE6] text-[#A09387]">
                  <DashboardIcon name="home" size={24} />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-[#1A1513]">
                    {cat.name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#7E7267]">
                    {cat.breed} · {cat.code}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Riwayat Event */}
        <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1A1513]">
              Riwayat event
            </h3>
            <span className="text-[10px] text-[#A09387]">
              Diisi admin ICA · read-only
            </span>
          </div>

          <p className="text-xs text-[#7E7267]">
            Keikutsertaan cattery ini pada event resmi ICA.
          </p>

          <div className="space-y-3">
            {events.map((ev, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#EEDFD5] bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FAF7F5] border border-[#EEDFD5] text-[#F05A1B]">
                    <DashboardIcon name="home" size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1513]">
                      {ev.title}
                    </h4>
                    <p className="mt-0.5 text-[11px] text-[#8C8074]">
                      {ev.date}
                    </p>
                  </div>
                </div>

                <span
                  className={`self-start sm:self-center shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${ev.badgeColor}`}
                >
                  {ev.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}