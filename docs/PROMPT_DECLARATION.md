# PROMPT_DECLARATION.md - Development Guidelines for EchoPress AI

## Project Overview

**EchoPress AI** is a production-grade, AI-native pipeline that converts podcast episodes into SEO-optimized blog posts. The application ingests audio/video content, performs transcription with diarization, topic segmentation, evidence-linked summarization, SEO optimization, and produces publication-ready blog posts with inline citations and editor-friendly revisions.

**Core Value Proposition**: Cut content turnaround from days to minutes while maintaining brand voice and improving organic traffic through SEO-structured articles.

## Tech Stack & Architecture

### Frontend Architecture (Next.js 14)
- **Framework**: Next.js 14 with App Router, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design tokens and Radix UI components
- **State Management**: Zustand for global state, React Query for server state
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios with interceptors and error handling
- **Real-time**: Socket.io-client for WebSocket connections
- **Icons**: Lucide React for consistent iconography
- **Markdown**: React Markdown with syntax highlighting
- **Testing**: Jest, React Testing Library, Playwright for E2E

### Backend Architecture (FastAPI)
- **Framework**: FastAPI with Python 3.11+, async/await patterns
- **Database**: PostgreSQL with pgvector extension for embeddings
- **ORM**: SQLAlchemy 2.0 with async support
- **Caching**: Redis for sessions, job queues, and rate limiting
- **AI/ML**: LangChain, LangGraph, OpenAI GPT-4, Anthropic Claude
- **Audio Processing**: Whisper API, pyannote.audio for diarization
- **Validation**: Pydantic models for request/response validation
- **Authentication**: JWT with refresh tokens, RBAC
- **Monitoring**: OpenTelemetry, Prometheus, structured logging

### Data Flow Architecture
1. **Ingestion**: Audio/video upload or RSS/YouTube URL
2. **Transcription**: Whisper API with speaker diarization
3. **Segmentation**: Topic boundaries and outline generation
4. **RAG Drafting**: LangChain retrievers over transcript segments
5. **SEO Optimization**: Keywords, meta tags, schema markup
6. **Export**: CMS integration (WordPress, Ghost, Medium, Webflow)

## Frontend/Backend Boundaries

### Frontend Responsibilities
- **UI/UX**: All user interface components and interactions
- **State Management**: Client-side state, form handling, optimistic updates
- **API Integration**: HTTP requests, WebSocket connections, error handling
- **Validation**: Client-side form validation with Zod
- **Routing**: Next.js App Router with dynamic routes
- **Performance**: Code splitting, lazy loading, image optimization

### Backend Responsibilities
- **Business Logic**: All domain logic and data processing
- **Database Operations**: CRUD operations, complex queries, transactions
- **AI Integration**: LangChain pipelines, RAG retrieval, model calls
- **File Processing**: Audio transcription, image generation, file uploads
- **Authentication**: JWT validation, user management, RBAC
- **External APIs**: CMS integrations, analytics, email services

### Data Contracts
- **API Responses**: Consistent JSON structure with error handling
- **WebSocket Events**: Real-time updates for processing status
- **File Uploads**: Multipart form data with progress tracking
- **Authentication**: JWT tokens with refresh mechanism

## UX Guidelines & Design System

