import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import { DomainsProvider } from "@/components/DomainsContext";
import { Sidebar } from "@/components/Sidebar";
import { DomainDrawer } from "@/components/DomainDrawer";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "funtube — Профессиональная аналитика для авторов",
  description:
    "Панель для ютуберов, зарабатывающих на промо-кодах. Мгновенная картина дохода, аудитории и конверсий, сравнение периодов и конкурентов. YouTube Studio для денег.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${manrope.variable} ${unbounded.variable} font-sans scrollbar-premium`}>
        <ThemeProvider>
          <DomainsProvider>
            <div className="flex min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-colors duration-300 scrollbar-premium">
              <Sidebar />
              <main className="flex-1 overflow-x-hidden md:pl-[260px]">
                {children}
              </main>
            </div>
            <DomainDrawer />
          </DomainsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
