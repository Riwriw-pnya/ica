"use client";

import type { CatCertificateFile } from "@/types/cattery";

interface DocumentItemProps {
  label: string;
  isRequired: boolean;
  isAuto?: boolean;
  file: CatCertificateFile | null;
  onPick?: (file: File) => void;
  onRemove?: () => void;
}

function DocumentItem({
  label,
  isRequired,
  isAuto = false,
  file,
  onPick,
  onRemove,
}: DocumentItemProps) {
  const inputId = `document-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-ink-100)] p-3">
      <div className="min-w-0">
        <p className="text-[12px] font-medium text-[var(--color-ink-900)]">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </p>
        <p className="truncate text-[11px] text-[var(--color-ink-700)]">
          {file ? `${file.fileName} · ${file.sizeLabel}` : "Belum ada file"}
        </p>
      </div>
      {isAuto ? (
        <span className="shrink-0 text-[11px] text-[var(--color-ink-400)]">Otomatis</span>
      ) : file ? (
        <button type="button" onClick={onRemove} className="shrink-0 text-[11px] text-red-600">
          Hapus
        </button>
      ) : (
        <label
          htmlFor={inputId}
          className="shrink-0 cursor-pointer rounded-md border border-[var(--color-ink-200)] px-3 py-1.5 text-[11px] text-[var(--color-ink-700)]"
        >
          Pilih file
          <input
            id={inputId}
            type="file"
            className="sr-only"
            onChange={(event) => {
              const selectedFile = event.currentTarget.files?.[0];
              if (selectedFile) onPick?.(selectedFile);
              event.currentTarget.value = "";
            }}
          />
        </label>
      )}
    </div>
  );
}

interface ManualDoc {
  file: CatCertificateFile | null;
}

interface StepUploadDokumenProps {
  maleCertFile: CatCertificateFile | null;
  femaleCertFile: CatCertificateFile | null;
  matingPhoto: ManualDoc;
  onMatingPhotoChange: (file: File) => void;
  onMatingPhotoRemove: () => void;
  kittenPhotos: ManualDoc;
  onKittenPhotosChange: (file: File) => void;
  onKittenPhotosRemove: () => void;
  vetLetter: ManualDoc;
  onVetLetterChange: (file: File) => void;
  onVetLetterRemove: () => void;
  paymentProof: ManualDoc;
  onPaymentProofChange: (file: File) => void;
  onPaymentProofRemove: () => void;
}

function toFileInfo(file: File): CatCertificateFile {
  return {
    fileName: file.name,
    uploadedDate: "Hari ini",
    sizeLabel: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
  };
}

export default function StepUploadDokumen(props: StepUploadDokumenProps) {
  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-6">
      <h2 className="font-display text-[16px] font-semibold text-[var(--color-ink-900)]">
        Upload dokumen & foto
      </h2>
      <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
        Unggah bukti pendukung. Dokumen bertanda wajib harus ada sebelum submit.
      </p>

      <div className="mt-4 space-y-2.5 border-t border-[var(--color-ink-100)] pt-4">
        <DocumentItem
          label="Sertifikat pedigree pejantan"
          isRequired
          isAuto
          file={props.maleCertFile}
        />
        <DocumentItem
          label="Sertifikat pedigree induk"
          isRequired
          isAuto
          file={props.femaleCertFile}
        />
        <DocumentItem
          label="Foto mating / kandang"
          isRequired
          file={props.matingPhoto.file}
          onPick={(f) => props.onMatingPhotoChange(f)}
          onRemove={props.onMatingPhotoRemove}
        />
        <DocumentItem
          label="Foto tiap kitten"
          isRequired={false}
          file={props.kittenPhotos.file}
          onPick={(f) => props.onKittenPhotosChange(f)}
          onRemove={props.onKittenPhotosRemove}
        />
        <DocumentItem
          label="Surat keterangan dokter hewan"
          isRequired={false}
          file={props.vetLetter.file}
          onPick={(f) => props.onVetLetterChange(f)}
          onRemove={props.onVetLetterRemove}
        />
        <DocumentItem
          label="Bukti pembayaran"
          isRequired={false}
          file={props.paymentProof.file}
          onPick={(f) => props.onPaymentProofChange(f)}
          onRemove={props.onPaymentProofRemove}
        />
      </div>

      <p className="mt-4 text-[11px] text-[var(--color-ink-400)]">
        Klik &quot;Pilih file&quot; untuk menentukan lokasi upload. Format &amp; ukuran maksimum file
        masih [PROSES].
      </p>
    </div>
  );
}

export { toFileInfo };