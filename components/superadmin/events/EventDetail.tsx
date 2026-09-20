"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Edit3, User, Clock, CheckCircle2, AlertCircle, XCircle, Copy, Share2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function EventDetail() {
  const { showToast } = useToast();
  const [isPublished, setIsPublished] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleTogglePublish = () => {
    const nextState = !isPublished;
    setIsPublished(nextState);
    if (nextState) {
      showToast("Event dipublikasikan. Link share aktif dan notifikasi terkirim ke aplikasi.", "success");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://ica.or.id/event/ev-2026-011-cat-show-bandung");
    setCopied(true);
    showToast("Link event berhasil disalin.", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const slotsData = [
    {
      name: "Umum",
      statusText: "6 slot tersisa",
      statusColor: "text-[#C88500]",
      sold: 74,
      total: 80,
      percentage: "93%",
      barColor: "bg-[#E5A93B]",
    },
    {
      name: "Member",
      statusText: "8 slot tersisa",
      statusColor: "text-[#C88500]",
      sold: 52,
      total: 60,
      percentage: "87%",
      barColor: "bg-[#E5A93B]",
    },
    {
      name: "Cattery",
      statusText: "Kuota penuh",
      statusColor: "text-rose-600",
      badgeBg: "bg-rose-50 border-rose-200",
      sold: 50,
      total: 50,
      percentage: "100%",
      barColor: "bg-rose-500",
    },
    {
      name: "Sponsor (Cattery)",
      statusText: "6 slot tersisa",
      statusColor: "text-emerald-600",
      sold: 4,
      total: 10,
      percentage: "40%",
      barColor: "bg-emerald-500",
    },
  ];

  const registrations = [
    {
      regNo: "REG-0114",
      peserta: "Hana Maheswari",
      subPeserta: "Rumah Hana Cattery",
      kategori: "Cattery",
      dataKucing: "Bagas, Nara",
      pembayaran: "Completed",
      tglBayar: "31 Agu 2026 10:12",
      meja: "Meja 19",
      batch: "Batch 1",
      actionType: "ubah",
    },
    {
      regNo: "REG-0121",
      peserta: "Reza Aditya",
      subPeserta: "Bandung Paws Cattery",
      kategori: "Cattery",
      dataKucing: "Kimo, Sasa",
      pembayaran: "Completed",
      tglBayar: "1 Sep 2026 09:04",
      meja: "Meja 2",
      batch: "Batch 2",
      actionType: "ubah",
    },
    {
      regNo: "REG-0126",
      peserta: "Tirta Wijaya",
      subPeserta: "Sumatra Cats",
      kategori: "Cattery",
      dataKucing: "Rico",
      pembayaran: "Completed",
      tglBayar: "2 Sep 2026 14:47",
      meja: "Meja 7",
      batch: null,
      actionType: "set",
    },
    {
      regNo: "REG-0133",
      peserta: "Ayu Kartika",
      subPeserta: "Member ICA-2026-0388",
      kategori: "Member",
      dataKucing: "Belum diisi",
      pembayaran: "Pending",
      tglBayar: "menunggu · sisa 06:12",
      meja: "-",
      batch: null,
      actionType: "waiting",
    },
    {
      regNo: "REG-0134",
      peserta: "Bimo Saputra",
      subPeserta: "Peserta umum",
      kategori: "Umum",
      dataKucing: "Belum diisi",
      pembayaran: "Expired",
      tglBayar: "slot dilepas 3 Sep 2026 11:20",
      meja: "-",
      batch: null,
      actionType: "waiting",
    },
    {
      regNo: "REG-0136",
      peserta: "Nadia Puspa",
      subPeserta: "Member ICA-2025-1330",
      kategori: "Member",
      dataKucing: "Miko",
      pembayaran: "Completed",
      tglBayar: "3 Sep 2026 16:31",
      meja: "Meja 17",
      batch: null,
      actionType: "set",
    },
    {
      regNo: "REG-0140",
      peserta: "Whiskerlane Cattery",
      subPeserta: "Sponsor resmi · kuota sponsor",
      kategori: "Sponsor (Cattery)",
      dataKucing: "Aksa, Dena, Lila",
      pembayaran: "Completed",
      tglBayar: "komplimentari · tanpa checkout",
      meja: "Meja 21",
      batch: null,
      actionType: "set",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tombol Kembali & Aksi Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EFECE6] shadow-sm">
        <div className="space-y-2">
          <Link href="/superadmin/events" className="inline-flex items-center text-sm text-[#8C7A6B] hover:text-[#231A14] transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke agenda event
          </Link>
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="px-2.5 py-1 text-xs font-medium bg-[#F5F2EB] text-[#6B5D52] rounded-full border border-[#EFECE6]">
              • {isPublished ? "Published" : "Draft"}
            </span>
            <span className="px-2.5 py-1 text-xs font-medium bg-[#F5F2EB] text-[#6B5D52] rounded-full border border-[#EFECE6]">
              • Bandung
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#231A14]">ICA Cat Show Bandung 2026</h1>
          <p className="text-sm text-[#6B5D52]">
            EV-2026-011 · 18–19 Okt 2026 · Trans Convention Center · timeout 10:00[cite: 12]
          </p>
        </div>

        <Link
          href="/superadmin/events/create"
          className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-[#231A14] bg-white border border-[#EFECE6] rounded-xl hover:bg-[#FAFAF7] transition-all shadow-sm cursor-pointer"
        >
          <Edit3 className="w-4 h-4 mr-2 text-[#8C7A6B]" /> Ubah kuota & timer[cite: 12]
        </Link>
      </div>

      {/* Grid Kartu Slot Kategori */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {slotsData.map((slot, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#231A14]">{slot.name}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${slot.badgeBg || 'bg-amber-50'} ${slot.statusColor}`}>
                {slot.statusText}
              </span>
            </div>
            <div>
              <div className="text-xs text-[#8C7A6B]">
                {slot.sold} terjual dari {slot.total} slot · {slot.percentage}[cite: 12]
              </div>
              <div className="w-full bg-[#F5F2EB] h-2 rounded-full mt-2 overflow-hidden">
                <div className={`${slot.barColor} h-full rounded-full`} style={{ width: slot.percentage }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabel List Pendaftaran dan Status Pembayaran */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#EFECE6] space-y-1">
          <h3 className="text-lg font-bold text-[#231A14]">List pendaftaran dan status pembayaran[cite: 12]</h3>
          <p className="text-xs text-[#8C7A6B]">
            Peserta otomatis masuk ke daftar ini begitu pendaftaran dan pembayaran selesai. Nomor batching hanya bisa diisi untuk peserta dengan pembayaran Completed: nomor meja mengikuti pengaturan benching[cite: 12].
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EFECE6] text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider bg-[#FAFAF7]">
                <th className="py-3.5 px-6">No. Registrasi</th>
                <th className="py-3.5 px-6">Peserta</th>
                <th className="py-3.5 px-6">Kategori Kuota</th>
                <th className="py-3.5 px-6">Data Kucing</th>
                <th className="py-3.5 px-6">Pembayaran</th>
                <th className="py-3.5 px-6">Meja</th>
                <th className="py-3.5 px-6 text-right">Nomor Batching</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6] text-sm">
              {registrations.map((reg, idx) => (
                <tr key={idx} className="hover:bg-[#FAFAF7]/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-[#231A14]">{reg.regNo}</td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-[#231A14]">{reg.peserta}</div>
                    <div className="text-xs text-[#8C7A6B]">{reg.subPeserta}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#F5F2EB] text-[#231A14] border border-[#EFECE6]">
                      <User className="w-3 h-3 mr-1 text-[#8C7A6B]" /> {reg.kategori}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#6B5D52]">{reg.dataKucing}</td>
                  <td className="py-4 px-6">
                    {reg.pembayaran === "Completed" && (
                      <div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                        </span>
                        <div className="text-[11px] text-[#8C7A6B] mt-1">{reg.tglBayar}</div>
                      </div>
                    )}
                    {reg.pembayaran === "Pending" && (
                      <div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3 mr-1" /> Pending
                        </span>
                        <div className="text-[11px] text-amber-600 mt-1">{reg.tglBayar}</div>
                      </div>
                    )}
                    {reg.pembayaran === "Expired" && (
                      <div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle className="w-3 h-3 mr-1" /> Expired
                        </span>
                        <div className="text-[11px] text-[#8C7A6B] mt-1">{reg.tglBayar}</div>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 font-medium text-[#231A14]">{reg.meja}</td>
                  <td className="py-4 px-6 text-right">
                    {reg.batch ? (
                      <div className="inline-flex items-center justify-end gap-2">
                        <span className="px-2.5 py-1 bg-[#F5F2EB] text-[#231A14] rounded-md text-xs font-medium border border-[#EFECE6]">
                          {reg.batch}
                        </span>
                        <button className="text-xs text-[#8C7A6B] hover:text-[#231A14] underline cursor-pointer">Ubah</button>
                      </div>
                    ) : reg.actionType === "set" ? (
                      <button className="px-3 py-1 bg-white border border-[#EFECE6] hover:bg-[#FAFAF7] text-[#231A14] rounded-lg text-xs font-medium shadow-sm transition-all cursor-pointer">
                        Set nomor
                      </button>
                    ) : (
                      <span className="text-xs text-[#8C7A6B]">Menunggu pembayaran</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Publikasi */}
      <div className="bg-white p-6 rounded-2xl border border-[#EFECE6] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#231A14]">Status publikasi</h3>
            <p className="text-sm text-[#8C7A6B]">
              Saat dipublikasikan, link pendaftaran aktif dan notifikasi event terbaru dikirim ke semua user aplikasi.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#8C7A6B]">
              {isPublished ? "Published" : "Draft"}
            </span>
            <button
              type="button"
              onClick={handleTogglePublish}
              className={`w-12 h-6 rounded-full p-1 transition-colors relative cursor-pointer ${
                isPublished ? "bg-[#EE6B28]" : "bg-[#EFECE6]"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                  isPublished ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Conditional Content based on Publish State */}
        {isPublished ? (
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 bg-[#FAFAF7] border border-[#EFECE6] rounded-xl">
              <input
                type="text"
                readOnly
                value="https://ica.or.id/event/ev-2026-011-cat-show-bandung"
                className="bg-transparent text-xs text-[#6B5D52] flex-1 px-2 py-1 outline-none font-mono"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg border border-[#EFECE6] bg-white text-[#231A14] hover:bg-[#FAFAF7] text-xs font-medium shadow-xs transition cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 mr-1.5 text-[#8C7A6B]" />
                  {copied ? "Disalin!" : "Copy link"}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-b from-[#FFC299] to-[#EE6B28] text-white text-xs font-semibold shadow-xs hover:from-[#EE6B28] hover:to-[#C8601D] transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 mr-1.5" />
                  Share event
                </button>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-800 text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
              <span>Notifikasi &quot;Event terbaru: ICA Cat Show Bandung 2026&quot; terkirim ke aplikasi Member dan Cattery. Kuota mulai dihitung sejak notifikasi terkirim.</span>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-800 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
            <span>Event masih draft. Link share dan notifikasi aplikasi baru dibuat setelah event dipublikasikan.</span>
          </div>
        )}
      </div>
    </div>
  );
}