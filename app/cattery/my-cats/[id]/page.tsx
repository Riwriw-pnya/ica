import Link from "next/link";
import { notFound } from "next/navigation";
import { catProfileDetails, catEventResults, pedigreeCharts } from "@/data/cattery";
import { CatProfileCard } from "./components/CatProfileCard";
import { CatDetailTabs } from "./components/CatDetailTabs";

interface CatDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CatDetailPage({ params }: CatDetailPageProps) {
  const { id } = await params;
  const catId = Number(id);

  const cat = catProfileDetails.find((item) => item.id === catId);
  if (!cat) {
    notFound();
  }

  const pedigree = pedigreeCharts.find((item) => item.catId === catId);
  const events = catEventResults.filter((item) => item.catId === catId);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8 bg-[var(--color-ink-50)] space-y-4">
      <Link
        href="/cattery/my-cats"
        className="inline-flex font-sans text-sm items-center gap-1 font-medium text-orange-600 hover:text-orange-700"
      >
        ← Kembali ke My Cats
      </Link>

      {/* Grid Layout Desktop: Menggunakan flex/grid yang terkunci tingginya */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[320px_1fr] lg:h-[calc(100vh-120px)]">
        
        {/* Kolom Kiri: Card Profile (Fixed & Diam di Desktop) */}
        <div className="hidden lg:block">
          <CatProfileCard cat={cat} />
        </div>

        {/* Kolom Kanan: Tab dan Kontennya */}
        <div className="min-w-0 h-full flex flex-col overflow-hidden">
          <CatDetailTabs cat={cat} pedigree={pedigree} events={events} />
        </div>
      </div>
    </div>
  );
}