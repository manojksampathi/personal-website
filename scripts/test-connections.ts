/**
 * Sanity-check both BigQuery and Anthropic connections.
 * Run: npx tsx scripts/test-connections.ts
 */

import { BigQuery } from '@google-cloud/bigquery';
import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

async function testBigQuery() {
  const creds = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON!);
  const bq = new BigQuery({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: creds,
  });

  const [rows] = await bq.query({
    query: 'SELECT COUNT(*) AS n FROM `retail-analytics-495420.dbt_dev_crest_sales_mart.fact_sales`',
    location: 'us-central1',
  });
  console.log(`  ✓ BigQuery: fact_sales has ${rows[0].n.toLocaleString()} rows`);
}

async function testAnthropic() {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const msg = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 50,
    messages: [{ role: 'user', content: 'Reply with exactly: connection ok' }],
  });
  const text = (msg.content[0] as any).text.trim();
  console.log(`  ✓ Anthropic: replied "${text}"`);
}

(async () => {
  console.log('Testing connections...\n');
  try {
    await testBigQuery();
  } catch (e: any) {
    console.error('  ✗ BigQuery FAILED:', e.message);
  }
  try {
    await testAnthropic();
  } catch (e: any) {
    console.error('  ✗ Anthropic FAILED:', e.message);
  }
  console.log('\nDone.');
})();
