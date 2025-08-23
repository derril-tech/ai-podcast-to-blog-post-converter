# Product Brief

⚠️ IMPORTANT  
This document defines the **product’s purpose, users, and goals**.  
The infrastructure plan (`INFRASTRUCTURE_PLAN.md`) must always be aligned with this brief.

---

## 1. Product Name

EchoPress AI 

---

## 2. Product Purpose
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

________________________________________
One Slide Pitch
What: A transcript grounded pipeline that converts episodes into SEO ready articles.
Why it wins: Deterministic orchestration + evidence linked RAG + brand safe style control.
Who: Media teams, agencies, creators, and enterprises scaling thought leadership.
CTA: “Drop an episode. Ship a blog.”

