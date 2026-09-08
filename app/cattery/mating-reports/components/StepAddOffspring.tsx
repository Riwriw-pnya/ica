"use client";

import { useState } from "react";
import OffspringRow from "./OffspringRow";
import type { OffspringItem } from "@/types/cattery";

interface StepAddOffspringProps {
  items: OffspringItem[];
  onChangeItems: (items: OffspringItem[]) => void;
  defaultBreed: string;
}

let nextId = 100;

export default function StepAddOffspring({ items, onChangeItems, defaultBreed }: StepAddOffspringProps) {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleAdd = () => {
    const newItem: OffspringItem = {
      id: nextId++,
      name: "",
      gender: "",
      color: "",
      birthDate: "",
      birthWeight: "",
      breed: defaultBreed,
      status: "Hidup",
    };
    onChangeItems([...items, newItem]);
  };

  const handleUpdate = (index: number, updated: OffspringItem) => {
    const next = [...items];
    next[index] = updated;
    onChangeItems(next);
  };

  const handleRemove = (index: number) => {
    onChangeItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-6">
      <h2 className="font-display text-[16px] font-semibold text-[var(--color-ink-900)]">
        Add offspring
      </h2>
      <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
        Isi baris untuk setiap kitten. Buka baris detail untuk berat, ras, status, dan foto.
      </p>

      <div className="mt-4 overflow-hidden rounded-lg border border-[var(--color-ink-100)]">
        <div className="hidden items-center gap-3 border-b border-[var(--color-ink-100)] bg-gray-50 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-ink-400)] sm:flex">
          <span className="sm:w-5" />
          <span className="flex-1">Nama Kitten</span>
          <span className="sm:w-20 sm:text-center">Jenis Kelamin</span>
          <span className="sm:w-40">Warna / Pola</span>
          <span className="sm:w-36">Tanggal Lahir</span>
          <span className="sm:w-16 sm:text-center">Detail</span>
        </div>

        {items.map((item, index) => (
          <OffspringRow
            key={item.id}
            index={index}
            item={item}
            isExpanded={expandedIds.includes(item.id)}
            onToggleExpand={() => toggleExpand(item.id)}
            onChange={(updated) => handleUpdate(index, updated)}
            onRemove={() => handleRemove(index)}
          />
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="mt-3 rounded-full border border-[var(--color-brand-orange-300)] px-4 py-2 text-[12px] font-medium text-[var(--color-brand-orange-700)] transition hover:bg-[var(--color-brand-orange-50)]"
      >
        + Tambah kitten
      </button>

      <p className="mt-4 text-[11px] text-[var(--color-ink-400)]">
        Minimal satu kitten wajib diisi. Nama, jenis kelamin, dan tanggal lahir wajib; berat, ras,
        status, dan foto ada di baris detail.
      </p>
    </div>
  );
}