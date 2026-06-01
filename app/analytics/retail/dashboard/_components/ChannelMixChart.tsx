"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { formatMoney, formatMoneyFull } from "@/lib/format";

type Row = { channel: string; revenue: number; orders: number };

// Color palette for channels
const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

export function ChannelMixChart({ data }: { data: Row[] }) {
  if (!data?.length) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-500">
        No data for selected filters
      </div>
    );
  }

  const total = data.reduce((sum, r) => sum + r.revenue, 0);

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="revenue"
            nameKey="channel"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
            stroke="#fff"
            strokeWidth={2}
          >
            {data.map((_, i) => (
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
              const pct = ((v / total) * 100).toFixed(1);
              // Recharts shape: item.payload contains the original row
              const channel =
                (item as { payload?: Row })?.payload?.channel ?? "";
              return [`${formatMoneyFull(v)} (${pct}%)`, channel];
            }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
            formatter={(value: string, entry) => {
              const payload = entry.payload as unknown as Row;
              return (
                <span className="text-slate-700 dark:text-slate-300">
                  {value} · {formatMoney(payload.revenue)}
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
