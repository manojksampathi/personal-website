/**
 * POST /api/retail/chat
 *
 * Streams Claude responses with tool use:
 *  - `run_sql`     — execute SELECT/WITH against the retail mart (safety-checked)
 *  - `render_chart`— return a chart spec for the frontend to render inline
 */

import { anthropic } from "@ai-sdk/anthropic";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  type UIMessage,
} from "ai";
import { z } from "zod";
import { RETAIL_SYSTEM_PROMPT } from "@/lib/domains/retail";
import { runSafeSql } from "@/lib/tools/runSql";

export const runtime = "nodejs"; // BigQuery SDK needs Node, not Edge
export const maxDuration = 60;

// Chart spec types — kept in sync with the frontend ChartBlock component
const chartTypes = ["bar", "line", "pie", "table"] as const;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: RETAIL_SYSTEM_PROMPT,
    messages: modelMessages,

    // Let the model loop: run_sql → render_chart → text answer
    stopWhen: stepCountIs(6),

    tools: {
      run_sql: tool({
        description:
          "Execute a read-only SELECT or WITH query against the Crest retail BigQuery mart. " +
          "Returns rows as an array of objects. Always uses LIMIT and a timeout.",
        inputSchema: z.object({
          query: z
            .string()
            .describe(
              "A SQL SELECT or WITH statement. Use full table names like " +
                "`retail-analytics-495420.dbt_dev_crest_sales_mart.fact_sales`."
            ),
        }),
        execute: async ({ query }) => {
          const result = await runSafeSql(query);
          if (!result.ok) {
            return { error: result.error };
          }
          return {
            row_count: result.row_count,
            truncated: result.truncated,
            rows: result.rows,
          };
        },
      }),

      render_chart: tool({
        description:
          "Render a chart inline in the chat. Call this after run_sql when the user's " +
          "question is best answered visually. The frontend will render the chart based on the spec.",
        inputSchema: z.object({
          type: z
            .enum(chartTypes)
            .describe(
              "'bar' for rankings & comparisons, 'line' for time series, 'pie' for share/mix, 'table' for >10 rows or detail."
            ),
          title: z.string().describe("Short chart title, sentence case."),
          data: z
            .array(z.record(z.string(), z.union([z.string(), z.number(), z.null()])))
            .describe(
              "Array of row objects. Each row has the same keys. E.g. [{label: 'South', revenue: 13200000}]."
            ),
          x_key: z
            .string()
            .describe("Key in data rows used for the x-axis / category label."),
          y_key: z
            .string()
            .describe("Key in data rows used for the y-axis / value (numeric)."),
          y_format: z
            .enum(["money", "number", "pct"])
            .optional()
            .describe("Format hint for the y-axis values."),
        }),
        // Stub execute — the chart is actually rendered on the client by reading
        // the tool input from the message parts. But Anthropic's API requires
        // every tool call to have a tool result before the conversation can
        // continue, so we return a small ack here.
        execute: async ({ type, title, data }) => ({
          rendered: true,
          type,
          title,
          row_count: data.length,
        }),
      }),
    },

    onError: ({ error }) => {
      console.error("[/api/retail/chat] streamText error:", error);
    },
  });

  return result.toUIMessageStreamResponse();
}
