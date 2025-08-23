# EchoPress AI Repository Map

This document provides a comprehensive overview of the EchoPress AI repository structure, explaining the purpose and organization of each folder and file.

## 📁 Root Directory Structure

```
echopress-ai/
├── apps/                    # Application packages
│   ├── web/                # Next.js frontend application
│   └── api/                # FastAPI backend application
├── packages/               # Shared packages and libraries
│   ├── ui/                 # Shared UI components
│   ├── workflows/          # LangGraph workflow definitions
│   ├── retrievers/         # LangChain retrieval tools
│   └── lib/                # Shared utilities and types
├── docs/                   # Documentation
├── infra/                  # Infrastructure and deployment
├── tests/                  # End-to-end tests
└── scripts/                # Development and deployment scripts
```

## 🎯 Apps Directory

### `/apps/web` - Frontend Application (Next.js 14)

**Purpose**: The main user interface for EchoPress AI, built with Next.js 14, React 18, and TypeScript.

**Key Features**:
- Modern React with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Radix UI for accessible components
- Real-time updates via WebSockets
- SEO optimization

**Structure**:
```
apps/web/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (auth)/         # Authentication routes
│   │   ├── dashboard/      # Main dashboard
│   │   ├── episodes/       # Episode management
│   │   ├── editor/         # Blog post editor (with _INSTRUCTIONS.md)
│   │   ├── seo/            # SEO optimization tools (with _INSTRUCTIONS.md)
│   │   ├── brand-voice/    # Brand voice studio (with _INSTRUCTIONS.md)
│   │   ├── analytics/      # Analytics dashboard
│   │   ├── pipeline/       # Pipeline management
│   │   └── settings/       # User and workspace settings
│   ├── components/         # React components
│   │   ├── ui/             # Base UI components
│   │   ├── layout/         # Layout components
│   │   ├── forms/          # Form components
│   │   └── features/       # Feature-specific components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and helpers
│   ├── stores/             # State management (Zustand)
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind CSS configuration
├── next.config.js          # Next.js configuration
└── package.json            # Frontend dependencies
```

### `/apps/api` - Backend Application (FastAPI)

**Purpose**: The API server that handles all business logic, AI processing, and data management.

**Key Features**:
- FastAPI with async support
- PostgreSQL with pgvector for vector search
- Redis for caching and queues
- LangGraph for AI orchestration
- JWT authentication
- WebSocket support

**Structure**:
```
apps/api/
├── app/
│   ├── api/                # API route handlers
│   │   └── v1/             # API version 1
│   │       ├── auth.py     # Authentication endpoints (placeholder)
│   │       ├── episodes.py # Episode management (placeholder)
│   │       ├── transcripts.py # Transcription endpoints (placeholder)
│   │       ├── drafts.py   # Blog post drafts (placeholder)
│   │       ├── seo.py      # SEO optimization (placeholder)
│   │       ├── brand_voices.py # Brand voice management (placeholder)
│   │       ├── exports.py  # CMS exports (placeholder)
│   │       ├── analytics.py # Analytics endpoints (placeholder)
│   │       └── router.py   # API router configuration
│   ├── core/               # Core application modules
│   │   ├── config.py       # Configuration settings
│   │   ├── database.py     # Database connection
│   │   ├── cache.py        # Redis cache
│   │   ├── auth.py         # Authentication logic
│   │   └── logging.py      # Logging configuration
│   ├── models/             # Database models
│   ├── services/           # Business logic services (with _INSTRUCTIONS.md)
│   │   ├── transcripts.py  # Transcript processing service (placeholder)
│   │   ├── drafts.py       # Blog post draft service (placeholder)
│   │   ├── brand_voices.py # Brand voice management service (placeholder)
│   │   ├── exports.py      # Content export service (placeholder)
│   │   ├── seo.py          # SEO optimization service (placeholder)
│   │   ├── analytics.py    # Analytics and reporting service (placeholder)
│   │   ├── episodes.py     # Episode management service (placeholder)
│   │   ├── websocket_manager.py # WebSocket management (placeholder)
│   │   ├── ai/             # AI processing services (TODO)
│   │   └── transcription/  # ASR and diarization (TODO)
│   ├── schemas/            # Pydantic schemas (with _INSTRUCTIONS.md)
│   │   ├── transcripts.py  # Transcript schemas (placeholder)
│   │   ├── drafts.py       # Draft schemas (placeholder)
│   │   ├── brand_voice.py  # Brand voice schemas (placeholder)
│   │   ├── export.py       # Export schemas (placeholder)
│   │   ├── seo.py          # SEO schemas (placeholder)
│   │   ├── analytics.py    # Analytics schemas (placeholder)
│   │   ├── episodes.py     # Episode schemas (placeholder)
│   │   ├── user.py         # User schemas (placeholder)
│   │   └── _INSTRUCTIONS.md # Schema instructions
│   └── utils/              # Utility functions
├── alembic/                # Database migrations
├── requirements.txt        # Python dependencies
└── package.json            # Backend scripts
```

