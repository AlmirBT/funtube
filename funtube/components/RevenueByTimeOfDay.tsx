"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { Clock } from "lucide-react";
import { revenueByTimeOfDay } from "@/lib/mockData";
import { formatRubles, usdToRub } from "@/lib/currency";

const labels: Record<keyof typeof revenueByTimeOfDay, string> = {
  morning: "Утро (06–12)",
  day: "День (12–18)",
  evening: "Вечер (18–24)",
  night: "Ночь (00–06)",
};

const data = (["morning", "day", "evening", "night"] as const).map((key) => ({
  key,
  name: labels[key],
  value: revenueByTimeOfDay[key],
  rub: usdToRub(revenueByTimeOfDay[key]),
}));

const maxValue = Math.max(...data.map((d) => d.value));
type TimeKey = keyof typeof revenueByTimeOfDay;
const bestKey: TimeKey = data.reduce<TimeKey>((best, d) => (d.value > (data.find((x) => x.key === best)?.value ?? 0) ? d.key : best), "morning");

export function RevenueByTimeOfDay() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0.2, 1] }}
      className="rounded-2xl bg-[hsl(var(--surface))] p-6 shadow-soft dark:shadow-soft-dark sm:p-8 transition-shadow duration-500 hover:shadow-glow-subtle"
      aria-label="Доход по времени суток"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DC2626]/10 text-[#DC2626] shadow-[0_0_16px_-4px_rgba(220,38,38,0.18)] dark:shadow-[0_0_20px_-4px_rgba(220,38,38,0.22)]">
          <Clock className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-base font-semibold tracking-tight text-[hsl(var(--foreground))]">
            Доход по времени суток
          </h2>
          <p className="text-sm text-[hsl(var(--muted))]">
            Когда лучше всего покупают — выпускайте контент в пики
          </p>
        </div>
      </div>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              tick={{ fontSize: 12, fill: "hsl(var(--muted))" }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={32} isAnimationActive>
              {data.map((entry) => (
                <Cell
                  key={entry.key}
                  fill={entry.key === bestKey ? "#DC2626" : "hsl(var(--surface-muted))"}
                  className={entry.key === bestKey ? "drop-shadow-[0_0_8px_rgba(220,38,38,0.4)]" : ""}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {data.map((d) => (
          <div
            key={d.key}
            className={`rounded-xl border px-3 py-2 text-center ${
              d.key === bestKey
                ? "border-[#DC2626]/30 bg-[#DC2626]/10 dark:bg-[#DC2626]/15"
                : "border-[hsl(var(--border))]/60 bg-[hsl(var(--surface-muted))]/30"
            }`}
          >
            <p className="text-[11px] font-medium uppercase tracking-wider text-[hsl(var(--muted))]">
              {d.name.split(" ")[0]}
            </p>
            <p className={`mt-0.5 text-sm font-bold tabular-nums ${d.key === bestKey ? "text-[#DC2626]" : "text-[hsl(var(--foreground))]"}`}>
              {formatRubles(d.value)}
            </p>
          </div>
        ))}
      </div>
      {bestKey === "evening" && (
        <p className="mt-4 rounded-xl bg-[#22C55E]/10 px-4 py-2 text-sm font-medium text-[#22C55E]">
          💡 Ролики лучше выпускать вечером (18–24) — пик покупок
        </p>
      )}
    </motion.section>
  );
}
