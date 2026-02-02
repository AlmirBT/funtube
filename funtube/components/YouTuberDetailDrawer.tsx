"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Crown,
  DollarSign,
  ShoppingBag,
  Percent,
  Users,
  Wallet,
  TrendingUp,
  TrendingDown,
  Minus,
  GitCompare,
  BarChart3,
} from "lucide-react";
import { currentYouTuberStats } from "@/lib/mockData";
import type { YouTuberStats } from "@/lib/mockData";
import { formatRubles } from "@/lib/currency";

interface YouTuberDetailDrawerProps {
  youtuber: (YouTuberStats & { rank?: number; averageCheck?: number }) | null;
  onClose: () => void;
}

const statRows: {
  key: keyof YouTuberStats;
  label: string;
  icon: React.ElementType;
  format: (v: number) => string;
}[] = [
  { key: "revenueDay", label: "Доход за день", icon: DollarSign, format: (v) => formatRubles(v) },
  { key: "revenueWeek", label: "Доход за неделю", icon: DollarSign, format: (v) => formatRubles(v) },
  { key: "revenueMonth", label: "Доход за месяц", icon: DollarSign, format: (v) => formatRubles(v) },
  { key: "purchasesCount", label: "Покупок за неделю", icon: ShoppingBag, format: (v) => v.toLocaleString("ru-RU") },
  { key: "conversion", label: "Конверсия домена, %", icon: Percent, format: (v) => `${v.toFixed(1)}%` },
  { key: "attractedUsers", label: "Привлечённые игроки", icon: Users, format: (v) => v.toLocaleString("ru-RU") },
];

function getAverageCheck(u: YouTuberStats): number {
  return u.purchasesCount > 0 ? u.revenueWeek / u.purchasesCount : 0;
}

function diffPercent(yours: number, theirs: number): number {
  if (theirs === 0) return yours > 0 ? 100 : 0;
  return ((yours - theirs) / theirs) * 100;
}

