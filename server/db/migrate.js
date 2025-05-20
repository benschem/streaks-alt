import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import { execSync } from 'child_process';

const DB_PATH = path.resolve(process.env.DATABASE_URL || './data/habits.sqlite3');
const MIGRATIONS_DIR = path.resolve('db/migrations');
const SCHEMA_PATH = path.resolve('db/schema.sql');

function getSchemaVersion(db) {
  const metaExists = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='meta';`).get();

  if (!metaExists) {
    return 0;
  }

  try {
    const row = db.prepare('SELECT schema_version FROM meta').get();
    return row?.schema_version ?? 0;
  } catch {
    return 0;
  }
}

function getMigrationFiles() {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => /^\d+_.+\.sql$/.test(f))
    .sort();
}

function runSingleMigration(file, db) {
  console.log(`Running migration ${file}...`);
  const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
  db.exec(sql);
}

function updateSchemaVersion(version, db) {
  db.prepare('UPDATE meta SET schema_version = ?').run(version);
}

function runAllMigrations() {
  console.log('Starting migrations...');

  const db = new Database(DB_PATH); // will use existing db if there is one
  db.pragma('journal_mode = WAL');

  try {
    let schemaVersion = getSchemaVersion(db);
    const migrationFiles = getMigrationFiles();

    const lastMigration = migrationFiles[migrationFiles.length - 1];
    const lastMigrationVersion = parseInt(lastMigration.split('_')[0], 10);
    if (lastMigrationVersion === schemaVersion) {
      console.log('Migrations already up to date.');
      process.exit(0);
    }

    for (const file of migrationFiles) {
      const version = parseInt(file.split('_')[0], 10);

      if (version > schemaVersion) {
        runSingleMigration(file, db);
        updateSchemaVersion(version, db);
        schemaVersion = version;
      }
    }

    console.log('✅ All migrations complete.');
    dumpSchema();
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  } finally {
    db.close();
  }
}

function dumpSchema() {
  console.log('Dumping schema to db/schema.sql...');
  const schemaComment = '-- AUTO-GENERATED FILE. DO NOT EDIT.\n-- Run by migrate.js after migrations complete.\n\n';

  try {
    const schemaOutput = execSync(`sqlite3 ${DB_PATH} .schema`, { encoding: 'utf8' });
    fs.writeFileSync(SCHEMA_PATH, schemaComment + schemaOutput);
    console.log('✅ Schema written to db/schema.sql');
  } catch (err) {
    console.error('❌ Failed to write schema.sql:', err);
  }
}

runAllMigrations();
