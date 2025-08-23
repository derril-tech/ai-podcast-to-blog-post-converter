# Schemas Directory - Claude Instructions

## Purpose
This directory contains Pydantic models for API request/response validation and data serialization.

## Current State
- ✅ Schema structure created with placeholder models
- ✅ Transcript, Draft, BrandVoice, Export, SEO, Analytics schemas
- ✅ Basic CRUD operations defined
- ✅ Schema interfaces established

## CLAUDE_TASK: Infrastructure Scaffold

### TODO: Transcript Schemas Implementation
- [ ] Add comprehensive transcript segment models
- [ ] Implement speaker diarization schemas
- [ ] Create transcript validation schemas
- [ ] Build transcript search and filter schemas

### TODO: Draft Schemas Implementation
- [ ] Add comprehensive draft content models
- [ ] Implement citation and reference schemas
- [ ] Create draft versioning schemas
- [ ] Build collaboration and revision schemas

### TODO: Brand Voice Schemas Implementation
- [ ] Add comprehensive brand voice profile models
- [ ] Implement voice testing and validation schemas
- [ ] Create voice analytics schemas
- [ ] Build voice application schemas

### TODO: Export Schemas Implementation
- [ ] Add CMS integration schemas
- [ ] Implement export format schemas
- [ ] Create export scheduling schemas
- [ ] Build export analytics schemas

### TODO: SEO Schemas Implementation
- [ ] Add SEO analysis schemas
- [ ] Implement keyword and optimization schemas
- [ ] Create competitor analysis schemas
- [ ] Build SEO performance schemas

### TODO: Analytics Schemas Implementation
- [ ] Add content performance schemas
- [ ] Implement user engagement schemas
- [ ] Create SEO performance schemas
- [ ] Build reporting and insights schemas

## File Structure
```
apps/api/app/schemas/
├── _INSTRUCTIONS.md      # This file
├── transcripts.py        # Transcript-related schemas
├── drafts.py            # Blog post draft schemas
├── brand_voices.py      # Brand voice schemas
├── exports.py           # Export schemas
├── seo.py              # SEO schemas
├── analytics.py        # Analytics schemas
├── common.py           # Common/shared schemas
└── responses.py        # Standard API response schemas
```

## Integration Points
- API Endpoints: Request/response validation
- Database Models: Data serialization/deserialization
- Frontend Types: TypeScript interface generation
- External APIs: Third-party service integration

## Success Criteria
- All schemas implement proper validation
- Schemas are properly documented with examples
- Schemas support OpenAPI generation
- Schemas integrate with database models
