# Blog Post Editor Page - Claude Instructions

## Purpose
This page provides a rich text editor for creating and editing blog posts generated from podcast episodes.

## Current State
- ✅ Basic page structure created with placeholder UI
- ✅ Content editor with title and body fields
- ✅ Citations panel for reference management
- ✅ SEO analysis panel
- ✅ Quick action buttons

## CLAUDE_TASK: Infrastructure Scaffold

### TODO: API Integration
- [ ] Connect draft CRUD operations to backend API
- [ ] Implement real-time auto-save functionality
- [ ] Add citation management and validation
- [ ] Connect SEO analysis to backend services

### TODO: Business Logic
- [ ] Implement rich text editor with markdown support
- [ ] Add citation insertion and management
- [ ] Create content validation and quality checks
- [ ] Build collaboration features (comments, suggestions)

### TODO: State Management
- [ ] Add Zustand store for editor state
- [ ] Implement real-time collaboration via WebSocket
- [ ] Add undo/redo functionality
- [ ] Create draft versioning and history

### TODO: Performance Optimization
- [ ] Add debounced auto-save
- [ ] Implement lazy loading for large documents
- [ ] Add content caching and optimization
- [ ] Optimize editor rendering performance

## File Structure
```
apps/web/src/app/editor/
├── page.tsx              # Main Blog Post Editor page
├── _INSTRUCTIONS.md      # This file
├── components/           # Editor specific components (TODO)
│   ├── RichTextEditor.tsx
│   ├── CitationsPanel.tsx
│   ├── SEOAnalysisPanel.tsx
│   └── CollaborationPanel.tsx
└── hooks/               # Editor specific hooks (TODO)
    ├── useEditor.ts
    ├── useCitations.ts
    ├── useAutoSave.ts
    └── useCollaboration.ts
```

## Integration Points
- Backend API: `/api/v1/drafts/` endpoints
- State Management: Editor store in `apps/web/src/stores/`
- Real-time Updates: WebSocket connection for collaboration
- Content Generation: Integration with AI pipeline

## Success Criteria
- Rich text editing with markdown support
- Real-time auto-save and collaboration
- Citation management and validation
- SEO analysis and optimization tools
