"use client";

import { motion } from "framer-motion";
import { Trophy, Bell, ShoppingBag } from "lucide-react";
import {
  topPurchases,
  activeSubscribersByDomain,
} from "@/lib/mockData";
import { formatRubles } from "@/lib/currency";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.32, 0.72, 0.2, 1] },
  },
};

const spring = { type: "spring" as const, stiffness: 280, damping: 30 };

export function TopAnalytics() {
  const maxShare = Math.max(...topPurchases.map((p) => p.sharePercent), 1);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.32, 0.72, 0.2, 1] }}
      className="rounded-2xl bg-[hsl(var(--surface))] p-8 shadow-soft dark:shadow-soft-dark sm:p-10 lg:p-12 transition-all duration-500 hover:shadow-glow-subtle"
      aria-label="Топ-аналитика"
    >
      <div className="mb-12 flex items-start gap-4 sm:gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#DC2626]/10 text-[#DC2626] shadow-[0_0_24px_-6px_rgba(220,38,38,0.22)] dark:shadow-[0_0_32px_-6px_rgba(220,38,38,0.28)] transition-transform duration-300 hover:scale-105">
          <Trophy className="h-6 w-6" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))] sm:text-3xl">
            Топ-аналитика
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-[hsl(var(--muted))] max-w-md">
            Кто и что приносит больше всего за период
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 lg:gap-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="rounded-2xl border border-[hsl(var(--border))]/50 bg-[hsl(var(--surface-muted))]/30 p-7 sm:p-8 shadow-soft transition-all duration-300 ease-out hover:shadow-soft-lg hover:shadow-glow-subtle hover:border-[hsl(var(--border))]/70 dark:border-[hsl(var(--border))]/40 dark:shadow-soft-dark dark:hover:shadow-soft-dark-lg dark:hover:shadow-glow-subtle"
        >
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#DC2626]/15 text-[#DC2626]">
              <ShoppingBag className="h-4 w-4" strokeWidth={2} />
            </div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--muted))]">
              С чего больше всего приносит деньги
            </h3>
          </div>
          <ul className="space-y-4">
            {topPurchases.map((p, i) => (
              <motion.li
                key={p.id}
                variants={item}
                className={`group rounded-xl p-5 transition-all duration-300 ${
                  i === 0
                    ? "bg-[#DC2626]/8 ring-1 ring-[#DC2626]/25 dark:bg-[#DC2626]/12 dark:ring-[#DC2626]/30"
                    : "hover:bg-[hsl(var(--surface-muted))]/70 dark:hover:bg-[hsl(var(--surface-muted))]/50"
                }`}
                whileHover={{ scale: i === 0 ? 1.015 : 1.008 }}
                transition={spring}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
                      i === 0
                        ? "bg-[#DC2626] text-white shadow-lg shadow-[#DC2626]/35"
                        : i < 3
                          ? "bg-[hsl(var(--surface-muted))] text-[hsl(var(--foreground))]"
                          : "bg-[hsl(var(--surface-muted))] text-[hsl(var(--muted))] group-hover:bg-[#DC2626]/15 group-hover:text-[#DC2626]"
                    }`}
                  >
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : <span className="text-sm tabular-nums">{i + 1}</span>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`font-semibold text-[hsl(var(--foreground))] ${i === 0 ? "text-lg" : "text-base"}`}>
                      {p.name}
                    </p>
                    <div className="mt-3 flex flex-wrap items-baseline gap-4 text-[13px] text-[hsl(var(--muted))]">
                      <span className={`font-bold tabular-nums tracking-tight ${i === 0 ? "text-[17px] text-[#DC2626]" : "text-[15px] text-[#DC2626] font-semibold"}`}>
                        {formatRubles(p.amount)}
                      </span>
                      <span className="font-medium">{p.count} покупок</span>
                      <span>{p.sharePercent}% от дохода</span>
                    </div>
                    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[hsl(var(--surface-muted))]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(p.sharePercent / maxShare) * 100}%` }}
                        transition={{ duration: 1.1, delay: 0.3 + i * 0.08, ease: [0.32, 0.72, 0.2, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-[#DC2626] to-[#991B1B]"
                      />
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative overflow-hidden rounded-2xl border border-[#DC2626]/20 bg-gradient-to-br from-[#DC2626]/10 via-[#DC2626]/5 to-[#7F1D1D]/6 p-8 sm:p-10 shadow-soft transition-all duration-300 ease-out hover:border-[#DC2626]/30 hover:shadow-glow dark:from-[#DC2626]/14 dark:via-[#DC2626]/8 dark:to-[#7F1D1D]/10 dark:shadow-soft-dark dark:hover:shadow-glow-dark"
        >
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#DC2626]/12 blur-3xl" aria-hidden />
          <div className="absolute bottom-0 left-1/2 h-24 w-48 -translate-x-1/2 rounded-full bg-[#DC2626]/8 blur-2xl" aria-hidden />
          <div className="relative">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DC2626]/15 text-[#DC2626] shadow-sm dark:bg-[#DC2626]/20">
                <Bell className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--foreground))]">
                  Подписка по вашему домену
                </h3>
                <p className="mt-1 text-[12px] text-[hsl(var(--muted))]">
                  Один тариф · рекуррентные платежи
                </p>
              </div>
            </div>
            <p className="mb-8 text-[13px] leading-relaxed text-[hsl(var(--muted))] max-w-lg">
              Количество людей с активной подпиской по вашему домену.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.32, 0.72, 0.2, 1] }}
              className="rounded-2xl border border-[#DC2626]/15 bg-[#DC2626]/5 px-6 py-8 dark:bg-[#DC2626]/8 dark:border-[#DC2626]/20"
            >
              <p className="text-money-hero glow-number text-4xl font-extrabold tabular-nums sm:text-5xl md:text-6xl lg:text-7xl">
                {activeSubscribersByDomain.toLocaleString("ru-RU")}
              </p>
              <p className="mt-3 text-[15px] font-medium text-[hsl(var(--foreground))]">
                активных подписчиков
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
