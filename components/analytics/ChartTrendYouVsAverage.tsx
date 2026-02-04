"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { currentYouTuberStats, otherYouTubersStats } from "@/lib/mockData";
import { usdToRub } from "@/lib/currency";

const DAY_LABELS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export function ChartTrendYouVsAverage() {
  const data = useMemo(() => {
    const len = currentYouTuberStats.sparkline.length;
    return Array.from({ length: len }, (_, i) => {
      const you = currentYouTuberStats.sparkline[i] ?? 0;
      const avg =
        otherYouTubersStats.length > 0
          ? otherYouTubersStats.reduce((s, u) => s + (u.sparkline[i] ?? 0), 0) / otherYouTubersStats.length
          : 0;
      return {
        day: DAY_LABELS[i] ?? `День ${i + 1}`,
        you,
        average: Math.round(avg),
        youRub: usdToRub(you),
        averageRub: usdToRub(avg),
      };
    });
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05, ease: [0.32, 0.72, 0.2, 1] }}
      className="card-surface p-6 sm:p-8"
      aria-label="Динамика дохода за 7 дней: вы vs средний ютубер"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Динамика дохода за 7 дней
        </h2>
        <p className="text-sm text-[hsl(var(--muted))]">
          piona vs средний показатель других ютуберов
        </p>
      </div>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} opacity={0.6} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted))" }} stroke="hsl(var(--muted))" tickLine={false} axisLine={false} />
            <YAxis
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k ₽` : `${v} ₽`)}
              tick={{ fontSize: 11, fill: "hsl(var(--muted))" }}
              stroke="hsl(var(--muted))"
              tickLine={false}
              axisLine={false}
              width={48}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `${Number(value).toLocaleString("ru-RU")} ₽`,
                name === "you" ? "piona" : "Средний ютубер",
              ]}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--surface-elevated))",
                color: "hsl(var(--foreground))",
              }}
              labelFormatter={(label) => label}
            />
            <Legend
              formatter={(value) => (value === "you" ? "piona" : "Средний ютубер")}
              wrapperStyle={{ fontSize: 12 }}
              iconType="line"
              iconSize={10}
            />
            <Line
              type="monotone"
              dataKey="youRub"
              name="you"
              stroke="hsl(var(--accent))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--accent))", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: "hsl(var(--accent))", stroke: "hsl(var(--surface))", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="averageRub"
              name="average"
              stroke="hsl(var(--muted))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "hsl(var(--muted))", strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
