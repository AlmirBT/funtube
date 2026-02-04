"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { YouTubersLeaderboard } from "@/components/YouTubersLeaderboard";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen pt-14 md:pt-0 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-20 right-[-5%] h-72 w-72 rounded-full bg-[hsl(var(--accent))]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-64 w-64 rounded-full bg-[hsl(var(--accent))]/8 blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10 flex flex-wrap items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              aria-label="Назад к дашборду"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[hsl(var(--border))]/70 bg-[hsl(var(--surface))]/80 text-[hsl(var(--muted))] transition-colors hover:bg-[hsl(var(--surface-muted))] hover:text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                Рейтинг ютуберов
              </h1>
              <p className="mt-2 text-sm text-[hsl(var(--muted))] sm:text-base">
                Нажмите на ник, чтобы открыть аналитику автора и сравнить результаты.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="chip">Лидеры недели</span>
            <span className="chip">Период: неделя</span>
          </div>
        </motion.header>

        <section aria-label="Рейтинг ютуберов">
          <YouTubersLeaderboard />
        </section>
      </div>
    </div>
  );
}
