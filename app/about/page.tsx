import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, GraduationCap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back home
      </Link>

      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        About Me
      </h1>

      <div className="mt-8 space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>
          I&apos;m Manoj — a data analyst and engineer who loves turning messy
          data into clear products. I&apos;ve spent years building data
          pipelines, dashboards, and analytics tools across multiple industries.
        </p>
        <p>
          Most recently, I&apos;ve been fascinated by the intersection of
          analytics and AI. Modern LLMs like Claude let us build agents that
          turn natural language questions into SQL queries, then into charts —
          changing how non-technical teams interact with data.
        </p>
        <p>
          This website is my playground for exploring these ideas. Each project
          here is end-to-end: I generate the data, model it with dbt, build the
          dashboards, and add an AI chat layer. The goal is to show what&apos;s
          possible when you combine solid data engineering with modern AI.
        </p>
      </div>

      {/* Quick facts */}
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        <Fact icon={<Briefcase className="h-4 w-4" />} label="Role" value="Data Analyst & Engineer" />
        <Fact icon={<MapPin className="h-4 w-4" />} label="Location" value="USA" />
        <Fact icon={<GraduationCap className="h-4 w-4" />} label="Focus" value="Analytics + AI" />
      </div>

      {/* Skills section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          What I work on
        </h2>
        <div className="mt-6 space-y-4">
          <Section
            title="Data Engineering"
            items={[
              "Designing data warehouses on BigQuery / Snowflake",
              "Building dbt models for medallion architectures",
              "Synthetic data generation for prototyping",
            ]}
          />
          <Section
            title="Analytics & BI"
            items={[
              "Dashboards in Tableau, Looker, and custom React",
              "Star schema design for fast analytics queries",
              "Self-serve analytics tools for business users",
            ]}
          />
          <Section
            title="AI / Agentic"
            items={[
              "Claude tool use for text-to-SQL",
              "Streaming chat interfaces with inline charts",
              "Schema-aware system prompts and safety guardrails",
            ]}
          />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Why I built this
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          A passion project to showcase my skills and explore what&apos;s possible
          when modern AI meets analytics. Feedback and conversations welcome.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="mailto:manoj91ai@gmail.com"
            className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-colors"
          >
            Email me
          </Link>
          <Link
            href="https://linkedin.com/in/manojksampathi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-5 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </div>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
        {icon}
        {label}
      </div>
      <div className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{value}</div>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <ul className="mt-2 space-y-1.5 text-slate-600 dark:text-slate-400">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-emerald-500 mt-1">›</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
