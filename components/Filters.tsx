"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, X, Globe } from "lucide-react";
import type { PurchaseType } from "@/lib/mockData";
import { domainFilterOptions } from "@/lib/mockData";

const dateOptions = [
  { value: "today", label: "За текущий день" },
  { value: "24h", label: "За 24ч" },
  { value: "week", label: "За неделю" },
  { value: "month", label: "За месяц" },
  { value: "custom", label: "Свой диапазон" },
] as const;

const typeOptions: { value: PurchaseType | "all"; label: string }[] = [
  { value: "all", label: "Все разделы" },
  { value: "privileges", label: "Привилегии" },
  { value: "promotions", label: "Акции" },
  { value: "cases", label: "Кейсы" },
  { value: "tokens", label: "Токены" },
  { value: "services", label: "Услуги" },
  { value: "subscription", label: "Подписка" },
];

export interface FiltersState {
  dateRange: (typeof dateOptions)[number]["value"];
  purchaseType: PurchaseType | "all";
  domain: string;
  search: string;
  customFrom?: string;
  customTo?: string;
}

const defaultFilters: FiltersState = {
  dateRange: "today",
  purchaseType: "all",
  domain: "",
  search: "",
};

interface FiltersProps {
  filters: FiltersState;
  onFiltersChange: (f: FiltersState) => void;
}

export function Filters({ filters, onFiltersChange }: FiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange({ ...filters, search: searchInput.trim() });
  };

  const hasActiveFilters =
    filters.dateRange !== defaultFilters.dateRange ||
    (filters.dateRange === "custom" && (filters.customFrom || filters.customTo)) ||
    filters.purchaseType !== defaultFilters.purchaseType ||
    filters.domain !== defaultFilters.domain ||
    filters.search.trim() !== "";

  const handleReset = () => {
    setSearchInput("");
    onFiltersChange({ ...defaultFilters, customFrom: undefined, customTo: undefined });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-4"
      aria-label="Фильтры"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--surface-muted))] text-[hsl(var(--muted))]">
          <Calendar className="h-4 w-4" strokeWidth={1.8} />
        </span>
        {dateOptions.map((opt) => (
          <motion.button
            key={opt.value}
            type="button"
            onClick={() =>
              onFiltersChange({
                ...filters,
                dateRange: opt.value,
                ...(opt.value !== "custom" ? { customFrom: undefined, customTo: undefined } : {}),
              })
            }
            whileTap={{ scale: 0.97 }}
            className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ease-out ${
              filters.dateRange === opt.value
                ? "bg-[#DC2626] text-white shadow-md shadow-[#DC2626]/25 ring-2 ring-[#DC2626]/30 ring-offset-2 ring-offset-[hsl(var(--background))] dark:ring-offset-[hsl(var(--background))]"
                : "bg-[hsl(var(--surface-muted))] text-[hsl(var(--muted))] hover:bg-[hsl(var(--surface-muted))]/80 hover:text-[hsl(var(--foreground))]"
            }`}
          >
            {opt.label}
          </motion.button>
        ))}
        {filters.dateRange === "custom" && (
          <span className="flex flex-wrap items-center gap-2">
            <input
              type="date"
              value={filters.customFrom ?? ""}
              onChange={(e) =>
                onFiltersChange({ ...filters, customFrom: e.target.value || undefined })
              }
              className="rounded-lg border border-[hsl(var(--border))]/90 bg-[hsl(var(--surface))] px-3 py-2 text-[13px]"
            />
            <span className="text-[hsl(var(--muted))]">—</span>
            <input
              type="date"
              value={filters.customTo ?? ""}
              onChange={(e) =>
                onFiltersChange({ ...filters, customTo: e.target.value || undefined })
              }
              className="rounded-lg border border-[hsl(var(--border))]/90 bg-[hsl(var(--surface))] px-3 py-2 text-[13px]"
            />
          </span>
        )}
        <span className="mx-2 h-4 w-px bg-[hsl(var(--border))]" aria-hidden />
        {typeOptions.map((opt) => (
          <motion.button
            key={opt.value}
            type="button"
            onClick={() => onFiltersChange({ ...filters, purchaseType: opt.value })}
            whileTap={{ scale: 0.97 }}
            className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ease-out ${
              filters.purchaseType === opt.value
                ? "bg-[#DC2626] text-white shadow-md shadow-[#DC2626]/25 ring-2 ring-[#DC2626]/30 ring-offset-2 ring-offset-[hsl(var(--background))] dark:ring-offset-[hsl(var(--background))]"
                : "bg-[hsl(var(--surface-muted))] text-[hsl(var(--muted))] hover:bg-[hsl(var(--surface-muted))]/80 hover:text-[hsl(var(--foreground))]"
            }`}
          >
            {opt.label}
          </motion.button>
        ))}
        <span className="mx-2 h-4 w-px bg-[hsl(var(--border))]" aria-hidden />
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--surface-muted))] text-[hsl(var(--muted))]">
          <Globe className="h-4 w-4" strokeWidth={1.8} />
        </span>
        <select
          value={filters.domain}
          onChange={(e) => onFiltersChange({ ...filters, domain: e.target.value })}
          className="rounded-full border border-[hsl(var(--border))]/90 bg-[hsl(var(--surface))] px-4 py-2 text-[13px] font-medium text-[hsl(var(--foreground))] focus:border-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20"
        >
          <option value="">Все домены</option>
          {domainFilterOptions.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {hasActiveFilters && (
          <motion.button
            type="button"
            onClick={handleReset}
            className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] text-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
          >
            <X className="h-3.5 w-3.5" />
            Сбросить
          </motion.button>
        )}
      </div>

      <form onSubmit={handleSearchSubmit} className="flex flex-1 min-w-0 max-w-sm gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted))]" />
          <input
            type="search"
            placeholder="Поиск по нику..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-full border border-[hsl(var(--border))]/90 bg-[hsl(var(--surface))] py-2 pl-10 pr-4 text-[13px] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted))] transition-all duration-300 ease-out focus:border-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 hover:border-[hsl(var(--border))]"
          />
        </div>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          className="shrink-0 rounded-full bg-[#DC2626] px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-92 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:ring-offset-2"
        >
          Поиск
        </motion.button>
      </form>
    </motion.section>
  );
}
