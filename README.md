 
 
CAPSTONE PROJECT REGISTER 
 
Class:            Duration time:  from ..…….../20…. To ..….…./20….. 
(*) Profession: <SE-AI>                   Specialty: <ES>     <IS>      <JS>                               
(*) Kinds of person make registers:              	Lecturer                 	Students  
 
1. Register information for supervisor (if have) 
No.	Fullname	Phone	E-Mail 	Title 
  Supervisor 				Mr. 
  Supervisor 				Mr. 
2. Register information for students (if have) 
 	Full name 	Student code 	Phone 	E-mail 	Role in Group 
					Leader 
					Member 
					Member 
					Member 
 
3. Register content of Capstone Project 
(*) 3.1. Capstone Project name: 
●	English: Japalyze: A Unified AI-Powered Platform for Japanese Language Learning with Structured JLPT Roadmap
●	Vietnamese: Japalyze: Nền tảng toàn diện hỗ trợ học tiếng Nhật tích hợp AI và lộ trình học JLPT có cấu trúc
●	Abbreviation: Japalyze
a.	Context: 
Learning Japanese presents significant challenges for learners, especially regarding Kanji memorization, complex grammar, and the lack of a clear, personalized study path. Traditional language learning solutions are highly fragmented — learners must use separate apps for dictionaries, flashcards, and practice tests, leading to a broken experience and low retention rates. This project builds "Japalyze", a unified, modern web and mobile platform that tightly integrates a structured JLPT Learning Roadmap (N5 to N1) with AI-driven explanations, a Spaced Repetition System (SRS) algorithm for memory optimization, and a social community for collaborative learning.
This platform has 3 roles:
-	Admin: (Admin)
o	Monitor and maintain the platform, manage users and content.
-	Learner / End-User: (EU)
o	Non-Technical:
	Users accessing via the Mobile App or Web App to follow the JLPT learning roadmap, study flashcards, practice with mock tests, and engage with the community.
-	Premium User: (PU)
o	Learners with a paid subscription who unlock exclusive content, advanced AI features, and premium mock tests.
This project targets 2 main goals:
-	AI Research and Integration: 
o	Research and integrate Large Language Models (LLMs) for context-aware translation, vocabulary analysis, and adaptive learning path recommendations.
o	Implement and optimize the SM-2 Spaced Repetition System (SRS) algorithm for personalized flashcard scheduling.
-	Software Engineering: 
o	Develop a full-stack AI-powered learning platform for Web and Mobile.
o	Engineer a unified ecosystem where all learning tools (Dictionary, Flashcards, Mock Tests, Roadmap) are deeply interconnected.
The main objectives and context for this project are as follows:
1.	Unified JLPT Learning Roadmap:
o	Design a crystal-clear, stage-by-stage roadmap (N5 to N1) featuring diverse exercise types (vocabulary, grammar, reading comprehension, listening) mapped precisely to JLPT standards, replacing the need for multiple disconnected resources.
2.	AI-Powered Personalization:
o	Utilize LLMs (Google Generative AI / OpenAI) to provide context-aware translations, detailed grammar explanations, and personalized recommendations that guide users through their identified weak points on the roadmap.
3.	Spaced Repetition & Memory Optimization:
o	Apply the SM-2 SRS algorithm to the Flashcard system so that each learner's review schedule is dynamically adjusted based on their individual recall performance, maximizing long-term vocabulary retention.
4.	Gamification & Engagement:
o	Implement daily quests, streak tracking, level progression, and a reward system to transform the study process into an engaging, habit-forming experience that keeps learners motivated.
5.	Social & Collaborative Learning:
o	Build a community hub where learners can share their study experiences, rate lesson content, share custom flashcard decks, and discuss language strategies, fostering a peer-driven learning environment.
6.	Cross-Platform Accessibility:
o	Deliver a seamless experience across both Web (Next.js) and Mobile (Flutter), allowing learners to study consistently across all their devices.
b.	Proposed Solutions 
The implementation of Japalyze involves multiple integrated modules. Below is a comprehensive breakdown of the proposed solutions:
•	Structured Roadmap Engine:
o	Design a hierarchical progress model (Level > Phase > Quest) stored in the database (UserProgress model) that dynamically unlocks new content as users complete tasks.
o	Each Quest is linked directly to relevant Dictionary entries, Flashcard Decks, and Mock Test sections for a cohesive, non-fragmented learning loop.
•	SRS Flashcard Engine:
o	Implement the SM-2 algorithm on the Card model, tracking nextReviewAt, interval, easeFactor, and repetitions for each card per user.
o	Surface due-for-review cards daily and update scheduling parameters based on the learner's self-assessed recall quality.
•	AI Integration Layer:
o	Integrate Google Generative AI SDK and OpenAI SDK as a serverless AI middleware within Next.js API routes.
o	Use LLMs for: Japanese-Vietnamese translation with context, vocabulary breakdown (part-of-speech, usage examples), and adaptive learning tips based on test performance history.
•	Gamification System:
o	Track user streakCount and lastActiveAt daily to award streak bonuses.
o	Store completed quests in the UserProgress model and trigger level-up events when all quests in a phase are completed.
•	Community & Social Features:
o	Build a Post / Comment / Like system enabling users to publish study journals, tips, and share Flashcard Deck links with the community.
o	Implement content rating to surface high-quality community study materials.
•	Payment & Premium Access:
o	Integrate PayOS to process Premium subscription payments, dynamically toggling the isPremium flag on the User model to unlock exclusive content and features.
•	Analytics & Admin Dashboard:
o	Track platform visits (Visit model) and user test results (TestResult model) to generate visual analytics dashboards using Recharts for administrators.
o	Use Redis (Upstash) for caching high-traffic API responses (Dictionary lookups, Roadmap data) to ensure sub-second performance.

