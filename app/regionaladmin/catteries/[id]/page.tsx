"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { Edit2, XCircle, MapPin, ArrowLeft } from "lucide-react";

interface CatItem {
  id: string;
  name: string;
  breed: string;
  emsCode: string;
  score: number;
  pedigreeStatus: "Aktif" | "Nonaktif";
}

interface MatingReportItem {
  id: string;
  number: string;
  applicant: string;
  type: string;
  region: string;
  waitingTime: string;
  status: "Sedang direview" | "Baru" | "Disetujui" | "Ditolak";
}

interface CatteryDetailData {
  id: string;
  name: string;
  code: string;
  owner: string;
  registeredDate: string;
  status: "Aktif" | "Nonaktif";
  region: string;
  stats: {
    male: number;
    female: number;
    matingReports: number;
  };
  cats: CatItem[];
  matingReports: MatingReportItem[];
}

const catteryDataStore: Record<string, CatteryDetailData> = {
  "1": {
    id: "1",
    name: "Rumah Hana Cattery",
    code: "ICA-CTY-2024-0188",
    owner: "Hana Maheswari",
    registeredDate: "18 Mar 2024",
    status: "Aktif",
    region: "Bandung",
    stats: {
      male: 4,
      female: 7,
      matingReports: 7,
    },
    cats: [
      {
        id: "c1",
        name: "Bagas",
        breed: "Persian",
        emsCode: "PER n 22",
        score: 92,
        pedigreeStatus: "Aktif",
      },
      {
        id: "c2",
        name: "Nara",
        breed: "Persian",
        emsCode: "PER f 03",
        score: 88,
        pedigreeStatus: "Aktif",
      },
    ],
    matingReports: [
      {
        id: "mr1",
        number: "MR-2026-0142",
        applicant: "Rumah Hana Cattery",
        type: "Mating Report",
        region: "Bandung",
        waitingTime: "14 hari",
        status: "Sedang direview",
      },
      {
        id: "mr2",
        number: "MR-2026-0148",
        applicant: "Rumah Hana Cattery",
        type: "Mating Report",
        region: "Bandung",
        waitingTime: "3 hari",
        status: "Baru",
      },
      {
        id: "mr3",
        number: "MR-2026-0131",
        applicant: "Rumah Hana Cattery",
        type: "Mating Report",
        region: "Bandung",
        waitingTime: "selesai",
        status: "Disetujui",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Bandung Paws Cattery",
    code: "ICA-CTY-2023-0121",
    owner: "Reza Aditya",
    registeredDate: "12 Jan 2023",
    status: "Aktif",
    region: "Bandung",
    stats: {
      male: 3,
      female: 5,
      matingReports: 5,
    },
    cats: [
      {
        id: "c3",
        name: "Kimo",
        breed: "Exotic Shorthair",
        emsCode: "EXO n 24",
        score: 90,
        pedigreeStatus: "Aktif",
      },
      {
        id: "c4",
        name: "Sasa",
        breed: "Maine Coon",
        emsCode: "MCO ns 22",
        score: 85,
        pedigreeStatus: "Aktif",
      },
    ],
    matingReports: [],
  },
};

// Custom Toast Component persis desain yang kamu punya
function CustomToast({
  title,
  message,
  duration = 4000,
  onClose,
}: {
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const intervalTime = 20;
    const step = (intervalTime / duration) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.max(prev - step, 0));
    }, intervalTime);

    const closeTimer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <div className="relative w-[340px] overflow-hidden rounded-md border-l-4 border-[#2D8A53] bg-white py-3 pl-4 pr-8 shadow-lg animate-in fade-in slide-in-from-top-2">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-2 top-2 cursor-pointer rounded-full p-1 text-[#8C8074] transition-colors hover:bg-black/5 hover:text-[#1A1513]"
        aria-label="Tutup"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2D8A53]">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>

        <div className="min-w-0 flex-1 space-y-0.5 pt-0.5">
          <h4 className="text-[12px] font-bold leading-snug text-[#1A1513]">{title}</h4>
          <p className="text-[11px] leading-snug text-[#7E7267]">{message}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8F5E9]">
        <div
          className="h-full bg-[#2D8A53] transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

type PendingActionType = "none" | "change_code" | "deactivate";

