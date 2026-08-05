# 14-Day Development Checklist

## Overview
This roadmap is designed to build the project incrementally over 14 days. Each day focuses on one major milestone with clear goals, tasks, deliverables, commit messages, and practical tips.

---

# Day 1 — Project Foundation

**Goal:** Create a runnable project skeleton (not features).

## Claude Code Tasks
- Scaffold frontend with React, Vite, Tailwind CSS, React Router, and a clean folder structure.
- Scaffold backend using Node.js, Express, and a modular/MVC architecture.
- Configure PostgreSQL connection, migrations, and seed scripts.
- Add `.env.example`, `.gitignore`, Prettier, ESLint, and npm scripts.
- Create a backend health check endpoint.
- Create a minimal frontend landing page.

## Code Deliverables
```
/client
/server
Database connection file
GET /api/health
Basic UI shell
README.md
```

**Commit**
```text
chore: initialize frontend, backend, and database setup
```

**Tip**

Keep Day 1 small and stable. Success means:
- Frontend runs
- Backend runs
- Database connects

---

# Day 2 — Authentication

**Goal:** Implement complete authentication.

## Claude Code Tasks
- User model with role and status
- Password hashing
- Register/Login/Logout APIs
- JWT or session authentication
- Frontend authentication pages
- Form validation
- Authentication middleware

## Code Deliverables
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- Authentication pages
- Token storage strategy
- Protected session handling

**Commit**
```text
feat: implement authentication flow
```

**Tip**

Test with:
- One seeded admin account
- One student registration flow

---

# Day 3 — Authorization

**Goal:** Separate Admin and Student permissions.

## Claude Code Tasks
- Role-based middleware
- Protected frontend routes
- Unauthorized & Forbidden pages
- Admin API restrictions
- Student API restrictions
- Route guards

## Code Deliverables
- `requireAuth`
- `requireAdmin`
- `requireStudent`
- Protected routes
- Access denied UI

**Commit**
```text
feat: add role-based access control
```

**Tip**

Never rely only on frontend authorization. Enforce permissions on the backend.

---

# Day 4 — Admin Dashboard Base

**Goal:** Build the admin dashboard layout.

## Claude Code Tasks
- Sidebar and header
- Dashboard route
- Summary cards
- Placeholder charts
- Dashboard summary API
- Loading & empty states

## Code Deliverables
- Admin layout
- Dashboard cards
- Dashboard API
- Reusable stat card

**Commit**
```text
feat: build admin dashboard layout and summary cards
```

**Tip**

Placeholder chart data is acceptable if the API contract is complete.

---

# Day 5 — Quiz Management

**Goal:** Admin can manage quizzes.

## Claude Code Tasks
- Quiz model
- CRUD APIs
- Publish/Unpublish
- Quiz list
- Quiz create/edit forms
- Validation

## Code Deliverables
- `GET /api/quizzes`
- `POST /api/quizzes`
- `PUT /api/quizzes/:id`
- `DELETE /api/quizzes/:id`
- `PATCH /api/quizzes/:id/publish`
- Quiz table
- Quiz form

**Commit**
```text
feat: implement quiz management
```

**Tip**

Use consistent statuses:
- Draft
- Published
- Unpublished

---

# Day 6 — Categories & Questions

**Goal:** Connect quizzes with categories and questions.

## Claude Code Tasks
- Category CRUD
- Question schema
- Option schema
- Question CRUD
- Question editor
- Explanation & marks fields

## Code Deliverables
- Category CRUD APIs
- Question CRUD APIs
- Question editor
- Option editor
- Correct answer logic

**Commit**
```text
feat: add category and question management
```

**Tip**

Allow only one correct answer for MCQs.

---

# Day 7 — Student Quiz Browsing

**Goal:** Students can browse quizzes.

## Claude Code Tasks
- Quiz listing
- Search
- Filters
- Quiz details
- Published-only visibility
- Start Quiz action

