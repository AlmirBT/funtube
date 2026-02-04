"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { allYouTubersForRanking } from "@/lib/mockData";

const sortedByPurchases = [...allYouTubersForRanking].sort((a, b) => b.purchasesCount - a.purchasesCount);

export function ChartPurchasesVsYouTubers() {
  const data = useMemo(() => {
    const filtered = sortedByPurchases.filter(
      (u) =>
        u.name != null &&
        String(u.name).trim() !== "" &&
        (u.id === "me" || (u.purchasesCount != null && Number(u.purchasesCount) > 0))
    );
    return filtered.map((u) => ({
      name: u.name,
      purchases: u.purchasesCount,
      isYou: u.id === "me",
    }));
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08, ease: [0.32, 0.72, 0.2, 1] }}
      className="card-surface p-6 sm:p-8"
      aria-label="Покупок за период: вы vs другие ютуберы"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Покупок за период: вы vs другие
        </h2>
        <p className="text-sm text-[hsl(var(--muted))]">
          Количество покупок по домену
        </p>
      </div>
      <div className="w-full" style={{ height: Math.max(200, Math.min(420, data.length * 40)) }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, left: 60, bottom: 8 }}>
            <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted))" }} tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v))} />
            <YAxis type="category" dataKey="name" width={56} tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(value: number) => [value.toLocaleString("ru-RU"), "Покупок"]}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--surface-elevated))",
                color: "hsl(var(--foreground))",
              }}
              labelFormatter={(label) => label}
            />
            <Bar dataKey="purchases" radius={[0, 6, 6, 0]} maxBarSize={28}>
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.isYou ? "hsl(var(--accent))" : "hsl(var(--surface-muted))"}
                  className={entry.isYou ? "shadow-[0_0_10px_hsl(var(--accent)/0.4)]" : ""}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
