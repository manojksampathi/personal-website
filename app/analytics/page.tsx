import Link from "next/link";
import { ArrowRight, ShoppingBag, DollarSign, Heart, Lock } from "lucide-react";

type Domain = {
  slug: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "live" | "coming-soon";
  tags: string[];
  accent: string;
};

const DOMAINS: Domain[] = [
  {
    slug: "retail",
    name: "Retail Analytics",
    description:
      "Sales dashboard + AI chat for a fictional sportswear company (Crest). Live data, real insights.",
    icon: <ShoppingBag className="h-6 w-6" />,
    status: "live",
    tags: ["BigQuery", "dbt", "1.18M orders", "AI chat"],
    accent: "emerald",
  },
  {
    slug: "finance",
    name: "Finance Analytics",
    description:
      "Stock portfolio tracking, performance analytics, and conversational AI for financial data.",
    icon: <DollarSign className="h-6 w-6" />,
    status: "coming-soon",
    tags: ["Coming Q3 2026"],
    accent: "blue",
  },
  {
    slug: "healthcare",
    name: "Healthcare Analytics",
    description:
      "Patient outcomes, claims analytics, and clinical decision support with AI.",
    icon: <Heart className="h-6 w-6" />,
    status: "coming-soon",
    tags: ["Coming Q4 2026"],
    accent: "rose",
  },
];

export default function AnalyticsHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
          Analytics Portfolio
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          End-to-end analytics projects across industries. Each one ships a
          live BI dashboard and an AI agent you can chat with.
        </p>
      </div>

      {/* Domain cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DOMAINS.map((domain) => (
          <DomainCard key={domain.slug} domain={domain} />
        ))}
      </div>

      {/* How it works section */}
      <div className="mt-24 rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          How each project is built
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Same architecture across all domains:
        </p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Step
            num="1"
            title="Synthetic data"
            desc="Generated with Python + Faker, loaded to BigQuery"
          />
          <Step
            num="2"
            title="dbt transforms"
            desc="Raw → staging → star schema marts"
          />
          <Step
            num="3"
            title="BI dashboard"
            desc="Recharts + filters, live BigQuery queries"
          />
          <Step
            num="4"
            title="AI chat agent"
            desc="Claude with tool use for text-to-SQL"
          />
        </ol>
      </div>
    </div>
  );
}

function DomainCard({ domain }: { domain: Domain }) {
  const isLive = domain.status === "live";

  const accentBg = {
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400",
  }[domain.accent] || "bg-slate-100 text-slate-700";

  const cardContent = (
    <div
      className={`relative h-full rounded-2xl border bg-white p-6 shadow-sm transition-all dark:bg-slate-900 ${
        isLive
          ? "border-slate-200 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:hover:border-emerald-800 cursor-pointer"
          : "border-slate-200 opacity-70 dark:border-slate-800"
      }`}
    >
      {/* Status badge */}
      <div className="absolute right-4 top-4">
        {isLive ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            <Lock className="h-3 w-3" />
            Soon
          </span>
        )}
      </div>

      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accentBg}`}>
        {domain.icon}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
        {domain.name}
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {domain.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {domain.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {isLive && (
        <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 group-hover:gap-2 transition-all">
          Open dashboard
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </div>
  );

  return isLive ? (
    <Link href={`/analytics/${domain.slug}`} className="group block">
      {cardContent}
    </Link>
  ) : (
    <div>{cardContent}</div>
  );
}

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
        {num}
      </div>
      <h3 className="mt-3 font-medium text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{desc}</p>
    </div>
  );
}
