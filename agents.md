# Codebase Structure & Data Reference Blueprint

This document outlines the architecture, database schema, file structure, and core user/admin workflows of the **COC (Community of Coders) VJTI Landing Page** web application. It is designed to serve as a comprehensive system prompt for any developer or AI agent tasked with modifying, maintaining, or expanding this project.

---

## 🚀 1. Application Overview

**COC Landing Page** is a modern hub for the Community of Coders (CoC), VJTI. It offers members a single portal for tracking events, registering for events/hackathons, accessing curated domain resources (CP, Dev, ML, Web3, etc.), and showcasing their project portfolios.

### Target Roles
- **Guest / Public Visitor**: Can view the landing page, club-specific pages, and approved student projects.
- **Member (Authenticated User)**: Can log in using Google OAuth to access their Dashboard, view curated domain resources, view/register for upcoming events (individual or team events), submit project showcase portfolios, and like other portfolios.
- **Admin**: Has specialized authorization to access the Admin Dashboard to create/modify events, view and manage participant lists/attendance, review project submissions (Approve/Reject with notes), and manage featured projects.

---

## 🛠️ 2. Technology Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router structure)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion (for dynamic interactive animations) + Radix UI (for UI primitives like dialogs, scroll areas, and select dropdowns)
- **Database & Backend**: [Supabase](https://supabase.com/) (PostgreSQL) with Row-Level Security (RLS) policies
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) using the Google OAuth Provider
- **Analytics**: PostHog integration (`posthog-js`)
- **Containerization**: Docker & Docker Compose (`Dockerfile`, `docker-compose.yml`)
- **Git Hook Automation**: Husky + Commitlint + lint-staged (strictly enforcing conventional commits and branch naming: `username/feature-name`)

---

## 📁 3. Directory Structure

```
├── app/                        # Next.js App Router Pages & Layouts
│   ├── about/                  # About CoC, history, sub-clubs, core team
│   ├── actions/                # Server Actions (database mutations/queries)
│   │   ├── auth/               # Auth action helpers
│   │   ├── events.ts           # Event creation, deletion, status checking
│   │   ├── participants.ts     # Registration, team check-ins, participant stats
│   │   ├── projects.ts         # Submissions, likes, views, admin reviews
│   │   ├── teams.ts            # Team management and check-ins
│   │   └── users.ts            # Profile fetches, admin check, user lists
│   ├── admin-dashboard/        # Admin panel (Event/Participant/Project Management)
│   ├── ai-group/               # Machine Learning & AI sub-club page
│   ├── api/                    # API Route Handlers (NextAuth backend, webhooks)
│   ├── auth/                   # Custom auth screens or redirects
│   ├── components/             # Page-specific styling overlays
│   ├── cp-club/                # Competitive Programming sub-club page
│   ├── dashboard/              # User resource hub & custom event calendar
│   ├── dev-club/               # Development sub-club page
│   ├── eth-club/               # Ethereum & Web3 sub-club page
│   ├── proj-x/                 # Open Source Projects section
│   ├── projects/               # Showcase grid, categories, & submission modal
│   ├── teams/                  # Team registrations
│   ├── layout.tsx              # Root HTML structure and providers wrapping
│   ├── globals.css             # Main Tailwind configuration
│   └── page.tsx                # Main Public Homepage (Hero, Explore, Achievements)
├── components/                 # Global Reusable React Components
│   ├── admin/                  # Admin-only dashboard tab components
│   │   ├── AdminStats.tsx
│   │   ├── EventManagement.tsx
│   │   ├── ParticipantManagement.tsx
│   │   └── ProjectManagement.tsx
│   ├── ui/                     # Shared UI components (Card, Button, Badge, etc.)
│   ├── providers/              # NextAuthProvider, PostHogProvider
│   ├── Navbar.tsx              # Universal navbar with dynamic auth states
│   ├── Hero.tsx                # Main animated introduction
│   ├── ProjectSubmissionModal.tsx # Project submissions form
│   ├── ProjectDetailsModal.tsx # Detailed view of project details
│   ├── AboutMain.tsx           # Full details for the About page
│   └── ResourceTable.tsx       # Dynamic tables for reading domain links
├── config/                     # Static configurations
│   └── navigation.ts           # Domain resources configuration (categories, icons)
├── data/                       # Static mock files and resource references
│   └── resources.json          # Curated links for basic coding, DSA, Dev, ML, Web3
├── lib/                        # Shared libraries and initializers
│   ├── auth.ts                 # NextAuth configs & Google login callbacks
│   ├── posthog.ts              # PostHog client setup
│   ├── supabase-admin.ts       # Supabase Admin client utilizing service role key
│   └── utils.ts                # Class merger helper (clsx + tailwind-merge)
├── supabase/                   # Supabase Database Migrations & Reference SQL
│   ├── migrations/             # SQL migration files
│   └── queries/                # Example SQL queries for analytics
├── types/                      # TypeScript definitions and interfaces
│   ├── events.ts
│   ├── projects.ts
│   └── resources.ts
└── schema.sql                  # Main PostgreSQL schema layout (reference only)
```

