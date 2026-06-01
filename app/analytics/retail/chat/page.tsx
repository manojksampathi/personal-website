import Link from "next/link";
import { ArrowLeft, MessageSquare, Sparkles } from "lucide-react";

export default function RetailChatPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <Link
        href="/analytics/retail"
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Retail Project
      </Link>

      <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-1 dark:border-amber-900/60 dark:from-amber-950/30 dark:to-orange-950/30">
        <div className="rounded-[1.4rem] bg-white p-10 text-center dark:bg-slate-900">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30">
            <MessageSquare className="h-7 w-7" />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            AI Chat Agent
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Building this next. The Crest data is ready in BigQuery — the chat
            interface and Claude tool-use plumbing land in Phase 4.
          </p>

          <div className="mt-8 rounded-xl bg-slate-50 p-5 text-left dark:bg-slate-950/50">
            <div className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mb-3">
              What it will do
            </div>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                <span>
                  <strong>Type natural questions:</strong> &ldquo;What were our
                  top 5 products in Q4 2024?&rdquo;
                </span>
              </li>
              <li className="flex gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                <span>
                  <strong>Claude writes the SQL,</strong> runs it against
                  BigQuery, and answers
                </span>
              </li>
              <li className="flex gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                <span>
                  <strong>Charts render inline</strong> in the chat — like
                  ChatGPT renders code
                </span>
              </li>
              <li className="flex gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                <span>
                  <strong>Login-gated</strong> to control API costs
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/analytics/retail/dashboard"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
            >
              Try the Dashboard instead
            </Link>
            <Link
              href="/analytics/retail"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Back to Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
