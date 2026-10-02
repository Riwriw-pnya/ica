"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDrafts } from "@/context/DraftContext";
import type { OffspringItem, CatCertificateFile } from "@/types/cattery";

interface StepReviewSubmitProps {
  maleName: string;
  femaleName: string;
  maleRegCode: string;
  femaleRegCode: string;
  matingDate: string;
  estimatedBirthDate: string;
  witnessName: string;
  offspringItems: OffspringItem[];
  documents: { label: string; file: CatCertificateFile | null }[];
  onEditStep: (step: number) => void;
  onSubmit: () => void;
  breedLabel?: string;
}

function formatDateRange(dateStr: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function formatGender(gender?: string) {
  if (!gender) return "-";
  const g = gender.toUpperCase();
  if (g === "M" || g === "MALE") return "Male";
  if (g === "F" || g === "FEMALE") return "Female";
  return gender;
}

export default function StepReviewSubmit({
  maleName,
  femaleName,
  maleRegCode,
  femaleRegCode,
  matingDate,
  estimatedBirthDate,
  witnessName,
  offspringItems,
  documents,
  onEditStep,
  onSubmit,
  breedLabel = "Persian Longhair",
}: StepReviewSubmitProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draft");
  const { deleteDraft } = useDrafts();

  const [agreed, setAgreed] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const uploadedDocs = documents.filter((d) => d.file !== null);

  // LOGIK HAPUS DRAFT DAN CLEAR CACHE SAAT SUBMIT
  const executeSubmitWithCleanup = () => {
    // 1. Hapus draft jika sedang membuka mode draft
    if (draftId) {
      deleteDraft(draftId);
    }

    // 2. Hapus cache form lokal di localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("mating_report_form_persistent_data");
    }

    // 3. Jalankan callback submit utama / redirect
    if (onSubmit) {
      onSubmit();
    } else {
      const code = `MR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      router.push(`/cattery/mating-reports/success?code=${code}&offspringCount=${offspringItems.length}`);
    }
  };

  const handleMobileSubmitClick = () => {
    if (!agreed) return;
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    executeSubmitWithCleanup();
  };

  return (
    <div>
      {/* ========================================================= */}
      {/* 1. MOBILE VIEW                                            */}
      {/* ========================================================= */}
      <div className="block sm:hidden space-y-4 pb-20">
        {/* Header Title Mobile */}
        <div>
          <h2 className="text-sm font-bold text-[#1A1513]">Review & submit</h2>
          <p className="mt-1 text-xs text-[#8C8074] leading-relaxed">
            Periksa seluruh keterangan di bawah. Setelah dikirim, report masuk ke antrean review admin ICA wilayah dan tidak bisa diubah sendiri.
          </p>
        </div>

        {/* 1. Section Pasangan */}
        <div className="rounded-2xl border border-[#EEDFD5] bg-white p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-bold text-[#1A1513]">Pasangan</h3>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-xs font-bold text-[#8C8074] hover:text-[#F05A1B]"
            >
              Ubah
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-[#F4EFE9] pb-2">
              <span className="text-[#8C8074]">Pejantan</span>
              <span className="font-bold text-[#1A1513] text-right truncate max-w-[200px]">
                {maleName} · {maleRegCode}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-[#F4EFE9] pb-2">
              <span className="text-[#8C8074]">Induk</span>
              <span className="font-bold text-[#1A1513] text-right truncate max-w-[200px]">
                {femaleName} · {femaleRegCode}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8C8074]">Ras</span>
              <span className="font-bold text-[#1A1513] text-right">{breedLabel}</span>
            </div>
          </div>
        </div>

        {/* 2. Section Mating Information */}
        <div className="rounded-2xl border border-[#EEDFD5] bg-white p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-bold text-[#1A1513]">Mating Information</h3>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="text-xs font-bold text-[#8C8074] hover:text-[#F05A1B]"
            >
              Ubah
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-[#F4EFE9] pb-2">
              <span className="text-[#8C8074]">Tanggal mating</span>
              <span className="font-bold text-[#1A1513]">{formatDateRange(matingDate)}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#F4EFE9] pb-2">
              <span className="text-[#8C8074]">Sertifikat pejantan</span>
              <span className="font-bold text-[#1A1513]">{maleRegCode}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#F4EFE9] pb-2">
              <span className="text-[#8C8074]">Sertifikat induk</span>
              <span className="font-bold text-[#1A1513]">{femaleRegCode}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8C8074]">Estimasi lahir</span>
              <span className="font-bold text-[#1A1513]">{formatDateRange(estimatedBirthDate)}</span>
            </div>
          </div>
        </div>

        {/* 3. Section Offspring Mobile */}
        <div className="rounded-2xl border border-[#EEDFD5] bg-white p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-bold text-[#1A1513]">
              Offspring · {offspringItems.length} kitten
            </h3>
            <button
              type="button"
              onClick={() => onEditStep(5)}
              className="text-xs font-bold text-[#8C8074] hover:text-[#F05A1B]"
            >
              Ubah
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {offspringItems.map((kitten, idx) => {
              const microchip =
                (kitten as any).microchipNumber ||
                (kitten as any).microchip ||
                "1234565432";

              const adopterName = (kitten as any).adopterName || (kitten as any).adopter || "ayuu";
              const adopterPhone = (kitten as any).adopterPhone || "081234567890";
              const adopterCategory = (kitten as any).adopterCategory || "Member";

              return (
                <div key={kitten.id} className="space-y-2 border-b border-[#F4EFE9] last:border-0 pb-2.5 last:pb-0">
                  <div className="flex items-center justify-between border-b border-[#F4EFE9] pb-2">
                    <span className="text-[#8C8074]">Kitten {idx + 1}</span>
                    <span className="font-bold text-[#1A1513]">
                      {kitten.name ? `${kitten.name} · ` : ""}
                      {formatGender(kitten.gender)} · {kitten.color || "yuyu"} · {formatDateRange(kitten.birthDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#F4EFE9] pb-2">
                    <span className="text-[#8C8074]">Microchip</span>
                    <span className="font-bold text-[#1A1513]">{microchip}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-[#8C8074]">Adopter</span>
                    <div className="text-right">
                      <span className="font-bold text-[#1A1513] block">{adopterName}</span>
                      <span className="text-[10px] text-[#8C8074] block mt-0.5">
                        {adopterPhone} · {adopterCategory}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Section Dokumen */}
        <div className="rounded-2xl border border-[#EEDFD5] bg-white p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-bold text-[#1A1513]">
              Dokumen · {uploadedDocs.length} dari {documents.length}
            </h3>
            <button
              type="button"
              onClick={() => onEditStep(6)}
              className="text-xs font-bold text-[#8C8074] hover:text-[#F05A1B]"
            >
              Ubah
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            {documents.map((doc) => (
              <div key={doc.label} className="flex items-center justify-between border-b border-[#F4EFE9] last:border-0 pb-2 last:pb-0">
                <span className="text-[#8C8074] truncate max-w-[180px]">{doc.label}</span>
                <span className={`font-bold ${doc.file ? "text-[#1A1513]" : "text-[#8C8074]"}`}>
                  {doc.file ? "Terunggah" : "Belum ada"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Card Mobile */}
        <div className="rounded-2xl border border-[#D0E5F5] bg-[#F2F8FC] p-4 text-xs space-y-1 text-[#1B4D75]">
          <h4 className="font-bold text-[#1A1513]">Kitten otomatis masuk ke My Cats</h4>
          <p className="text-[11px] leading-relaxed text-[#5C7285]">
            {offspringItems.length} kitten otomatis ditambahkan ke My Cats beserta nomor microchip dan data adopter. Nomor registrasi ICA terbit setelah admin menyetujui report.
          </p>
        </div>

        {/* Checkbox Pernyataan Pernyataan Mobile */}
        <label className="flex items-start gap-3 rounded-2xl border border-[#FCE3D2] bg-[#FFF8F2] p-4 cursor-pointer select-none transition-all">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-[#F05A1B] text-[#F05A1B] focus:ring-[#F05A1B] cursor-pointer accent-[#F05A1B]"
          />
          <span className="text-xs leading-relaxed text-[#6E6359] font-medium">
            Saya menyatakan data mating dan offspring di atas benar, dan bersedia data pedigree diverifikasi oleh admin ICA.
          </span>
        </label>

        {/* Mobile Sticky Footer Kirim */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EEDFD5] px-4 py-3 z-40 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <button
            type="button"
            onClick={() => onEditStep(6)}
            className="flex-1 py-3 px-4 rounded-full border border-[#EEDFD5] bg-white text-xs font-bold text-[#1A1513] active:scale-[0.98] transition cursor-pointer"
          >
            Kembali
          </button>
          <button
            type="button"
            disabled={!agreed}
            onClick={handleMobileSubmitClick}
            className={`flex-1 py-3 px-4 rounded-full text-xs font-bold shadow-xs transition-all ${
              agreed
                ? "bg-gradient-to-b from-[#FFC299] to-[#F05A1B] text-white active:scale-[0.98] cursor-pointer"
                : "bg-[#FCE3D2] text-white cursor-not-allowed opacity-70"
            }`}
          >
            Kirim
          </button>
        </div>

        {/* Modal Bottom Sheet Konfirmasi Kirim */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 sm:hidden">
            <div className="w-full rounded-t-3xl bg-white p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
              <div className="mx-auto h-1 w-12 rounded-full bg-gray-300" />
              <div className="space-y-1.5">
                <h3 className="font-bold text-base text-[#1A1513]">Kirim mating report</h3>
                <p className="text-xs text-[#8C8074] leading-relaxed">
                  Apakah Anda yakin dan sudah mengecek data Anda dari yang disubmit sebelumnya? Setelah dikirim, perubahan hanya bisa dilakukan lewat admin ICA wilayah.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 rounded-full border border-[#EEDFD5] bg-white py-3 text-xs font-bold text-[#1A1513] active:bg-gray-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSubmit}
                  className="flex-1 rounded-full bg-gradient-to-b from-[#FFC299] to-[#F05A1B] py-3 text-xs font-bold text-white active:scale-95 transition cursor-pointer"
                >
                  Kirim
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 2. DESKTOP VIEW                                            */}
      {/* ========================================================= */}
      <div className="hidden sm:block rounded-xl border border-[var(--color-ink-100)] bg-white p-6 space-y-5">
        <div>
          <h2 className="font-display text-[16px] font-semibold text-[var(--color-ink-900)]">
            Review & submit
          </h2>
          <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
            Periksa sekali lagi. Setelah dikirim, perubahan hanya bisa lewat permintaan revisi admin.
          </p>
        </div>

        <div className="space-y-3 border-t border-[var(--color-ink-100)] pt-4">
          <ReviewSection title="Pasangan" onEdit={() => onEditStep(2)}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ReviewField label="Pejantan" value={maleName} />
              <ReviewField label="Induk" value={femaleName} />
            </div>
          </ReviewSection>

          <ReviewSection title="Mating information" onEdit={() => onEditStep(4)}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ReviewField label="Tanggal mating" value={formatDateRange(matingDate)} />
              <ReviewField label="Estimasi lahir" value={formatDateRange(estimatedBirthDate)} />
              <ReviewField label="Sertifikat pejantan" value={maleRegCode} />
              <ReviewField label="Sertifikat induk" value={femaleRegCode} />
              {witnessName && (
                <div className="sm:col-span-2">
                  <ReviewField label="Saksi" value={witnessName} />
                </div>
              )}
            </div>
          </ReviewSection>

          {/* Offspring Desktop */}
          <ReviewSection title={`Offspring · ${offspringItems.length} kitten`} onEdit={() => onEditStep(5)}>
            <div className="divide-y divide-[var(--color-ink-100)]">
              {offspringItems.map((kitten, idx) => {
                const microchip =
                  (kitten as any).microchipNumber ||
                  (kitten as any).microchip ||
                  "1234565432";

                const adopterName = (kitten as any).adopterName || (kitten as any).adopter || "Belum diisi";
                const adopterPhone = (kitten as any).adopterPhone || "081234567890";
                const adopterCategory = (kitten as any).adopterCategory || "Member";

                return (
                  <div key={kitten.id} className="py-4 first:pt-0 last:pb-0 space-y-3">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-[13px]">
                      <ReviewField label="Nama kitten" value={kitten.name || "Belum diisi"} />
                      <ReviewField
                        label="Gender · Warna · Tgl lahir"
                        value={`${formatGender(kitten.gender)} · ${kitten.color || "Belum diisi"} · ${formatDateRange(
                          kitten.birthDate
                        )}`}
                      />
                      <ReviewField label="Microchip" value={microchip} />
                      <div>
                        <p className="text-[11px] text-[var(--color-ink-400)]">Adopter</p>
                        <p className="mt-0.5 text-[13px] font-semibold text-[var(--color-ink-900)]">
                          {adopterName}
                        </p>
                        <p className="text-[11px] text-[var(--color-ink-600)] mt-0.5">
                          {adopterPhone} · {adopterCategory}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ReviewSection>

          <ReviewSection title={`Dokumen · ${uploadedDocs.length} terunggah`} onEdit={() => onEditStep(6)}>
            <div className="flex flex-wrap gap-2">
              {uploadedDocs.map((doc) => (
                <span
                  key={doc.label}
                  className="rounded-full bg-[var(--color-success-bg)] px-3 py-1 text-[11px] font-medium text-[var(--color-success)]"
                >
                  {doc.label}
                </span>
              ))}
            </div>
          </ReviewSection>
        </div>

        {/* Checkbox Pernyataan Desktop */}
        <label className="flex items-center gap-3 rounded-xl border border-[#FCE3D2] bg-[#FFF8F2] p-4 cursor-pointer select-none transition-all">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="h-4 w-4 rounded border-[#F05A1B] text-[#F05A1B] focus:ring-[#F05A1B] cursor-pointer accent-[#F05A1B]"
          />
          <span className="text-xs text-[#6E6359] font-medium">
            Saya menyatakan data mating dan offspring di atas benar, dan bersedia data pedigree diverifikasi oleh admin ICA.
          </span>
        </label>

        <div className="pt-2 flex items-center justify-between border-t border-[var(--color-ink-100)]">
          <button
            type="button"
            onClick={() => onEditStep(6)}
            className="cursor-pointer rounded-full border border-[var(--color-ink-100)] bg-gradient-to-b from-white to-[var(--color-ink-100)] px-6 py-2.5 text-[13px] font-medium text-[var(--color-ink-700)] shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
          >
            Kembali
          </button>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#8C8074]">Step 7 dari 7</span>
            <button
              type="button"
              disabled={!agreed}
              onClick={executeSubmitWithCleanup}
              className={`rounded-full px-8 py-2.5 text-xs font-bold transition-all duration-150 ${
                agreed
                  ? "border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 cursor-pointer"
                  : "bg-[#FCE3D2] text-white cursor-not-allowed opacity-70"
              }`}
            >
              Kirim mating report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewSection({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--color-ink-100)]">
      <div className="flex items-center justify-between bg-[var(--color-ink-50)] px-4 py-2.5">
        <h3 className="text-[13px] font-semibold text-[var(--color-ink-900)]">{title}</h3>
        <button
          onClick={onEdit}
          className="text-[12px] font-medium text-[var(--color-brand-orange-700)] hover:underline cursor-pointer"
        >
          Ubah
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-[var(--color-ink-400)]">{label}</p>
      <p className="mt-0.5 text-[13px] font-semibold text-[var(--color-ink-900)]">{value}</p>
    </div>
  );
}