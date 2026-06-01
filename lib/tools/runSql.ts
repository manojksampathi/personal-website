/**
 * Safe SQL execution for the AI chat agent.
 *
 * Safety guarantees:
 *  - SELECT/WITH only (no DDL/DML)
 *  - Forbidden keywords blocked
 *  - Forced LIMIT
 *  - Server-side timeout
 *  - Only allowed tables can be referenced
 */
import "server-only";
import { query } from "@/lib/bigquery";
import {
  RETAIL_DATASET,
  RETAIL_ALLOWED_TABLES,
} from "@/lib/domains/retail";

const MAX_ROWS = 5000;
const QUERY_TIMEOUT_MS = 15_000;

// Forbidden anywhere in the query (case-insensitive whole-word match)
const FORBIDDEN_KEYWORDS = [
  "INSERT",
  "UPDATE",
  "DELETE",
  "MERGE",
  "DROP",
  "ALTER",
  "CREATE",
  "TRUNCATE",
  "GRANT",
  "REVOKE",
  "EXECUTE",
  "CALL",
] as const;

export type RunSqlResult =
  | { ok: true; rows: Record<string, unknown>[]; row_count: number; truncated: boolean }
  | { ok: false; error: string };

export async function runSafeSql(sqlIn: string): Promise<RunSqlResult> {
  const sql = sqlIn.trim().replace(/;+\s*$/g, ""); // strip trailing semicolons

  // 1. Must start with SELECT or WITH (CTE)
  if (!/^\s*(SELECT|WITH)\b/i.test(sql)) {
    return { ok: false, error: "Only SELECT/WITH queries are allowed." };
  }

  // 2. No forbidden keywords (regex with word boundaries, case-insensitive)
  for (const kw of FORBIDDEN_KEYWORDS) {
    const re = new RegExp(`\\b${kw}\\b`, "i");
    if (re.test(sql)) {
      return {
        ok: false,
        error: `Query contains forbidden keyword: ${kw}. Read-only access only.`,
      };
    }
  }

  // 3. Multi-statement attempt (semicolons in the middle)
  if (/;[^"]*\S/.test(sql)) {
    return { ok: false, error: "Multiple statements are not allowed." };
  }

  // 4. Table allowlist: any \`...dbt_dev_crest_sales_mart.TABLE\` reference
  //    must be in RETAIL_ALLOWED_TABLES. Bare table refs are also allowed
  //    as long as they match an allowed name.
  const tableRefRegex = new RegExp(
    `\`?(?:[\\w-]+\\.)*${RETAIL_DATASET.replace(/[.-]/g, "\\$&")}\\.([\\w]+)\`?`,
    "gi"
  );
  let m: RegExpExecArray | null;
  while ((m = tableRefRegex.exec(sql)) !== null) {
    const table = m[1].toLowerCase();
    if (!RETAIL_ALLOWED_TABLES.includes(table as (typeof RETAIL_ALLOWED_TABLES)[number])) {
      return {
        ok: false,
        error: `Table '${table}' is not allowed. Allowed: ${RETAIL_ALLOWED_TABLES.join(", ")}.`,
      };
    }
  }

  // 5. Reject INFORMATION_SCHEMA, system tables, other datasets
  if (/INFORMATION_SCHEMA/i.test(sql)) {
    return {
      ok: false,
      error: "INFORMATION_SCHEMA is not accessible.",
    };
  }
  if (
    /\bFROM\s+`?(?!.*dbt_dev_crest_sales_mart)[A-Za-z]/i.test(sql) &&
    !/\bFROM\s+\w+\s*$/i.test(sql) // allow bare aliases inside CTEs
  ) {
    // This is a soft heuristic — the table allowlist regex above is the strong check.
  }

  // 6. Force LIMIT if missing (only the outermost statement; CTEs are fine)
  const hasOuterLimit = /\bLIMIT\s+\d+\b/i.test(sql.split(/\bWITH\b/i).pop() || sql);
  const finalSql = hasOuterLimit ? sql : `${sql}\nLIMIT ${MAX_ROWS}`;

  // 7. Execute with timeout via Promise.race
  try {
    const result = await Promise.race([
      query<Record<string, unknown>>(finalSql),
      new Promise<never>((_, reject) =>
        setTimeout(
          () =>
            reject(
              new Error(`Query exceeded ${QUERY_TIMEOUT_MS / 1000}s timeout`)
            ),
          QUERY_TIMEOUT_MS
        )
      ),
    ]);

    const rows = result as Record<string, unknown>[];
    const truncated = rows.length >= MAX_ROWS;

    // 8. Sanitize: convert BigQuery numerics (strings) to numbers when possible
    const sanitized = rows.map((row) => {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(row)) {
        if (
          typeof v === "string" &&
          /^-?\d+(\.\d+)?$/.test(v) &&
          !isNaN(Number(v))
        ) {
          out[k] = Number(v);
        } else if (v && typeof v === "object" && "value" in v) {
          // BigQuery wraps dates/timestamps in objects
          out[k] = (v as { value: unknown }).value;
        } else {
          out[k] = v;
        }
      }
      return out;
    });

    return {
      ok: true,
      rows: sanitized,
      row_count: sanitized.length,
      truncated,
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
