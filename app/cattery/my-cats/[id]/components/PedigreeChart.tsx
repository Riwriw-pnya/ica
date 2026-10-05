"use client";

import type {
  CatProfileDetail,
  PedigreeAncestor,
  PedigreeChart as PedigreeChartData,
} from "@/types/cattery";
import { useToast } from "@/context/ToastContext";

interface AncestorCardProps {
  ancestor: PedigreeAncestor;
  highlighted?: boolean;
  sublabel?: string;
}

function AncestorCard({ ancestor, highlighted, sublabel }: AncestorCardProps) {
  return (
    <div
      className={`rounded-xl border p-3 transition ${
        highlighted
          ? "border-[var(--color-brand-orange-300)] bg-[var(--color-brand-orange-50)]"
          : "border-[var(--color-ink-100)] bg-white"
      }`}
    >
      {sublabel && (
        <p className="text-[11px] font-medium text-[var(--color-ink-600)]">
          {sublabel}
        </p>
      )}
      <p className="mt-0.5 text-[13px] font-bold text-[var(--color-ink-900)]">
        {ancestor.name}
      </p>
      <p className="mt-0.5 text-[11px] text-[var(--color-ink-500)]">
        {ancestor.emsCode}
        {ancestor.registrationNumber ? ` · ${ancestor.registrationNumber}` : ""}
        {ancestor.lineage ? ` · jalur ${ancestor.lineage}` : ""}
      </p>
    </div>
  );
}

interface PedigreeChartProps {
  cat: CatProfileDetail;
  pedigree?: PedigreeChartData;
}

