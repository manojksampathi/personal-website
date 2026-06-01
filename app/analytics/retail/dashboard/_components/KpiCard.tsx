/**
 * BI-style KPI Card with left accent stripe, icon + label header,
 * big metric value, and optional sub-text.
 */
import type { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

type Tone = "emerald" | "blue" | "amber" | "rose";

const toneStyles: Record<
  Tone,
  { stripe: string; iconBg: string; iconText: string }
> = {
  emerald: {
    stripe: "bg-emerald-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
    iconText: "text-emerald-600 dark:text-emerald-400",
  },
  blue: {
    stripe: "bg-blue-500",
    iconBg: "bg-blue-50 dark:bg-blue-950/40",
    iconText: "text-blue-600 dark:text-blue-400",
  },
  amber: {
    stripe: "bg-amber-500",
    iconBg: "bg-amber-50 dark:bg-amber-950/40",
    iconText: "text-amber-600 dark:text-amber-400",
  },
  rose: {
    stripe: "bg-rose-500",
    iconBg: "bg-rose-50 dark:bg-rose-950/40",
    iconText: "text-rose-600 dark:text-rose-400",
  },
};

export function KpiCard({
  label,
  value,
  sub,
  icon,
  tone = "emerald",
  loading = false,
  trend,
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: ReactNode;
  tone?: Tone;
  loading?: boolean;
  /** Optional comparison badge (e.g. "+12.4%" or "—") */
  trend?: { value: string; positive?: boolean };
}) {
  const { stripe, iconBg, iconText } = toneStyles[tone];

  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900">
      {/* Left accent stripe */}
      <div
        className={`absolute inset-y-0 left-0 w-1 ${stripe}`}
        aria-hidden="true"
      />

      <div className="pl-5 pr-4 py-4">
        {/* Header row: icon + label + optional trend */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {icon && (
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded ${iconBg} ${iconText}`}
              >
                {icon}
              </div>
            )}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate">
              {label}
            </span>
          </div>
          {trend && !loading && (
            <span
              className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                trend.positive
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                  : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
              }`}
            >
              <TrendingUp
                className={`h-2.5 w-2.5 ${trend.positive ? "" : "rotate-180"}`}
              />
              {trend.value}
            </span>
          )}
        </div>

        {/* Value */}
        <div className="mt-3">
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          ) : (
            <div className="text-2xl sm:text-[28px] font-bold leading-none tracking-tight text-slate-900 dark:text-slate-100 tabular-nums">
              {value}
            </div>
          )}
          {sub && !loading && (
            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
              {sub}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
