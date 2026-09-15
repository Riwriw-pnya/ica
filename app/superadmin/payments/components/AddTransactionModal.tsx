"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { usePayments } from "@/context/PaymentContext";
import type { PaymentType, PaymentMethod, PaymentStatus } from "@/types/superadmin";

interface AddTransactionModalProps {
    onClose: () => void;
}

const PAYMENT_TYPES: PaymentType[] = ["Iuran tahunan", "Registrasi cattery", "Tiket event"];
const PAYMENT_METHODS: PaymentMethod[] = [
    "Virtual Account · BCA",
    "Transfer BCA",
    "Transfer Mandiri",
    "Transfer BNI",
    "QRIS",
];
const PAYMENT_STATUSES: PaymentStatus[] = ["Lunas", "Disetujui", "Menunggu verifikasi", "Ditolak"];

function todayISO() {
    return new Date().toISOString().slice(0, 10);
}

export default function AddTransactionModal({ onClose }: AddTransactionModalProps) {
    const { showToast } = useToast();
    const { addTransaction } = usePayments();

    // Kunci scroll body selama modal terbuka
    useEffect(() => {
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, []);

    const [paymentType, setPaymentType] = useState<PaymentType>("Iuran tahunan");
    const [amount, setAmount] = useState("");
    const [payerName, setPayerName] = useState("");
    const [method, setMethod] = useState<PaymentMethod>("Virtual Account · BCA");
    const [paidDate, setPaidDate] = useState(todayISO());
    const [status, setStatus] = useState<PaymentStatus>("Lunas");
    const [adminNote, setAdminNote] = useState("");

    const [showError, setShowError] = useState(false);

    const amountValue = Number(amount);
    const isAmountInvalid = showError && (!amount || amountValue <= 0);
    const isPayerInvalid = showError && payerName.trim() === "";

    const handleSubmit = () => {
        if (!payerName.trim() || !amount || amountValue <= 0) {
            setShowError(true);
            showToast("Nama pembayar dan nominal wajib diisi.", "", { tone: "error" });
            return;
        }

        const invoice = addTransaction({
            paymentType,
            amount: amountValue,
            payerName: payerName.trim(),
            method,
            paidDate,
            status,
            adminNote: adminNote.trim() || undefined,
        });

        showToast(`Transaksi ${invoice} ditambahkan ke daftar pembayaran.`, "");
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-[16px] font-semibold text-[var(--color-ink-900)]">
                            Tambah transaksi
                        </h2>
                        <p className="mt-1 max-w-[420px] text-[12px] text-[var(--color-ink-400)]">
                            Dipakai untuk pembayaran yang masuk di luar payment gateway. Misalnya transfer manual
                            atau setoran tunai di sekretariat. Transaksi langsung muncul di daftar Transaksi terakhir.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="shrink-0 rounded-full p-1 text-[var(--color-ink-400)] transition hover:bg-gray-100 hover:text-[var(--color-ink-700)]"
                        aria-label="Tutup"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Jenis pembayaran</label>
                        <select
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value as PaymentType)}
                            className="mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2.5 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
                        >
                            {PAYMENT_TYPES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-[12px] font-medium text-[var(--color-ink-700)]">
                            Nominal (Rp) <span className="text-[var(--color-danger)]">*</span>
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="350000"
                            className={`mt-1.5 w-full rounded-lg border px-3 py-2.5 text-[13px] text-[var(--color-ink-900)] outline-none transition ${
                                isAmountInvalid
                                    ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
                                    : "border-[var(--color-ink-100)] focus:border-[var(--color-brand-orange-300)]"
                            }`}
                        />
                    </div>

                    <div>
                        <label className="text-[12px] font-medium text-[var(--color-ink-700)]">
                            Pembayar <span className="text-[var(--color-danger)]">*</span>
                        </label>
                        <input
                            type="text"
                            value={payerName}
                            onChange={(e) => setPayerName(e.target.value)}
                            placeholder="Hana Maheswari"
                            className={`mt-1.5 w-full rounded-lg border px-3 py-2.5 text-[13px] text-[var(--color-ink-900)] outline-none transition ${
                                isPayerInvalid
                                    ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
                                    : "border-[var(--color-ink-100)] focus:border-[var(--color-brand-orange-300)]"
                            }`}
                        />
                    </div>

                    <div>
                        <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Metode</label>
                        <select
                            value={method}
                            onChange={(e) => setMethod(e.target.value as PaymentMethod)}
                            className="mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2.5 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
                        >
                            {PAYMENT_METHODS.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Tanggal bayar</label>
                        <input
                            type="date"
                            value={paidDate}
                            onChange={(e) => setPaidDate(e.target.value)}
                            className="mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2.5 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
                        />
                    </div>

                    <div>
                        <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as PaymentStatus)}
                            className="mt-1.5 w-full rounded-lg border border-[var(--color-ink-100)] px-3 py-2.5 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
                        >
                            {PAYMENT_STATUSES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="text-[12px] font-medium text-[var(--color-ink-700)]">Catatan admin</label>
                        <textarea
                            value={adminNote}
                            onChange={(e) => setAdminNote(e.target.value)}
                            rows={3}
                            placeholder="Nomor referensi transfer atau keterangan setoran."
                            className="mt-1.5 w-full resize-none rounded-lg border border-[var(--color-ink-100)] px-3 py-2.5 text-[13px] text-[var(--color-ink-900)] outline-none focus:border-[var(--color-brand-orange-300)]"
                        />
                        <p className="mt-1 text-[10px] text-[var(--color-ink-400)]">Terlihat oleh admin ICA saja.</p>
                    </div>
                </div>

                <div className="mt-6 flex flex-col-reverse justify-end gap-2 sm:flex-row sm:gap-3">
                    <button
                        onClick={onClose}
                        className="w-full rounded-full border border-[var(--color-ink-100)] px-5 py-2.5 text-[13px] font-medium text-[var(--color-ink-700)] transition hover:bg-gray-50 sm:w-auto"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="w-full cursor-pointer rounded-full border-t border-[#FFE5D4] bg-gradient-to-b from-[#FFC299] to-[#EE6B28] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(238,107,40,0.25)] transition-all duration-150 hover:from-[#EE6B28] hover:to-[#C8601D] active:translate-y-0.5 sm:w-auto"
                    >
                        Simpan transaksi
                    </button>
                </div>
            </div>
        </div>
    );
}