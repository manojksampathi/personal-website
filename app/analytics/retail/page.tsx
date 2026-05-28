import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

export default function RetailDashboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <Link
        href="/analytics"
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Analytics
      </Link>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-12 text-center dark:border-amber-900 dark:bg-amber-950/30">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
          <Construction className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Retail Dashboard — Under Construction
        </h1>
        <p className="mt-3 max-w-md mx-auto text-slate-600 dark:text-slate-400">
          The Crest Retail dashboard with KPIs, charts, filters, and AI chat is
          being built. Phase 3 of the project.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs text-slate-700 dark:bg-slate-900 dark:text-slate-300">
          <span className="font-medium">Data ready:</span>
          <span className="text-slate-500">
            1.18M orders, 500K customers, 500 products in BigQuery
          </span>
        </div>
      </div>
    </div>
  );
}
