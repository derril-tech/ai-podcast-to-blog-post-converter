# EchoPress AI Backend

The backend API server for EchoPress AI, built with FastAPI, Python 3.11, and modern async patterns.

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- PostgreSQL 14+ with pgvector extension
- Redis 6+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/echopress-ai.git
   cd echopress-ai
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   cd apps/api
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp ../../env.example .env
   # Edit .env with your configuration
   ```

5. **Set up database**
   ```bash
   # Create PostgreSQL database with pgvector
   createdb echopress_ai
   psql -d echopress_ai -c "CREATE EXTENSION IF NOT EXISTS vector;"
   
   # Run migrations
   alembic upgrade head
   ```

6. **Start the development server**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

7. **Verify installation**
   Navigate to [http://localhost:8000/docs](http://localhost:8000/docs)

## 📁 Project Structure

```
apps/api/
├── app/
│   ├── api/                   # API route handlers
│   │   └── v1/               # API version 1
│   │       ├── auth/         # Authentication endpoints
│   │       ├── episodes/     # Episode management
│   │       ├── transcripts/  # Transcription endpoints
│   │       ├── drafts/       # Blog post drafts
│   │       ├── seo/          # SEO optimization
│   │       └── exports/      # CMS exports
│   ├── core/                 # Core application modules
│   │   ├── config.py         # Configuration settings
│   │   ├── database.py       # Database connection
│   │   ├── cache.py          # Redis cache
│   │   ├── auth.py           # Authentication logic
│   │   └── logging.py        # Logging configuration
│   ├── models/               # Database models
│   ├── services/             # Business logic services
│   │   ├── transcription/    # ASR and diarization
│   │   ├── ai/               # AI processing
│   │   ├── seo/              # SEO optimization
│   │   └── export/           # CMS integrations
│   ├── schemas/              # Pydantic schemas
│   └── utils/                # Utility functions
├── alembic/                  # Database migrations
├── requirements.txt          # Python dependencies
└── package.json             # Backend scripts
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev:backend          # Start development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production
npm run start:backend        # Start production server
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Testing
npm run test:backend         # Run all tests
pytest

# Linting and Formatting
npm run lint:backend         # Run Ruff linter
ruff check .

npm run format:backend       # Format code
ruff format .

# Type Checking
npm run type-check:backend   # Run MyPy
mypy .

# Database
npm run migrate              # Run migrations
alembic upgrade head

npm run migrate:create       # Create migration
alembic revision --autogenerate -m "description"
```

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding standards below
   - Write tests for new functionality
   - Update documentation as needed

3. **Run tests and linting**
   ```bash
   pytest
   ruff check .
   mypy .
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create a pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🗄️ Database

### PostgreSQL Setup

1. **Install PostgreSQL**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   
   # macOS
   brew install postgresql
   
   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Install pgvector extension**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql-14-pgvector
   
   # macOS
   brew install pgvector
   ```

3. **Create database**
   ```bash
   createdb echopress_ai
   psql -d echopress_ai -c "CREATE EXTENSION IF NOT EXISTS vector;"
   ```

### Database Models

Key models in the application:

- **User**: User accounts and authentication
- **Workspace**: Organization workspaces
- **Episode**: Podcast episodes
- **Transcript**: Episode transcripts with segments
- **Draft**: Blog post drafts
- **Export**: CMS export records
- **BrandVoice**: Brand voice profiles

### Migrations

```bash
# Create a new migration
alembic revision --autogenerate -m "Add new table"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1

# View migration history
alembic history
```

## 🔌 API Documentation

### Interactive Documentation

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **OpenAPI JSON**: [http://localhost:8000/openapi.json](http://localhost:8000/openapi.json)

### API Endpoints

#### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - User logout

#### Episodes
- `GET /api/v1/episodes` - List episodes
- `POST /api/v1/episodes` - Create episode
- `GET /api/v1/episodes/{id}` - Get episode details
- `DELETE /api/v1/episodes/{id}` - Delete episode

#### Transcription
- `POST /api/v1/episodes/{id}/transcribe` - Start transcription
- `GET /api/v1/episodes/{id}/transcript` - Get transcript

#### Drafts
- `POST /api/v1/episodes/{id}/drafts` - Generate draft
- `GET /api/v1/drafts/{id}` - Get draft
- `PUT /api/v1/drafts/{id}` - Update draft

#### SEO
- `POST /api/v1/drafts/{id}/optimize` - Optimize for SEO

#### Exports
- `POST /api/v1/drafts/{id}/export` - Export draft
- `GET /api/v1/exports/{id}` - Get export status

## 🤖 AI Integration

### LangChain & LangGraph

The application uses LangChain and LangGraph for AI orchestration:

```python
# Example workflow
from app.services.ai.workflows import ContentGenerationWorkflow

