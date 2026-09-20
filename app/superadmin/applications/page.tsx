"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Toast, { ToastTone } from "@/components/Toast"; // Sesuaikan jalur import Toast kamu

interface ApplicationItem {
  id: string;
  applicant: string;
  type: string;
  region: string;
  waitTime: string;
  status: "Sedang direview" | "Perlu revisi" | "Baru" | "Disetujui" | "Ditolak";
  submittedAt: string;
}

const mockApplications: ApplicationItem[] = [
  { id: "MR-2026-0142", applicant: "Rumah Hana Cattery", type: "Mating Report", region: "Bandung", waitTime: "14 hari", status: "Sedang direview", submittedAt: "21 Agu 2026" },
  { id: "CTY-2026-0071", applicant: "Dimas Prayoga", type: "Pendaftaran Cattery", region: "Jakarta", waitTime: "12 hari", status: "Perlu revisi", submittedAt: "23 Agu 2026" },
  { id: "MR-2026-0144", applicant: "Bandung Paws Cattery", type: "Mating Report", region: "Bandung", waitTime: "9 hari", status: "Baru", submittedAt: "26 Agu 2026" },
  { id: "MB-2026-0388", applicant: "Ayu Kartika", type: "Pendaftaran Member", region: "Surabaya", waitTime: "7 hari", status: "Baru", submittedAt: "28 Agu 2026" },
  { id: "MR-2026-0147", applicant: "Sumatra Cats", type: "Mating Report", region: "Medan", waitTime: "5 hari", status: "Sedang direview", submittedAt: "30 Agu 2026" },
  { id: "MR-2026-0148", applicant: "Rumah Hana Cattery", type: "Mating Report", region: "Bandung", waitTime: "3 hari", status: "Baru", submittedAt: "1 Sep 2026" },
  { id: "CTY-2026-0074", applicant: "Nadia Puspa", type: "Pendaftaran Cattery", region: "Jakarta", waitTime: "2 hari", status: "Baru", submittedAt: "2 Sep 2026" },
  { id: "MR-2026-0139", applicant: "Jogja Ras Cattery", type: "Mating Report", region: "Surabaya", waitTime: "17 hari", status: "Disetujui", submittedAt: "18 Agu 2026" },
];

function ApplicationsQueueContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState("Semua");
  const [selectedRegion, setSelectedRegion] = useState("Semua wilayah");
  
  const [toastData, setToastData] = useState<{
    title: string;
    message: string;
    tone: ToastTone;
  } | null>(null);

  useEffect(() => {
  const title = searchParams.get("toastTitle");
  const message = searchParams.get("toastMessage") || ""; // Default ke string kosong jika tidak ada subtitle
  const tone = (searchParams.get("toastTone") as ToastTone) || "success";

  if (title) {
    setToastData({ title, message, tone });

    const params = new URLSearchParams(searchParams.toString());
    params.delete("toastTitle");
    params.delete("toastMessage");
    params.delete("toastTone");
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  }
}, [searchParams, router, pathname]);

  const getStatusBadge = (status: ApplicationItem["status"]) => {
    switch (status) {
      case "Sedang direview":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-200"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Sedang direview</span>;
      case "Perlu revisi":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Perlu revisi</span>;
      case "Baru":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-300"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>Baru</span>;
      case "Disetujui":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Disetujui</span>;
      case "Ditolak":
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Ditolak</span>;
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification Container */}
      {toastData && (
        <div className="fixed top-6 right-6 z-50">
          <Toast
            title={toastData.title}
            message={toastData.message}
            tone={toastData.tone}
            onClose={() => setToastData(null)}
          />
        </div>
      )}

      {/* Filter Tabs & Region Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#EFE9E1]">
        <div className="flex flex-wrap gap-1.5 text-xs font-medium">
          {[
            { label: "Semua", count: 61 },
            { label: "Baru", count: 12 },
            { label: "Sedang direview", count: 7 },
            { label: "Perlu revisi", count: 4 },
            { label: "Disetujui", count: 36 },
            { label: "Ditolak", count: 2 },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === tab.label
                  ? "bg-[#FFF2E8] text-[#EE6B28] font-bold border border-[#FFDFC8]"
                  : "text-[#7A6E65] hover:bg-[#FAF8F5]"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="text-xs border border-[#EFE9E1] rounded-xl px-3 py-1.5 bg-white text-[#231A14] focus:outline-none"
        >
          <option>Semua wilayah</option>
          <option>Bandung</option>
          <option>Jakarta</option>
          <option>Surabaya</option>
          <option>Medan</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-[#EFE9E1] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] border-b border-[#EFE9E1] text-[#8C8078] uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-3.5 pl-4">Nomor</th>
                <th className="p-3.5">Pemohon</th>
                <th className="p-3.5">Wilayah</th>
                <th className="p-3.5">Menunggu</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Dikirim</th>
                <th className="p-3.5 pr-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE9E1] text-[#231A14]">
              {mockApplications.map((item) => (
                <tr key={item.id} className="hover:bg-[#FFF6EC]/40 transition">
                  <td className="p-3.5 pl-4 font-mono font-semibold text-[#5A4F48]">{item.id}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-[#231A14]">{item.applicant}</div>
                    <div className="text-[10px] text-[#8C8078]">{item.type}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 text-[11px] bg-[#FAF8F5] border border-[#EFE9E1] text-[#5A4F48] px-2 py-0.5 rounded-lg">
                      📍 {item.region}
                    </span>
                  </td>
                  <td className="p-3.5 font-medium text-[#5A4F48]">{item.waitTime}</td>
                  <td className="p-3.5">{getStatusBadge(item.status)}</td>
                  <td className="p-3.5 text-[#8C8078]">{item.submittedAt}</td>
                  <td className="p-3.5 pr-4 text-right">
                    <Link
                      href={`/superadmin/applications/${item.id}`}
                      className="font-bold text-[#EE6B28] hover:underline hover:text-[#D95A19]"
                    >
                      Review &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-[#EFE9E1] gap-3 text-xs text-[#8C8078]">
          <div>Menampilkan 8 dari 61 aplikasi - halaman 1 dari 8</div>
          <div className="flex items-center gap-2">
            <span>Baris per halaman</span>
            <select className="border border-[#EFE9E1] rounded-lg px-2 py-1 bg-white text-[#231A14]">
              <option>8</option>
              <option>16</option>
              <option>32</option>
            </select>
            <button className="px-3 py-1 border border-[#EFE9E1] rounded-lg bg-[#FAF8F5] text-[#A89F95] cursor-not-allowed" disabled>
              Sebelumnya
            </button>
            <button className="px-3 py-1 border border-[#EE6B28] rounded-lg bg-[#FFF2E8] text-[#EE6B28] font-bold hover:bg-[#EE6B28] hover:text-white transition">
              Berikutnya &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Information Banner */}
      <div className="flex items-start gap-2.5 p-3.5 bg-amber-50/60 border border-amber-200/60 rounded-xl text-xs text-amber-800">
        <span>ℹ️</span>
        <p>Filter wilayah aktif penuh untuk Super Admin. Untuk akun Regional Admin nanti, filter ini terkunci pada wilayah yang di-assign supaya jelas kenapa datanya terbatas.</p>
      </div>
    </div>
  );
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-[#8C8078]">Memuat antrean...</div>}>
      <ApplicationsQueueContent />
    </Suspense>
  );
}