# Backend App Directory Instructions

## CLAUDE_TASK: Backend Development Guidelines

This directory contains the FastAPI backend application for EchoPress AI.

### Structure
- `api/` - API routes and endpoints
- `core/` - Core configuration, database, auth, logging
- `models/` - Database models and ORM definitions
- `schemas/` - Pydantic schemas for request/response validation
- `services/` - Business logic and external service integrations
- `main.py` - Application entry point

### Development Rules
1. **API Design**: Follow RESTful principles
2. **Validation**: Use Pydantic schemas for all inputs/outputs
3. **Error Handling**: Implement proper exception handling
4. **Database**: Use async SQLAlchemy with proper migrations
5. **Security**: Implement proper authentication and authorization

### TODO Markers
- [ ] Implement podcast transcription service
- [ ] Add AI content generation endpoints
- [ ] Create user management system
- [ ] Add file upload handling
- [ ] Implement caching layer
- [ ] Add rate limiting and security measures

### File Boundaries
- **Editable**: All files in `api/`, `models/`, `schemas/`, `services/`
- **Do not touch**: `main.py` (core setup), `core/config.py` (environment config)

### API Guidelines
- Use proper HTTP status codes
- Implement pagination for list endpoints
- Add comprehensive error responses
- Use OpenAPI/Swagger documentation
- Implement proper logging

### Database Guidelines
- Use async database operations
- Implement proper migrations
- Add database indexes for performance
- Use connection pooling
- Implement proper transaction handling

### Testing
- Write unit tests for all services
- Use pytest for testing
- Mock external dependencies
- Test API endpoints with proper fixtures
