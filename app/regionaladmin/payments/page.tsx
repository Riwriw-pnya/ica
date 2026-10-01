"use client";

import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import DashboardIcon from "@/components/anggota/DashboardIcon";

interface Transaction {
  id: string;
  invoice: string;
  payerName: string;
  payerDescription: string;
  amount: number;
  method: string;
  date: string;
  status: "Disetujui" | "Menunggu" | "Ditolak";
  isHold?: boolean; // Flag jika dana tertahan (T+2 gateway)
}

interface WithdrawalHistory {
  id: string;
  reference: string;
  amount: number;
  requestedBy: string;
  date: string;
  status: "Disetujui" | "Menunggu verifikasi" | "Ditolak";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    invoice: "INV-2026-1841",
    payerName: "Hana Maheswari",
    payerDescription: "Iuran tahunan 2026",
    amount: 350000,
    method: "Transfer BCA",
    date: "2 Sep 2026",
    status: "Disetujui",
    isHold: false,
  },
  {
    id: "2",
    invoice: "INV-2026-1836",
    payerName: "Reza Aditya",
    payerDescription: "Tiket ICA Cat Show Bandung",
    amount: 150000,
    method: "QRIS",
    date: "1 Sep 2026",
    status: "Disetujui",
    isHold: false,
  },
  {
    id: "3",
    invoice: "INV-2026-1850",
    payerName: "Budi Santoso",
    payerDescription: "Pendaftaran Anggota Baru",
    amount: 200000,
    method: "Transfer Mandiri",
    date: "3 Sep 2026",
    status: "Menunggu", // Sampel data Menunggu
    isHold: false,
  },
  {
    id: "4",
    invoice: "INV-2026-1851",
    payerName: "Siti Rahma",
    payerDescription: "Sponsor Event Bandung",
    amount: 500000,
    method: "QRIS",
    date: "3 Sep 2026",
    status: "Disetujui",
    isHold: true, // Sampel data Dana Tertahan
  },
];

const mockWithdrawals: WithdrawalHistory[] = [
  {
    id: "1",
    reference: "STL-BDG-2026-0014",
    amount: 4250000,
    requestedBy: "Dewi Larasati · Regional Admin Bandung",
    date: "8 Sep 2026",
    status: "Disetujui",
  },
  {
    id: "2",
    reference: "STL-BDG-2026-0013",
    amount: 2800000,
    requestedBy: "Dewi Larasati · Regional Admin Bandung",
    date: "1 Sep 2026",
    status: "Disetujui",
  },
  {
    id: "3",
    reference: "STL-BDG-2026-0012",
    amount: 1150000,
    requestedBy: "Dewi Larasati · Regional Admin Bandung",
    date: "25 Agu 2026",
    status: "Menunggu verifikasi",
  },
];

