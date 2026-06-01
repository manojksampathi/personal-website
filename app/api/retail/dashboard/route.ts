/**
 * GET /api/retail/dashboard
 *
 * Queries the Crest sales mart and returns aggregated dashboard data.
 * All queries run server-side against BigQuery — credentials never reach the browser.
 *
 * Query params (all optional):
 *   - from:    ISO date (default: 36 months ago)
 *   - to:      ISO date (default: today)
 *   - region:  one of "All" | "North" | "South" | "East" | "West" | "Central" | "Online"
 *   - channel: one of "All" | "Online" | "In-Store" | "Mobile App"
 */

import { NextRequest, NextResponse } from "next/server";
import { query, TABLES } from "@/lib/bigquery";

// Edge runtime won't work — BigQuery SDK requires Node.js
export const runtime = "nodejs";
// Revalidate every hour (synthetic data doesn't change often)
export const revalidate = 3600;

type KPIs = {
  total_revenue: number;
  total_orders: number;
  avg_order_value: number;
  return_rate_pct: number;
  total_customers: number;
  total_units: number;
};

type MonthlyRevenue = {
  year_month: string;
  revenue: number;
  orders: number;
};

type ChannelRow = {
  channel: string;
  revenue: number;
  orders: number;
};

type RegionRow = {
  region: string;
  revenue: number;
  orders: number;
  avg_line: number;
};

type ProductRow = {
  product_name: string;
  category: string;
  sub_category: string;
  units_sold: number;
  revenue: number;
};

type DashboardData = {
  kpis: KPIs;
  monthly_revenue: MonthlyRevenue[];
  channel_mix: ChannelRow[];
  regions: RegionRow[];
  top_products: ProductRow[];
  filters_applied: {
    from: string;
    to: string;
    region: string;
    channel: string;
  };
  generated_at: string;
};

function defaultFromDate(): string {
  const d = new Date();
  d.setMonth(d.getMonth() - 36);
  return d.toISOString().slice(0, 10);
}

function defaultToDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const from = url.searchParams.get("from") || defaultFromDate();
  const to = url.searchParams.get("to") || defaultToDate();
  const region = url.searchParams.get("region") || "All";
  const channel = url.searchParams.get("channel") || "All";

  // ── Build dynamic WHERE clauses ─────────────────────────────
  const baseFilters = `
    f.order_status = 'Completed'
    AND f.date_key BETWEEN @from AND @to
    ${channel !== "All" ? "AND f.channel = @channel" : ""}
  `;
  const regionFilter = region !== "All" ? "AND s.region = @region" : "";

  const params: Record<string, unknown> = {
    from,
    to,
    ...(channel !== "All" ? { channel } : {}),
    ...(region !== "All" ? { region } : {}),
  };

  // ── 5 queries in parallel ───────────────────────────────────
  try {
    const [kpis, monthly_revenue, channel_mix, regions, top_products] =
      await Promise.all([
        // 1. KPIs — CAST NUMERICs to FLOAT64 so JSON returns proper JS numbers
        query<KPIs>(
          `
          SELECT
            CAST(ROUND(SUM(f.gross_revenue), 0) AS FLOAT64)                                       AS total_revenue,
            COUNT(DISTINCT f.order_id)                                                            AS total_orders,
            CAST(ROUND(SAFE_DIVIDE(SUM(f.gross_revenue), COUNT(DISTINCT f.order_id)), 2) AS FLOAT64) AS avg_order_value,
            CAST(ROUND(100 * AVG(CAST(CAST(f.is_returned AS INT64) AS FLOAT64)), 2) AS FLOAT64)   AS return_rate_pct,
            COUNT(DISTINCT f.customer_id)                                                         AS total_customers,
            SUM(f.quantity)                                                                       AS total_units
          FROM ${TABLES.fact_sales} f
          LEFT JOIN ${TABLES.dim_stores} s USING (store_id)
          WHERE ${baseFilters} ${regionFilter}
          `,
          params
        ),

        // 2. Monthly revenue trend
        query<MonthlyRevenue>(
          `
          SELECT
            FORMAT_DATE('%Y-%m', d.date_key)                AS year_month,
            CAST(ROUND(SUM(f.gross_revenue), 0) AS FLOAT64) AS revenue,
            COUNT(DISTINCT f.order_id)                      AS orders
          FROM ${TABLES.fact_sales} f
          LEFT JOIN ${TABLES.dim_stores} s USING (store_id)
          JOIN ${TABLES.dim_dates} d ON f.date_key = d.date_key
          WHERE ${baseFilters} ${regionFilter}
          GROUP BY year_month
          ORDER BY year_month
          `,
          params
        ),

        // 3. Channel mix
        query<ChannelRow>(
          `
          SELECT
            f.channel,
            CAST(ROUND(SUM(f.gross_revenue), 0) AS FLOAT64) AS revenue,
            COUNT(DISTINCT f.order_id)                      AS orders
          FROM ${TABLES.fact_sales} f
          LEFT JOIN ${TABLES.dim_stores} s USING (store_id)
          WHERE ${baseFilters} ${regionFilter}
          GROUP BY f.channel
          ORDER BY revenue DESC
          `,
          params
        ),

        // 4. Regions
        query<RegionRow>(
          `
          SELECT
            s.region,
            CAST(ROUND(SUM(f.gross_revenue), 0) AS FLOAT64) AS revenue,
            COUNT(DISTINCT f.order_id)                      AS orders,
            CAST(ROUND(AVG(f.gross_revenue), 2) AS FLOAT64) AS avg_line
          FROM ${TABLES.fact_sales} f
          JOIN ${TABLES.dim_stores} s USING (store_id)
          WHERE ${baseFilters} ${regionFilter}
          GROUP BY s.region
          ORDER BY revenue DESC
          `,
          params
        ),

        // 5. Top 10 products
        query<ProductRow>(
          `
          SELECT
            p.product_name,
            p.category,
            p.sub_category,
            SUM(f.quantity)                                 AS units_sold,
            CAST(ROUND(SUM(f.gross_revenue), 0) AS FLOAT64) AS revenue
          FROM ${TABLES.fact_sales} f
          JOIN ${TABLES.dim_products} p USING (product_id)
          LEFT JOIN ${TABLES.dim_stores} s USING (store_id)
          WHERE ${baseFilters} ${regionFilter}
          GROUP BY p.product_name, p.category, p.sub_category
          ORDER BY revenue DESC
          LIMIT 10
          `,
          params
        ),
      ]);

    const payload: DashboardData = {
      kpis: kpis[0] ?? {
        total_revenue: 0,
        total_orders: 0,
        avg_order_value: 0,
        return_rate_pct: 0,
        total_customers: 0,
        total_units: 0,
      },
      monthly_revenue,
      channel_mix,
      regions,
      top_products,
      filters_applied: { from, to, region, channel },
      generated_at: new Date().toISOString(),
    };

    return NextResponse.json(payload, {
      headers: {
        // Cache at the CDN edge for an hour, allow stale for a day while revalidating
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("[/api/retail/dashboard] BigQuery error:", err);
    return NextResponse.json(
      {
        error: "Failed to fetch dashboard data",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
