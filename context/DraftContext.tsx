"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { MatingReportDraft } from "@/types/cattery";

//**State management draft di satu tempat */

interface DraftContextValue {
  drafts: MatingReportDraft[];
  isHydrated: boolean;
  getDraft: (id: string) => MatingReportDraft | undefined;
  saveDraft: (data: Omit<MatingReportDraft, "id" | "code" | "savedAt"> & { id?: string }) => string;
  deleteDraft: (id: string) => void;
}

const DraftContext = createContext<DraftContextValue | null>(null);

let nextDraftNumber = 148;

export function DraftProvider({ children }: { children: React.ReactNode }) {
  const [drafts, setDrafts] = useState<MatingReportDraft[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Ambil data dari localStorage HANYA setelah mount di client
  useEffect(() => {
    const saved = localStorage.getItem("cattery_mating_drafts");
    if (saved) {
      try {
        setDrafts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse drafts", e);
      }
    }
    setIsHydrated(true);
  }, []);

  // 2. Simpan ke localStorage setiap kali 'drafts' berubah (setelah hydrated)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cattery_mating_drafts", JSON.stringify(drafts));
    }
  }, [drafts, isHydrated]);

  const getDraft = useCallback(
    (id: string) => drafts.find((d) => d.id === id),
    [drafts]
  );

  const saveDraft = useCallback(
    (data: Omit<MatingReportDraft, "id" | "code" | "savedAt"> & { id?: string }) => {
      const savedAt = new Date().toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      if (data.id) {
        setDrafts((prev) =>
          prev.map((d) => (d.id === data.id ? { ...d, ...data, savedAt } : d))
        );
        return data.id;
      }

      const newId = String(Date.now());
      const code = `MR-2026-${nextDraftNumber++}`;
      setDrafts((prev) => [...prev, { ...data, id: newId, code, savedAt }]);
      return newId;
    },
    []
  );

  const deleteDraft = useCallback((id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  }, []);

  return (
    <DraftContext.Provider value={{ drafts, isHydrated, getDraft, saveDraft, deleteDraft }}>
      {children}
    </DraftContext.Provider>
  );
}

export function useDrafts() {
  const ctx = useContext(DraftContext);
  if (!ctx) throw new Error("useDrafts harus dipakai di dalam DraftProvider");
  return ctx;
}