"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DollarSign, Calendar, TrendingUp, CalendarDays, Users, Globe, Percent } from "lucide-react";
import { HeroRevenue } from "@/components/HeroRevenue";
import { StatCard } from "@/components/StatCard";
import { RevenueChart } from "@/components/RevenueChart";
import { TopAnalytics } from "@/components/TopAnalytics";
import { Filters } from "@/components/Filters";
import { PurchasesTable } from "@/components/PurchasesTable";
import { SideDrawer } from "@/components/SideDrawer";
import { PurchasesReport } from "@/components/PurchasesReport";
import {
  kpiStats,
  kpiSparklines,
  kpiContext,
  purchases,
} from "@/lib/mockData";
import type { FiltersState } from "@/components/Filters";
import type { Purchase } from "@/lib/mockData";
import { formatRubles } from "@/lib/currency";
import { getRangeMSK, isDateInRange } from "@/lib/dateUtils";

const defaultFilters: FiltersState = {
  dateRange: "today",
  purchaseType: "all",
  domain: "",
  search: "",
};

export default function DashboardPage() {
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

  const purchasesInPeriod = useMemo(() => {
    const range = getRangeMSK(
      filters.dateRange as "today" | "24h" | "week" | "month" | "custom",
      filters.customFrom,
      filters.customTo
    );
    let list = purchases.filter((p) =>
      isDateInRange(p.date, range.from, range.to)
    );
    if (filters.domain) {
      list = list.filter((p) => p.domain === filters.domain);
    }
    return list;
  }, [filters.dateRange, filters.customFrom, filters.customTo, filters.domain]);

  const handleShowDemo = () => {
    setFilters(defaultFilters);
  };

  return (
    <div className="min-h-screen pt-14 md:pt-0 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#DC2626]/[0.04] blur-3xl dark:bg-[#DC2626]/[0.06]" />
        <div className="absolute top-1/2 -left-40 h-72 w-72 rounded-full bg-[#DC2626]/[0.03] blur-3xl dark:bg-[#DC2626]/[0.05]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <section className="mb-10" aria-label="Ваш доход за сегодня">
          <HeroRevenue
            value={kpiStats.revenueToday}
            deltaPercent={kpiStats.revenueTodayDelta}
          />
        </section>

        <section
          className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Доход по периодам"
        >
          <StatCard
            index={0}
            title="Доход за сегодня"
            value={formatRubles(kpiStats.revenueToday)}
            delta={kpiStats.revenueTodayDelta}
            icon={DollarSign}
            sparklineData={kpiSparklines.today}
            contextText={kpiContext.today}
          />
          <StatCard
            index={1}
            title="Доход за вчера (в это же время)"
            value={formatRubles(kpiStats.revenueYesterdaySameTime)}
            icon={Calendar}
            sparklineData={kpiSparklines.yesterday}
            contextText={kpiContext.yesterday}
          />
          <StatCard
            index={2}
            title="Доход за неделю"
            value={formatRubles(kpiStats.revenueThisWeek)}
            delta={kpiStats.revenueThisWeekDelta}
            icon={TrendingUp}
            sparklineData={kpiSparklines.week}
            contextText={kpiContext.week}
          />
          <StatCard
            index={3}
            title="Доход за месяц"
            value={formatRubles(kpiStats.revenueThisMonth)}
            delta={kpiStats.revenueThisMonthDelta}
            icon={CalendarDays}
            sparklineData={kpiSparklines.month}
            contextText={kpiContext.month}
          />
        </section>

        <section className="mb-8" aria-label="Фильтры">
          <Filters filters={filters} onFiltersChange={setFilters} />
        </section>

        <section className="mb-12" aria-label="График с аналитикой">
          <RevenueChart filters={filters} />
        </section>

        <section className="mb-12" aria-label="Топ-аналитика">
          <TopAnalytics />
        </section>

        <section className="mb-8" aria-label="Отчёт по покупкам">
          <PurchasesReport purchases={purchasesInPeriod} filters={filters} />
        </section>

        <section className="mb-12" aria-label="Список покупок">
          <h2 className="mb-4 text-sm font-medium tracking-tight text-[hsl(var(--muted))]">
            Список покупок
          </h2>
          <PurchasesTable
            purchases={purchasesInPeriod}
            filters={filters}
            isLoading={tableLoading}
            onRowClick={setSelectedPurchase}
            onShowDemo={handleShowDemo}
          />
        </section>
      </div>

      <SideDrawer purchase={selectedPurchase} onClose={() => setSelectedPurchase(null)} />
    </div>
  );
}
