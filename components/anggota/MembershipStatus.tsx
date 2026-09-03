import Link from "next/link";
import type { MembershipInfo, MembershipHistoryItem } from "@/types/anggota";

interface MembershipStatusProps {
  info: MembershipInfo;
  history: MembershipHistoryItem[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getProgress(startDate: string, endDate: string) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = Date.now();

  const totalDuration = end - start;
  const elapsed = now - start;
  const percent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

  const daysLeft = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));

  return { percent, daysLeft };
}

export default function MembershipStatus({ info, history }: MembershipStatusProps) {
  const { percent, daysLeft } = getProgress(info.startDate, info.endDate);

  const statusColor =
    info.status === "Aktif"
      ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
      : info.status === "Menunggu pembayaran"
        ? "bg-[var(--color-warning-bg)] text-[var(--color-warning)]"
        : "bg-[var(--color-danger-bg)] text-[var(--color-danger)]";

  return (
    <>
      {/* Kartu status utama */}
      <section className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-brand-orange-100)] text-[13px] font-medium text-[var(--color-brand-orange-700)]">
              AP
            </div>
            <div>
              <h2 className="font-display text-[16px] font-semibold text-[var(--color-ink-900)]">
                {info.name}
              </h2>
              <p className="text-[12px] text-[var(--color-ink-400)]">
                {info.memberId} · {info.region}
              </p>
            </div>
          </div>

          <span className={`rounded-full px-3 py-1 text-[11px] font-medium ${statusColor}`}>
            {info.status}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div>
            <p className="text-[11px] text-[var(--color-ink-400)]">Mulai berlaku</p>
            <p className="mt-0.5 text-[13px] font-semibold text-[var(--color-ink-900)]">
              {formatDate(info.startDate)}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-[var(--color-ink-400)]">Berakhir</p>
            <p className="mt-0.5 text-[13px] font-semibold text-[var(--color-ink-900)]">
              {formatDate(info.endDate)}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-[var(--color-ink-400)]">Sisa masa berlaku</p>
            <p className="mt-0.5 text-[13px] font-semibold text-[var(--color-ink-900)]">
              {daysLeft} hari
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-ink-100)]">
            <div
              className="h-full rounded-full bg-[var(--color-brand-orange-500)] transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-[var(--color-ink-400)]">
            Perpanjangan dapat dilakukan mulai 60 hari sebelum tanggal berakhir.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3 border-t border-[var(--color-ink-100)] pt-5">
          <button className="px-6 py-3.5 rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs 
              shadow-[0_4px_12px_rgba(238,107,40,0.25)] 
              border-t border-[#FFE5D4]
              hover:-translate-y-0.5 hover:brightness-95 
              active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] 
              transition-all duration-150 cursor-pointer">
            Perpanjang keanggotaan
          </button>
          <button className="border border-[var(--color-ink-100)] text-[13px] font-medium text-[var(--color-ink-700)]
          px-6 py-3.5 rounded-full bg-gradient-to-b from-[var(--color-ink-300)] to-white shadow-sm shadow-black/5
              hover:shadow-md 
              hover:-translate-y-0.5 hover:brightness-95 
              active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] 
              transition-all duration-150 cursor-pointer">
            Unduh kartu member
          </button>
        </div>
      </section>

      {/* Ajakan daftar cattery */}
      <section className="mt-4 rounded-xl border border-[var(--color-brand-orange-300)] bg-[var(--color-brand-orange-50)] p-5">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-[15px] font-semibold text-[var(--color-ink-900)]">
              Ingin mendaftarkan cattery Anda?
            </h3>
            <p className="mt-1 max-w-xl text-[12px] text-[var(--color-ink-700)]">
              Member aktif dapat mengajukan status cattery untuk mendaftarkan kucing,
              mengirim mating report, dan mengelola pedigree. Pengajuan diproses oleh
              admin wilayah Anda.
            </p>
          </div>

          <Link
            href="/anggota/keanggotaan"
            className="shrink-0 rounded-full px-6 py-3.5 bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs 
              shadow-[0_4px_12px_rgba(238,107,40,0.25)] 
              border-t border-[#FFE5D4]
              hover:-translate-y-0.5 hover:brightness-95 
              active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] 
              transition-all duration-150 cursor-pointer"
          >
            Ajukan sebagai Cattery
          </Link>
        </div>
      </section>

      {/* Riwayat keanggotaan */}
      <section className="mt-4 rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
        <h3 className="font-display text-sm font-semibold text-[var(--color-ink-900)]">
          Riwayat keanggotaan
        </h3>

        <div className="mt-3 divide-y divide-[var(--color-ink-100)]">
          {history.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-orange-500)]" />
                <p className="text-[12px] text-[var(--color-ink-900)]">{item.title}</p>
              </div>
              <p className="shrink-0 text-[11px] text-[var(--color-ink-400)]">{item.date}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}