## 📦 Packages Directory

### `/packages/ui` - Shared UI Components

**Purpose**: Reusable UI components that can be shared between frontend applications.

**Contents**:
- Button components
- Form components
- Layout components
- Modal and dialog components
- Data display components
- Theme and styling utilities

### `/packages/workflows` - LangGraph Workflows

**Purpose**: AI workflow definitions using LangGraph for orchestrating the podcast-to-blog conversion process.

**Contents**:
- Transcription workflow
- Content generation workflow
- SEO optimization workflow
- Fact-checking workflow
- Export workflow

### `/packages/retrievers` - LangChain Retrieval Tools

**Purpose**: RAG (Retrieval-Augmented Generation) tools for accessing and searching transcript data.

**Contents**:
- Transcript retrievers
- Vector search implementations
- Document loaders
- Embedding utilities

### `/packages/lib` - Shared Libraries

**Purpose**: Common utilities, types, and configurations shared across the application.

**Contents**:
- TypeScript type definitions
- API client utilities
- Validation schemas
- Constants and enums

## 📚 Documentation Directory

### `/docs` - Project Documentation

**Contents**:
- `REPO_MAP.md` - This file (repository structure)
- `API_SPEC.md` - API documentation and specifications
- `CLAUDE.md` - AI collaboration guidelines
- `PROMPT_DECLARATION.md` - Project requirements and constraints

## 🏗️ Infrastructure Directory

### `/infra` - Infrastructure and Deployment

**Purpose**: Infrastructure as Code and deployment configurations.

**Contents**:
- Docker configurations
- Kubernetes manifests
- Terraform configurations
- CI/CD pipelines
- Environment configurations

## 🧪 Testing Directory

### `/tests` - End-to-End Tests

**Purpose**: Comprehensive testing suite for the entire application.

**Contents**:
- Playwright E2E tests
- API integration tests
- Unit test utilities
- Test data and fixtures

## 📜 Scripts Directory

### `/scripts` - Development and Deployment Scripts

**Purpose**: Automation scripts for development, testing, and deployment.

**Contents**:
- Development setup scripts
- Database migration scripts
- Deployment scripts
- Utility scripts

## 🔧 Configuration Files

### Root Level Configuration

- `package.json` - Monorepo configuration and scripts
- `.env.example` - Environment variable templates
- `.gitignore` - Git ignore rules
- `README.md` - Project overview and setup instructions

### Frontend Configuration

- `apps/web/next.config.js` - Next.js configuration
- `apps/web/tailwind.config.js` - Tailwind CSS configuration
- `apps/web/tsconfig.json` - TypeScript configuration

### Backend Configuration

- `apps/api/requirements.txt` - Python dependencies
- `apps/api/alembic.ini` - Database migration configuration
- `apps/api/pyproject.toml` - Python project configuration

## 🚀 Development Workflow

1. **Setup**: Run `npm install` in root to install all dependencies
2. **Frontend**: `npm run dev:frontend` starts the Next.js development server
3. **Backend**: `npm run dev:backend` starts the FastAPI development server
4. **Both**: `npm run dev` starts both frontend and backend simultaneously

## 🏗️ Infrastructure Scaffolding

