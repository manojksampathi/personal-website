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
} from "lucide-react";
import { KpiCard } from "./_components/KpiCard";
import { RevenueTrendChart } from "./_components/RevenueTrendChart";
import { ChannelMixChart } from "./_components/ChannelMixChart";
import { RegionsChart } from "./_components/RegionsChart";
import { ProductsChart } from "./_components/ProductsChart";
import { Filters, type FilterValues } from "./_components/Filters";
import {
  formatMoney,
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
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb back link */}
      <Link
        href="/analytics/retail"
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Retail Project
      </Link>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-2">
            Crest Retail · Live Data
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Sales Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Live queries against BigQuery ·{" "}
            <span className="text-slate-500">
              {data
                ? `${formatNumberFull(data.kpis.total_orders)} orders in view`
                : "loading…"}
            </span>
          </p>
        </div>
        <Link
          href="/analytics/retail/chat"
          className="inline-flex h-10 items-center gap-1.5 self-start rounded-full bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors sm:self-end"
        >
          <Sparkles className="h-4 w-4" />
          Ask AI
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Filters value={filters} onChange={setFilters} loading={loading} />
        {loading && (
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <RefreshCw className="h-3 w-3 animate-spin" />
            Refreshing…
          </div>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-8 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm dark:border-rose-900/60 dark:bg-rose-950/30">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
          <div className="flex-1">
            <div className="font-semibold text-rose-900 dark:text-rose-200">
              Could not load dashboard data
            </div>
            <div className="mt-1 text-rose-700 dark:text-rose-300">{error}</div>
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

      {/* KPI cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4 mb-8">
        <KpiCard
          label="Total Revenue"
          value={data ? formatMoney(data.kpis.total_revenue) : "—"}
          sub={data ? `${formatNumber(data.kpis.total_units)} units sold` : undefined}
          icon={<DollarSign className="h-4 w-4" />}
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
          icon={<ShoppingCart className="h-4 w-4" />}
          tone="blue"
          loading={loading && !data}
        />
        <KpiCard
          label="Avg Order Value"
          value={data ? `$${data.kpis.avg_order_value.toFixed(0)}` : "—"}
          sub="per completed order"
          icon={<Receipt className="h-4 w-4" />}
          tone="amber"
          loading={loading && !data}
        />
        <KpiCard
          label="Return Rate"
          value={data ? formatPct(data.kpis.return_rate_pct, 2) : "—"}
          sub="of all line items"
          icon={<Undo2 className="h-4 w-4" />}
          tone="rose"
          loading={loading && !data}
        />
      </div>

      {/* Charts row 1: Revenue trend + Channel mix */}
      <div className="grid gap-4 lg:grid-cols-3 mb-4">
        <ChartCard
          title="Revenue Trend"
          subtitle="Monthly revenue over selected period"
          icon={<LineChartIcon className="h-3.5 w-3.5" />}
          className="lg:col-span-2"
        >
          {data ? (
            <RevenueTrendChart data={data.monthly_revenue} />
          ) : (
            <ChartSkeleton />
          )}
        </ChartCard>

        <ChartCard
          title="Channel Mix"
          subtitle="Revenue by sales channel"
          icon={<PieChartIcon className="h-3.5 w-3.5" />}
        >
          {data ? <ChannelMixChart data={data.channel_mix} /> : <ChartSkeleton />}
        </ChartCard>
      </div>

      {/* Charts row 2: Regions + Top products */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard
          title="Revenue by Region"
          subtitle="Top regions by total revenue"
          icon={<MapPin className="h-3.5 w-3.5" />}
        >
          {data ? <RegionsChart data={data.regions} /> : <ChartSkeleton />}
        </ChartCard>

        <ChartCard
          title="Top 10 Products"
          subtitle="Ranked by revenue across selected period"
          icon={<Trophy className="h-3.5 w-3.5" />}
        >
          {data ? <ProductsChart data={data.top_products} /> : <ChartSkeleton />}
        </ChartCard>
      </div>

      {/* Footer info */}
      {data && (
        <div className="mt-12 text-center text-xs text-slate-400 dark:text-slate-500">
          Data fetched at {new Date(data.generated_at).toLocaleString()} · cached
          for up to 1 hour at the edge
        </div>
      )}
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────

function ChartCard({
  title,
  subtitle,
  icon,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            {icon && (
              <span className="text-slate-500 dark:text-slate-400">{icon}</span>
            )}
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="h-72 w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
  );
}
