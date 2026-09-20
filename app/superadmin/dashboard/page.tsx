"use client";

import Link from "next/link";

interface QueueItem {
  id: string;
  applicant: string;
  type: string;
  region: string;
  waitingDays: number;
  status: "Sedang direview" | "Perlu revisi" | "Baru";
}

interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  admin: string;
  time: string;
  type: "success" | "warning" | "info" | "neutral";
}

const queueData: QueueItem[] = [
  {
    id: "MR-2026-0142",
    applicant: "Rumah Hana Cattery",
    type: "Mating Report",
    region: "Bandung",
    waitingDays: 14,
    status: "Sedang direview",
  },
  {
    id: "CTY-2026-0071",
    applicant: "Dimas Prayoga",
    type: "Pendaftaran Cattery",
    region: "Jakarta",
    waitingDays: 12,
    status: "Perlu revisi",
  },
  {
    id: "MR-2026-0144",
    applicant: "Bandung Paws Cattery",
    type: "Mating Report",
    region: "Bandung",
    waitingDays: 9,
    status: "Baru",
  },
  {
    id: "MB-2026-0388",
    applicant: "Ayu Kartika",
    type: "Pendaftaran Member",
    region: "Surabaya",
    waitingDays: 7,
    status: "Baru",
  },
  {
    id: "MR-2026-0147",
    applicant: "Sumatra Cats",
    type: "Mating Report",
    region: "Medan",
    waitingDays: 5,
    status: "Sedang direview",
  },
];

const regionLoad = [
  { name: "Bandung", count: 9, percentage: "90%" },
  { name: "Jakarta", count: 7, percentage: "70%" },
  { name: "Surabaya", count: 4, percentage: "40%" },
  { name: "Medan", count: 3, percentage: "30%" },
];

