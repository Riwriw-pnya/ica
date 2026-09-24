"use client";

import React, { useState, useEffect, useRef } from "react";

interface CatteryBottomSheetFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
  regions: string[];
  breeds: string[];
  sortOptions: string[];
  tempRegion: string;
  setTempRegion: (val: string) => void;
  tempBreed: string;
  setTempBreed: (val: string) => void;
  tempSortBy: string;
  setTempSortBy: (val: string) => void;
  matchCount: number;
}

export default function CatteryBottomSheetFilter({
  isOpen,
  onClose,
  onReset,
  onApply,
  regions,
  breeds,
  sortOptions,
  tempRegion,
  setTempRegion,
  tempBreed,
  setTempBreed,
  tempSortBy,
  setTempSortBy,
  matchCount,
}: CatteryBottomSheetFilterProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);

  // State gesture drag ke bawah
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setDragY(0);
      const timer = setTimeout(() => setIsAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimate(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
        setDragY(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isRendered ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isRendered]);

  // Handler gesture geser (drag) ke bawah
  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startYRef.current;

    if (deltaY > 0) {
      setDragY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragY > 90) {
      onClose();
    } else {
      setDragY(0);
    }
  };

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end sm:hidden">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          isAnimate ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sheet Container */}
      <div
        style={{
          transform: isAnimate
            ? `translateY(${dragY}px)`
            : "translateY(100%)",
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
        className="relative z-10 flex h-[72vh] max-h-[72vh] w-full flex-col rounded-t-3xl bg-white p-4 shadow-2xl"
      >
        {/* Grab Handle Icon "-" (Area Drag/Geser) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={onClose}
          className="w-full py-2 -mt-2 flex justify-center items-center shrink-0 cursor-grab active:cursor-grabbing mb-1"
        >
          <div className="h-1.5 w-12 rounded-full bg-[#E2D7CC]" />
        </div>

        {/* Header Title & Reset */}
        <div className="flex items-center justify-between mb-2 shrink-0">
          <h2 className="text-base font-bold text-[#1A1513]">Filter cattery</h2>
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-[#D95D1E] hover:underline"
          >
            Reset
          </button>
        </div>

        {/* List Opsi Filter */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-2">
          {/* WILAYAH */}
          <div>
            <p className="text-[10px] font-bold uppercase text-[#8C8074] mb-2">
              WILAYAH
            </p>
            <div className="space-y-1.5">
              {regions.map((r) => {
                const isSelected = tempRegion === r;
                return (
                  <div
                    key={r}
                    onClick={() => setTempRegion(r)}
                    className={`flex items-center gap-3 rounded-xl border p-2.5 cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#D95D1E] bg-[#FFF6EE]"
                        : "border-[#EEDFD5] bg-white"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-[#D95D1E] bg-[#D95D1E]"
                          : "border-[#C8BDB2]"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-[#1A1513]">{r}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RAS KUCING */}
          <div>
            <p className="text-[10px] font-bold uppercase text-[#8C8074] mb-2">
              RAS KUCING
            </p>
            <div className="space-y-1.5">
              {breeds.map((b) => {
                const isSelected = tempBreed === b;
                return (
                  <div
                    key={b}
                    onClick={() => setTempBreed(b)}
                    className={`flex items-center gap-3 rounded-xl border p-2.5 cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#D95D1E] bg-[#FFF6EE]"
                        : "border-[#EEDFD5] bg-white"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-[#D95D1E] bg-[#D95D1E]"
                          : "border-[#C8BDB2]"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-[#1A1513]">{b}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* URUTKAN */}
          <div>
            <p className="text-[10px] font-bold uppercase text-[#8C8074] mb-2">
              URUTKAN
            </p>
            <div className="space-y-1.5">
              {sortOptions.map((opt) => {
                const isSelected = tempSortBy === opt;
                return (
                  <div
                    key={opt}
                    onClick={() => setTempSortBy(opt)}
                    className={`flex items-center gap-3 rounded-xl border p-2.5 cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#D95D1E] bg-[#FFF6EE]"
                        : "border-[#EEDFD5] bg-white"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-[#D95D1E] bg-[#D95D1E]"
                          : "border-[#C8BDB2]"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-[#1A1513]">
                      {opt}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tombol Terapkan */}
        <div className="pt-2.5 shrink-0 border-t border-[#EEDFD5]">
          <button
            type="button"
            onClick={onApply}
            className="w-full rounded-2xl bg-gradient-to-r from-[#F0783C] to-[#E5531B] py-3 text-xs font-bold text-white shadow-md active:scale-98 transition-transform"
          >
            Terapkan · {matchCount} cattery cocok
          </button>
        </div>
      </div>
    </div>
  );
}