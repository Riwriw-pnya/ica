"use client";

import React, { useState } from "react";
import { Plus, AlertTriangle, ShieldCheck, MapPin, Circle, CheckCircle2, X } from "lucide-react";
import { AdminAccount } from "@/types/roles";
import AddAdminModal from "./AddAdminModal";

const initialAdminAccounts: AdminAccount[] = [
  {
    id: "1",
    name: "Rina Nurhayati",
    email: "rina@ica.or.id",
    role: "Super Admin",
    region: "Semua wilayah",
    modulePermissions: "Akses penuh",
    status: "Aktif",
  },
  {
    id: "2",
    name: "Dewi Larasati",
    email: "dewi@ica.or.id",
    role: "Regional Admin",
    region: "Bandung",
    modulePermissions: "4 dari 5 modul",
    status: "Belum dipakai",
  },
  {
    id: "3",
    name: "Fajar Ramadhan",
    email: "fajar@ica.or.id",
    role: "Regional Admin",
    region: "Jakarta",
    modulePermissions: "3 dari 5 modul",
    status: "Belum dipakai",
  },
  {
    id: "4",
    name: "Sinta Halim",
    email: "sinta@ica.or.id",
    role: "Super Admin",
    region: "Semua wilayah",
    modulePermissions: "Akses penuh",
    status: "Aktif",
  },
];

export default function AdminRolesSection() {
  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>(initialAdminAccounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSaveAdmin = (newAdminData: {
    name: string;
    email: string;
    role: "Super Admin" | "Regional Admin";
    region: string;
    modulePermissions: string;
  }) => {
    const newAccount: AdminAccount = {
      id: Date.now().toString(),
      ...newAdminData,
      status: "Belum dipakai",
    };

    setAdminAccounts((prev) => [...prev, newAccount]);

    // Tampilkan Toast Success
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="space-y-4 w-full font-sans relative">
      {/* Toast Notification (Sesuai Gambar 3) */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-white border border-[#EFECE6] border-l-4 border-l-emerald-500 rounded-xl px-4 py-3 shadow-xl animate-in slide-in-from-top-2 duration-200 max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs font-semibold text-[#231A14] leading-tight">
            Akun admin disimpan. Belum aktif untuk approval.
          </p>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="text-[#8C7A6B] hover:text-[#231A14] p-0.5 rounded-lg transition ml-auto cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Card & Actions */}
      <div className="bg-white border border-[#EFECE6] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-[#231A14]">Akun & role admin</h2>
          <p className="text-xs text-[#8C7A6B]">
            Akun internal ICA beserta wilayah dan izin aksesnya.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-b from-[#FF9A56] to-[#EE6B28] text-white text-xs font-bold shadow-md hover:brightness-105 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          Tambah akun admin
        </button>
      </div>

      {/* Warning Box Info */}
      <div className="bg-[#FAF5EF] border border-[#F2E5D5] rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#C8601D] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs leading-relaxed">
          <h3 className="font-bold text-[#4A321E]">
            Struktur disiapkan, behavior belum aktif
          </h3>
          <p className="text-[#7A6452]">
            Akun Regional Admin dapat dibuat dan izinnya diatur di sini, tetapi belum dipakai untuk approval. Sampai portal Regional Admin dibuka, semua approval aplikasi ditangani Super Admin.
          </p>
        </div>
      </div>

      {/* Tabel Data Admin */}
      <div className="bg-white border border-[#EFECE6] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EFECE6] bg-white text-[#8C7A6B] font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-5">NAMA</th>
                <th className="py-3.5 px-4">ROLE</th>
                <th className="py-3.5 px-4">WILAYAH</th>
                <th className="py-3.5 px-4">IZIN MODUL</th>
                <th className="py-3.5 px-5">AKUN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6]">
              {adminAccounts.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAFAF7]/60 transition-colors">
                  {/* Nama & Email */}
                  <td className="py-4 px-5">
                    <p className="font-bold text-[#231A14]">{item.name}</p>
                    <p className="text-[11px] text-[#8C7A6B]">{item.email}</p>
                  </td>

                  {/* Badge Role */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF5EE] border border-[#FFD8C2] text-[#EE6B28] text-[11px] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {item.role}
                    </span>
                  </td>

                  {/* Badge Wilayah */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EFECE6] text-[#52453A] text-[11px] font-medium">
                      <MapPin className="w-3 h-3 text-[#8C7A6B]" />
                      {item.region}
                    </span>
                  </td>

                  {/* Permisi Modul */}
                  <td className="py-4 px-4 text-[#231A14] font-medium">
                    {item.modulePermissions}
                  </td>

                  {/* Badge Status Akun */}
                  <td className="py-4 px-5">
                    {item.status === "Aktif" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] font-semibold">
                        <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EFECE6] text-[#7A6E65] text-[11px] font-medium">
                        <Circle className="w-2 h-2 text-[#A8988B]" />
                        Belum dipakai
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Admin */}
      <AddAdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAdmin}
      />
    </div>
  );
}