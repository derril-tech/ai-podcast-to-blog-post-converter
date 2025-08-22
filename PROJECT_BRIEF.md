# THE PROJECT BRIEF #



# Project Name #
podcast-to-blog-post-converter

# Product Description / Presentation #

podcast-to-blog-post-converter
EchoPress AI — Podcast to Blog Converter
Tagline: Turn any episode into a polished, SEO ready article—grounded in what was actually said.
________________________________________
1) Product Description / Presentation
Executive Summary
EchoPress AI is a production grade, AI native pipeline that ingests podcast audio (or video), performs transcription + diarization, topic segmentation, evidence linked summarization, SEO optimization, and produces publication ready blog posts (MD/MDX/HTML) with images, pull quotes, and citations. Built on Next.js 14 + FastAPI + PostgreSQL/pgvector + Redis, orchestrated by LangGraph with LangChain tools and RAG over transcripts, show notes, and referenced sources, EchoPress delivers low hallucination, brand on voice content with inline citations and editor friendly revisions.
Business Outcomes
•	Cut content turnaround from days to minutes.
•	Improve organic traffic with SEO structured articles and schema.org metadata.
•	Maintain brand voice at scale with style guides and tone profiles.
Ethics & IP Note: EchoPress produces derivative works with explicit source citation; rights checks and consent workflows are built in. Not a substitute for legal review.
________________________________________
Core Capabilities
•	Ingestion: Upload audio/video (MP3/WAV/MP4) or paste RSS/YouTube URL. Chunked uploads; checksum dedupe.
•	Transcription & Diarization: High accuracy ASR (OpenAI Whisper API or adapter); speaker labels; word level timestamps.
•	Topic Segmentation: Scene/topic boundaries; outline with headings (H1–H3); key takeaways per segment.
•	RAG Grounded Drafting: Summaries and paraphrases grounded in the episode transcript + show notes + linked sources; cite or refuse guardrail.
•	SEO Optimizer: Title/H1, meta description, slugs, FAQs, internal links, JSON LD Article schema, readability tuning.
•	Brand Voice Engine: Enforce tone (playful/professional/technical), length, persona; style guide constraints (banned words, CTA patterns, formatting rules).
•	Image Assistant: Suggests images with alt text (stock integrations) or generates prompts; auto places figures and captions.
•	Fact & Risk Checks: Evidence span inspection, claim validation (external links optional), sensitive topic flags.
•	Multilingual: Translate posts and preserve voice; locale aware SEO.
•	CMS Export: One click publish to WordPress, Ghost, Medium, Webflow, or Markdown export; scheduled posts and revisions.
•	Collaboration: Editor with tracked changes, comments, role based approvals, and version history.
________________________________________
Functional Modules (User Journeys)
1.	Import → upload or link; select brand, target persona, and SEO targets.
2.	Process → transcript + diarization; auto outline; RAG draft; preview stream in real time.
3.	Review → editor with citations, fact flags, and style checks; accept/revise; regenerate sections.
4.	Optimize → keywords, internal links, FAQs, schema; image placement; reading time; accessibility checks.
5.	Publish → export to CMS; schedule; social snippets; UTM links; A/B headline tests.
6.	Learn → analytics import (GA/Search Console); feedback loops to refine future drafts.
________________________________________
Non Functional Requirements
•	Performance: P95 API < 300ms on cached steps; streaming tokens TTFB < 500ms; end to end draft in < 5 minutes for a 60 min episode (with ASR cache).
•	Scale: 10k concurrent editors; thousands of parallel transcriptions via queued workers.
•	Reliability: 99.9% uptime; resumable jobs; deterministic retry policies.
•	Security: SOC2 ready controls; encryption in transit/at rest; signed URLs; tenant isolation.
•	Accessibility: WCAG 2.1 AA; keyboard first; reduced motion.
________________________________________
Frontend (Next.js 14 + React 18 + TypeScript + Tailwind)
•	Screens
o	Library (episodes with status, owners, tags).
o	Pipeline Run (live steps, logs, cost/time estimates, retry buttons).
o	Editor (MDX with citations hovercards, diff view, tracked changes, comment threads).
o	SEO Studio (headlines, meta, FAQs, schema preview, link suggestions).
o	Brand Manager (tone profiles, style rules, banned terms, components).
o	Exports & Integrations (CMS connections, webhooks, schedules).
•	UX: Streaming updates via WebSockets; drag and drop assets; 🧪 A/B headline tester.
•	State: React Query (server cache), Zustand/Context (UI), form hooks; optimistic updates with rollback.
________________________________________
Backend (FastAPI + Python 3.11 + Async SQLAlchemy 2.0)
•	Auth: JWT (access/refresh), SSO (SAML/OIDC), MFA optional; RBAC (owner/admin/editor/reviewer).
•	Services: ingestion, transcription, diarization, segmentation, drafting, SEO, images, export, analytics.
•	Adapters: storage (S3/GCS), CMS (WordPress/Ghost/Medium/Webflow), feeds (RSS/YouTube), email (SES), search console/GA.
•	Workers: Redis backed queues for ASR, embedding, summarization, exports.
•	Observability: OpenTelemetry traces, Prometheus metrics, structured logs, cost ledger.
________________________________________
AI Orchestration & Retrieval
•	Chosen Orchestrator: LangGraph for deterministic, inspectable pipelines (ASR → segment → draft → fact check → optimize → export) with retries/timeouts.
•	Tools: LangChain loaders/retrievers (transcripts, show notes, referenced URLs), output parsers, embeddings; pgvector for episode/segment vectors.
•	Models: OpenAI GPT 4 family for drafting/rewrites; Claude for long context reasoning and safety review; optional Whisper for ASR.
•	RAG Grounding: Primary source = transcript segments; secondary = show notes and explicitly provided links; optional web retrieval per policy. Cite or refuse enforced.
•	Guardrails: plagiarism check, bias/toxicity filters, claim risk classifier, style guide constraints.
________________________________________
Data Model (selected)
•	organizations, workspaces, users
•	episodes(id, title, audio_url, duration, source_url, status, brand_id)
•	transcripts(episode_id, language, text, diarization_json)
•	segments(episode_id, start_ms, end_ms, speaker, text, vector, topic)
•	drafts(episode_id, version, mdx, citations_json, seo_json, tone_profile_id)
•	assets(episode_id, type:image|quote|cta, url, alt_text, meta)
•	exports(episode_id, cms, status, url, log)
•	style_guides(org_id, rules_json, banned_terms[], tone_examples)
•	analytics(episode_id, metric, value, captured_at)
________________________________________
API Surface (sample)
REST
•	POST /episodes (upload/link) → start pipeline
•	GET /episodes/{id}/status → step statuses, logs
•	POST /episodes/{id}/retry/{step}
•	GET /drafts/{id} (MD/MDX + citations)
•	POST /drafts/{id}/revise (constraints: tone, length, structure)
•	POST /seo/{id}/optimize (keywords, links, FAQs, schema)
•	POST /exports/{id} (cms=wordpress|ghost|medium|webflow|markdown)
WebSockets
•	/ws/run/{episode_id} → live pipeline + token stream
________________________________________
Security, Privacy & Compliance
•	IP & Consent: rights ledger for source audio; license tags; export blocks if rights unclear.
•	PII: detection/redaction in transcripts; reviewer approval for sensitive content.
•	Secrets: env only, rotation, least privilege; per integration scopes.
•	Tenant Isolation: RLS by workspace; audit logs for read/write to sensitive resources.
________________________________________
Deployment & Scaling
•	Frontend: Vercel (ISR, edge cache).
•	Backend: Render autoscaling; workers for ASR/embeddings/summarization/exports.
•	DB: Postgres + pgvector; PITR; nightly backups.
•	Cache/Queue: Redis for jobs, rate limiting, sessions.
Env Vars (excerpt)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
STORAGE_BUCKET=
SMTP_URL=
CMS_WORDPRESS_URL= / CMS_GHOST_URL=
GOOGLE_SEARCH_CONSOLE_KEY=
ALLOWED_ORIGINS=
________________________________________
Success Metrics
•	First draft ready < 10 minutes for 60 min episode (cold ASR); < 5 minutes with cached transcript.
•	0 uncited claims where evidence exists; plagiarism score > 95% original.
•	SEO targets: title CTR uplift +10%, organic impressions +20% by day 30.
•	Lighthouse ≥ 95; uptime 99.9%; tests >90% coverage.
________________________________________
2) Framework Choice (Why LangGraph + LangChain + RAG)
•	LangGraph: explicit state machine for multi step content pipelines with retries/timeouts and transparent state snapshots.
•	LangChain: mature ecosystem of retrievers/parsers and quick integration with embeddings/vector DB.
•	RAG: guarantees drafts remain faithful to the transcript; cite or refuse minimizes hallucinations and legal risk.
________________________________________
3) Dev Team Brief
Goals
Ship a Fortune 500 ready pipeline that turns episodes into brand consistent, SEO optimized, evidence linked articles with editor grade UX.
Deliverables
1.	Next.js frontend (Editor, SEO Studio, Brand Manager, Integrations).
2.	FastAPI backend (ingestion→export services) with JWT/SSO and RBAC.
3.	Postgres schema + pgvector; Redis queues; WebSockets streaming.
4.	LangGraph orchestrations + LangChain tools; RAG + guardrails.
5.	CMS adapters; analytics import; cost ledger; CI/CD; OpenAPI docs.
6.	Vercel + Render deploy configs; tests (unit/integration/e2e).
Milestones
•	M1 (Weeks 1–2): Repos, auth, upload + ASR, base editor.
•	M2 (Weeks 3–4): Segmentation + RAG drafting + citations; SEO Studio.
•	M3 (Weeks 5–6): Brand voice engine, images, CMS exports, analytics.
•	M4 (Weeks 7–8): Hardening, load/cost tests, a11y/perf audits, GA.
Definition of Done
•	All drafts contain citations to transcript spans; risky claims flagged.
•	P95 end to end draft time within SLA; rollback & retry paths proven.
•	WCAG 2.1 AA; Lighthouse ≥ 95; >90% test coverage; OpenAPI complete.
Coding Standards
•	Ruff/Black/mypy; eslint/prettier; pre commit hooks; conventional commits; feature flags for risky features.
Repo Structure
/apps
  /web (Next.js 14)
  /api (FastAPI)
