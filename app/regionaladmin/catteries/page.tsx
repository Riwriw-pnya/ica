"use client";

import React from "react";
import { Info, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

interface CatteryItem {
    id: string;
    code: string;
    name: string;
    owner: string;
    region: string;
    catsCount: number;
    reportCount: number;
    status: "Aktif" | "Nonaktif";
}

const mockCatteries: CatteryItem[] = [
    {
        id: "1",
        code: "ICA-CTY-2024-0188",
        name: "Rumah Hana Cattery",
        owner: "Hana Maheswari",
        region: "Bandung",
        catsCount: 11,
        reportCount: 7,
        status: "Aktif",
    },
    {
        id: "2",
        code: "ICA-CTY-2023-0121",
        name: "Bandung Paws Cattery",
        owner: "Reza Aditya",
        region: "Bandung",
        catsCount: 8,
        reportCount: 5,
        status: "Aktif",
    },
];

export default function CatteriesPage() {
    const router = useRouter();
    return (
        <div className="space-y-4 text-[#333333]">
            {/* Info Banner */}
            <div className="bg-[#FAF7F2] border border-[#EDE7DE] rounded-xl px-4 py-3 flex items-center gap-3 text-xs text-gray-700">
                <Info className="w-4 h-4 text-gray-400 shrink-0" />
                <span>
                Data dibatasi ke wilayah <strong>Bandung</strong>. Member dan cattery
                wilayah lain tidak muncul di modul ini.
                </span>
            </div>

            {/* Main Table Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                    <div>
                        <h2 className="text-base font-bold text-gray-900">
                        Cattery terdaftar
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                        Kode cattery diterbitkan admin ICA setelah pengajuan disetujui.
                        </p>
                    </div>

                    {/* Select Region Disabled */}
                    <div className="w-full sm:w-auto">
                        <select
                        disabled
                        value="Bandung"
                        className="w-full sm:w-36 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-lg px-3 py-2 outline-none cursor-not-allowed opacity-80 font-medium"
                        >
                        <option value="Bandung">Bandung</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead>
                            <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-wider">
                                <th className="py-3 px-3 font-semibold">KODE CATTERY</th>
                                <th className="py-3 px-3 font-semibold">CATTERY</th>
                                <th className="py-3 px-3 font-semibold">WILAYAH</th>
                                <th className="py-3 px-3 font-semibold text-center">KUCING</th>
                                <th className="py-3 px-3 font-semibold text-center">REPORT</th>
                                <th className="py-3 px-3 font-semibold">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                        {mockCatteries.map((item) => (
                            <tr
                            key={item.id}
                            onClick={() => router.push(`/regionaladmin/catteries/${item.id}`)}
                            className="hover:bg-[var(--color-brand-orange-50)] transition-colors cursor-pointer"
                            >
                                <td className="py-3.5 px-3 font-medium text-gray-800">
                                    {item.code}
                                </td>
                                <td className="py-3.5 px-3">
                                    <div className="font-bold text-gray-900">{item.name}</div>
                                    <div className="text-[11px] text-gray-400">
                                        Pemilik {item.owner}
                                    </div>
                                </td>
                                <td className="py-3.5 px-3">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                    <MapPin className="w-3 h-3 text-gray-400" />
                                    {item.region}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3 text-center font-semibold text-gray-700">
                                    {item.catsCount}
                                </td>
                                <td className="py-3.5 px-3 text-center font-semibold text-gray-700">
                                    {item.reportCount}
                                </td>
                                <td className="py-3.5 px-3">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F8F0] text-[#12B76A]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>
                                    {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <p className="text-[11px] text-gray-400 mt-5">Data contoh.</p>
            </div>
        </div>
    );
}