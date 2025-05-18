# TODO.md – Habit Streak Tracker

## Project Setup

- [ ] Set up folder structure
- [ ] Set up backend with Express + SQLite3
- [ ] Set up frontend with React + Vite
- [ ] Add shared `.env` file support
- [ ] Install and configure ESLint + Prettier
- [ ] Add logging system (e.g., morgan + winston)

Stretch:

- [ ] Add .editorconfig for consistent formatting across editors.
- [ ] Add Husky + lint-staged to enforce linting/prettier on commit (optional but good for solo or team work).

## Architecture

- [ ] Design database schema (users, habits, streaks)
- [ ] Create MVC structure on backend
- [ ] Decide routing structure (RESTful, JSON API)
- [ ] Think through user time zones for streak tracking.
- [ ] Important to define when a “day” starts/ends.
- [ ] Decide on streak tracking logic: is it purely backend-driven (check DB on each habit submission) or do you need scheduled jobs?

## Backend: Express API

### Core Setup

- [ ] Enable ESM in Node (`"type": "module"`)
- [ ] Set up Express app with routes folder
- [ ] Add middlewares (`express.json`, `express.urlencoded`)
- [ ] Add custom error handler middleware
- [ ] Set up morgan logging for HTTP requests
- [ ] Set up winston for internal logging

### Auth

- [ ] Use connect-sqlite3 for storing sessions
- [ ] Create signup route
- [ ] Create login route
- [ ] Create logout route
- [ ] Add middleware to check authentication
- [ ] Protect private routes

Consider:

- [ ] Add email uniqueness constraint
- [ ] Add user account deletion route
- [ ] Rate limit login attempts (if you care about brute-force prevention)

### Models (Raw SQL)

- [ ] Set up SQLite3 connection module
- [ ] Create users table + SQL helpers
- [ ] Create habits table + SQL helpers
- [ ] Create streaks table + SQL helpers
- [ ] Write safe parameterized queries (no interpolation)
- [ ] Write seed script with test users/habits/streaks

Optional:

- [ ] Use SQL migrations via a tool like better-sqlite3-migrations or write your own

### Routes/Controllers

- [ ] `/auth/signup`
- [ ] `/auth/login`
- [ ] `/auth/logout`
- [ ] `/habits` (CRUD)
- [ ] `/streaks` (track, get streak count, etc.)
- [ ] `/user/profile` (get current user info)
- [ ] `/me` route as shorthand for getting current user data (e.g., dashboard init)

## Frontend: React App (Vite)

### Core Setup

- [ ] Set up React with Vite
- [ ] Add Tailwind or CSS Modules
- [ ] Configure routing (e.g., React Router)
- [ ] Set up global state/context for auth
- [ ] Set up API utility for HTTP requests with fetch

### Pages

- [ ] Signup page
- [ ] Login page
- [ ] Dashboard (streak view)
- [ ] Habit management page (add/delete/edit habits)
- [ ] Settings page (optional)
- [ ] Not found page

### Components

- [ ] NavBar (auth-aware)
- [ ] HabitCard
- [ ] StreakTracker
- [ ] Forms (LoginForm, SignupForm, HabitForm)

Suggest:

- [ ] Reusable Button + Input components with consistent styling
- [ ] Loading states and spinners
- [ ] ErrorBoundary component for catching frontend errors

## Testing

- [ ] Set up backend tests (Jest or Vitest + Supertest)
- [ ] Write unit tests for models (SQL logic)
- [ ] Write integration tests for routes
- [ ] Set up frontend tests (Vitest + Testing Library)
- [ ] Write tests for form handling and validation

Suggest:

- [ ] Add Postman or Insomnia collection for manual API testing
- [ ] Add CI config (e.g., GitHub Actions to run tests on push)

## Security & Validation

- [ ] Hash passwords using `bcrypt`
- [ ] Use CSRF protection for forms or fetch requests
- [ ] Validate and sanitize all input (e.g., `express-validator`)
- [ ] Escape output if using any HTML injection

Consider:

- [ ] Helmet middleware for setting HTTP headers
- [ ] CORS policy setup (even if only between local ports during dev)
- [ ] Session expiry / inactivity timeout

## Analytics & Logging

- [ ] Add logging for login/signup attempts
- [ ] Log habit creation, update, deletion
- [ ] Track user activity or engagement (optional)
- [ ] Rotate logs or manage log files

Optional:

- [ ] Add basic user agent + IP logging
- [ ] Audit logs for account actions (even just console logging)

## Deployment

- [ ] Set up `.env` variables for prod
- [ ] Add Dockerfile (optional)
- [ ] Deploy backend (e.g., Railway, Fly.io, Render)
- [ ] Deploy frontend (e.g., Vercel, Netlify)
- [ ] Use SQLite in file-based mode or use a hosted DB

Consider:

- [ ] SQLite might require read/write permissions on volume, especially if using Docker
- [ ] Add healthcheck route (/health or /ping) for uptime monitoring

## Extras & Polish

- [ ] Mobile-responsive styling
- [ ] Dark mode support
- [ ] Success/failure toasts or alerts
- [ ] Basic accessibility pass (keyboard nav, labels)
- [ ] Daily streak check (automated or user-triggered)

Optional:

- [ ] Push notifications or daily reminder emails (a future stretch goal)
- [ ] Local timezone adjustment per user

## Maintenance

- [ ] Create `README.md` with setup and usage
- [ ] Create migration/reset script for DB
- [ ] Add `package.json` scripts (`dev`, `lint`, `start`, etc.)
- [ ] Organize folders for long-term maintainability