## Code Deliverables
- Filtered quiz API
- Quiz details API
- Quiz cards
- Filter bar
- Details page

**Commit**
```text
feat: build quiz discovery and details pages
```

**Tip**

Prefer server-side filtering.

---

# Day 8 — Quiz Attempt Flow

**Goal:** Students can take quizzes.

## Claude Code Tasks
- Start attempt API
- Timer
- Attempt screen
- Navigation
- Answer selection
- Draft persistence

## Code Deliverables
- `POST /api/quizzes/:quizId/start`
- Attempt state
- Quiz runner
- Timer
- Navigation

**Commit**
```text
feat: implement quiz attempt interface
```

**Tip**

The backend should control attempt timing.

---

# Day 9 — Submission & Scoring

**Goal:** Automatically calculate quiz results.

## Claude Code Tasks
- Submit API
- Eligibility validation
- Scoring service
- Save attempts
- Auto-submit
- Return results

## Code Deliverables
- `POST /api/quizzes/:quizId/submit`
- Scoring service
- Attempt persistence
- Result payload

**Commit**
```text
feat: add quiz submission and scoring
```

**Tip**

Keep scoring logic in a dedicated service.

---

# Day 10 — Results & History

**Goal:** Students review previous attempts.

## Claude Code Tasks
- Results page
- Attempt history
- Attempt details
- Review answers
- Link history to results

## Code Deliverables
- `GET /api/attempts`
- `GET /api/attempts/:id`
- Results UI
- History UI

**Commit**
```text
feat: add result review and attempt history
```

**Tip**

Prioritize readability.

---

# Day 11 — Student Dashboard

**Goal:** Show performance analytics.

## Claude Code Tasks
- Dashboard
- Summary cards
- Aggregates
- Recent attempts
- Progress chart

## Code Deliverables
- Dashboard route
- Stats API
- Recent attempts
- Performance chart

**Commit**
```text
feat: implement student dashboard and analytics
```

**Tip**

Focus on meaningful metrics instead of many charts.

---

# Day 12 — Leaderboard

**Goal:** Rank students.

## Claude Code Tasks
- Leaderboard API
- Overall ranking
- Category ranking (optional)
- Leaderboard UI
- Sorting

## Code Deliverables
- `GET /api/leaderboard`
- Leaderboard table
- Filters (optional)

**Commit**
```text
feat: add leaderboard feature
```

**Tip**

Document ranking rules.

---

# Day 13 — Testing & Security

**Goal:** Make the project production-ready.

## Claude Code Tasks
- Validation
- Rate limiting
- Security headers
- Input sanitization
- Authentication tests
- Authorization tests
- Quiz flow tests
- Edge-case testing

## Code Deliverables
- Validation schemas
- Security middleware
- Test cases
- Optional Postman collection

**Commit**
```text
test: add validation and security coverage
```

**Tip**

Testing significantly improves project quality.

---

# Day 14 — Deployment & Documentation

**Goal:** Final production release.

## Claude Code Tasks
- Cleanup
- README
- Environment setup
- Deployment configuration
- Screenshots
- Production verification
- Bug fixes

## Code Deliverables
- Final README
- Deployment config
- Production build
- Screenshots section

**Commit**
```text
docs: finalize project documentation and deployment setup
```

**Tip**

Avoid leaving unfinished TODOs unless clearly marked as future enhancements.

---

# Daily Working Style

- Focus on one major feature each day.
- End the day only after the feature is testable.
- Keep commits small and meaningful.
- Maintain consistent naming conventions.
- Avoid unrelated changes in a single commit.
- Keep API contracts stable.
- Add seed data early for demos.

---

# Git Workflow

1. Implement the feature.
2. Test locally.
3. Format and clean the code.
4. Commit changes.
5. Push to the repository.

## Recommended Commit Prefixes

```text
feat:
fix:
test:
refactor:
docs:
chore:
```
