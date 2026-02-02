"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, BarChart3, Trophy, Globe, LayoutList, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useDomains } from "./DomainsContext";
import { domainsData } from "@/lib/mockData";

const nav = [
  { href: "/dashboard", label: "Дашборд", icon: LayoutDashboard },
  { href: "/dashboard/analytics", label: "Аналитика", icon: BarChart3 },
  { href: "/dashboard/leaderboard", label: "Рейтинг ютуберов", icon: Trophy },
];

export function Sidebar() {
  const pathname = usePathname();
  const { openDomain, openAllDomains } = useDomains();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const NavLinks = ({ layoutId = "sidebar-active" }: { layoutId?: string }) => (
    <nav className="flex flex-col gap-0.5 px-3 py-4">
      {nav.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href}>
            <motion.span
              className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-300 ease-out ${
                isActive
                  ? "text-[hsl(var(--accent))]"
                  : "text-[hsl(var(--muted))] hover:bg-[hsl(var(--surface-muted))] hover:text-[hsl(var(--foreground))]"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-xl bg-[hsl(var(--accent-muted))]"
                  transition={{ type: "spring", bounce: 0.12, duration: 0.5 }}
                  style={{ opacity: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                {item.label}
              </span>
            </motion.span>
          </Link>
        );
      })}
    </nav>
  );

  const DomainsBlock = () => (
    <div className="border-t border-[hsl(var(--border))]/80 px-3 py-4">
      <div className="mb-2 flex items-center gap-2 px-3 py-1.5">
        <Globe className="h-4 w-4 text-[#DC2626]" strokeWidth={2} />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--muted))]">
          Домены
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          openAllDomains();
          setMobileMenuOpen(false);
        }}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:bg-[hsl(var(--surface-muted))] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/30"
      >
        <LayoutList className="h-4 w-4 shrink-0 text-[hsl(var(--muted))]" />
        Все домены
      </button>
      <ul className="scrollbar-premium mt-1 max-h-[220px] overflow-y-auto">
        {domainsData.slice(0, 8).map((d) => (
          <li key={d.domain}>
            <button
              type="button"
              onClick={() => {
                openDomain(d.domain);
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] text-[hsl(var(--muted))] transition-colors hover:bg-[hsl(var(--surface-muted))] hover:text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/30"
            >
              <Globe className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate font-mono text-[12px]">{d.domain}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <aside className="scrollbar-premium fixed left-0 top-0 z-40 flex hidden h-screen w-[240px] flex-col overflow-y-auto border-r border-[hsl(var(--border))]/80 bg-[hsl(var(--surface))] transition-colors duration-300 md:flex">
        <div className="flex h-16 shrink-0 items-center px-5">
          <Link
            href="/dashboard"
            className="font-logo flex items-baseline gap-0 no-underline outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--surface))] rounded-lg transition-opacity duration-200 hover:opacity-90"
            aria-label="funtube — на главную"
          >
            <span className="text-[1.35rem] font-extrabold tracking-tight text-[#DC2626]">fun</span>
            <span className="text-[1.35rem] font-extrabold tracking-tight text-[hsl(var(--foreground))]">tube</span>
          </Link>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <NavLinks />
        </div>
        <div className="shrink-0 border-t border-[hsl(var(--border))]/80">
          <DomainsBlock />
          <div className="border-t border-[hsl(var(--border))]/80 p-4">
            <ThemeToggle />
          </div>
        </div>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between gap-3 border-b border-[hsl(var(--border))]/80 bg-[hsl(var(--surface))]/95 px-4 backdrop-blur-md transition-colors duration-300 md:hidden">
        <Link
          href="/dashboard"
          className="font-logo flex shrink-0 items-baseline gap-0 no-underline outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] focus-visible:ring-offset-2 rounded-lg transition-opacity duration-200 hover:opacity-90"
          aria-label="funtube — на главную"
        >
          <span className="text-xl font-extrabold tracking-tight text-[#DC2626]">fun</span>
          <span className="text-xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">tube</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--border))]/80 bg-[hsl(var(--surface-muted))]/80 text-[hsl(var(--foreground))] transition-colors hover:bg-[hsl(var(--surface-muted))] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/30"
            aria-label="Открыть меню"
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="h-5 w-5" strokeWidth={2} />
          </motion.button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 300 }}
              className="scrollbar-premium fixed left-0 top-0 z-[70] flex h-full w-[280px] max-w-[85vw] flex-col overflow-y-auto border-r border-[hsl(var(--border))]/80 bg-[hsl(var(--surface))] shadow-2xl md:hidden"
              role="dialog"
              aria-label="Меню навигации"
            >
              <div className="flex h-14 shrink-0 items-center justify-between border-b border-[hsl(var(--border))]/80 px-4">
                <span className="font-logo text-lg font-extrabold tracking-tight text-[hsl(var(--foreground))]">
                  Меню
                </span>
                <motion.button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--surface-muted))] text-[hsl(var(--muted))] transition-colors hover:bg-[hsl(var(--surface-muted))]/80 hover:text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/30"
                  aria-label="Закрыть меню"
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </motion.button>
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto">
                <NavLinks layoutId="sidebar-active-mobile" />
                <DomainsBlock />
                <div className="mt-auto border-t border-[hsl(var(--border))]/80 p-4">
                  <ThemeToggle />
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
