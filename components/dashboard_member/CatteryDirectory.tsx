"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DashboardIcon from "./DashboardIcon";
import type { CatteryItem } from "@/types/dashboard_member";

interface CatteryDirectoryProps {
  items: CatteryItem[];
}

export default function CatteryDirectory({ items }: CatteryDirectoryProps) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("Semua wilayah");
  const [breed, setBreed] = useState("Semua ras");
  const [sortBy, setSortBy] = useState("Skor cattery tertinggi");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const regions = useMemo(
    () => ["Semua wilayah", ...Array.from(new Set(items.map((i) => i.region)))],
    [items],
  );

  const breeds = useMemo(
    () => ["Semua ras", ...Array.from(new Set(items.flatMap((i) => i.breeds)))],
    [items],
  );

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      const matchSearch =
        search.trim() === "" ||
        item.name.toLowerCase().includes(search.toLowerCase());
      const matchRegion = region === "Semua wilayah" || item.region === region;
      const matchBreed = breed === "Semua ras" || item.breeds.includes(breed);
      return matchSearch && matchRegion && matchBreed;
    });

    if (sortBy === "Skor cattery tertinggi") {
      result = [...result].sort((a, b) => b.score - a.score);
    } else if (sortBy === "Nama A-Z") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [items, search, region, breed, sortBy]);

  const handleReset = () => {
    setSearch("");
    setRegion("Semua wilayah");
    setBreed("Semua ras");
    setSortBy("Skor cattery tertinggi");
  };

  return (
    <>
      <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5 shadow-md">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-400)]">
            <DashboardIcon name="search" size={16} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama cattery atau pemilik..."
            className="w-full rounded-lg border border-[var(--color-ink-100)] py-2.5 pl-9 pr-3 text-[13px] text-[var(--color-ink-900)] outline-none transition focus:border-[var(--color-brand-orange-300)]"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="text-[12px] font-medium text-[var(--color-ink-700)]">
              Wilayah
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[12px] font-medium text-[var(--color-ink-700)]">
              Ras kucing
            </label>
            <select
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
            >
              {breeds.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[12px] font-medium text-[var(--color-ink-700)]">
              Urutkan
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
            >
              <option>Skor cattery tertinggi</option>
              <option>Nama A-Z</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[12px] text-[var(--color-ink-400)]">
            {filteredItems.length} cattery ditemukan
          </p>
          <button
            onClick={handleReset}
            className="rounded-lg border border-[var(--color-ink-100)] px-3 py-1.5 text-[12px] font-medium text-[var(--color-ink-700)] transition hover:bg-[var(--color-brand-orange-50) hover:border-[var(--color-brand-orange-300)]"
          >
            Reset filter
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-[var(--color-ink-100)] bg-white"
            >
              <div className="flex items-center gap-3 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)]">
                  <DashboardIcon name="home" size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-[14px] font-semibold text-[var(--color-ink-900)]">
                      {item.name}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        item.status === "Terverifikasi"
                          ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
                          : "bg-[var(--color-warning-bg)] text-[var(--color-warning)]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-0.5 flex items-center gap-1 text-[12px] text-[var(--color-ink-700)]">
                    <DashboardIcon name="pin" size={12} />
                    {item.region} · {item.breeds.join(", ")}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <div className="text-right">
                    <p className="text-[9px] font-medium uppercase tracking-wide text-[var(--color-ink-400)]">
                      Skor
                    </p>
                    <p className="text-[15px] font-semibold text-[var(--color-brand-orange-700)]">
                      {item.score}
                    </p>
                  </div>

                <a
                    href={`https://wa.me/${item.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-success)] text-[var(--color-success)] transition hover:bg-[var(--color-success-bg)]"
                    aria-label={`Chat WhatsApp ${item.name}`}
                  >
                    <DashboardIcon name="chat" size={16} />
                  </a>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-ink-100)] text-[var(--color-ink-700)] transition cursor-pointer"
                    aria-label="Lihat detail"
                  >
                    <span className={`inline-block transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                      <DashboardIcon name="chevron" size={14} />
                    </span>
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-[var(--color-ink-100)] bg-[var(--color-ink-50)] px-4 py-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] text-[var(--color-ink-400)]">Alamat lengkap</p>
                      <p className="mt-1 text-[13px] text-[var(--color-ink-900)]">{item.address}</p>
                    </div>

                    <div>
                      <p className="text-[11px] text-[var(--color-ink-400)]">Ras kucing yang dimiliki</p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {item.breeds.map((b) => (
                          <span
                            key={b}
                            className="rounded-full bg-[var(--color-brand-orange-100)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-brand-orange-900)]"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-[var(--color-ink-100)] bg-white px-4 py-2 text-[12px] font-medium text-[var(--color-ink-700)] transition hover:bg-[var(--color-brand-orange-50)]"
                    >
                      <DashboardIcon name="pin" size={14} />
                      Buka di Google Maps
                    </a>

                    <a
                      href={`https://wa.me/${item.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-[var(--color-success)] bg-[var(--color-success-bg)] px-4 py-2 text-[12px] font-medium text-[var(--color-success)] transition hover:brightness-95"
                    >
                      <DashboardIcon name="chat" size={14} />
                      Cek WhatsApp {item.whatsapp}
                    </a>

                    <Link
                      href={item.href}
                      className="text-[12px] font-medium text-[var(--color-brand-orange-700)] hover:underline"
                    >
                      Lihat detail cattery →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <p className="mt-8 text-center text-[12px] text-[var(--color-ink-400)]">
          Tidak ada cattery yang cocok dengan filter ini.
        </p>
      )}
    </>
    );
}