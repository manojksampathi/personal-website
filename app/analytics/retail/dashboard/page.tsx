"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  DollarSign,
  ShoppingCart,
  Receipt,
  Undo2,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  MapPin,
  Trophy,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Database,
  Clock,
} from "lucide-react";
import { KpiCard } from "./_components/KpiCard";
import { RevenueTrendChart } from "./_components/RevenueTrendChart";
import { ChannelMixChart } from "./_components/ChannelMixChart";
import { RegionsChart } from "./_components/RegionsChart";
import { ProductsChart } from "./_components/ProductsChart";
import { Filters, type FilterValues } from "./_components/Filters";
import {
  formatMoney,
  formatMoneyFull,
  formatNumber,
  formatNumberFull,
  formatPct,
} from "@/lib/format";

type DashboardData = {
  kpis: {
    total_revenue: number;
    total_orders: number;
    avg_order_value: number;
    return_rate_pct: number;
    total_customers: number;
    total_units: number;
  };
  monthly_revenue: { year_month: string; revenue: number; orders: number }[];
  channel_mix: { channel: string; revenue: number; orders: number }[];
  regions: {
    region: string;
    revenue: number;
    orders: number;
    avg_line: number;
  }[];
  top_products: {
    product_name: string;
    category: string;
    sub_category: string;
    units_sold: number;
    revenue: number;
  }[];
  filters_applied: {
    from: string;
    to: string;
    region: string;
    channel: string;
  };
  generated_at: string;
};

// Convert range filter → query string for API
function buildQueryString(filters: FilterValues): string {
  const params = new URLSearchParams();
  const today = new Date();
  const from = new Date(today);
  if (filters.range === "12m") from.setMonth(from.getMonth() - 12);
  else if (filters.range === "24m") from.setMonth(from.getMonth() - 24);
  else if (filters.range === "36m") from.setMonth(from.getMonth() - 36);
  else if (filters.range === "all") from.setFullYear(2020); // earliest data
  params.set("from", from.toISOString().slice(0, 10));
  params.set("to", today.toISOString().slice(0, 10));
  if (filters.region !== "All") params.set("region", filters.region);
  if (filters.channel !== "All") params.set("channel", filters.channel);
  return params.toString();
}

