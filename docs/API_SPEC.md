# EchoPress AI API Specification

This document provides comprehensive API documentation for the EchoPress AI backend, including all endpoints, request/response schemas, authentication, and error handling.

⚠️ **IMPORTANT**: This API is currently in **infrastructure scaffolding phase**. Most endpoints return `501 Not Implemented` responses as they are placeholder implementations. See the "Implementation Status" section for details.

## 🔐 Authentication

All API endpoints require authentication unless explicitly marked as public. Authentication is handled via JWT tokens.

### Authentication Flow

1. **Login**: `POST /api/v1/auth/login` ⚠️ **TODO: Not implemented**
2. **Refresh Token**: `POST /api/v1/auth/refresh` ⚠️ **TODO: Not implemented**
3. **Logout**: `POST /api/v1/auth/logout` ⚠️ **TODO: Not implemented**

### Headers

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

## 📋 Base URL

- **Development**: `http://localhost:8000`
- **Production**: `https://api.echopress.ai`

## 🔄 Response Format

All API responses follow this standard format:

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## ❌ Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {}
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### ⚠️ Not Implemented Response Format

```json
{
  "detail": "Feature not yet implemented"
}
```

**HTTP Status**: 501 Not Implemented

## 📊 Implementation Status

### ✅ Implemented Endpoints
- **Health Check**: `GET /health` - Basic health monitoring

### ⚠️ Placeholder Endpoints (501 Not Implemented)
- **Authentication**: All auth endpoints are placeholders
- **Episode Management**: Basic structure, no business logic
- **Transcription**: Placeholder endpoints with TODO comments
- **Draft Management**: Placeholder endpoints with TODO comments
- **SEO Optimization**: Placeholder endpoints with TODO comments
- **Export**: Placeholder endpoints with TODO comments
- **Brand Voice**: Placeholder endpoints with TODO comments
- **Analytics**: Placeholder endpoints with TODO comments

### 🚧 Infrastructure Scaffolding
The current API provides the **scaffold structure** for the complete implementation. All endpoints exist but return `501 Not Implemented` responses. This allows for:
- Frontend development with proper API structure
- Clear understanding of required endpoints
- Incremental implementation of business logic

## 🏥 Health Check

### GET /health

**Description**: Health check endpoint for monitoring

**Response**:
```json
{
  "status": "healthy",
  "service": "echopress-ai-backend",
  "version": "1.0.0",
  "timestamp": 1704067200.0
}
```

## 🔐 Authentication Endpoints

⚠️ **STATUS**: All authentication endpoints are **placeholder implementations** that return `501 Not Implemented`.

### POST /api/v1/auth/login

**Description**: Authenticate user and receive access/refresh tokens

**Status**: ⚠️ **TODO: Not implemented**

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response** (when implemented):
```json
{
  "success": true,
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "token_type": "bearer",
    "expires_in": 1800,
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "workspace_id": "workspace_456"
    }
  }
}
```

**Current Response**:
```json
{
  "detail": "Feature not yet implemented"
}
```

### POST /api/v1/auth/refresh

**Description**: Refresh access token using refresh token

