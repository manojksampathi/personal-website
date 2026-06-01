import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  BarChart3,
  Database,
  GitBranch,
  Bot,
  Check,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { query, TABLES } from "@/lib/bigquery";
import {
  formatMoney,
  formatNumber,
  formatPct,
} from "@/lib/format";

// Cache the page for 1 hour — KPIs don't change often (synthetic data)
export const revalidate = 3600;

type KpiRow = {
  total_revenue: number;
  total_orders: number;
  avg_order_value: number;
  return_rate_pct: number;
  total_units: number;
  total_customers: number;
};

async function loadHeroKpis(): Promise<KpiRow | null> {
  try {
    const rows = await query<KpiRow>(
      `
      SELECT
        CAST(ROUND(SUM(gross_revenue), 0) AS FLOAT64)                                        AS total_revenue,
        COUNT(DISTINCT order_id)                                                             AS total_orders,
        CAST(ROUND(SAFE_DIVIDE(SUM(gross_revenue), COUNT(DISTINCT order_id)), 0) AS FLOAT64) AS avg_order_value,
        CAST(ROUND(100 * AVG(CAST(CAST(is_returned AS INT64) AS FLOAT64)), 2) AS FLOAT64)    AS return_rate_pct,
        SUM(quantity)                                                                        AS total_units,
        COUNT(DISTINCT customer_id)                                                          AS total_customers
      FROM ${TABLES.fact_sales}
      WHERE order_status = 'Completed'
      `
    );
    return rows[0] ?? null;
  } catch (err) {
    console.error("[retail page] KPI fetch failed:", err);
    return null;
  }
}

export default async function RetailProjectPage() {
  const kpis = await loadHeroKpis();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
      <Link
        href="/analytics"
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Analytics
      </Link>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-400 mb-5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Featured Project · Live
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Crest Retail Analytics
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          End-to-end analytics platform for a fictional sportswear company.
          Synthetic data → BigQuery → dbt models → interactive BI dashboard +
          an AI chat agent that turns natural language into SQL.
        </p>

        {/* Tech tags */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {["BigQuery", "dbt Cloud", "Next.js", "Recharts", "Claude AI", "TypeScript"].map(
            (tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </section>

      {/* ── KPI preview snippet ────────────────────────────── */}
      <section className="mt-12">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-50/30 to-teal-50/30 p-1 dark:border-slate-800 dark:from-emerald-950/20 dark:to-teal-950/20">
          <div className="rounded-[1.4rem] bg-white p-6 dark:bg-slate-900 sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                  Live Snapshot · All Time
                </span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                From BigQuery
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <SnippetStat
                label="Revenue"
                value={kpis ? formatMoney(kpis.total_revenue) : "—"}
              />
              <SnippetStat
                label="Orders"
                value={kpis ? formatNumber(kpis.total_orders) : "—"}
              />
              <SnippetStat
                label="Avg Order"
                value={kpis ? `$${kpis.avg_order_value.toLocaleString()}` : "—"}
              />
              <SnippetStat
                label="Return Rate"
                value={kpis ? formatPct(kpis.return_rate_pct, 2) : "—"}
              />
            </div>

            <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
              {kpis
                ? `${formatNumber(kpis.total_units)} units sold across ${formatNumber(kpis.total_customers)} customers · refreshed hourly`
                : "Snapshot loading from BigQuery…"}
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/analytics/retail/dashboard"
            className="group inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all"
          >
            <BarChart3 className="h-4 w-4" />
            Open Interactive Dashboard
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/analytics/retail/chat"
            className="group inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20 transition-all"
          >
            <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Ask the AI Agent
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 text-slate-400" />
          </Link>
        </div>
      </section>

      {/* ── How it's built ─────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-3">
          Under the Hood
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          How this was built
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl">
          A real-world analytics pipeline — same architecture professional data
          teams use, scaled down to a portfolio project.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <BuildStep
            num="01"
            icon={<Database className="h-5 w-5" />}
            title="Synthetic Data Generation"
            desc="Python + Faker scripts generate realistic retail data: 600K orders, 1.18M line items, 500K customers, 500 products, 151 stores. Seasonal patterns built in."
          />
          <BuildStep
            num="02"
            icon={<GitBranch className="h-5 w-5" />}
            title="dbt Star Schema"
            desc="11 raw tables → 5 staging views → 5 mart tables (1 fact + 4 dimensions). Tests for PK uniqueness, FK relationships, accepted values."
          />
          <BuildStep
            num="03"
            icon={<TrendingUp className="h-5 w-5" />}
            title="Live BI Dashboard"
            desc="Next.js + Recharts pulling from BigQuery via API routes. Server-side queries, edge-cached for an hour. Filters drive re-fetches."
          />
          <BuildStep
            num="04"
            icon={<Bot className="h-5 w-5" />}
            title="AI Chat Agent (Phase 4)"
            desc="Claude API with tool use. Text-to-SQL constrained to the mart, safety guardrails (read-only, row limits, timeouts), inline chart rendering."
          />
        </div>
      </section>

      {/* ── What you can do ────────────────────────────────── */}
      <section className="mt-20">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-3">
          What You Can Do
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Two ways to explore the data
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <ExploreCard
            icon={<BarChart3 className="h-5 w-5" />}
            href="/analytics/retail/dashboard"
            title="Interactive Dashboard"
            tag="Live"
            items={[
              "4 KPI cards (revenue, orders, AOV, return rate)",
              "Revenue trend over time with filters",
              "Channel mix breakdown",
              "Region performance & top products",
              "Filter by period, region, and channel",
            ]}
            cta="Open Dashboard"
          />
          <ExploreCard
            icon={<MessageSquare className="h-5 w-5" />}
            href="/analytics/retail/chat"
            title="Conversational AI Agent"
            tag="Coming Soon"
            tagTone="amber"
            items={[
              "Ask in plain English: \"Top products in Q4?\"",
              "Claude writes the SQL and runs it",
              "Inline charts rendered in the chat thread",
              "Multi-turn follow-up questions",
              "Schema-aware, safety-constrained",
            ]}
            cta="Try the Chat"
          />
        </div>
      </section>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────

function SnippetStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center sm:text-left">
      <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 tabular-nums">
        {value}
      </div>
    </div>
  );
}

function BuildStep({
  num,
  icon,
  title,
  desc,
}: {
  num: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-500/20">
          {icon}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 tabular-nums">
          {num}
        </span>
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function ExploreCard({
  icon,
  href,
  title,
  tag,
  tagTone = "emerald",
  items,
  cta,
}: {
  icon: React.ReactNode;
  href: string;
  title: string;
  tag: string;
  tagTone?: "emerald" | "amber";
  items: string[];
  cta: string;
}) {
  const tagStyles =
    tagTone === "amber"
      ? "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400";

  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800 transition-all"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
          {icon}
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tagStyles}`}
        >
          {tag}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm text-slate-600 dark:text-slate-400"
          >
            <Check className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
