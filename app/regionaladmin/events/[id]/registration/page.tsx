"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ShareEventModal, { ShareableEvent } from "../../components/ShareEventModal";
import Toast, { ToastTone } from "@/components/Toast"; 
import DashboardIcon from "@/components/anggota/DashboardIcon"; 
import SetBatchModal, { BatchModalData } from "../../components/SetBatchModal";

interface QuotaCategoryData {
  category: "Umum" | "Member" | "Cattery" | "Sponsor (Cattery)";
  sold: number;
  total: number;
}

interface RegistrationItem {
  id: string;
  regNo: string;
  name: string;
  catteryOrRole: string;
  quotaCategory: "Umum" | "Member" | "Cattery" | "Sponsor (Cattery)";
  catData: string;
  paymentStatus: "Completed" | "Pending" | "Expired";
  paymentNote?: string;
  tableNumber: string;
  batchNumber?: string;
}

const PUBLIC_CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "https://ica.or.id";

const mockQuotaData: QuotaCategoryData[] = [
  { category: "Umum", sold: 74, total: 80 },
  { category: "Member", sold: 52, total: 60 },
  { category: "Cattery", sold: 50, total: 50 },
  { category: "Sponsor (Cattery)", sold: 4, total: 10 },
];

const mockRegistrations: RegistrationItem[] = [
  {
    id: "1",
    regNo: "REG-0114",
    name: "Hana Maheswari",
    catteryOrRole: "Rumah Hana Cattery",
    quotaCategory: "Cattery",
    catData: "Bagas, Nara",
    paymentStatus: "Completed",
    paymentNote: "31 Agu 2026 10:12",
    tableNumber: "Meja 19",
    batchNumber: "Batch 1",
  },
  {
    id: "2",
    regNo: "REG-0121",
    name: "Reza Aditya",
    catteryOrRole: "Bandung Paws Cattery",
    quotaCategory: "Cattery",
    catData: "Kimo, Sasa",
    paymentStatus: "Completed",
    paymentNote: "1 Sep 2026 09:04",
    tableNumber: "Meja 2",
    batchNumber: "Batch 2",
  },
  {
    id: "3",
    regNo: "REG-0126",
    name: "Tirta Wijaya",
    catteryOrRole: "Sumatra Cats",
    quotaCategory: "Cattery",
    catData: "Rico",
    paymentStatus: "Completed",
    paymentNote: "2 Sep 2026 14:47",
    tableNumber: "Meja 7",
    batchNumber: "",
  },
  {
    id: "4",
    regNo: "REG-0133",
    name: "Ayu Kartika",
    catteryOrRole: "Member ICA-2026-0388",
    quotaCategory: "Member",
    catData: "Belum diisi",
    paymentStatus: "Pending",
    paymentNote: "menunggu · sisa 06:12",
    tableNumber: "—",
  },
  {
    id: "5",
    regNo: "REG-0134",
    name: "Bimo Saputra",
    catteryOrRole: "Peserta umum",
    quotaCategory: "Umum",
    catData: "Belum diisi",
    paymentStatus: "Expired",
    paymentNote: "slot dilepas 3 Sep 2026 11:20",
    tableNumber: "—",
  },
  {
    id: "6",
    regNo: "REG-0136",
    name: "Nadia Puspa",
    catteryOrRole: "Member ICA-2025-1330",
    quotaCategory: "Member",
    catData: "Miko",
    paymentStatus: "Completed",
    paymentNote: "3 Sep 2026 16:31",
    tableNumber: "Meja 5",
  },
];

