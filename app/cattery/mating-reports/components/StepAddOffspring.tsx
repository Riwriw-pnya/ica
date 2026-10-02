"use client";

import { useEffect, useState } from "react";
import OffspringRow from "./OffspringRow";
import type { OffspringItem } from "@/types/cattery";
import { useToast } from "@/context/ToastContext";

interface StepAddOffspringProps {
  items?: OffspringItem[];
  onChangeItems: (items: OffspringItem[]) => void;
  defaultBreed: string;
  showError?: boolean;
}

export type SaveStatus = "tersimpan" | "belum disimpan" | "belum lengkap" | "gagal disimpan";

export default function StepAddOffspring({
  items = [],
  onChangeItems,
  defaultBreed,
  showError = false,
}: StepAddOffspringProps) {
  const { showToast } = useToast();
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [saveStatuses, setSaveStatuses] = useState<Record<number, SaveStatus>>({});

  const hasValidRow = (items || []).some(
    (item) => Boolean(item.name && item.gender && item.birthDate)
  );
  const isInvalid = showError && !hasValidRow;

  // Sync Otomatis Breed
  useEffect(() => {
    if (!defaultBreed) return;
    const hasEmptyBreed = (items || []).some((item) => !item.breed);
    if (hasEmptyBreed) {
      const updatedItems = (items || []).map((item) => ({
        ...item,
        breed: item.breed || defaultBreed,
      }));
      onChangeItems(updatedItems);
    }
  }, [defaultBreed, items, onChangeItems]);

  const totalKitten = (items || []).length;
  const totalHidup = (items || []).filter((i) => i.status !== "Mati").length;

  const countTersimpan = (items || []).filter((i) => saveStatuses[i.id] === "tersimpan").length;
  const countBelumDisimpan = (items || []).filter((i) => saveStatuses[i.id] === "belum disimpan").length;
  const countBelumLengkap = (items || []).filter((i) => saveStatuses[i.id] === "belum lengkap" || !saveStatuses[i.id]).length;
  const countGagalDisimpan = (items || []).filter((i) => saveStatuses[i.id] === "gagal disimpan").length;

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAddSingle = () => {
    const newId = Date.now() + Math.random();
    const newItem: OffspringItem = {
      id: newId,
      name: "",
      gender: "" as any,
      color: "",
      birthDate: items[0]?.birthDate || "",
      birthWeight: "",
      breed: defaultBreed,
      status: "" as any,
    };
    setSaveStatuses((prev) => ({ ...prev, [newId]: "belum lengkap" }));
    onChangeItems([...(items || []), newItem]);
  };

  const handleQuantityChange = (delta: number) => {
    const currentCount = (items || []).length;
    const newCount = Math.max(1, currentCount + delta);

    if (newCount > currentCount) {
      const added: OffspringItem[] = [];
      const newStatusMap = { ...saveStatuses };
      for (let i = 0; i < newCount - currentCount; i++) {
        const id = Date.now() + i + Math.random();
        added.push({
          id,
          name: "",
          gender: "" as any,
          color: "",
          birthDate: items[0]?.birthDate || "",
          birthWeight: "",
          breed: defaultBreed,
          status: "" as any,
        });
        newStatusMap[id] = "belum lengkap";
      }
      setSaveStatuses(newStatusMap);
      onChangeItems([...(items || []), ...added]);
    } else if (newCount < currentCount) {
      if ((items || []).length <= 1) {
        showToast(
          "Tidak dapat menghapus kitten",
          "Minimal harus ada satu kitten dalam laporan kelahiran.",
          { tone: "warning" }
        );
        return;
      }
      onChangeItems((items || []).slice(0, newCount));
    }
  };

  const handleBatchAdd = (count: number) => {
    const firstBirthDate = items[0]?.birthDate || "";
    const newItems: OffspringItem[] = [];
    const newStatusMap = { ...saveStatuses };

    for (let i = 0; i < count; i++) {
      const id = Date.now() + i + Math.random();
      newItems.push({
        id,
        name: "",
        gender: "" as any,
        color: "",
        birthDate: firstBirthDate,
        birthWeight: "",
        breed: defaultBreed,
        status: "" as any,
      });
      newStatusMap[id] = "belum lengkap";
    }
    setSaveStatuses(newStatusMap);
    onChangeItems([...(items || []), ...newItems]);
    showToast(`${count} baris kitten ditambahkan`, "Lengkapi data tiap kitten.", { tone: "success" });
  };

  const handleSaveAll = () => {
    let savedCount = 0;
    let failedCount = 0;
    const newStatuses: Record<number, SaveStatus> = { ...saveStatuses };

    (items || []).forEach((item) => {
      const isValid = Boolean(item.name && item.gender && item.birthDate);
      if (isValid) {
        newStatuses[item.id] = "tersimpan";
        savedCount++;
      } else {
        newStatuses[item.id] = "gagal disimpan";
        failedCount++;
      }
    });

    setSaveStatuses(newStatuses);

    if (savedCount > 0 && failedCount === 0) {
      showToast(
        "Kitten Berhasil Disimpan!",
        `${savedCount} kitten otomatis ditambahkan ke daftar My Cats.`,
        { tone: "success" }
      );
    } else if (savedCount > 0 && failedCount > 0) {
      showToast(
        "Sebagian Kitten Disimpan",
        `${savedCount} kitten masuk My Cats. ${failedCount} kitten gagal disimpan karena data belum lengkap.`,
        { tone: "warning" }
      );
    } else {
      showToast(
        "Gagal Menyimpan Kitten",
        "Pastikan Nama, Jenis Kelamin, dan Tanggal Lahir sudah terisi.",
        { tone: "error" }
      );
    }
  };

  const handleUpdate = (index: number, updated: OffspringItem) => {
    const next = [...(items || [])];
    next[index] = updated;
    onChangeItems(next);

    const isWajibLengkap = Boolean(updated.name && updated.gender && updated.birthDate);

    setSaveStatuses((prev) => ({
      ...prev,
      [updated.id]: isWajibLengkap ? "belum disimpan" : "belum lengkap",
    }));
  };

  const handleRemove = (index: number) => {
    if ((items || []).length <= 1) {
      showToast(
        "Tidak dapat menghapus kitten",
        "Minimal harus ada satu kitten dalam laporan kelahiran.",
        { tone: "warning" }
      );
      return;
    }

    const removedId = items[index]?.id;
    if (removedId) {
      setSaveStatuses((prev) => {
        const copy = { ...prev };
        delete copy[removedId];
        return copy;
      });
    }
    onChangeItems((items || []).filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl sm:rounded-xl border border-[#EEDFD5] bg-white p-4 sm:p-6 transition shadow-2xs space-y-4">
      {/* Header Form */}
      <div>
        <h2 className="font-display text-base font-bold text-[#1A1513]">
          Add offspring
        </h2>
        <p className="mt-1 text-xs text-[#8C8074] leading-relaxed">
          Isi baris untuk setiap kitten. Buka baris detail untuk berat, ras, status, dan foto.
        </p>
      </div>

      <hr className="border-[#EEDFD5]" />

      {/* MOBILE VIEW ONLY: COUNTER KITTEN & LEGEND BAR */}
      <div className="block sm:hidden space-y-3">

        <div className="rounded-2xl border border-[#EEDFD5] bg-white p-4 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-xs font-bold text-[#1A1513]">Jumlah kitten dalam kelahiran ini</p>
            <p className="text-[11px] text-[#8C8074] mt-0.5">
              {countTersimpan} dari {totalKitten} card lengkap · umumnya 1–10 ekor per kelahiran
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              className="w-9 h-9 rounded-xl border border-[#EEDFD5] bg-white flex items-center justify-center font-bold text-[#1A1513] hover:bg-[#FAF7F5] active:scale-95 transition"
            >
              -
            </button>
            <span className="text-sm font-bold text-[#1A1513] w-3 text-center">{totalKitten || 1}</span>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              className="w-9 h-9 rounded-xl border border-[#1A1513] bg-white flex items-center justify-center font-bold text-[#1A1513] hover:bg-[#FAF7F5] active:scale-95 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Legend Status Bar Mobile */}
        <div className="rounded-2xl border border-[#EEDFD5] bg-white px-4 py-2.5 flex items-center justify-center gap-4 text-[9px] font-semibold text-[#1A1513]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" /> Tersimpan
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-warning)]" /> Sebagian terisi
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#A39990]" /> Belum diisi
          </span>
        </div>
      </div>

      {/* DESKTOP VIEW ONLY: BIRTH LOG CARD */}
      <div className="hidden sm:block rounded-2xl border border-[#EEDFD5] bg-[#FAF7F5] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-[#1A1513]">Birth log</h3>
              <span className="text-xs text-[#8C8074]">
                {totalKitten} kitten · {totalHidup} hidup
              </span>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF8F3] px-3 py-1 text-[#28844B] border border-[#D3EEDD]">
                <span className="h-2 w-2 rounded-full bg-[#28844B]" />
                {countTersimpan} tersimpan
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF2E8] px-3 py-1 text-[#EE6B28] border border-[#FCE3D2]">
                <span className="h-2 w-2 rounded-full bg-[#EE6B28]" />
                {countBelumDisimpan} belum disimpan
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EFE9] px-3 py-1 text-[#574D45] border border-[#E8DED5]">
                <span className="h-2 w-2 rounded-full bg-[#8C8074]" />
                {countBelumLengkap} belum lengkap
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDE8E8] px-3 py-1 text-[#E02424] border border-[#F8B4B4]">
                <span className="h-2 w-2 rounded-full bg-[#E02424]" />
                {countGagalDisimpan} gagal disimpan
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveAll}
            className="cursor-pointer shrink-0 rounded-full bg-gradient-to-b from-[#FFC299] to-[#F05A1B] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:from-[#F05A1B] hover:to-[#C8601D] transition"
          >
            Simpan semua kitten
          </button>
        </div>
      </div>

      {/* LIST KITTEN ROWS */}
      <div>
        {/* Mobile View */}
        <div className="block sm:hidden space-y-4">
          {(items || [])
            .filter((item) => Boolean(item))
            .map((item, index) => (
              <OffspringRow
                key={item.id ? `${item.id}-${index}` : index}
                index={index}
                item={item}
                saveStatus={saveStatuses[item.id] || "belum lengkap"}
                isExpanded={expandedIds.includes(item.id)}
                onToggleExpand={() => toggleExpand(item.id)}
                onChange={(updated) => handleUpdate(index, updated)}
                onRemove={() => handleRemove(index)}
                defaultBreed={defaultBreed}
              />
            ))}
        </div>

        {/* Desktop View */}
        <div className={`hidden sm:block overflow-hidden rounded-xl border ${isInvalid ? "border-red-400" : "border-[#EEDFD5]"}`}>
          <div className="flex items-center gap-3 border-b border-[#EEDFD5] bg-[#FAF7F5] px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#8C8074]">
            <span className="w-5" />
            <span className="flex-1">NAMA KITTEN</span>
            <span className="w-20 text-center">KELAMIN</span>
            <span className="w-40">WARNA / POLA</span>
            <span className="w-36">TANGGAL LAHIR</span>
            <span className="w-32 text-center">STATUS SIMPAN</span>
            <span className="w-16 text-center">DETAIL</span>
          </div>

          {(items || [])
            .filter((item) => Boolean(item))
            .map((item, index) => (
              <OffspringRow
                key={item.id ? `${item.id}-${index}` : index}
                index={index}
                item={item}
                saveStatus={saveStatuses[item.id] || "belum lengkap"}
                isExpanded={expandedIds.includes(item.id)}
                onToggleExpand={() => toggleExpand(item.id)}
                onChange={(updated) => handleUpdate(index, updated)}
                onRemove={() => handleRemove(index)}
                defaultBreed={defaultBreed}
              />
            ))}
        </div>
      </div>

      {/* MOBILE VIEW ONLY: TOMBOL ADD KITTEN */}
      <div className="block sm:hidden">
        <button
          type="button"
          onClick={handleAddSingle}
          className="w-full py-3 rounded-full border border-[#F05A1B] bg-white text-xs font-bold text-[#F05A1B] hover:bg-[#FFF2E8] transition active:scale-[0.99]"
        >
          Add Kitten
        </button>
      </div>

      {/* DESKTOP VIEW ONLY: BATCH ADD BUTTONS */}
      <div className="hidden sm:flex items-center gap-2">
        <button
          type="button"
          onClick={handleAddSingle}
          className="cursor-pointer rounded-full border border-[#F05A1B] bg-white px-4 py-2 text-xs font-bold text-[#F05A1B] hover:bg-[#FFF2E8] transition"
        >
          + Tambah kitten
        </button>
        <span className="text-xs text-[#8C8074] ml-1">Tambah sekaligus:</span>
        {[8, 9, 10].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleBatchAdd(num)}
            className="cursor-pointer rounded-full border border-[#EEDFD5] bg-white px-3 py-1.5 text-xs font-semibold text-[#1A1513] hover:bg-[#FAF7F5] transition"
          >
            + {num} kitten
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[#D0E1FD] bg-[#EEF5FF] p-3.5 flex items-start gap-3 text-xs text-[#1C4ED8]">
        <div className="shrink-0 mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1C4ED8] text-white font-bold text-[10px]">
          i
        </div>
        <p className="leading-relaxed">
          Kitten yang lengkap dan hidup otomatis ditambahkan ke <span className="font-semibold">My Cats</span> saat mating report dikirim, lengkap dengan nomor microchip dan data adopter. Nama, jenis kelamin, dan tanggal lahir wajib diisi.
        </p>
      </div>
    </div>
  );
}