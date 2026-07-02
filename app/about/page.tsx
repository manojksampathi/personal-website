import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";

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

      {/* Bio */}
      <div className="mt-8 space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>
          I&apos;m Manoj Kumar Sampathi — a BI &amp; Product Analytics professional with
          11+ years turning data into AI-enabled, self-serve analytics platforms across
          high-growth SaaS and Retail. I build with dbt, Snowflake, and MCP integrations
          to drive actionable insights and measurable business impact.
        </p>
        <p>
          I&apos;m currently a <span className="font-medium text-slate-800 dark:text-slate-200">Senior Product Data Analyst</span>, where
          I build executive-level dashboards, lead AI tool adoption tracking, and drive
          analytics for product reliability and security initiatives.
        </p>
        <p>
          Most recently, I&apos;ve been fascinated by the intersection of analytics and AI.
          This website is my playground for exploring those ideas — every project here is
          end-to-end: data engineering, dbt models, BI dashboards, and an AI chat layer on top.
        </p>
      </div>

      {/* Quick facts */}
      <div className="mt-10 grid gap-3 sm:grid-cols-4">
        <Fact icon={<Briefcase className="h-4 w-4" />} label="Role" value="Sr. Product Data Analyst" />
        <Fact icon={<MapPin className="h-4 w-4" />} label="Location" value="Dallas, TX" />
        <Fact icon={<GraduationCap className="h-4 w-4" />} label="Experience" value="11+ Years" />
        <Fact icon={<Award className="h-4 w-4" />} label="Focus" value="BI & Analytics + AI" />
      </div>

      {/* Experience */}
      <div className="mt-14">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Experience
        </h2>
        <div className="mt-6 space-y-8">
          <ExperienceItem
            title="Senior Product Data Analyst"
            company="SaaS Company"
            period="Mar 2025 – Present"
            bullets={[
              "Automated a manual executive reporting workflow with AI + MCP integrations (Snowflake, Tableau, Google Apps), cutting turnaround time by 95% for R&D leadership.",
              "Led RCA on uptime and incident metrics, driving architectural changes that cut incidents by 16%.",
              "Built a cross-functional AI adoption framework (Copilot, Claude, JIRA) with executive dashboards to track engineering efficiency.",
              "Automated product funnel and release health analytics across 9+ features, replacing manual monthly reporting.",
            ]}
          />
          <ExperienceItem
            title="Senior Tableau Developer"
            company="SaaS Company"
            period="Apr 2019 – Jan 2025"
            bullets={[
              "Designed an Executive Metrics dashboard with FP&A that became leadership's single source of truth for company performance.",
              "Built customer experience dashboards (NPS, CSAT, advisor scores) adopted across Support and Customer Success.",
              "Delivered Salesforce-driven dashboards guiding decisions across Sales, Marketing, and Solutions Engineering.",
            ]}
          />
          <ExperienceItem
            title="Tableau Developer"
            company="Retail Company"
            period="Oct 2014 – Apr 2019"
            bullets={[
              "Built widely-used Supply Chain dashboards giving Directors clear insights into seasonal order books.",
              "Implemented row-level security to restrict store owners to their own store-level data.",
              "Created dashboards tracking seasonal bookings, DC shipment health, and customer claims & returns.",
            ]}
          />
        </div>
      </div>

      {/* Skills */}
      <div className="mt-14">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Skills
        </h2>
        <div className="mt-6 space-y-5">
          <SkillGroup
            title="BI & Visualization"
            items={["Tableau", "Power BI", "Looker", "Recharts"]}
          />
          <SkillGroup
            title="Data Engineering"
            items={["SQL", "dbt", "Snowflake", "BigQuery", "Python"]}
          />
          <SkillGroup
            title="AI & Web"
            items={["Generative AI", "Claude AI", "Next.js", "TypeScript"]}
          />
        </div>
      </div>

      {/* Certifications */}
      <div className="mt-14">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Certifications
        </h2>
        <div className="mt-4 space-y-3">
          <CertItem name="Tableau Desktop Specialist" />
          <CertItem name="SAS Certified Base Programmer for SAS 9" />
        </div>
      </div>

      {/* Education */}
      <div className="mt-14">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Education
        </h2>
        <div className="mt-4 space-y-4">
          <EducationItem
            degree="MS in Electrical Engineering"
            school="Oklahoma State University"
            year="2014"
          />
          <EducationItem
            degree="B.Tech in Electronics & Communication Engineering"
            school="Kakatiya University"
            year="2012"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Let&apos;s connect
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Always happy to talk analytics, AI, or just trade ideas. Reach out on
          LinkedIn or drop me an email.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="https://www.linkedin.com/in/mksampathi/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-900 px-5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-colors"
          >
            <LinkedinIcon />
            LinkedIn
          </Link>
          <Link
            href="https://github.com/manojksampathi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-5 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <GithubIcon />
            GitHub
          </Link>
          <Link
            href="mailto:manojkumarsampathi@gmail.com"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-5 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Email me
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
      <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{value}</div>
    </div>
  );
}

function ExperienceItem({
  title,
  company,
  period,
  bullets,
}: {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}) {
  return (
    <div className="relative pl-5 border-l-2 border-slate-200 dark:border-slate-800">
      <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-emerald-500" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
        <div>
          <span className="font-semibold text-slate-900 dark:text-slate-100">{title}</span>
          <span className="text-slate-500 dark:text-slate-400"> · {company}</span>
        </div>
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">{period}</span>
      </div>
      <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-emerald-500 mt-0.5 shrink-0">›</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 w-36 shrink-0 pt-1.5">
        {title}
      </span>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function CertItem({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
      <Award className="h-4 w-4 text-emerald-500 shrink-0" />
      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{name}</span>
    </div>
  );
}

function EducationItem({
  degree,
  school,
  year,
}: {
  degree: string;
  school: string;
  year: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
      <div>
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{degree}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{school}</div>
      </div>
      <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{year}</span>
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
