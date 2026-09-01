"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";

type MenuSource = "header" | "sidebar" | null;

interface UserMenuContextValue {
  openMenu: MenuSource;
  toggleMenu: (source: "header" | "sidebar") => void;
  closeMenu: () => void;
}

const UserMenuContext = createContext<UserMenuContextValue | null>(null);

export function UserMenuProvider({ children }: { children: React.ReactNode }) {
  const [openMenu, setOpenMenu] = useState<MenuSource>(null);

  const toggleMenu = useCallback((source: "header" | "sidebar") => {
    setOpenMenu((prev) => (prev === source ? null : source));
  }, []);

  const closeMenu = useCallback(() => setOpenMenu(null), []);

  const value = useMemo(
    () => ({ openMenu, toggleMenu, closeMenu }),
    [openMenu, toggleMenu, closeMenu],
  );

  return (
    <UserMenuContext.Provider value={value}>
      {children}
    </UserMenuContext.Provider>
  );
}

export function useUserMenu() {
  const ctx = useContext(UserMenuContext);
  if (!ctx) throw new Error("useUserMenu harus dipakai di dalam UserMenuProvider");
  return ctx;
}