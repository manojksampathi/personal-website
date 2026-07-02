import Link from "next/link";
import { ArrowRight, Sparkles, BarChart3, Database, Bot } from "lucide-react";

const SKILLS = [
  "Tableau",
  "SQL",
  "dbt",
  "Snowflake",
  "Power BI",
  "BigQuery",
  "Python",
  "Generative AI",
  "Next.js",
  "TypeScript",
  "Claude AI",
  "Recharts",
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
              I&apos;m Manoj — a BI &amp; Product Analyst with 11+ years turning
              complex data into clear, actionable products, building
              executive dashboards and AI-powered analytics tools.
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

            {/* Social links */}
            <div className="mt-8 flex items-center gap-2">
              <Link
                href="https://github.com/manojksampathi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-white backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900 transition-all"
              >
                <GithubIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/in/mksampathi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-white backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900 transition-all"
              >
                <LinkedinIcon />
              </Link>
              <Link
                href="mailto:manojkumarsampathi@gmail.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-white backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900 transition-all"
              >
                <MailIcon />
              </Link>
            </div>

            {/* Trust line - stacks on mobile, side-by-side on larger screens */}
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 max-w-full px-4">
              <span className="text-center">Currently building with</span>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <span>BigQuery</span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span>dbt</span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span>Claude</span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
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

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
