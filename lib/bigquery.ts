/**
 * Server-side BigQuery client (singleton).
 * Credentials loaded from env var GOOGLE_APPLICATION_CREDENTIALS_JSON.
 *
 * NEVER import this from a Client Component — keep on the server.
 */
import "server-only";
import { BigQuery } from "@google-cloud/bigquery";

const PROJECT_ID = process.env.GOOGLE_PROJECT_ID!;
const LOCATION = "us-central1";

// Singleton pattern — reuse client across requests
let _bq: BigQuery | null = null;

export function getBigQuery(): BigQuery {
  if (_bq) return _bq;

  const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (!credsJson) {
    throw new Error(
      "GOOGLE_APPLICATION_CREDENTIALS_JSON env var not set. Check .env.local or Vercel env vars."
    );
  }

  const credentials = JSON.parse(credsJson);
  _bq = new BigQuery({
    projectId: PROJECT_ID,
    credentials,
  });

  return _bq;
}

/**
 * Run a parameterized query against the retail mart.
 * Always uses us-central1 location and the dev mart for now.
 */
export async function query<T = unknown>(
  sql: string,
  params: Record<string, unknown> = {}
): Promise<T[]> {
  const bq = getBigQuery();
  const [rows] = await bq.query({
    query: sql,
    params,
    location: LOCATION,
  });
  return rows as T[];
}

// Mart dataset constants — single source of truth for table names
export const MART = `\`${PROJECT_ID}.dbt_dev_crest_sales_mart\``;
export const TABLES = {
  fact_sales: `${MART}.fact_sales`,
  dim_customers: `${MART}.dim_customers`,
  dim_products: `${MART}.dim_products`,
  dim_stores: `${MART}.dim_stores`,
  dim_dates: `${MART}.dim_dates`,
} as const;