/packages
  /ui (tailwind components)
  /workflows (LangGraph graphs)
  /retrievers (LangChain tools)
  /lib (shared types/clients)
/infra (IaC, deploy configs)
/tests (backend, frontend, e2e)
________________________________________
Critical Prompts for Claude (Tailored)
Prompt 1 — Project Setup & Architecture
"Create the complete project structure and architecture for EchoPress AI. Set up Next.js 14 + TypeScript + Tailwind, FastAPI with async SQLAlchemy + JWT/SSO, PostgreSQL with pgvector, Redis, and deploy configs for Vercel (frontend) and Render (backend). Include CI workflows, env templates, and scaffolding for LangGraph pipelines with LangChain tools and a transcript centric RAG layer."
Prompt 2 — Core Backend Implementation
"Implement the FastAPI backend: episodes/transcripts/segments/drafts/assets/exports models; upload/link ingestion; ASR + diarization adapters; segmentation; embeddings into pgvector; hybrid retrieval (BM25 + dense); drafting and revision endpoints; WebSocket streaming; logging/OTel; audit/cost ledger; RBAC and rate limits."
Prompt 3 — Frontend Components & UI
"Build the Next.js UI: Library, Pipeline Run (live logs), Editor with citations and diff, SEO Studio (headlines/meta/FAQs/schema), Brand Manager (style rules), Integrations (CMS). Ensure dark/light mode and WCAG 2.1 AA."
Prompt 4 — AI Integration & Features
"Wire LangGraph pipeline nodes (ASR → segment → draft → fact check → optimize → export) using LangChain retrievers over transcript and show note sources. Enforce cite or refuse, plagiarism scan, style guide constraints, multilingual outputs, image suggestions with alt text, and CMS export packaging."
Prompt 5 — Deployment & Optimization
"Prepare for production: Vercel + Render configs, pgvector tuning, Redis rate limits/queues, e2e tests (Playwright), load/cost tests, OpenAPI docs, monitoring/alerts (Prometheus/Grafana), backups/PITR, a11y/perf audits, SLO dashboards for p95 latency and quality (originality, citation coverage, SEO)."
________________________________________
Roadmap (90 Days)
•	Day 30: Core pipeline GA (ASR → draft), citations, SEO basics, WordPress export.
•	Day 60: Brand engine v2, multilingual, image assistant, Medium/Ghost/Webflow adapters.
•	Day 90: Headline A/B testing, analytics feedback loops, batch processing, enterprise SSO/SAML.
________________________________________
One Slide Pitch
What: A transcript grounded pipeline that converts episodes into SEO ready articles.
Why it wins: Deterministic orchestration + evidence linked RAG + brand safe style control.
Who: Media teams, agencies, creators, and enterprises scaling thought leadership.
CTA: “Drop an episode. Ship a blog.”





