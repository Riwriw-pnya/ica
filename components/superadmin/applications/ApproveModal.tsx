"use client";

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  applicationId: string;
  applicantName: string;
  validDocsCount: number;
  totalDocsCount: number;
}

export default function ApproveModal({
  isOpen,
  onClose,
  onConfirm,
  applicationId,
  applicantName,
  validDocsCount,
  totalDocsCount,
}: ApproveModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EFE9E1] relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-1 mb-6">
          <h2 className="text-lg font-bold text-[#231A14]">Setujui aplikasi ini?</h2>
          <p className="text-xs text-[#8C8078] leading-relaxed">
            Nomor registrasi diterbitkan dan pemohon menerima notifikasi. Persetujuan dicatat atas nama akun Anda.
          </p>
        </div>

        <div className="bg-[#FAF8F5] border border-[#EFE9E1] rounded-2xl p-4 space-y-2 text-xs mb-6">
          <div className="flex justify-between items-center">
            <span className="text-[#8C8078]">Aplikasi</span>
            <span className="font-bold text-[#231A14]">{applicationId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8C8078]">Pemohon</span>
            <span className="font-bold text-[#231A14]">{applicantName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8C8078]">Dokumen valid</span>
            <span className="font-bold text-[#231A14]">
              {validDocsCount} dari {totalDocsCount} valid
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#5A4F48] bg-[#FAF8F5] border border-[#EFE9E1] hover:bg-[#F2EFE9] transition"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-b from-[#FFA066] via-[#EE6B28] to-[#E05510] border border-[#D95A19] shadow-[0_3px_6px_rgba(238,107,40,0.35)] hover:brightness-105 transition"
          >
            Setujui aplikasi
          </button>
        </div>
      </div>
    </div>
  );
}