### Design Tokens
```css
/* Primary Colors */
--primary-50: #eff6ff;
--primary-500: #3b82f6;
--primary-900: #1e3a8a;

/* Secondary Colors */
--secondary-50: #f8fafc;
--secondary-500: #64748b;
--secondary-900: #0f172a;

/* Accent Colors */
--accent-50: #fef3c7;
--accent-500: #f59e0b;
--accent-900: #92400e;

/* Semantic Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Typography
- **Primary Font**: Inter (sans-serif)
- **Monospace**: JetBrains Mono (code blocks)
- **Heading Scale**: 2rem, 1.5rem, 1.25rem, 1.125rem, 1rem, 0.875rem
- **Body Text**: 1rem (16px) with 1.5 line height

### Component Patterns
- **Cards**: Consistent padding, border radius, shadow
- **Buttons**: Primary, secondary, outline, ghost variants
- **Forms**: Labeled inputs, validation states, error messages
- **Tables**: Sortable columns, pagination, row actions
- **Modals**: Backdrop blur, focus management, escape to close

### Interaction States
- **Loading**: Skeleton screens, progress indicators, disabled states
- **Empty**: Helpful illustrations, clear call-to-actions
- **Error**: User-friendly messages, retry options, fallback content
- **Success**: Confirmation messages, next steps, celebrations

### Accessibility (WCAG 2.1 AA)
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Readers**: Proper ARIA labels, semantic HTML, focus management
- **Color Contrast**: Minimum 4.5:1 ratio for normal text
- **Motion**: Respect `prefers-reduced-motion` setting
- **Focus Indicators**: Visible focus states for all interactive elements

## Performance Budgets

### Frontend Performance
- **Bundle Size**: < 500KB initial load, < 2MB total
- **Lighthouse Score**: ≥ 95 for all metrics
- **Time to Interactive**: < 3 seconds on 3G
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1

### Backend Performance
- **API Latency**: P95 < 300ms for standard endpoints
- **Streaming**: TTFB < 500ms for real-time responses
- **Database Queries**: < 100ms for simple queries, < 500ms for complex
- **File Processing**: < 5 minutes for 60-minute episodes

### Caching Strategy
- **Static Assets**: CDN with long-term caching
- **API Responses**: Redis cache with TTL based on data volatility
- **Database**: Query result caching for expensive operations
- **Frontend**: React Query for server state, Zustand for client state

## Security Constraints

### Authentication & Authorization
- **JWT Tokens**: Access tokens (15min) + refresh tokens (7 days)
- **RBAC**: Owner, Admin, Editor, Reviewer roles
- **MFA**: Optional for enterprise accounts
- **Session Management**: Redis-based with automatic cleanup

### Data Protection
- **Encryption**: TLS 1.3 in transit, AES-256 at rest
- **PII Handling**: Detection and redaction in transcripts
- **File Uploads**: Virus scanning, file type validation
- **API Security**: Rate limiting, input sanitization, CORS

### Compliance Requirements
- **GDPR**: Data portability, right to deletion, consent management
- **SOC2**: Security controls, audit logging, access reviews
- **Content Rights**: Licensing verification, copyright compliance
- **Audit Trail**: Complete logging of all data access and modifications

## Testing Expectations

### Frontend Testing
- **Unit Tests**: Component logic, utility functions, custom hooks
- **Integration Tests**: API integration, form submissions, navigation
- **E2E Tests**: Critical user journeys with Playwright
- **Visual Regression**: Component screenshot testing
- **Accessibility**: Automated a11y testing with axe-core

### Backend Testing
- **Unit Tests**: Service layer, utility functions, data validation
- **Integration Tests**: API endpoints, database operations
- **Performance Tests**: Load testing for critical endpoints
- **Security Tests**: Authentication, authorization, input validation

### Test Coverage Targets
- **Code Coverage**: > 90% for business logic
- **API Coverage**: 100% of public endpoints
- **Critical Paths**: 100% E2E coverage for main user flows
- **Accessibility**: 100% automated a11y test coverage

## Development Workflow

### Local Development
1. **Setup**: `npm install` (root), configure environment variables
2. **Database**: PostgreSQL with pgvector extension
3. **Cache**: Redis for sessions and job queues
4. **Frontend**: `npm run dev:frontend` (port 3000)
5. **Backend**: `npm run dev:backend` (port 8000)

### Code Quality
- **Linting**: ESLint (frontend), Ruff (backend)
- **Formatting**: Prettier (frontend), Black (backend)
- **Type Checking**: TypeScript (frontend), MyPy (backend)
- **Pre-commit**: Automated checks before commits

### Deployment Pipeline
1. **Build**: Type checking, linting, testing
2. **Security**: Dependency scanning, code analysis
3. **Deploy**: Frontend to Vercel, Backend to Render
4. **Monitor**: Health checks, performance metrics, error tracking

## Core Integrations

### AI Services
- **OpenAI**: GPT-4 for content generation, Whisper for transcription
- **Anthropic**: Claude for long-context reasoning and safety review
- **LangChain**: RAG retrieval, output parsing, tool integration
- **LangGraph**: Pipeline orchestration with state management

### Storage & CDN
- **AWS S3/Google Cloud Storage**: File storage for audio and images
- **CloudFront/Cloud CDN**: Global content delivery
- **pgvector**: Vector database for embeddings and similarity search

### CMS Integrations
- **WordPress**: REST API integration with custom endpoints
- **Ghost**: Admin API for content publishing
- **Medium**: Partner API for cross-posting
- **Webflow**: CMS API for site updates

### Analytics & Monitoring
- **Google Analytics**: User behavior and content performance
- **Search Console**: SEO metrics and search performance
- **Prometheus**: System metrics and alerting
- **Sentry**: Error tracking and performance monitoring

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

## Implementation Guidelines

### When Adding Features
1. **Start with Schema**: Define Pydantic models and TypeScript interfaces
2. **Implement Service Layer**: Business logic in service classes
3. **Add API Endpoints**: RESTful endpoints with proper validation
4. **Create UI Components**: React components with proper state management
5. **Add Tests**: Unit and integration tests for new functionality
6. **Update Documentation**: API docs and component documentation

### Code Quality Standards
- **Type Safety**: Full TypeScript coverage, proper type hints
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **Performance**: Optimize for Core Web Vitals and API latency
- **Security**: Input validation, authentication, authorization
- **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation

### Documentation Requirements
- **API Documentation**: OpenAPI/Swagger with examples
- **Component Documentation**: Storybook for UI components
- **Code Comments**: JSDoc for functions, inline comments for complex logic
- **Architecture Decisions**: ADR (Architecture Decision Records)

---

**Remember**: This is a production-grade application serving enterprise customers. Every change should prioritize reliability, security, and user experience. When in doubt, ask for clarification rather than making assumptions.
