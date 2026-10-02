"use client";

import { catItems } from "@/data/cattery";
import { useToast } from "@/context/ToastContext";
import CatCard from "@/app/cattery/my-cats/components/CatCard";

export default function MyCatsPage() {
  const { showToast } = useToast();

  const handleAddCatClick = () => {
    showToast(
      "Tambah kucing",
      "Data kucing baru masuk lewat mating report yang disetujui admin ICA.",
      { tone: "info" }
    );
  };

  return (
    <main className="min-h-full bg-[var(--color-ink-50)]">
      <div className="mx-auto max-w-[1200px] p-5 lg:p-6">
        {/* Header Section: Flex column di mobile, flex row di desktop */}
        <section className="mb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
          <div>
            <h1 className="hidden md:block font-display text-[24px] font-semibold tracking-tight text-[var(--color-ink-900)]">
              My Cats
            </h1>
            
            {/* Deskripsi berada di atas button pada mobile view */}
            <p className="font-sans text-[13px] md:text-[15px] text-[var(--color-ink-700)]">
              Kucing milik Rumah Hana Cattery.
            </p>
          </div>

          {/* Button Tambah Kucing: Melebar penuh (w-full) di mobile, auto (md:w-auto) di desktop */}
          <button 
            onClick={handleAddCatClick} 
            className="w-full md:w-auto shrink-0 rounded-xl md:rounded-full px-5 py-2.5 text-xs md:text-[13px] font-bold bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white 
              shadow-[0_4px_12px_rgba(238,107,40,0.25)] 
              border-t border-[#FFE5D4]
              hover:-translate-y-0.5 hover:brightness-95 
              active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] 
              transition-all duration-150 cursor-pointer"
          >
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