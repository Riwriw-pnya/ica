"use client";

import React, { createContext, useContext, useState } from "react";

//**BUAT TOMBOL "DRAFT" & HEADER CUSTOM (TITLE / SUBTITLE) */

interface HeaderActionContextType {
  customAction: (() => void) | null;
  setCustomAction: React.Dispatch<React.SetStateAction<(() => void) | null>>;
  headerTitle: string | null;
  setHeaderTitle: React.Dispatch<React.SetStateAction<string | null>>;
  headerSubTitle: string | null;
  setHeaderSubTitle: React.Dispatch<React.SetStateAction<string | null>>;
}

const HeaderActionContext = createContext<HeaderActionContextType | null>(null);

export function HeaderActionProvider({ children }: { children: React.ReactNode }) {
  const [customAction, setCustomAction] = useState<(() => void) | null>(null);
  const [headerTitle, setHeaderTitle] = useState<string | null>(null);
  const [headerSubTitle, setHeaderSubTitle] = useState<string | null>(null);

  return (
    <HeaderActionContext.Provider
      value={{
        customAction,
        setCustomAction,
        headerTitle,
        setHeaderTitle,
        headerSubTitle,
        setHeaderSubTitle,
      }}
    >
      {children}
    </HeaderActionContext.Provider>
  );
}

export function useHeaderAction() {
  const ctx = useContext(HeaderActionContext);
  if (!ctx) throw new Error("useHeaderAction harus dipakai di dalam HeaderActionProvider");
  return ctx;
}