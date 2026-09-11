"use client";

import React, { createContext, useContext, useState } from "react";

//**BUAT TOMBOL "DRAFT" */

interface HeaderActionContextType {
  customAction: (() => void) | null;
  setCustomAction: React.Dispatch<React.SetStateAction<(() => void) | null>>;
}

const HeaderActionContext = createContext<HeaderActionContextType | null>(null);

export function HeaderActionProvider({ children }: { children: React.ReactNode }) {
  const [customAction, setCustomAction] = useState<(() => void) | null>(null);

  return (
    <HeaderActionContext.Provider value={{ customAction, setCustomAction }}>
      {children}
    </HeaderActionContext.Provider>
  );
}

export function useHeaderAction() {
  const ctx = useContext(HeaderActionContext);
  if (!ctx) throw new Error("useHeaderAction harus dipakai di dalam HeaderActionProvider");
  return ctx;
}