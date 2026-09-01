"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { NewsItem } from "@/types/dashboard_member";

interface NewsFilterGridProps {
  items: NewsItem[];
}

export default function NewsFilterGrid({ items }: NewsFilterGridProps) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((item) => item.category)));
    return ["Semua", ...unique];
  }, [items]);

  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredItems =
    activeCategory === "Semua"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-[12px] font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)] border border-[var(--color-brand-orange-300)]"
                  : "border border-[var(--color-ink-100)] text-[var(--color-ink-700)] hover:text-[var(--color-brand-orange-700)]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Grid berita */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group overflow-hidden rounded-xl border border-[var(--color-ink-100)] bg-white transition-shadow duration-200 hover:shadow-md"
          >
            <div className="flex h-36 items-center justify-center bg-[var(--color-brand-orange-100)] transition-colors duration-200 group-hover:bg-[var(--color-brand-orange-300)]">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-brand-orange-700)"
                strokeWidth="1.5"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="9" cy="10" r="2" />
                <path d="M21 16l-5.5-5.5L9 17" />
              </svg>
            </div>

            <div className="p-4">
              <p className="text-[10px] text-[var(--color-ink-400)]">
                {item.category} · {item.date}
              </p>

              <h3 className="mt-1 text-[14px] font-semibold leading-snug text-[var(--color-ink-900)]">
                {item.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-[12px] text-[var(--color-ink-700)]">
                {item.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="mt-8 text-center text-[12px] text-[var(--color-ink-400)]">
          Belum ada berita di kategori ini.
        </p>
      )}
    </>
  );
}