"use client";

import { motion } from "framer-motion";
import { Target, Video, Tag, BarChart3 } from "lucide-react";
import { recommendations } from "@/lib/mockData";

const iconMap = {
  video: Video,
  domain: Tag,
  format: BarChart3,
} as const;

export function WhatToDoNext() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0.2, 1] }}
      className="rounded-2xl border-2 border-[#DC2626]/30 bg-gradient-to-br from-[#DC2626]/10 to-[#7F1D1D]/5 p-6 shadow-soft dark:from-[#DC2626]/15 dark:to-[#7F1D1D]/10 dark:shadow-soft-dark"
      aria-label="Что делать дальше"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DC2626]/20 text-[#DC2626]">
          <Target className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
            Что мне делать дальше?
          </h2>
          <p className="text-sm text-[hsl(var(--muted))]">
            Рекомендации на основе вашей аналитики
          </p>
        </div>
      </div>
      <ul className="space-y-4">
        {recommendations.map((r, i) => {
          const Icon = iconMap[r.id as keyof typeof iconMap] ?? Target;
          return (
            <motion.li
              key={r.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.08 }}
              className="flex items-start gap-4 rounded-xl border border-[hsl(var(--border))]/60 bg-[hsl(var(--surface))]/80 p-4 dark:bg-[hsl(var(--surface-muted))]/30"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#DC2626]/10 text-[#DC2626]">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </div>
              <div>
                <p className="font-semibold text-[hsl(var(--foreground))]">{r.title}</p>
                <p className="mt-0.5 text-[13px] text-[hsl(var(--muted))]">{r.subtitle}</p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.section>
  );
}
