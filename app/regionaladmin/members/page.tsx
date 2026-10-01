"use client";

import React, { useState } from "react";
import {
  User,
  Clock,
  FilePlus,
  Download,
  Info,
  ShieldCheck,
  Check,
  FileText,
  X,
} from "lucide-react";
import {
  memberStats,
  activeMembersList,
  newMemberRequests,
} from "@/data/regionalAdmin";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import Toast from "@/components/Toast";
import { useRouter } from "next/navigation";

export default function MembersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"list" | "requests">("list");

  // State untuk Toast Notification
  const [toastConfig, setToastConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    tone: "success" | "error" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    tone: "success",
  });

  const showToast = (
    title: string,
    message: string,
    tone: "success" | "error" | "info" = "success"
  ) => {
    setToastConfig({
      isOpen: true,
      title,
      message,
      tone,
    });
  };

  const handleCloseToast = () => {
    setToastConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // FITUR EKSPOR CSV
  const handleExportCSV = () => {
    const headers = [
      "No Anggota",
      "Nama",
      "Email",
      "Wilayah",
      "Cattery",
      "Kucing",
      "Status",
    ];

    const rows = activeMembersList.map((m) => [
      `"${m.memberCode}"`,
      `"${m.name}"`,
      `"${m.email}"`,
      `"${m.region}"`,
      `"${m.catteryName}"`,
      m.catsCount,
      `"${m.status}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Daftar_Member_ICA_Bandung_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(
      "Ekspor Berhasil",
      "Data member wilayah Bandung berhasil diunduh.",
      "success"
    );
  };

  // Handler Aksi Request Member Baru
  const handleApprove = (name: string) => {
    showToast(
      "Pengajuan Disetujui",
      `Keanggotaan ${name} berhasil disetujui dan dinotifikasikan ke Super Admin.`,
      "success"
    );
  };

  const handleRevision = (name: string) => {
    showToast(
      "Minta Revisi",
      `Permintaan revisi berkas telah dikirimkan ke pemohon ${name}.`,
      "success"
    );
  };

  const handleReject = (name: string) => {
    showToast(
      "Pengajuan Ditolak",
      `Pengajuan keanggotaan atas nama ${name} telah ditolak.`,
      "success"
    );
  };

  return (
    <div className="relative min-h-screen text-[#333333]">
      {/* Toast Container */}
      {toastConfig.isOpen && (
        <div className="fixed top-20 right-5 z-50">
          <Toast
            title={toastConfig.title}
            message={toastConfig.message}
            tone={toastConfig.tone}
            onClose={handleCloseToast}
          />
        </div>
      )}

      {/* Header Navigation / Tab Buttons */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "list"
              ? "bg-[#FFF8F0] text-[#E06D20] border border-[#F5C29B]"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          List Member
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === "requests"
              ? "bg-[#FFF8F0] text-[#E06D20] border border-[#F5C29B]"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          <FilePlus className="w-3.5 h-3.5 text-[#E06D20]" />
          New Request Member ({memberStats.pendingRequests})
        </button>
      </div>

      {/* TAB 1: LIST MEMBER */}
      {activeTab === "list" && (
        <div className="space-y-4">
          {/* Info Banner */}
          <div className="bg-[#FAF7F2] border border-[#EDE7DE] rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 text-xs text-gray-700">
            <Info className="w-4 h-4 text-gray-400 shrink-0" />
            <span>
              Data dibatasi ke wilayah <strong>Bandung</strong>. Member dan
              cattery wilayah lain tidak muncul di modul ini.
            </span>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white border border-gray-100 rounded-xl p-3.5 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  MEMBER AKTIF
                </span>
                <div className="p-1.5 bg-[#FFF8F0] rounded-md">
                  <User className="w-4 h-4 text-[#E06D20]" />
                </div>
              </div>
              <div className="mt-1">
                <span className="text-2xl font-bold text-gray-900">
                  {memberStats.activeMembers}
                </span>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Terdaftar di wilayah Bandung
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-3.5 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  KEDALUWARSA
                </span>
                <div className="p-1.5 bg-gray-50 rounded-md">
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="mt-1">
                <span className="text-2xl font-bold text-gray-900">
                  {memberStats.expiredMembers}
                </span>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Iuran belum diperbarui
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-3.5 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  REQUEST BARU
                </span>
                <div className="p-1.5 bg-[#F0F7FF] rounded-md">
                  <FilePlus className="w-4 h-4 text-[#2B7FFF]" />
                </div>
              </div>
              <div className="mt-1">
                <span className="text-2xl font-bold text-gray-900">
                  {memberStats.pendingRequests}
                </span>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Menunggu approval Anda
                </p>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 border-b border-[var(--color-ink-100)] pb-3 px-4">
              <h2 className="text-base font-bold text-gray-900 pt-1">Daftar member</h2>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  disabled
                  value="Bandung"
                  className="bg-gray-100 border border-gray-200 text-gray-500 text-xs rounded-full px-3 py-1 outline-none cursor-not-allowed opacity-80"
                >
                  <option value="Bandung">Bandung</option>
                </select>

                <button
                  onClick={handleExportCSV}
                  className="flex cursor-pointer items-center gap-1.5 border border-[#E06D20] text-[#E06D20] hover:bg-[#FFF8F0] px-3.5 py-1 rounded-full text-xs font-semibold transition-all hover:-translate-y-0.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Ekspor CSV
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs -mt-3">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3 font-semibold">NO. ANGGOTA</th>
                    <th className="py-2.5 px-3 font-semibold">NAMA</th>
                    <th className="py-2.5 px-3 font-semibold">WILAYAH</th>
                    <th className="py-2.5 px-3 font-semibold">CATTERY</th>
                    <th className="py-2.5 px-3 font-semibold text-center">
                      KUCING
                    </th>
                    <th className="py-2.5 px-3 font-semibold">KEANGGOTAAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {activeMembersList.map((member) => (
                    <tr
                      key={member.id}
                      onClick={() =>
                        router.push(`/regionaladmin/members/${member.id}`)
                      }
                      className="hover:bg-[#FFF8F0] cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-3 font-medium text-gray-800">
                        {member.memberCode}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-gray-900">
                          {member.name}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {member.email}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          <DashboardIcon name="pin" size={12} /> {member.region}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-800">
                        {member.catteryName}
                      </td>
                      <td className="py-3 px-3 text-center font-medium text-gray-700">
                        {member.catsCount}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F8F0] text-[#12B76A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NEW REQUEST MEMBER */}
      {activeTab === "requests" && (
        <div className="space-y-4">
          <div className="bg-[#EDF5FF] border border-[#D0E2FF] rounded-xl px-3.5 py-2.5 flex items-center gap-2 text-xs text-[#1D4ED8]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              Approval keanggotaan baru di wilayah Bandung final di tangan Anda.
              Hasilnya dikirim ke pemohon dan diteruskan sebagai notifikasi ke
              Super Admin.
            </span>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold text-gray-900">
                Pengajuan keanggotaan baru
              </h2>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFF8F0] text-[#E06D20] border border-[#F5C29B]">
                {newMemberRequests.length} menunggu approval
              </span>
            </div>

            <div className="space-y-2">
              {newMemberRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-gray-200 transition-all bg-white gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FFF3E8] text-[#E06D20] font-bold text-xs flex items-center justify-center shrink-0">
                      {request.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">
                        {request.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {request.region} · diajukan {request.submissionDate} ·{" "}
                        <span className="text-gray-600">{request.notes}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <button
                      onClick={() => handleApprove(request.name)}
                      className="flex items-center gap-1 border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-4 py-1.5 rounded-full text-[12px] font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] hover:from-[#EE6B28] hover:to-[#C8601D] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Setujui
                    </button>
                    <button
                      onClick={() => handleRevision(request.name)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#E06D20] text-[#E06D20] hover:bg-[#FFF8F0] text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Minta revisi
                    </button>
                    <button
                      onClick={() => handleReject(request.name)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5 text-gray-400" />
                      Tolak
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}