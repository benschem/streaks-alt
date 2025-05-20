import fs from 'fs';
import path from 'path';
import db from '../db/config.js';

function getCurrentDbVersion() {
  try {
    const row = db.prepare('SELECT schema_version FROM meta').get();
    return row?.schema_version ?? 0;
  } catch (e) {
    console.debug('Failed to get schema version:', e.message);
    return 0; // No meta table: assume no migrations run yet
  }
}

function getLatestMigrationVersion() {
  const migrationsDir = path.resolve('db/migrations');
  const files = fs.readdirSync(migrationsDir);
  const versions = files
    .filter((f) => /^\d+_.+\.sql$/.test(f))
    .map((f) => parseInt(f.split('_')[0], 10));
  return versions.length > 0 ? Math.max(...versions) : 0;
}

export function exitUnlessSchemaUpToDate() {
  const currentVersion = getCurrentDbVersion();
  const latestVersion = getLatestMigrationVersion();

  if (currentVersion < latestVersion) {
    console.error(
      `⛔ Database schema is out of date (current: ${currentVersion}, latest: ${latestVersion}).`,
    );
    console.error(
      '➡️  Please run migrations before starting the app: `yarn workspace server run db:migrate`',
    );
    process.exit(1);
  }
}
