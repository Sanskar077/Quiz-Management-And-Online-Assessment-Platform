# Quiz Management & Online Assessment Platform

A full-stack web application for creating, managing, and taking online quizzes. Supports two roles — **Admin** (manages users, quizzes, categories, questions, analytics, leaderboard) and **Student** (browses quizzes, attempts them, reviews results, tracks performance).

## Tech Stack

| Layer    | Technology                                            |
| -------- | ----------------------------------------------------- |
| Frontend | React (Vite), Tailwind CSS, React Router, Axios       |
| Backend  | Node.js, Express (modular MVC)                        |
| Database | PostgreSQL (hosted — Neon/Supabase)                   |
| Auth     | JWT, bcrypt password hashing (from Day 2)             |

## Project Structure

```
├── client/                 # React frontend (Vite)
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── context/        # React context providers
│       ├── hooks/          # Custom hooks
│       ├── pages/          # Route-level pages
│       ├── services/       # API client (axios)
│       └── utils/          # Helpers
├── server/                 # Express backend
│   └── src/
│       ├── config/         # Env + database configuration
│       ├── controllers/    # Request handlers
│       ├── db/             # Migration & seed runners + SQL files
│       ├── middleware/     # Auth, errors, validation
│       ├── models/         # Data access layer
│       ├── routes/         # Route definitions
│       ├── services/       # Business logic (scoring, etc.)
│       └── utils/          # Helpers
├── Information.md          # Full project requirements
└── 14-Day-Development-Checklist.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (free tier at [Neon](https://neon.tech) or [Supabase](https://supabase.com))

### 1. Backend

```bash
cd server
npm install
copy .env.example .env   # (Windows) — then fill in DATABASE_URL
npm run dev              # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
npm run dev              # starts on http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to the backend.

### 3. Database

```bash
cd server
npm run db:migrate       # apply pending SQL migrations
npm run db:seed          # run idempotent seed scripts
```

### Verify

- Backend: `GET http://localhost:5000/api/health` → `{ "success": true, "data": { "status": "ok", "database": "connected", ... } }`
- Frontend: open `http://localhost:5173` — the landing page shows live API status.

## Scripts

| Location | Script           | Purpose                        |
| -------- | ---------------- | ------------------------------ |
| server   | `npm run dev`    | Start API with hot reload      |
| server   | `npm start`      | Start API (production)         |
| server   | `npm run db:migrate` | Apply database migrations  |
| server   | `npm run db:seed`    | Run seed scripts           |
| server   | `npm run format` | Format code with Prettier      |
| client   | `npm run dev`    | Start Vite dev server          |
| client   | `npm run build`  | Production build               |
| client   | `npm run lint`   | Lint frontend code             |

## Development Roadmap

Built incrementally over 14 days — see [14-Day-Development-Checklist.md](./14-Day-Development-Checklist.md).

- [x] Day 1 — Project foundation (frontend, backend, database setup)
- [ ] Day 2 — Authentication
- [ ] Day 3 — Role-based authorization
- [ ] Day 4 — Admin dashboard base
- [ ] Day 5 — Quiz management
- [ ] Day 6 — Categories & questions
- [ ] Day 7 — Student quiz browsing
- [ ] Day 8 — Quiz attempt flow
- [ ] Day 9 — Submission & scoring
- [ ] Day 10 — Results & history
- [ ] Day 11 — Student dashboard
- [ ] Day 12 — Leaderboard
- [ ] Day 13 — Testing & security
- [ ] Day 14 — Deployment & documentation
