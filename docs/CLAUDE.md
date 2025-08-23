# CLAUDE.md - AI Collaboration Guide for EchoPress AI

## Project Overview

**EchoPress AI** is a production-grade, AI-native pipeline that converts podcast episodes into SEO-optimized blog posts. Built on Next.js 14 + FastAPI + PostgreSQL/pgvector + Redis, orchestrated by LangGraph with LangChain tools and RAG over transcripts, it delivers low-hallucination, brand-on-voice content with inline citations and editor-friendly revisions.

**Tech Stack**: Next.js 14 (React 18, TypeScript, Tailwind CSS), FastAPI (Python 3.11, SQLAlchemy async), PostgreSQL with pgvector, Redis, LangGraph, LangChain, OpenAI/Anthropic APIs.

**Goals**: Cut content turnaround from days to minutes, improve organic traffic with SEO-structured articles, maintain brand voice at scale.

**Target Users**: Media teams, agencies, creators, and enterprises scaling thought leadership content.

## Folder & File Structure

### Editable Files (Claude can modify)
- `apps/web/src/components/` - All React components
- `apps/web/src/app/` - Next.js pages and layouts (with _INSTRUCTIONS.md files)
- `apps/web/src/lib/` - Utility functions and shared code
- `apps/web/src/hooks/` - Custom React hooks
- `apps/web/src/store/` - State management (Zustand)
- `apps/web/src/services/` - API client and external integrations
- `apps/api/app/api/` - FastAPI endpoints and routers
- `apps/api/app/services/` - Business logic services (with _INSTRUCTIONS.md files)
- `apps/api/app/schemas/` - Pydantic models and validation (with _INSTRUCTIONS.md files)
- `apps/api/app/models/` - SQLAlchemy database models
- `apps/api/app/core/` - Core configuration and utilities
- `packages/` - Shared libraries and utilities
- `tests/` - All test files
- `docs/` - Documentation (except this file)

### Do-Not-Touch Files (Infrastructure)
- `package.json` (root) - Monorepo configuration
- `apps/web/package.json` - Frontend dependencies
- `apps/api/package.json` - Backend dependencies
- `apps/api/requirements.txt` - Python dependencies
- `apps/web/next.config.js` - Next.js configuration
- `apps/web/tailwind.config.js` - Tailwind CSS configuration
- `apps/web/src/app/layout.tsx` - Root layout (structure only)
- `apps/web/src/app/globals.css` - Global styles
- `apps/api/app/main.py` - FastAPI app entry point
- `apps/api/app/core/config.py` - Configuration settings
- `apps/api/app/core/database.py` - Database connection setup
- `.env.example` - Environment variables template
- `docs/REPO_MAP.md` - Repository structure documentation
- `docs/API_SPEC.md` - API specification
- `docs/CLAUDE.md` - This file (AI collaboration rules)

## Coding Conventions

### Frontend (Next.js/React/TypeScript)
- **File Naming**: kebab-case for files, PascalCase for components
- **Component Structure**: Functional components with TypeScript interfaces
- **State Management**: Zustand for global state, React Query for server state
- **Styling**: Tailwind CSS with custom design tokens
- **Error Handling**: Try-catch blocks with user-friendly error messages
- **Comments**: JSDoc for functions, inline comments for complex logic

### Backend (FastAPI/Python)
- **File Naming**: snake_case for files and functions, PascalCase for classes
- **Type Hints**: Use type hints for all function parameters and return values
- **Error Handling**: Custom exception classes with proper HTTP status codes
- **Database**: Async SQLAlchemy with proper session management
- **Validation**: Pydantic models for request/response validation
- **Comments**: Docstrings for functions and classes, inline comments for complex logic

### General
- **Git**: Conventional commits (feat:, fix:, docs:, etc.)
- **Testing**: Unit tests for business logic, integration tests for APIs
- **Security**: Input validation, authentication, authorization checks
- **Performance**: Optimize for P95 latency < 300ms, streaming responses

## AI Collaboration Rules

### Response Format
- Use markdown formatting with code blocks
- Include file paths in code block headers
- Provide context for changes and explain reasoning
- Use TODO comments for incomplete implementations

### Edit Rules
- **Full File Edits**: For new files or complete rewrites
- **Patch Edits**: For modifications to existing files (use search_replace)
- **Preserve Structure**: Maintain existing folder structure and naming conventions
- **Backward Compatibility**: Ensure changes don't break existing functionality

### Ambiguity Handling
- When requirements are unclear, ask for clarification
- Provide multiple implementation options when appropriate
- Document assumptions and trade-offs
- Flag potential issues or missing requirements

### Code Quality Standards
- Follow established patterns in the codebase
- Include proper error handling and validation
- Write self-documenting code with clear variable names
- Add appropriate logging and monitoring hooks

## Dependencies & Setup

### Frontend Dependencies
- Next.js 14, React 18, TypeScript
- Tailwind CSS, Radix UI components
- Zustand (state), React Query (server state)
- Axios (HTTP client), Socket.io-client (WebSockets)
- React Hook Form, Zod (validation)
- Lucide React (icons), React Markdown