const activities: ActivityItem[] = [
  {
    id: "1",
    title: "MR-2026-0139 disetujui",
    subtitle: "pedigree diterbitkan",
    admin: "Rina Nurhayati",
    time: "4 Sep 2026 09:14",
    type: "success",
  },
  {
    id: "2",
    title: "CTY-2026-0071 diminta revisi",
    subtitle: "foto sertifikat induk kurang jelas",
    admin: "Rina Nurhayati",
    time: "3 Sep 2026 16:40",
    type: "warning",
  },
  {
    id: "3",
    title: "Skor kesehatan Bagas diperbarui",
    subtitle: "menjadi 92",
    admin: "Rina Nurhayati",
    time: "3 Sep 2026 11:02",
    type: "info",
  },
  {
    id: "4",
    title: "Akun Regional Admin Bandung dibuat",
    subtitle: "belum dipakai untuk approval",
    admin: "Rina Nurhayati",
    time: "2 Sep 2026 14:26",
    type: "neutral",
  },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6 text-[#231A14]">
      {/* Info Banner TBD */}
      <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFE9E1] text-xs text-[#7A6E65]">
        <div className="w-5 h-5 rounded-full border border-[#8C8078] flex items-center justify-center font-semibold text-[10px] text-[#8C8078]">
          ?
        </div>
        <p>
          <span className="font-semibold text-[#4A3D34]">[PRD TBD]</span> Sumber dan definisi tiap metric belum ditetapkan, jadi angka pada card di bawah masih data contoh.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Baru Masuk */}
        <div className="bg-white p-5 rounded-2xl border border-[#EFE9E1] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#8C8078] tracking-wider uppercase">Baru Masuk</span>
            <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#8C8078]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-[#231A14]">12</div>
            <p className="text-[11px] text-[#8C8078] mt-1">Belum disentuh reviewer</p>
          </div>
        </div>

        {/* Sedang Direview */}
        <div className="bg-white p-5 rounded-2xl border border-[#EFE9E1] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#8C8078] tracking-wider uppercase">Sedang Direview</span>
            <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#8C8078]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-[#231A14]">7</div>
            <p className="text-[11px] text-[#8C8078] mt-1">Rata-rata 3 hari di antrean</p>
          </div>
        </div>

        {/* Perlu Revisi */}
        <div className="bg-white p-5 rounded-2xl border border-[#EFE9E1] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#8C8078] tracking-wider uppercase">Perlu Revisi</span>
            <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#8C8078]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-[#231A14]">4</div>
            <p className="text-[11px] text-[#8C8078] mt-1">Menunggu balasan pemohon</p>
          </div>
        </div>

        {/* Disetujui Sept 2026 */}
        <div className="bg-white p-5 rounded-2xl border border-[#EFE9E1] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#8C8078] tracking-wider uppercase">Disetujui Sept 2026</span>
            <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#8C8078]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-[#231A14]">38</div>
            <p className="text-[11px] text-[#8C8078] mt-1">2 ditolak pada periode sama</p>
          </div>
        </div>
      </div>

      {/* Grid Utama Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Antrean Aplikasi Paling Lama (Col 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-[#EFE9E1] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#F2EFE9]">
              <div>
                <h3 className="font-bold text-sm text-[#231A14]">Antrean aplikasi paling lama</h3>
                <p className="text-[11px] text-[#8C8078]">Urut dari yang paling lama menunggu review.</p>
              </div>
              <Link
                href="/superadmin/verifikasi-cattery"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#231A14] bg-[#FAF8F5] px-3 py-1.5 rounded-xl border border-[#E9E2DC] hover:bg-[#F2EFE9] transition"
              >
                Buka Application Queue
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs mt-2">
                <thead className="text-[#8C8078] text-[10px] uppercase tracking-wider border-b border-[#F2EFE9]">
                  <tr>
                    <th className="py-3 font-semibold">Nomor</th>
                    <th className="py-3 font-semibold">Pemohon</th>
                    <th className="py-3 font-semibold">Wilayah</th>
                    <th className="py-3 font-semibold">Menunggu</th>
                    <th className="py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2EFE9]">
                  {queueData.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FFF6EC]/40 transition">
                      <td className="py-3.5 font-mono text-[#8C8078] text-[11px]">{item.id}</td>
                      <td className="py-3.5">
                        <div className="font-bold text-[#231A14] text-xs">{item.applicant}</div>
                        <div className="text-[10px] text-[#8C8078]">{item.type}</div>
                      </td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#4A3D34] bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#E9E2DC]">
                          <svg className="w-3 h-3 text-[#A0948C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {item.region}
                        </span>
                      </td>
                      <td className="py-3.5 text-xs text-[#231A14] font-medium">{item.waitingDays} hari</td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium ${
                            item.status === "Sedang direview"
                              ? "bg-blue-50 text-blue-700"
                              : item.status === "Perlu revisi"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.status === "Sedang direview"
                                ? "bg-blue-500"
                                : item.status === "Perlu revisi"
                                ? "bg-amber-500"
                                : "bg-gray-500"
                            }`}
                          />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F2EFE9] text-[11px] text-[#A0948C]">
              Data contoh — belum terhubung ke database aplikasi.
            </div>
          </div>
        </div>

        {/* Right Sidebar (Col 1/3) */}
        <div className="space-y-6">
          {/* Beban Antrean Per Wilayah */}
          <div className="bg-white p-5 rounded-2xl border border-[#EFE9E1] shadow-xs">
            <h3 className="font-bold text-sm text-[#231A14]">Beban antrean per wilayah</h3>
            <p className="text-[11px] text-[#8C8078] mt-0.5">
              Semua wilayah ditangani Super Admin — belum ada pemisahan aktif.
            </p>

            <div className="mt-4 space-y-3.5">
              {regionLoad.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#231A14]">
                    <span>{item.name}</span>
                    <span>{item.count}</span>
                  </div>
                  <div className="h-2 w-full bg-[#FAF8F5] rounded-full overflow-hidden border border-[#EFE9E1]">
                    <div
                      className="h-full bg-gradient-to-r from-[#FFB16C] to-[#EE6B28] rounded-full"
                      style={{ width: item.percentage }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aktivitas Admin Terakhir */}
          <div className="bg-white p-5 rounded-2xl border border-[#EFE9E1] shadow-xs">
            <h3 className="font-bold text-sm text-[#231A14]">Aktivitas admin terakhir</h3>

            <div className="mt-4 space-y-4">
              {activities.map((act) => (
                <div key={act.id} className="flex gap-3 text-xs">
                  <div className="mt-0.5">
                    {act.type === "success" && (
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    {act.type === "warning" && (
                      <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                    )}
                    {act.type === "info" && (
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    )}
                    {act.type === "neutral" && (
                      <div className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-[#231A14]">
                      {act.title} <span className="font-normal text-[#8C8078]">— {act.subtitle}</span>
                    </p>
                    <p className="text-[10px] text-[#A0948C] mt-0.5">
                      {act.admin} · {act.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}