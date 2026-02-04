import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        logo: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        accent: {
          DEFAULT: "hsl(var(--accent))",
          muted: "hsl(var(--accent-muted))",
          foreground: "hsl(var(--accent-foreground))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          elevated: "hsl(var(--surface-elevated))",
          muted: "hsl(var(--surface-muted))",
        },
        success: "hsl(var(--success))",
        destructive: "hsl(var(--destructive))",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(15, 23, 42, 0.05), 0 14px 28px -18px rgba(15, 23, 42, 0.35)",
        "soft-lg": "0 10px 30px -18px rgba(15, 23, 42, 0.45), 0 28px 60px -40px rgba(15, 23, 42, 0.35)",
        "soft-dark": "0 2px 6px rgba(2, 6, 23, 0.35), 0 16px 32px -18px rgba(2, 6, 23, 0.75)",
        "soft-dark-lg": "0 12px 40px -20px rgba(2, 6, 23, 0.8), 0 32px 70px -42px rgba(2, 6, 23, 0.75)",
        glow: "0 0 28px -8px rgba(255, 60, 60, 0.35), 0 0 60px -24px rgba(255, 60, 60, 0.22)",
        "glow-lg": "0 0 46px -16px rgba(255, 60, 60, 0.45), 0 0 90px -28px rgba(255, 60, 60, 0.28)",
        "glow-dark": "0 0 34px -10px rgba(255, 80, 80, 0.45), 0 0 70px -26px rgba(255, 80, 80, 0.25)",
        "glow-dark-lg": "0 0 54px -18px rgba(255, 80, 80, 0.55), 0 0 120px -40px rgba(255, 80, 80, 0.3)",
        "glow-subtle": "0 0 20px -10px rgba(255, 60, 60, 0.2)",
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
      },
    },
  },
  plugins: [],
};

export default config;
