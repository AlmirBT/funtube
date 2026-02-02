"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type DrawerState = { type: "domain"; domain: string } | { type: "all" } | null;

const DomainsContext = createContext<{
  drawer: DrawerState;
  openDomain: (domain: string) => void;
  openAllDomains: () => void;
  closeDrawer: () => void;
} | null>(null);

export function DomainsProvider({ children }: { children: ReactNode }) {
  const [drawer, setDrawer] = useState<DrawerState>(null);

  const openDomain = useCallback((domain: string) => {
    setDrawer({ type: "domain", domain });
  }, []);

  const openAllDomains = useCallback(() => {
    setDrawer({ type: "all" });
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawer(null);
  }, []);

  return (
    <DomainsContext.Provider value={{ drawer, openDomain, openAllDomains, closeDrawer }}>
      {children}
    </DomainsContext.Provider>
  );
}

export function useDomains() {
  const ctx = useContext(DomainsContext);
  if (!ctx) throw new Error("useDomains must be used within DomainsProvider");
  return ctx;
}