export default function DashboardPage() {
  const [filters, setFilters] = useState<FilterValues>({
    range: "36m",
    region: "All",
    channel: "All",
  });
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (filters: FilterValues) => {
    setLoading(true);
    setError(null);
    try {
      const qs = buildQueryString(filters);
      const res = await fetch(`/api/retail/dashboard?${qs}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || `HTTP ${res.status}`);
      }
      const json = (await res.json()) as DashboardData;
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(filters);
  }, [filters, fetchData]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* ── Sticky dashboard header bar ──────────────────── */}
      <div className="sticky top-[68px] sm:top-[72px] z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/analytics/retail"
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Retail
              </Link>
              <span className="text-slate-300 dark:text-slate-700">/</span>
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                  <Database className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                    Crest Sales Dashboard
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Live · BigQuery
                  </div>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {loading && data && (
                <div className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  Updating
                </div>
              )}
              <Link
                href="/analytics/retail/chat"
                className="inline-flex h-8 items-center gap-1.5 rounded-md bg-slate-900 px-3 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Ask AI
              </Link>
            </div>
          </div>

          {/* Filter row */}
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Filters
            </span>
            <Filters value={filters} onChange={setFilters} loading={loading} />
          </div>
        </div>
      </div>

      {/* ── Dashboard canvas ─────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
        {/* Error state */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm dark:border-rose-900/60 dark:bg-rose-950/30">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
            <div className="flex-1">
              <div className="font-semibold text-rose-900 dark:text-rose-200">
                Could not load dashboard data
              </div>
              <div className="mt-1 text-rose-700 dark:text-rose-300">
                {error}
              </div>
              <button
                onClick={() => fetchData(filters)}
                className="mt-3 inline-flex h-8 items-center gap-1.5 rounded-md bg-rose-600 px-3 text-xs font-medium text-white hover:bg-rose-700"
              >
                <RefreshCw className="h-3 w-3" />
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Section: KPIs */}
        <SectionLabel
          icon={<DollarSign className="h-3 w-3" />}
          title="Key Metrics"
          subtitle={
            data
              ? `${formatNumberFull(data.kpis.total_orders)} orders in selected period`
              : "Loading…"
          }
        />
        <div className="mt-3 mb-6 grid gap-3 grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Total Revenue"
            value={data ? formatMoney(data.kpis.total_revenue) : "—"}
            sub={data ? `${formatNumber(data.kpis.total_units)} units sold` : undefined}
            icon={<DollarSign className="h-3.5 w-3.5" />}
            tone="emerald"
            loading={loading && !data}
          />
          <KpiCard
            label="Total Orders"
            value={data ? formatNumber(data.kpis.total_orders) : "—"}
            sub={
              data
                ? `${formatNumber(data.kpis.total_customers)} unique customers`
                : undefined
            }
            icon={<ShoppingCart className="h-3.5 w-3.5" />}
            tone="blue"
            loading={loading && !data}
          />
          <KpiCard
            label="Avg Order Value"
            value={
              data
                ? formatMoneyFull(Math.round(data.kpis.avg_order_value ?? 0))
                : "—"
            }
            sub="Per completed order"
            icon={<Receipt className="h-3.5 w-3.5" />}
            tone="amber"
            loading={loading && !data}
          />
          <KpiCard
            label="Return Rate"
            value={data ? formatPct(data.kpis.return_rate_pct, 2) : "—"}
            sub="Of all completed line items"
            icon={<Undo2 className="h-3.5 w-3.5" />}
            tone="rose"
            loading={loading && !data}
          />
        </div>

        {/* Section: Trends */}
        <SectionLabel
          icon={<LineChartIcon className="h-3 w-3" />}
          title="Trends & Distribution"
        />
        <div className="mt-3 mb-6 grid gap-3 lg:grid-cols-3">
          <BiCard
            title="Revenue Trend"
            subtitle="Monthly revenue over selected period"
            icon={<LineChartIcon className="h-3.5 w-3.5" />}
            iconBg="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
            footer={
              data
                ? `${data.monthly_revenue.length} months · Total ${formatMoney(
                    data.monthly_revenue.reduce(
                      (s, r) => s + (r.revenue ?? 0),
                      0
                    )
                  )}`
                : undefined
            }
            className="lg:col-span-2"
          >
            {data ? (
              <RevenueTrendChart data={data.monthly_revenue} />
            ) : (
              <ChartSkeleton />
            )}
          </BiCard>

          <BiCard
            title="Channel Mix"
            subtitle="Revenue by sales channel"
            icon={<PieChartIcon className="h-3.5 w-3.5" />}
            iconBg="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
            footer={data ? `${data.channel_mix.length} channels` : undefined}
          >
            {data ? (
              <ChannelMixChart data={data.channel_mix} />
            ) : (
              <ChartSkeleton />
            )}
          </BiCard>
        </div>

        {/* Section: Geography & Top performers */}
        <SectionLabel
          icon={<MapPin className="h-3 w-3" />}
          title="Geography & Top Performers"
        />
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <BiCard
            title="Revenue by Region"
            subtitle="Top regions ranked by total revenue"
            icon={<MapPin className="h-3.5 w-3.5" />}
            iconBg="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
            footer={data ? `${data.regions.length} regions` : undefined}
          >
            {data ? <RegionsChart data={data.regions} /> : <ChartSkeleton />}
          </BiCard>

          <BiCard
            title="Top 10 Products"
            subtitle="Ranked by revenue"
            icon={<Trophy className="h-3.5 w-3.5" />}
            iconBg="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400"
            footer={
              data && data.top_products.length
                ? `Top: ${data.top_products[0].product_name}`
                : undefined
            }
          >
            {data ? (
              <ProductsChart data={data.top_products} />
            ) : (
              <ChartSkeleton />
            )}
          </BiCard>
        </div>

        {/* Footer */}
        {data && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-slate-400 dark:text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Database className="h-3 w-3" />
              BigQuery · dbt_dev_crest_sales_mart
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Fetched {new Date(data.generated_at).toLocaleTimeString()}
            </span>
            <span className="hidden sm:inline">·</span>
            <span>Edge cached 1 hour</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── BI-style Card Wrapper ──────────────────────────────────

function BiCard({
  title,
  subtitle,
  icon,
  iconBg,
  footer,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg: string;
  footer?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {/* Card header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded ${iconBg}`}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex-1 p-4">{children}</div>

      {/* Optional footer */}
      {footer && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-2 dark:border-slate-800 dark:bg-slate-950/30">
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {footer}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Section label ──────────────────────────────────────────

function SectionLabel({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          {icon}
        </span>
        <h2 className="text-xs font-bold uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300">
          {title}
        </h2>
      </div>
      {subtitle && (
        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
          {subtitle}
        </span>
      )}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="h-72 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
  );
}
