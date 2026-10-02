"use client";

import DocumentItem from "./DocumentItem";
import type { CatCertificateFile } from "@/types/cattery";

interface ManualDoc {
  file: CatCertificateFile | null;
}

interface StepUploadDokumenProps {
  maleCertFile: CatCertificateFile | null;
  onMaleCertChange: (file: File) => void;
  onMaleCertRemove: () => void;

  femaleCertFile: CatCertificateFile | null;
  onFemaleCertChange: (file: File) => void;
  onFemaleCertRemove: () => void;

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

export function toFileInfo(file: File): CatCertificateFile {
  const sizeMB = file.size ? (file.size / (1024 * 1024)).toFixed(1) : "1.2";
  return {
    fileName: file.name || "dokumen.pdf",
    uploadedDate: "Hari ini",
    sizeLabel: `${sizeMB} MB`,
  };
}

export default function StepUploadDokumen(props: StepUploadDokumenProps) {
  const isInvalid = (props.showError ?? false) && props.matingPhoto.file === null;

  const requiredCount = 3;
  let uploadedRequired = 0;
  if (props.maleCertFile) uploadedRequired++;
  if (props.femaleCertFile) uploadedRequired++;
  if (props.matingPhoto.file) uploadedRequired++;

  const missingRequired = requiredCount - uploadedRequired;

  return (
    <div className="rounded-2xl sm:rounded-xl border border-[#EEDFD5] bg-white p-4 sm:p-6 transition shadow-2xs space-y-4 pb-20 md:pb-6">
      <div>
        <h2 className="font-display text-sm sm:text-base font-bold text-[#1A1513]">
          Upload dokumen
        </h2>
        <p className="mt-1 text-xs text-[#8C8074] leading-relaxed">
          {missingRequired > 0
            ? `${missingRequired} dokumen wajib belum diunggah. Ukuran file maksimal 5 MB per dokumen.`
            : "Semua dokumen wajib telah lengkap. Ukuran file maksimal 5 MB per dokumen."}
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <DocumentItem
          label="Sertifikat pedigree pejantan"
          description="PDF atau foto sertifikat asli"
          icon="document"
          isRequired
          file={props.maleCertFile}
          onPick={props.onMaleCertChange}
          onRemove={props.onMaleCertRemove}
        />
        <DocumentItem
          label="Sertifikat pedigree induk"
          description="PDF atau foto sertifikat asli"
          icon="document"
          isRequired
          file={props.femaleCertFile}
          onPick={props.onFemaleCertChange}
          onRemove={props.onFemaleCertRemove}
        />

        <DocumentItem
          label="Foto mating / kandang"
          description="Bukti proses mating di lokasi cattery"
          icon="camera"
          isRequired
          isInvalid={isInvalid}
          file={props.matingPhoto.file}
          onPick={props.onMatingPhotoChange}
          onRemove={props.onMatingPhotoRemove}
        />

        <DocumentItem
          label="Foto tiap kitten"
          description="Satu foto per kitten, wajah terlihat jelas."
          icon="image"
          isRequired={false}
          file={props.kittenPhotos.file}
          onPick={props.onKittenPhotosChange}
          onRemove={props.onKittenPhotosRemove}
        />
        <DocumentItem
          label="Surat keterangan dokter hewan"
          description="Memperkuat hasil verifikasi admin."
          icon="medical"
          isRequired={false}
          file={props.vetLetter.file}
          onPick={props.onVetLetterChange}
          onRemove={props.onVetLetterRemove}
        />
        <DocumentItem
          label="Bukti pembayaran"
          description="Biaya penerbitan pedigree."
          icon="receipt"
          isRequired={false}
          file={props.paymentProof.file}
          onPick={props.onPaymentProofChange}
          onRemove={props.onPaymentProofRemove}
        />
      </div>
    </div>
  );
}