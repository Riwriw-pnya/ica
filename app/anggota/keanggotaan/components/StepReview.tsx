"use client";

import React, { useState } from "react";

export interface StepReviewProps {
    catteryData: {
        namaCattery: string;
        prefixPedigree: string;
        tahunBeroperasi: string;
        wilayahIca: string;
        alamatLokasi: string;
        pemilik: string;
        kontak: string;
    };
    maleCat: {
        name: string;
        breed: string;
        certNumber: string;
    };
    femaleCat: {
        name: string;
        breed: string;
        certNumber: string;
    };
    offspringsCount?: number;
    documents: Array<{
        id: string;
        title: string;
        fileName?: string;
    }>;
    isSubmitting?: boolean;
    onNavigateToStep: (stepNumber: number) => void;
    onSubmitSuccess: () => void;
}

export default function StepReview({
    catteryData,
    maleCat,
    femaleCat,
    offspringsCount = 0,
    documents,
    isSubmitting = false,
    onNavigateToStep,
    onSubmitSuccess,
    }: StepReviewProps) {
    const [isAgreed, setIsAgreed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getDocStatus = (docId: string) => {
        const doc = documents.find((d) => d.id === docId);
        return doc?.fileName ? doc.fileName : "Belum diunggah";
    };

    return (
        <div className="space-y-6">
        {/* Box Utama Review */}
        <div className="rounded-2xl border border-[#efe9e2] bg-white p-7 shadow-xs space-y-6">
            {/* Header Review */}
            <div>
            <h2 className="text-base font-bold text-[#1a1817]">Review pengajuan</h2>
            <p className="mt-0.5 text-xs text-[#8c857b]">
                Periksa kembali sebelum dikirim. Perubahan setelah pengajuan hanya bisa lewat permintaan revisi admin.
            </p>
            </div>

            {/* Section 1: Data Cattery */}
            <div className="rounded-2xl border border-[#eee8e2] bg-white p-5 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#1a1817]">Data cattery</h3>
                <button
                type="button"
                onClick={() => onNavigateToStep(1)}
                className="rounded-full border border-[#e8e2da] bg-white px-4 py-1 text-xs font-semibold text-[#38332e] hover:bg-[#fcfbf9] transition cursor-pointer"
                >
                Ubah
                </button>
            </div>

            <div className="grid grid-cols-1 gap-y-3.5 gap-x-6 text-xs md:grid-cols-3">
                <div>
                <p className="text-[#8c857b]">Nama cattery</p>
                <p className="font-bold text-[#1a1817] mt-0.5">{catteryData.namaCattery || "-"}</p>
                </div>
                <div>
                <p className="text-[#8c857b]">Prefix pedigree</p>
                <p className="font-bold text-[#1a1817] mt-0.5">{catteryData.prefixPedigree || "-"}</p>
                </div>
                <div>
                <p className="text-[#8c857b]">Wilayah ICA</p>
                <p className="font-bold text-[#1a1817] mt-0.5">{catteryData.wilayahIca || "-"}</p>
                </div>
                <div>
                <p className="text-[#8c857b]">Mulai beroperasi</p>
                <p className="font-bold text-[#1a1817] mt-0.5">{catteryData.tahunBeroperasi || "-"}</p>
                </div>
                <div>
                <p className="text-[#8c857b]">Pemilik</p>
                <p className="font-bold text-[#1a1817] mt-0.5">{catteryData.pemilik || "-"}</p>
                </div>
                <div>
                <p className="text-[#8c857b]">Kontak</p>
                <p className="font-bold text-[#1a1817] mt-0.5">{catteryData.kontak || "-"}</p>
                </div>
            </div>
            </div>

            {/* Section 2: Kucing Wajib */}
            <div className="rounded-2xl border border-[#eee8e2] bg-white p-5 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#1a1817]">Kucing wajib</h3>
                <button
                type="button"
                onClick={() => onNavigateToStep(2)}
                className="rounded-full border border-[#e8e2da] bg-white px-4 py-1 text-xs font-semibold text-[#38332e] hover:bg-[#fcfbf9] transition cursor-pointer"
                >
                Ubah
                </button>
            </div>

            <div className="grid grid-cols-1 gap-y-3.5 gap-x-6 text-xs md:grid-cols-3">
                <div>
                <p className="text-[#8c857b]">Pejantan</p>
                <p className="font-bold text-[#1a1817] mt-0.5">
                    {maleCat.name ? `${maleCat.name} · ${maleCat.breed}` : "-"}
                </p>
                </div>
                <div>
                <p className="text-[#8c857b]">Pedigree pejantan</p>
                <p className="font-bold text-[#1a1817] mt-0.5">{maleCat.certNumber || "-"}</p>
                </div>
                <div>
                <p className="text-[#8c857b]">Induk</p>
                <p className="font-bold text-[#1a1817] mt-0.5">
                    {femaleCat.name ? `${femaleCat.name} · ${femaleCat.breed}` : "-"}
                </p>
                </div>
                <div>
                <p className="text-[#8c857b]">Pedigree induk</p>
                <p className="font-bold text-[#1a1817] mt-0.5">{femaleCat.certNumber || "-"}</p>
                </div>
                <div>
                <p className="text-[#8c857b]">Keturunan</p>
                <p className="font-bold text-[#1a1817] mt-0.5">
                    {offspringsCount > 0 ? `${offspringsCount} ekor ditambahkan` : "Belum ditambahkan"}
                </p>
                </div>
            </div>
            </div>

            {/* Section 3: Dokumen */}
            <div className="rounded-2xl border border-[#eee8e2] bg-white p-5 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#1a1817]">Dokumen</h3>
                <button
                type="button"
                onClick={() => onNavigateToStep(3)}
                className="rounded-full border border-[#e8e2da] bg-white px-4 py-1 text-xs font-semibold text-[#38332e] hover:bg-[#fcfbf9] transition cursor-pointer"
                >
                Ubah
                </button>
            </div>

            <div className="grid grid-cols-1 gap-y-3.5 gap-x-6 text-xs md:grid-cols-3">
                <div>
                <p className="text-[#8c857b]">KTP pemilik cattery</p>
                <p className="font-bold text-[#1a1817] mt-0.5 truncate">{getDocStatus("ktp")}</p>
                </div>
                <div>
                <p className="text-[#8c857b]">Sertifikat pedigree pejantan</p>
                <p className="font-bold text-[#1a1817] mt-0.5 truncate">{getDocStatus("sertifikat_pejantan")}</p>
                </div>
                <div>
                <p className="text-[#8c857b]">Sertifikat pedigree induk</p>
                <p className="font-bold text-[#1a1817] mt-0.5 truncate">{getDocStatus("sertifikat_induk")}</p>
                </div>
                <div>
                <p className="text-[#8c857b]">Foto lokasi cattery</p>
                <p className="font-bold text-[#1a1817] mt-0.5 truncate">{getDocStatus("foto_lokasi")}</p>
                </div>
                <div>
                <p className="text-[#8c857b]">Bukti pembayaran pendaftaran</p>
                <p className="font-bold text-[#1a1817] mt-0.5 truncate">{getDocStatus("bukti_pembayaran")}</p>
                </div>
            </div>
            </div>

            {/* Checkbox Pernyataan */}
            <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[#d6cfc7] text-[#ee6b28] focus:ring-[#ee6b28] cursor-pointer"
                />
                <span className="text-xs text-[#5e5852] select-none">
                Saya menyatakan data dan dokumen di atas benar, dan bersedia mengikuti ketentuan cattery ICA.
                </span>
            </label>
            </div>
        </div>

        {/* Navigasi Bawah */}
        <div className="flex items-center justify-between">
            <button
            type="button"
            onClick={() => onNavigateToStep(3)}
            className="rounded-full border border-[#e5ded6] bg-white px-7 py-2.5 text-xs font-semibold text-[#38332e] hover:bg-[#fcfbf9] transition cursor-pointer"
            >
            Kembali
            </button>
            <button
            type="button"
            disabled={!isAgreed || isSubmitting}
            onClick={() => setIsModalOpen(true)}
            className={`rounded-full px-7 py-2.5 text-xs font-bold transition cursor-pointer ${
                isAgreed && !isSubmitting
                ? "bg-gradient-to-r from-[#ff9b53] to-[#ee6b28] text-white shadow-[0_4px_14px_rgba(238,107,40,0.3)] hover:brightness-95 active:scale-95"
                : "bg-[#e2dcd5] text-[#a39c94] cursor-not-allowed"
            }`}
            >
            {isSubmitting ? "Mengirim..." : "Kirim pengajuan"}
            </button>
        </div>

        {/* Modal Konfirmasi */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
                <h3 className="text-base font-bold text-[#1a1817]">
                Kirim pengajuan cattery?
                </h3>
                <p className="text-xs text-[#5e5852] leading-relaxed">
                Apakah Anda yakin dan sudah mengecek data serta dokumen yang akan dikirim? Setelah terkirim, perubahan hanya bisa dilakukan lewat permintaan revisi admin.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="rounded-full border border-[#e5ded6] bg-white px-5 py-2 text-xs font-bold text-[#38332e] hover:bg-[#fcfbf9] transition cursor-pointer"
                >
                    Periksa lagi
                </button>
                <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                    setIsModalOpen(false);
                    onSubmitSuccess();
                    }}
                    className="rounded-full bg-gradient-to-r from-[#ff9b53] to-[#ee6b28] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_14px_rgba(238,107,40,0.3)] hover:brightness-95 active:scale-95 transition cursor-pointer"
                >
                    {isSubmitting ? "Memproses..." : "Ya, kirim sekarang"}
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}