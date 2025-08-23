# SEO Studio Page - Claude Instructions

## Purpose
This page provides SEO optimization tools for blog posts generated from podcast episodes.

## Current State
- ✅ Basic page structure created with placeholder UI
- ✅ SEO score display and metrics
- ✅ Content optimization form fields
- ✅ Competitor analysis section
- ✅ SEO suggestions panel

## CLAUDE_TASK: Infrastructure Scaffold

### TODO: API Integration
- [ ] Connect SEO score calculation to backend API
- [ ] Implement real-time SEO suggestions from AI
- [ ] Add competitor analysis data fetching
- [ ] Connect content optimization form to backend

### TODO: Business Logic
- [ ] Implement SEO score calculation algorithm
- [ ] Add keyword analysis and suggestions
- [ ] Create readability scoring system
- [ ] Build competitor analysis engine

### TODO: State Management
- [ ] Add Zustand store for SEO data
- [ ] Implement real-time updates via WebSocket
- [ ] Add form validation and error handling
- [ ] Create undo/redo functionality for changes

### TODO: Performance Optimization
- [ ] Add debounced search for competitor analysis
- [ ] Implement lazy loading for suggestions
- [ ] Add caching for SEO calculations
- [ ] Optimize bundle size for SEO tools

## File Structure
```
apps/web/src/app/seo/
├── page.tsx              # Main SEO Studio page
├── _INSTRUCTIONS.md      # This file
├── components/           # SEO-specific components (TODO)
│   ├── SEOScoreCard.tsx
│   ├── ContentOptimizer.tsx
│   ├── CompetitorAnalysis.tsx
│   └── SuggestionsPanel.tsx
└── hooks/               # SEO-specific hooks (TODO)
    ├── useSEOScore.ts
    ├── useCompetitorAnalysis.ts
    └── useContentOptimization.ts
```

## Integration Points
- Backend API: `/api/v1/seo/` endpoints
- State Management: SEO store in `apps/web/src/stores/`
- Real-time Updates: WebSocket connection for live suggestions
- Analytics: Track SEO optimization actions

## Success Criteria
- SEO score updates in real-time as content changes
- Actionable suggestions with clear impact indicators
- Competitor analysis with actionable insights
- Performance metrics tracking and optimization
