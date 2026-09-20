"use client";

import { useState } from "react";
import NewsSectionHeader from "@/components/superadmin/news/NewsSectionHeader";
import PrdCallout from "@/components/superadmin/news/PrdCallout";
import LeaderboardBannerSection from "@/components/superadmin/news/LeaderboardBanner";
import ArticleCard, { ArticleItem } from "@/components/superadmin/news/ArticleCard";

export default function SuperadminNewsPage() {
  const [articles] = useState<ArticleItem[]>([
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 text-[#231A14]">
      <NewsSectionHeader />
      <PrdCallout />
      <LeaderboardBannerSection />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((item) => (
          <ArticleCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}