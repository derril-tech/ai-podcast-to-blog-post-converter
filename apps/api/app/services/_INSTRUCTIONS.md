# Services Directory - Claude Instructions

## Purpose
This directory contains business logic services that handle core application functionality.

## Current State
- ✅ Service structure created with placeholder implementations
- ✅ TranscriptService, DraftService, BrandVoiceService, ExportService, SEOService, AnalyticsService
- ✅ Basic CRUD operations defined
- ✅ Service interfaces established

## CLAUDE_TASK: Infrastructure Scaffold

### TODO: TranscriptService Implementation
- [ ] Implement ASR transcription using OpenAI Whisper
- [ ] Add speaker diarization with pyannote.audio
- [ ] Create transcript segmentation and chunking
- [ ] Build transcript search and retrieval functionality

### TODO: DraftService Implementation
- [ ] Implement AI-powered content generation
- [ ] Add citation management and validation
- [ ] Create draft versioning and history
- [ ] Build collaboration and revision features

### TODO: BrandVoiceService Implementation
- [ ] Implement brand voice validation and testing
- [ ] Add voice profile management
- [ ] Create voice application to content generation
- [ ] Build voice analytics and effectiveness tracking

### TODO: ExportService Implementation
- [ ] Implement CMS integration (WordPress, Contentful, etc.)
- [ ] Add export format support (HTML, Markdown, PDF)
- [ ] Create export scheduling and automation
- [ ] Build export analytics and tracking

### TODO: SEOService Implementation
- [ ] Implement SEO score calculation algorithm
- [ ] Add keyword analysis and suggestions
- [ ] Create readability scoring system
- [ ] Build competitor analysis engine

### TODO: AnalyticsService Implementation
- [ ] Implement content performance tracking
- [ ] Add user engagement analytics
- [ ] Create SEO performance monitoring
- [ ] Build reporting and insights generation

## File Structure
```
apps/api/app/services/
├── _INSTRUCTIONS.md      # This file
├── transcripts.py        # Transcript processing service
├── drafts.py            # Blog post draft service
├── brand_voices.py      # Brand voice management service
├── exports.py           # Content export service
├── seo.py              # SEO optimization service
├── analytics.py        # Analytics and reporting service
├── ai/                 # AI processing services (TODO)
│   ├── transcription.py
│   ├── content_generation.py
│   └── optimization.py
└── integrations/       # External service integrations (TODO)
    ├── cms.py
    ├── seo_tools.py
    └── analytics.py
```

## Integration Points
- Database: SQLAlchemy models for data persistence
- AI Services: LangChain and LangGraph for AI processing
- External APIs: OpenAI, Anthropic, CMS platforms
- Cache: Redis for performance optimization
- Queue: Background job processing

## Success Criteria
- All services implement proper error handling
- Services are properly tested with unit tests
- Services integrate with AI pipeline components
- Services provide comprehensive logging and monitoring
