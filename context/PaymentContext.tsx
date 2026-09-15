"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { PaymentTransaction, NewTransactionInput } from "@/types/superadmin";
import { paymentTransactions as initialTransactions } from "@/data/superadmin";

interface PaymentContextValue {
    transactions: PaymentTransaction[];
    addTransaction: (input: NewTransactionInput) => string;
}

const PaymentContext = createContext<PaymentContextValue | null>(null);

let nextInvoiceNumber = 1843;

function formatDateLabel(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export function PaymentProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<PaymentTransaction[]>(initialTransactions);

    const addTransaction = useCallback((input: NewTransactionInput) => {
        const invoice = `INV-2026-${nextInvoiceNumber++}`;
        const newTransaction: PaymentTransaction = {
        id: String(Date.now()),
        invoice,
        payerName: input.payerName,
        description: input.paymentType,
        paymentType: input.paymentType,
        amount: input.amount,
        method: input.method,
        paidDate: formatDateLabel(input.paidDate),
        status: input.status,
        adminNote: input.adminNote,
        };

        setTransactions((prev) => [newTransaction, ...prev]);
        return invoice;
    }, []);

    return (
        <PaymentContext.Provider value={{ transactions, addTransaction }}>
        {children}
        </PaymentContext.Provider>
    );
}

export function usePayments() {
    const ctx = useContext(PaymentContext);
    if (!ctx) throw new Error("usePayments harus dipakai di dalam PaymentProvider");
    return ctx;
}