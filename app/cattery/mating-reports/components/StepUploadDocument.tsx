"use client";

import DocumentItem from "./DocumentItem";
import type { CatCertificateFile } from "@/types/cattery";

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
  showError?: boolean;
}

function toFileInfo(file: File): CatCertificateFile {
  return {
    fileName: file.name,
    uploadedDate: "Hari ini",
    sizeLabel: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
  };
}

export default function StepUploadDokumen(props: StepUploadDokumenProps) {
  const isInvalid = (props.showError ?? false) && props.matingPhoto.file === null;

  return (
    <div className="rounded-xl border border-[var(--color-ink-100)] bg-white p-6">
      <h2 className="font-display text-[16px] font-semibold text-[var(--color-ink-900)]">
        Upload dokumen & foto
      </h2>
      <p className="mt-1 text-[12px] text-[var(--color-ink-700)]">
        Unggah bukti pendukung. Dokumen bertanda wajib harus ada sebelum submit.
      </p>

      <div className="mt-4 space-y-2.5 border-t border-[var(--color-ink-100)] pt-4">
        <DocumentItem label="Sertifikat pedigree pejantan" icon="cat" isRequired isAuto file={props.maleCertFile} />
        <DocumentItem label="Sertifikat pedigree induk" icon="cat" isRequired isAuto file={props.femaleCertFile} />

        <DocumentItem
          label="Foto mating / kandang"
          icon="upload"
          isRequired
          isInvalid={isInvalid}
          file={props.matingPhoto.file}
          onPick={props.onMatingPhotoChange}
          onRemove={props.onMatingPhotoRemove}
        />

        <DocumentItem
          label="Foto tiap kitten"
          description="Satu foto per kitten, wajah terlihat jelas."
          icon="upload"
          isRequired={false}
          file={props.kittenPhotos.file}
          onPick={props.onKittenPhotosChange}
          onRemove={props.onKittenPhotosRemove}
        />
        <DocumentItem
          label="Surat keterangan dokter hewan"
          description="Memperkuat hasil verifikasi admin."
          icon="upload"
          isRequired={false}
          file={props.vetLetter.file}
          onPick={props.onVetLetterChange}
          onRemove={props.onVetLetterRemove}
        />
        <DocumentItem
          label="Bukti pembayaran"
          description="Biaya penerbitan pedigree."
          icon="upload"
          isRequired={false}
          file={props.paymentProof.file}
          onPick={props.onPaymentProofChange}
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