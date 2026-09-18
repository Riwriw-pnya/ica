import Link from "next/link";
import Image from "next/image";

export interface Product {
  id: string;
  title: string;
  category: "apparel" | "aksesori" | "publikasi" | "perawatan";
  categoryLabel: string;
  price: number;
  stock: number;
  image?: string;
  badge?: "Terlaris" | "Baru" | "Stok terbatas";
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Kaos ICA Official 2026",
    category: "apparel",
    categoryLabel: "Apparel",
    price: 185000,
    stock: 48,
    badge: "Terlaris",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9RVxIUO5Rb9G1qfWawYCygc5ru_KMrPrnfW1ezYp2Nj4hxUnixmyS7mM&s",
  },
  {
    id: "2",
    title: "Polo Shirt Panitia Cat Show",
    category: "apparel",
    categoryLabel: "Apparel",
    price: 245000,
    stock: 22,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMTdyhgBoM0uyNqIAI9S_TI68hvitWb0yu2vz8R9WetQ&s=10",
  },
  {
    id: "3",
    title: "Tote Bag Kanvas ICA",
    category: "aksesori",
    categoryLabel: "Aksesori",
    price: 95000,
    stock: 60,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80",
  },
];

function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default function StoreSection() {
  return (
    <div className="rounded-2xl border border-[#EFE9E1] bg-white p-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-base font-semibold text-[#231A14]">
            Store ICA
          </h2>
          <p className="mt-0.5 text-[12px] text-[#8C827A]">
            Merchandise dan publikasi resmi ICA. Pengiriman dari sekretariat setelah pembayaran terverifikasi.
          </p>
        </div>
        <Link
          href="/anggota/store"
          className="shrink-0 text-[12px] font-medium text-[#D95D1E] hover:underline"
        >
          Semua produk &rarr;
        </Link>
      </div>

      {/* Grid 3 Produk */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {INITIAL_PRODUCTS.slice(0, 3).map((product) => (
          <Link
            key={product.id}
            href="/anggota/store"
            className="group cursor-pointer"
          >
            <div className="relative flex h-36 w-full items-center justify-center rounded-xl bg-[#FFF8EE] border border-[#F7F2EB] transition duration-200 group-hover:bg-[#F9EFE3]">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  unoptimized
                  className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex flex-col items-center gap-1.5 text-[#C8BDB2]">
                  <svg className="w-7 h-7 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="mt-2.5">
              <h3 className="text-[13px] font-bold text-[#231A14] line-clamp-1">
                {product.title}
              </h3>
              <p className="mt-0.5 text-[12px] font-extrabold text-[#D95D1E]">
                {formatRupiah(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}