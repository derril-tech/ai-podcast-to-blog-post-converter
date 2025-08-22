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
│   │   ├── editor/         # Blog post editor
│   │   ├── seo/            # SEO optimization tools
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
│   │       ├── auth/       # Authentication endpoints
│   │       ├── episodes/   # Episode management
│   │       ├── transcripts/ # Transcription endpoints
│   │       ├── drafts/     # Blog post drafts
│   │       ├── seo/        # SEO optimization
│   │       └── exports/    # CMS exports
│   ├── core/               # Core application modules
│   │   ├── config.py       # Configuration settings
│   │   ├── database.py     # Database connection
│   │   ├── cache.py        # Redis cache
│   │   ├── auth.py         # Authentication logic
│   │   └── logging.py      # Logging configuration
│   ├── models/             # Database models
│   ├── services/           # Business logic services
│   │   ├── transcription/  # ASR and diarization
│   │   ├── ai/             # AI processing
│   │   ├── seo/            # SEO optimization
│   │   └── export/         # CMS integrations
│   ├── schemas/            # Pydantic schemas
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
