import express from 'express';
// No routes yet to use `db`, so...
// eslint-disable-next-line no-unused-vars
import db from './db/db.js';
import { assertMigrationsUpToDate } from './utils/checkMigrations.js';

assertMigrationsUpToDate(); // 💥 Exit early if schema is out of date

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());

// Import and use routes here, for example:
// import habitsRoutes from './routes/habits.js';
// app.use('/habits', habitsRoutes);

// Start server immediately (better-sqlite3 opens synchronously)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
