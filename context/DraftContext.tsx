"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { MatingReportDraft } from "@/types/cattery";

// Data dummy bawaan jika localStorage kosong
const initialDummyDrafts: MatingReportDraft[] = [
  {
    id: "draft-001",
    code: "MR-2026-0138",
    pair: "Bagas x Sekar",
    savedAt: "15 menit lalu",
    currentStep: 3,
    selectedMaleId: 1,
    selectedFemaleId: 2,
    matingDate: "2026-09-18",
    estimatedBirthDate: "2026-11-20",
    isEstimateAuto: true,
    witnessName: "Drh. Ahmad",
    offspringItems: [],
  },
  {
    id: "draft-002",
    code: "MR-2026-0140",
    pair: "Gala x Kirana",
    savedAt: "Kemarin · 14:20",
    currentStep: 5,
    selectedMaleId: 3,
    selectedFemaleId: 3,
    matingDate: "2026-09-25",
    estimatedBirthDate: "2026-11-27",
    isEstimateAuto: true,
    witnessName: "Rian",
    offspringItems: [],
  },
];

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

  // Load data saat pertama kali aplikasi dibuka
  useEffect(() => {
    const saved = localStorage.getItem("cattery_mating_drafts");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDrafts(parsed);
        } else {
          setDrafts(initialDummyDrafts);
        }
      } catch (e) {
        console.error("Failed to parse drafts", e);
        setDrafts(initialDummyDrafts);
      }
    } else {
      setDrafts(initialDummyDrafts);
    }
    setIsHydrated(true);
  }, []);

  // Simpan ke localStorage saat ada perubahan
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