"use client";

import { formatMoney, formatNumberFull } from "@/lib/format";

type Row = {
  product_name: string;
  category: string;
  sub_category: string;
  units_sold: number;
  revenue: number;
};

const categoryStyles: Record<string, string> = {
  Apparel: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
  Footwear:
    "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  Accessories:
    "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400",
};

/**
 * Custom horizontal bar list (instead of Recharts BarChart) — gives more
 * control over rendering, sortable rows with category pills, and looks
 * like a Linear / Vercel-style ranking table.
 */
export function ProductsChart({ data }: { data: Row[] }) {
  if (!data?.length) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-500">
        No data for selected filters
      </div>
    );
  }

  const maxRevenue = Math.max(...data.map((r) => r.revenue));

  return (
    <div className="space-y-2">
      {data.map((row, i) => {
        const widthPct = (row.revenue / maxRevenue) * 100;
        const catClass =
          categoryStyles[row.category] ??
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

        return (
          <div
            key={`${row.product_name}-${i}`}
            className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-3 transition-colors hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800"
          >
            {/* Background fill bar */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-50 to-transparent dark:from-emerald-950/30 dark:to-transparent"
              style={{ width: `${widthPct}%` }}
              aria-hidden="true"
            />
            <div className="relative flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                    {row.product_name}
                  </span>
                  <span
                    className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${catClass}`}
                  >
                    {row.category}
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {formatNumberFull(row.units_sold)} units · {row.sub_category}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm font-bold tabular-nums text-slate-900 dark:text-slate-100">
                  {formatMoney(row.revenue)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
