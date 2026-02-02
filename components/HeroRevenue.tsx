"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { formatRubles } from "@/lib/currency";

interface HeroRevenueProps {
  value: number;
  deltaPercent: number;
}

export function HeroRevenue({ value, deltaPercent }: HeroRevenueProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const spring = useSpring(0, { stiffness: 30, damping: 24 });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplayValue(Math.round(v)));
    return () => unsub();
  }, [spring]);

  const isPositive = deltaPercent > 0;
  const isNegative = deltaPercent < 0;
  const displayFormatted = formatRubles(displayValue);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.32, 0.72, 0.2, 1] }}
      className="relative overflow-hidden rounded-2xl bg-[hsl(var(--surface))] px-6 py-8 shadow-soft dark:shadow-soft-dark sm:px-10 sm:py-10 md:px-12 md:py-12 transition-shadow duration-500 hover:shadow-glow dark:hover:shadow-glow-dark"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#DC2626]/6 via-transparent to-[#7F1D1D]/4 dark:from-[#DC2626]/12 dark:to-[#7F1D1D]/6" />
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#DC2626]/12 blur-3xl dark:bg-[#DC2626]/18" />
      <div className="absolute -left-12 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-[#DC2626]/8 blur-2xl dark:bg-[#DC2626]/12" />
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.32, 0.72, 0.2, 1] }}
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[#DC2626]/10"
        aria-hidden
      />
      <div className="relative">
        <p className="text-sm font-medium tracking-tight text-[hsl(var(--muted))] sm:text-base">
          Ваш доход за сегодня
        </p>
        <p className="mt-2 text-4xl font-bold tracking-tight tabular-nums text-[#DC2626] drop-shadow-[0_0_20px_rgba(220,38,38,0.25)] sm:text-5xl md:text-6xl dark:drop-shadow-[0_0_24px_rgba(220,38,38,0.35)]">
          {displayFormatted}
        </p>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.32, 0.72, 0.2, 1] }}
          className={`mt-3 inline-flex items-center gap-1.5 text-sm font-semibold tabular-nums sm:text-base ${
            isPositive
              ? "text-[#22C55E]"
              : isNegative
                ? "text-[#EF4444]"
                : "text-amber-600 dark:text-amber-400"
          }`}
        >
          {isPositive ? "+" : ""}{deltaPercent.toFixed(1)}% к вчерашнему дню
        </motion.p>
      </div>
      <div
        className="absolute -bottom-12 left-1/2 h-28 w-4/5 -translate-x-1/2 rounded-full bg-[#DC2626]/15 blur-3xl dark:bg-[#DC2626]/25"
        aria-hidden
      />
    </motion.section>
  );
}