export default function RegionalPaymentsPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"dana" | "rekening" | "settlement">("dana");

  // Dynamic Region & Financial State
  const [regionName] = useState("Bandung");
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [withdrawals] = useState<WithdrawalHistory[]>(mockWithdrawals);

  // Tab 2: Form Rekening State
  const [bank, setBank] = useState("BCA");
  const [accountNumber, setAccountNumber] = useState("018-7788-9900");
  const [accountName, setAccountName] = useState("ICA Wilayah Bandung");
  const [branchCity, setBranchCity] = useState("Bandung");
  const [verifiedDate] = useState("2 Sep 2026");
  const [lastModifiedBy] = useState("Dewi Larasati · 2 Sep 2026 11:20");

  // Tab 3: Pengaturan Settlement State
  const [schedule, setSchedule] = useState("Mingguan · setiap Senin");
  const [minBalance, setMinBalance] = useState(500000);
  const [autoSettlement, setAutoSettlement] = useState(true);
  const [emailRecap, setEmailRecap] = useState(true);

  // === KALKULASI DINAMIS ===
  // 1. Total Dana Masuk (Lunas & Tidak Tertahan)
  const totalDanaLunas = transactions
    .filter((tx) => tx.status === "Disetujui" && !tx.isHold)
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 2. Total Dana Menunggu Konfirmasi (Dinamis)
  const totalMenungguKonfirmasi = transactions
    .filter((tx) => tx.status === "Menunggu")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 3. Total Dana Tertahan / T+2 Gateway (Dinamis)
  const totalDanaTertahan = transactions
    .filter((tx) => tx.status === "Disetujui" && tx.isHold)
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 4. Hitung Unik Pemohon Terpantau (Dinamis berdasarkan Nama Pembayar)
  const totalPemohonUnik = new Set(transactions.map((tx) => tx.payerName)).size;

  // 5. Total Seluruh Pendapatan (Lunas + Tertahan)
  const totalAkumulasiDana = totalDanaLunas + totalDanaTertahan;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(totalDanaLunas);
  const [withdrawNote, setWithdrawNote] = useState("");

  // Helper Formatter Rupiah
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleOpenModal = () => {
    setWithdrawAmount(totalDanaLunas);
    setIsModalOpen(true);
  };

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      `Rekening kas Regional ${regionName} tersimpan. Perubahan nama pemilik menunggu verifikasi Super Admin.`,
      "",
      { tone: "success" }
    );
  };

  const handleSaveSettlementConfig = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      `Pengaturan settlement wilayah ${regionName} tersimpan.`,
      "",
      { tone: "success" }
    );
  };

  const handleTarikSemua = () => {
    showToast(
      `Seluruh saldo ${formatRupiah(totalDanaLunas)} diajukan untuk settlement ke kas Regional ${regionName}.`,
      "",
      { tone: "success" }
    );
  };

  const handleDownloadRecap = () => {
    showToast("Rekap settlement bulan berjalan diunduh.", "", { tone: "success" });
  };

  const handleConfirmWithdrawModal = () => {
    if (withdrawAmount < minBalance) {
      showToast(
        `Minimum penarikan adalah ${formatRupiah(minBalance)}.`,
        "",
        { tone: "error" }
      );
      return;
    }
    if (withdrawAmount > totalDanaLunas) {
      showToast(
        `Nominal penarikan melebihi saldo tersedia (${formatRupiah(totalDanaLunas)}).`,
        "",
        { tone: "error" }
      );
      return;
    }

    setIsModalOpen(false);
    showToast(
      `Pengajuan penarikan ${formatRupiah(withdrawAmount)} dikirim. Status mengikuti settlement gateway.`,
      "",
      { tone: "success" }
    );
  };

  return (
    <main className="min-h-full pb-12">
      <div className="mx-auto max-w-[1200px] space-y-4">
        {/* Top Notice Banner */}
        <div className="flex items-start gap-2.5 rounded-xl border border-[var(--color-info)]/30 bg-[var(--color-info-bg)] p-4 text-[12px] text-[var(--color-info)] shadow-2xs">
          <DashboardIcon name="pin" size={16} />
          <span>
            Data dibatasi ke wilayah {regionName}. Anda dapat mengatur rekening kas Regional dan jadwal settlement; limit dan verifikasi rekening diputus admin pusat.
          </span>
        </div>

        {/* Header Title Card */}
        <div className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-6 shadow-2xs">
          <h1 className="text-[16px] font-semibold text-[var(--color-ink-900)]">
            Status pembayaran wilayah {regionName}
          </h1>
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-ink-400)]">
            Dana masuk wilayah {regionName}, rekening kas Regional, dan jadwal settlement-nya. Metode pembayaran, limit settlement, dan verifikasi rekening tetap diatur admin pusat.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => setActiveTab("dana")}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-[12px] font-medium transition-all cursor-pointer hover:-translate-y-0.5 ${
              activeTab === "dana"
                ? "border border-[var(--color-brand-orange-300)] bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)] shadow-2xs"
                : "border border-[var(--color-brand-orange-300)] bg-white text-[var(--color-brand-orange-700)] hover:bg-[var(--color-brand-orange-50)]"
            }`}
          >
            Dana masuk
          </button>
          <button
            onClick={() => setActiveTab("rekening")}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-[12px] font-medium transition-all cursor-pointer hover:-translate-y-0.5 ${
              activeTab === "rekening"
                ? "border border-[var(--color-brand-orange-300)] bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)] shadow-2xs"
                : "border border-[var(--color-brand-orange-300)] bg-white text-[var(--color-brand-orange-700)] hover:bg-[var(--color-brand-orange-50)]"
            }`}
          >
            <DashboardIcon name="payment" size={14} />
            Rekening Regional
          </button>
          <button
            onClick={() => setActiveTab("settlement")}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-[12px] font-medium transition-all cursor-pointer hover:-translate-y-0.5 ${
              activeTab === "settlement"
                ? "border border-[var(--color-brand-orange-300)] bg-[var(--color-brand-orange-100)] text-[var(--color-brand-orange-700)] shadow-2xs"
                : "border border-[var(--color-brand-orange-300)] bg-white text-[var(--color-brand-orange-700)] hover:bg-[var(--color-brand-orange-50)]"
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Settlement wilayah
          </button>
        </div>

        {/* TAB 1: DANA MASUK */}
        {activeTab === "dana" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-ink-400)]">
                    LUNAS
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] text-[12px]">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                </div>
                <p className="text-[30px] font-display font-bold text-[var(--color-ink-900)]">
                  {formatRupiah(totalDanaLunas)}
                </p>
                <p className="text-[11px] text-[var(--color-ink-400)]">
                  {transactions.filter((t) => t.status === "Disetujui" && !t.isHold).length} transaksi berhasil di wilayah {regionName}
                </p>
              </div>

              {/* DAHULU HARDCODED, SEKARANG DINAMIS */}
              <div className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-ink-400)]">
                    MENUNGGU KONFIRMASI
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 text-amber-600 text-[12px]">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                    </svg>
                  </span>
                </div>
                <p className="text-[30px] font-display font-bold text-[var(--color-ink-900)]">
                  {formatRupiah(totalMenungguKonfirmasi)}
                </p>
                <p className="text-[11px] text-[var(--color-ink-400)]">
                  {transactions.filter((t) => t.status === "Menunggu").length} transaksi perlu dikonfirmasi admin
                </p>
              </div>

              {/* DINAMIS PEMOHON UNIK */}
              <div className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-ink-400)]">
                    PEMOHON TERPANTAU
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-[12px]">
                    <DashboardIcon name="user" size={14} />
                  </span>
                </div>
                <p className="text-[30px] font-display font-bold text-[var(--color-ink-900)]">
                  {totalPemohonUnik}
                </p>
                <p className="text-[11px] text-[var(--color-ink-400)]">
                  Member unik di wilayah {regionName}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-ink-200)] bg-white px-3 py-5 shadow-2xs">
              <div className="border-b border-[var(--color-ink-100)] pb-3 px-2">
                <h2 className="text-[14px] font-semibold text-[var(--color-ink-900)]">
                  Dana masuk terakhir
                </h2>
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-[12px]">
                  <thead>
                    <tr className="border-b border-[var(--color-ink-100)] text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink-400)]">
                      <th className="pb-3 pr-4">INVOICE</th>
                      <th className="pb-3 pr-4">PEMBAYAR</th>
                      <th className="pb-3 pr-4 text-right">JUMLAH</th>
                      <th className="pb-3 pr-4">METODE</th>
                      <th className="pb-3 pr-4">TANGGAL</th>
                      <th className="pb-3 text-right">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-ink-100)]">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50/50">
                        <td className="py-3.5 pr-4 font-medium text-[var(--color-ink-900)]">
                          {tx.invoice}
                        </td>
                        <td className="py-3.5 pr-4">
                          <p className="font-semibold text-[var(--color-ink-900)]">
                            {tx.payerName}
                          </p>
                          <p className="text-[11px] text-[var(--color-ink-400)]">
                            {tx.payerDescription}
                          </p>
                        </td>
                        <td className="py-3.5 pr-4 text-right font-medium text-[var(--color-ink-900)]">
                          {formatRupiah(tx.amount)}
                        </td>
                        <td className="py-3.5 pr-4 text-[var(--color-ink-700)]">
                          {tx.method}
                        </td>
                        <td className="py-3.5 pr-4 text-[var(--color-ink-700)]">
                          {tx.date}
                        </td>
                        <td className="py-3.5 text-right">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                              tx.status === "Disetujui"
                                ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${tx.status === "Disetujui" ? "bg-[var(--color-success)]" : "bg-amber-600"}`} />
                            {tx.status} {tx.isHold && "(Hold)"}
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

        {/* TAB 2: REKENING REGIONAL */}
        {activeTab === "rekening" && (
          <div className="space-y-4">
            <div className="flex items-start gap-2.5 rounded-xl border border-[var(--color-info)]/30 bg-[var(--color-info-bg)] p-4 text-[12px] text-[var(--color-info)] shadow-2xs">
              <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                Rekening ini menerima pendapatan event dan transaksi wilayah {regionName}. Konfigurasi tingkat lanjut — verifikasi rekening, limit, dan perubahan nama pemilik — dilakukan Super Admin di area pusat.
              </span>
            </div>

            <form onSubmit={handleSaveAccount} className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-6 shadow-2xs">
              <h2 className="text-[14px] font-semibold text-[var(--color-ink-900)]">
                Rekening kas Regional {regionName}
              </h2>
              <p className="mt-0.5 text-[12px] text-[var(--color-ink-400)]">
                Seluruh pendapatan event yang Anda buat masuk ke rekening ini, bukan ke kas pusat.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block text-[11px] font-medium text-[var(--color-ink-700)]">Bank</label>
                  <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[var(--color-ink-100)] bg-white p-2.5 text-[12px] font-medium text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-500)]"
                  >
                    <option value="BCA">BCA</option>
                    <option value="Mandiri">Mandiri</option>
                    <option value="BNI">BNI</option>
                    <option value="BRI">BRI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[var(--color-ink-700)]">Nomor rekening</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[var(--color-ink-100)] bg-white p-2.5 text-[12px] font-medium text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-500)]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[var(--color-ink-700)]">Nama pemilik rekening</label>
                  <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[var(--color-ink-100)] bg-white p-2.5 text-[12px] font-medium text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-500)]"
                  />
                  <p className="mt-1 text-[10px] text-[var(--color-ink-400)]">
                    Perubahan nama pemilik perlu verifikasi Super Admin.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[var(--color-ink-700)]">Kota cabang</label>
                  <input
                    type="text"
                    value={branchCity}
                    onChange={(e) => setBranchCity(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[var(--color-ink-100)] bg-white p-2.5 text-[12px] font-medium text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-500)]"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-[12px] font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D]"
                >
                  Simpan rekening
                </button>
              </div>
            </form>

            <div className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-6 shadow-2xs space-y-3">
              <h2 className="text-[14px] font-semibold text-[var(--color-ink-900)] mb-2">
                Status verifikasi
              </h2>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[var(--color-ink-400)]">Status rekening</span>
                <span className="font-semibold text-[var(--color-ink-900)]">
                  Terverifikasi Super Admin · {verifiedDate}
                </span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[var(--color-ink-400)]">Limit settlement per pengajuan</span>
                <span className="font-semibold text-[var(--color-ink-900)]">
                  Rp 25.000.000 · diatur pusat
                </span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[var(--color-ink-400)]">Terakhir diubah</span>
                <span className="font-semibold text-[var(--color-ink-900)]">
                  {lastModifiedBy}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SETTLEMENT WILAYAH */}
        {activeTab === "settlement" && (
          <div className="space-y-4">
            <div className="flex items-start gap-2.5 rounded-xl border border-[var(--color-info)]/30 bg-[var(--color-info-bg)] p-4 text-[12px] text-[var(--color-info)] shadow-2xs">
              <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                Dana wilayah {regionName} di-settlement ke rekening kas Regional sesuai jadwal di bawah. Limit dan verifikasi rekening diatur Super Admin.
              </span>
            </div>

            {/* Form Pengaturan Settlement */}
            <form onSubmit={handleSaveSettlementConfig} className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-6 shadow-2xs">
              <h2 className="text-[14px] font-semibold text-[var(--color-ink-900)]">
                Pengaturan settlement wilayah {regionName}
              </h2>
              <p className="mt-0.5 text-[12px] text-[var(--color-ink-400)]">
                Menentukan kapan dana wilayah dikirim ke rekening kas Regional. Batas maksimum tetap mengikuti limit yang diatur pusat.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-[11px] font-medium text-[var(--color-ink-700)]">Jadwal settlement</label>
                  <select
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[var(--color-brand-orange-300)] bg-white p-2.5 text-[12px] font-medium text-[var(--color-ink-900)] outline-none focus:ring-2 focus:ring-[var(--color-brand-orange-500)]/20"
                  >
                    <option value="Harian">Harian</option>
                    <option value="Mingguan · setiap Senin">Mingguan · setiap Senin</option>
                    <option value="Dua mingguan">Dua mingguan</option>
                    <option value="Bulanan · tanggal 1">Bulanan · tanggal 1</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[var(--color-ink-700)]">Minimum saldo settlement (Rp)</label>
                  <input
                    type="number"
                    value={minBalance}
                    onChange={(e) => setMinBalance(Number(e.target.value))}
                    className="mt-1.5 w-full rounded-xl border border-[var(--color-ink-100)] bg-white p-2.5 text-[12px] font-medium text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-500)]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[var(--color-ink-700)]">Rekening tujuan</label>
                  <input
                    type="text"
                    disabled
                    value={`${bank} ${accountNumber} · ${accountName}`}
                    className="mt-1.5 w-full rounded-xl border border-[var(--color-ink-100)] bg-gray-50 p-2.5 text-[12px] font-medium text-[var(--color-ink-700)] cursor-not-allowed"
                  />
                  <p className="mt-1 text-[10px] text-[var(--color-ink-400)]">
                    Diambil dari tab Rekening Regional.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-[var(--color-ink-50)] pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-semibold text-[var(--color-ink-900)]">Settlement otomatis sesuai jadwal</p>
                    <p className="text-[11px] text-[var(--color-ink-400)]">Kalau dimatikan, penarikan harus diajukan manual.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoSettlement}
                      onChange={(e) => setEmailRecap(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                      peer-checked:border-t peer-checked:border-[#FFE5D4] peer-checked:bg-gradient-to-b peer-checked:from-[#FFC299] peer-checked:to-[#EE6B28]">
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-semibold text-[var(--color-ink-900)]">Kirim rekap settlement ke email admin wilayah</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailRecap}
                      onChange={(e) => setEmailRecap(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                      peer-checked:border-t peer-checked:border-[#FFE5D4] peer-checked:bg-gradient-to-b peer-checked:from-[#FFC299] peer-checked:to-[#EE6B28]">
                    </div>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-[12px] font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D]"
                >
                  Simpan pengaturan settlement
                </button>
              </div>
            </form>

            {/* Ringkasan Cards (SEMUANYA DINAMIS) */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-ink-400)]">
                    TOTAL DANA MASUK
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-green-600 text-[12px]">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </span>
                </div>
                <p className="text-[30px] font-display font-bold text-[var(--color-ink-900)]">
                  {formatRupiah(totalAkumulasiDana)}
                </p>
                <p className="text-[11px] text-[var(--color-ink-400)]">
                  Akumulasi pendapatan wilayah {regionName}
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-ink-400)]">
                    SIAP DI-SETTLEMENT
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] text-[12px]">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                </div>
                <p className="text-[30px] font-display font-bold text-[var(--color-ink-900)]">
                  {formatRupiah(totalDanaLunas)}
                </p>
                <p className="text-[11px] text-[var(--color-ink-400)]">
                  Dapat ditarik hari ini
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-ink-400)]">
                    DANA TERTAHAN
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 text-amber-600 text-[12px]">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                    </svg>
                  </span>
                </div>
                <p className="text-[30px] font-display font-bold text-[var(--color-ink-900)]">
                  {formatRupiah(totalDanaTertahan)}
                </p>
                <p className="text-[11px] text-[var(--color-ink-400)]">
                  Proses clearing gateway T+2
                </p>
              </div>
            </div>

            {/* Action Card */}
            <div className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-6 shadow-2xs">
              <h2 className="text-[14px] font-semibold text-[var(--color-ink-900)]">
                Settlement ke kas Regional {regionName}
              </h2>
              <p className="mt-0.5 text-[12px] text-[var(--color-ink-400)]">
                Dana wilayah dikirim ke rekening kas Regional {regionName} dan tercatat di log audit atas nama admin yang mengajukan.
              </p>

              <div className="mt-4 rounded-xl border border-[var(--color-ink-100)] bg-gray-50/60 p-4 space-y-2 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-400)]">Rekening tujuan</span>
                  <span className="font-semibold text-[var(--color-ink-900)]">
                    {bank} {accountNumber} · a.n. {accountName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-400)]">Sumber pengaturan rekening</span>
                  <span className="font-semibold text-[var(--color-ink-900)]">
                    Tab Rekening Regional · limit diatur pusat
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-400)]">Minimum penarikan</span>
                  <span className="font-semibold text-[var(--color-ink-900)]">
                    {formatRupiah(minBalance)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-400)]">Estimasi dana masuk</span>
                  <span className="font-semibold text-[var(--color-ink-900)]">
                    1 hari kerja
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  onClick={handleOpenModal}
                  className="inline-flex items-center gap-1.5 cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-[12px] font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all hover:-translate-y-0.5 hover:from-[#EE6B28] hover:to-[#C8601D]"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                  Tarik dana
                </button>
                <button
                  onClick={handleTarikSemua}
                  className="inline-flex items-center gap-1.5 cursor-pointer rounded-full border border-[var(--color-brand-orange-300)] bg-white px-5 py-2 text-[12px] font-semibold text-[var(--color-brand-orange-700)] hover:bg-[var(--color-brand-orange-50)] hover:-translate-y-0.5 shadow-2xs transition-all"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                  </svg>
                  Tarik semua · {formatRupiah(totalDanaLunas)}
                </button>
                <button
                  onClick={handleDownloadRecap}
                  className="inline-flex items-center gap-1.5 cursor-pointer rounded-full border border-[var(--color-brand-orange-300)] bg-white px-5 py-2 text-[12px] font-semibold text-[var(--color-brand-orange-700)] hover:bg-[var(--color-brand-orange-50)] hover:-translate-y-0.5 shadow-2xs transition-all"
                >
                  <DashboardIcon name="news" size={14} />
                  Unduh rekap settlement
                </button>
              </div>
            </div>

            {/* Riwayat Penarikan */}
            <div className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-3 shadow-2xs">
              <div className="border-b border-[var(--color-ink-100)] pt-1 pb-3 px-3">
                <h2 className="text-[14px] font-semibold text-[var(--color-ink-900)]">
                  Riwayat penarikan
                </h2>
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-[12px]">
                  <thead>
                    <tr className="border-b border-[var(--color-ink-100)] text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink-400)]">
                      <th className="pb-3 pr-4">REFERENSI</th>
                      <th className="pb-3 pr-4">NOMINAL</th>
                      <th className="pb-3 pr-4">DIAJUKAN OLEH</th>
                      <th className="pb-3 pr-4">TANGGAL</th>
                      <th className="pb-3 text-right">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-ink-50)]">
                    {withdrawals.map((w) => (
                      <tr key={w.id} className="hover:bg-gray-50/50">
                        <td className="py-3.5 pr-4 font-medium text-[var(--color-ink-900)]">
                          {w.reference}
                        </td>
                        <td className="py-3.5 pr-4 font-medium text-[var(--color-ink-900)]">
                          {formatRupiah(w.amount)}
                        </td>
                        <td className="py-3.5 pr-4 text-[var(--color-ink-700)]">
                          {w.requestedBy}
                        </td>
                        <td className="py-3.5 pr-4 text-[var(--color-ink-700)]">
                          {w.date}
                        </td>
                        <td className="py-3.5 text-right">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                              w.status === "Disetujui"
                                ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${w.status === "Disetujui" ? "bg-[var(--color-success)]" : "bg-amber-600"}`} />
                            {w.status}
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
      </div>

      {/* MODAL TARIK DANA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
          <div className="w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-[var(--color-ink-400)] hover:text-[var(--color-ink-700)] p-1 rounded-lg cursor-pointer"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-[16px] font-semibold text-[var(--color-ink-900)]">
              Tarik dana
            </h3>
            <p className="text-[12px] text-[var(--color-ink-400)] mt-0.5">
              Pengajuan penarikan dari saldo settlement ke rekening resmi ICA.
            </p>

            <div className="mt-4 space-y-2 rounded-xl bg-gray-50/80 p-3.5 text-[12px]">
              <div className="flex justify-between">
                <span className="text-[var(--color-ink-400)]">Saldo tersedia</span>
                <span className="font-bold text-[var(--color-ink-900)]">
                  {formatRupiah(totalDanaLunas)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-ink-400)]">Rekening tujuan</span>
                <span className="font-semibold text-[var(--color-ink-900)]">
                  {bank} {accountNumber}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[11px] font-medium text-[var(--color-ink-700)]">
                Nominal penarikan (Rp) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                className="mt-1.5 w-full rounded-xl border border-[var(--color-ink-100)] bg-white p-2.5 text-[12px] font-medium text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-500)]"
              />
              <p className="mt-1 text-[10px] text-[var(--color-ink-400)]">
                Minimum {formatRupiah(minBalance)}.
              </p>
            </div>

            <div className="mt-3">
              <label className="block text-[11px] font-medium text-[var(--color-ink-700)]">
                Keterangan
              </label>
              <textarea
                rows={3}
                value={withdrawNote}
                onChange={(e) => setWithdrawNote(e.target.value)}
                placeholder="Misalnya: operasional cat show Bandung."
                className="mt-1.5 w-full resize-none rounded-xl border border-[var(--color-ink-100)] p-2.5 text-[12px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-500)]"
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full border border-[var(--color-ink-100)] px-4 py-2 text-[12px] font-semibold text-[var(--color-ink-700)] hover:bg-gray-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmWithdrawModal}
                className="cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-5 py-2 text-[12px] font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all hover:from-[#EE6B28] hover:to-[#C8601D]"
              >
                Ajukan penarikan
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}