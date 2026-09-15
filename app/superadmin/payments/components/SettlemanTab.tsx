"use client";

import React, { useState } from "react";
import Toast from "@/components/Toast";
import WithdrawalModal from "./WithdrawalModal";

export default function SettlementTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastState, setToastState] = useState<{
    show: boolean;
    title: string;
    message: string;
    tone: "success" | "error" | "info";
  } | null>(null);

  const showToast = (title: string, message: string, tone: "success" | "error" | "info") => {
    setToastState({ show: true, title, message, tone });
  };

  const handleSuccessSubmit = () => {
    showToast(
      "Berhasil",
      "Pengajuan penarikan dikirim. Status mengikuti settlement gateway.",
      "success"
    );
  };

  const handleErrorToast = (msg: string) => {
    showToast("Gagal", msg, "error");
  };

  const handleDownload = () => {
    showToast("Berhasil", "Rekap settlement bulan berjalan diunduh.", "success");
  };

  return (
    <div className="relative space-y-5">
      {/* Toast Floating Container */}
      {toastState?.show && (
        <div className="fixed top-5 right-5 z-50">
          <Toast
            title={toastState.title}
            message={toastState.message}
            tone={toastState.tone}
            onClose={() => setToastState(null)}
          />
        </div>
      )}

      {/* Warning Banner */}
      <div className="flex items-center gap-2.5 rounded-xl border border-[#FCE3D2] bg-[#FFF7F2] p-3.5 text-xs text-[#EE6B28]">
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
        </svg>
        <p>
          Akses terbatas. Percabangan Settlement hanya terbuka untuk Super Admin atau admin wilayah yang diberi otorisasi tarik dana pada menu Users &amp; Roles.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8074]">SALDO TERSEDIA</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF6ED] text-[#28844B]">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
          <p className="mt-3 text-2xl font-black text-[#1A1513]">Rp 38,2 jt</p>
          <p className="mt-0.5 text-xs text-[#8C8074]">Siap ditarik hari ini</p>
        </div>

        <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8074]">DANA TERTAHAN</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFF4E5] text-[#C26D0A]">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
              </svg>
            </span>
          </div>
          <p className="mt-3 text-2xl font-black text-[#1A1513]">Rp 3,5 jt</p>
          <p className="mt-0.5 text-xs text-[#8C8074]">Settlement gateway T+2</p>
        </div>

        <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8074]">PENARIKAN BULAN INI</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EBF3FF] text-[#2563EB]">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </span>
          </div>
          <p className="mt-3 text-2xl font-black text-[#1A1513]">Rp 22,0 jt</p>
          <p className="mt-0.5 text-xs text-[#8C8074]">3 pengajuan · semua selesai</p>
        </div>
      </div>

      {/* Main Action Banner */}
      <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-[#1A1513]">Tarik dana ke rekening ICA</h3>
          <p className="mt-0.5 text-xs text-[#8C8074]">
            Penarikan dikirim ke rekening resmi organisasi dan tercatat di log audit atas nama admin yang mengajukan.
          </p>
        </div>

        <div className="rounded-xl border border-[#EEDFD5] bg-[#FAF8F5] p-4 text-xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[#8C8074]">Rekening tujuan</span>
            <span className="font-bold text-[#1A1513]">BCA 018–2233–4455 · a.n. Indonesian Cat Association</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8C8074]">Minimum penarikan</span>
            <span className="font-bold text-[#1A1513]">Rp 500.000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8C8074]">Estimasi dana masuk</span>
            <span className="font-bold text-[#1A1513]">1 hari kerja</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          {/* Button Tarik Dana */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D] hover:shadow-[0_6px_16px_rgba(238,107,40,0.35)] active:translate-y-0"
          >
            ↓ Tarik dana
          </button>

          {/* Button Unduh Rekap */}
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 cursor-pointer rounded-full border border-[#FCE3D2] bg-white px-5 py-2 text-xs font-bold text-[#EE6B28] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FFF7F2] hover:border-[#EE6B28] hover:shadow-[0_4px_12px_rgba(238,107,40,0.15)] active:translate-y-0"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Unduh rekap settlement
          </button>
        </div>
      </div>

      {/* Riwayat Penarikan */}
      <div className="rounded-2xl border border-[#EEDFD5] bg-white p-5 shadow-xs">
        <h3 className="text-sm font-bold text-[#1A1513]">Riwayat penarikan</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EEDFD5] text-[10px] font-bold uppercase tracking-wider text-[#8C8074]">
                <th className="pb-3 pr-4">REFERENSI</th>
                <th className="pb-3 pr-4">NOMINAL</th>
                <th className="pb-3 pr-4">DIAJUKAN OLEH</th>
                <th className="pb-3 pr-4">TANGGAL</th>
                <th className="pb-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEDFD5]">
              <tr className="hover:bg-[#FAF7F5]">
                <td className="py-3.5 pr-4 font-semibold text-[#8C8074]">STL-2026-0031</td>
                <td className="py-3.5 pr-4 font-bold text-[#1A1513]">Rp 12.000.000</td>
                <td className="py-3.5 pr-4 text-[#1A1513]">Rifqi Ananda · <span className="text-[#8C8074]">Super Admin</span></td>
                <td className="py-3.5 pr-4 text-[#574D45]">5 Sep 2026</td>
                <td className="py-3.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF6ED] px-2.5 py-0.5 text-[11px] font-medium text-[#28844B]">
                    ● Disetujui
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#FAF7F5]">
                <td className="py-3.5 pr-4 font-semibold text-[#8C8074]">STL-2026-0030</td>
                <td className="py-3.5 pr-4 font-bold text-[#1A1513]">Rp 6.500.000</td>
                <td className="py-3.5 pr-4 text-[#1A1513]">Dewi Larasati · <span className="text-[#8C8074]">Admin Jawa Barat</span></td>
                <td className="py-3.5 pr-4 text-[#574D45]">28 Agu 2026</td>
                <td className="py-3.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF6ED] px-2.5 py-0.5 text-[11px] font-medium text-[#28844B]">
                    ● Disetujui
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <WithdrawalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={handleSuccessSubmit}
        onErrorToast={handleErrorToast}
      />
    </div>
  );
}