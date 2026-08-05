# Quiz Management & Online Assessment Platform

## Overview
The Quiz Management & Online Assessment Platform is a full-stack web application for online quizzes and assessments. It supports two roles: **Admin** and **Student/User**.

- **Admin** manages quizzes, questions, categories, users, attempts, analytics, and leaderboard.
- **Student/User** registers, logs in, browses quizzes, attempts quizzes, views results, reviews answers, and tracks performance.

The project is designed to cover:
- Frontend development
- Backend development
- Authentication and authorization
- CRUD operations
- Relational database design
- REST APIs
- Timers and scoring systems
- Dashboards and analytics
- Responsive web design
- Security best practices

---

## Project Objectives
- Build a complete online quiz platform.
- Implement secure user authentication.
- Support Admin and Student roles.
- Allow Admin to create and manage quizzes.
- Allow Admin to create and manage questions.
- Allow students to attempt quizzes online.
- Implement automatic scoring.
- Implement a countdown timer.
- Store quiz attempts and results.
- Provide performance analytics.
- Provide a leaderboard.
- Create separate Admin and Student dashboards.
- Build a responsive web application.

---

## User Roles

### Admin
Admin has full control over the platform.

**Features**
- Admin login
- Admin dashboard
- Manage students/users
- Create quizzes
- Edit quizzes
- Delete quizzes
- Publish/unpublish quizzes
- Create questions
- Edit questions
- Delete questions
- Manage categories
- Manage difficulty levels
- View all quiz attempts
- View individual student results
- View quiz performance
- View platform analytics
- Manage leaderboard
- Activate/deactivate users

### Student/User
Students can participate in published quizzes.

**Features**
- Register
- Login
- Logout
- View available quizzes
- Search quizzes
- Filter quizzes
- View quiz details
- Start quiz
- Answer questions
- Navigate between questions
- View remaining time
- Submit quiz
- View result
- Review answers
- View previous attempts
- Track performance
- View leaderboard

---

## Main Modules

### 1. Authentication
Support both Admin and Student authentication.

**Student**
- Registration
- Login
- Logout
- Forgot password
- Reset password

**Admin**
- Login
- Logout
- Password reset

> Admin accounts can be created manually by the system owner or through a secure admin-management flow.

### 2. Admin Dashboard
The Admin dashboard is the control center.

**Statistics**
- Total students
- Total quizzes
- Published quizzes
- Draft quizzes
- Total questions
- Total quiz attempts
- Average score
- Total passed attempts
- Total failed attempts

**Analytics**
- Quiz attempts over time
- Student registrations
- Average quiz scores
- Pass/fail ratio
- Most popular quizzes
- Most popular categories

### 3. User Management
Admin can manage all registered students.

**Features**
- View all students
- Search students
- View student profile
- View student quiz history
- View student performance
- Activate/deactivate account
- Delete account

**Student Information**
- Name
- Email
- Registration date
- Account status
- Quizzes attempted
- Average score
- Highest score

### 4. Quiz Management
Admin manages all quizzes.

**Quiz fields**
- Title
- Description
- Category
- Difficulty
- Duration
- Passing percentage
- Maximum attempts
- Status
- Thumbnail/image (optional)

**Quiz statuses**
- Draft
- Published
- Unpublished

Only published quizzes should be visible to students.

### 5. Category Management
Admin manages quiz categories.

**Examples**
- HTML
- CSS
- JavaScript
- React
- Node.js
- Python
- Java
- Database
- Computer Networks
- Cyber Security

**Features**
- Create category
- Edit category
- Delete category
- View quizzes under category

### 6. Question Management
Admin manages questions for each quiz.

**Question fields**
- Question text
- Options
- Correct answer
- Explanation
- Marks
- Difficulty

### 7. Question Types
Initial version:
- Multiple choice question with one correct answer

Future enhancements:
- Multiple correct answers
- True/False
- Fill in the blanks
- Match the following
- Image-based questions
- Code-based questions

### 8. Quiz Attempt System
Students can attempt published quizzes.

**Student actions**
- Select an answer
- Move to next question
- Move to previous question
- Navigate directly to a question
- See answered/unanswered questions
- Submit the quiz

### 9. Timer System
Each quiz has a predefined duration.

**Timer behavior**
- Starts when quiz starts
- Shows remaining time
- Continues after refresh where possible
- Auto-submits when time expires

> The backend must validate start time and expiry time.

### 10. Quiz Submission
Backend calculates the final result.

**Calculated fields**
- Correct answers
- Incorrect answers
- Unanswered questions
- Total marks
- Obtained marks
- Percentage
- Pass/fail status
- Time taken

> Scoring must happen on the backend, not in the frontend.

### 11. Result System
After submission, students see a detailed result.