---

## 🗄️ 4. Database Schema (Supabase / PostgreSQL)

The system relies on five primary tables to store users, events, participants, projects, and likes.

### 4.1. `users` Table
Stores basic profile information collected during Google OAuth authentication.
* **Fields**:
  - `uid` (UUID, Primary Key, Default: `gen_random_uuid()`)
  - `created_at` (TIMESTAMPTZ, Default: `NOW()`)
  - `name` (TEXT)
  - `email` (TEXT, Unique, Not Null)
  - `picture` (TEXT)
  - `phone` (TEXT)
  - `year` (BIGINT, Default: `1` - represents academic year 1st/2nd/3rd/4th)
  - `branch` (TEXT - engineering branch)
  - `is_admin` (SMALLINT, Default: `0` - represents Admin privileges: `0` = User, `1` = Admin)
  - `graduated` (BOOLEAN, Default: `FALSE`)

### 4.2. `events` Table
Contains details about hackathons, workshops, coding contests, and bootcamps.
* **Fields**:
  - `id` (UUID, Primary Key, Default: `gen_random_uuid()`)
  - `created_at` (TIMESTAMPTZ, Default: `NOW()`)
  - `updated_at` (TIMESTAMPTZ, Default: `NOW()`)
  - `title` (TEXT, Not Null)
  - `description` (TEXT)
  - `date` (TEXT - formatted as ISO date string `YYYY-MM-DD`)
  - `time` (TEXT - formatted as string)
  - `location` (TEXT)
  - `maxparticipants` (INTEGER)
  - `participantcount` (INTEGER, Default: `0`)
  - `category` (TEXT - Constraint: `workshop`, `hackathon`, `seminar`, `competition`, `webinar`, `bootcamp`, `conference`, `networking`, `tech-talk`, `panel-discussion`, `project-showcase`, `coding-contest`, `study-group`, `other`)
  - `organizer` (TEXT)
  - `tags` (JSONB, Default: `'[]'::jsonb`)
  - `requirements` (JSONB, Default: `'[]'::jsonb`)
  - `imageurl` (TEXT, Default: generic Unsplash link)
  - `registrationstatus` (TEXT, Default: `'upcoming'` - Constraint: `upcoming`, `open`, `closed`)
  - `event_status` (TEXT, Default: `'upcoming'` - Constraint: `upcoming`, `ongoing`, `completed`, `cancelled`)
  - `team_event` (BOOLEAN, Default: `FALSE`)
  - `min_team_size` (INTEGER, Default: `1`)
  - `max_team_size` (INTEGER, Default: `1`)
  - `registration_deadline` (TEXT - ISO format string)
  - `is_featured` (BOOLEAN, Default: `FALSE`)
  - `external_link` (TEXT)
  - `attendance_count` (INTEGER, Default: `0`)
  - `stats` (JSONB, Default: `'{"total": 0, "attended": 0, "cancelled": 0, "confirmed": 0}'::jsonb`)
  - `event_highlights` (JSONB, Default: `'[]'::jsonb`)
  - `event_photos` (TEXT[] - array of image URLs)

