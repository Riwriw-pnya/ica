"use client";

interface ConfirmApproveModalProps {
  code: string;
  applicantName: string;
  validCount: number;
  totalCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmApproveModal({ code, applicantName, validCount, totalCount, onCancel, onConfirm }: ConfirmApproveModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={onCancel}>
      <div className="w-full max-w-[480px] rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[16px] font-semibold text-[var(--color-ink-900)]">Setujui aplikasi ini?</h2>
            <p className="mt-1 max-w-[380px] text-[12px] text-[var(--color-ink-700)]">
              Nomor registrasi diterbitkan dan pemohon menerima notifikasi. Persetujuan dicatat atas
              nama Anda.
            </p>
          </div>
          <button onClick={onCancel} className="shrink-0 rounded-full p-1 text-[var(--color-ink-400)] hover:bg-gray-100" aria-label="Tutup">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4 space-y-2 rounded-lg bg-[var(--color-ink-50)] p-4 text-[13px]">
          <div className="flex justify-between"><span className="text-[var(--color-ink-400)]">Aplikasi</span><span className="font-semibold text-[var(--color-ink-900)]">{code}</span></div>
          <div className="flex justify-between"><span className="text-[var(--color-ink-400)]">Pemohon</span><span className="font-semibold text-[var(--color-ink-900)]">{applicantName}</span></div>
          <div className="flex justify-between"><span className="text-[var(--color-ink-400)]">Dokumen valid</span><span className="font-semibold text-[var(--color-ink-900)]">{validCount} dari {totalCount} valid</span></div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-full border border-[var(--color-ink-100)] px-5 py-2.5 text-[13px] font-medium text-[var(--color-ink-700)] hover:bg-gray-50">
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D]"
          >
            Setujui aplikasi
          </button>
        </div>
      </div>
    </div>
  );
}