export function PedigreeChart({ cat, pedigree }: PedigreeChartProps) {
  const { showToast } = useToast();

  const handleViewCertificate = () => {
    showToast(
      "Sertifikat pedigree dibuka.",
      "Preview PDF otomatis — placeholder prototype.",
      { tone: "success" }
    );
  };

  // Penentuan Status Pedigree yang Saling Mengisi (Mutually Exclusive)
  const isIssued = cat.pedigreeStatus === "Terverifikasi";
  
  // IsReview HANYA true jika TIDAK ISSUED dan ada status REVIEW/objek review
  const isReview = !isIssued && (cat.pedigreeStatus === "Menunggu verifikasi" || Boolean(pedigree?.review));
  
  // IsUnissued HANYA true jika TIDAK ISSUED dan TIDAK REVIEW
  const isUnissued = !isIssued && !isReview;

  return (
    <div className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-4 md:p-6 shadow-sm">
      {/* Header & Tombol Sertifikat (Hanya Tampil Jika Status Pedigree Aktif/ISSUED) */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-bold text-[var(--color-ink-900)]">
            Bagan silsilah
          </h3>
          <p className="mt-0.5 text-[12px] text-[var(--color-ink-700)]">
            Tiga generasi — bersumber dari mating report yang disetujui admin ICA.
          </p>
        </div>

        {/* Tombol Khusus Desktop View saat Pedigree Aktif */}
        {isIssued && (
          <button
            type="button"
            onClick={handleViewCertificate}
            className="hidden md:inline-block whitespace-nowrap font-sans rounded-2xl border border-[var(--color-ink-100)] bg-white px-4 py-2 text-[12px] font-medium text-[var(--color-ink-700)] hover:bg-[var(--color-ink-50)] transition cursor-pointer active:scale-95 shrink-0"
          >
            Lihat sertifikat pedigree
          </button>
        )}
      </div>

      {/* ========================================================= */}
      {/* BANNER STATUS KONDISIONAL (TIDAK DOUBLE)                 */}
      {/* ========================================================= */}

      {/* 1. KONDISI: PEDIGREE AKTIF / ISSUED */}
      {isIssued && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5">
          <p className="text-[12px] font-bold text-emerald-800">Pedigree aktif</p>
          <p className="mt-0.5 text-[11px] text-emerald-700">
            {cat.registrationNumber || "ICA-PD-5581"} · terbit 09 Agu 2026
          </p>
        </div>
      )}

      {/* 2. KONDISI: SEDANG DIREVIEW / IN REVIEW */}
      {isReview && (
        <div className="mt-4 rounded-xl bg-sky-50 p-4 border border-sky-100">
          <p className="text-[12px] font-semibold text-sky-800">
            Pengajuan pedigree sedang direview
          </p>
          <p className="mt-0.5 text-[11px] text-sky-700">
            Berkas {pedigree?.review?.reportCode || "MR-2026-0138"} · dikirim{" "}
            {pedigree?.review?.submittedDate || "21 Agu 2026"} ·{" "}
            {pedigree?.review?.queueNote || "Masuk antrean review admin"}
          </p>
        </div>
      )}

      {/* 3. KONDISI: BELUM DIAJUKAN / UNISSUED (PERSIS SESUAI FOTO) */}
      {isUnissued && (
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-dashed border-[#FCE3D2] bg-[#FFF8F5] p-4 md:p-5">
          <div className="max-w-xl">
            <h4 className="text-xs sm:text-sm font-bold text-[#1A1513]">
              Belum ada pengajuan pedigree
            </h4>
            <p className="mt-1 text-[11px] sm:text-xs text-[#8C8074] leading-relaxed">
              Silsilah di bawah masih berasal dari data indukan dan belum tersertifikasi. Sertifikat muncul otomatis setelah admin ICA menyetujui pengajuan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => showToast("Pengajuan pedigree dimulai", "Lengkapi mating report agar admin ICA dapat menerbitkan sertifikat.", { tone: "info" })}
            className="cursor-pointer whitespace-nowrap rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 shrink-0"
            >
              Ajukan pedigree
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* GRID 3 KOLOM SILSILAH                                     */}
      {/* ========================================================= */}
      {pedigree ? (
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Kolom 1: KUCING */}
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-wider text-[var(--color-ink-900)] uppercase">
              KUCING
            </p>
            <div className="space-y-3 text-[var(--color-ink-400)]">
              <AncestorCard
                ancestor={{
                  id: cat.id,
                  name: cat.name,
                  emsCode: cat.regCode,
                  registrationNumber: cat.registrationNumber,
                }}
                highlighted
              />
            </div>
          </div>

          {/* Kolom 2: ORANG TUA */}
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-wider text-[var(--color-ink-900)] uppercase">
              ORANG TUA
            </p>
            <div className="space-y-3 text-[var(--color-ink-400)]">
              <AncestorCard ancestor={pedigree.sire} sublabel="Sire (Male)" />
              <AncestorCard ancestor={pedigree.dam} sublabel="Dam (Female)" />
            </div>
          </div>

          {/* Kolom 3: KAKEK & NENEK */}
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-wider text-[var(--color-ink-900)] uppercase">
              KAKEK &amp; NENEK
            </p>
            <div className="space-y-3 text-[var(--color-ink-400)]">
              <AncestorCard ancestor={pedigree.sireSire} />
              <AncestorCard ancestor={pedigree.sireDam} />
              <AncestorCard ancestor={pedigree.damSire} />
              <AncestorCard ancestor={pedigree.damDam} />
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-5 text-[12px] text-[var(--color-ink-400)]">
          Silsilah belum tersedia untuk kucing ini.
        </p>
      )}

      {/* Tombol Khusus Mobile View (Hanya Tampil Jika Status Pedigree Aktif) */}
      {isIssued && (
        <div className="mt-5 block md:hidden">
          <button
            type="button"
            onClick={handleViewCertificate}
            className="w-full text-center font-sans rounded-xl border border-[var(--color-ink-100)] bg-white py-2.5 text-xs font-semibold text-[var(--color-ink-700)] active:bg-[var(--color-ink-50)] transition active:scale-[0.98]"
          >
            Lihat sertifikat pedigree
          </button>
        </div>
      )}

      {/* Footer Text */}
      <p className="mt-4 md:mt-6 text-[11px] text-[var(--color-ink-400)]">
        Bagan silsilah bersifat informasi (read-only) — perubahan data dilakukan oleh admin ICA melalui approval mating report.
      </p>
    </div>
  );
}