### 4.3. `participants` Table
Manages event registration linkages between users and events.
* **Fields**:
  - `id` (UUID, Primary Key, Default: `gen_random_uuid()`)
  - `event_id` (UUID, Foreign Key referencing `events.id`, Cascades on Delete)
  - `user_id` (UUID, Foreign Key referencing `users.uid`, Cascades on Delete)
  - `created_at` (TIMESTAMPTZ, Default: `NOW()`)
  - `status` (TEXT, Default: `'registered'` - Constraint: `registered`, `confirmed`, `attended`, `cancelled`)
  - `team_name` (TEXT)
  - `team_members` (JSONB - Array of team member objects containing name, email, etc.)
  - `is_team_leader` (BOOLEAN, Default: `FALSE`)

### 4.4. `projects` Table
Holds portfolios and project submissions from students for the Project Showcase.
* **Fields**:
  - `id` (UUID, Primary Key, Default: `gen_random_uuid()`)
  - `title` (VARCHAR(255), Not Null)
  - `description` (TEXT, Not Null)
  - `full_description` (TEXT)
  - `category` (VARCHAR(100), Not Null - Constraint: `web-development`, `app-development`, `machine-learning`, `blockchain`, `iot`, `game-development`, `ai`, `data-science`, `cybersecurity`, `other`)
  - `tags` (TEXT[], Default: `'{}'`)
  - `github_url` (VARCHAR(500))
  - `live_url` (VARCHAR(500))
  - `video_url` (VARCHAR(500))
  - `image_url` (VARCHAR(500))
  - `additional_images` (TEXT[], Default: `'{}'`)
  - `team_name` (VARCHAR(255))
  - `team_members` (JSONB, Default: `'[]'` - Array of `{name, role, email}`)
  - `submitted_by` (VARCHAR(255), Not Null - Submitter user email)
  - `submitter_name` (VARCHAR(255), Not Null)
  - `submitter_year` (INTEGER)
  - `submitter_branch` (VARCHAR(100))
  - `status` (VARCHAR(50), Default: `'pending'` - Constraint: `pending`, `approved`, `rejected`)
  - `review_notes` (TEXT)
  - `reviewed_by` (VARCHAR(255) - Admin email)
  - `reviewed_at` (TIMESTAMPTZ)
  - `is_featured` (BOOLEAN, Default: `FALSE`)
  - `views_count` (INTEGER, Default: `0`)
  - `likes_count` (INTEGER, Default: `0`)
  - `created_at` (TIMESTAMPTZ, Default: `NOW()`)
  - `updated_at` (TIMESTAMPTZ, Default: `NOW()`)

### 4.5. `project_likes` Table
Maintains likes for showcase items. Enforces one like per user per project.
* **Fields**:
  - `id` (UUID, Primary Key, Default: `gen_random_uuid()`)
  - `project_id` (UUID, Foreign Key referencing `projects.id`, Cascades on Delete)
  - `user_email` (VARCHAR(255), Not Null)
  - `created_at` (TIMESTAMPTZ, Default: `NOW()`)

---

## 🔒 5. Row-Level Security (RLS) Policies

Supabase Row Level Security is implemented to enforce access bounds:

### Projects table:
1. **Select**: Anyone can view a project if `status = 'approved'` OR if the current request's JWT email claim matches `submitted_by` (allows authors to view their pending submissions).
2. **Insert**: Authenticated users can insert, provided their email matches `submitted_by` in the payload.
3. **Update**: Users can edit their projects *only if* the project is still in a `'pending'` status, and their email matches `submitted_by`.

