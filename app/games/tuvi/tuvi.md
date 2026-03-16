# 5BALANCE - Project Context & Software Requirements Specification (SRS)

## 1. Agent Instructions
- **Role:** You are an expert Full-stack Developer AI Agent.
- **Task:** Read this document to understand the "5BALANCE" project context, tech stack, database schema, and implementation phases. Use this context to generate code, configure the database, and build features when prompted.
- **Rules:** Always prioritize end-to-end encryption for user data, strictly follow Row Level Security (RLS) rules in the database, and build modular, scalable components.

## 2. Project Overview
**5BALANCE** is a Cognitive Operating System (Hệ điều hành Nhận thức) that digitizes classical Bazi (Bát tự) metaphysical data and combines it with AI. It acts as an ontological security tool and a strategic advisor. 
- **Goal:** Transform spatial-temporal birth data into an 80% deterministic baseline for behavioral and psychological analysis.
- **Core Philosophy:** 100% Data Privacy, Data Sovereignty, and AI-driven Spatio-temporal analysis.

## 3. Tech Stack Architecture
- **Frontend / Framework:** Next.js (App Router, React, TypeScript, Tailwind CSS)
- **Backend / Database:** Supabase (PostgreSQL, Authentication, Row Level Security - RLS)
- **Unified AI Engine:** Next.js API Routes (or Python FastAPI microservice) integrating with a shared LLM (OpenAI/Gemini). This single shared model is used across all pages to interpret Bazi logic without relying on separate standalone chat agents.
- **State Management:** Zustand / React Context (if needed).

## 4. Database Schema Design (Supabase PostgreSQL)

### Table: `users`
Managed by Supabase Auth, extended with a `profiles` table for public/safe data.
- `id` (uuid, PK, references auth.users)
- `email` (text, unique)
- `created_at` (timestamp)

### Table: `user_spatio_temporal_data` (Highly Encrypted/Protected)
Stores the fundamental energy field data.
- `id` (uuid, PK)
- `user_id` (uuid, FK to users.id)
- `birth_date` (date)
- `birth_time` (time)
- `birth_place` (text - coordinates or city)
- `is_encrypted` (boolean, default true)
- `created_at` (timestamp)

### Table: `bazi_matrices`
Stores the calculated logical matrix based on time/space data.
- `id` (uuid, PK)
- `user_id` (uuid, FK to users.id)
- `heavenly_stems` (jsonb)
- `earthly_branches` (jsonb)
- `five_elements_balance` (jsonb - stores the systemic equilibrium data)
- `behavioral_propensity` (jsonb - derived logic for AI context)

### Table: `ai_interpretations`
Stores the AI-generated explanations and insights derived from the user's Bazi matrix.
- `id` (uuid, PK)
- `user_id` (uuid, FK to users.id)
- `matrix_id` (uuid, FK to bazi_matrices.id)
- `interpretation_content` (jsonb or text - structured explanation of career, mindset, destiny map)
- `generated_at` (timestamp)

## 5. Implementation Phases & Tasks

### Phase 1: Foundation & Auth
- [ ] Initialize Next.js project with TypeScript and Tailwind CSS.
- [ ] Setup Supabase project and integrate `@supabase/ssr` for Next.js App Router.
- [ ] Create UI for User Authentication (Sign up, Log in).
- [ ] Configure PostgreSQL database schema and enforce strict Row Level Security (RLS) so users can only access their own `user_id` rows.

### Phase 2: Data Input & Logic Engine
- [ ] Build the "Spatio-temporal Data" input form (Date, Time, Place of birth).
- [ ] Create utility functions/API routes to calculate the `bazi_matrices` (Heavenly Stems, Earthly Branches, Five Elements) based on the input data.
- [ ] Save the matrix to the Supabase database.

### Phase 3: The Destiny Map UI (Bản đồ Vận mệnh)
- [ ] Create a personalized dashboard retrieving data from `bazi_matrices`.
- [ ] Visualize the "Systemic Equilibrium" (Ngũ hành) using charts (e.g., Radar charts, Bar charts).
- [ ] Display structural thinking patterns and behavioral blind spots visually.

### Phase 4: AI Destiny Map Interpreter (AI Giải nghĩa Bản đồ)
- [ ] Create a unified API route for the shared AI model.
- [ ] Build a service that takes the user's `bazi_matrices` as input and prompts the shared LLM to generate a comprehensive, structured explanation of their Destiny Map (career orientation, mindset, etc.).
- [ ] Build UI components on the Destiny Map page to render this AI-generated text seamlessly (e.g., as insight cards or a detailed report section), eliminating the need for a chat interface.
- [ ] Save the generated report to the `ai_interpretations` table to reduce redundant AI API calls on subsequent visits.

## 6. Security & Data Sovereignty Constraints
- Implement a "Delete My Data" function that completely wipes all records in `user_spatio_temporal_data`, `bazi_matrices`, and `ai_interpretations` for the requesting user.
- Ensure all API routes fetching AI interpretations strictly validate user session tokens.