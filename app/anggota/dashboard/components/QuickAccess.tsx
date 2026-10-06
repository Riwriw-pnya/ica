import { quickAccessItems } from "@/data/anggota";
import DashboardIcon from "../../../../components/anggota/DashboardIcon";
import Link from "next/link";

export default function QuickAccess() {
  return (
    <section className="w-full max-w-full sm:rounded-xl sm:border sm:border-[var(--color-ink-100)] sm:bg-white sm:p-5 sm:shadow-xs">
      <h2 className="hidden sm:block text-sm font-semibold text-[var(--color-ink-900)]">
        Akses cepat
      </h2>

      {/* Grid 2x2 Kartu Akses Cepat */}
      <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:gap-2">
        {quickAccessItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group relative flex h-[84px] sm:h-[64px] flex-col items-start justify-between rounded-2xl sm:rounded-lg border border-[var(--color-ink-100)] bg-white p-3.5 sm:p-3 text-left shadow-xs sm:shadow-none transition-all duration-200 ease-in-out hover:-translate-y-[2px] hover:border-[var(--color-brand-orange-300)] hover:bg-gradient-to-b hover:from-white hover:to-[var(--color-brand-orange-50)] hover:shadow-[0_6px_12px_-4px_rgba(168,75,22,0.22)] active:translate-y-0"
          >
            <span className="text-[var(--color-brand-orange-500)]">
              <DashboardIcon name={item.icon} size={20} />
            </span>

            <span className="text-[12px] sm:text-[11px] font-bold sm:font-medium text-[var(--color-ink-900)]">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}