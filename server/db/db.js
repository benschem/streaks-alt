import Database from 'better-sqlite3';

const db = new Database(process.env.DATABASE_URL || './data/habits.sqlite3', {
  verbose: console.log,
});
db.pragma('journal_mode = WAL');

export default db;