export default function CatteryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const catteryId = resolvedParams.id;

  const cattery = catteryDataStore[catteryId] || catteryDataStore["1"];

  const [toastData, setToastData] = useState<{ title: string; message: string } | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingActionType>("none");

  const handleRequestChangeCode = () => {
    setPendingAction("change_code");
    setToastData({
      title: `Pengajuan ubah kode ${cattery.name} dikirim.`,
      message: "Diteruskan ke Super Admin dan tercatat di riwayat cattery.",
    });
  };

  const handleRequestDeactivate = () => {
    setPendingAction("deactivate");
    setToastData({
      title: `Pengajuan nonaktifkan ${cattery.name} dikirim.`,
      message: "Diteruskan ke Super Admin dan tercatat di riwayat cattery.",
    });
  };

  const handleCancelRequest = () => {
    setPendingAction("none");
    setToastData({
      title: `Pengajuan ${cattery.name} dibatalkan.`,
      message: "Pengajuan berhasil dibatalkan sebelum diputus pusat.",
    });
  };

  return (
    <div className="relative space-y-4 text-[#333333]">
      {/* Toast Notification Custom Posisi Kanan Atas */}
      {toastData && (
        <div className="fixed top-20 right-5 z-50">
          <CustomToast
            title={toastData.title}
            message={toastData.message}
            onClose={() => setToastData(null)}
          />
        </div>
      )}

      {/* Back Link */}
      <div>
        <Link
          href="/regionaladmin/catteries"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#E06D20] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Cattery List
        </Link>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold text-gray-900">{cattery.name}</h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F8F0] text-[#12B76A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>
              {cattery.status}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
              <MapPin className="w-3 h-3 text-gray-400" />
              {cattery.region}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {cattery.code} · pemilik {cattery.owner} · terdaftar {cattery.registeredDate}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-6 border-l border-gray-100 pl-6 self-stretch md:self-auto justify-around">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Male</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{cattery.stats.male}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Female</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{cattery.stats.female}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Mating report</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{cattery.stats.matingReports}</p>
          </div>
        </div>
      </div>

      {/* Administrative Actions Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Tindakan administratif</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Nonaktifkan cattery dan ubah kode cattery menyentuh data resmi FIFe, jadi pengajuan Anda dikonfirmasi admin pusat dulu sebelum berlaku.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {pendingAction === "none" ? (
            <>
              {/* Button Ajukan Ubah Kode */}
              <button
                onClick={handleRequestChangeCode}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E06D20] text-[#E06D20] hover:bg-[#FFF8F0] text-xs font-semibold transition-all hover:-translate-y-1 transform duration-200 cursor-pointer shadow-xs"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Ajukan ubah kode cattery
              </button>

              {/* Button Ajukan Nonaktifkan */}
              <button
                onClick={handleRequestDeactivate}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E06D20] text-[#E06D20] hover:bg-[#FFF8F0] text-xs font-semibold transition-all hover:-translate-y-1 transform duration-200 cursor-pointer shadow-xs"
              >
                <XCircle className="w-3.5 h-3.5" />
                Ajukan nonaktifkan cattery
              </button>
            </>
          ) : (
            <>
              {/* Status Badge */}
              <span className="px-3.5 py-2 rounded-full bg-[#FFF8F0] text-[#E06D20] text-xs font-medium border border-[#FBE3D0]">
                Menunggu konfirmasi pusat · {pendingAction === "change_code" ? "ubah kode" : "nonaktifkan"}
              </span>

              {/* Button Batalkan Pengajuan */}
              <button
                onClick={handleCancelRequest}
                className="px-3.5 py-2 rounded-full border border-[#E06D20] text-[#E06D20] hover:bg-[#FFF8F0] text-xs font-semibold transition-all hover:-translate-y-1 transform duration-200 cursor-pointer shadow-xs"
              >
                Batalkan pengajuan
              </button>
            </>
          )}
        </div>
      </div>

      {/* Cats List Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-900">Kucing di cattery ini</h3>
          <span className="text-xs text-gray-400">Read-only · skor diisi admin pusat</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-t border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-3 font-semibold">KUCING</th>
                <th className="py-3 px-3 font-semibold">EMS CODE</th>
                <th className="py-3 px-3 font-semibold text-center">SKOR</th>
                <th className="py-3 px-3 font-semibold">PEDIGREE</th>
              </tr>
            </thead>
            <tbody>
              {cattery.cats.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"
                >
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-gray-900">{cat.name}</div>
                    <div className="text-[11px] text-gray-400">{cat.breed}</div>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-gray-800">
                    {cat.emsCode}
                  </td>
                  <td className="py-3.5 px-3 text-center font-semibold text-gray-800">
                    {cat.score}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F8F0] text-[#12B76A]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>
                      {cat.pedigreeStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mating Reports Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-4">
          Mating report dari cattery ini
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-t border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-3 font-semibold">NOMOR</th>
                <th className="py-3 px-3 font-semibold">PEMOHON</th>
                <th className="py-3 px-3 font-semibold">WILAYAH</th>
                <th className="py-3 px-3 font-semibold">MENUNGGU</th>
                <th className="py-3 px-3 font-semibold">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cattery.matingReports.length > 0 ? (
                cattery.matingReports.map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-gray-50/70 transition-colors border-b border-gray-100"
                  >
                    <td className="py-3.5 px-3 font-medium text-gray-800">
                      {report.number}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-gray-900">
                        {report.applicant}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {report.type}
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {report.region}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-gray-700 font-medium">
                      {report.waitingTime}
                    </td>
                    <td className="py-3.5 px-3">
                      {report.status === "Sedang direview" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F0F7FF] text-[#2B7FFF]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2B7FFF]"></span>
                          {report.status}
                        </span>
                      )}
                      {report.status === "Baru" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                          {report.status}
                        </span>
                      )}
                      {report.status === "Disetujui" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F8F0] text-[#12B76A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>
                          {report.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-gray-400 text-xs"
                  >
                    Belum ada mating report dari cattery ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}