FOLLOW THIS 8 STEP PLAN TO PREPARE THE INFRASTRUCTURE
-----------------------------------------------------

# 🚀 Claude Fullstack Repo Prep – Optimized 8 Step Plan

  
The goal: build an extensive frontend + backend scaffold so Claude Code only has to finish ~20% of the work.  
Each step must be **completed ** before advancing  (this is important).
IMPORTANT: YOU ARE BUILDING ONLY THE INFRASTRUCTURE OF THE APPLICATION NOT THE APPLICATION ITSELF !!!. FOLLOW THE STEPS IN NUMERICAL ORDER !!! starting from step 1.
You are doing the groundwork for the application, including setting up the folder structure, configuration files, and any necessary boilerplate code.
IMPORTANT: the checklist in each step has to be checked off 100% before moving to the next step. And always provide comments to your code blocks so that even a non-tech person can understand what you have done.

---

## STEP 1 — Build the Rich Infrastructure
Create a **deep scaffold** for both frontend and backend so Claude code can recognize the architecture immediately.

- Build a **frontend app shell** with routing, placeholder pages, components, and styling setup.  
- Build a **backend app shell** with API structure, health endpoint, and config in place.  
- Include `REPO_MAP.md`, `API_SPEC.md`, and a draft `CLAUDE.md` in the `docs/` folder.  (create the docs folder if it does not  already exist)
- Add **TODO markers and folder-level `_INSTRUCTIONS.md`** files so Claude knows exactly where to add logic.

