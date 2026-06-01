"use client";

/**
 * Renders a chart from a Claude-generated spec (via the `render_chart` tool).
 * Supports bar / line / pie / table.
 */

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatMoney, formatMoneyFull, formatNumberFull } from "@/lib/format";

type Format = "money" | "number" | "pct";
type ChartType = "bar" | "line" | "pie" | "table";
type Row = Record<string, string | number | null>;

export type ChartSpec = {
  type: ChartType;
  title: string;
  data: Row[];
  x_key: string;
  y_key: string;
  y_format?: Format;
};

const COLORS = [
  "#10b981", // emerald
  "#3b82f6", // blue
  "#f59e0b", // amber
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#f97316", // orange
  "#22c55e", // green
];

function formatValue(v: unknown, fmt?: Format): string {
  const num = typeof v === "number" ? v : Number(v);
  if (Number.isNaN(num)) return String(v);
  if (fmt === "money") return formatMoney(num);
  if (fmt === "pct") return `${num.toFixed(1)}%`;
  return formatNumberFull(num);
}

function formatValueFull(v: unknown, fmt?: Format): string {
  const num = typeof v === "number" ? v : Number(v);
  if (Number.isNaN(num)) return String(v);
  if (fmt === "money") return formatMoneyFull(num);
  if (fmt === "pct") return `${num.toFixed(2)}%`;
  return formatNumberFull(num);
}

export function ChatChart({ spec }: { spec: ChartSpec }) {
  if (!spec.data?.length) {
    return (
      <ChartShell title={spec.title}>
        <div className="flex h-40 items-center justify-center text-sm text-slate-500">
          No data to display
        </div>
      </ChartShell>
    );
  }

  if (spec.type === "table") {
    const cols = Object.keys(spec.data[0]);
    return (
      <ChartShell title={spec.title}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                {cols.map((c) => (
                  <th
                    key={c}
                    className="py-2 px-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                  >
                    {c.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {spec.data.slice(0, 50).map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800/60 dark:hover:bg-slate-800/30"
                >
                  {cols.map((c) => {
                    const v = row[c];
                    const isNum = typeof v === "number";
                    return (
                      <td
                        key={c}
                        className={`py-2 px-3 ${
                          isNum
                            ? "text-right tabular-nums font-medium text-slate-900 dark:text-slate-100"
                            : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {isNum
                          ? c === spec.y_key
                            ? formatValueFull(v, spec.y_format)
                            : v.toLocaleString()
                          : String(v ?? "—")}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {spec.data.length > 50 && (
            <div className="mt-2 text-[11px] text-slate-500">
              Showing 50 of {spec.data.length} rows
            </div>
          )}
        </div>
      </ChartShell>
    );
  }

  if (spec.type === "pie") {
    const total = spec.data.reduce(
      (s, r) => s + (Number(r[spec.y_key]) || 0),
      0
    );
    return (
      <ChartShell title={spec.title}>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spec.data}
                dataKey={spec.y_key}
                nameKey={spec.x_key}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
                stroke="#fff"
                strokeWidth={2}
              >
                {spec.data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
                formatter={(value, _name, item) => {
                  const v = Number(value);
                  const pct = total ? ((v / total) * 100).toFixed(1) : "0";
                  const label =
                    (item as { payload?: Row })?.payload?.[spec.x_key] ?? "";
                  return [
                    `${formatValueFull(v, spec.y_format)} (${pct}%)`,
                    String(label),
                  ];
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartShell>
    );
  }

  if (spec.type === "line") {
    return (
      <ChartShell title={spec.title}>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spec.data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey={spec.x_key}
                stroke="#94a3b8"
                tick={{ fontSize: 11 }}
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => formatValue(v, spec.y_format)}
                width={55}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
                formatter={(value) => [formatValueFull(Number(value), spec.y_format), spec.y_key.replace(/_/g, " ")]}
              />
              <Line
                type="monotone"
                dataKey={spec.y_key}
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#10b981" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartShell>
    );
  }

  // bar (default) — use horizontal layout when labels are long (e.g. product names)
  const maxLabelLen = Math.max(
    ...spec.data.map((r) => String(r[spec.x_key] ?? "").length)
  );
  const isHorizontal = maxLabelLen > 12;
  const labelWidth = Math.min(Math.max(maxLabelLen * 6, 80), 160);

  return (
    <ChartShell title={spec.title}>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {isHorizontal ? (
            <BarChart
              layout="vertical"
              data={spec.data}
              margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis
                type="number"
                stroke="#94a3b8"
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => formatValue(v, spec.y_format)}
              />
              <YAxis
                type="category"
                dataKey={spec.x_key}
                stroke="#94a3b8"
                tick={{ fontSize: 11 }}
                width={labelWidth}
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
                formatter={(value) => [formatValueFull(Number(value), spec.y_format), spec.y_key.replace(/_/g, " ")]}
              />
              <Bar dataKey={spec.y_key} radius={[0, 6, 6, 0]}>
                {spec.data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <BarChart data={spec.data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey={spec.x_key}
                stroke="#94a3b8"
                tick={{ fontSize: 11 }}
                interval={0}
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => formatValue(v, spec.y_format)}
                width={55}
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
                formatter={(value) => [formatValueFull(Number(value), spec.y_format), spec.y_key.replace(/_/g, " ")]}
              />
              <Bar dataKey={spec.y_key} radius={[6, 6, 0, 0]}>
                {spec.data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </ChartShell>
  );
}

function ChartShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-100 px-4 py-2.5 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h4>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