### Project Likes table:
1. **Select**: Publicly readable (anyone can see like counts).
2. **Insert**: Authenticated users can insert likes matching their email (`user_email = current_setting('request.jwt.claim.email')`).
3. **Delete**: Users can delete their own likes.

---

## ⚡ 6. Server Actions & APIs (`app/actions/`)

Backend logic uses Next.js server actions which are protected with NextAuth session validation:

1. **`app/actions/users.ts`**:
   - `getCurrentUserProfile()`: Returns the complete user record matching the authenticated session email.
   - `searchUserByEmail(email)`: Used for team formation checks, returns basic details to verify if another student exists.
   - `getAllUsers()`: Admin-only. Lists all registered users.

2. **`app/actions/events.ts`**:
   - `getEvents()`: Returns a list of events. Automatically updates the `event_status` and `registrationstatus` flags in the database relative to current time and registration limits before returning.
   - `createEvent(formData)`: Admin-only. Inserts a new event.
   - `updateEvent(id, formData)`: Admin-only. Modifies event records.
   - `deleteEvent(id)`: Admin-only. Deletes event records.

3. **`app/actions/participants.ts`**:
   - `getParticipants(filters)`: Admin-only or user-owned search. Filters registrations by `eventId` or `userId`. Includes joined `events` and `users` tables.
   - `registerForEvent(registration)`: Registers the logged-in user. Handles individual or team registration. If a team registration, verifies that all teammate emails exist in the database and registers them as part of the team.
   - `updateParticipantStatus(id, status)`: Admin-only. Marks attendance (`registered`, `confirmed`, `attended`, `cancelled`).

4. **`app/actions/projects.ts`**:
   - `getApprovedProjects(category, featuredOnly)`: Fetches public, approved projects.
   - `getProjectById(id, incrementView)`: Fetches project details. Increments views atomically using PostgreSQL functions.
   - `submitProject(projectData)`: Saves a new showcase entry in `pending` status.
   - `toggleProjectLike(projectId)`: Toggles like state for the active user. Increments/decrements `likes_count` on the project table.
   - `reviewProject(projectId, { status, reviewNotes })`: Admin-only. Approves or rejects project submissions.

---

## 🎨 7. Design System & UX Standards

The webapp adheres to a unified visual language:
- **Theme**: Premium futuristic dark mode. Backgrounds are primarily pure black (`#000000`) and dark grey charcoal (`#0a0a0a`).
- **Color Accents**: Curated gradients using **Emerald Green** (representing coders) and **Indigo/Teal/Purple** for secondary highlights.
- **Glassmorphism**: Modals and dropdowns feature frosted border frames (`border-white/10`) with `backdrop-blur-md` and matching dark, translucent fills.
- **Animations**: Subtle, smooth micro-animations using Framer Motion (hover card lifts, fade-ins for grid items, smooth modal triggers).
- **Typography**: Clean, professional sans-serif fonts (e.g., Montserrat or Inter) prioritizing high scannability and reading comfort.

---

## 🚀 8. System Instructions for AI Coding Agent

When working on this repository, you must adhere to the following rules:

1. **TypeScript Integrity**: Always write type-safe code. Ensure all props and schemas comply with configurations inside `types/`.
2. **Server Actions & Database Access**: Read and write data *exclusively* via Next.js Server Actions situated in `app/actions/`. Do not perform direct client-side Supabase client calls.
3. **Session Verification**: Always verify user privileges using `getServerSession(authOptions)` inside server actions. Standards members have standard access, whereas Admins must have `is_admin = 1` in their database record to access admin actions.
4. **Consistency with Design Theme**: Ensure styling matches the project's premium futuristic dark aesthetic. Use Tailwind classes alongside Framer Motion. Do not introduce light-themed styles or standard ad-hoc utility classes.
5. **Git Workflow**: Adhere to the Conventional Commits specification for all commits (`feat(scope): ...`, `fix(scope): ...`) and branch-naming formats (`username/feature-name`).
