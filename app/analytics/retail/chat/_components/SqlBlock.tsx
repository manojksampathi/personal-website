"use client";

import { useState } from "react";
import { ChevronRight, Database, Check, AlertCircle, Loader2 } from "lucide-react";

type ToolState =
  | "input-streaming"
  | "input-available"
  | "output-available"
  | "output-error";

export function SqlBlock({
  query,
  state,
  rowCount,
  truncated,
  error,
}: {
  query?: string;
  state: ToolState;
  rowCount?: number;
  truncated?: boolean;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const trimmedQuery = query?.trim() ?? "";

  const running =
    state === "input-streaming" || state === "input-available";
  const success = state === "output-available" && !error;
  const failed = state === "output-error" || !!error;

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left"
      >
        <ChevronRight
          className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform ${
            open ? "rotate-90" : ""
          }`}
        />
        <Database className="h-3.5 w-3.5 shrink-0 text-slate-500" />
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {running
            ? "Querying BigQuery…"
            : failed
            ? "Query failed"
            : `Queried BigQuery${
                rowCount != null
                  ? ` · ${rowCount.toLocaleString()} row${rowCount === 1 ? "" : "s"}`
                  : ""
              }${truncated ? " (truncated)" : ""}`}
        </span>
        {running && (
          <Loader2 className="ml-auto h-3.5 w-3.5 animate-spin text-blue-500" />
        )}
        {success && (
          <Check className="ml-auto h-3.5 w-3.5 text-emerald-500" />
        )}
        {failed && (
          <AlertCircle className="ml-auto h-3.5 w-3.5 text-rose-500" />
        )}
      </button>

      {open && (
        <div className="border-t border-slate-200 px-3 py-2 dark:border-slate-800">
          {trimmedQuery ? (
            <pre className="overflow-x-auto rounded bg-slate-900 p-3 font-mono text-[11px] leading-relaxed text-slate-100">
              <code>{trimmedQuery}</code>
            </pre>
          ) : (
            <div className="text-xs text-slate-500">Generating SQL…</div>
          )}
          {error && (
            <div className="mt-2 rounded bg-rose-50 px-2 py-1.5 text-xs text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
