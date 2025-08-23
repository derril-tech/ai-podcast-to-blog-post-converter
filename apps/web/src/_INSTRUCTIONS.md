# Frontend Source Directory Instructions

## CLAUDE_TASK: Frontend Development Guidelines

This directory contains the Next.js frontend application for EchoPress AI.

### Structure
- `app/` - Next.js 13+ App Router pages and layouts
- `components/` - Reusable React components
- `lib/` - Utility functions, hooks, and shared logic

### Development Rules
1. **Component Structure**: Use TypeScript for all components
2. **Styling**: Use Tailwind CSS for styling, avoid custom CSS
3. **State Management**: Use React hooks and context for state
4. **API Calls**: Use the API client in `lib/api.ts`
5. **Error Handling**: Implement proper error boundaries and loading states

### TODO Markers
- [ ] Implement podcast upload component
- [ ] Add transcription progress indicator
- [ ] Create blog post preview component
- [ ] Add SEO optimization form
- [ ] Implement user authentication UI
- [ ] Add error handling and loading states

### File Boundaries
- **Editable**: All files in `app/`, `components/`, `lib/`
- **Do not touch**: `layout.tsx` (core structure), `globals.css` (base styles)

### Component Guidelines
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Add JSDoc comments for complex components
- Follow accessibility best practices
- Use semantic HTML elements

### Testing
- Write unit tests for all components
- Use Jest and React Testing Library
- Test user interactions and edge cases
