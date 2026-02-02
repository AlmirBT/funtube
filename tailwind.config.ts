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
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        logo: ["var(--font-logo)", "var(--font-inter)", "system-ui", "sans-serif"],
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
        soft: "0 1px 3px 0 rgba(0,0,0,0.04), 0 6px 16px -4px rgba(0,0,0,0.04)",
        "soft-lg": "0 4px 20px -4px rgba(0,0,0,0.06), 0 12px 32px -8px rgba(0,0,0,0.04)",
        "soft-dark": "0 1px 3px 0 rgba(0,0,0,0.12), 0 6px 16px -4px rgba(0,0,0,0.2)",
        "soft-dark-lg": "0 4px 20px -4px rgba(0,0,0,0.2), 0 12px 32px -8px rgba(0,0,0,0.15)",
        glow: "0 0 24px -4px rgba(220, 38, 38, 0.2), 0 0 48px -12px rgba(220, 38, 38, 0.1)",
        "glow-lg": "0 0 40px -8px rgba(220, 38, 38, 0.28), 0 0 80px -16px rgba(220, 38, 38, 0.12)",
        "glow-dark": "0 0 32px -4px rgba(220, 38, 38, 0.3), 0 0 64px -12px rgba(220, 38, 38, 0.15)",
        "glow-dark-lg": "0 0 48px -8px rgba(220, 38, 38, 0.35), 0 0 96px -20px rgba(220, 38, 38, 0.18)",
        "glow-subtle": "0 0 20px -6px rgba(220, 38, 38, 0.12)",
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
