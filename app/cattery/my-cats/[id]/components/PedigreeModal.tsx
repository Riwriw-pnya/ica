"use client";

import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PedigreeCertificate, {
  DEFAULT_PEDIGREE_DATA,
  PedigreeCatData,
} from "./PedigreeCertificate"; 
import { MOCK_PEDIGREE_BY_ID } from "@/data/mockPedigree";

interface PedigreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  catId: number;
}

export function PedigreeModal({
  isOpen,
  onClose,
  catId,
}: PedigreeModalProps) {
  if (!isOpen) return null;

  const certificateData: PedigreeCatData =
    MOCK_PEDIGREE_BY_ID[catId] || DEFAULT_PEDIGREE_DATA;

  const handleDownloadPDF = async () => {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "-9999px";
    container.style.left = "-9999px";
    container.style.width = "800px";
    container.style.height = "1131px";
    document.body.appendChild(container);

    const sourceElement = document.getElementById("pedigree-certificate-area");
    if (!sourceElement) {
      document.body.removeChild(container);
      return;
    }

    const clone = sourceElement.cloneNode(true) as HTMLElement;
    clone.style.transform = "none";
    clone.style.webkitTransform = "none";
    clone.style.margin = "0";
    
    const allElements = clone.querySelectorAll("*");
    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.lineHeight = "normal";
      if (htmlEl.classList.contains("truncate")) {
        htmlEl.style.overflow = "visible";
        htmlEl.style.textOverflow = "clip";
        htmlEl.style.whiteSpace = "nowrap";
      }
    });

    container.appendChild(clone);

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: 800,
        height: 1131,
      });

      document.body.removeChild(container);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
      pdf.save(`Sertifikat_Pedigree_${certificateData.catName.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("Gagal mengunduh PDF:", error);
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    }
  };

  return (
    // Backdrop ditaruh di z-[100] dengan backdrop-blur-md agar bottomnav & UI bawah ikut ter-blur & terkunci
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-md animate-fade-in overflow-hidden">
      
      {/* Box Modal Responsif (Full width di HP, max-w-4xl di Desktop) */}
      <div className="relative w-full max-w-4xl rounded-2xl bg-white p-4 sm:p-6 shadow-2xl space-y-3 sm:space-y-4 overflow-hidden border border-[#EEDFD5] max-h-[90dvh] flex flex-col">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-[#EEDFD5] pb-3 shrink-0">
          <div className="pr-2 min-w-0">
            <h3 className="text-sm sm:text-base font-extrabold text-[#1F1B18] truncate">
              Sertifikat Pedigree · {certificateData.catName}
            </h3>
            <p className="text-[11px] sm:text-xs text-[#8C8074] mt-0.5 truncate">
              No. Registrasi: {certificateData.registrationNo}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FAF7F2] border border-[#EEDFD5] text-[#8C8074] hover:text-[#1F1B18] hover:bg-white transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* MODAL BODY (DILENGKAPI WRAPPER PENGUNCI TINGGI AGAR GAK SCROLL PANJANG) */}
        <div className="flex-1 overflow-auto p-2 sm:p-4 bg-[#F4F1EA] rounded-xl flex justify-center items-start custom-scrollbar">
        {/* Container ini mengunci area scroll pas sesuai ukuran skala gambar */}
        <div className="relative w-[310px] h-[440px] min-[390px]:w-[370px] min-[390px]:h-[520px] sm:w-[560px] sm:h-[800px] md:w-[680px] md:h-[970px] overflow-hidden flex justify-center items-start shrink-0 my-1">
            <div className="scale-[0.38] min-[390px]:scale-[0.46] sm:scale-[0.7] md:scale-[0.85] origin-top-left absolute top-0 left-0">
            <PedigreeCertificate data={certificateData} />
            </div>
        </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 pt-2 shrink-0 border-t border-[#EEDFD5]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#EEDFD5] bg-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-[#70665D] hover:bg-[#FAF7F2] transition cursor-pointer"
          >
            Tutup
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 rounded-full bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-bold text-white shadow-md active:scale-95 transition cursor-pointer border-t border-[#FFE5D4]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Unduh PDF
          </button>
        </div>

      </div>
    </div>
  );
}