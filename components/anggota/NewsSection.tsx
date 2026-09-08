import { newsItems } from "@/data/anggota";
import Link from "next/link";
import Image from "next/image";

export default function LandingNewsSection() {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Berita terbaru</h2>
        <Link
          href="https://ica.or.id"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
        >
          Lihat semua →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsItems.slice(0, 3).map((item) => {
          const isExternal = item.href.startsWith("http");

          return (
            <Link
              key={item.id}
              href={item.href}
              target={isExternal ? "_blank" : "_self"}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group flex flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white transition hover:shadow-lg"
            >
              {/* Container Foto */}
              <div className="relative h-48 w-full bg-orange-50 overflow-hidden">
                <Image
                  src={item.image || "/images/cattt.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Konten Teks */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-xs text-gray-500 mb-2">
                    {item.category} · {item.date}
                  </p>
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}