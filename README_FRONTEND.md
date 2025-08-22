# EchoPress AI Frontend

The frontend application for EchoPress AI, built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+ or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/echopress-ai.git
   cd echopress-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev:frontend
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
apps/web/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication routes
│   │   ├── dashboard/         # Main dashboard
│   │   ├── episodes/          # Episode management
│   │   ├── editor/            # Blog post editor
│   │   ├── seo/               # SEO optimization tools
│   │   └── settings/          # User and workspace settings
│   ├── components/            # React components
│   │   ├── ui/                # Base UI components
│   │   ├── layout/            # Layout components
│   │   ├── forms/             # Form components
│   │   └── features/          # Feature-specific components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and helpers
│   ├── stores/                # State management (Zustand)
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── tailwind.config.js         # Tailwind CSS configuration
├── next.config.js             # Next.js configuration
└── package.json               # Dependencies and scripts
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev                    # Start development server
npm run dev:frontend          # Start frontend only

# Building
npm run build                 # Build for production
npm run build:frontend       # Build frontend only

# Testing
npm run test                  # Run all tests
npm run test:frontend        # Run frontend tests
npm run test:e2e             # Run end-to-end tests

# Linting and Formatting
npm run lint                  # Run ESLint
npm run lint:frontend        # Lint frontend only
npm run format               # Format code with Prettier

# Type Checking
npm run type-check           # Run TypeScript compiler
npm run type-check:frontend  # Type check frontend only
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
   npm run test:frontend
   npm run lint:frontend
   npm run type-check:frontend
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

## 🎨 Design System

### Colors

The application uses a custom color palette defined in `tailwind.config.js`:

- **Primary**: Blue shades for main actions and branding
- **Secondary**: Purple shades for secondary actions
- **Accent**: Orange shades for highlights and CTAs
- **Gray**: Neutral shades for text and backgrounds

### Typography

- **Font Family**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono for code
- **Responsive**: Fluid typography scaling

### Components

All UI components are built using:
- **Radix UI**: Accessible, unstyled components
- **Tailwind CSS**: Utility-first styling
- **Class Variance Authority**: Component variants
- **Lucide React**: Icon library

## 📱 Responsive Design

The application follows a mobile-first approach:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Breakpoints

```css
/* Tailwind breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

## ♿ Accessibility

The application follows WCAG 2.1 AA guidelines:

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 contrast ratio
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user's motion preferences

## 🧪 Testing

### Testing Strategy

- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Component integration testing
- **E2E Tests**: Playwright for full user journeys
- **Visual Regression**: Screenshot testing

### Running Tests

```bash
# Unit tests
npm run test:frontend

# Watch mode
npm run test:frontend -- --watch

# Coverage report
npm run test:frontend -- --coverage

# E2E tests
npm run test:e2e
```

### Test Structure

```
__tests__/
├── components/              # Component tests
├── hooks/                   # Hook tests
├── utils/                   # Utility tests
└── e2e/                     # End-to-end tests
```

## 📦 State Management

### Zustand Stores

- **Auth Store**: User authentication state
- **Episode Store**: Episode management state
- **Editor Store**: Blog editor state
- **UI Store**: UI state (theme, sidebar, etc.)

### React Query

- **Server State**: API data fetching and caching
- **Optimistic Updates**: Immediate UI updates
- **Background Refetching**: Keep data fresh
- **Error Handling**: Graceful error states

## 🔌 API Integration

### API Client

The frontend uses a custom API client built with Axios:

```typescript
// Example API call
const { data, error, isLoading } = useQuery({
  queryKey: ['episodes'],
  queryFn: () => api.get('/episodes')
});
```

### WebSocket Integration

Real-time updates via WebSocket:

```typescript
// Example WebSocket usage
const { data } = useWebSocket(`/ws/episodes/${episodeId}`);
```

## 🚀 Performance

### Optimization Strategies

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Regular bundle size monitoring
- **Lazy Loading**: Component and route lazy loading
- **Caching**: Strategic caching strategies

### Performance Monitoring

- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Bundle Size**: Track JavaScript bundle size
- **Loading Times**: Monitor page load performance
- **User Experience**: Track user interaction metrics

## 🔧 Configuration

### Environment Variables

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=EchoPress AI

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Next.js Configuration

Key configurations in `next.config.js`:

- **Image Optimization**: Configured domains and formats
- **Webpack**: Custom webpack configuration for audio files
- **Headers**: Security headers
- **Redirects**: SEO-friendly redirects

## 📚 Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Tools

- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Lucide React](https://lucide.dev/) - Icon library
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React Query](https://tanstack.com/query) - Data fetching

## 🤝 Contributing

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Standardized commit messages

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
