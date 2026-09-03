import Link from "next/link";

export default function AjukanCatteryPage() {
  return (
    <main className="flex min-h-full items-center justify-center bg-[var(--color-ink-50)] p-5">
      <div className="w-full max-w-[440px] rounded-xl border border-[var(--color-ink-100)] bg-white p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-success-bg)]">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-success)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-display mt-4 text-[17px] font-semibold text-[var(--color-ink-900)]">
          Pengajuan cattery dimulai
        </h1>

        <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-ink-700)]">
          Data member Anda akan dibawa ke formulir pendaftaran cattery.
          Setelah disetujui admin, Anda menerima verification code untuk
          masuk ke Cattery Portal.
        </p>

        <Link
          href="/landing-page"
          className="mt-6 block px-6 py-2.5 rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white font-bold text-xs 
              shadow-[0_4px_12px_rgba(238,107,40,0.25)] 
              border-t border-[#FFE5D4]
              hover:-translate-y-0.5 hover:brightness-95 
              active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.15)] 
              transition-all duration-150 cursor-pointer">
          Lanjut ke flow Cattery
        </Link>

        <Link
          href="/anggota/keanggotaan"
          className="mt-3 block text-[12px] font-medium text-[var(--color-ink-400)] hover:text-[var(--color-ink-700)]"
        >
          Kembali ke keanggotaan
        </Link>
      </div>
    </main>
  );
}