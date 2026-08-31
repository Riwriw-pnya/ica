"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewsSection() {
  const newsItems = [
    // Page 1
    { category: "Pengumuman", date: "24 Agu 2026", title: "Pendaftaran keanggotaan periode 2026/2027 resmi dibuka" },
    { category: "Event", date: "18 Agu 2026", title: "Hasil ICA National Cat Show Bandung 2026" },
    { category: "Keanggotaan", date: "9 Agu 2026", title: "Kartu member kini tersedia dalam format digital" },
    { category: "Event", date: "3 Agu 2026", title: "ICA kembali mengadakan kegiatan komunitas pecinta kucing" },
    { category: "Pengumuman", date: "28 Jul 2026", title: "Jadwal kegiatan ICA bulan Agustus 2026" },
    { category: "Keanggotaan", date: "20 Jul 2026", title: "Informasi terbaru mengenai keanggotaan ICA" },
    // Page 2
    { category: "Edukasi", date: "15 Jul 2026", title: "Tips perawatan kucing ras saat musim pancaroba" },
    { category: "Event", date: "02 Jul 2026", title: "Workshop grooming standar internasional di Jakarta" },
    { category: "Keanggotaan", date: "25 Jun 2026", title: "Pembaruan syarat registrasi cattery resmi ICA" },
    { category: "Pengumuman", date: "10 Jun 2026", title: "Daftar pemenang lomba foto kucing kreatif 2026" },
    { category: "Edukasi", date: "01 Jun 2026", title: "Pentingnya vaksinasi rutin untuk kucing kesayangan" },
    { category: "Event", date: "20 Mei 2026", title: "Gathering bulanan pecinta kucing regional Jawa Barat" },
    // Page 3
    { category: "Pengumuman", date: "12 Mei 2026", title: "Rencana musyawarah nasional anggota ICA 2026" },
    { category: "Keanggotaan", date: "05 Mei 2026", title: "Fasilitas baru untuk member aktif tahun 2026" },
    { category: "Edukasi", date: "22 Apr 2026", title: "Mengenal pola nutrisi ideal untuk anak kucing" },
  ];

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentNews = newsItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Menghitung sisa slot kosong agar tinggi grid tetap konsisten (selalu 6 slot)
  const emptySlotsCount = ITEMS_PER_PAGE - currentNews.length;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="py-16 max-w-6xl mx-auto px-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Berita terbaru</h2>
        <Link href="#" className="text-xs font-medium text-orange-600 hover:underline">
          Lihat semua &rarr;
        </Link>
      </div>

      {/* Grid Berita */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Render kartu berita yang ada */}
        {currentNews.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition duration-200"
          >
            <div className="h-40 bg-[#FFEEDD] flex items-center justify-center">
              <div className="w-4 h-4 border border-orange-400 transform rotate-45" />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-gray-400">
                  {item.category} · {item.date}
                </span>
                <h3 className="font-bold text-xs text-gray-900 mt-2 leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}

        {/* Placeholder transparan untuk menjaga tinggi & posisi grid tidak bergeser */}
        {Array.from({ length: emptySlotsCount }).map((_, idx) => (
          <div
            key={`empty-${idx}`}
            className="invisible rounded-2xl border border-transparent flex flex-col"
            aria-hidden="true"
          >
            <div className="h-40" />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px]">&nbsp;</span>
                <h3 className="text-xs mt-2 leading-snug">&nbsp;</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controller */}
      <div className="flex justify-center items-center gap-2 text-xs">
        {/* Tombol Previous */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition ${
            currentPage === 1
              ? "border-gray-100 text-gray-300 cursor-not-allowed"
              : "border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
          }`}
          aria-label="Previous Page"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Tombol Angka Halaman */}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isActive = currentPage === pageNumber;

          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition ${
                isActive
                  ? "bg-orange-500 text-white shadow-sm"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Tombol Next */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition ${
            currentPage === totalPages
              ? "border-gray-100 text-gray-300 cursor-not-allowed"
              : "border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
          }`}
          aria-label="Next Page"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}