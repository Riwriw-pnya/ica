"use client";

import React, { useRef } from "react";
import { useToast } from "@/context/ToastContext";

export interface DocItem {
    id: string;
    title: string;
    required: boolean;
    fileName?: string;
    fileSize?: string;
}

interface StepDokumenProps {
    documents: DocItem[];
    onUpload: (id: string, fileName: string, fileSize: string) => void;
    onRemove: (id: string) => void;
    showError?: boolean;
}

export default function StepDokumen({
    documents, onUpload, onRemove, showError,
    }: StepDokumenProps) {
    const { showToast } = useToast();
    const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    const handleFileChange = (
        doc: DocItem,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1) + " MB";
        const isReupload = !!doc.fileName;

        onUpload(doc.id, file.name, fileSizeMB);

        // Trigger Toast sesuai aksi
        showToast(
            `${doc.title} ${isReupload ? "berhasil diperbarui" : "berhasil diunggah"}.`,
            "",
            { tone: "success" }
        );
        }
    };

    const handleRemove = (doc: DocItem) => {
        onRemove(doc.id);
        if (fileInputRefs.current[doc.id]) {
        fileInputRefs.current[doc.id]!.value = "";
        }
        showToast(`${doc.title} dihapus dari pengajuan.`, "", { tone: "info" });
    };

    return (
        <div className="rounded-2xl border border-[#efe9e2] bg-white p-7 shadow-xs space-y-6">
        {/* Header Dokumen */}
        <div>
            <h2 className="text-base font-bold text-[#1a1817]">Dokumen pendukung</h2>
            <p className="mt-0.5 text-xs text-[#8c857b]">
            Format JPG, PNG, atau PDF. Maksimal 5 MB per berkas.
            </p>
        </div>

        {/* Grid Dokumen Card */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {documents.map((doc) => {
            const isUploaded = !!doc.fileName;
            const isMissing = showError && doc.required && !isUploaded;

            return (
                <div
                key={doc.id}
                className={`relative flex items-center justify-between rounded-2xl border p-4 transition-all ${
                    isUploaded
                    ? "border-[#d1f2d9] bg-[#f2faf4]"
                    : isMissing
                    ? "border-red-400 bg-[#fff8f8]"
                    : "border-[#eee8e2] bg-white hover:border-[#e2d9cf]"
                }`}
                >
                {/* Left Side: Icon & Info */}
                <div className="flex items-center gap-3.5 min-w-0 pr-2">
                    <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isUploaded
                        ? "bg-[#e2f7e7] text-[#28844b]"
                        : "bg-[#fcfbf9] border border-[#eee8e2] text-[#8c857b]"
                    }`}
                    >
                    {isUploaded ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    )}
                    </div>

                    <div className="min-w-0">
                    <h3 className="text-xs font-bold text-[#1a1817] truncate">
                        {doc.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-[#8c857b] truncate">
                        {isUploaded ? (
                        <span className="text-[#5e5852]">
                            {doc.fileName} · {doc.fileSize}
                        </span>
                        ) : (
                        <span>
                            {doc.required ? "Wajib" : "Opsional"} · belum diunggah
                        </span>
                        )}
                    </p>
                    </div>
                </div>

                {/* Right Side: File Input & Action Buttons */}
                <input
                    type="file"
                    ref={(el) => { fileInputRefs.current[doc.id] = el; }}
                    onChange={(e) => handleFileChange(doc, e)}
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                />

                <div className="flex items-center gap-1.5 shrink-0">
                    {isUploaded ? (
                    <>
                        <button
                        type="button"
                        onClick={() => fileInputRefs.current[doc.id]?.click()}
                        className="rounded-full border border-[#d6cfc7] bg-white px-3.5 py-1.5 text-[11px] font-bold text-[#38332e] hover:bg-[#fcfbf9] transition cursor-pointer"
                        >
                        Ganti
                        </button>
                        <button
                        type="button"
                        onClick={() => handleRemove(doc)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[#8c857b] hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                        title="Hapus berkas"
                        >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </>
                    ) : (
                    <button
                        type="button"
                        onClick={() => fileInputRefs.current[doc.id]?.click()}
                        className="rounded-full border border-[#fce3d2] bg-[#fff7f2] px-4 py-1.5 text-[11px] font-bold text-[#ee6b28] hover:bg-[#ffe5d4] transition cursor-pointer"
                    >
                        Unggah
                    </button>
                    )}
                </div>
                </div>
            );
            })}
        </div>
        </div>
    );
}