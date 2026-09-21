"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (adminData: {
    name: string;
    email: string;
    role: "Super Admin" | "Regional Admin";
    region: string;
    modulePermissions: string;
  }) => void;
}

interface ModulePermission {
  id: string;
  name: string;
  read: boolean;
  process: boolean;
  approve: boolean;
}

const initialModules: ModulePermission[] = [
  { id: "apps", name: "Applications", read: true, process: true, approve: false },
  { id: "members", name: "Members & Catteries", read: true, process: false, approve: false },
  { id: "payments", name: "Payments", read: true, process: false, approve: false },
  { id: "content", name: "Content (News, Store, Events)", read: true, process: false, approve: false },
  { id: "leaderboard", name: "Leaderboard & skor kesehatan", read: true, process: false, approve: false },
];

export default function AddAdminModal({
  isOpen,
  onClose,
  onSave,
}: AddAdminModalProps) {
  const [fullName, setFullName] = useState("Dewi Larasati");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"Regional Admin" | "Super Admin">("Regional Admin");
  const [region, setRegion] = useState("");
  const [modules, setModules] = useState<ModulePermission[]>(initialModules);

  if (!isOpen) return null;

  const handlePermissionChange = (
    id: string,
    field: "read" | "process" | "approve"
  ) => {
    setModules((prev) =>
      prev.map((mod) =>
        mod.id === id ? { ...mod, [field]: !mod[field] } : mod
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Hitung jumlah modul yang diberi izin (minimal read/process/approve)
    const activeModulesCount = modules.filter(
      (m) => m.read || m.process || m.approve
    ).length;

    const modulePermissionText =
      role === "Super Admin"
        ? "Akses penuh"
        : `${activeModulesCount} dari ${modules.length} modul`;

    onSave({
      name: fullName || "Admin Baru",
      email: email || "admin@ica.or.id",
      role,
      region: role === "Super Admin" ? "Semua wilayah" : region || "Bandung",
      modulePermissions: modulePermissionText,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#EFECE6] rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header Modal */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#231A14]">
              Tambah akun admin
            </h3>
            <p className="text-xs text-[#8C7A6B] leading-relaxed">
              Akun Regional Admin tersimpan beserta izinnya, tetapi belum dipakai untuk approval sampai portal Regional Admin dibuka.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8C7A6B] hover:text-[#231A14] transition cursor-pointer p-1 rounded-lg hover:bg-[#FAF8F5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Form Input Row 1: Nama & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#231A14]">
                Nama lengkap <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nama lengkap"
                required
                className="w-full bg-white border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-3.5 py-2.5 outline-none focus:border-[#EE6B28] transition placeholder:text-[#B5A89E]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#231A14]">
                Email <span className="text-amber-600">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@ica.or.id"
                required
                className="w-full bg-white border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-3.5 py-2.5 outline-none focus:border-[#EE6B28] transition placeholder:text-[#B5A89E]"
              />
            </div>
          </div>

          {/* Form Input Row 2: Role & Wilayah */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#231A14]">Role</label>
              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "Regional Admin" | "Super Admin")
                }
                className="w-full bg-white border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-3.5 py-2.5 outline-none focus:border-[#EE6B28] transition cursor-pointer"
              >
                <option value="Regional Admin">Regional Admin</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#231A14]">
                Wilayah yang di-assign
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                disabled={role === "Super Admin"}
                className="w-full bg-white border border-[#EFECE6] text-[#231A14] text-xs font-medium rounded-xl px-3.5 py-2.5 outline-none focus:border-[#EE6B28] transition cursor-pointer disabled:bg-[#FAF8F5] disabled:text-[#A8988B]"
              >
                <option value="">Pilih wilayah</option>
                <option value="Bandung">Bandung</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Medan">Medan</option>
                <option value="Surabaya">Surabaya</option>
              </select>
              <p className="text-[11px] text-[#8C7A6B]">
                Hanya untuk Regional Admin.
              </p>
            </div>
          </div>

          {/* Card Matriks Izin Akses Per Modul */}
          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-2xl p-4 space-y-3">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-[#231A14]">
                Izin akses per modul
              </h4>
              <p className="text-[11px] text-[#8C7A6B]">
                Izin berlaku hanya untuk wilayah yang di-assign — mis. dapat melihat aplikasi Bandung, tidak dapat melihat aplikasi Jakarta.
              </p>
            </div>

            {/* Tabel Matriks Checkbox */}
            <div className="bg-white border border-[#EFECE6] rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EFECE6] text-[#8C7A6B] font-semibold text-[11px]">
                    <th className="py-2.5 px-4 font-normal">Modul</th>
                    <th className="py-2.5 px-3 text-center font-normal w-20">Lihat</th>
                    <th className="py-2.5 px-3 text-center font-normal w-20">Proses</th>
                    <th className="py-2.5 px-3 text-center font-normal w-20">Setujui</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6]">
                  {modules.map((mod) => (
                    <tr key={mod.id} className="hover:bg-[#FAFAF7]/50 transition-colors">
                      <td className="py-2.5 px-4 font-medium text-[#231A14]">
                        {mod.name}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={mod.read}
                          onChange={() => handlePermissionChange(mod.id, "read")}
                          className="w-4 h-4 rounded border-[#EFECE6] accent-[#EE6B28] cursor-pointer"
                        />
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={mod.process}
                          onChange={() => handlePermissionChange(mod.id, "process")}
                          className="w-4 h-4 rounded border-[#EFECE6] accent-[#EE6B28] cursor-pointer"
                        />
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={mod.approve}
                          onChange={() => handlePermissionChange(mod.id, "approve")}
                          className="w-4 h-4 rounded border-[#EFECE6] accent-[#EE6B28] cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#EFECE6] bg-white text-[#231A14] hover:bg-[#FAF8F5] text-xs font-bold transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-b from-[#FF9A56] to-[#EE6B28] text-white text-xs font-bold shadow-md hover:brightness-105 transition cursor-pointer"
            >
              Simpan akun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}