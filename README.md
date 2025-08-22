# EchoPress AI — Podcast to Blog Converter

> Turn any episode into a polished, SEO ready article—grounded in what was actually said.

[![CI/CD](https://github.com/echopress-ai/echopress-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/echopress-ai/echopress-ai/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)

## 🚀 Overview

EchoPress AI is a production-grade, AI-native pipeline that converts podcast episodes into SEO-optimized blog posts. Built on Next.js 14 + FastAPI + PostgreSQL/pgvector + Redis, orchestrated by LangGraph with LangChain tools and RAG over transcripts, it delivers low-hallucination, brand-on-voice content with inline citations and editor-friendly revisions.

### ✨ Key Features

- **🎙️ Audio Ingestion**: Upload audio/video files or paste RSS/YouTube URLs
- **🎯 High-Accuracy Transcription**: OpenAI Whisper with speaker diarization
- **🧠 AI-Powered Drafting**: RAG-grounded content generation with citations
- **📈 SEO Optimization**: Automatic keyword optimization and schema markup
- **🎨 Brand Voice Engine**: Maintain consistent tone and style across content
- **📤 Multi-Platform Export**: One-click publishing to WordPress, Ghost, Medium, Webflow
- **📊 Performance Analytics**: Track content performance and SEO metrics

### 🎯 Business Outcomes

- **Cut content turnaround** from days to minutes
- **Improve organic traffic** with SEO-structured articles
- **Maintain brand voice** at scale with style guides and tone profiles

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- Next.js 14 with App Router
- React 18 + TypeScript
- Tailwind CSS + Radix UI
- Zustand (state) + React Query (server state)
- Socket.io-client (real-time updates)

**Backend:**
- FastAPI (Python 3.11+)
- SQLAlchemy 2.0 (async)
- PostgreSQL with pgvector extension
- Redis (caching & queues)
- LangChain + LangGraph
- OpenAI GPT-4 + Anthropic Claude

**Infrastructure:**
- Vercel (frontend deployment)
- Render (backend deployment)
- GitHub Actions (CI/CD)
- Prometheus + Grafana (monitoring)

### Data Flow

```
Audio/Video Input → Transcription → Segmentation → RAG Drafting → SEO Optimization → Export
```

1. **Ingestion**: Audio/video upload or RSS/YouTube URL
2. **Transcription**: Whisper API with speaker diarization
3. **Segmentation**: Topic boundaries and outline generation
4. **RAG Drafting**: LangChain retrievers over transcript segments
5. **SEO Optimization**: Keywords, meta tags, schema markup
6. **Export**: CMS integration (WordPress, Ghost, Medium, Webflow)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL 15+ with pgvector extension
- Redis 7+
- OpenAI API key
- Anthropic API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/echopress-ai/echopress-ai.git
   cd echopress-ai
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd apps/web && npm install && cd ../..
   
   # Install backend dependencies
   cd apps/api && npm install && cd ../..
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment templates
   cp .env.example .env
   cp apps/web/.env.example apps/web/.env.local
   cp apps/api/.env.example apps/api/.env
   
   # Edit the files with your configuration
   ```

4. **Set up the database**
   ```bash
   # Create PostgreSQL database with pgvector extension
   createdb echopress_ai
   psql echopress_ai -c "CREATE EXTENSION IF NOT EXISTS vector;"
   
   # Run database migrations
   cd apps/api && npm run db:migrate && cd ../..
   ```

5. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually
   npm run dev:frontend  # Frontend on http://localhost:3000
   npm run dev:backend   # Backend on http://localhost:8000
   ```

### Environment Variables

Key environment variables you'll need to configure:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/echopress_ai
REDIS_URL=redis://localhost:6379

# AI Services
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Security
JWT_SECRET=your_jwt_secret
JWT_ALGORITHM=HS256

# Storage
STORAGE_BUCKET=your_storage_bucket
STORAGE_REGION=us-east-1

# CMS Integrations
WORDPRESS_URL=your_wordpress_url
GHOST_URL=your_ghost_url
```

## 📚 Documentation

- **[API Documentation](docs/API_SPEC.md)** - Complete API reference
- **[Repository Map](docs/REPO_MAP.md)** - Project structure and organization
- **[Development Guide](docs/CLAUDE.md)** - AI collaboration guidelines
- **[Frontend Guide](README_FRONTEND.md)** - Frontend-specific documentation
- **[Backend Guide](README_BACKEND.md)** - Backend-specific documentation

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm run test

# Frontend tests only
npm run test:frontend

# Backend tests only
npm run test:backend

# E2E tests
npm run test:e2e
```

### Test Coverage

```bash
# Generate coverage reports
npm run test:coverage
```

## 🚀 Deployment

### Production Deployment

1. **Frontend (Vercel)**
   ```bash
   # Deploy to Vercel
   cd apps/web
   vercel --prod
   ```

2. **Backend (Render)**
   ```bash
   # Deploy to Render
   # Configure via Render dashboard
   ```

3. **Database**
   ```bash
   # Set up managed PostgreSQL with pgvector
   # Configure connection strings
   ```

### CI/CD Pipeline

The project includes a comprehensive CI/CD pipeline with:

- **Automated Testing**: Unit, integration, and E2E tests
- **Security Scanning**: Vulnerability scanning with Trivy
- **Performance Testing**: Lighthouse CI for frontend performance
- **Automatic Deployment**: Staging on main branch, production on tags

## 📊 Monitoring & Analytics

### Performance Metrics

- **API Latency**: P95 < 300ms
- **Frontend Performance**: Lighthouse score ≥ 95
- **Uptime**: 99.9% availability
- **Error Rate**: < 1%

### Monitoring Stack

- **Prometheus**: Metrics collection
- **Grafana**: Dashboards and alerting
- **Sentry**: Error tracking
- **OpenTelemetry**: Distributed tracing

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- **Frontend**: ESLint + Prettier, TypeScript strict mode
- **Backend**: Ruff + Black, MyPy type checking
- **Testing**: > 90% code coverage
- **Documentation**: JSDoc for functions, OpenAPI for APIs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT-4 and Whisper APIs
- **Anthropic** for Claude API
- **LangChain** for the RAG framework
- **Vercel** for frontend hosting
- **Render** for backend hosting

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/echopress-ai/echopress-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/echopress-ai/echopress-ai/discussions)
- **Email**: support@echopress.ai

---

**Made with ❤️ by the EchoPress AI Team**

*Turn your podcast episodes into engaging blog posts in minutes, not days.*