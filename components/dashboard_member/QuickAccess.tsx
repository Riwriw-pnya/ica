import { quickAccessItems } from "@/data/dashboard_member";
import DashboardIcon from "./DashboardIcon";

export default function QuickAccess() {
  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
      <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
        Akses cepat
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {quickAccessItems.map((item) => (
          <button
            key={item.id}
            className="flex h-[64px] flex-col items-start justify-between rounded-lg border border-[var(--color-border)] p-3 text-left transition hover:border-[var(--color-brand-orange-300)] hover:bg-[var(--color-brand-orange-50)]"
          >
            <DashboardIcon
              name={item.icon}
              size={16}
            />

            <span className="text-[11px] font-medium text-[var(--color-ink-900)]">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}