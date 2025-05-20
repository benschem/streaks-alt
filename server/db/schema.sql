-- AUTO-GENERATED FILE. DO NOT EDIT.
-- Run by migrate.js after migrations complete.

CREATE TABLE meta (
  schema_version INTEGER NOT NULL
);
CREATE TABLE habits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  done_today BOOLEAN DEFAULT 0,
  hot_streak INTEGER DEFAULT 0,
  hot_record INTEGER DEFAULT 0,
  cold_streak INTEGER DEFAULT 0,
  date_last_done DATE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  previous_cold_streak INTEGER DEFAULT 0,
  previous_date_last_done DATE
);
CREATE TABLE sqlite_sequence(name,seq);