**Deliverables**
- Frontend app shell with routing, placeholder pages, components, and styling setup  
- Backend app shell with API structure, health endpoint, and config  
- `docs/REPO_MAP.md`, `docs/API_SPEC.md` (stub), and draft `docs/CLAUDE.md`  
- TODO markers + folder-level `_INSTRUCTIONS.md` files  

**Checklist**
- [ ] Frontend scaffold built  
- [ ] Backend scaffold built 
- [ ] Docs folder created with drafts (`REPO_MAP.md`, `API_SPEC.md`, `CLAUDE.md`)  
- [ ] TODO markers and `_INSTRUCTIONS.md` stubs in place  

---

## STEP 2 — Enrich the Scaffold
If the repo looks shallow, enrich it so Claude needs fewer leaps of imagination.  

Add:
- Sample frontend routes and components (`/`, `/about`, `/dashboard`)  
- Domain model stubs and types/interfaces  
- Mock data + fixtures for UI flows  
- README files with quick run instructions for both frontend and backend  
- Instructions embedded in folders (e.g. `CLAUDE_TASK: …`)

**Deliverables**
- Sample routes and pages (`/`, `/about`, `/dashboard`)  
- Domain model stubs and type definitions  
- Mock data and fixtures for UI flows  
- README files for frontend and backend with run instructions  
- Folder-level instructions (`_INSTRUCTIONS.md`)  

**Checklist**
- [ ] At least 2–3 sample routes/pages exist  
- [ ] Domain types/interfaces stubbed out  
- [ ] Mock data + fixtures included  
- [ ] README_FRONTEND.md and README_BACKEND.md added  
- [ ] Each folder has `_INSTRUCTIONS.md` where relevant 

---

## STEP 3 — Audit for Alignment
Check that the scaffold actually matches the product brief, tech specs, and UX /UI goals.
Add additional UI/UX elements (if needed) to make the application visually appealing (and update the design requirements after that)

- Do navigation and pages reflect the product’s main flows?  
- Do API endpoints match the UI needs?  
- Is the chosen tech stack consistent (no unused or conflicting libraries)?  
- Is the UX direction reflected (design tokens, layout, component stubs)?

**Deliverables**
- Alignment review across Product ↔ UI/UX ↔ Tech  
- Identify any missing flows, mismatched libraries, or conflicting instructions  

**Checklist**
- [ ] Navigation structure matches product journeys  
- [ ] Components/pages map to required features  
- [ ] API endpoints cover MVP needs  
- [ ] No contradictory or unused technologies  

---

## STEP 4 — Document the Architecture
Now make the docs **Claude-ready**:

- **REPO_MAP.md**: Full repo breakdown with roles of each folder  
- **API_SPEC.md**: Endpoints, payloads, error handling  
- **CLAUDE.md**: Editing rules, coding conventions, AI collaboration guidelines  

These three files are the **context backbone** Claude will use to understand the repo.

**Deliverables**
- `REPO_MAP.md`: full repo breakdown with folder purposes  
- `API_SPEC.md`: endpoints, models, error conventions  
- `CLAUDE.md`: collaboration rules, editing boundaries  

**Checklist**
- [ ] REPO_MAP.md fully describes structure  
- [ ] API_SPEC.md covers all MVP endpoints and schemas  
- [ ] CLAUDE.md includes project overview, editing rules, examples  

---

## STEP 5 — Improve the Prompt
Enhance the prompt (in `docs/PROMPT_DECLARATION.md`) with details Claude needs:

