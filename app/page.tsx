import Link from "next/link";
import { ArrowRight, Sparkles, BarChart3, Database, Bot } from "lucide-react";

const SKILLS = [
  "SQL",
  "dbt",
  "BigQuery",
  "Python",
  "TypeScript",
  "Next.js",
  "Claude AI",
  "Recharts",
  "Tableau",
  "Looker",
  "Snowflake",
  "Airflow",
];

export default function Home() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.06),transparent_50%)]" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-32 sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="flex flex-col items-center text-center">
            {/* Eyebrow */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-700 backdrop-blur-sm dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Built for passion · Powered by AI
            </div>

            {/* Big bold headline */}
            <h1 className="max-w-4xl text-[44px] leading-[1.05] font-bold tracking-[-0.04em] text-slate-900 sm:text-6xl lg:text-7xl dark:text-slate-100">
              Building AI-powered
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
                analytics products.
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              I&apos;m Manoj. This site is a passion project — built to
              showcase my skills and explore what&apos;s possible when modern
              AI meets analytics. Every dashboard and chat agent here is end-to-end work.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/analytics"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/30 dark:bg-white dark:text-slate-900 dark:shadow-white/10 dark:hover:bg-slate-100 transition-all"
              >
                View Analytics Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white/60 px-6 text-sm font-semibold text-slate-900 backdrop-blur-sm hover:bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:bg-slate-900 dark:hover:border-slate-700 transition-all"
              >
                About Me
              </Link>
            </div>

            {/* Trust line */}
            <div className="mt-16 flex items-center gap-6 text-xs font-medium uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
              <span>Currently building with</span>
              <div className="flex items-center gap-4">
                <span>BigQuery</span>
                <span className="text-slate-300">·</span>
                <span>dbt</span>
                <span className="text-slate-300">·</span>
                <span>Claude</span>
                <span className="text-slate-300">·</span>
                <span>Next.js</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ──────────────────────────────────────────── */}
      <section className="relative border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-3">
              Stack
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              What I work with
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Project ────────────────────────────────── */}
      <section className="relative border-t border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-950/50 dark:to-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-3">
              Featured Project
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              End-to-end analytics, built from scratch
            </h2>
          </div>

          <Link
            href="/analytics/retail"
            className="group block max-w-3xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800 transition-all duration-300">
              {/* Subtle accent corner */}
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-500/20 blur-2xl" />

              <div className="relative flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
                  <BarChart3 className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                      Crest Retail Analytics
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                    End-to-end analytics platform: synthetic data → BigQuery →
                    dbt models → live BI dashboard → AI chat agent that answers
                    natural language questions about the data.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {["BigQuery", "dbt", "Next.js", "Recharts", "Claude AI"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Explore the dashboard
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── What I'm building ──────────────────────────────── */}
      <section className="relative border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-3">
              Focus Areas
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Currently exploring
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
            <Capability
              icon={<Database className="h-5 w-5" />}
              title="Data Pipelines"
              desc="Building production data flows with dbt and BigQuery."
            />
            <Capability
              icon={<Bot className="h-5 w-5" />}
              title="AI Agents"
              desc="Claude tool-use for text-to-SQL and conversational analytics."
            />
            <Capability
              icon={<Sparkles className="h-5 w-5" />}
              title="Data Products"
              desc="Turning datasets into interactive products people use."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Capability({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-emerald-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800 transition-all">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-500/20 mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
