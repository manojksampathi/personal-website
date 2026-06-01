/**
 * KPI Card — single metric tile.
 * Used for Revenue, Orders, AOV, Return Rate at the top of the dashboard.
 */
import type { ReactNode } from "react";

type Tone = "emerald" | "blue" | "amber" | "rose";

const toneStyles: Record<Tone, { bg: string; text: string }> = {
  emerald: {
    bg: "bg-emerald-100 dark:bg-emerald-950/50",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  blue: {
    bg: "bg-blue-100 dark:bg-blue-950/50",
    text: "text-blue-700 dark:text-blue-400",
  },
  amber: {
    bg: "bg-amber-100 dark:bg-amber-950/50",
    text: "text-amber-700 dark:text-amber-400",
  },
  rose: {
    bg: "bg-rose-100 dark:bg-rose-950/50",
    text: "text-rose-700 dark:text-rose-400",
  },
};

export function KpiCard({
  label,
  value,
  sub,
  icon,
  tone = "emerald",
  loading = false,
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: ReactNode;
  tone?: Tone;
  loading?: boolean;
}) {
  const { bg, text } = toneStyles[tone];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
          {label}
        </span>
        {icon && (
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${bg} ${text}`}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="mt-4">
        {loading ? (
          <div className="h-9 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        ) : (
          <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {value}
          </div>
        )}
        {sub && !loading && (
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}
