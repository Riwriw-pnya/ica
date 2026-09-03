import { quickAccessItems } from "@/data/anggota";
import DashboardIcon from "./DashboardIcon";
import Link from "next/link";

export default function QuickAccess() {
  return (
    <section className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
      <h2 className="text-sm font-semibold text-[var(--color-ink-900)]">
        Akses cepat
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {quickAccessItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="halftone-hover group relative flex h-[64px] flex-col items-start justify-between overflow-hidden rounded-lg border border-[var(--color-ink-100)] p-3 text-left transition-colors duration-200 hover:border-[var(--color-brand-orange-300)] hover-lift hover:bg-gradient-to-b hover:from-white hover:to-[var(--color-brand-orange-50)]"
          >
            <span className="text-[var(--color-brand-orange-500)]">
              <DashboardIcon name={item.icon} size={16} />
            </span>

            <span className="text-[11px] font-medium text-[var(--color-ink-900)]">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}