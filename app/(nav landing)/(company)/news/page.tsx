"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/app/landing-page/components/Navbar"; 
import Footer from "@/app/landing-page/components/Footer"; 

const ARTICLES = [
  {
    id: "1",
    title: "Panduan Lengkap Merawat Bulu Kucing Persia Saat Musim Pancaroba",
    slug: "panduan-merawat-bulu-kucing-persia",
    category: "Edukasi & Perawatan",
    date: "28 Agu 2026",
    readTime: "5 min baca",
    excerpt: "Musim pancaroba sering membuat bulu kucing rontok berlebihan. Ketahui trik grooming harian dan nutrisi terbaik untuk menjaga kilau bulu kucing kesayangan.",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Hasil Cat Show Internasional FIFe / ICA Jakarta 2026",
    slug: "hasil-cat-show-fife-ica-jakarta-2026",
    category: "Event & Pameran",
    date: "20 Agu 2026",
    readTime: "4 min baca",
    excerpt: "Selamat kepada para pemenang National Winner! Simak liputan kemeriahan dan daftar kucing terbaik pada pameran tahunan kali ini.",
    isFeatured: false,
  },
  {
    id: "3",
    title: "Syarat & Prosedur Terbaru Pendaftaran Cattery Resmi ICA",
    slug: "syarat-pendaftaran-cattery-resmi-ica",
    category: "Pengumuman Resmi",
    date: "15 Agu 2026",
    readTime: "7 min baca",
    excerpt: "Penting bagi calon pembiak! Berikut pembaruan regulasi dan dokumen yang dibutuhkan untuk registrasi nama cattery resmi di tahun ini.",
    isFeatured: false,
  },
  {
    id: "4",
    title: "Mengenal Ras Kucing Busok: Kucing Asli Pulau Raas Madura",
    slug: "mengenal-ras-kucing-busok",
    category: "Edukasi & Perawatan",
    date: "10 Agu 2026",
    readTime: "6 min baca",
    excerpt: "Kucing Busok memiliki keunikan fisik dan karakter yang khas. Mari mengenal lebih dekat kekayaan fauna asli Indonesia yang sedang diperjuangkan sertifikasinya.",
    isFeatured: false,
  },
  {
    id: "5",
    title: "Tips Memilih Makanan Kering (Dry Food) Sesuai Usia Kucing",
    slug: "tips-memilih-dry-food-kucing",
    category: "Edukasi & Perawatan",
    date: "02 Agu 2026",
    readTime: "5 min baca",
    excerpt: "Jangan salah pilih kadar protein! Ketahui kebutuhan nutrisi kitten, kucing dewasa, hingga kucing senior agar tetap sehat berstamina.",
    isFeatured: false,
  },
  {
    id: "6",
    title: "Jadwal Gathering & Seminar Edukasi Cabang Bandung Sept 2026",
    slug: "jadwal-gathering-ica-bandung-2026",
    category: "Komunitas",
    date: "25 Jul 2026",
    readTime: "3 min baca",
    excerpt: "Undangan terbuka untuk seluruh member daerah Jawa Barat. Yuk kumpul santai dan diskusi seputar penanganan kesehatan kucing bersama dokter hewan profesional.",
    isFeatured: false,
  },
];

const CATEGORIES = ["Semua", "Edukasi & Perawatan", "Event & Pameran", "Pengumuman Resmi", "Komunitas"];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredArticle = ARTICLES.find((a) => a.isFeatured);

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === "Semua" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#231A14] flex flex-col justify-between">
      <div>
        {/* Navbar Component */}
        <Navbar />

        {/* Hero Banner Section */}
        <section className="bg-[#FFF6EC] border-b border-[#F3D1BD]/40 py-16 md:py-20 px-6">
          <div className="max-w-6xl mx-auto text-center space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#EE6B28]/10 text-[#EE6B28] text-xs font-bold tracking-wider uppercase">
              ICA Media Center
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#231A14] tracking-tight">
              News & Blog
            </h1>
            <p className="text-sm md:text-base text-[#7A6E65] max-w-2xl mx-auto font-normal">
              Kabar terbaru seputar event resmi ICA, panduan perawatan kucing, info regulasi cattery, dan wawasan dunia felinologi.
            </p>

            {/* Search Bar */}
            <div className="pt-6 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari artikel atau topik..."
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#E9E2DC] text-xs md:text-sm text-[#231A14] placeholder:text-[#A89F95] focus:outline-none focus:border-[#EE6B28] shadow-sm transition"
                />
                <svg
                  className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#A89F95]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="max-w-6xl mx-auto px-6 py-12 md:py-16 space-y-10">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#EE6B28] text-white shadow-sm"
                    : "bg-white border border-[#E9E2DC] text-[#7A6E65] hover:border-[#EE6B28] hover:text-[#EE6B28]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Article Card (Tanpa Image) */}
          {selectedCategory === "Semua" && !searchQuery && featuredArticle && (
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#EE6B28]/20 bg-gradient-to-br from-white via-white to-[#FFF6EC]/50 shadow-sm hover:shadow-md transition space-y-6 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EE6B28]/5 rounded-bl-full pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-[#EE6B28] text-white font-bold tracking-wide">
                    Artikel Utama
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FFF6EC] text-[#EE6B28] font-bold">
                    {featuredArticle.category}
                  </span>
                  <span className="text-[#A89F95]">•</span>
                  <span className="text-[#7A6E65]">{featuredArticle.date}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-[#231A14] group-hover:text-[#EE6B28] transition leading-snug max-w-4xl">
                  <Link href={`/news/${featuredArticle.slug}`}>
                    {featuredArticle.title}
                  </Link>
                </h2>
                <p className="text-sm text-[#7A6E65] leading-relaxed max-w-3xl">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#F7F4F1]">
                <span className="text-xs text-[#A89F95] font-medium">{featuredArticle.readTime}</span>
                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="text-xs font-bold text-[#EE6B28] hover:underline inline-flex items-center gap-1.5"
                >
                  Baca Selengkapnya
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          )}

          {/* Grid List Articles (Tanpa Image) */}
          <div className="space-y-6">
            <h3 className="text-xl font-extrabold text-[#231A14]">
              {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : "Artikel Terbaru"}
            </h3>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E9E2DC] space-y-3">
                <p className="text-base font-bold text-[#231A14]">Artikel tidak ditemukan</p>
                <p className="text-xs text-[#7A6E65]">Coba gunakan kata kunci lain atau ubah filter kategori.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-2xl p-6 border border-[#E9E2DC] shadow-sm hover:shadow-md hover:border-[#F3D1BD] transition flex flex-col justify-between space-y-6 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#EE6B28] bg-[#FFF6EC] px-2.5 py-1 rounded-md">
                          {article.category}
                        </span>
                        <span className="text-[#7A6E65]">{article.date}</span>
                      </div>
                      <h4 className="text-base font-bold text-[#231A14] group-hover:text-[#EE6B28] transition line-clamp-2 leading-snug pt-1">
                        <Link href={`/news/${article.slug}`}>{article.title}</Link>
                      </h4>
                      <p className="text-xs text-[#7A6E65] line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-[#F7F4F1]">
                      <span className="text-[11px] text-[#A89F95]">{article.readTime}</span>
                      <Link
                        href={`/news/${article.slug}`}
                        className="text-xs font-bold text-[#EE6B28] hover:underline inline-flex items-center gap-1"
                      >
                        Baca
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}