"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";

interface SidebarContextValue {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({ isSidebarOpen, toggleSidebar }),
    [isSidebarOpen, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar harus dipakai di dalam SidebarProvider");
  return ctx;
}