- FE/BE boundaries and data contracts  
- UX guidelines (states, accessibility, interaction patterns)  
- Performance budgets (bundle size, API latency)  
- Security constraints (auth, rate limits, PII handling)  
- Testing expectations (unit, integration, end-to-end)

**Deliverables**
- FE/BE boundaries and contracts  
- UX guidelines (states, accessibility, patterns)  
- Performance budgets (bundle size, latency targets)  
- Security constraints (auth, PII, rate limits)  
- Testing expectations  

**Checklist**
- [ ] Prompt includes FE/BE division of responsibility  
- [ ] UX principles and design tokens specified  
- [ ] Performance/security/testing requirements added  
- [ ] Prompt is concrete and actionable for Claude  

---

## STEP 6 — Expert Audit of the Prompt
Now do a **meticulous audit** of the one-page prompt declaration.

- Add Frontend Architecture, Backend Architecture, Design requirements, Core Integrations, Success Criteria, Implementation Guidelines and Security & Compliance categories from this Project Brief to the prompt declaration.
- Remove inconsistencies, duplicates, or unused technologies  
- Ensure Tech Stack → Product → Scaffold alignment (no mismatches)  
- Add UI/UX details that make the product visually appealing and usable  
- Double-check frontend and backend folders are ready  
- Confirm editing boundaries are clear (what Claude can/can’t touch)  
- Make the declaration **battle-tested and handoff-ready**

**Deliverables**
- Remove inconsistencies/duplicates  
- Ensure stack ↔ product ↔ scaffold alignment  
- Add UI/UX and accessibility details  
- Clarify file boundaries (editable vs do-not-touch)  
- Confirm prompt uses Claude-friendly syntax  

**Checklist**
- [ ] No unused or contradictory tech remains  
- [ ] UI/UX directives are product-specific and sufficient  
- [ ] Editing boundaries explicitly defined  
- [ ] Prompt syntax uses clear, imperative instructions  

---

## STEP 7 — Bird’s-Eye Repo Review
Do a quick top-level scan for missing pieces:

- All folders contain either code or `_INSTRUCTIONS.md`  
- `.env.example` files exist for both frontend and backend  
- CI/CD config is present and not trivially broken  
- Run scripts (`npm run dev`, `uvicorn …`) work end-to-end  
- No orphan TODOs without clear ownership

**Deliverables**
- Verify all core files exist  
- Confirm environment, CI, and scripts work end-to-end  

**Checklist**
- [ ] Every folder has code or `_INSTRUCTIONS.md`  
- [ ] `.env.example` present for both frontend and backend  
- [ ] CI pipeline triggers and passes basic checks  
- [ ] Dev script (`scripts/dev.sh`) runs both FE and BE  

---

## STEP 8 — Finalize CLAUDE.md
This is where Claude gets its **onboarding pack**. Make sure `CLAUDE.md` includes:

- **Project Overview**: one-paragraph purpose, stack, goals, target users  
- **Folder & File Structure**: what’s editable vs do-not-touch  
- **Coding Conventions**: style guides, naming rules, commenting expectations  
- **AI Collaboration Rules**: response format, edit rules, ambiguity handling  
- **Editing Rules**: full-file vs patches, locked files  
- **Dependencies & Setup**: frameworks, services, env vars  
- **Workflow & Tools**: how to run locally, FE/BE boundary, deployment notes  
- **Contextual Knowledge**: product quirks, domain rules, business logic caveats  
- **Examples**: good vs bad AI answer

**Deliverables**
- Project overview (purpose, stack, goals, users)  
- Folder & file structure with editable vs do-not-touch  
- Coding conventions (style, naming, commenting)  
- AI collaboration rules (response style, edit rules, ambiguity handling)  
- Dependencies and setup instructions  
- Workflow, deployment notes, contextual knowledge  
- Good vs bad answer examples  
- Fill out all the missing information in the CLAUDE.md file

**Checklist**
- [ ] Project overview section filled in  
- [ ] File boundaries clearly defined  
- [ ] Coding/style conventions included  
- [ ] AI collaboration & editing rules written  
- [ ] Dependencies & env notes covered  
- [ ] Workflow & deployment info added  
- [ ] Contextual knowledge documented  
- [ ] Good vs bad examples included  
- [ ] CLAUDE.md file does not miss any important information

---

# ✅ Outcome
When this 8-step plan is followed:
- The repo is a **rich, opinionated scaffold** (80% done).  
- Docs give Claude **clear boundaries + context**.  
- The one-page prompt is **battle-tested** and aligned.  
- Claude Code can safely and efficiently generate the missing 20%.  












