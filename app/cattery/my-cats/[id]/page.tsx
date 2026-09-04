import Link from "next/link";
import { catItems } from "@/data/cattery";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import QualityBadge from "@/app/cattery/my-cats/components/QualityBadge";
import PedigreeChart from "./components/PedigreeChart";
import Silsilah from "./components/Silsilah";
import PedigreeStatusSection from "./components/PedigreeStatusSection";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CatDetailPage({ params }: PageProps) {
  const { id } = await params;
  const cat = catItems.find((item) => item.id === Number(id));

  if (!cat) {
    return (
      <main className="flex min-h-full items-center justify-center bg-[var(--color-ink-50)] p-5">
        <p className="text-[13px] text-[var(--color-ink-400)]">Kucing tidak ditemukan.</p>
      </main>
    );
  }

  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="mx-auto max-w-[800px] space-y-4 p-5 lg:p-6">
        <Link href="/cattery/my-cats" className="text-[12px] font-medium text-[var(--color-brand-orange-700)] hover:underline">
          ← Kembali ke My Cats
        </Link>

        <div className="overflow-hidden rounded-xl border border-[var(--color-ink-100)] bg-white">
          <div className="relative flex h-56 flex-col items-center justify-center gap-2 border-b border-[var(--color-ink-100)] bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-500)]">
            <DashboardIcon name="cat" size={36} />
            <p className="text-[12px] text-[var(--color-ink-700)]">Foto belum diunggah</p>

            <button className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-[var(--color-brand-orange-300)] bg-white px-3 py-1.5 text-[11px] font-medium text-[var(--color-brand-orange-700)] transition hover:bg-[var(--color-brand-orange-50)]">
              <DashboardIcon name="upload" size={12} />
              Unggah foto
            </button>

            {cat.qualityBadge && (
              <span className="absolute left-3 top-3">
                <QualityBadge badge={cat.qualityBadge} />
              </span>
            )}
          </div>

          <div className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-[18px] font-semibold text-[var(--color-ink-900)]">{cat.name}</h1>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  cat.gender === "Male"
                    ? "bg-[var(--color-info-bg)] text-[var(--color-info)]"
                    : "bg-[var(--color-brand-rose-50)] text-[#ac3d43]"
                }`}
              >
                {cat.gender}
              </span>
              {cat.pedigreeStatus === "Terverifikasi" && (
                <span className="rounded-full bg-[var(--color-success-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-success)]">
                  Pedigree
                </span>
              )}
            </div>
            <p className="mt-1 text-[12px] text-[var(--color-ink-400)]">
              {cat.breed} · {cat.regCode}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-[var(--color-ink-100)] pt-4 sm:grid-cols-3">
              <div>
                <p className="text-[10px] text-[var(--color-ink-400)]">Skor kesehatan (admin)</p>
                <p className="text-[15px] font-semibold text-[var(--color-brand-orange-700)]">{cat.healthScore}</p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--color-ink-400)]">Cat show dibayar</p>
                <p className="text-[15px] font-semibold text-[var(--color-ink-900)]">{cat.paidShows} event</p>
              </div>
            </div>
          </div>
        </div>

        <PedigreeChart catName={cat.name} sireName={cat.sireName} damName={cat.damName} />
        <Silsilah sireName={cat.sireName} damName={cat.damName} />
        <PedigreeStatusSection status={cat.pedigreeStatus} />
      </div>
    </main>
  );
}