●	Functional requirement 
○	Admin Web Dashboard:
■	Admin can log in to the system.
■	Admin can view and manage all registered users (roles, premium status).
■	Admin can monitor platform analytics: daily visitors, test completion rates, active streaks.
■	Admin can manage content: reading articles, mock test questions, and roadmap data.
○	Learner Web & Mobile App: 
■	User can register and log in (email/password or OAuth).
■	User can complete onboarding to set their starting JLPT level.
■	User can follow the structured JLPT Roadmap (N5 to N1) and complete daily quests.
■	User can study vocabulary using AI-powered flashcards with SRS scheduling.
■	User can look up words in the Japanese-Vietnamese Dictionary with usage examples.
■	User can read JLPT-leveled articles for reading comprehension practice.
■	User can take JLPT Mock Tests and receive detailed score reports.
■	User can track their daily streak and overall learning progress on the dashboard.
■	User can post, comment, and like content in the Community section.
■	User can share and discover Flashcard Decks created by other learners.
○	Premium User:
■	Premium user can access all standard features.
■	Premium user can access exclusive premium Mock Tests and advanced AI analysis features.
■	Premium user can subscribe via the in-app PayOS payment gateway.

●	Non-functional requirement: 
○	Page load time must be less than 2 seconds (optimized via Redis caching and Next.js SSR/SSG).
○	AI response time for translation and analysis must be less than 3 seconds.
○	The SRS review scheduling must process and update card intervals within 500ms.
○	The platform must support concurrent users without degradation (scalable via Vercel serverless infrastructure).
○	All user data (passwords, reset tokens) must be securely hashed (bcrypt) and transmitted over HTTPS.
○	…
 (*) 3.2. Main proposal content (including result and product)   