### Backend Dependencies
- FastAPI, Uvicorn, Python 3.11+
- SQLAlchemy (async), Alembic (migrations)
- Redis (cache/queues), PostgreSQL with pgvector
- LangChain, LangGraph, OpenAI/Anthropic APIs
- Pydantic, Pydantic-settings
- OpenTelemetry, Prometheus, Structlog

### Environment Variables
- Database URLs (PostgreSQL, Redis)
- AI API keys (OpenAI, Anthropic)
- JWT secrets and security settings
- Storage configuration (S3/GCS)
- CMS integration credentials

## Workflow & Deployment

### Development Workflow
1. **Local Setup**: `npm install` (root), then `npm run dev`
2. **Frontend**: `cd apps/web && npm run dev` (port 3000)
3. **Backend**: `cd apps/api && npm run dev` (port 8000)
4. **Database**: PostgreSQL with pgvector extension
5. **Cache**: Redis for sessions and job queues

### Testing Strategy
- **Unit Tests**: Jest (frontend), pytest (backend)
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Playwright for critical user flows
- **Performance Tests**: Load testing for API endpoints

### Deployment
- **Frontend**: Vercel with ISR and edge caching
- **Backend**: Render with auto-scaling
- **Database**: Managed PostgreSQL with pgvector
- **Monitoring**: Prometheus metrics, structured logging

## Infrastructure Scaffolding

### Frontend Pages Created
- **SEO Studio** (`/seo`): SEO optimization tools with score tracking, content optimization, and competitor analysis
- **Brand Voice Studio** (`/brand-voice`): Brand voice profile management with tone/style configuration
- **Blog Post Editor** (`/editor`): Rich text editor for creating and editing blog posts

### Backend Services Scaffolded
- **TranscriptService**: Audio transcription and processing
- **DraftService**: Blog post draft management and generation
- **BrandVoiceService**: Brand voice profile management
- **ExportService**: Content export and CMS integration
- **SEOService**: SEO optimization and analysis
- **AnalyticsService**: Analytics and performance tracking

### Backend Schemas Scaffolded
- **Transcript schemas**: Transcript data models and validation
- **Draft schemas**: Blog post draft models and validation
- **Brand Voice schemas**: Brand voice profile models
- **Export schemas**: Export and CMS integration models
- **SEO schemas**: SEO analysis and optimization models
- **Analytics schemas**: Analytics and performance models

### _INSTRUCTIONS.md Files Added
- Each page and service directory contains `_INSTRUCTIONS.md` with:
  - Current state documentation
  - CLAUDE_TASK markers for implementation
  - TODO lists for specific features
  - File structure guidance
  - Integration points
  - Success criteria

## Contextual Knowledge

### Business Logic
- **Episode Processing**: Upload → Transcription → Segmentation → Drafting → SEO → Export
- **RAG Grounding**: All content must be grounded in transcript segments
- **Citation Requirements**: Every claim must have a citation or be flagged as "refuse"
- **Brand Voice**: Enforce tone, style, and banned terms per organization
- **SEO Optimization**: Title, meta description, keywords, schema markup

### Domain Rules
- **Content Rights**: Check licensing and consent before processing
- **PII Handling**: Detect and redact sensitive information
- **Quality Gates**: Plagiarism checks, fact validation, style compliance
- **Multi-tenancy**: Workspace isolation for organizations

### Technical Constraints
- **Performance**: P95 API < 300ms, streaming TTFB < 500ms
- **Scalability**: 10k concurrent editors, parallel processing
- **Reliability**: 99.9% uptime, resumable jobs
- **Security**: SOC2 ready, encryption in transit/at rest

## Examples

### Good AI Answer
```typescript
// ✅ Good: Clear, well-structured, follows conventions
interface EpisodeCreateRequest {
  title: string;
  audioUrl: string;
  brandVoiceId?: string;
  seoTargets?: string[];
}

export const createEpisode = async (data: EpisodeCreateRequest): Promise<Episode> => {
  try {
    const response = await apiClient.post('/episodes', data);
    return response.data;
  } catch (error) {
    logger.error('Failed to create episode', { error, data });
    throw new EpisodeCreationError('Unable to create episode');
  }
};
```

### Bad AI Answer
```typescript
// ❌ Bad: Unclear, no error handling, poor naming
function makeEpisode(d: any) {
  return fetch('/episodes', {
    method: 'POST',
    body: JSON.stringify(d)
  });
}
```

### Good Backend Answer
```python
# ✅ Good: Type hints, validation, proper error handling
from pydantic import BaseModel, HttpUrl
from typing import Optional, List

class EpisodeCreate(BaseModel):
    title: str
    audio_url: HttpUrl
    brand_voice_id: Optional[str] = None
    seo_targets: Optional[List[str]] = []

@router.post("/episodes", response_model=EpisodeResponse)
async def create_episode(
    episode: EpisodeCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> EpisodeResponse:
    try:
        episode_service = EpisodeService(db)
        result = await episode_service.create_episode(episode, current_user)
        return EpisodeResponse.from_orm(result)
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=str(e))
```