**Result includes**
- Quiz name
- Score
- Correct answers
- Incorrect answers
- Unanswered questions
- Time taken
- Status

Students should also be able to review:
- Question
- Selected answer
- Correct answer
- Explanation
- Whether the answer was correct

### 12. Student Dashboard
The student dashboard summarizes performance.

**Statistics**
- Total quizzes attempted
- Total quizzes passed
- Total quizzes failed
- Average score
- Highest score
- Total questions answered

**Recent attempts**
- Quiz name
- Score

### 13. Quiz Discovery
Students can easily find quizzes.

**Search by**
- Quiz title
- Category

**Filter by**
- Category
- Difficulty
- Duration
- Recently added
- Popularity

### 14. Quiz Details Page
Before starting a quiz, students can view:
- Description
- Category
- Difficulty
- Number of questions
- Duration
- Passing score
- Maximum attempts
- Start quiz button

### 15. Quiz Attempt History
Students can view all previous attempts.

**Table columns**
- Quiz
- Date
- Score
- Status

Clicking an attempt opens detailed results.

### 16. Leaderboard
Leaderboard can rank students by:
- Highest score
- Average score
- Number of quizzes completed

**Views**
- Overall
- Category-wise
- Monthly
- Weekly

---

## Database Design

### users
- id
- name
- email
- password
- role
- status
- created_at

**Role values**
- ADMIN
- STUDENT

### categories
- id
- name
- description
- created_at

### quizzes
- id
- title
- description
- category_id
- difficulty
- duration
- passing_score
- max_attempts
- status
- created_at
- updated_at

### questions
- id
- quiz_id
- question_text
- marks
- explanation
- difficulty
- created_at

### options
- id
- question_id
- option_text
- is_correct

### attempts
- id
- quiz_id
- user_id
- score
- percentage
- correct_answers
- incorrect_answers
- unanswered
- time_taken
- status
- started_at
- completed_at

### answers
- id
- attempt_id
- question_id
- selected_option_id
- is_correct

---

## Recommended Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- Recharts
- React Hook Form

### Backend
- Node.js
- Express.js

### Database
Recommended:
- PostgreSQL

Alternatives:
- MySQL
- MongoDB

> PostgreSQL is recommended because the app has strong relational data needs.

---

## Application Architecture
- Student/Admin interacts with the frontend.
- Frontend communicates with backend through REST API.
- Backend handles authentication, business logic, and scoring.
- PostgreSQL stores users, quizzes, questions, attempts, and answers.

---

## Two-Week Development Schedule

### Week 1

#### Day 1 – Project Setup
- Frontend setup
- Backend setup
- Database setup
- Git repository
- Environment configuration

#### Day 2 – Authentication
- Student registration
- Login
- Logout
- Password hashing
- JWT/session authentication

#### Day 3 – Role-Based Authorization
- Admin role
- Student role
- Protected routes
- Admin middleware
- Student middleware

#### Day 4 – Admin Dashboard
- Dashboard layout
- Statistics
- Navigation
- User management

#### Day 5 – Quiz Management
- Create quiz
- Edit quiz
- Delete quiz
- Publish/unpublish quiz

#### Day 6 – Category & Question Management
- Category CRUD
- Add questions
- Add options
- Correct answer
- Question editing/deletion

#### Day 7 – Student Quiz Interface
- Quiz listing
- Quiz details
- Start quiz
- Question navigation
- Answer selection
- Timer

### Week 2

#### Day 8 – Quiz Submission
- Submit quiz
- Automatic submission
- Score calculation
- Pass/fail calculation

#### Day 9 – Results
- Result page
- Answer review
- Correct/incorrect answers
- Explanations
- Attempt history

#### Day 10 – Student Dashboard
- Statistics
- Quiz history
- Average score
- Performance charts

#### Day 11 – Admin Analytics
- Student statistics
- Quiz statistics
- Attempt statistics
- Pass/fail analytics

#### Day 12 – Leaderboard
- Ranking system
- Overall leaderboard
- Category leaderboard

#### Day 13 – Testing & Security
- Authentication
- Authorization
- Quiz creation
- Quiz attempts
- Timer
- Score calculation
- API validation
- Unauthorized access
- Input validation

#### Day 14 – Deployment & Documentation
- Deploy frontend
- Deploy backend
- Configure production database
- Environment variables
- Production testing
- README
- Screenshots
- Project presentation

---

## Important API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Users
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `PATCH /api/users/:id/status`

