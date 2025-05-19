import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const DB_PATH = path.resolve(
  process.env.DATABASE_URL || './data/habits.sqlite3',
);
const MIGRATIONS_DIR = path.resolve('db/migrations');

function runMigrations() {
  const db = new Database(DB_PATH);

  try {
    // Check if meta table exists
    const metaExists = db
      .prepare(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='meta';`,
      )
      .get();

    let currentVersion = 0;

    if (metaExists) {
      const row = db.prepare('SELECT schema_version FROM meta').get();
      currentVersion = row?.schema_version ?? 0;
    } else {
      // If meta doesn't exist, create it and set schema_version to 0
      db.exec(`
        CREATE TABLE IF NOT EXISTS meta (
          schema_version INTEGER NOT NULL
        );
      `);
      db.exec(`INSERT INTO meta (schema_version) VALUES (0);`);
      currentVersion = 0;
    }

    // Read and sort migration files by version number
    const files = fs
      .readdirSync(MIGRATIONS_DIR)
      .filter((f) => /^\d+_.+\.sql$/.test(f))
      .sort();

    for (const file of files) {
      const version = parseInt(file.split('_')[0], 10);

      if (version > currentVersion) {
        const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
        console.log(`Running migration ${file}...`);
        db.exec(sql);
        db.prepare('UPDATE meta SET schema_version = ?').run(version);
      }
    }

    console.log('Migrations complete.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    db.close();
  }
}

runMigrations();
