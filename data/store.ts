import type { ProductCategory, Product } from "@/types/store";

export const productCategories: ProductCategory[] = [
  { id: "semua", label: "Semua Produk", count: 0 },
  { id: "perlengkapan-kucing", label: "Perlengkapan Kucing", count: 0 },
  { id: "tiket-event", label: "Tiket Event", count: 0 },
  { id: "uncategorized", label: "Uncategorized", count: 0 },
];

// Belum ada produk yang tersedia — akan diisi begitu integrasi katalog/BE sudah siap.
export const products: Product[] = [];