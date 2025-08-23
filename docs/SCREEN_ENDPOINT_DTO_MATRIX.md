# Screen ↔ Endpoint ↔ DTO Matrix

This document maps the frontend screens to their corresponding backend endpoints and data transfer objects (DTOs).

⚠️ **IMPORTANT**: This API is currently in **infrastructure scaffolding phase**. Most endpoints return `501 Not Implemented` responses as they are placeholder implementations.

## Overview

| Screen | Endpoint | DTO | Status | Description |
|--------|----------|-----|--------|-------------|
| `/` (Landing) | `GET /health` | `HealthResponse` | ✅ Working | Application health check |
| `/dashboard` | `GET /api/v1/analytics/overview` | `AnalyticsOverviewResponse` | ⚠️ Placeholder | Dashboard metrics |
| `/episodes` | `GET /api/v1/episodes` | `PaginatedEpisodeResponse` | ⚠️ Placeholder | Episode library |
| `/episodes/[id]` | `GET /api/v1/episodes/{id}` | `EpisodeResponse` | ⚠️ Placeholder | Episode details |
| `/analytics` | `GET /api/v1/analytics/performance` | `AnalyticsPerformanceResponse` | ⚠️ Placeholder | Analytics dashboard |
| `/seo` | `GET /api/v1/seo/optimize` | `SEOOptimizationResponse` | ⚠️ Placeholder | SEO optimization tools |
| `/brand-voice` | `GET /api/v1/brand-voices` | `BrandVoiceResponse` | ⚠️ Placeholder | Brand voice management |
| `/editor` | `GET /api/v1/drafts/{id}` | `DraftResponse` | ⚠️ Placeholder | Blog post editor |
| `/settings` | `GET /api/v1/user/profile` | `UserProfileResponse` | ⚠️ Placeholder | User settings |

## Detailed Mapping

### 1. Landing Page (`/`)

**Purpose**: Marketing and onboarding
**Status**: ✅ Working
**Endpoints**:
- `GET /health` - Health check ✅ Working
- `POST /api/v1/auth/login` - User authentication ⚠️ Placeholder (501 Not Implemented)
- `POST /api/v1/auth/register` - User registration ⚠️ Placeholder (501 Not Implemented)

**DTOs**:
```typescript
interface HealthResponse {
  status: string;
  service: string;
  version: string;
  timestamp: number;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}
```

### 2. Dashboard (`/dashboard`)

**Purpose**: Overview of user's content and performance
**Status**: ⚠️ Placeholder UI only
**Endpoints**:
- `GET /api/v1/analytics/overview` - Dashboard metrics ⚠️ Placeholder (501 Not Implemented)
- `GET /api/v1/episodes?limit=5` - Recent episodes ⚠️ Placeholder (501 Not Implemented)
- `GET /api/v1/blog-posts?limit=5` - Recent blog posts ⚠️ Placeholder (501 Not Implemented)

**DTOs**:
```typescript
interface AnalyticsOverviewResponse {
  total_episodes: number;
  total_blog_posts: number;
  avg_processing_time: number;
  success_rate: number;
  recent_episodes: Episode[];
  recent_blog_posts: BlogPost[];
}

interface PaginatedEpisodeResponse {
  data: Episode[];
  pagination: Pagination;
  success: boolean;
  message: string;
}
```

### 3. Episodes Library (`/episodes`)

**Purpose**: Manage podcast episodes
**Endpoints**:
- `GET /api/v1/episodes` - List episodes
- `POST /api/v1/episodes` - Create episode
- `DELETE /api/v1/episodes/{id}` - Delete episode
- `PUT /api/v1/episodes/{id}` - Update episode

**DTOs**:
```typescript
interface Episode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  transcript?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

interface CreateEpisodeRequest {
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
}

interface UpdateEpisodeRequest {
  title?: string;
  description?: string;
  audioUrl?: string;
  duration?: number;
}
```

### 4. Episode Details (`/episodes/[id]`)

**Purpose**: View and edit specific episode
**Endpoints**:
- `GET /api/v1/episodes/{id}` - Get episode details
- `GET /api/v1/transcripts/{episode_id}` - Get transcript
- `POST /api/v1/drafts/{episode_id}` - Create blog post draft
- `GET /api/v1/drafts/{episode_id}` - Get blog post draft

