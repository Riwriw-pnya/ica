"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { catteryItems, eventListItems, newsItems, initialNotifications } from "@/data/anggota";
import NewsThumbnail from "@/components/anggota/NewsThumbnail";
import MobileNotification from "@/components/anggota/MobileNotification";
import type { NotificationItem } from "@/types/cattery";

interface ProductItem {
  id: string;
  title: string;
  price: number;
  image?: string;
}

const storeProducts: ProductItem[] = [
  {
    id: "1",
    title: "Kaos ICA Official 2026",
    price: 185000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9RVxIUO5Rb9G1qfWawYCygc5ru_KMrPrnfW1ezYp2Nj4hxUnixmyS7mM&s",
  },
  {
    id: "2",
    title: "Polo Shirt Panitia Cat Show",
    price: 245000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMTdyhgBoM0uyNqIAI9S_TI68hvitWb0yu2vz8R9WetQ&s=10",
  },
  {
    id: "3",
    title: "Tote Bag Kanvas ICA",
    price: 95000,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80",
  },
];

function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default function DashboardMobile() {
  const displayedProducts = storeProducts.slice(0, 3);
  
  // State notifikasi khusus mobile dashboard
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const handleMarkOneRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  return (
    <div className="w-full pb-20 font-sans text-[#1F1B18]">

      {/* HEADER ORANGE */}
      <div className="space-y-4 rounded-b-[32px] bg-gradient-to-b from-[#FFA25B] to-[#F2782B] px-4 pb-6 pt-5 shadow-md">

        {/* PROFILE */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white/40 bg-[#FCE3D2] text-xs font-bold text-[#D96B27] shadow-sm">
              AP
            </div>

            <div>
              <p className="text-[11px] font-medium leading-tight text-white/90">
                Selamat pagi,
              </p>
              <h1 className="text-base font-bold leading-snug text-white">
                Ayu Prameswari
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-[#EE6B2B]">
              Member
            </span>

            {/* Tombol Lonceng Notifikasi */}
<button
  type="button"
  onClick={() => setIsNotificationOpen(true)} // <-- Ubah dari setIsMobileNotifOpen menjadi setIsNotificationOpen
  aria-label="Notifikasi"
  className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-sm cursor-pointer hover:bg-white/30 transition"
>
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
  </svg>

  {unreadCount > 0 && (
    <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-white bg-[#E11D48]" />
  )}
  </button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari cattery, ras kucing, atau event"
            className="w-full rounded-2xl bg-white py-3 pl-10 pr-4 text-xs font-medium text-[#1F1B18] shadow-sm outline-none placeholder:text-[#A0958B]"
          />

          <svg
            className="absolute left-3.5 top-3.5 h-4 w-4 text-[#A0958B]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* QUICK ACCESS */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {[
            { title: "Cari cattery", href: "/anggota/direktori", icon: "search" },
            { title: "Event dan lomba", href: "/anggota/event", icon: "calendar" },
            { title: "Kartu saya", href: "/anggota/keanggotaan", icon: "card" },
            { title: "Store ICA", href: "/anggota/store", icon: "store" },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex min-h-[82px] flex-col items-center justify-between rounded-2xl bg-white p-2.5 text-center shadow-2xs"
            >
              <div className="mt-0.5 flex h-7 w-7 items-center justify-center text-[#EE6B2B]">
                {item.icon === "search" && (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
                {item.icon === "calendar" && (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                {item.icon === "card" && (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2zM8 12h4" />
                  </svg>
                )}
                {item.icon === "store" && (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                )}
              </div>
              <span className="text-[10px] font-bold leading-tight text-[#1F1B18]">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* MEMBER CARD */}
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-[24px] border border-[#FADEC9] bg-gradient-to-br from-[#FFF2E8] to-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85A17]">
              KARTU MEMBER ICA
            </span>
            <span className="rounded-full bg-[#DCF2E4] px-2.5 py-0.5 text-[10px] font-bold text-[#1E7E43]">
              Aktif
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#FADEC9] bg-white text-xs font-bold text-[#D96B27]">
              AP
            </div>
            <div>
              <h2 className="text-base font-bold text-[#3D2314]">
                Ayu Prameswari
              </h2>
              <p className="mt-0.5 text-[11px] font-medium text-[#857B72]">
                ICA-M-004821 · Jawa Barat
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between border-t border-[#F3E6DC] pt-3">
            <div>
              <p className="text-[10px] font-medium text-[#857B72]">
                Berlaku hingga
              </p>
              <p className="mt-0.5 text-xs font-bold text-[#111111]">
                31 Agu 2026
              </p>
            </div>
            <Link href="/anggota/keanggotaan" className="flex items-center gap-0.5 text-xs font-bold text-[#EE6B2B]">
              Lihat detail <span className="text-base">›</span>
            </Link>
          </div>
        </div>
      </div>

      {/* CATTERY TERVERIFIKASI */}
      <section className="pt-5">
        <div className="flex items-end justify-between px-4">
          <div>
            <h3 className="text-base font-bold text-[#111111]">Cattery terverifikasi</h3>
            <p className="mt-0.5 text-[11px] font-medium text-[#857B72]">Indukan sehat, silsilah lengkap, diakui FIFe</p>
          </div>
          <Link href="/anggota/direktori" className="mb-0.5 text-xs font-bold text-[#EE6B2B]">Semua</Link>
        </div>

        <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none">
          {catteryItems.slice(0, 2).map((item) => (
            <div key={item.id} className="w-[214px] shrink-0 rounded-[18px] border border-[#EAE5DF] bg-white p-3 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FCE3D2] text-xs font-bold text-[#B64E16]">
                  {item.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="truncate text-xs font-bold text-[#111111]">{item.name}</h4>
                  <p className="text-[10px] font-medium text-[#857B72]">{item.region}</p>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {item.breeds.map((breed) => (
                  <span key={breed} className="rounded-md bg-[#F2EEEA] px-2 py-0.5 text-[10px] font-medium text-[#59524C]">
                    {breed}
                  </span>
                ))}
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-[#F1ECE7] pt-2">
                <span className="rounded-full bg-[#DCF2E4] px-2.5 py-0.5 text-[10px] font-bold text-[#18743B]">Terverifikasi</span>
                <span className="text-[10px] font-medium text-[#3E3732]">Skor <strong className="text-xs text-[#111111]">{item.score}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="px-4 pt-5">
        <Link href="/anggota/leaderboard" className="flex items-center justify-between rounded-[18px] border border-[#EAE5DF] bg-white px-3.5 py-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF2E5] text-[#E85F17]">
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM5 4h2v3a5 5 0 01-4-5v-1h4M19 4h-2v3a5 5 0 004-5v-1h-4" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#111111]">Leaderboard skor kucing</h3>
              <p className="mt-0.5 max-w-[235px] text-[10px] leading-tight text-[#857B72]">Peringkat musim 2026 · diisi komite penjurian</p>
            </div>
          </div>
          <span className="text-xl font-light text-[#A0958B]">›</span>
        </Link>
      </section>

      {/* EVENT MENDATANG */}
      <section className="pt-6">
        <div className="flex items-center justify-between px-4">
          <h3 className="text-base font-bold text-[#111111]">Event mendatang</h3>
          <Link href="/anggota/event" className="text-xs font-bold text-[#EE6B2B]">Semua</Link>
        </div>

        <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none">
          {eventListItems.map((event) => (
            <Link key={event.id} href={`/anggota/event/${event.id}`} className="w-[222px] shrink-0 rounded-[18px] border border-[#EAE5DF] bg-white p-3.5 shadow-2xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[#FFF4E8] text-[#D95D1E]">
                  <span className="text-sm font-bold leading-none">{event.day}</span>
                  <span className="mt-0.5 text-[9px] font-semibold">{event.month}</span>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${event.status === "Pendaftaran dibuka" ? "bg-[#E5F5EB] text-[#247542]" : "bg-[#FCF0D9] text-[#A56A10]"}`}>
                  {event.status}
                </span>
              </div>
              <h4 className="mt-3 text-sm font-bold leading-snug text-[#111111]">{event.title}</h4>
              <p className="mt-1 text-[10px] font-medium text-[#857B72]">{event.location} · Kuota {event.quota}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* BERITA TERBARU */}
      <section className="px-4 pt-6">
        <div className="rounded-[18px] border border-[#EAE5DF] bg-white px-3.5 py-3 shadow-2xs">
          <div className="flex items-center justify-between px-0.5">
            <h3 className="text-sm font-bold text-[#111111]">Berita terbaru</h3>
            <Link href="/anggota/berita" className="text-xs font-bold text-[#EE6B2B]">Semua</Link>
          </div>

          <div className="mt-2">
            {newsItems.slice(0, 3).map((item, index) => {
              const isExternal = item.href?.startsWith("http");

              return (
                <Link
                  key={item.id}
                  href={item.href || "#"}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-3 py-3 ${
                    index !== newsItems.slice(0, 3).length - 1
                      ? "border-b border-[#EEE9E4]"
                      : ""
                  }`}
                >
                  <NewsThumbnail href={item.href} title={item.title} />

                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-2 text-xs font-bold leading-snug text-[#111111]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-[10px] font-medium text-[#91877F]">
                      {item.category} · {item.date}
                    </p>
                  </div>

                  <span className="text-lg font-light text-[#A0958B]">›</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* STORE ICA */}
      <section className="pt-6">
        <div className="flex items-center justify-between px-4">
          <div>
            <h3 className="text-sm font-bold text-[#111111]">Store ICA</h3>
            <p className="mt-1 text-[10px] font-medium text-[#857B72]">
              Pengiriman dari sekretariat setelah pembayaran terverifikasi.
            </p>
          </div>
          <Link href="/anggota/store" className="text-xs font-bold text-[#EE6B2B]">Semua</Link>
        </div>

        <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-none">
          {displayedProducts.map((product) => (
            <Link
              key={product.id}
              href="/anggota/store"
              className="w-[130px] shrink-0 overflow-hidden rounded-[16px] border border-[#EAE5DF] bg-white shadow-2xs"
            >
              <div className="relative h-[84px] w-full bg-[#FFF5EA]">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#C8BDB2]">
                    <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <h4 className="line-clamp-2 min-h-[28px] text-[10px] font-bold leading-tight text-[#111111]">
                  {product.title}
                </h4>
                <p className="mt-1.5 text-[10px] font-bold text-[#D95D1E]">
                  {formatRupiah(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* (Bottom Nav lokal & MobileNotification lokal SUDAH DIHAPUS karena ditangani AnggotaLayout & Context) */}

    </div>
  );
}