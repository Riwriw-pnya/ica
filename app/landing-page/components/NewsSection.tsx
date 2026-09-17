"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NewsItem {
  category?: string;
  date: string;
  title: string;
  description?: string;
  link: string;
  image?: string;
}

export default function NewsSection() {
  const newsItems: NewsItem[] = [
    {
      date: "16 Jan 2026",
      title: "INTERNATIONAL WINNER RULES",
      link: "https://ica.or.id/international-winner-rules/",
      description:
        "Ketentuan mendapatkan gelar / title “International Winner (IW)” Gelar ini diberikan kepada kucing dari varietas dan ras-ras yang telah diakui penuh (Fully Recognised) di Federation.",
    },
    {
      date: "05 Jul 2023",
      title: "Propaganda Cat show, Fun Cat Show & Lomba Kucing Sehat Indonesian Cat Association",
      link: "https://ica.or.id/propaganda-cat-show-fun-cat-show-lomba-kucing-sehat-indonesian-cat-association/",
      description:
        "Propaganda Cat Show Bertujuan hanya untuk mempropagandakan kegiatan perkucingan, dimana peserta show tidak dapat mengejar perolehan sertifikat show, tetapi untuk Propaganda ICA, masih bermanfaat buat",
    },
    {
      date: "01 Maret 2023",
      title: "NATIONAL WINNER RULES",
      link: "https://ica.or.id/national-winner-rules/",
      description:
        "Ketentuan mendapatkan gelar / title “National Winner (NW)” Gelar ini diberikan kepada kucing dari varietas dan ras-ras yang telah diakui penuh (Fully Recognised) di Federation",
    },
    {
      date: "02 Sep 2022",
      title: "188 Kucing Lucu mengikuti ICA-FIFe International Cat Show di Jakarta",
      link: "https://ica.or.id/188-kucing-lucu-mengikuti-ica-fife-international-cat-show-di-jakarta/",
      description:
        "Foto : Juri ICA-FIFe International Cat Show ke-206 dan ke-207 (dari kiri ke kanan): Pia Nyrup dari Denmark, Magdalena Kudra dari Polandia, dan Aina Hauge",
    },
    {
      date: "29 Jun 2022",
      title: "Pengobatan dan Pencegahan Terhadap Toxoplasma Gondii",
      link: "https://ica.or.id/pengobatan-dan-pencegahan-terhadap-toxoplasma-gondii/",
      description:
        "Pengobatan Pengobatan yang tersedia pada hewan dan manusia saat ini belum sepenuhnya memberikan hasil yang memuaskan. Pengobatan hanya efektif apabila Toxoplasma Gondii terdapat pada fase",
    },
    {
      date: "24 Jun 2022",
      title: "Perlukah Menyikat Bulu Kucing Secara Teratur?",
      link: "https://ica.or.id/perlukah-menyikat-bulu-kucing-secara-teratur/",
      description:
        "Meskipun kucing terkenal sebagai hewan yang selalu merawat diri, namun sebagai pemilik hewan peliharaan, Anda masih tetap harus menyisir atau menyikat bulu kucing. Sebab, terkadang",
    },
  ];

  return (
    <section className="py-16 max-w-6xl mx-auto px-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Berita terbaru</h2>

        <Link
          href="/news"
          className="group inline-flex items-center gap-2 text-xs font-semibold text-[#C85A17] hover:text-[#EE6B28] transition"
        >
          <span>Lihat semua</span>
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>

      {/* Grid 6 Berita */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {newsItems.map((item, idx) => (
          <NewsCard key={idx} item={item} />
        ))}
      </div>
    </section>
  );
}

// Sub-komponen Kartu Berita (Auto-fetch gambar & deskripsi lewat API /api/fetch-img)
function NewsCard({ item }: { item: NewsItem }) {
  const [imageUrl, setImageUrl] = useState<string | null>(item.image || null);
  const [fetchedDesc, setFetchedDesc] = useState<string | null>(null);
  const [loading, setLoading] = useState(!item.image);

  useEffect(() => {
    // Jika gambar sudah diisi manual di item.image, tidak perlu fetch lagi
    if (item.image) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    fetch(`/api/fetch-img?url=${encodeURIComponent(item.link)}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setImageUrl(data.image || null);
          setFetchedDesc(data.description || null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setImageUrl(null);
          setFetchedDesc(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [item.link, item.image]);

  const displayDescription = item.description || fetchedDesc;

  return (
    <Link
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:shadow-md hover:-translate-y-1 transition duration-200 h-full"
    >
      {/* Skeleton Loading */}
      {loading && <div className="h-40 w-full bg-gray-100 animate-pulse shrink-0" />}

      {/* Render Foto jika ditemukan */}
      {!loading && imageUrl && (
        <div className="relative h-40 w-full overflow-hidden bg-orange-50 shrink-0">
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageUrl(null)}
          />
        </div>
      )}

      {/* Detail Konten */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] text-gray-400">
            {item.category ? `${item.category} · ` : ""}
            {item.date}
          </span>

          <h3 className="font-bold text-xs text-gray-900 mt-1.5 leading-snug group-hover:text-[#EE6B28] transition">
            {item.title}
          </h3>

          {/* Deskripsi (line-clamp-2 jika ada gambar, line-clamp-4 jika tidak ada gambar) */}
          {displayDescription && (
            <p
              className={`text-xs text-gray-500 mt-2 leading-relaxed ${
                imageUrl ? "line-clamp-2" : "line-clamp-4"
              }`}
            >
              {displayDescription}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}