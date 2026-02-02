"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { revenueForecast } from "@/lib/mockData";
import { formatRubles } from "@/lib/currency";

export function RevenueForecast() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: [0.32, 0.72, 0.2, 1] }}
      className="flex h-full flex-col rounded-2xl border border-[hsl(var(--border))]/50 bg-[hsl(var(--surface))] p-6 shadow-sm dark:border-[hsl(var(--border))]/40 dark:shadow-none"
      aria-label="Прогноз дохода"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--surface-muted))] text-[#22C55E]">
          <TrendingUp className="h-4 w-4" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-[hsl(var(--foreground))]">
            Прогноз дохода
          </h3>
          <p className="text-xs text-[hsl(var(--muted))]">
            При сохранении текущего темпа
          </p>
        </div>
      </div>
      <div className="mt-6 grid flex-1 grid-cols-2 gap-4">
        <div className="flex flex-col">
          <p className="text-xs font-medium text-[hsl(var(--muted))]">
            К концу дня
          </p>
          <p className="mt-1 text-xl font-semibold tabular-nums tracking-tight text-[hsl(var(--foreground))]">
            {formatRubles(revenueForecast.day)}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-medium text-[hsl(var(--muted))]">
            За неделю
          </p>
          <p className="mt-1 text-xl font-semibold tabular-nums tracking-tight text-[#22C55E]">
            {formatRubles(revenueForecast.week)}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
