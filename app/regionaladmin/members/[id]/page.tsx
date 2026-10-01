"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, CreditCard } from "lucide-react";
import DashboardIcon from "@/components/anggota/DashboardIcon";
import Toast from "@/components/Toast";
import { activeMembersList } from "@/data/regionalAdmin";

// Antarmuka tambahan untuk mengatasi TypeScript error pada properti tambahan
interface MemberWithDetails {
  id: string | number;
  name: string;
  memberCode: string;
  email: string;
  region: string;
  catteryName: string;
  status: string;
  joinDate?: string;
  expiryDate?: string;
  initials?: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MemberDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const memberId = resolvedParams.id;

  // Pencarian member dengan Type Assertion
  const foundMember = activeMembersList.find(
    (m) => String(m.id) === String(memberId)
  ) as MemberWithDetails | undefined;

  const member: MemberWithDetails = foundMember || {
    id: memberId,
    name: "Hana Maheswari",
    memberCode: "ICA-2024-0871",
    email: "hana@rumahhana.id",
    region: "Bandung",
    catteryName: "Rumah Hana Cattery",
    status: "Aktif",
    joinDate: "12 Feb 2024",
    expiryDate: "31 Des 2026",
    initials: "HM",
  };

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

  const [expiryDate, setExpiryDate] = useState(
    member.expiryDate || "31 Des 2026"
  );

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

  const handlePerpanjang = () => {
    setExpiryDate("31 Des 2027");
    showToast(
      "Keanggotaan diperpanjang",
      `Masa berlaku keanggotaan ${member.name} diperpanjang sampai 31 Des 2027. Tercatat di riwayat member.`,
      "success"
    );
  };

  const handleTerbitkanKartu = () => {
    showToast(
      "Kartu Diterbitkan",
      "Kartu anggota digital dibuat ulang dan siap diunduh.",
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

      {/* Tombol Kembali */}
      <div className="mb-4">
        <Link
          href="/regionaladmin/members"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E06D20] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Member List
        </Link>
      </div>

      {/* Grid Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Profil Member Card */}
        <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm h-fit space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FFF3E8] text-[#E06D20] font-bold text-base flex items-center justify-center shrink-0">
              {member.initials || member.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                {member.name}
              </h2>
              <p className="text-xs text-gray-400">{member.memberCode}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F8F0] text-[#12B76A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>
              {member.status}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
              <DashboardIcon name="pin" size={12} /> {member.region}
            </span>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-gray-600">
              <span className="text-gray-400">Bergabung</span>
              <span className="font-semibold text-gray-800">
                {member.joinDate || "12 Feb 2024"}
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span className="text-gray-400">Berlaku s.d.</span>
              <span className="font-semibold text-gray-800">{expiryDate}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span className="text-gray-400">Email</span>
              <span className="font-semibold text-gray-800">
                {member.email}
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span className="text-gray-400">Cattery</span>
              <span className="font-semibold text-gray-800">
                {member.catteryName}
              </span>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-2 pt-1">
            <button
              onClick={handlePerpanjang}
              className="w-[250px] flex items-center justify-center gap-2 border border-[#E06D20] text-[var(--color-brand-orange-700)] hover:bg-[#FFF8F0] px-4 py-2 rounded-full text-xs font-semibold transition-all hover:-translate-y-1 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              Perpanjang keanggotaan
            </button>
            <button
              onClick={handleTerbitkanKartu}
              className="w-[200px] flex items-center justify-center gap-2 border border-[#E06D20] text-[var(--color-brand-orange-700)] hover:bg-[#FFF8F0] px-4 py-2 rounded-full text-xs font-semibold transition-all hover:-translate-y-1 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Terbitkan ulang kartu
            </button>
          </div>
        </div>

        {/* Detail Kucing & Riwayat Pembayaran */}
        <div className="lg:col-span-7 space-y-5">
          {/* Card Kucing */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4">
              Kucing terdaftar
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3 font-semibold">KUCING</th>
                    <th className="py-2.5 px-3 font-semibold">EMS CODE</th>
                    <th className="py-2.5 px-3 font-semibold text-center">
                      SKOR
                    </th>
                    <th className="py-2.5 px-3 font-semibold">PEDIGREE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-gray-900">Bagas</div>
                      <div className="text-[11px] text-gray-400">Persian</div>
                    </td>
                    <td className="py-3 px-3 text-gray-700 font-medium">
                      PER n 22
                    </td>
                    <td className="py-3 px-3 text-center text-gray-700 font-medium">
                      92
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F8F0] text-[#12B76A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>
                        Aktif
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-gray-900">Nara</div>
                      <div className="text-[11px] text-gray-400">Persian</div>
                    </td>
                    <td className="py-3 px-3 text-gray-700 font-medium">
                      PER f 03
                    </td>
                    <td className="py-3 px-3 text-center text-gray-700 font-medium">
                      88
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F8F0] text-[#12B76A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>
                        Aktif
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Card Pembayaran */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4">
              Riwayat pembayaran
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3 font-semibold">INVOICE</th>
                    <th className="py-2.5 px-3 font-semibold">JENIS</th>
                    <th className="py-2.5 px-3 font-semibold text-right">
                      JUMLAH
                    </th>
                    <th className="py-2.5 px-3 font-semibold text-center">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-3 font-medium text-gray-800">
                      INV-2026-1841
                    </td>
                    <td className="py-3 px-3 text-gray-700">
                      Iuran tahunan 2026
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-gray-900">
                      Rp 350.000
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F8F0] text-[#12B76A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>
                        Disetujui
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}