# Personal Website — Project Summary

**Live URL:** [manojksampathi.com](https://manojksampathi.com)
**Repo:** [github.com/manojksampathi/personal-website](https://github.com/manojksampathi/personal-website)

---

## Goal

Build a personal/professional website (Next.js, deployed on Vercel) that showcases analytics work across multiple domains. Features:

- Landing page (about Manoj, skills, links)
- Analytics Portfolio section (`/analytics`) with multiple domain dashboards
- First domain: Retail (uses Crest fictional company data from BigQuery)
- AI chat per dashboard (Claude API with tool use) — gated by auth
  - Chat is INDEPENDENT of dashboard: charts render INSIDE the chat thread (like ChatGPT renders code blocks)
  - Dashboard refreshes ONLY on its own filter changes, NOT on chat questions
- Future domains: Finance, Healthcare, etc.

---

## Architecture

### Site map

```
manojksampathi.com (personal-website on Vercel)
│
├── /                              → Landing (personal intro)
├── /about                         → About
├── /analytics                     → Analytics Portfolio hub
│   ├── /analytics/retail          → Retail dashboard - PUBLIC
│   │   └── /analytics/retail/chat → AI chat - GATED (login required)
│   ├── /analytics/finance         → Future
│   └── /analytics/healthcare      → Future
└── /blog, /contact                → Future
```

### Tech stack (locked)

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Charts | Recharts |
| BigQuery SDK | `@google-cloud/bigquery` |
| AI SDK | `@anthropic-ai/sdk` + Vercel AI SDK |
| Auth | NextAuth.js (Phase 5) |
| Hosting | Vercel |
| Domain | manojksampathi.com (Cloudflare registrar) |

### Folder structure

```
VSCODE FILES/
├── personal-website/              ← This Next.js project (deployed)
│   ├── app/
│   ├── components/ui/             ← shadcn components installed
│   ├── lib/utils.ts
│   ├── scripts/test-connections.ts
│   ├── .env.local                 ← Secrets (gitignored)
│   ├── package.json
│   └── SUMMARY.md                 ← This file
│
└── analytics-portfolio/           ← Parent for data backend work
    ├── retail-analytics/          ← dbt + BigQuery for retail (Crest data)
    │   ├── data_generation/
    │   ├── queries/
    │   ├── dashboard/             ← Old HTML preview (reference only)
    │   ├── crest-bq-key.json      ← BigQuery service account
    │   └── SUMMARY.md             ← Retail data project summary
    ├── finance-analytics/         ← Future
    └── healthcare-analytics/      ← Future
```

---

## Sessions

### Session 1 — 2026-05-25 (Sunday) — Phase 1 Foundation

**Outcome:** Personal website is LIVE at manojksampathi.com.

#### Decisions made
- Next.js over Streamlit/iframes for production-quality portfolio
- Folder structure: separate `personal-website/` (web) from `analytics-portfolio/` (data)
- Custom domain: bought `manojksampathi.com` ($9.77/year on Cloudflare)
- Auth approach: dashboards public, chat gated (added in Phase 5)
- Repo visibility: public (open-source portfolio)

#### Steps completed
1. ✅ Bootstrapped Next.js 15 + TypeScript + Tailwind + App Router
2. ✅ Installed dependencies: `@google-cloud/bigquery`, `@anthropic-ai/sdk`, `ai`, `@ai-sdk/anthropic`, `recharts`, `lucide-react`, `date-fns`, `clsx`, `tailwind-merge`
3. ✅ Initialized shadcn/ui with Radix preset, added 7 base components (button, card, input, dialog, dropdown-menu, badge, skeleton)
4. ✅ Set up `.env.local` with secrets (verified gitignored)
5. ✅ Created sanity check script (`scripts/test-connections.ts`) — verified BigQuery (1.18M rows) + Anthropic both working
6. ✅ Published to GitHub (public repo: `manojksampathi/personal-website`)
7. ✅ Deployed to Vercel with environment variables
8. ✅ Bought domain `manojksampathi.com` on Cloudflare ($9.77/year)
9. ✅ Connected domain to Vercel via "Auto configure" (Vercel managed Cloudflare DNS automatically)
10. ✅ SSL auto-provisioned via Let's Encrypt
11. ✅ Updated `NEXTAUTH_URL` env var to `https://manojksampathi.com` + redeployed

#### Files in repo (Phase 1 baseline)
- Standard Next.js scaffolding (`app/`, `public/`, configs)
- shadcn components in `components/ui/`
- Helper utilities in `lib/utils.ts`
- Connection test script in `scripts/test-connections.ts`

#### Environment variables configured
- `GOOGLE_PROJECT_ID` = `retail-analytics-495420`
- `GOOGLE_APPLICATION_CREDENTIALS_JSON` = (full BQ service account JSON, one line)
- `ANTHROPIC_API_KEY` = (user's Anthropic API key)
- `NEXTAUTH_SECRET` = (generated 32-byte base64)
- `NEXTAUTH_URL` = `https://manojksampathi.com`

#### Currently visible at manojksampathi.com
- Default Next.js welcome page ("To get started, edit the page.tsx file")
- Phase 2 will replace this with the actual landing page

---

## Next Phase

### Phase 2 — Site Shell (estimated 2-3 hours)

**Goal:** Replace the Next.js default page with a real personal website. By the end of Phase 2, manojksampathi.com shows a proper landing page + analytics hub.

#### To do in Phase 2

1. **Design decisions** (pick before coding)
   - Color palette (modern slate? warm amber? bold green? gradient?)
   - Landing layout (hero + skills grid? terminal-style? magazine layout?)
   - Typography (Inter is default — keep or swap?)

2. **Build root layout + top navigation**
   - `app/layout.tsx` updated with `<Nav />` component
   - Logo (Manoj initials or icon), nav links (Home, About, Analytics, Contact)
   - Mobile-responsive hamburger menu
   - Optional: theme toggle (light/dark)

3. **Build landing page** (`app/page.tsx`)
   - Hero section: name, tagline, photo, primary CTA ("View Analytics Work")
   - About snippet: 2-3 sentences
   - Skills grid (cards or pills): SQL, dbt, BigQuery, Python, React, etc.
   - Featured project: Crest Retail Analytics card linking to `/analytics/retail`
   - Footer: social links (LinkedIn, GitHub, email)

4. **Build Analytics Hub** (`app/analytics/page.tsx`)
   - Page title: "Analytics Portfolio"
   - Description: "End-to-end analytics projects across industries"
   - Grid of domain cards:
     - 🛍️ Retail Analytics — **Live** → `/analytics/retail`
     - 💰 Finance Analytics — Coming Soon
     - 🏥 Healthcare Analytics — Coming Soon

5. **Build placeholder pages**
   - `app/analytics/finance/page.tsx` — "Coming Soon" with skeleton/teaser
   - `app/analytics/healthcare/page.tsx` — same pattern
   - Optional: `app/about/page.tsx`

6. **Polish**
   - Favicon + OG image (preview when shared on LinkedIn/Twitter)
   - Page transitions / loading states
   - SEO meta tags

7. **Deploy + verify**
   - `git push origin main` → Vercel auto-deploys
   - Verify on manojksampathi.com

---

### Phase 3 — Retail Dashboard (estimated 3-4 hours)

Build the actual BI dashboard at `/analytics/retail` using data from `dbt_dev_crest_sales_mart`.

#### Components to build
- **API route:** `app/api/retail/dashboard/route.ts` — runs SQL against BigQuery, returns JSON
- **KPI cards:** Total Revenue, Orders, AOV, Return Rate (4 cards)
- **Charts:** Revenue trend (line), Channel mix (donut), Top regions (bar), Top products (bar) — using Recharts
- **Filters:** Date range picker, Region dropdown — re-query API on change
- **Layout:** Sidebar with filters + main canvas with KPIs + charts

#### BigQuery tables to query
- `retail-analytics-495420.dbt_dev_crest_sales_mart.fact_sales` (1.18M rows)
- `dim_customers`, `dim_products`, `dim_stores`, `dim_dates`

---

### Phase 4 — AI Chat (estimated 4-5 hours) — The showpiece

Build the AI agent at `/analytics/retail/chat`.

#### Components
- Chat UI: streaming message thread, input box, history
- API route: `app/api/retail/chat/route.ts` using Vercel AI SDK
- Claude system prompt: schema-aware (knows mart structure)
- Tool: `run_sql(query)` — executes against BigQuery (read-only, row limits, 10s timeout)
- Tool: `render_chart(spec)` — returns Recharts JSON spec
- Frontend renders charts inline (like ChatGPT renders code blocks)

#### Safety constraints
- SQL must be SELECT only (no DML/DDL)
- Row limit: 10,000 max
- Query timeout: 10s
- Rate limit per session

---

### Phase 5 — Auth (estimated 2-3 hours)

Add login gate to the chat route only.

#### To do
- Install NextAuth.js
- Configure Google OAuth provider
- Middleware that protects `/analytics/*/chat/*` routes
- Sign-in page (`app/(auth)/signin/page.tsx`)
- Sign-out flow

---

### Phase 6 — Polish + Launch (estimated 2-3 hours)

- Real photo + bio content
- README on GitHub
- Demo video (Loom) for LinkedIn
- Update resume with manojksampathi.com link
- Share with friends for feedback

---

## Quick reference

### Local dev
```bash
cd "/Users/manojkumarsampathi/Desktop/VSCODE FILES/personal-website"
npm run dev
# → http://localhost:3000
```

### Test BigQuery + Anthropic connections
```bash
npx tsx scripts/test-connections.ts
```

### Deploy
```bash
# Just push to main — Vercel auto-deploys
git add . && git commit -m "..." && git push origin main
```

### View env vars
```bash
cat .env.local
```

---

## Resume tomorrow

When picking this up next session:

1. Read this `SUMMARY.md` first (covers everything)
2. Decision needed: **What design direction for the landing page?**
   - Pick a vibe (minimal/professional vs colorful/creative)
   - Pick a layout style
   - Pick colors
3. Then we start building Phase 2 (landing page + nav + analytics hub)

Or to just say "let's start Phase 2" — we'll pick design choices together.
