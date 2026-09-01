"use client";

import { createContext, useContext, useState } from "react";

type MenuSource = "header" | "sidebar" | null;

interface UserMenuContextValue {
  openMenu: MenuSource;
  toggleMenu: (source: "header" | "sidebar") => void;
  closeMenu: () => void;
}

const UserMenuContext = createContext<UserMenuContextValue | null>(null);

export function UserMenuProvider({ children }: { children: React.ReactNode }) {
  const [openMenu, setOpenMenu] = useState<MenuSource>(null);

  const toggleMenu = (source: "header" | "sidebar") => {
    setOpenMenu((prev) => (prev === source ? null : source));
  };

  const closeMenu = () => setOpenMenu(null);

  return (
    <UserMenuContext.Provider value={{ openMenu, toggleMenu, closeMenu }}>
      {children}
    </UserMenuContext.Provider>
  );
}

export function useUserMenu() {
  const ctx = useContext(UserMenuContext);
  if (!ctx) throw new Error("useUserMenu harus dipakai di dalam UserMenuProvider");
  return ctx;
}