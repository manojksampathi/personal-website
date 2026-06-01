/**
 * Shared formatters for the dashboard.
 */

/** $94,897,399 → "$94.9M"  or  $1234 → "$1,234" */
export function formatMoney(v: number | null | undefined): string {
  if (v == null) return "—";
  if (Math.abs(v) >= 1e9) return "$" + (v / 1e9).toFixed(2) + "B";
  if (Math.abs(v) >= 1e6) return "$" + (v / 1e6).toFixed(1) + "M";
  if (Math.abs(v) >= 1e3) return "$" + (v / 1e3).toFixed(0) + "K";
  return "$" + Math.round(v).toLocaleString();
}

/** Full precision: $94,897,399 */
export function formatMoneyFull(v: number | null | undefined): string {
  if (v == null) return "—";
  return "$" + Math.round(v).toLocaleString();
}

/** 468058 → "468K" */
export function formatNumber(v: number | null | undefined): string {
  if (v == null) return "—";
  if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(1) + "M";
  if (Math.abs(v) >= 1e3) return (v / 1e3).toFixed(0) + "K";
  return v.toLocaleString();
}

/** Full precision: 468,058 */
export function formatNumberFull(v: number | null | undefined): string {
  if (v == null) return "—";
  return v.toLocaleString();
}

/** 12.96 → "12.96%" */
export function formatPct(v: number | null | undefined, digits = 1): string {
  if (v == null) return "—";
  return v.toFixed(digits) + "%";
}

/** "2024-01" → "Jan 2024" */
export function formatYearMonth(ym: string): string {
  const [year, month] = ym.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}
