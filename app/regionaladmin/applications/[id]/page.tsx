"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { applicationDetails } from "@/data/regionalAdmin";
import { useToast } from "@/context/ToastContext";
import ApplicationStatusBadge from "../components/ApplicationStatusBadge";
import ConfirmApproveModal from "./components/ConfirmApproveModal";
import RejectModal from "./components/RejectModal";
import RequestRevisionModal from "./components/RequestRevisionModal";

// Menyamakan tipe data dengan interface dari @/data/regionalAdmin
interface DocumentItem {
  id: string;
  label: string;
  fileType: string;
  sizeLabel: string;
  uploadedDate: string;
  url?: string;
  isValid?: boolean | null; // Ditambahkan null agar cocok dengan tipe dari data/regionalAdmin
}

interface PageProps {
  params: Promise<{ id: string }>;
}

// Dummy PDF Data URI singkat yang valid untuk preview PDF internal tanpa masalah CORS/X-Frame
const DUMMY_PDF_DATA_URI =
  "data:application/pdf;base64,JVBERi0xLjQKJSDi483NCiAxIDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+CmVuZG9iagoyIDAgb2JqCjw8L1R5cGUvUGFnZXMvQ291bnQgMS9LaWRzWzMgMCBSXT4+CmVuZG9iagozIDAgb2JqCjw8L1R5cGUvUGFnZS9QYXJlbnQgMiAwIFIvTWVkaWFCb3hbMCAwIDYxMiA3OTJdL0NvbnRlbnRzIDQgMCBSL1Jlc291cmNlczw8Pj4+CmVuZG9iago0IDAgb2JqCjw8L0xlbmd0aCA1Nz4+CnN0cmVhbQpCVAovRjEgMjQgVGYKIDEwMCA3MDAgVGQKKERva3VtZW4gUHJldmlldyBJQ0EpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKdHJhaWxlcgo8PC9Sb290IDEgMCBSL1NpemUgNT4+CiUlRU9G";

