import React from "react";

const orderSteps = [
  {
    id: 1,
    title: "Pesanan dibuat",
    desc: "05 Sep 2026, 10:22 · MRC-2026-0231",
    status: "completed", // selesai
  },
  {
    id: 2,
    title: "Pembayaran terverifikasi",
    desc: "05 Sep 2026, 11:40 · Virtual Account",
    status: "completed", // selesai
  },
  {
    id: 3,
    title: "Dikemas sekretariat ICA",
    desc: "Sedang berjalan · estimasi 1x24 jam kerja",
    status: "active", // sedang berjalan (border oranye tebal)
  },
  {
    id: 4,
    title: "Dikirim",
    desc: "Nomor resi tampil di sini setelah paket diserahkan ke kurir",
    status: "pending", // belum
  },
  {
    id: 5,
    title: "Diterima",
    desc: "Konfirmasi penerimaan oleh Anda",
    status: "pending", // belum
  },
];

export default function OrderTrackingSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--color-ink-100,#eadecd)] bg-white p-6 shadow-sm">
      {/* Header Baris Utama */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[var(--color-ink-900,#1a1513)]">
            Pesanan merchandise · MRC-2026-0231
          </h2>
          <p className="text-xs text-[var(--color-ink-700,#544940)] mt-0.5">
            Kaos ICA Official 2026 (L, 1 pcs) · Rp 185.000
          </p>
          <p className="text-[11px] text-[var(--color-ink-400,#8c8074)] mt-0.5">
            Dibuat 05 Sep 2026, 10:22 · pengiriman ke Bandung
          </p>
        </div>

        {/* Tombol Lacak Pesanan */}
        <button
          type="button"
          className="self-start rounded-full border border-[var(--color-ink-200,#d9cfc1)] bg-white px-4 py-1.5 text-xs font-semibold text-[var(--color-ink-900,#1a1513)] hover:bg-[var(--color-ink-50,#f7f5f0)] transition-colors cursor-pointer"
        >
          Lacak pesanan
        </button>
      </div>

      {/* Divider */}
      <div className="my-5 h-[1px] w-full bg-[var(--color-ink-100,#eadecd)]" />

      {/* Timeline Status Pesanan */}
      <div className="relative pl-2 space-y-6">
        {orderSteps.map((step, index) => {
          const isCompleted = step.status === "completed";
          const isActive = step.status === "active";
          const isLast = index === orderSteps.length - 1;

          return (
            <div key={step.id} className="relative flex items-start gap-4 group">
              {/* Garis Vertikal Antar Step */}
              {!isLast && (
                <div
                  className={`absolute left-[15px] top-8 bottom-[-24px] w-0.5 ${
                    isCompleted
                      ? "bg-[var(--color-brand-orange-500,#f48637)]"
                      : "bg-[var(--color-ink-200,#d9cfc1)]"
                  }`}
                />
              )}

              {/* Indikator Lingkaran / Icon */}
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center">
                {isCompleted ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-orange-500,#f48637)] text-white shadow-sm">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                ) : isActive ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--color-brand-orange-500,#f48637)] bg-white shadow-sm ring-4 ring-[var(--color-brand-orange-50,#fffaf5)]">
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-brand-orange-500,#f48637)] animate-pulse" />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-ink-200,#d9cfc1)] bg-white text-[var(--color-ink-300,#b5a899)]" />
                )}
              </div>

              {/* Keterangan Teks Detail Timeline */}
              <div className="flex-1 min-w-0 pt-1">
                <h4
                  className={`text-xs font-bold leading-tight ${
                    isCompleted || isActive
                      ? "text-[var(--color-ink-900,#1a1513)]"
                      : "text-[var(--color-ink-400,#8c8074)]"
                  }`}
                >
                  {step.title}
                </h4>
                <p
                  className={`text-[11px] mt-0.5 leading-relaxed ${
                    isActive
                      ? "text-[var(--color-brand-orange-600,#e06c16)] font-medium"
                      : "text-[var(--color-ink-500,#7e7267)]"
                  }`}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Catatan Kaki Bawah */}
      <p className="mt-8 text-[11px] text-[var(--color-ink-400,#8c8074)] italic">
        Timeline pesanan bersifat informasi (read-only) — perubahan status dilakukan sekretariat ICA.
      </p>
    </section>
  );
}