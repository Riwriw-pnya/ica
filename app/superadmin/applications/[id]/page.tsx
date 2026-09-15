"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RejectModal from "@/components/superadmin/applications/RejectModal";
import RevisionModal from "@/components/superadmin/applications/RevisionModal";
import ApproveModal from "@/components/superadmin/applications/ApproveModal";
import Toast from "@/components/Toast"; 

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isRevisionOpen, setIsRevisionOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [docStatuses, setDocStatuses] = useState({
    doc1: "Valid",
    doc2: "Valid",
    doc3: "Pending",
  });

  const [internalNote, setInternalNote] = useState("");

  const updateDocStatus = (docKey: string, status: string) => {
    setDocStatuses((prev) => ({ ...prev, [docKey]: status }));
  };

  const handleRejectSubmit = (data: { reason: string; notes: string }) => {
    const appId = params.id || "MR-2026-0142";
    const query = new URLSearchParams({
      toastTitle: `Aplikasi ${appId} ditolak.`,
      toastMessage: "Alasan dikirim ke pemohon.",
      toastTone: "error",
    }).toString();

    router.push(`/superadmin/applications?${query}`);
  };

  const handleRevisionSubmit = (data: { reasons: string[]; notes: string }) => {
    const applicantName = "Rumah Hana Cattery";
    const query = new URLSearchParams({
      toastTitle: `Permintaan revisi dikirim ke ${applicantName}.`,
      toastTone: "info",
    }).toString();

    router.push(`/superadmin/applications?${query}`);
  };

  const handleApproveConfirm = () => {
    setIsApproveOpen(false);
    setIsApproved(true);
    setShowToast(true);
  };

  const validDocsCount = Object.values(docStatuses).filter((status) => status === "Valid").length;
  const totalDocsCount = Object.keys(docStatuses).length;
  const appId = params.id || "MR-2026-0142";

  // Tampilan Setelah Aplikasi Disetujui (Approval Confirmation)
  if (isApproved) {
    return (
      <div className="space-y-6 relative">
        {/* Toast Container */}
        {showToast && (
          <div className="fixed top-6 right-6 z-50">
            <Toast
              title={`Aplikasi ${appId} disetujui.`}
              message="Notifikasi dikirim ke pemohon."
              tone="success"
              onClose={() => setShowToast(false)}
            />
          </div>
        )}

        {/* Title Header */}
        <div>
          <h1 className="text-xl font-bold text-[#231A14]">Approval Confirmation</h1>
          <p className="text-xs text-[#8C8078] mt-0.5">Keputusan tersimpan di riwayat aplikasi</p>
        </div>

        {/* Main Success Card */}
        <div className="max-w-xl mx-auto mt-8 bg-white border border-[#EFE9E1] rounded-3xl p-8 text-center shadow-xs space-y-6">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 text-2xl font-bold">
            ✓
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#231A14]">Aplikasi disetujui</h2>
            <p className="text-xs text-[#8C8078] leading-relaxed max-w-md mx-auto">
              <span className="font-semibold text-[#231A14]">{appId}</span> disetujui atas nama <span className="font-semibold text-[#231A14]">Rina Nurhayati</span>. Nomor registrasi diterbitkan otomatis dan notifikasi dikirim ke pemohon.
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#EFE9E1] rounded-2xl p-4 text-xs space-y-3 max-w-md mx-auto text-left">
            <div className="flex justify-between items-center">
              <span className="text-[#8C8078]">Nomor registrasi</span>
              <span className="font-mono font-bold text-[#231A14]">ICA-2026-0912</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8C8078]">Disetujui</span>
              <span className="font-medium text-[#231A14]">4 Sep 2026 09:14</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8C8078]">Wilayah</span>
              <span className="font-medium text-[#231A14]">Bandung</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsApproved(false)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#5A4F48] bg-white border border-[#EFE9E1] hover:bg-[#FAF8F5] transition cursor-pointer"
            >
              Lihat detail aplikasi
            </button>
            <button
              onClick={() => router.push("/superadmin/applications")}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-b from-[#FFA066] via-[#EE6B28] to-[#E05510] border border-[#D95A19] shadow-[0_3px_6px_rgba(238,107,40,0.35)] hover:brightness-105 transition cursor-pointer"
            >
              Review aplikasi berikutnya &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan Default Review Aplikasi
  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div>
        <h1 className="text-xl font-bold text-[#231A14]">Application Review</h1>
        <p className="text-xs text-[#8C8078] mt-0.5">Verifikasi dokumen sebelum memutuskan</p>
      </div>

      {/* Back Link */}
      <div>
        <Link href="/superadmin/applications" className="text-xs font-bold text-[#EE6B28] hover:underline inline-flex items-center gap-1">
          &larr; Kembali ke Application Queue
        </Link>
      </div>

      {/* Application Summary Card */}
      <div className="bg-white border border-[#EFE9E1] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold text-[#231A14]">{appId}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-200">
              • Sedang direview
            </span>
            <span className="text-xs bg-[#FAF8F5] border border-[#EFE9E1] text-[#5A4F48] px-2 py-0.5 rounded-lg">
              📍 Bandung
            </span>
          </div>
        </div>

        <p className="text-xs text-[#8C8078]">
          Mating Report • Rumah Hana Cattery • dikirim 21 Agu 2026 • 14 hari di antrean
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold text-[#231A14] bg-[#FAF8F5] border border-[#8C8078]/30 hover:bg-[#F2EFE9] transition-all shadow-xs cursor-pointer">
            <svg className="w-4 h-4 text-[#231A14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Unduh berkas</span>
          </button>

          <button
            onClick={() => setIsRejectOpen(true)}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-b from-[#DC4444] to-[#C83232] border border-[#B92B2B] shadow-[0_2px_4px_rgba(200,50,50,0.3)] hover:brightness-105 transition-all cursor-pointer"
          >
            Tolak aplikasi
          </button>

          <button
            onClick={() => setIsRevisionOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold text-[#D95A19] bg-white border border-[#F97316]/60 hover:bg-[#FFF6EC] transition-all shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#D95A19]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Minta revisi</span>
          </button>

          <button
            onClick={() => setIsApproveOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-b from-[#FFA066] via-[#EE6B28] to-[#E05510] border border-[#D95A19] shadow-[0_3px_6px_rgba(238,107,40,0.35)] hover:brightness-105 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span>Setujui aplikasi</span>
          </button>
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Data Pemohon */}
          <div className="bg-white border border-[#EFE9E1] rounded-2xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-[#231A14] mb-4">Data pemohon</h3>
            <div className="grid grid-cols-2 gap-y-3 text-xs">
              <div className="text-[#8C8078]">Pemohon</div>
              <div className="font-bold text-[#231A14] text-right">Rumah Hana Cattery</div>

              <div className="text-[#8C8078]">No. keanggotaan</div>
              <div className="font-mono text-[#231A14] text-right">ICA-2024-0871</div>

              <div className="text-[#8C8078]">Cattery</div>
              <div className="font-bold text-[#231A14] text-right">Rumah Hana Cattery</div>

              <div className="text-[#8C8078]">Wilayah</div>
              <div className="text-[#231A14] text-right">Bandung</div>

              <div className="text-[#8C8078]">Pasangan</div>
              <div className="font-bold text-[#231A14] text-right">Bagas x Nara</div>

              <div className="text-[#8C8078]">Tanggal mating</div>
              <div className="text-[#231A14] text-right">24 Jun 2026</div>
            </div>
          </div>

          {/* Verifikasi Dokumen */}
          <div className="bg-white border border-[#EFE9E1] rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#231A14]">Verifikasi dokumen</h3>
                <p className="text-[11px] text-[#8C8078]">Tandai setiap dokumen valid atau tidak valid sebelum memutuskan.</p>
              </div>
              <span className="text-xs font-bold text-[#EE6B28] bg-[#FFF2E8] px-2.5 py-1 rounded-lg">
                {validDocsCount} dari {totalDocsCount} valid
              </span>
            </div>

            <div className="space-y-3">
              {[
                { id: "doc1", title: "Sertifikat pedigree induk jantan", info: "PDF • 1.2 MB • diunggah 21 Agu 2026" },
                { id: "doc2", title: "Sertifikat pedigree induk betina", info: "PDF • 0.9 MB • diunggah 21 Agu 2026" },
                { id: "doc3", title: "Foto pasangan saat mating", info: "JPG • 2.4 MB • diunggah 21 Agu 2026" },
              ].map((doc) => (
                <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 border border-[#EFE9E1] rounded-xl gap-3">
                  <div>
                    <div className="text-xs font-bold text-[#231A14]">{doc.title}</div>
                    <div className="text-[10px] text-[#8C8078] mt-0.5">{doc.info}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-2.5 py-1 text-xs border border-[#EFE9E1] rounded-lg text-[#5A4F48] hover:bg-[#FAF8F5]">
                      📄 Lihat
                    </button>
                    <button
                      onClick={() => updateDocStatus(doc.id, "Valid")}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                        docStatuses[doc.id as keyof typeof docStatuses] === "Valid"
                          ? "bg-emerald-600 text-white"
                          : "border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      Valid
                    </button>
                    <button
                      onClick={() => updateDocStatus(doc.id, "Tidak valid")}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                        docStatuses[doc.id as keyof typeof docStatuses] === "Tidak valid"
                          ? "bg-rose-600 text-white"
                          : "border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100"
                      }`}
                    >
                      Tidak valid
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Catatan Internal */}
          <div className="bg-white border border-[#EFE9E1] rounded-2xl p-5 shadow-xs space-y-2">
            <h3 className="text-sm font-bold text-[#231A14]">Catatan review internal</h3>
            <textarea
              rows={3}
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
              placeholder="Catatan ini tersimpan di riwayat aplikasi dan tidak dikirim ke pemohon."
              className="w-full text-xs p-3 border border-[#EFE9E1] rounded-xl focus:outline-none focus:border-[#EE6B28]"
            />
            <p className="text-[10px] text-[#8C8078]">Terlihat oleh admin ICA saja.</p>
          </div>
        </div>

        {/* Sidebar Status & Riwayat */}
        <div className="space-y-6">
          <div className="bg-white border border-[#EFE9E1] rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#231A14]">Status aplikasi</h3>
            <div className="relative border-l-2 border-[#EFE9E1] ml-2 space-y-5 text-xs pl-4">
              <div className="relative">
                <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#EE6B28]" />
                <div className="font-bold text-[#231A14]">Dikirim pemohon</div>
                <div className="text-[10px] text-[#8C8078]">21 Agu 2026</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#EE6B28]" />
                <div className="font-bold text-[#231A14]">Masuk antrean review</div>
                <div className="text-[10px] text-[#8C8078]">22 Agu 2026</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-gray-300" />
                <div className="font-medium text-[#7A6E65]">Verifikasi dokumen</div>
                <div className="text-[10px] text-[#8C8078]">{validDocsCount} dari {totalDocsCount} dokumen valid</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-gray-300" />
                <div className="font-medium text-[#A89F95]">Keputusan admin</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#EFE9E1] rounded-2xl p-5 shadow-xs space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#231A14]">Riwayat pemohon</h3>
            <div className="flex justify-between py-1 border-b border-[#F2EFE9]">
              <span className="text-[#8C8078]">Report dikirim</span>
              <span className="font-bold text-[#231A14]">7</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F2EFE9]">
              <span className="text-[#8C8078]">Disetujui</span>
              <span className="font-bold text-emerald-600">6</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F2EFE9]">
              <span className="text-[#8C8078]">Pernah direvisi</span>
              <span className="font-bold text-amber-600">1</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#8C8078]">Keanggotaan</span>
              <span className="font-bold text-[#231A14]">Aktif s.d. 31 Des 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RejectModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onSubmit={handleRejectSubmit}
      />

      <RevisionModal
        isOpen={isRevisionOpen}
        onClose={() => setIsRevisionOpen(false)}
        onSubmit={handleRevisionSubmit}
      />

      <ApproveModal
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        onConfirm={handleApproveConfirm}
        applicationId={appId}
        applicantName="Rumah Hana Cattery"
        validDocsCount={validDocsCount}
        totalDocsCount={totalDocsCount}
      />
    </div>
  );
}