### Categories
- `GET /api/categories`
- `POST /api/categories`
- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`

### Quizzes
- `GET /api/quizzes`
- `GET /api/quizzes/:id`
- `POST /api/quizzes`
- `PUT /api/quizzes/:id`
- `DELETE /api/quizzes/:id`
- `PATCH /api/quizzes/:id/publish`

### Questions
- `GET /api/quizzes/:quizId/questions`
- `POST /api/quizzes/:quizId/questions`
- `PUT /api/questions/:id`
- `DELETE /api/questions/:id`

### Quiz Attempts
- `POST /api/quizzes/:quizId/start`
- `POST /api/quizzes/:quizId/submit`
- `GET /api/attempts`
- `GET /api/attempts/:id`

### Admin Results
- `GET /api/admin/attempts`
- `GET /api/admin/attempts/:id`
- `GET /api/admin/analytics`

### Leaderboard
- `GET /api/leaderboard`

---

## Advanced Features
After the core project is done, you can add:
- Question randomization
- Option randomization
- Negative marking
- Maximum attempts
- Quiz scheduling
- Certificate generation
- Email notifications
- Dark mode
- Question import via CSV/Excel

---

## Security Requirements
- Password hashing
- JWT/session security
- Role-based authorization
- Input validation
- SQL injection prevention
- XSS prevention
- CSRF protection where applicable
- Rate limiting
- Secure HTTP headers
- API validation
- Environment variable protection
- Secure error handling

**Important**
The frontend must never be trusted for:
- Correct answers
- Scores
- User roles
- Quiz completion status
- Attempt eligibility

These must be validated by the backend.

---

## Testing Requirements
### Functional Testing
Test:
- Registration
- Login
- Admin login
- Quiz creation
- Question creation
- Quiz publishing
- Quiz attempt
- Quiz submission
- Score calculation
- Result generation

### API Testing
Use Postman or Insomnia to test:
- Valid requests
- Invalid requests
- Unauthorized requests
- Expired authentication
- Missing parameters
- Invalid IDs

### Responsive Testing
Ensure the app works on:
- Desktop
- Laptop

---

## Learning Outcomes
After completing this project, you will understand:
- Frontend development
- React.js
- Backend development
- REST APIs
- Database design
- PostgreSQL/MySQL
- Authentication
- Role-based authorization
- CRUD operations
- Form validation
- State management
- Timer implementation
- Scoring algorithms
- Dashboard development
- Data visualization
- API testing
- Web security
- Deployment
- Git/GitHub

---

## Final Application Structure
The final app should include:

### Admin
- Dashboard
- Users
- Quizzes
- Categories
- Questions
- Analytics
- Results
- Leaderboard

### Student
- Dashboard
- Quiz Listing
- Quiz Details
- Quiz Attempt
- History
- Performance
- Result
- Leaderboard

---

## Day-by-Day Claude Code Tips

### Day 1 Tips
- First, decide the exact stack and lock it early.
- Set up folder structure before writing features.
- Create `.env.example` on day 1.
- Add linting, formatting, and Git ignore early.
- Make the app run end-to-end with a minimal “hello world” frontend and backend.
- Commit only after the setup is stable and verified.

### Day 2 Tips
- Build authentication end-to-end, not just UI.
- Hash passwords on the backend.
- Test login and registration with Postman.
- Save one clean commit per feature group.
- Keep role fields simple: `ADMIN` and `STUDENT`.

### Day 3 Tips
- Add middleware and protected routes before building dashboards.
- Test role restrictions manually.
- Don’t rely on frontend checks for access control.
- Make sure unauthorized users cannot hit admin APIs.

### Day 4–7 Tips
- Build the admin side in this order: dashboard → categories → quizzes → questions.
- Keep forms reusable.
- Use seed data so you can test UI without manually creating everything.
- Finish each day with a working feature, not half-built code.

### Day 8–12 Tips
- Keep quiz submission and scoring fully backend-driven.
- Save attempt data before showing results.
- Make charts and leaderboard after the data model is stable.
- Test each flow with one sample student account and one admin account.

### Day 13–14 Tips
- Use a test checklist and do not skip edge cases.
- Test expired timers, invalid tokens, and repeated attempts.
- Write README after the app is mostly complete, not at the beginning.
- Add screenshots only after the UI is stable.
- Deployment should be a separate final step, not mixed with feature work.

---

## Practical Git Commit Plan
Use one commit per day or per major feature.

Examples:
- `chore: setup frontend, backend, and database structure`
- `feat: add authentication and password hashing`
- `feat: add role-based authorization and protected routes`
- `feat: build admin dashboard base layout`
- `feat: implement quiz management`
- `feat: implement category and question management`
- `feat: build student quiz interface`
- `feat: add quiz submission and scoring`
- `feat: add result page and attempt history`
- `feat: add student dashboard and charts`
- `feat: add analytics and leaderboard`
- `test: add validation and security checks`
- `docs: add README and project documentation`

---

## Suggested Day 1 Scope
For Day 1, your goal should be only this:
- Create repo
- Initialize frontend
- Initialize backend
- Set up database connection
- Add environment variables
- Establish folder structure
- Confirm both frontend and backend start successfully
