"use client";

import React from "react";
import { ArrowLeft, Check, FileText } from "lucide-react";

interface EventCatSubmittedMobileProps {
  onBackToEvent: () => void;
  onEditCatData: () => void;
}

export default function EventCatSubmittedMobile({
  onBackToEvent,
  onEditCatData,
}: EventCatSubmittedMobileProps) {
  return (
    <div className="fixed inset-0 bottom-[56px] z-50 bg-[#F7F5F0] flex flex-col">
      {/* Header */}
      <div className="shrink-0 px-4 pt-5 pb-4 border-b border-[#EAE5DF] bg-[#F7F5F0]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToEvent}
            className="w-9 h-9 rounded-full bg-white border border-[#EEDFD5] flex items-center justify-center text-[#574D45] active:scale-95 transition-transform shrink-0"
          >
            <ArrowLeft size={18} strokeWidth={2.2} />
          </button>

          <div className="min-w-0">
            <h1 className="text-base font-bold text-[#1A1513]">
              Pendaftaran Event
            </h1>

            <p className="text-[11px] text-[#8C8074] mt-0.5 truncate">
              ICA Cat Show Bandung 2026
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-6">
        <div className="space-y-4">
          {/* Status */}
          <div className="bg-white rounded-2xl border border-[#EEDFD5] p-4 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EAF6ED] text-[#28844B] flex items-center justify-center shrink-0">
                <Check size={17} strokeWidth={2.8} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm text-[#1A1513]">
                  Pembayaran berhasil
                </h3>

                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#EAF6ED] text-[#28844B] text-[9px] font-semibold">
                    Slot terkunci
                  </span>

                  <span className="px-2 py-0.5 rounded-full bg-[#FFF2E8] text-[#EE6B28] text-[9px] font-semibold">
                    1 slot
                  </span>
                </div>

                <p className="text-[11px] text-[#7E7267] mt-2 leading-relaxed">
                  ICA Cat Show Bandung 2026 · 1 slot kategori Cattery.
                </p>

                <p className="text-[11px] text-[#7E7267] mt-0.5 leading-relaxed">
                  Nomor registrasi{" "}
                  <span className="font-semibold text-[#1A1513]">
                    REG-011-0142
                  </span>
                  .
                </p>

                <p className="text-[10px] text-[#A09387] mt-2 leading-relaxed">
                  Nomor batching diisi admin ICA setelah pendaftaran ditutup.
                </p>
              </div>
            </div>
          </div>

          {/* Data Kucing */}
          <div className="bg-white rounded-2xl border border-[#EEDFD5] p-4 shadow-xs">
            <div>
              <h2 className="text-base font-bold text-[#1A1513]">
                Data kucing terkirim
              </h2>

              <p className="text-[11px] text-[#8C8074] mt-1 leading-relaxed">
                Kucing berikut terdaftar di ICA Cat Show Bandung 2026.
                Perubahan data setelah ini dilakukan admin ICA.
              </p>
            </div>

            {/* Cat 1 */}
            <div className="mt-4 rounded-xl border border-[#EEDFD5] bg-white p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF2E8] flex items-center justify-center text-lg shrink-0">
                  🐱
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-xs text-[#1A1513] truncate">
                    Rimba of Rumah Hana
                  </p>

                  <p className="text-[10px] text-[#8C8074] mt-1">
                    Persian · EMS PER a 21
                  </p>

                  <div className="flex items-center gap-1 mt-1">
                    <FileText
                      size={10}
                      className="text-[#A09387] shrink-0"
                    />

                    <p className="text-[9px] text-[#A09387] truncate">
                      ICA-2023-0612
                    </p>
                  </div>
                </div>

                <span className="px-2 py-1 rounded-full bg-[#EAF6ED] text-[#28844B] text-[9px] font-semibold shrink-0">
                  My Cats
                </span>
              </div>
            </div>

            {/* Cat 2 */}
            <div className="mt-2.5 rounded-xl border border-[#EEDFD5] bg-white p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF2E8] flex items-center justify-center text-lg shrink-0">
                  🐱
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-xs text-[#1A1513] truncate">
                    Sekar Ayu
                  </p>

                  <p className="text-[10px] text-[#8C8074] mt-1">
                    Exotic Shorthair · EMS EXO n 24
                  </p>

                  <div className="flex items-center gap-1 mt-1">
                    <FileText
                      size={10}
                      className="text-[#A09387] shrink-0"
                    />

                    <p className="text-[9px] text-[#A09387] truncate">
                      ICA-2024-0733
                    </p>
                  </div>
                </div>

                <span className="px-2 py-1 rounded-full bg-[#EAF6ED] text-[#28844B] text-[9px] font-semibold shrink-0">
                  My Cats
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="mt-4 rounded-xl bg-[#FFF8F2] border border-[#FADEC9] p-3">
              <p className="text-[10px] text-[#7E7267] leading-relaxed">
                Data kucing telah berhasil dikirim. Jika terdapat kesalahan
                data, perubahan dapat dilakukan melalui admin ICA.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="shrink-0 bg-[#F7F5F0] border-t border-[#EAE5DF] px-4 py-3">
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={onBackToEvent}
            className="flex-1 h-11 rounded-full border border-[#EEDFD5] bg-white text-[11px] font-semibold text-[#574D45] active:scale-[0.98] transition-all"
          >
            Kembali ke Event
          </button>

          <button
            type="button"
            onClick={onEditCatData}
            className="flex-1 h-11 rounded-full bg-gradient-to-r from-[#FFA26B] via-[#EE6B28] to-[#E35610] text-white text-[11px] font-semibold shadow-[0_4px_12px_rgba(238,107,40,0.18)] active:scale-[0.98] transition-all"
          >
            Ubah data kucing
          </button>
        </div>
      </div>
    </div>
  );
}