export default function ApplicationReviewPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { showToast } = useToast();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRevisionModal, setShowRevisionModal] = useState(false);

  // State untuk Modal Preview Dokumen
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const detail = applicationDetails[id];

  const [docs, setDocs] = useState<DocumentItem[]>(detail?.documents ?? []);
  const [note, setNote] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [approvedInfo, setApprovedInfo] = useState<{
    regNumber: string;
    approvedAt: string;
  } | null>(null);

  if (!detail) {
    return (
      <main className="flex min-h-full items-center justify-center p-5">
        <p className="text-[13px] text-[var(--color-ink-400)]">
          Aplikasi tidak ditemukan.
        </p>
      </main>
    );
  }

  const validCount = docs.filter((d) => d.isValid === true).length;

  const markDoc = (docId: string, isValid: boolean) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, isValid } : d))
    );
  };

  const handleOpenPreview = (docId: string) => {
    setSelectedDocId(docId);
    setIsPreviewOpen(true);
  };

  const handleDownloadAll = () => {
    showToast(
      "Semua berkas aplikasi diunduh sebagai satu arsip ZIP.",
      "",
      { tone: "success" }
    );
  };

  const handleApprove = () => {
    const regNumber = `ICA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const approvedAt = new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setApprovedInfo({ regNumber, approvedAt });
    setIsApproved(true);
    setShowConfirm(false);
    showToast(
      `${detail.code} disetujui.`,
      "Nomor registrasi diterbitkan dan diteruskan ke Super Admin."
    );
  };

  const handleConfirmReject = (reason: string, notes: string) => {
    setShowRejectModal(false);
    showToast(`${detail.code} ditolak.`, `Alasan: ${reason}. ${notes}`, {
      tone: "error",
    });
  };

  const handleConfirmRevision = (items: string[], notes: string) => {
    setShowRevisionModal(false);
    showToast(
      `Revisi diminta untuk ${detail.code}.`,
      "Pemohon menerima notifikasi keterangan revisi."
    );
  };

  if (isApproved && approvedInfo) {
    return (
      <main className="min-h-full">
        <div className="mx-auto flex max-w-[600px] items-center justify-center">
          <div className="w-full rounded-2xl border border-[var(--color-ink-100)] bg-white p-8 text-center shadow-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-success-bg)]">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="var(--color-success)"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="font-display mt-4 text-[19px] font-semibold text-[var(--color-ink-900)]">
              Aplikasi disetujui
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-ink-700)]">
              {detail.code} disetujui atas nama Dewi Larasati sebagai keputusan
              final Regional Admin Bandung. Nomor registrasi diterbitkan
              otomatis, notifikasi dikirim ke pemohon, dan hasilnya masuk
              sebagai notifikasi di dashboard Super Admin.
            </p>

            <div className="mt-5 space-y-2 rounded-lg bg-[var(--color-ink-50)] p-4 text-left text-[13px]">
              <div className="flex justify-between">
                <span className="text-[var(--color-ink-400)]">
                  Nomor registrasi
                </span>
                <span className="font-semibold text-[var(--color-ink-900)]">
                  {approvedInfo.regNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-ink-400)]">Disetujui</span>
                <span className="font-semibold text-[var(--color-ink-900)]">
                  {approvedInfo.approvedAt}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-ink-400)]">Wilayah</span>
                <span className="font-semibold text-[var(--color-ink-900)]">
                  {detail.region}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => setIsApproved(false)}
                className="rounded-full border border-[var(--color-ink-100)] px-6 py-2.5 text-[13px] font-medium text-[var(--color-ink-700)] hover:bg-gray-50 cursor-pointer"
              >
                Lihat detail aplikasi
              </button>
              <Link
                href="/regionaladmin/applications"
                className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D]"
              >
                Review aplikasi berikutnya →
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-full">
      <div className="mx-auto max-w-[1200px]">
        <Link
          href="/regionaladmin/applications"
          className="text-[12px] font-medium text-[var(--color-brand-orange-700)] hover:underline"
        >
          ← Kembali ke Application Queue
        </Link>

        <div className="mt-3 rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[16px] font-semibold text-[var(--color-ink-900)]">
                  {detail.code}
                </h1>
                <ApplicationStatusBadge status={detail.status} />
                <span className="rounded-full border border-[var(--color-ink-100)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-ink-700)]">
                  {detail.region}
                </span>
              </div>
              <p className="mt-1 text-[12px] text-[var(--color-ink-400)]">
                {detail.applicantType} · {detail.applicantName} · dikirim{" "}
                {detail.submittedDate} · {detail.waitingLabel} di antrean
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleDownloadAll}
                className="rounded-full border border-[var(--color-ink-100)] px-4 py-2 text-[12px] font-semibold text-[var(--color-ink-700)] hover:bg-gray-50 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-xs cursor-pointer"
              >
                ↓ Unduh berkas
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                className="rounded-full bg-[var(--color-danger)] px-4 py-2 text-[12px] font-semibold text-white hover:brightness-95 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-xs cursor-pointer"
              >
                Tolak aplikasi
              </button>
              <button
                onClick={() => setShowRevisionModal(true)}
                className="rounded-full border border-[var(--color-brand-orange-300)] px-4 py-2 text-[12px] font-semibold text-[var(--color-brand-orange-700)] hover:bg-[var(--color-brand-orange-50)] shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-xs cursor-pointer"
              >
                Minta revisi
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-[12px] font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-xs"
              >
                ✓ Setujui aplikasi
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-[var(--color-info)]/30 bg-[var(--color-info-bg)] p-4 text-[12px] text-[var(--color-info)]">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          Keputusan Anda final untuk wilayah {detail.region}. Hasilnya dikirim ke
          pemohon dan diteruskan sebagai notifikasi ke Super Admin — tanpa
          persetujuan lanjutan dari pusat.
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
              <h2 className="text-[14px] font-semibold text-[var(--color-ink-900)]">
                Data pemohon
              </h2>
              <div className="mt-3 space-y-2.5 text-[13px]">
                <Row label="Pemohon" value={detail.applicant.applicantName} />
                <Row label="No. keanggotaan" value={detail.applicant.memberCode} />
                <Row label="Cattery" value={detail.applicant.catteryName} />
                <Row label="Wilayah" value={detail.applicant.region} />
                <Row label="Pasangan" value={detail.applicant.pair} />
                <Row label="Tanggal mating" value={detail.applicant.matingDate} />
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[14px] font-semibold text-[var(--color-ink-900)]">
                    Verifikasi dokumen
                  </h2>
                  <p className="mt-0.5 text-[12px] text-[var(--color-ink-400)]">
                    Tandai setiap dokumen valid atau tidak valid sebelum
                    memutuskan.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[var(--color-ink-100)] px-3 py-1 text-[11px] font-medium text-[var(--color-ink-700)]">
                  {validCount} dari {docs.length} valid
                </span>
              </div>

              <div className="mt-3 space-y-2.5">
                {docs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--color-brand-orange-100)] bg-[var(--color-brand-orange-50)] p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[var(--color-brand-orange-700)]">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </span>
                      <div>
                        <p className="text-[13px] font-medium text-[var(--color-ink-900)]">
                          {doc.label}
                        </p>
                        <p className="text-[11px] text-[var(--color-ink-400)]">
                          {doc.fileType} · {doc.sizeLabel} · diunggah{" "}
                          {doc.uploadedDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenPreview(doc.id)}
                        className="rounded-full border border-[var(--color-ink-100)] bg-white px-3 py-1 text-[11px] font-medium text-[var(--color-ink-700)] hover:bg-gray-50 cursor-pointer"
                      >
                        Lihat
                      </button>
                      <button
                        onClick={() => markDoc(doc.id, true)}
                        className={`rounded-full border px-3 py-1 text-[11px] font-medium transition cursor-pointer ${
                          doc.isValid === true
                            ? "border-[var(--color-success)] bg-[var(--color-success-bg)] text-[var(--color-success)]"
                            : "border-[var(--color-ink-100)] bg-white text-[var(--color-ink-700)] hover:bg-gray-50"
                        }`}
                      >
                        Valid
                      </button>
                      <button
                        onClick={() => markDoc(doc.id, false)}
                        className={`rounded-full border px-3 py-1 text-[11px] font-medium transition cursor-pointer ${
                          doc.isValid === false
                            ? "border-[var(--color-danger)] bg-[var(--color-danger-bg)] text-[var(--color-danger)]"
                            : "border-[var(--color-ink-100)] bg-white text-[var(--color-ink-700)] hover:bg-gray-50"
                        }`}
                      >
                        Tidak valid
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
              <h2 className="text-[14px] font-semibold text-[var(--color-ink-900)]">
                Catatan review internal
              </h2>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="mt-3 w-full resize-none rounded-lg border border-[var(--color-ink-100)] p-3 text-[13px] outline-none focus:border-[var(--color-brand-orange-500)] text-[var(--color-ink-700)]"
              />
              <p className="mt-1.5 text-[11px] text-[var(--color-ink-400)]">
                Catatan ini tersimpan di riwayat aplikasi dan tidak dikirim ke
                pemohon.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
              <h2 className="text-[14px] font-semibold text-[var(--color-ink-900)]">
                Status aplikasi
              </h2>
              <div className="relative mt-4 space-y-6 pl-6">
                <TimelineStep
                  label="Dikirim pemohon"
                  date={detail.submittedDate}
                  done
                />
                <TimelineStep
                  label="Masuk antrean review"
                  date="22 Agu 2026"
                  done
                />
                <TimelineStep
                  label="Verifikasi dokumen"
                  date={`${validCount} dari ${docs.length} dokumen valid`}
                  active
                />
                <TimelineStep label="Keputusan admin" date="" isLast />
              </div>
              <p className="mt-3 text-[11px] text-[var(--color-ink-400)]">
                Perubahan status dicatat atas nama admin yang melakukannya.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-4 text-[12px] text-[var(--color-ink-700)]">
              [PRD TBD] Status "Ditolak" muncul di flow FigJam tapi masih opsional
              di PRD lama. Aksi tolak disiapkan, konfirmasi ke PO sebelum dianggap
              final.
            </div>

            <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-5">
              <h2 className="text-[14px] font-semibold text-[var(--color-ink-900)]">
                Riwayat pemohon
              </h2>
              <div className="mt-3 space-y-2 text-[13px]">
                <Row
                  label="Report dikirim"
                  value={String(detail.history.reportsSubmitted)}
                />
                <Row label="Disetujui" value={String(detail.history.approved)} />
                <Row
                  label="Pernah direvisi"
                  value={String(detail.history.everRevised)}
                />
                <Row
                  label="Keanggotaan"
                  value={detail.history.membershipStatus}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfirm && (
        <ConfirmApproveModal
          code={detail.code}
          applicantName={detail.applicantName}
          validCount={validCount}
          totalCount={docs.length}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleApprove}
        />
      )}

      {showRejectModal && (
        <RejectModal
          onCancel={() => setShowRejectModal(false)}
          onConfirm={handleConfirmReject}
        />
      )}

      {showRevisionModal && (
        <RequestRevisionModal
          onCancel={() => setShowRevisionModal(false)}
          onConfirm={handleConfirmRevision}
        />
      )}

      {/* Modal Preview Dokumen */}
      {isPreviewOpen && (
        <DocumentPreviewModal
          docs={docs}
          activeDocId={selectedDocId ?? docs[0]?.id}
          appCode={detail.code}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-[var(--color-ink-400)]">{label}</span>
      <span className="text-right font-medium text-[var(--color-ink-900)]">
        {value}
      </span>
    </div>
  );
}

function TimelineStep({
  label,
  date,
  done,
  active,
  isLast,
}: {
  label: string;
  date: string;
  done?: boolean;
  active?: boolean;
  isLast?: boolean;
}) {
  return (
    <div className="relative">
      {!isLast && (
        <div
          className={`absolute -left-[17px] top-4 h-[calc(100%+10px)] w-[2px] ${
            done
              ? "bg-gradient-to-b from-[#FFC299] to-[#EE6B28]"
              : "bg-gray-200"
          }`}
        />
      )}

      <span
        className={`absolute -left-6 top-0.5 z-10 flex h-4 w-4 items-center justify-center rounded-full transition-all ${
          done
            ? "border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white shadow-xs"
            : active
            ? "border-2 border-[#EE6B28] bg-white"
            : "border-2 border-gray-200 bg-white"
        }`}
      >
        {done && (
          <svg
            className="h-2.5 w-2.5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </span>

      <p
        className={`text-[13px] font-medium ${
          done || active
            ? "text-[var(--color-ink-900)]"
            : "text-[var(--color-ink-400)]"
        }`}
      >
        {label}
      </p>
      {date && (
        <p className="mt-0.5 text-[11px] text-[var(--color-ink-400)]">{date}</p>
      )}
    </div>
  );
}

/* Modal Preview Dokumen */
function DocumentPreviewModal({
  docs,
  activeDocId,
  appCode,
  onClose,
}: {
  docs: DocumentItem[];
  activeDocId: string;
  appCode: string;
  onClose: () => void;
}) {
  const { showToast } = useToast();
  const [currentId, setCurrentId] = useState(activeDocId);
  const currentDoc = docs.find((d) => d.id === currentId) || docs[0];

  const pdfSource = currentDoc?.url || DUMMY_PDF_DATA_URI;

  const handleDownloadSingle = (doc: DocumentItem) => {
    // Unduh sebagai file PDF asli menggunakan Data URI
    const link = document.createElement("a");
    link.href = pdfSource;
    link.download = `${doc.label.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(
      "Dokumen PDF berhasil diunduh. Unduhan tercatat di log audit.",
      "",
      { tone: "success" }
    );
  };

  const handleMarkChecked = () => {
    onClose();
    showToast(
      "Dokumen ditandai sudah diperiksa dan tercatat di log audit.",
      "",
      { tone: "success" }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="relative flex max-h-[90vh] w-full max-w-[1000px] flex-col rounded-2xl bg-white shadow-xl overflow-hidden">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-[var(--color-ink-100)] px-6 py-4">
          <div>
            <h3 className="text-[16px] font-semibold text-[var(--color-ink-900)]">
              Dokumen pengajuan
            </h3>
            <p className="text-[12px] text-[var(--color-ink-400)]">
              Akses Super Admin — preview PDF asli yang diunggah pemohon beserta metadata.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[var(--color-ink-400)] hover:bg-gray-100 hover:text-[var(--color-ink-700)] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body Content */}
        <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[1.8fr_1fr]">
          {/* Real PDF Preview Container (Menggunakan iframe + PDF Data URI lokal) */}
          <div className="flex flex-col border-b border-[var(--color-ink-100)] bg-gray-100 p-4 lg:border-b-0 lg:border-r min-h-[420px]">
            <div className="relative flex-1 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-inner">
              <iframe
                src={pdfSource}
                title={currentDoc?.label || "PDF Preview"}
                className="h-full w-full border-none"
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--color-ink-400)] px-1">
              <span>
                {appCode} · {currentDoc?.label} · {currentDoc?.sizeLabel}
              </span>
              <span>Diunggah: {currentDoc?.uploadedDate}</span>
            </div>
          </div>

          {/* List Berkas Side Area */}
          <div className="flex flex-col justify-between p-5 overflow-y-auto">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-ink-400)]">
                BERKAS PENGAJUAN
              </h4>
              <div className="mt-3 space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {docs.map((doc) => {
                  const isSelected = doc.id === currentId;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setCurrentId(doc.id)}
                      className={`cursor-pointer rounded-xl border p-3 transition-all ${
                        isSelected
                          ? "border-[var(--color-brand-orange-500)] bg-[var(--color-brand-orange-50)]/40 shadow-xs"
                          : "border-[var(--color-ink-100)] bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[12px] font-semibold text-[var(--color-ink-900)]">
                            {doc.label}
                          </p>
                          <p className="mt-0.5 text-[11px] text-[var(--color-ink-400)]">
                            {doc.fileType} · {doc.sizeLabel}
                          </p>
                        </div>
                        {isSelected && (
                          <span className="rounded-full bg-[var(--color-brand-orange-500)] px-2 py-0.5 text-[10px] font-bold text-white">
                            Aktif
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadSingle(doc);
                        }}
                        className="mt-2 inline-flex items-center gap-1 rounded-full border border-[var(--color-ink-100)] bg-white px-2.5 py-1 text-[11px] font-medium text-[var(--color-ink-700)] shadow-2xs hover:bg-gray-50 cursor-pointer"
                      >
                        ↓ Unduh PDF
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-xl bg-gray-50 p-3 text-[11px] text-[var(--color-ink-700)]">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
                <span>
                  Aktivitas pembukaan & unduhan PDF ini dicatat pada log audit keamanan admin.
                </span>
              </div>
            </div>

            {/* Footer Modal Actions */}
            <div className="mt-5 flex items-center justify-end gap-2 border-t border-[var(--color-ink-100)] pt-4">
              <button
                onClick={onClose}
                className="rounded-full border border-[var(--color-ink-100)] px-4 py-1.5 text-[12px] font-semibold text-[var(--color-ink-700)] hover:bg-gray-50 cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={handleMarkChecked}
                className="rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-4 py-1.5 text-[12px] font-bold text-white shadow-xs hover:from-[#EE6B28] hover:to-[#C8601D] cursor-pointer"
              >
                Tandai sudah diperiksa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}