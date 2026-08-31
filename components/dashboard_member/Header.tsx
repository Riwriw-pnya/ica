import DashboardIcon from "./DashboardIcon";

export default function Header() {
  return (
    <header className="flex h-[54px] items-center justify-between border-b border-[var(--color-border)] bg-white px-5">
      <h1 className="text-sm font-semibold text-[var(--color-text-primary)]">
        Beranda
      </h1>

      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[11px] font-medium text-[var(--color-brand-orange-700)]">
          AP
        </div>

        <div className="hidden sm:block">
          <p className="text-[12px] font-semibold text-[var(--color-text-primary)]">
            Ayu Prameswari
          </p>
          <p className="text-[10px] text-[var(--color-text-muted)]">
            ICA-M-004821
          </p>
        </div>

        <DashboardIcon name="chevron" size={14} />
      </div>
    </header>
  );
}