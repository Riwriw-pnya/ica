"use client";

import { useState } from "react";
import StoreSectionHeader from "@/components/superadmin/store/StoreSectionHeader";
import ProductCard, { ProductItem } from "@/components/superadmin/store/ProductCard";
import ProductModal from "@/components/superadmin/store/ProductModal";
import { useToast } from "@/context/ToastContext";

export default function SuperadminStorePage() {
  const { showToast } = useToast();

  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: "1",
      name: "Tas kandang ICA Official",
      price: "Rp 385.000",
      category: "Perlengkapan Kucing",
      categoryIcon: "folder",
      status: "Aktif",
      mainImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRb7fgiggQkVFxPe9xPjtoPru4GKSjZu3pJaCsIGeqMA&s=10",
      photoCountNote: "3 dari 3 foto diunggah",
      subImages: [
        { id: 1, label: "Foto 2" },
        { id: 2, label: "Foto 3" },
        { id: 3, label: "" },
      ],
    },
    {
      id: "2",
      name: "Tiket ICA Cat Show Bandung 2026",
      price: "Rp 150.000",
      category: "Tiket Event",
      categoryIcon: "calendar",
      status: "Draft",
      mainImage: "", 
      photoCountNote: "1 foto diunggah",
      subImages: [
        { id: 1, label: "" },
        { id: 2, label: "" },
        { id: 3, label: "" },
      ],
    },
    {
      id: "3",
      name: "Kaos ICA Member Edition",
      price: "Rp 195.000",
      category: "Perlengkapan Kucing",
      categoryIcon: "folder",
      status: "Draft",
      photoCountNote: "Belum tampil — foto utama belum diunggah",
      subImages: [
        { id: 1, label: "" },
        { id: 2, label: "" },
        { id: 3, label: "" },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Open modal untuk tambah produk baru
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  // Open modal untuk edit/lengkapi produk
  const handleEditProduct = (item: ProductItem) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  // Sembunyikan produk
  const handleHideProduct = (item: ProductItem) => {
    showToast(`Produk "${item.name}" disembunyikan dari katalog.`, "info");
  };

  // Hapus produk
  const handleDeleteProduct = (item: ProductItem) => {
    setProducts((prev) => prev.filter((p) => p.id !== item.id));
    showToast("Produk dihapus dari katalog Store.", "success");
  };

  // Handler simpan (tambah/update) data produk termasuk mainImage
  const handleSaveProduct = (savedProduct: ProductItem) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === savedProduct.id);
      if (exists) {
        return prev.map((p) => (p.id === savedProduct.id ? savedProduct : p));
      }
      return [savedProduct, ...prev];
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 text-[#231A14]">
      {/* Header dengan handler Tambah Produk */}
      <StoreSectionHeader onAddProduct={handleAddProduct} />

      {/* Grid Katalog Produk */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onEdit={handleEditProduct}
            onHide={handleHideProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>

      {/* Modal Edit / Tambah Produk */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={selectedProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
}