### Frontend Pages (20% Complete - Placeholder UI)
- **SEO Studio** (`/seo`): ⚠️ **Placeholder UI** - Basic layout with mock data
- **Brand Voice Studio** (`/brand-voice`): ⚠️ **Placeholder UI** - Basic layout with mock data
- **Blog Post Editor** (`/editor`): ⚠️ **Placeholder UI** - Basic layout with mock data
- **Episodes Library** (`/episodes`): ⚠️ **Placeholder UI** - Basic layout with mock data
- **Analytics Dashboard** (`/analytics`): ⚠️ **Placeholder UI** - Basic layout with mock data
- **Pipeline Management** (`/pipeline`): ⚠️ **Placeholder UI** - Basic layout with mock data
- **Dashboard** (`/dashboard`): ⚠️ **Placeholder UI** - Basic layout with mock data
- **About** (`/about`): ⚠️ **Placeholder UI** - Basic layout with mock data
- **Settings** (`/settings`): ⚠️ **Placeholder UI** - Basic layout with mock data

### Backend Services (10% Complete - Placeholder Implementations)
- **TranscriptService**: ⚠️ **Placeholder** - Basic structure with TODO comments
- **DraftService**: ⚠️ **Placeholder** - Basic structure with TODO comments
- **BrandVoiceService**: ⚠️ **Placeholder** - Basic structure with TODO comments
- **ExportService**: ⚠️ **Placeholder** - Basic structure with TODO comments
- **SEOService**: ⚠️ **Placeholder** - Basic structure with TODO comments
- **AnalyticsService**: ⚠️ **Placeholder** - Basic structure with TODO comments
- **WebSocketManager**: ⚠️ **Placeholder** - Basic structure with TODO comments
- **EpisodesService**: ⚠️ **Placeholder** - Basic structure with TODO comments

### Backend Schemas (15% Complete - Basic Models)
- **Transcript schemas**: ⚠️ **Basic models** - Placeholder Pydantic models
- **Draft schemas**: ⚠️ **Basic models** - Placeholder Pydantic models
- **Brand Voice schemas**: ⚠️ **Basic models** - Placeholder Pydantic models
- **Export schemas**: ⚠️ **Basic models** - Placeholder Pydantic models
- **SEO schemas**: ⚠️ **Basic models** - Placeholder Pydantic models
- **Analytics schemas**: ⚠️ **Basic models** - Placeholder Pydantic models
- **User schemas**: ⚠️ **Basic models** - Placeholder Pydantic models
- **Episode schemas**: ⚠️ **Basic models** - Placeholder Pydantic models

### _INSTRUCTIONS.md Files
Each major directory contains `_INSTRUCTIONS.md` files with:
- Current implementation status
- CLAUDE_TASK markers for remaining work
- Detailed TODO lists for specific features
- File structure guidance and integration points
- Success criteria and testing requirements

### 🚧 Current Implementation Status

**Overall Progress**: ~15% Complete (Infrastructure Scaffolding Phase)

**What's Working**:
- ✅ Monorepo structure and workspace configuration
- ✅ Basic Next.js frontend with App Router
- ✅ Basic FastAPI backend with routing
- ✅ Database models and migrations setup
- ✅ Docker and development environment
- ✅ CI/CD pipeline configuration
- ✅ Documentation structure

**What's Placeholder**:
- ⚠️ All frontend pages (basic UI only, no functionality)
- ⚠️ All backend services (structure only, no business logic)
- ⚠️ All API endpoints (return 501 Not Implemented)
- ⚠️ All schemas (basic Pydantic models only)
- ⚠️ Authentication system (not implemented)
- ⚠️ AI pipeline integration (not implemented)

**Next Steps**:
1. Implement authentication system
2. Add business logic to services
3. Connect frontend to backend APIs
4. Implement AI pipeline integration
5. Add real-time features with WebSockets

## 📝 File Naming Conventions

- **Components**: PascalCase (e.g., `AudioPlayer.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useAudioPlayer.ts`)
- **Utilities**: camelCase (e.g., `formatDuration.ts`)
- **Types**: PascalCase with descriptive names (e.g., `EpisodeData.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Python modules**: snake_case (e.g., `audio_processor.py`)
- **Python classes**: PascalCase (e.g., `AudioProcessor`)

## 🔒 Security Considerations

- Environment variables for sensitive data
- JWT tokens for authentication
- CORS configuration for API access
- Rate limiting on API endpoints
- Input validation and sanitization
- Secure file upload handling

## 📊 Monitoring and Observability

- Structured logging with correlation IDs
- OpenTelemetry for distributed tracing
- Prometheus metrics for monitoring
- Health check endpoints
- Error tracking and alerting

This repository structure follows modern best practices for full-stack applications, with clear separation of concerns, modular architecture, and comprehensive documentation.