**DTOs**:
```typescript
interface EpisodeResponse {
  data: Episode;
  success: boolean;
  message: string;
}

interface Transcript {
  episode_id: string;
  language: string;
  text: string;
  diarization_json: any;
  segments: TranscriptSegment[];
}

interface TranscriptSegment {
  episode_id: string;
  start_ms: number;
  end_ms: number;
  speaker: string;
  text: string;
  vector: number[];
  topic: string;
}

interface Draft {
  episode_id: string;
  version: number;
  mdx: string;
  citations_json: any;
  seo_json: any;
  tone_profile_id: string;
}
```

### 5. Analytics (`/analytics`)

**Purpose**: Track content performance and SEO metrics
**Endpoints**:
- `GET /api/v1/analytics/performance` - Performance metrics
- `GET /api/v1/analytics/seo` - SEO metrics
- `GET /api/v1/analytics/content-quality` - Content quality metrics

**DTOs**:
```typescript
interface AnalyticsPerformanceResponse {
  organic_traffic: number;
  avg_position: number;
  click_through_rate: number;
  top_performing_content: ContentPerformance[];
}

interface ContentPerformance {
  id: string;
  title: string;
  views: number;
  growth_percentage: number;
  published_date: string;
}

interface SeoMetrics {
  title_ctr_uplift: number;
  organic_impressions: number;
  keyword_rankings: KeywordRanking[];
}

interface ContentQualityMetrics {
  originality_score: number;
  citation_coverage: number;
  readability_score: number;
}
```

### 6. Settings (`/settings`)

**Purpose**: User preferences and account management
**Endpoints**:
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile
- `PUT /api/v1/user/password` - Change password
- `GET /api/v1/user/notifications` - Get notification settings
- `PUT /api/v1/user/notifications` - Update notification settings

**DTOs**:
```typescript
interface UserProfileResponse {
  data: User;
  success: boolean;
  message: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role?: string;
  timezone?: string;
  created_at: string;
  updated_at: string;
}

interface UpdateProfileRequest {
  name?: string;
  company?: string;
  role?: string;
  timezone?: string;
}

interface NotificationSettings {
  email_notifications: boolean;
  processing_complete: boolean;
  seo_alerts: boolean;
  weekly_reports: boolean;
}
```

### 7. Blog Post Editor (`/drafts/[id]`)

**Purpose**: Edit and optimize blog posts
**Endpoints**:
- `GET /api/v1/drafts/{id}` - Get draft
- `PUT /api/v1/drafts/{id}` - Update draft
- `POST /api/v1/seo/{id}/optimize` - Optimize SEO
- `POST /api/v1/drafts/{id}/revise` - Revise content

**DTOs**:
```typescript
interface DraftResponse {
  data: Draft;
  success: boolean;
  message: string;
}

interface UpdateDraftRequest {
  mdx?: string;
  citations_json?: any;
  seo_json?: any;
}

interface SeoOptimizationRequest {
  keywords: string[];
  target_length?: number;
  tone?: string;
  include_faqs?: boolean;
}

interface SeoOptimizationResponse {
  optimized_title: string;
  meta_description: string;
  keywords: string[];
  faqs: FAQ[];
  schema_markup: any;
}

interface FAQ {
  question: string;
  answer: string;
}
```

### 8. Export Management (`/exports`)

**Purpose**: Manage content exports to CMS platforms
**Endpoints**:
- `GET /api/v1/exports` - List exports
- `POST /api/v1/exports` - Create export
- `GET /api/v1/exports/{id}/status` - Get export status

**DTOs**:
```typescript
interface Export {
  id: string;
  episode_id: string;
  cms: 'wordpress' | 'ghost' | 'medium' | 'webflow' | 'markdown';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  url?: string;
  log?: string;
  created_at: string;
  updated_at: string;
}

interface CreateExportRequest {
  episode_id: string;
  cms: string;
  publish_immediately?: boolean;
  scheduled_date?: string;
}

interface ExportStatusResponse {
  data: Export;
  success: boolean;
  message: string;
}
```

## Error Handling

All endpoints follow a consistent error response format:

```typescript
interface ErrorResponse {
  success: false;
  message: string;
  code: string;
  details?: any;
}
```

### ⚠️ Current Placeholder Response Format

Most endpoints currently return:
```json
{
  "detail": "Feature not yet implemented"
}
```

**HTTP Status**: 501 Not Implemented

Common error codes:
- `VALIDATION_ERROR` - Request validation failed
- `NOT_FOUND` - Resource not found
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `INTERNAL_ERROR` - Server error

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

Public endpoints:
- `GET /health`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`
- `GET /` (landing page)

## Pagination

List endpoints support pagination with query parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

Response includes pagination metadata:
```typescript
interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}
```
