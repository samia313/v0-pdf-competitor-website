import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('[ERROR] DATABASE_URL environment variable not set');
  process.exit(1);
}

const client = new Client({ connectionString });

async function runMigration() {
  try {
    console.log('[INFO] Connecting to Neon database...');
    await client.connect();
    console.log('[SUCCESS] Connected to database');

    const migrationPath = path.join(process.cwd(), 'migrations', 'ai-documents.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('[INFO] Executing AI Document Assistant migration...');
    await client.query(sql);
    console.log('[SUCCESS] Migration completed successfully!');

    console.log('[INFO] Verifying tables created...');
    const result = await client.query(
      `SELECT tablename FROM pg_tables WHERE tablename LIKE 'ai_%' ORDER BY tablename`
    );

    if (result.rows.length > 0) {
      console.log('[SUCCESS] Created tables:');
      result.rows.forEach(row => {
        console.log(`  ✓ ${row.tablename}`);
      });
    } else {
      console.warn('[WARNING] No AI tables found after migration');
    }

  } catch (error) {
    console.error('[ERROR] Migration failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