## Implementation Guidelines

### When Adding New Features
1. **Start with Schema**: Define Pydantic models and TypeScript interfaces
2. **Implement Service Layer**: Business logic in service classes
3. **Add API Endpoints**: RESTful endpoints with proper validation
4. **Create UI Components**: React components with proper state management
5. **Add Tests**: Unit and integration tests for new functionality
6. **Update Documentation**: API docs and component documentation

### When Debugging Issues
1. **Check Logs**: Structured logging with correlation IDs
2. **Verify Database**: Check data integrity and relationships
3. **Test API**: Use OpenAPI docs for endpoint testing
4. **Monitor Performance**: Check metrics and tracing data
5. **Review Security**: Ensure proper authentication and authorization

### When Optimizing Performance
1. **Database Queries**: Optimize with proper indexing and pagination
2. **Caching Strategy**: Use Redis for frequently accessed data
3. **API Response**: Implement streaming and compression
4. **Frontend Bundle**: Code splitting and lazy loading
5. **Monitoring**: Set up alerts for performance degradation

## Security & Compliance

### Authentication & Authorization
- JWT tokens with refresh mechanism
- Role-based access control (RBAC)
- Multi-factor authentication (MFA)
- Session management with Redis

### Data Protection
- Encryption in transit (TLS) and at rest
- PII detection and redaction
- Data retention policies
- Audit logging for sensitive operations

### API Security
- Rate limiting and throttling
- Input validation and sanitization
- CORS configuration
- Security headers and CSP

### Compliance
- GDPR compliance for data handling
- SOC2 controls for enterprise customers
- Content licensing and rights management
- Accessibility (WCAG 2.1 AA)

## Success Criteria

### Technical Metrics
- **Performance**: P95 API latency < 300ms, streaming TTFB < 500ms
- **Reliability**: 99.9% uptime, < 1% error rate
- **Quality**: > 95% originality score, 100% citation coverage
- **Security**: Zero security vulnerabilities, SOC2 compliance

### Business Metrics
- **Content Turnaround**: < 10 minutes for 60-minute episodes
- **SEO Performance**: +10% CTR, +20% organic impressions
- **User Satisfaction**: > 4.5/5 rating, < 5% churn rate
- **Cost Efficiency**: < $5 per episode processed

### Development Metrics
- **Code Coverage**: > 90% test coverage
- **Documentation**: 100% API documentation coverage
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Lighthouse score ≥ 95

## START/END Guardrails

### Frontend Components
When editing React components, use these guardrails:

```typescript
// START: CLAUDE_EDITABLE
// This section can be modified by Claude
export function MyComponent() {
  // Component implementation
}
// END: CLAUDE_EDITABLE

// START: DO_NOT_TOUCH
// This section should not be modified
const CONFIG = {
  // Configuration that should remain unchanged
};
// END: DO_NOT_TOUCH
```

### Backend Services
When editing Python services, use these guardrails:

```python
# START: CLAUDE_EDITABLE
# This section can be modified by Claude
class MyService:
    def process_data(self, data: dict) -> dict:
        # Service implementation
        pass
# END: CLAUDE_EDITABLE

# START: DO_NOT_TOUCH
# This section should not be modified
DEFAULT_CONFIG = {
    # Configuration that should remain unchanged
}
# END: DO_NOT_TOUCH
```

## Failure-Mode Playbook

### Schema Mismatch
**Problem**: API response doesn't match expected TypeScript interface
**Solution**:
1. Check Pydantic model in backend
2. Update TypeScript interface in frontend
3. Run type checking: `npm run type-check`
4. Update tests if necessary

### Failing Tests
**Problem**: Tests are failing after changes
**Solution**:
1. Run tests locally: `npm run test`
2. Check test output for specific failures
3. Update test fixtures or mock data
4. Ensure new functionality is properly tested

### Missing Environment Variables
**Problem**: Application fails due to missing env vars
**Solution**:
1. Run environment check: `npm run check-env`
2. Copy from `.env.example` to `.env`
3. Fill in required values
4. Restart development servers

### Database Migration Issues
**Problem**: Database schema is out of sync
**Solution**:
1. Check migration files in `apps/api/migrations/`
2. Run migrations: `alembic upgrade head`
3. Verify database connection
4. Check for data integrity issues

### Build Failures
**Problem**: Application won't build
**Solution**:
1. Check TypeScript errors: `npm run type-check`
2. Check linting errors: `npm run lint`
3. Verify all dependencies are installed
4. Clear build cache and retry

### Performance Issues
**Problem**: Application is slow or unresponsive
**Solution**:
1. Run performance check: `npm run verify-budgets`
2. Check API response times
3. Monitor database query performance
4. Review bundle sizes and loading times

### Security Vulnerabilities
**Problem**: Security issues detected
**Solution**:
1. Run security audit: `npm audit`
2. Update vulnerable dependencies
3. Check authentication and authorization
4. Review input validation and sanitization

---

**Remember**: This is a production-grade application serving enterprise customers. Every change should prioritize reliability, security, and user experience. When in doubt, ask for clarification rather than making assumptions.




