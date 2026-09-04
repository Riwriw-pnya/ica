import { catItems } from "@/data/cattery";
import CatCard from "@/app/cattery/my-cats/components/CatCard";

export default function MyCatsPage() {
  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="mx-auto max-w-[1200px] p-5 lg:p-6">
        <section className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-ink-900)]">
              My Cats
            </h1>
            <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
              Kucing milik Rumah Hana Cattery. Foto kucing dipakai di leaderboard dan mating report.
            </p>
          </div>

          <button className="shrink-0 rounded-full px-5 py-2.5 text-[13px] font-semibold bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs 
              shadow-[0_4px_12px_rgba(238,107,40,0.25)] 
              border-t border-[#FFE5D4]
              hover:-translate-y-0.5 hover:brightness-95 
              active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] 
              transition-all duration-150 cursor-pointer">
            + Tambah kucing
          </button>
        </section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catItems.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </div>
      </div>
    </main>
  );
}