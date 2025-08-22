# Components Directory Instructions

This directory contains all React components for the EchoPress AI frontend application.

## 📁 Directory Structure

```
components/
├── ui/                     # Base UI components (Radix UI + Tailwind)
├── layout/                 # Layout components (Header, Footer, Sidebar)
├── forms/                  # Form components and validation
├── features/               # Feature-specific components
│   ├── episodes/          # Episode management components
│   ├── editor/            # Blog post editor components
│   ├── seo/               # SEO optimization components
│   └── analytics/         # Analytics and reporting components
└── providers/             # Context providers and state management
```

## 🎯 TODO: Implement Base UI Components

### Priority 1: Core UI Components
- [ ] **Button** - Variants: primary, secondary, outline, ghost, destructive
- [ ] **Input** - Text input with validation states
- [ ] **Card** - Container component with header, content, footer
- [ ] **Badge** - Status indicators and labels
- [ ] **Dialog** - Modal dialogs and popovers
- [ ] **Toast** - Notification system
- [ ] **Progress** - Progress bars and spinners
- [ ] **Tabs** - Tab navigation
- [ ] **Accordion** - Collapsible content sections
- [ ] **Dropdown** - Dropdown menus and selectors

### Priority 2: Form Components
- [ ] **Form** - Form wrapper with validation
- [ ] **Select** - Dropdown select component
- [ ] **Checkbox** - Checkbox input
- [ ] **Radio** - Radio button group
- [ ] **Textarea** - Multi-line text input
- [ ] **FileUpload** - File upload with drag & drop
- [ ] **DatePicker** - Date selection component

### Priority 3: Data Display Components
- [ ] **Table** - Data table with sorting and pagination
- [ ] **List** - List components with various layouts
- [ ] **Avatar** - User avatar component
- [ ] **Tag** - Tag and chip components
- [ ] **Tooltip** - Tooltip component
- [ ] **Alert** - Alert and notification components

## 🎯 TODO: Implement Layout Components

### Header Component
- [ ] Navigation menu with responsive design
- [ ] User profile dropdown
- [ ] Search functionality
- [ ] Dark/light mode toggle
- [ ] Workspace selector

### Sidebar Component
- [ ] Collapsible sidebar navigation
- [ ] Episode library navigation
- [ ] Quick actions menu
- [ ] Recent episodes list

### Footer Component
- [ ] Links to documentation and support
- [ ] Social media links
- [ ] Copyright information
- [ ] Legal links

## 🎯 TODO: Implement Feature Components

### Episode Management
- [ ] **EpisodeCard** - Episode preview card
- [ ] **EpisodeList** - Grid/list view of episodes
- [ ] **EpisodeUpload** - File upload interface
- [ ] **EpisodePlayer** - Audio player component
- [ ] **EpisodeStatus** - Status indicators and progress

### Blog Editor
- [ ] **RichTextEditor** - Markdown/MDX editor
- [ ] **CitationHighlighter** - Highlight citations in text
- [ ] **DraftPreview** - Live preview of blog post
- [ ] **VersionHistory** - Draft version management
- [ ] **CollaborationTools** - Comments and suggestions

### SEO Optimization
- [ ] **SEOScore** - SEO score display
- [ ] **KeywordOptimizer** - Keyword suggestion tool
- [ ] **MetaEditor** - Meta description and title editor
- [ ] **SchemaBuilder** - Schema markup builder
- [ ] **ReadabilityAnalyzer** - Readability metrics

### Analytics
- [ ] **AnalyticsDashboard** - Main analytics view
- [ ] **PerformanceChart** - Performance metrics charts
- [ ] **EngagementMetrics** - Engagement statistics
- [ ] **ExportReports** - Report generation and export

## 🎯 TODO: Implement Providers

### State Management
- [ ] **AuthProvider** - Authentication state management
- [ ] **ThemeProvider** - Dark/light theme management
- [ ] **WorkspaceProvider** - Workspace context
- [ ] **NotificationProvider** - Toast notifications
- [ ] **WebSocketProvider** - Real-time updates

## 📋 Implementation Guidelines

### Component Structure
```typescript
// Example component structure
interface ComponentProps {
  // Props interface
}

export function Component({ ...props }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

### Styling Guidelines
- Use Tailwind CSS classes
- Follow the design system in `tailwind.config.js`
- Use CSS variables for theming
- Ensure responsive design
- Follow accessibility guidelines (WCAG 2.1 AA)

### TypeScript Guidelines
- Define proper interfaces for all props
- Use strict TypeScript configuration
- Export types from component files
- Use generic types where appropriate

### Testing Guidelines
- Write unit tests for all components
- Test accessibility features
- Test responsive behavior
- Mock external dependencies

### Performance Guidelines
- Use React.memo for expensive components
- Implement proper loading states
- Optimize re-renders
- Use lazy loading for large components

## 🔧 Development Commands

```bash
# Create new component
npm run generate:component ComponentName

# Run component tests
npm run test:components

# Build components
npm run build:components
```

## 📚 Resources

- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🚨 Important Notes

1. **Accessibility First**: All components must be accessible
2. **Mobile Responsive**: Design for mobile-first approach
3. **Performance**: Optimize for fast loading and smooth interactions
4. **Consistency**: Follow the established design patterns
5. **Documentation**: Document all props and usage examples
