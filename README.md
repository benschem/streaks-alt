# Habit Tracker App

A simple full-stack habit-tracking application built with:

- **Express** for the backend (MVC-style)
- **React** with Vite for the frontend
- **SQLite3** with raw SQL queries for persistence
- **Yarn** workspaces for monorepo-style package management

## Project Structure

This project uses [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to manage the frontend and backend apps in a single monorepo.

## Getting Started

### Prerequisites

- Node.js
- Yarn
- SQLite3 (CLI optional; app initializes DB itself)

This project uses Yarn Berry. Make sure you're using Node 16.10+ with Corepack enabled. Run `corepack enable` and `yarn --version` should report 4.x. See .yarnrc.yml and .yarn/ folder for configuration details.

### Install Dependencies

From the project root:

```bash
yarn install
```

Because we're using Yarn Workspaces, this installs all dependencies for both /client and /server, deduplicated where possible.

### Run the App

In development:

### Start both frontend and backend concurrently

```bash
yarn dev
```

## Database

This app uses a local SQLite3 database stored at server/data/habits.sqlite3.

To initialize the schema:

```bash
cd server
yarn db:init
```

## License

MIT
