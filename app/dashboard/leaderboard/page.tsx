"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { YouTubersLeaderboard } from "@/components/YouTubersLeaderboard";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen pt-14 md:pt-0 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-[#DC2626]/[0.05] blur-3xl dark:bg-[#DC2626]/[0.08]" />
        <div className="absolute bottom-0 -left-32 h-56 w-56 rounded-full bg-[#DC2626]/[0.04] blur-3xl dark:bg-[#DC2626]/[0.06]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10 flex items-center gap-4"
        >
          <Link
            href="/dashboard"
            aria-label="Назад к дашборду"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[hsl(var(--border))]/80 bg-[hsl(var(--surface))] text-[hsl(var(--muted))] transition-colors hover:bg-[hsl(var(--surface-muted))] hover:text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
              Рейтинг ютуберов
            </h1>
            <p className="text-sm text-[hsl(var(--muted))]">
              Нажмите на ник, чтобы перейти к его аналитике. Сравните себя с другими.
            </p>
          </div>
        </motion.header>

        <section aria-label="Рейтинг ютуберов">
          <YouTubersLeaderboard />
        </section>
      </div>
    </div>
  );
}