workflow = ContentGenerationWorkflow()
result = await workflow.run(episode_id="episode_123")
```

### RAG Implementation

Retrieval-Augmented Generation for grounded content:

```python
# Example RAG usage
from app.services.ai.retrievers import TranscriptRetriever

retriever = TranscriptRetriever()
context = await retriever.get_relevant_segments(query="AI trends")
```

### Supported AI Models

- **OpenAI**: GPT-4, Whisper, Embeddings
- **Anthropic**: Claude models
- **Local**: Whisper for transcription

## 🔒 Security

### Authentication

- **JWT Tokens**: Access and refresh tokens
- **Password Hashing**: bcrypt with salt
- **Rate Limiting**: Per-endpoint rate limits
- **CORS**: Configured for allowed origins

### Data Protection

- **Input Validation**: Pydantic schemas
- **SQL Injection Protection**: SQLAlchemy ORM
- **XSS Protection**: Input sanitization
- **CSRF Protection**: Token-based protection

## 📊 Monitoring

### Logging

Structured logging with correlation IDs:

```python
import logging

logger = logging.getLogger(__name__)
logger.info("Processing episode", extra={
    "episode_id": episode_id,
    "user_id": user_id,
    "correlation_id": correlation_id
})
```

### Metrics

Prometheus metrics for monitoring:

- **Request Duration**: API response times
- **Error Rates**: Error percentages
- **Throughput**: Requests per second
- **Resource Usage**: CPU, memory, disk

### Health Checks

- **Health Endpoint**: `/health`
- **Database Health**: Connection status
- **External Services**: AI service availability
- **Storage Health**: File storage status

## 🧪 Testing

### Testing Strategy

- **Unit Tests**: Individual function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full workflow testing
- **Performance Tests**: Load testing

### Running Tests

```bash
# All tests
pytest

# Specific test file
pytest tests/test_episodes.py

# With coverage
pytest --cov=app

# Performance tests
pytest tests/performance/

# Watch mode
pytest --watch
```

### Test Structure

```
tests/
├── unit/                     # Unit tests
├── integration/              # Integration tests
├── e2e/                      # End-to-end tests
├── performance/              # Performance tests
├── fixtures/                 # Test fixtures
└── conftest.py              # Pytest configuration
```

## 🚀 Performance

### Optimization Strategies

- **Async/Await**: Non-blocking I/O operations
- **Connection Pooling**: Database and Redis pools
- **Caching**: Redis for frequently accessed data
- **Background Tasks**: Celery for heavy processing
- **Database Indexing**: Optimized queries

### Performance Monitoring

- **APM**: Application performance monitoring
- **Database Queries**: Query performance analysis
- **Memory Usage**: Memory leak detection
- **CPU Profiling**: Performance bottleneck identification

## 🔧 Configuration

### Environment Variables

Key configuration options:

```bash
# Database
DATABASE_URL=postgresql+asyncpg://user:pass@localhost/echopress_ai

# Redis
REDIS_URL=redis://localhost:6379

# AI Services
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=sk-ant-your-key

# Storage
STORAGE_BUCKET=echopress-ai-storage
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
```

### Feature Flags

Control feature availability:

```bash
ENABLE_WHISPER_ASR=true
ENABLE_PYANNOTE_DIARIZATION=true
ENABLE_LANGGRAPH=true
ENABLE_VECTOR_SEARCH=true
```

## 📚 Resources

### Documentation

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Pydantic Documentation](https://pydantic-docs.helpmanual.io/)
- [LangChain Documentation](https://python.langchain.com/)
- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)

### Tools

- [Ruff](https://github.com/astral-sh/ruff) - Fast Python linter
- [MyPy](https://mypy.readthedocs.io/) - Static type checker
- [Pytest](https://docs.pytest.org/) - Testing framework
- [Alembic](https://alembic.sqlalchemy.org/) - Database migrations

## 🤝 Contributing

### Code Standards

- **Type Hints**: All functions must have type hints
- **Docstrings**: Comprehensive documentation
- **Error Handling**: Proper exception handling
- **Logging**: Structured logging throughout
- **Testing**: High test coverage

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Update documentation
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the docs folder
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions
- **Email**: support@echopress.ai

---

Built with ❤️ by the EchoPress AI Team
