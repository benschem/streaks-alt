import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());

// No routes yet to use `db`
// eslint-disable-next-line no-unused-vars
let db;
const initDb = async () => {
  db = await open({
    filename: process.env.DATABASE_URL || './data/habits.sqlite3',
    driver: sqlite3.Database,
  });
};

// Routes

// Start server only after DB is ready
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
