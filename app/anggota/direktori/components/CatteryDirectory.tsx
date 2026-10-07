"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import DashboardIcon from "../../../../components/anggota/DashboardIcon";
import type { CatteryItem } from "@/types/anggota";
import CatteryCardMobile from "./CatteryCardMobile";
import CatteryBottomSheetFilter from "./CatteryBottomSheetFilter";

interface CatteryDirectoryProps {
  items: CatteryItem[];
}

type ViewMode = "list" | "grid";
type PhotoSliderMode = "grid" | "list";

function FilterIconCustom() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  );
}

function ListViewIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </svg>
  );
}

function GridViewIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

const catteryPhotos: Record<number, string[]> = {
  1: [
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85",
  ],
  2: [
    "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=1200&q=85",
  ],
  3: [
    "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?auto=format&fit=crop&w=1200&q=85",
  ],
  4: [
    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=1200&q=85",
  ],
  5: [
    "https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1536589961747-e239b2abbec2?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1200&q=85",
  ],
  6: [
    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=1200&q=85",
  ],
};

export default function CatteryDirectory({
  items = [],
}: CatteryDirectoryProps) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("Semua wilayah");
  const [breed, setBreed] = useState("Semua ras");
  const [sortBy, setSortBy] = useState("Skor cattery tertinggi");
  const [verificationStatus, setVerificationStatus] =
    useState("Semua status");
  const [scoreMinimum, setScoreMinimum] = useState("Semua skor");

  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [gridPhotoIndexes, setGridPhotoIndexes] = useState<
    Record<number, number>
  >({});

  const [listPhotoIndexes, setListPhotoIndexes] = useState<
    Record<number, number>
  >({});

  const [photosByCattery, setPhotosByCattery] =
    useState<Record<number, string[]>>(catteryPhotos);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [tempRegion, setTempRegion] = useState(region);
  const [tempBreed, setTempBreed] = useState(breed);
  const [tempSortBy, setTempSortBy] = useState("Skor tertinggi");
  const [tempVerificationStatus, setTempVerificationStatus] =
    useState(verificationStatus);
  const [tempScoreMinimum, setTempScoreMinimum] =
    useState(scoreMinimum);

  const regions = useMemo(
    () => [
      "Semua wilayah",
      ...Array.from(new Set(items.map((i) => i.region))),
    ],
    [items]
  );

  const breeds = useMemo(
    () => [
      "Semua ras",
      ...Array.from(new Set(items.flatMap((i) => i.breeds))),
    ],
    [items]
  );

  const sortOptions = [
    "Skor tertinggi",
    "Skor terendah",
    "Nama A-Z",
  ];

  const verificationOptions = [
    "Semua status",
    "Terverifikasi",
    "Dalam review",
    "Tidak terverifikasi",
  ];

  const scoreOptions = [
    "Semua skor",
    "Skor 90 ke atas",
    "Skor 80 ke atas",
    "Skor 70 ke atas",
  ];

  const handleOpenFilter = () => {
    setTempRegion(region);
    setTempBreed(breed);
    setTempSortBy(
      sortBy === "Skor cattery tertinggi"
        ? "Skor tertinggi"
        : sortBy
    );
    setTempVerificationStatus(verificationStatus);
    setTempScoreMinimum(scoreMinimum);
    setIsFilterOpen(true);
  };

  const handleApplyFilter = () => {
    setRegion(tempRegion);
    setBreed(tempBreed);

    setSortBy(
      tempSortBy === "Skor tertinggi"
        ? "Skor cattery tertinggi"
        : tempSortBy
    );

    setVerificationStatus(tempVerificationStatus);
    setScoreMinimum(tempScoreMinimum);

    setIsFilterOpen(false);
  };

  const handleResetFilter = () => {
    setSearch("");
    setRegion("Semua wilayah");
    setBreed("Semua ras");
    setSortBy("Skor cattery tertinggi");
    setVerificationStatus("Semua status");
    setScoreMinimum("Semua skor");

    setTempRegion("Semua wilayah");
    setTempBreed("Semua ras");
    setTempSortBy("Skor tertinggi");
    setTempVerificationStatus("Semua status");
    setTempScoreMinimum("Semua skor");
  };

  const matchesVerificationStatus = (
    item: CatteryItem,
    status: string
  ) => {
    if (status === "Semua status") return true;

    const itemStatus = String(item.status || "")
      .trim()
      .toLowerCase();

    return itemStatus === status.toLowerCase();
  };

  const matchesScoreMinimum = (
    item: CatteryItem,
    minimum: string
  ) => {
    if (minimum === "Semua skor") return true;

    if (minimum === "Skor 90 ke atas") {
      return item.score >= 90;
    }

    if (minimum === "Skor 80 ke atas") {
      return item.score >= 80;
    }

    if (minimum === "Skor 70 ke atas") {
      return item.score >= 70;
    }

    return true;
  };

  const tempFilteredCount = useMemo(() => {
    return items.filter((i) => {
      const matchSearch =
        !search.trim() ||
        i.name.toLowerCase().includes(search.toLowerCase());

      const matchRegion =
        tempRegion === "Semua wilayah" ||
        i.region === tempRegion;

      const matchBreed =
        tempBreed === "Semua ras" ||
        i.breeds.includes(tempBreed);

      const matchStatus = matchesVerificationStatus(
        i,
        tempVerificationStatus
      );

      const matchScore = matchesScoreMinimum(
        i,
        tempScoreMinimum
      );

      return (
        matchSearch &&
        matchRegion &&
        matchBreed &&
        matchStatus &&
        matchScore
      );
    }).length;
  }, [
    items,
    search,
    tempRegion,
    tempBreed,
    tempVerificationStatus,
    tempScoreMinimum,
  ]);

  const filteredItems = useMemo(() => {
    let res = items.filter((i) => {
      const matchSearch =
        !search.trim() ||
        i.name.toLowerCase().includes(search.toLowerCase());

      const matchRegion =
        region === "Semua wilayah" || i.region === region;

      const matchBreed =
        breed === "Semua ras" || i.breeds.includes(breed);

      const matchStatus = matchesVerificationStatus(
        i,
        verificationStatus
      );

      const matchScore = matchesScoreMinimum(
        i,
        scoreMinimum
      );

      return (
        matchSearch &&
        matchRegion &&
        matchBreed &&
        matchStatus &&
        matchScore
      );
    });

    if (sortBy.includes("tertinggi")) {
      res = [...res].sort((a, b) => b.score - a.score);
    } else if (sortBy.includes("terendah")) {
      res = [...res].sort((a, b) => a.score - b.score);
    } else if (sortBy === "Nama A-Z") {
      res = [...res].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return res;
  }, [
    items,
    search,
    region,
    breed,
    sortBy,
    verificationStatus,
    scoreMinimum,
  ]);

  const getPhotos = (id: number) => {
    return (
      photosByCattery[id] || [
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=85",
      ]
    );
  };

  const getWhatsAppUrl = (item: CatteryItem) => {
    const phoneNumber = String(item.whatsapp || "").replace(
      /[^0-9]/g,
      ""
    );

    return `https://wa.me/${phoneNumber}`;
  };

  const getMapsUrl = (item: CatteryItem) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      item.address
    )}`;
  };

  const getStatusStyles = (status: string) => {
    const normalizedStatus = String(status || "")
      .trim()
      .toLowerCase();

    if (normalizedStatus === "terverifikasi") {
      return {
        label: "Terverifikasi",
        className: "bg-[#EAF6ED] text-[#28844B]",
      };
    }

    if (normalizedStatus === "dalam review") {
      return {
        label: "Dalam review",
        className: "bg-[#FFF4E5] text-[#C8781A]",
      };
    }

    if (normalizedStatus === "tidak terverifikasi") {
      return {
        label: "Tidak terverifikasi",
        className: "bg-[#FDECEC] text-[#C43D3D]",
      };
    }

    return {
      label: status || "Tidak terverifikasi",
      className: "bg-[#F4F1EE] text-[#7E7267]",
    };
  };

  const changePhoto = (
    id: number,
    direction: "next" | "prev",
    mode: PhotoSliderMode
  ) => {
    const photos = getPhotos(id);

    const setter =
      mode === "grid"
        ? setGridPhotoIndexes
        : setListPhotoIndexes;

    setter((prev) => {
      const currentIndex = prev[id] ?? 0;

      const nextIndex =
        direction === "next"
          ? currentIndex === photos.length - 1
            ? 0
            : currentIndex + 1
          : currentIndex === 0
          ? photos.length - 1
          : currentIndex - 1;

      return {
        ...prev,
        [id]: nextIndex,
      };
    });
  };

  const selectPhoto = (
    id: number,
    index: number,
    mode: PhotoSliderMode
  ) => {
    const setter =
      mode === "grid"
        ? setGridPhotoIndexes
        : setListPhotoIndexes;

    setter((prev) => ({
      ...prev,
      [id]: index,
    }));
  };

  const handleAddPhoto = (
    id: number,
    file: File
  ) => {
    if (!file.type.startsWith("image/")) return;

    const imageUrl = URL.createObjectURL(file);
    const currentPhotos = getPhotos(id);

    setPhotosByCattery((prev) => ({
      ...prev,
      [id]: [...currentPhotos, imageUrl],
    }));

    setGridPhotoIndexes((prev) => ({
      ...prev,
      [id]: currentPhotos.length,
    }));

    setListPhotoIndexes((prev) => ({
      ...prev,
      [id]: currentPhotos.length,
    }));
  };

  const renderPhotoSlider = (
    item: CatteryItem,
    mode: PhotoSliderMode
  ) => {
    const photos = getPhotos(item.id);

    const photoIndex =
      mode === "grid"
        ? gridPhotoIndexes[item.id] ?? 0
        : listPhotoIndexes[item.id] ?? 0;

    const statusStyles = getStatusStyles(item.status);

    const containerClass =
      mode === "grid"
        ? "h-[200px] w-full rounded-t-[14px]"
        : "h-[215px] w-[230px] rounded-l-2xl";

    return (
      <div
        className={`group relative shrink-0 overflow-hidden border border-dashed border-[#A89B90] bg-[#F8E7D1] ${containerClass}`}
      >
        <img
          src={photos[photoIndex]}
          alt={`${item.name} foto ${photoIndex + 1}`}
          className="h-full w-full object-cover"
        />

        <div
          className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-sm ${statusStyles.className}`}
        >
          {statusStyles.label}
        </div>

        <div className="absolute right-2.5 top-2.5 rounded-full bg-[#62584F]/90 px-2.5 py-1 text-[10px] font-semibold text-white">
          {photoIndex + 1}/{photos.length}
        </div>

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                changePhoto(item.id, "prev", mode)
              }
              className="absolute left-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#2D2825] opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100"
              aria-label="Foto sebelumnya"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() =>
                changePhoto(item.id, "next", mode)
              }
              className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#2D2825] opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100"
              aria-label="Foto berikutnya"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1">
          {photos.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                selectPhoto(item.id, index, mode)
              }
              aria-label={`Lihat foto ${index + 1}`}
              className={`h-1.5 rounded-full border border-white/70 transition-all ${
                index === photoIndex
                  ? "w-4 bg-white"
                  : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderContactActions = (
    item: CatteryItem,
    detailClassName: string
  ) => {
    return (
      <div className="flex items-center gap-2">
        <a
  href={getWhatsAppUrl(item)}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Check WhatsApp"
  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#EEDFD5] bg-white transition-colors hover:bg-[#EAF6ED] [&_svg]:stroke-[#28844B]"
>
  <DashboardIcon
    name="chat"
    size={16}
  />
</a>

<a
  href={getMapsUrl(item)}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Buka Google Maps"
  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#EEDFD5] bg-white transition-colors hover:bg-[#EAF6ED] [&_svg]:stroke-[#28844B]"
>
  <DashboardIcon
    name="pin"
    size={16}
  />
</a>

        <Link
          href={
            item.href ||
            `/anggota/direktori/${item.id}`
          }
          className={detailClassName}
        >
          Lihat detail cattery
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="mb-3 space-y-2 sm:hidden">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8074]">
              <DashboardIcon
                name="search"
                size={16}
              />
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Cari nama cattery atau pemilik.."
              className="w-full rounded-xl border border-[#EEDFD5] bg-white py-2 pl-9 pr-3 text-[12px] text-[#1A1513] outline-none shadow-xs"
            />
          </div>

          <button
            onClick={handleOpenFilter}
            className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-[12px] font-semibold shadow-xs transition-colors ${
              region !== "Semua wilayah" ||
              breed !== "Semua ras" ||
              verificationStatus !== "Semua status" ||
              scoreMinimum !== "Semua skor"
                ? "border-[#D95D1E] bg-[#FFF2E8] text-[#D95D1E]"
                : "border-[#EEDFD5] bg-white text-[#1A1513]"
            }`}
          >
            <FilterIconCustom />
            Filter
          </button>
        </div>

        <p className="text-[11px] text-[#8C8074]">
          {filteredItems.length} hasil
        </p>
      </div>

      <CatteryBottomSheetFilter
        isOpen={isFilterOpen}
        onClose={() =>
          setIsFilterOpen(false)
        }
        onReset={handleResetFilter}
        onApply={handleApplyFilter}
        regions={regions}
        breeds={breeds}
        sortOptions={sortOptions}
        tempRegion={tempRegion}
        setTempRegion={setTempRegion}
        tempBreed={tempBreed}
        setTempBreed={setTempBreed}
        tempSortBy={tempSortBy}
        setTempSortBy={setTempSortBy}
        matchCount={tempFilteredCount}
      />

      <div className="mb-4 hidden rounded-xl border border-[#EEDFD5] bg-white p-4 shadow-sm sm:block">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8074]">
            <DashboardIcon
              name="search"
              size={16}
            />
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Cari nama cattery atau pemilik..."
            className="w-full rounded-lg border border-[#EEDFD5] bg-white py-2.5 pl-9 pr-3 text-[13px] text-[#1A1513] outline-none"
          />
        </div>

        <div className="mt-3 grid grid-cols-5 gap-3">
          <div>
            <label className="text-[11px] font-medium text-[#7E7267]">
              Wilayah
            </label>

            <select
              value={region}
              onChange={(e) =>
                setRegion(e.target.value)
              }
              className="mt-1.5 w-full cursor-pointer rounded-lg border border-[#EEDFD5] bg-white px-3 py-2 text-[13px] text-[#1A1513] outline-none"
            >
              {regions.map((r) => (
                <option
                  key={r}
                  value={r}
                >
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#7E7267]">
              Ras kucing
            </label>

            <select
              value={breed}
              onChange={(e) =>
                setBreed(e.target.value)
              }
              className="mt-1.5 w-full cursor-pointer rounded-lg border border-[#EEDFD5] bg-white px-3 py-2 text-[13px] text-[#1A1513] outline-none"
            >
              {breeds.map((b) => (
                <option
                  key={b}
                  value={b}
                >
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#7E7267]">
              Urutkan
            </label>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="mt-1.5 w-full cursor-pointer rounded-lg border border-[#EEDFD5] bg-white px-3 py-2 text-[13px] text-[#1A1513] outline-none"
            >
              <option value="Skor cattery tertinggi">
                Skor cattery tertinggi
              </option>

              <option value="Skor cattery terendah">
                Skor cattery terendah
              </option>

              <option value="Nama A-Z">
                Nama A-Z
              </option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#7E7267]">
              Status verifikasi
            </label>

            <select
              value={verificationStatus}
              onChange={(e) =>
                setVerificationStatus(
                  e.target.value
                )
              }
              className="mt-1.5 w-full cursor-pointer rounded-lg border border-[#EEDFD5] bg-white px-3 py-2 text-[13px] text-[#1A1513] outline-none"
            >
              {verificationOptions.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#7E7267]">
              Skor minimum
            </label>

            <select
              value={scoreMinimum}
              onChange={(e) =>
                setScoreMinimum(
                  e.target.value
                )
              }
              className="mt-1.5 w-full cursor-pointer rounded-lg border border-[#EEDFD5] bg-white px-3 py-2 text-[13px] text-[#1A1513] outline-none"
            >
              {scoreOptions.map(
                (score) => (
                  <option
                    key={score}
                    value={score}
                  >
                    {score}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {(verificationStatus !== "Semua status" ||
          scoreMinimum !== "Semua skor") && (
          <div className="mt-3 flex items-center gap-2">
            <p className="text-[11px] text-[#8C8074]">
              Filter aktif:
            </p>

            {verificationStatus !==
              "Semua status" && (
              <button
                type="button"
                onClick={() =>
                  setVerificationStatus(
                    "Semua status"
                  )
                }
                className="inline-flex items-center gap-1 rounded-full border border-[#F4772B] bg-[#FFF2E8] px-2.5 py-1 text-[11px] font-medium text-[#D95D1E]"
              >
                {verificationStatus}

                <span className="text-[13px] leading-none">
                  ×
                </span>
              </button>
            )}

            {scoreMinimum !==
              "Semua skor" && (
              <button
                type="button"
                onClick={() =>
                  setScoreMinimum(
                    "Semua skor"
                  )
                }
                className="inline-flex items-center gap-1 rounded-full border border-[#F4772B] bg-[#FFF2E8] px-2.5 py-1 text-[11px] font-medium text-[#D95D1E]"
              >
                {scoreMinimum}

                <span className="text-[13px] leading-none">
                  ×
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={handleResetFilter}
              className="ml-1 text-[11px] font-medium text-[#D95D1E] underline underline-offset-2"
            >
              Hapus semua
            </button>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <p className="text-[11px] text-[#8C8074]">
            {filteredItems.length} cattery
            ditemukan
          </p>

          <div className="flex items-center gap-2">
            <div className="flex h-9 items-center rounded-full border border-[#EEDFD5] bg-[#FAF7F5] p-1">
              <button
                type="button"
                aria-label="Tampilan grid"
                title="Tampilan grid"
                onClick={() =>
                  setViewMode("grid")
                }
                className={`flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium transition-all ${
                  viewMode === "grid"
                    ? "border border-[#F4772B] bg-[#FFF2E8] text-[#D95D1E]"
                    : "border border-transparent text-[#2D2825] hover:bg-white"
                }`}
              >
                <GridViewIcon />
                <span>Grid</span>
              </button>

              <button
                type="button"
                aria-label="Tampilan list"
                title="Tampilan list"
                onClick={() =>
                  setViewMode("list")
                }
                className={`flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium transition-all ${
                  viewMode === "list"
                    ? "border border-[#F4772B] bg-[#FFF2E8] text-[#D95D1E]"
                    : "border border-transparent text-[#2D2825] hover:bg-white"
                }`}
              >
                <ListViewIcon />
                <span>List</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetFilter}
              className="h-9 rounded-full border border-[#EEDFD5] bg-white px-3.5 text-[11px] font-medium text-[#2D2825] transition-colors hover:bg-[#FFF2E8]"
            >
              Reset filter
            </button>
          </div>
        </div>
      </div>

      <div
        className={
          viewMode === "grid"
            ? "hidden sm:grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4"
            : "space-y-3"
        }
      >
        {filteredItems.map((item) => (
          <React.Fragment key={item.id}>
            <div className="sm:hidden">
              <CatteryCardMobile item={item} />
            </div>

            {viewMode === "grid" && (
              <div className="hidden overflow-hidden rounded-2xl border border-[#EEDFD5] bg-white shadow-sm sm:block">
                {renderPhotoSlider(item, "grid")}

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-[15px] font-bold text-[#1A1513]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-[11px] text-[#7E7267]">
                        <span className="text-[#8C8074]">
                          {item.region}
                        </span>

                        {" · "}

                        {item.breeds.join(", ")}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-[9px] font-bold uppercase tracking-wide text-[#8C8074]">
                        SKOR
                      </p>

                      <p className="text-[18px] font-bold leading-5 text-[#D95D1E]">
                        {item.score}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    {renderContactActions(
                      item,
                      "flex h-9 flex-1 items-center justify-center rounded-full border border-[#F4772B] bg-white px-3 text-[11px] font-semibold text-[#D95D1E] transition-colors hover:bg-[#FFF2E8]"
                    )}
                  </div>
                </div>
              </div>
            )}

            {viewMode === "list" && (
              <div className="hidden min-h-[200px] overflow-hidden rounded-2xl border border-[#EEDFD5] bg-white shadow-sm sm:flex">
                <div className="h-[200px] w-[230px] shrink-0">
                  {renderPhotoSlider(item, "list")}
                </div>

                <div className="flex min-w-0 flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-[17px] font-bold text-[#1A1513]">
                        {item.name}
                      </h3>

                      <p className="mt-1.5 text-[12px] text-[#7E7267]">
                        <span className="inline-flex items-center gap-1">
                          <DashboardIcon
                            name="pin"
                            size={12}
                          />

                          {item.region}
                        </span>
                      </p>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.breeds.map(
                          (itemBreed) => (
                            <span
                              key={itemBreed}
                              className="rounded-md border border-[#F6D9C4] bg-[#FFF7F0] px-2.5 py-1 text-[11px] font-medium text-[#B94E18]"
                            >
                              {itemBreed}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-[9px] font-bold uppercase tracking-wide text-[#8C8074]">
                        SKOR
                      </p>

                      <p className="text-[19px] font-bold leading-5 text-[#D95D1E]">
                        {item.score}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-[12px] leading-5 text-[#2D2825]">
                      {item.address}
                    </p>
                  </div>

                  <div className="mt-auto pt-4">
                    {renderContactActions(
                      item,
                      "flex h-9 flex-1 items-center justify-center rounded-full border border-[#F4772B] bg-white px-4 text-[11px] font-semibold text-[#D95D1E] transition-colors hover:bg-[#FFF2E8]"
                    )}
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="mt-8 text-center text-xs text-[#8C8074]">
          Tidak ada cattery yang cocok
          dengan filter ini.
        </p>
      )}
    </>
  );
}