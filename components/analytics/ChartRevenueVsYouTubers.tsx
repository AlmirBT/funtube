"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { allYouTubersForRanking } from "@/lib/mockData";
import { usdToRub } from "@/lib/currency";

const sortedByRevenue = [...allYouTubersForRanking].sort((a, b) => b.revenueWeek - a.revenueWeek);

export function ChartRevenueVsYouTubers() {
  const data = useMemo(() => {
    const filtered = sortedByRevenue.filter(
      (u) =>
        u.name != null &&
        String(u.name).trim() !== "" &&
        (u.id === "me" || (u.revenueWeek != null && Number(u.revenueWeek) > 0))
    );
    return filtered.map((u) => ({
      name: u.name,
      revenue: u.revenueWeek,
      rub: usdToRub(u.revenueWeek),
      isYou: u.id === "me",
    }));
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.32, 0.72, 0.2, 1] }}
      className="card-surface p-6 sm:p-8"
      aria-label="Доход за неделю: вы vs другие ютуберы"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Доход за неделю: вы vs другие ютуберы
        </h2>
        <p className="text-sm text-[hsl(var(--muted))]">
          Сравнение по доходу за текущую неделю
        </p>
      </div>
      <div className="w-full" style={{ height: Math.max(200, Math.min(420, data.length * 40)) }}>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, left: 60, bottom: 8 }}>
              <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted))" }} tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k ₽` : `${v} ₽`)} />
              <YAxis type="category" dataKey="name" width={56} tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(value: number) => [`${Number(value).toLocaleString("ru-RU")} ₽`, "Доход за неделю"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--surface-elevated))",
                  color: "hsl(var(--foreground))",
                }}
                labelFormatter={(label) => label}
              />
              <Bar dataKey="rub" radius={[0, 6, 6, 0]} maxBarSize={28}>
                {data.map((entry, i) => (
                  <Cell
                    key={entry.name}
                    fill={entry.isYou ? "hsl(var(--accent))" : "hsl(var(--surface-muted))"}
                    className={entry.isYou ? "shadow-[0_0_12px_hsl(var(--accent)/0.45)]" : ""}
                  />
                ))}
              </Bar>
            </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
