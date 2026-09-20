"use client";

import { useState } from "react";
import StoreSectionHeader from "@/components/superadmin/store/StoreSectionHeader";
import StoreCallout from "@/components/superadmin/store/StoreCallout";
import ProductCard, { ProductItem } from "@/components/superadmin/store/ProductCard";

export default function SuperadminStorePage() {
  const [products] = useState<ProductItem[]>([
    {
      id: "1",
      name: "Tas kandang ICA Official",
      price: "Rp 385.000",
      category: "Perlengkapan Kucing",
      categoryIcon: "folder",
      status: "Aktif",
      mainImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMkJUN7nXxJ3IsGxHewu8Jng4AE7V59RkhVnR78YdYLQ&s=10", 
      subImages: [
        { id: 1, label: "Foto 2" },
        { id: 2, label: "Foto 3" },
        { id: 3 }, // triggers + Foto button
      ],
      photoCountNote: "3 foto · foto utama terpasang",
    },
    {
      id: "2",
      name: "Tiket ICA Cat Show Bandung 2026",
      price: "Rp 150.000",
      category: "Tiket Event",
      categoryIcon: "calendar",
      status: "Aktif",
      mainImage: "",
      subImages: [
        { id: 1, label: "Foto 2" },
        { id: 2 }, // triggers + Foto button
        { id: 3 }, // hidden or empty
      ],
      photoCountNote: "2 foto · terhubung ke event Bandung",
    },
    {
      id: "3",
      name: "Kaos ICA Member Edition",
      price: "Rp 195.000",
      category: "Perlengkapan Kucing",
      categoryIcon: "folder",
      status: "Draft",
      subImages: [
        { id: 1 }, // triggers + Foto button
      ],
      photoCountNote: "Belum tampil — foto utama belum diunggah",
    },
  ]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-[#231A14]">
      <StoreSectionHeader />
      <StoreCallout />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}