"use client";

import { Calendar, ChevronDown, RotateCcw } from "lucide-react";
import { useRef } from "react";

export type FilterValues = {
  range: "12m" | "24m" | "36m" | "all";
  region: string;
  channel: string;
};

const RANGE_OPTIONS: { value: FilterValues["range"]; label: string }[] = [
  { value: "12m", label: "Last 12 months" },
  { value: "24m", label: "Last 24 months" },
  { value: "36m", label: "Last 36 months" },
  { value: "all", label: "All time" },
];

const REGION_OPTIONS = [
  "All",
  "North",
  "South",
  "East",
  "West",
  "Central",
  "Online",
];

const CHANNEL_OPTIONS = ["All", "Online", "In-Store", "Mobile App"];

export function Filters({
  value,
  onChange,
  loading = false,
}: {
  value: FilterValues;
  onChange: (next: FilterValues) => void;
  loading?: boolean;
}) {
  const isDefault =
    value.range === "36m" && value.region === "All" && value.channel === "All";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterPill
        icon={<Calendar className="h-3.5 w-3.5" />}
        label="Period"
        value={value.range}
        options={RANGE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
        onChange={(v) => onChange({ ...value, range: v as FilterValues["range"] })}
        disabled={loading}
      />
      <FilterPill
        label="Region"
        value={value.region}
        options={REGION_OPTIONS.map((o) => ({ value: o, label: o }))}
        onChange={(v) => onChange({ ...value, region: v })}
        disabled={loading}
      />
      <FilterPill
        label="Channel"
        value={value.channel}
        options={CHANNEL_OPTIONS.map((o) => ({ value: o, label: o }))}
        onChange={(v) => onChange({ ...value, channel: v })}
        disabled={loading}
      />
      {!isDefault && (
        <button
          type="button"
          onClick={() =>
            onChange({ range: "36m", region: "All", channel: "All" })
          }
          disabled={loading}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      )}
    </div>
  );
}

function FilterPill({
  icon,
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const current = options.find((o) => o.value === value)?.label ?? value;

  return (
    <div
      className={`group relative inline-flex h-9 items-center gap-2 rounded-full border bg-white px-3 transition-colors dark:bg-slate-900 ${
        disabled
          ? "opacity-60 border-slate-200 dark:border-slate-800"
          : "border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 dark:border-slate-800 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20"
      }`}
    >
      {icon && (
        <span className="text-slate-500 dark:text-slate-400">{icon}</span>
      )}
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
        {current}
      </span>
      <ChevronDown className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
      <select
        ref={selectRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
