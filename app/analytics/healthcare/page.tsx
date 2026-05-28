import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";

export default function HealthcarePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <Link
        href="/analytics"
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Analytics
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center dark:border-slate-800 dark:bg-slate-900">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400">
          <Heart className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Healthcare Analytics — Coming Soon
        </h1>
        <p className="mt-3 max-w-md mx-auto text-slate-600 dark:text-slate-400">
          Patient outcomes, claims analytics, and clinical decision support with
          AI. Targeting Q4 2026.
        </p>
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-500">
          Want to know when it&apos;s live?{" "}
          <Link
            href="mailto:manoj91ai@gmail.com"
            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
          >
            Get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
