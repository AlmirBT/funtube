"use client";

import { motion } from "framer-motion";
import { Medal } from "lucide-react";
import { allYouTubersForRanking } from "@/lib/mockData";
import { formatRubles } from "@/lib/currency";

const sorted = [...allYouTubersForRanking].sort((a, b) => b.revenueWeek - a.revenueWeek);
const myRank = sorted.findIndex((u) => u.id === "me") + 1;
const total = sorted.length;
const myStats = sorted.find((u) => u.id === "me");

export function YourRankCard() {
  if (!myStats) return null;

  const percentBetter = total > 0 ? Math.round(((total - myRank + 1) / total) * 100) : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0.2, 1] }}
      className="card-surface bg-gradient-to-br from-[hsl(var(--accent))]/12 to-[hsl(var(--accent-dark))]/10 p-6"
      aria-label="Ваше место в рейтинге"
    >
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--accent))]/20 text-[hsl(var(--accent))]">
            <Medal className="h-7 w-7" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
              Ваше место в рейтинге
            </h2>
            <p className="mt-1 flex items-center gap-2 text-2xl font-bold tabular-nums text-[hsl(var(--accent))]">
              {myRank === 1 ? "🥇" : myRank === 2 ? "🥈" : myRank === 3 ? "🥉" : null}
              {myRank} из {total}
            </p>
            <p className="mt-0.5 text-sm text-[hsl(var(--muted))]">
              piona лучше {percentBetter}% ютуберов по доходу за неделю
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="text-center">
            <p className="text-[11px] font-medium uppercase tracking-wider text-[hsl(var(--muted))]">
              Доход за неделю
            </p>
            <p className="mt-1 text-xl font-bold tabular-nums text-[hsl(var(--foreground))]">
              {formatRubles(myStats.revenueWeek)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[11px] font-medium uppercase tracking-wider text-[hsl(var(--muted))]">
              Конверсия
            </p>
            <p className="mt-1 text-xl font-bold tabular-nums text-emerald-500">
              {myStats.conversion}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-[11px] font-medium uppercase tracking-wider text-[hsl(var(--muted))]">
              Новички
            </p>
            <p className="mt-1 text-xl font-bold tabular-nums text-[hsl(var(--accent))]">
              {myStats.attractedUsers.toLocaleString("ru-RU")}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