a.	Theory and practice (document):
●	Students should apply the software development process and UML 2.0 in the modelling system. 
●	The documents include User Requirement, Software Requirement Specification, Architecture Design, Detail Design, System Implementation, Testing Document, Installation Guide, source code, and deployable software packages.
●	Server-side technologies:
○	Server: Next.js 16 (App Router) with Serverless API Routes, deployed on Vercel.
○	Database Design: PostgreSQL managed via Prisma ORM; Redis (Upstash) for caching and rate limiting.
○	AI Engine: Google Generative AI SDK & OpenAI SDK for LLM-powered features; SM-2 algorithm implemented server-side for SRS scheduling.
●	Client-side technologies: 
○	Web Client: Next.js (React 19), Tailwind CSS v4, Framer Motion (animations), Recharts (analytics), Lucide React (icons).
○	Mobile App: Flutter (cross-platform iOS & Android), consuming the platform's REST APIs.
●	Applied AI: Large Language Models (LLMs) for context-aware Japanese-Vietnamese translation and personalized learning recommendations; SM-2 Spaced Repetition System (SRS) algorithm for adaptive flashcard scheduling.
b.	Products: 
○	Mobile App for User (Flutter - iOS & Android).
○	Web App for User (Next.js - Unified JLPT Roadmap, Dictionary, SRS Flashcards, Mock Tests, Community Hub).
○	Web API for User (Next.js Serverless REST API - SRS Engine, AI Translation, Test Submission, Payment).
○	Web Admin for Admin (Next.js Admin Dashboard - User management, Content management, Platform analytics).
○	Applied AI (LLM-based Translation & Recommendation Engine; SM-2 SRS Scheduling Engine).
c.	Proposed Tasks:
○	Task package 1: Requirement Analysis & System Architecture Design.
■	Requirement:
●	Design and finalize the PostgreSQL database schema (Prisma) for all core models: User, UserProgress, Deck, Card, DictionaryEntry, ReadingArticle, MockTest, TestResult, Post, Comment, Payment, Visit.
●	Set up the Next.js project foundation: authentication (JWT/bcrypt), Prisma ORM integration, Redis caching layer, and environment configuration.
●	Define API contracts and module boundaries between the Web client, Mobile client, and AI service layer.
○	Task package 2: Core Learning Engine Development (Dictionary, Reading & Mock Tests).
■	Requirement:
●	Build the Japanese-Vietnamese Dictionary module with full-text search, example sentences (ExampleSentence), and related word linking (DictionaryRelation).
●	Implement JLPT-leveled Reading Articles for reading comprehension practice.
●	Develop the JLPT Mock Test system: question management (Question model), timed test flow, auto-scoring, and detailed result reports (TestResult model).
○	Task package 3: JLPT Roadmap & SRS Flashcard System.
■	Requirement:
●	Design and implement the stage-by-stage JLPT Learning Roadmap (N5 to N1) with diverse, interconnected exercise types (vocabulary quests, grammar quests, reading quests, listening quests).
●	Integrate the SM-2 SRS algorithm into the Flashcard module (Card model: nextReviewAt, interval, easeFactor, repetitions) for personalized daily review scheduling.
●	Build streak tracking (streakCount, lastActiveAt), daily quest completion, and persistent user progress (UserProgress model) with gamification rewards.
○	Task package 4: AI SDK Integration & Personalization Engine.
■	Requirement:
●	Integrate Google Generative AI / OpenAI SDKs into Next.js API routes for context-aware translation, vocabulary breakdown, and grammar explanations.
●	Develop the personalized recommendation engine that analyzes TestResult history and flashcard retention to guide users to weak-point content on the Roadmap.
○	Task package 5: Social Community, Premium Subscription & Admin Analytics.
■	Requirement:
●	Implement the Community module: creating Posts, Comments, Likes, and sharing Flashcard Deck links between learners.
●	Integrate PayOS payment gateway for Premium subscription processing (Payment model, isPremium flag toggle).
●	Build the Admin Dashboard with visit tracking (Visit model) and user activity analytics, visualized with Recharts.
○	Task package 6: Mobile App Development, End-to-End Testing & Deployment.
■	Requirement:
●	Develop the Flutter mobile client (iOS/Android) consuming the web REST APIs for Roadmap, SRS Flashcards, Dictionary, Mock Tests, and Community features.
●	Perform unit testing (Vitest) and end-to-end integration testing across all major user flows.
●	Deploy the web platform on Vercel, finalize all required documentation: System Analysis & Design, Test Plan, Installation Manual, User Manual.
4. Other comments (propose all relative things if have). 
 
            
Supervisor (If have) 
 (Sign and full name) 	Quy Nhon, date …… ………. /20 … 
On behalf of Registers  
(Sign and full name) 


