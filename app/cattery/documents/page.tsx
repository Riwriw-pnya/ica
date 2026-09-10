"use client";

import { useToast } from "@/context/ToastContext";

interface DocItem {
  id: string;
  title: string;
  subtitle: string;
  status: "Aktif" | "Sedang direview" | "Perlu revisi" | "Terverifikasi";
}

const DOCUMENTS: DocItem[] = [
  { id: "1", title: "Sertifikat registrasi cattery", subtitle: "ICA-CTY-2024-0188 · terbit 24 Jul 2026 · PDF", status: "Aktif" },
  { id: "2", title: "Sertifikat pedigree MR-2026-0131", subtitle: "ICA-PD-5581 · terbit 09 Agu 2026 · PDF", status: "Aktif" },
  { id: "3", title: "Berkas pengajuan MR-2026-0142", subtitle: "6 dokumen · dikirim 21 Agu 2026", status: "Sedang direview" },
  { id: "4", title: "Berkas pengajuan MR-2026-0138", subtitle: "5 dokumen · dikirim 12 Agu 2026", status: "Perlu revisi" },
  { id: "5", title: "KTP pemilik cattery", subtitle: "Diunggah 18 Jul 2026 · JPG", status: "Terverifikasi" },
];

export default function DocumentsPage() {
  const { showToast } = useToast();

  const handleDownload = (docTitle: string) => {
    showToast(`${docTitle} diunduh.`, "PDF hasil generate otomatis — placeholder prototype.");
  };

  const getStatusBadge = (status: DocItem["status"]) => {
    switch (status) {
      case "Aktif":
      case "Terverifikasi":
        return "bg-emerald-50 text-emerald-600";
      case "Sedang direview":
        return "bg-sky-50 text-sky-600";
      case "Perlu revisi":
        return "bg-amber-50 text-amber-600";
    }
  };

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-bold text-[var(--color-ink-900)]">Documents</h1>
      <p className="mt-1 text-xs text-[var(--color-ink-400)]">
        Sertifikat, berkas pengajuan, dan dokumen cattery.
      </p>

      <div className="mt-6 divide-y divide-[var(--color-ink-100)] rounded-2xl border border-[var(--color-ink-100)] bg-white shadow-sm">
        {DOCUMENTS.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 px-6 hover:bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50/60 text-orange-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-[var(--color-ink-900)]">{doc.title}</h3>
                <p className="mt-0.5 text-[11px] text-[var(--color-ink-400)]">{doc.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${getStatusBadge(doc.status)}`}>
                {doc.status}
              </span>
              <button
                onClick={() => handleDownload(doc.title)}
                className="rounded-full bg-gradient-to-b from-white to-[var(--color-ink-100)] border border-[var(--color-ink-100)] px-4 py-1 text-xs font-sans text-[var(--color-ink-400)] hover:text-[var(--color-ink-700)] transition hover:bg-[var(--color-ink-700)] active:scale-95"
              >
                Unduh
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}