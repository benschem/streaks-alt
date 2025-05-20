import fs from 'fs';
import Database from 'better-sqlite3';

const DB_PATH = process.env.DATABASE_URL || './data/habits.sqlite3';

if (!fs.existsSync(DB_PATH)) {
  console.error('⛔ Database file missing');
  console.error(
    '➡️  Please run migrations before starting the app: `yarn workspace server run db:migrate`',
  );
  process.exit(1);
}

const db = new Database(DB_PATH, { verbose: console.log });
db.pragma('journal_mode = WAL');

export default db;
