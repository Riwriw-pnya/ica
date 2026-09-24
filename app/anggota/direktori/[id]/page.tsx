"use client";

import { useParams } from "next/navigation";
import { catteryItems } from "@/data/anggota";
import CatteryDetailMobile from "@/app/anggota/direktori/components/CatteryDetailMobile";
import CatteryDetailDesktop from "@/app/anggota/direktori/components/CatteryDetailDesktop";

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
    <>
      {/* Tampilan khusus Mobile (sm:hidden) */}
      <CatteryDetailMobile
        cattery={cattery}
        ownerName={ownerName}
        regNo={regNo}
        cats={cats}
        events={events}
      />

      {/* Tampilan khusus Desktop (hidden sm:block) */}
      <CatteryDetailDesktop
        cattery={cattery}
        ownerName={ownerName}
        regNo={regNo}
        cats={cats}
        events={events}
      />
    </>
  );
}