**Request Body**:
```json
{
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response**: Same as login response

### POST /api/v1/auth/logout

**Description**: Invalidate refresh token

**Request Body**:
```json
{
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

## 📺 Episode Management

⚠️ **STATUS**: All episode management endpoints are **placeholder implementations** that return `501 Not Implemented`.

### GET /api/v1/episodes

**Description**: List episodes with pagination and filtering

**Status**: ⚠️ **TODO: Not implemented**

**Query Parameters**:
- `page` (int): Page number (default: 1)
- `limit` (int): Items per page (default: 20, max: 100)
- `status` (string): Filter by status (draft, processing, completed, failed)
- `search` (string): Search in title and description
- `workspace_id` (string): Filter by workspace

**Response**:
```json
{
  "success": true,
  "data": {
    "episodes": [
      {
        "id": "episode_123",
        "title": "The Future of AI",
        "description": "Exploring AI trends...",
        "audio_url": "https://storage.example.com/audio/episode_123.mp3",
        "duration": 3600,
        "status": "completed",
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-01-01T01:00:00Z",
        "workspace_id": "workspace_456"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  }
}
```

### POST /api/v1/episodes

**Description**: Create a new episode (upload audio or provide URL)

**Request Body**:
```json
{
  "title": "The Future of AI",
  "description": "Exploring AI trends and predictions",
  "source_type": "upload", // "upload" or "url"
  "source_url": "https://example.com/podcast.mp3", // for URL type
  "workspace_id": "workspace_456",
  "brand_voice_id": "brand_789"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "episode": {
      "id": "episode_123",
      "title": "The Future of AI",
      "status": "uploading",
      "upload_url": "https://storage.example.com/upload/episode_123", // for upload type
      "created_at": "2024-01-01T00:00:00Z"
    }
  }
}
```

### GET /api/v1/episodes/{episode_id}

**Description**: Get episode details

**Response**:
```json
{
  "success": true,
  "data": {
    "episode": {
      "id": "episode_123",
      "title": "The Future of AI",
      "description": "Exploring AI trends...",
      "audio_url": "https://storage.example.com/audio/episode_123.mp3",
      "duration": 3600,
      "status": "completed",
      "transcript": {
        "id": "transcript_456",
        "text": "Hello and welcome to...",
        "segments": [
          {
            "start": 0,
            "end": 5000,
            "speaker": "host",
            "text": "Hello and welcome to..."
          }
        ]
      },
      "draft": {
        "id": "draft_789",
        "title": "The Future of AI: Key Trends and Predictions",
        "content": "# The Future of AI...",
        "status": "completed"
      },
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T01:00:00Z"
    }
  }
}
```

### DELETE /api/v1/episodes/{episode_id}

**Description**: Delete episode and all associated data

**Response**:
```json
{
  "success": true,
  "message": "Episode deleted successfully"
}
```

## 🎙️ Transcription Endpoints

⚠️ **STATUS**: All transcription endpoints are **placeholder implementations** that return `501 Not Implemented`.

### GET /api/v1/episodes/{episode_id}/transcript

**Status**: ⚠️ **TODO: Not implemented**

**Description**: Get episode transcript with segments and diarization

**Response**:
```json
{
  "success": true,
  "data": {
    "transcript": {
      "id": "transcript_456",
      "episode_id": "episode_123",
      "language": "en",
      "confidence": 0.95,
      "text": "Hello and welcome to...",
      "segments": [
        {
          "id": "segment_1",
          "start_ms": 0,
          "end_ms": 5000,
          "speaker": "host",
          "text": "Hello and welcome to...",
          "confidence": 0.98
        }
      ],
      "speakers": [
        {
          "id": "host",
          "name": "Host",
          "total_time": 1800000
        }
      ],
      "created_at": "2024-01-01T00:30:00Z"
    }
  }
}
```

### POST /api/v1/episodes/{episode_id}/transcribe

**Description**: Start transcription process

**Request Body**:
```json
{
  "language": "en",
  "model": "whisper-large-v3",
  "enable_diarization": true
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "job_id": "transcribe_job_789",
    "status": "processing",
    "estimated_duration": 300
  }
}
```

## ✍️ Draft Management

⚠️ **STATUS**: All draft management endpoints are **placeholder implementations** that return `501 Not Implemented`.

### GET /api/v1/episodes/{episode_id}/drafts

**Status**: ⚠️ **TODO: Not implemented**

**Description**: List all drafts for an episode

**Response**:
```json
{
  "success": true,
  "data": {
    "drafts": [
      {
        "id": "draft_789",
        "version": 1,
        "title": "The Future of AI: Key Trends",
        "status": "completed",
        "created_at": "2024-01-01T01:00:00Z"
      }
    ]
  }
}
```

### POST /api/v1/episodes/{episode_id}/drafts

**Description**: Generate new blog post draft

**Request Body**:
```json
{
  "title": "The Future of AI: Key Trends and Predictions",
  "tone": "professional", // professional, casual, technical, conversational
  "target_length": 1500, // words
  "include_citations": true,
  "seo_keywords": ["AI", "future", "technology"],
  "brand_voice_id": "brand_789"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "draft": {
      "id": "draft_789",
      "version": 1,
      "title": "The Future of AI: Key Trends and Predictions",
      "content": "# The Future of AI...",
      "status": "generating",
      "estimated_completion": 120
    }
  }
}
```

### GET /api/v1/drafts/{draft_id}

**Description**: Get draft content with citations

**Response**:
```json
{
  "success": true,
  "data": {
    "draft": {
      "id": "draft_789",
      "episode_id": "episode_123",
      "version": 1,
      "title": "The Future of AI: Key Trends and Predictions",
      "content": "# The Future of AI...",
      "citations": [
        {
          "id": "citation_1",
          "text": "AI will transform every industry",
          "source": "transcript",
          "timestamp": 120000,
          "confidence": 0.95
        }
      ],
      "seo_data": {
        "meta_description": "Explore the future of AI...",
        "keywords": ["AI", "future", "technology"],
        "readability_score": 75
      },
      "status": "completed",
      "created_at": "2024-01-01T01:00:00Z"
    }
  }
}
```

### PUT /api/v1/drafts/{draft_id}

**Description**: Update draft content

**Request Body**:
```json
{
  "title": "Updated Title",
  "content": "# Updated content...",
  "seo_data": {
    "meta_description": "Updated description",
    "keywords": ["updated", "keywords"]
  }
}
```

## 🔍 SEO Optimization

⚠️ **STATUS**: All SEO optimization endpoints are **placeholder implementations** that return `501 Not Implemented`.

### POST /api/v1/drafts/{draft_id}/optimize

**Status**: ⚠️ **TODO: Not implemented**

**Description**: Optimize draft for SEO

**Request Body**:
```json
{
  "target_keywords": ["AI", "machine learning", "future"],
  "target_audience": "tech professionals",
  "competitor_urls": ["https://example.com/article1"],
  "include_faqs": true,
  "include_schema": true
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "optimized_draft": {
      "id": "draft_789",
      "title": "The Future of AI: Complete Guide for 2024",
      "meta_description": "Discover how AI will transform...",
      "keywords": ["AI", "machine learning", "future"],
      "faqs": [
        {
          "question": "What is the future of AI?",
          "answer": "AI will transform every industry..."
        }
      ],
      "schema_markup": {
        "type": "Article",
        "headline": "The Future of AI...",
        "author": "EchoPress AI"
      },
      "seo_score": 85
    }
  }
}
```

## 📤 Export Endpoints

⚠️ **STATUS**: All export endpoints are **placeholder implementations** that return `501 Not Implemented`.

### POST /api/v1/drafts/{draft_id}/export

**Status**: ⚠️ **TODO: Not implemented**

**Description**: Export draft to CMS or download

**Request Body**:
```json
{
  "format": "wordpress", // wordpress, ghost, medium, markdown, html
  "cms_config": {
    "wordpress_url": "https://example.com",
    "username": "admin",
    "password": "password"
  },
  "publish_status": "draft" // draft, publish, private
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "export": {
      "id": "export_123",
      "status": "processing",
      "url": "https://example.com/post/123", // after completion
      "estimated_completion": 30
    }
  }
}
```

### GET /api/v1/exports/{export_id}

**Description**: Get export status and result

**Response**:
```json
{
  "success": true,
  "data": {
    "export": {
      "id": "export_123",
      "draft_id": "draft_789",
      "format": "wordpress",
      "status": "completed",
      "url": "https://example.com/post/123",
      "created_at": "2024-01-01T02:00:00Z",
      "completed_at": "2024-01-01T02:00:30Z"
    }
  }
}
```

## 🎨 Brand Voice Management

⚠️ **STATUS**: All brand voice management endpoints are **placeholder implementations** that return `501 Not Implemented`.

### GET /api/v1/brand-voices

**Status**: ⚠️ **TODO: Not implemented**

**Description**: List brand voice profiles

**Response**:
```json
{
  "success": true,
  "data": {
    "brand_voices": [
      {
        "id": "brand_789",
        "name": "Professional Tech",
        "tone": "professional",
        "style_guide": {
          "banned_words": ["awesome", "cool"],
          "preferred_terms": ["innovative", "cutting-edge"],
          "sentence_length": "medium"
        },
        "created_at": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

### POST /api/v1/brand-voices

**Description**: Create new brand voice profile

**Request Body**:
```json
{
  "name": "Professional Tech",
  "tone": "professional",
  "style_guide": {
    "banned_words": ["awesome", "cool"],
    "preferred_terms": ["innovative", "cutting-edge"],
    "sentence_length": "medium",
    "paragraph_length": "short"
  }
}
```

## 📊 Analytics

⚠️ **STATUS**: All analytics endpoints are **placeholder implementations** that return `501 Not Implemented`.

### GET /api/v1/analytics/episodes/{episode_id}

**Status**: ⚠️ **TODO: Not implemented**

**Description**: Get episode analytics

**Response**:
```json
{
  "success": true,
  "data": {
    "analytics": {
      "episode_id": "episode_123",
      "views": 1500,
      "engagement_rate": 0.75,
      "seo_score": 85,
      "readability_score": 78,
      "citation_coverage": 0.95,
      "generated_at": "2024-01-01T03:00:00Z"
    }
  }
}
```

## 🔌 WebSocket Endpoints

⚠️ **STATUS**: WebSocket endpoints are **placeholder implementations** that are not yet implemented.

### WebSocket /ws/episodes/{episode_id}

**Description**: Real-time updates for episode processing

**Status**: ⚠️ **TODO: Not implemented**

**Events**:
- `transcription_progress`: Transcription progress updates
- `draft_generation_progress`: Draft generation progress
- `export_progress`: Export progress updates
- `error`: Error notifications

**Message Format**:
```json
{
  "event": "transcription_progress",
  "data": {
    "progress": 75,
    "status": "processing",
    "message": "Transcribing audio..."
  }
}
```

## 📝 Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `VALIDATION_ERROR` | Invalid input data | 422 |
| `AUTHENTICATION_ERROR` | Invalid or missing token | 401 |
| `AUTHORIZATION_ERROR` | Insufficient permissions | 403 |
| `NOT_FOUND` | Resource not found | 404 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `PROCESSING_ERROR` | Processing failed | 500 |
| `STORAGE_ERROR` | File storage error | 500 |
| `AI_SERVICE_ERROR` | AI service unavailable | 503 |

## 📈 Rate Limits

- **Authentication endpoints**: 10 requests per minute
- **Episode creation**: 5 requests per minute
- **Transcription**: 3 requests per minute
- **Draft generation**: 5 requests per minute
- **General API**: 100 requests per minute

## 🔒 Security

- All endpoints require HTTPS in production
- JWT tokens expire after 30 minutes
- Refresh tokens expire after 7 days
- Rate limiting on all endpoints
- Input validation and sanitization
- CORS configured for allowed origins only

## 📋 Summary

This API specification provides a complete overview of all available endpoints and their usage patterns for the EchoPress AI platform.

### 🚧 Current State
- **Implementation Status**: Infrastructure scaffolding phase
- **Working Endpoints**: Health check only
- **Placeholder Endpoints**: All other endpoints return `501 Not Implemented`
- **Purpose**: Provide clear API structure for frontend development and incremental implementation

### 🎯 Next Steps
1. **Authentication**: Implement JWT-based authentication system
2. **Core Services**: Add business logic to all service classes
3. **API Implementation**: Replace placeholder endpoints with working implementations
4. **Real-time Features**: Implement WebSocket connections for live updates
5. **AI Integration**: Connect to LangChain and LangGraph for AI processing

### 📚 Related Documentation
- **REPO_MAP.md**: Repository structure and file organization
- **CLAUDE.md**: AI collaboration guidelines and coding conventions
- **_INSTRUCTIONS.md files**: Detailed implementation tasks for each component
