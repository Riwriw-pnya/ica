"use client";

import { useMemo, useState } from "react";
import { productCategories, products } from "@/data/store";
import CategorySidebar from "./CategorySidebar";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("semua");

  const filteredProducts = useMemo(
    () => (activeCategory === "semua" ? products : products.filter((p) => p.categoryId === activeCategory)),
    [activeCategory],
  );

  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="border-b border-[var(--color-brand-orange-100)] bg-gradient-to-b from-[var(--color-brand-orange-50)] to-[var(--color-ink-50)] px-4 py-5 text-left lg:px-6">
        <h1 className="font-display mt-3 text-[26px] font-bold text-[var(--color-ink-900)]">
          ICA <span className="text-[var(--color-brand-orange-500)]">Store</span>
        </h1>
        <p className= "mt-1.5 max-w-md text-[12px] text-[var(--color-ink-700)]">
          Belanja produk resmi, tiket event, dan perlengkapan kucing terpercaya.
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] p-5 lg:p-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <CategorySidebar categories={productCategories} activeId={activeCategory} onSelect={setActiveCategory} />

          <div className="flex flex-1 flex-col">
            {filteredProducts.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}