export default function RegistrationsPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [isPublished, setIsPublished] = useState(true);
  const [quotaList] = useState<QuotaCategoryData[]>(mockQuotaData);
  const [registrations, setRegistrations] = useState<RegistrationItem[]>(mockRegistrations);
  const [selectedShareEvent, setSelectedShareEvent] = useState<ShareableEvent | null>(null);

  // State Modal Batching
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [selectedBatchData, setSelectedBatchData] = useState<BatchModalData | null>(null);

  // State Toast Custom
  const [toastState, setToastState] = useState<{
    show: boolean;
    title: string;
    message: string;
    tone: ToastTone;
  }>({
    show: false,
    title: "",
    message: "",
    tone: "success",
  });

  const eventData = {
    id: eventId,
    slug: "ev-2026-011-cat-show-bandung",
    title: "ICA Cat Show Bandung 2026",
    code: "EV-2026-011",
    date: "18–19 Okt 2026",
    location: "Bandung",
    venue: "Trans Convention Center",
    timeout: "timeout 10:00",
    activePeriod: "15 Sep 2026 09:00 sampai 12 Okt 2026 23:59 WIB",
  };

  // Construct URL publik khusus pendaftaran member/cattery
  const publicEventUrl = `${PUBLIC_CLIENT_URL}/event/${eventData.slug}`;

  const showToast = (title: string, message: string, tone: ToastTone = "success") => {
    setToastState({ show: true, title, message, tone });
  };

  const handleOpenBatchModal = (item: RegistrationItem) => {
    setSelectedBatchData({
      id: item.id,
      name: item.name,
      catteryOrRole: item.catteryOrRole,
      quotaCategory: item.quotaCategory,
      catData: item.catData,
      batchNumber: item.batchNumber,
    });
    setIsBatchModalOpen(true);
  };

  const handleSaveBatchNumber = (id: string, batchVal: string) => {
    const formattedBatch = batchVal.toLowerCase().startsWith("batch")
      ? batchVal
      : `Batch ${batchVal}`;

    let participantName = "";
    setRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.id === id) {
          participantName = reg.name;
          return { ...reg, batchNumber: formattedBatch };
        }
        return reg;
      })
    );

    setIsBatchModalOpen(false);

    showToast(
      "Berhasil Menyimpan",
      `Nomor batching ${formattedBatch} tersimpan untuk ${participantName}.`,
      "success"
    );
  };

  const handleTogglePublish = () => {
    const nextState = !isPublished;
    setIsPublished(nextState);

    if (nextState) {
      showToast(
        "Event dipublikasikan",
        "Link share aktif dan notifikasi terkirim ke aplikasi.",
        "success"
      );
    } else {
      showToast(
        "Event dikembalikan ke draft",
        "Link share dinonaktifkan.",
        "info"
      );
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicEventUrl);
    showToast("Copied", "Link event berhasil disalin ke clipboard.", "success");
  };

  return (
    <div className="relative space-y-3 pb-12 text-[13px] text-gray-800">
      {toastState.show && (
        <div className="fixed top-20 right-5 z-50">
          <Toast
            title={toastState.title}
            message={toastState.message}
            tone={toastState.tone}
            onClose={() => setToastState((prev) => ({ ...prev, show: false }))}
          />
        </div>
      )}

      <div>
        <Link
          href="/regionaladmin/events"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-brand-orange-700)] hover:underline"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke agenda event
        </Link>
      </div>

      {/* Card Detail Event & Kuota */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-2xs space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Aktif
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] text-gray-600">
                <DashboardIcon name="pin" size={13} />
                {eventData.location}
              </span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">{eventData.title}</h1>
            <p className="text-[12px] text-gray-400">
              {eventData.code} · {eventData.date} · {eventData.venue} · {eventData.timeout}
            </p>
          </div>
          <button
            onClick={() => router.push(`/regionaladmin/events/${eventId}`)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-brand-orange-500)]/70 px-4 py-1 text-[12px] font-semibold text-[var(--color-brand-orange-700)] hover:bg-orange-50 hover:-translate-y-0.5 transition cursor-pointer shrink-0 self-start md:self-auto"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Ubah kuota & timer
          </button>
        </div>

        {/* Status Kuota Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
          {quotaList.map((item) => {
            const remaining = item.total - item.sold;
            const percentage = Math.round((item.sold / item.total) * 100);
            const isFull = remaining <= 0;

            return (
              <div key={item.category} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{item.category}</span>
                  {isFull ? (
                    <span className="rounded-md bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-600">
                      Kuota penuh
                    </span>
                  ) : (
                    <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                      {remaining} slot tersisa
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500">
                  {item.sold} terjual dari {item.total} slot · {percentage}%
                </p>
                <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full ${isFull ? "bg-rose-500" : percentage > 80 ? "bg-amber-500" : "bg-emerald-500"}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabel Pendaftaran */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-2xs space-y-4">
        <div>
          <h2 className="text-[15px] font-bold text-gray-900">
            List pendaftaran dan status pembayaran
          </h2>
          <p className="text-[12px] text-gray-400 mt-1">
            Peserta otomatis masuk ke daftar ini begitu pendaftaran dan pembayaran selesai. Nomor batching hanya bisa diisi untuk peserta dengan pembayaran Completed; nomor meja mengikuti pengaturan benching.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                <th className="py-3 px-2">NO. REGISTRASI</th>
                <th className="py-3 px-2">PESERTA</th>
                <th className="py-3 px-2">KATEGORI KUOTA</th>
                <th className="py-3 px-2">DATA KUCING</th>
                <th className="py-3 px-2">PEMBAYARAN</th>
                <th className="py-3 px-2">MEJA</th>
                <th className="py-3 px-2 text-right">NOMOR BATCHING</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {registrations.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition">
                  <td className="py-4 px-2 font-medium text-gray-700">{item.regNo}</td>
                  <td className="py-4 px-2">
                    <p className="font-bold text-gray-900">{item.name}</p>
                    <p className="text-[11px] text-gray-400">{item.catteryOrRole}</p>
                  </td>
                  <td className="py-4 px-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-700">
                      <DashboardIcon name="user" size={12} />
                      {item.quotaCategory}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-gray-600">{item.catData}</td>
                  <td className="py-4 px-2">
                    <div>
                      {item.paymentStatus === "Completed" && (
                        <span className="inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                          Completed
                        </span>
                      )}
                      {item.paymentStatus === "Pending" && (
                        <span className="inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                          Pending
                        </span>
                      )}
                      {item.paymentStatus === "Expired" && (
                        <span className="inline-block rounded-md bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-600">
                          Expired
                        </span>
                      )}
                      <p className="text-[10px] text-gray-400 mt-0.5">{item.paymentNote}</p>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-gray-700">{item.tableNumber}</td>
                  <td className="py-4 px-2 text-right">
                    {item.paymentStatus === "Completed" ? (
                      <div className="flex items-center justify-end gap-2">
                        {item.batchNumber ? (
                          <>
                            <span className="rounded-md bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
                              {item.batchNumber}
                            </span>
                            <button
                              onClick={() => handleOpenBatchModal(item)}
                              className="rounded-md border border-orange-500/50 bg-white px-3 py-1 text-[11px] font-semibold text-[var(--color-brand-orange-700)] hover:bg-orange-50 transition hover:-translate-y-0.5 cursor-pointer"
                            >
                              Ubah
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleOpenBatchModal(item)}
                            className="rounded-md border border-orange-500/50 bg-white px-3 py-1 text-[11px] font-semibold text-[var(--color-brand-orange-700)] hover:bg-orange-50 transition hover:-translate-y-0.5 cursor-pointer"
                          >
                            Set nomor
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-[11px] text-gray-400">Menunggu pembayaran</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section Status Publikasi */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-2xs space-y-4">
        <div>
          <h2 className="text-[15px] font-bold text-gray-900">Status publikasi</h2>
          <p className="text-[12px] text-gray-400 mt-0.5">
            Saat dipublikasikan, link pendaftaran aktif dan notifikasi event terbaru dikirim ke semua user aplikasi.
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="font-semibold text-gray-800">Publikasikan event ini</p>
            <p className="text-[11px] text-gray-400">
              Draft: hanya terlihat admin ICA. Published: bisa diakses dan dibeli publik.
            </p>
          </div>

          <button
            onClick={handleTogglePublish}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isPublished ? "bg-orange-500" : "bg-gray-200"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                isPublished ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {isPublished ? (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/50 p-2 pl-4">
              <span className="text-[12px] text-gray-600 truncate">
                {publicEventUrl}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 rounded-full border border-orange-500 bg-white px-3 py-1.5 text-[11px] font-semibold text-orange-600 hover:bg-orange-50 transition cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy link
                </button>
                <button
                  onClick={() =>
                    setSelectedShareEvent({
                      id: eventData.id,
                      slug: eventData.slug,
                      title: eventData.title,
                      activePeriod: eventData.activePeriod,
                      shareUrl: publicEventUrl,
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#FFA066] to-[#EE6B28] px-3 py-1.5 text-[11px] font-bold text-white shadow-xs hover:brightness-105 transition cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share event
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-[12px] text-emerald-800">
              <svg className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>
                Notifikasi "Event terbaru: {eventData.title}" terkirim ke aplikasi Member dan Cattery. Kuota mulai dihitung sejak notifikasi terkirim.
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 text-[12px] text-amber-800">
            <svg className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>
              Event masih draft. Link share dan notifikasi aplikasi baru dibuat setelah event dipublikasikan.
            </span>
          </div>
        )}
      </div>

      {/* Modal Set/Edit Nomor Batching */}
      <SetBatchModal
        isOpen={isBatchModalOpen}
        data={selectedBatchData}
        onClose={() => setIsBatchModalOpen(false)}
        onSave={handleSaveBatchNumber}
      />

      {/* Modal Share Event */}
      <ShareEventModal
        event={selectedShareEvent}
        onClose={() => setSelectedShareEvent(null)}
        onShowToast={(title, message, options) =>
          showToast(title, message, options?.tone || "success")
        }
      />
    </div>
  );
}