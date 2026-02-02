import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import { DomainsProvider } from "@/components/DomainsContext";
import { Sidebar } from "@/components/Sidebar";
import { DomainDrawer } from "@/components/DomainDrawer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-logo",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "funtube — Аналитика для авторов",
  description:
    "Аналитическая панель для ютуберов, зарабатывающих на промо-кодах. Мгновенное понимание дохода, аналитика по пользователям, сравнение периодов и авторов. YouTube Studio для денег.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans scrollbar-premium`}>
        <ThemeProvider>
          <DomainsProvider>
            <div className="flex min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-colors duration-300 scrollbar-premium">
              <Sidebar />
              <main className="flex-1 overflow-x-hidden md:pl-[240px]">
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