export function YouTuberDetailDrawer({ youtuber, onClose }: YouTuberDetailDrawerProps) {
  useEffect(() => {
    if (youtuber) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [youtuber]);

  useEffect(() => {
    if (!youtuber) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [youtuber, onClose]);

  const myAvgCheck = currentYouTuberStats ? getAverageCheck(currentYouTuberStats) : 0;
  const theirAvgCheck = youtuber ? (youtuber.averageCheck ?? getAverageCheck(youtuber)) : 0;

  return (
    <>
      <AnimatePresence>
        {youtuber ? (
          <>
            <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0.2, 1] }}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden
        />
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 32, stiffness: 200 }}
          className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-[hsl(var(--border))] bg-[hsl(var(--surface))] shadow-2xl dark:shadow-2xl"
          role="dialog"
          aria-label={`Статистика: ${youtuber.name}`}
        >
          <div className="shrink-0 border-b border-[hsl(var(--border))] px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#DC2626]/20 to-[#7F1D1D]/10 text-[#DC2626] shadow-[0_0_24px_-6px_rgba(220,38,38,0.25)]">
                  {youtuber.isOfficial ? (
                    <Crown className="h-7 w-7" strokeWidth={2} />
                  ) : (
                    <BarChart3 className="h-7 w-7" strokeWidth={2} />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    {youtuber.name}
                  </h2>
                  <p className="mt-0.5 text-sm font-medium text-[#DC2626]">
                    {youtuber.domain}
                  </p>
                  {youtuber.rank != null && (
                    <p className="mt-1 text-xs text-[hsl(var(--muted))]">
                      Место в рейтинге: {youtuber.rank === 1 ? "🥇" : youtuber.rank === 2 ? "🥈" : youtuber.rank === 3 ? "🥉" : youtuber.rank}
                    </p>
                  )}
                </div>
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--surface-muted))] text-[hsl(var(--muted))] transition-colors hover:bg-[hsl(var(--surface-muted))]/80 hover:text-[hsl(var(--foreground))]"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          <div className="scrollbar-premium flex-1 overflow-y-auto">
            <div className="border-b border-[hsl(var(--border))]/60 px-6 py-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted))]">
                <BarChart3 className="h-4 w-4" strokeWidth={2} />
                Подробная статистика
              </h3>
              <div className="space-y-3">
                {statRows.map(({ key, label, icon: Icon, format }) => {
                  const value = youtuber[key];
                  if (typeof value !== "number") return null;
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: [0.32, 0.72, 0.2, 1] }}
                      className="flex items-center justify-between rounded-xl border border-[hsl(var(--border))]/50 bg-[hsl(var(--surface-muted))]/30 px-4 py-3"
                    >
                      <span className="flex items-center gap-2.5 text-sm text-[hsl(var(--muted))]">
                        <Icon className="h-4 w-4 text-[#DC2626]/80" strokeWidth={2} />
                        {label}
                      </span>
                      <span className="font-semibold tabular-nums text-[hsl(var(--foreground))]">
                        {format(value)}
                      </span>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05, ease: [0.32, 0.72, 0.2, 1] }}
                  className="flex items-center justify-between rounded-xl border border-[hsl(var(--border))]/50 bg-[hsl(var(--surface-muted))]/30 px-4 py-3"
                >
                  <span className="flex items-center gap-2.5 text-sm text-[hsl(var(--muted))]">
                    <Wallet className="h-4 w-4 text-[#DC2626]/80" strokeWidth={2} />
                    Средний чек
                  </span>
                  <span className="font-semibold tabular-nums text-[hsl(var(--foreground))]">
                    {theirAvgCheck > 0 ? formatRubles(theirAvgCheck, { decimals: 0 }) : "—"}
                  </span>
                </motion.div>
              </div>
            </div>

            <div className="px-6 py-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted))]">
                <GitCompare className="h-4 w-4" strokeWidth={2} />
                Сравнение с вами
              </h3>
              <div className="space-y-3">
                {statRows.map(({ key, label, format }) => {
                  const myVal = currentYouTuberStats[key] as number | undefined;
                  const theirVal = youtuber[key] as number | undefined;
                  if (myVal == null || theirVal == null) return null;
                  const diff = diffPercent(myVal, theirVal);
                  const youWin = diff > 0;
                  const theyWin = diff < 0;
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.32, 0.72, 0.2, 1] }}
                      className="rounded-xl border border-[hsl(var(--border))]/50 bg-[hsl(var(--surface-muted))]/20 p-4"
                    >
                      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-[hsl(var(--muted))]">
                        {label}
                      </p>
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] text-[hsl(var(--muted))]">piona</p>
                          <p className="mt-0.5 font-semibold tabular-nums text-[hsl(var(--foreground))]">
                            {format(myVal)}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--surface-muted))]/50 px-2.5 py-1">
                          {youWin && (
                            <span className="flex items-center gap-1 text-xs font-semibold text-[#22C55E]">
                              <TrendingUp className="h-3.5 w-3.5" />
                              +{diff.toFixed(0)}%
                            </span>
                          )}
                          {theyWin && (
                            <span className="flex items-center gap-1 text-xs font-semibold text-[#EF4444]">
                              <TrendingDown className="h-3.5 w-3.5" />
                              {diff.toFixed(0)}%
                            </span>
                          )}
                          {!youWin && !theyWin && (
                            <span className="flex items-center gap-1 text-xs font-medium text-[hsl(var(--muted))]">
                              <Minus className="h-3.5 w-3.5" />
                              0%
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1 text-right">
                          <p className="text-[11px] text-[hsl(var(--muted))]">{youtuber.name}</p>
                          <p className="mt-0.5 font-semibold tabular-nums text-[hsl(var(--foreground))]">
                            {format(theirVal)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05, ease: [0.32, 0.72, 0.2, 1] }}
                  className="rounded-xl border border-[hsl(var(--border))]/50 bg-[hsl(var(--surface-muted))]/20 p-4"
                >
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-[hsl(var(--muted))]">
                    Средний чек
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-[hsl(var(--muted))]">piona</p>
                      <p className="mt-0.5 font-semibold tabular-nums text-[hsl(var(--foreground))]">
                        {formatRubles(myAvgCheck, { decimals: 0 })}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--surface-muted))]/50 px-2.5 py-1">
                      {(() => {
                        const diff = diffPercent(myAvgCheck, theirAvgCheck);
                        if (diff > 0)
                          return (
                            <span className="flex items-center gap-1 text-xs font-semibold text-[#22C55E]">
                              <TrendingUp className="h-3.5 w-3.5" />
                              +{diff.toFixed(0)}%
                            </span>
                          );
                        if (diff < 0)
                          return (
                            <span className="flex items-center gap-1 text-xs font-semibold text-[#EF4444]">
                              <TrendingDown className="h-3.5 w-3.5" />
                              {diff.toFixed(0)}%
                            </span>
                          );
                        return (
                          <span className="flex items-center gap-1 text-xs font-medium text-[hsl(var(--muted))]">
                            <Minus className="h-3.5 w-3.5" />
                            0%
                          </span>
                        );
                      })()}
                    </div>
                    <div className="min-w-0 flex-1 text-right">
                      <p className="text-[11px] text-[hsl(var(--muted))]">{youtuber.name}</p>
                      <p className="mt-0.5 font-semibold tabular-nums text-[hsl(var(--foreground))]">
                        {theirAvgCheck > 0 ? formatRubles(theirAvgCheck, { decimals: 0 }) : "—"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="border-t border-[hsl(var(--border))]/60 px-6 py-5">
              <Link
                href={`/dashboard/analytics?user=${youtuber.id}&compare=1`}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#DC2626]/40 bg-[#DC2626]/10 py-3.5 text-sm font-semibold text-[#DC2626] transition-all duration-200 hover:bg-[#DC2626]/15 hover:border-[#DC2626]/60 hover:shadow-glow-subtle"
              >
                <GitCompare className="h-4 w-4" strokeWidth={2} />
                Полное сравнение на странице аналитики
              </Link>
            </div>
          </div>
        </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
