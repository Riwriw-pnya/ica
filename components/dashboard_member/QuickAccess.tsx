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
            className="flex h-[64px] flex-col items-start justify-between rounded-lg border border-[var(--color-border)] p-3 text-left transition hover:border-[var(--color-brand-orange-300)] hover:bg-[var(--color-brand-orange-50)] hover-lift"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                backgroundImage:
                  "radial-gradient(var(--color-brand-orange-300) 1px, transparent 1px)",
                backgroundSize: "8px 8px",
                backgroundColor: "var(--color-brand-orange-50)",
              }}
            />

            <span className="relative z-10 text-[var(--color-brand-orange-500)]">
              <DashboardIcon name={item.icon} size={16} />
            </span> 

            <span className="text-[11px] font-medium text-[var(--color-ink-900)]">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}