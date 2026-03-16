# Technical Documentation

## Overview
This repository now contains a backend‑only rewrite in C# using ASP.NET Core Web API with EF Core and StackExchange.Redis. The legacy Next.js frontend has been removed.

## Target Stack
- ASP.NET Core Web API
- EF Core (PostgreSQL)
- StackExchange.Redis
- Cloudinary (uploads)
- OpenAI + Google Gemini (AI features)
- PayOS (payments)

## API Endpoints (C#)
### Auth
- POST /api/auth/login
- POST /api/auth/register
- GET /api/auth/google
- GET /api/auth/google/callback
- GET /api/auth/me

### Payments
- POST /api/payment/create-link
- POST /api/payment/webhook

### AI
- POST /api/chat (non‑streaming JSON)
- POST /api/translate
- POST /api/analyze

### Dictionary
- POST /api/suggest
- POST /api/word-detail

### Community
- GET /api/community/posts
- POST /api/community/posts
- POST /api/community/posts/{id}/like
- GET /api/community/posts/{id}/comments
- POST /api/community/posts/{id}/comments

### Reading
- GET /api/reading
- GET /api/reading/{id}

### Tests
- GET /api/tests
- GET /api/tests/{id}

### Exercises
- GET /api/exercises/progress
- POST /api/exercises/progress

### Flashcards
- GET /api/flashcards/decks
- POST /api/flashcards/decks
- PATCH /api/flashcards/decks/{id}
- DELETE /api/flashcards/decks/{id}
- POST /api/flashcards/cards
- PUT /api/flashcards/cards/{id}
- DELETE /api/flashcards/cards/{id}

### Tarot
- GET /api/tarot/draw
- POST /api/tarot/interpret

### Upload
- POST /api/upload

### Admin
- GET /api/admin/users
- DELETE /api/admin/users
- PATCH /api/admin/users
- GET /api/admin/users/progress
- POST /api/admin/users/progress
- GET /api/admin/reading
- POST /api/admin/reading
- PUT /api/admin/reading
- DELETE /api/admin/reading
- GET /api/admin/tests
- POST /api/admin/tests
- PUT /api/admin/tests
- DELETE /api/admin/tests
- DELETE /api/admin/posts

## Auth & Session
- Session token stored in Redis: session:{token} -> userId (TTL 86400)
- Authorization header: Bearer <token>

## Data Model Summary (PostgreSQL)
User, Payment, Deck, Card, TranslationHistory, DictionaryEntry, DictionaryRelation, ExampleSentence, ExerciseProgress, Post, Comment, Like, TarotCard, ReadingArticle, MockTest, Question, TestResult, UserProgress.

## Integrations
- Postgres (Supabase) via EF Core scaffolded models
- Upstash Redis (sessions + caching)
- OpenAI (chat)
- Google Gemini (translate/analyze/tarot interpret)
- PayOS (payment links + webhook)
- Cloudinary (file uploads)

## Environment Variables
### Database
- ConnectionStrings:Default
- ConnectionStrings:Redis

### Auth
- Auth:SessionTtlSeconds

### ExternalServices
- ExternalServices:OpenAiApiKey
- ExternalServices:GoogleAiApiKey
- ExternalServices:PayOsClientId
- ExternalServices:PayOsApiKey
- ExternalServices:PayOsChecksumKey
- ExternalServices:CloudinaryCloudName
- ExternalServices:CloudinaryApiKey
- ExternalServices:CloudinaryApiSecret
- ExternalServices:GoogleClientId
- ExternalServices:GoogleClientSecret
- ExternalServices:GoogleRedirectUri
- ExternalServices:PublicDomain

## Notes
- Database‑first scaffolding is used; regenerate models with dotnet‑ef as schema changes.
- Chat endpoint is non‑streaming JSON; update client accordingly.
