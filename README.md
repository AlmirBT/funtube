# funtube

Analytics dashboard for YouTubers and influencers who earn through promo codes (subscriptions, services, purchases).

**Live:** [https://almirbt.github.io/funtube/](https://almirbt.github.io/funtube/)

## Stack

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Recharts**
- **Lucide React** (icons)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/dashboard`.

For local dev the app is at the root; for production (GitHub Pages) it runs under `/funtube` (see `next.config.js`).

## Features

- **Dashboard** — KPI cards, revenue/purchases chart, filters, purchases table, top stats
- **Analytics** — Chart and top statistics (second page)
- **Light / Dark theme** — Toggle in sidebar (desktop) or header (mobile), smooth transitions
- **Responsive** — Desktop-first, tablet and mobile supported
- **Mock data only** — No backend; all data from `lib/mockData.ts`

## Project structure

```
app/
  layout.tsx          # Root layout, theme, sidebar
  page.tsx            # Redirect to /dashboard
  ThemeProvider.tsx    # Theme context (light/dark)
  dashboard/
    page.tsx          # Main dashboard
    analytics/
      page.tsx        # Analytics page
components/
  StatCard.tsx        # KPI stat cards
  RevenueChart.tsx    # Interactive area chart (Recharts)
  Filters.tsx        # Date range, type, search
  PurchasesTable.tsx  # Table with sort, pagination, skeleton, empty state
  TopStats.tsx       # Top purchases, users, promo codes, subscriptions count
  ThemeToggle.tsx    # Light/dark switch
  Sidebar.tsx        # Navigation + branding
lib/
  mockData.ts        # All mock data
```

## Build

```bash
npm run build
```

Static export writes to `out/`. To run the built app locally (without basePath): `npm start` (uses `.next`; for static export you’d serve `out/` with basePath `/funtube`).

## GitHub Pages

The project is set up for **GitHub Pages** at **https://almirbt.github.io/funtube/**.

1. Create a repository named **funtube** on GitHub (user **almirbt**).
2. Push this project to the `main` branch.
3. In the repo: **Settings → Pages → Build and deployment**:
   - Source: **GitHub Actions**.
4. Each push to `main` runs the workflow `.github/workflows/deploy-pages.yml`: it builds the static export and deploys the `out` folder to GitHub Pages.

After the first successful run, the site will be available at **https://almirbt.github.io/funtube/**.
