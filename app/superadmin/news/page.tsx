"use client";

import { useState } from "react";
import NewsSectionHeader from "@/components/superadmin/news/NewsSectionHeader";
import PrdCallout from "@/components/superadmin/news/PrdCallout";
import LeaderboardBannerSection from "@/components/superadmin/news/LeaderboardBanner";
import ArticleCard, { ArticleItem } from "@/components/superadmin/news/ArticleCard";
import CreateArticleModal from "@/components/superadmin/news/CreateArticleModal";
import { useToast } from "@/context/ToastContext";

export default function SuperadminNewsPage() {
  const { showToast } = useToast();

  const [articles, setArticles] = useState<ArticleItem[]>([
    {
      id: "1",
      title: "Perubahan syarat pendaftaran mating report 2026",
      category: "Regulasi",
      status: "Aktif",
      publishedDate: "1 Sep 2026",
      views: 412,
      imagePlaceholder: "Cover artikel · 1200×630",
    },
    {
      id: "2",
      title: "Diklat perawatan kucing ras untuk anggota baru",
      category: "Diklat",
      status: "Aktif",
      publishedDate: "24 Agu 2026",
      views: 268,
      imagePlaceholder: "Cover artikel · 1200×630",
    },
    {
      id: "3",
      title: "Laporan tahunan ICA dan agenda FIFe 2027",
      category: "Organisasi",
      status: "Draft",
      savedDate: "3 Sep 2026",
      imagePlaceholder: "Cover artikel · 1200×630",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  // Handler saat klik Edit / Lanjutkan menulis
  const handleEditArticle = (item: ArticleItem) => {
    setSelectedArticle(item);
    setIsModalOpen(true);
  };

  // Handler saat klik Tulis artikel (+ Buat)
  const handleCreateNew = () => {
    setSelectedArticle(null);
    setIsModalOpen(true);
  };

  // Handler saat klik Arsipkan
  const handleArchiveArticle = (itemToArchive: ArticleItem) => {
    setArticles((prev) =>
      prev.map((item) =>
        item.id === itemToArchive.id ? { ...item, status: "Arsip" } : item
      )
    );
    showToast("Artikel diarsipkan dan tidak lagi tampil di portal.", "success");
  };

  // Handler saat klik Hapus
  const handleDeleteArticle = (itemToDelete: ArticleItem) => {
    setArticles((prev) => prev.filter((item) => item.id !== itemToDelete.id));
    showToast("Item dihapus. Aksi tercatat di log audit.", "success");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 text-[#231A14]">
      <NewsSectionHeader onCreateNew={handleCreateNew} />
      <PrdCallout />
      <LeaderboardBannerSection />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((item) => (
          <ArticleCard
            key={item.id}
            item={item}
            onEdit={handleEditArticle}
            onContinue={handleEditArticle}
            onArchive={handleArchiveArticle}
            onDelete={handleDeleteArticle}
          />
        ))}
      </div>

      <CreateArticleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        articleToEdit={selectedArticle}
      />
    </div>
  );
}