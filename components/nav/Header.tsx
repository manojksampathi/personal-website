import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-2 rounded-full border border-slate-200/70 bg-white/70 px-2 py-1.5 sm:px-3 sm:py-2 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/70">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 pl-1 pr-1 shrink-0"
          >
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-[10px] sm:text-xs font-bold text-white shadow-sm ring-1 ring-emerald-600/20 transition-transform group-hover:scale-105">
              MS
            </div>
            <span className="hidden md:block text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Manoj Sampathi
            </span>
          </Link>

          {/* Pill nav — CAPS buttons */}
          <nav className="flex items-center gap-0.5">
            <PillLink href="/">HOME</PillLink>
            <PillLink href="/about">ABOUT</PillLink>
            <PillLink href="/analytics">ANALYTICS</PillLink>
          </nav>

          {/* CTA - shorter on mobile, full on desktop */}
          <Link
            href="/analytics"
            className="group inline-flex h-8 sm:h-9 items-center gap-1 sm:gap-1.5 rounded-full bg-slate-900 px-3 sm:px-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all shrink-0 whitespace-nowrap"
          >
            <span className="hidden sm:inline">View Work</span>
            <span className="sm:hidden">Work</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

function PillLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative inline-flex h-8 sm:h-9 items-center justify-center rounded-full px-2 sm:px-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em] text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-all whitespace-nowrap"
    >
      {children}
    </Link>
  );
}
