import Link from "next/link";
import { ArrowLeft, Lock, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

type SearchParams = Promise<{ callbackUrl?: string; error?: string }>;

export default async function SignInPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { callbackUrl = "/analytics/retail/chat", error } = await searchParams;

  async function authenticate(formData: FormData) {
    "use server";
    const username = formData.get("username");
    const password = formData.get("password");
    const cb = formData.get("callbackUrl") || "/analytics/retail/chat";

    try {
      await signIn("credentials", {
        username,
        password,
        redirectTo: String(cb),
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect(`/signin?error=invalid&callbackUrl=${encodeURIComponent(String(cb))}`);
      }
      throw err;
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-16 sm:py-24">
      <Link
        href="/analytics/retail"
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Retail Project
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20 mb-6">
          <Sparkles className="h-6 w-6" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Sign in to use the AI chat
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          This chat is invite-only — each message costs real money in Anthropic
          + BigQuery usage, so access is gated. If you don&apos;t have
          credentials, message me on LinkedIn or via email.
        </p>

        {error && (
          <div className="mt-5 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
            <Lock className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              <strong>Invalid credentials.</strong> Double-check the username
              and password, or reach out for fresh ones.
            </span>
          </div>
        )}

        <form action={authenticate} className="mt-6 space-y-4">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />

          <div>
            <label
              htmlFor="username"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              autoFocus
              className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-emerald-600 dark:focus:ring-emerald-900/40"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-emerald-600 dark:focus:ring-emerald-900/40"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
          >
            <Lock className="h-4 w-4" />
            Sign in
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500">
        The rest of the site (landing, dashboard, project pages) is public — no
        sign-in needed. Only the AI chat is gated.
      </p>
    </div>
  );
}
