import Link from "next/link";
import { notFound } from "next/navigation";
import { catProfileDetails, catEventResults, pedigreeCharts } from "@/data/cattery";
import { CatProfileCard } from "./components/CatProfileCard";
import { CatDetailTabs } from "./components/CatDetailTabs";

interface CatDetailPageProps {
  // Next.js 15: route params are async — adjust to `{ id: string }` (no Promise)
  // if your project is still on Next.js 13/14.
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
    <div className="space-y-6 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 bg-[var(--color-ink-50)]">
      <Link
        href="/cattery/my-cats"
        className="inline-flex font-sans font-sm items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ←  Kembali ke My Cats
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <CatProfileCard cat={cat} />
        <CatDetailTabs cat={cat} pedigree={pedigree} events={events} />
      </div>
    </div>
  );
}
