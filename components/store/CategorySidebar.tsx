"use client";

import type { ProductCategory } from "@/types/store";

interface CategorySidebarProps {
  categories: ProductCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function CategorySidebar({ categories, activeId, onSelect }: CategorySidebarProps) {
  return (
    <div className="w-full shrink-0 rounded-xl border border-[var(--color-ink-100)] bg-white p-4 sm:w-64">
      <div className="flex items-center gap-2 border-b border-[var(--color-ink-100)] pb-3">
        <svg className="h-4 w-4 text-[var(--color-brand-orange-700)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <h2 className="font-display text-[13px] font-semibold text-[var(--color-ink-900)]">Kategori Produk</h2>
      </div>

      <div className="mt-2 space-y-0.5">
        {categories.map((cat) => {
          const isActive = cat.id === activeId;

          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] transition ${
                isActive
                  ? "bg-[var(--color-brand-orange-100)] font-medium text-[var(--color-brand-orange-700)]"
                  : "text-[var(--color-ink-700)] hover:bg-[var(--color-brand-orange-50)]"
              }`}
            >
              <span>{cat.label}</span>
              <span className={isActive ? "text-[var(--color-brand-orange-700)]" : "text-[var(--color-ink-400)]"}>
                ({cat.count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}