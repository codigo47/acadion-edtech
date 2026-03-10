import '@testing-library/jest-dom';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react');
  const createMotionComponent = (tag) =>
    React.forwardRef(({ children, initial, animate, whileInView, viewport, variants, transition, ...props }, ref) =>
      React.createElement(tag, { ref, ...props }, children)
    );

  return {
    motion: {
      div: createMotionComponent('div'),
      section: createMotionComponent('section'),
      button: createMotionComponent('button'),
      span: createMotionComponent('span'),
      svg: createMotionComponent('svg'),
      a: createMotionComponent('a'),
      h1: createMotionComponent('h1'),
      h2: createMotionComponent('h2'),
      h3: createMotionComponent('h3'),
      h4: createMotionComponent('h4'),
      p: createMotionComponent('p'),
      ul: createMotionComponent('ul'),
      li: createMotionComponent('li'),
      img: createMotionComponent('img'),
      path: createMotionComponent('path'),
      header: createMotionComponent('header'),
      nav: createMotionComponent('nav'),
      main: createMotionComponent('main'),
      footer: createMotionComponent('footer'),
      article: createMotionComponent('article'),
      aside: createMotionComponent('aside'),
      form: createMotionComponent('form'),
      input: createMotionComponent('input'),
      label: createMotionComponent('label'),
      textarea: createMotionComponent('textarea'),
    },
    AnimatePresence: ({ children }) => children,
    useInView: () => true,
    useAnimation: () => ({ start: jest.fn(), stop: jest.fn() }),
    useMotionValue: () => ({ get: () => 0, set: jest.fn() }),
    useTransform: () => 0,
    useScroll: () => ({ scrollY: { get: () => 0 } }),
    useSpring: () => 0,
  };
});

// Mock next/image
jest.mock('next/image', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (props) => {
      const { fill, priority, placeholder, blurDataURL, ...rest } = props;
      return React.createElement('img', rest);
    },
  };
});

// Mock next/link
jest.mock('next/link', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, href, ...props }) => {
      return React.createElement('a', { href, ...props }, children);
    },
  };
});

// Mock PostHog
jest.mock('@/lib/posthog-client', () => ({
  posthog: {
    capture: jest.fn(),
    identify: jest.fn(),
  },
}));

// Mock recharts
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => children,
  LineChart: ({ children }) => children,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  BarChart: ({ children }) => children,
  Bar: () => null,
  PieChart: ({ children }) => children,
  Pie: () => null,
  Cell: () => null,
  AreaChart: ({ children }) => children,
  Area: () => null,
}));

// Mock all feature components - using inline factory functions to avoid hoisting issues
jest.mock('@/app/components/features-landing/AIGeneratedCourseFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/CourseCopilotFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/AIImageGenerationFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/FullEditingControlFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/RealTimeCollaborationFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/ExportFormatsFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/MultiLanguageFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/InteractiveActivitiesFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/MultimediaCourseFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/AIPoweredQAFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/AccessibilityCompliantFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/ContentReviewQAFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/LearningObjectivesFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/BrandingQAFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/InstructionalDesignModelsFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/WCAGComplianceFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/LearningAssetsLibraryFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/VersionControlFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/ProfessionalPortfolioFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});
jest.mock('@/app/components/features-landing/ProjectManagementFeature', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'feature-component' }) };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => {
  const React = require('react');
  const createIcon = (name) => (props) =>
    React.createElement('span', { 'data-testid': `${name}-icon`, ...props });

  return {
    ArrowLeft: createIcon('arrow-left'),
    ArrowRight: createIcon('arrow-right'),
    Calendar: createIcon('calendar'),
    Clock: createIcon('clock'),
    Briefcase: createIcon('briefcase'),
    Cpu: createIcon('cpu'),
    Accessibility: createIcon('accessibility'),
    Layout: createIcon('layout'),
    Brain: createIcon('brain'),
    ClipboardList: createIcon('clipboard'),
    Target: createIcon('target'),
    Folder: createIcon('folder'),
    TrendingUp: createIcon('trending'),
    X: createIcon('x'),
    Shield: createIcon('shield'),
    Lock: createIcon('lock'),
    Eye: createIcon('eye'),
    FileText: createIcon('file-text'),
    UserCheck: createIcon('user-check'),
    Globe: createIcon('globe'),
    Check: createIcon('check'),
    Menu: createIcon('menu'),
    ChevronDown: createIcon('chevron-down'),
    ChevronUp: createIcon('chevron-up'),
    ChevronRight: createIcon('chevron-right'),
    ChevronLeft: createIcon('chevron-left'),
    Search: createIcon('search'),
    Star: createIcon('star'),
    Heart: createIcon('heart'),
    Settings: createIcon('settings'),
    User: createIcon('user'),
    Mail: createIcon('mail'),
    Phone: createIcon('phone'),
    MapPin: createIcon('map-pin'),
    ExternalLink: createIcon('external-link'),
    Download: createIcon('download'),
    Upload: createIcon('upload'),
    Play: createIcon('play'),
    Pause: createIcon('pause'),
    Volume2: createIcon('volume'),
    Mic: createIcon('mic'),
    Camera: createIcon('camera'),
    Image: createIcon('image'),
    Video: createIcon('video'),
    FileIcon: createIcon('file'),
    Trash: createIcon('trash'),
    Edit: createIcon('edit'),
    Copy: createIcon('copy'),
    Share: createIcon('share'),
    Send: createIcon('send'),
    MessageSquare: createIcon('message'),
    Bell: createIcon('bell'),
    AlertCircle: createIcon('alert'),
    Info: createIcon('info'),
    HelpCircle: createIcon('help'),
    Plus: createIcon('plus'),
    Minus: createIcon('minus'),
    Loader2: createIcon('loader'),
    RefreshCw: createIcon('refresh'),
    RotateCw: createIcon('rotate'),
    Zap: createIcon('zap'),
    Award: createIcon('award'),
    Trophy: createIcon('trophy'),
    Sparkles: createIcon('sparkles'),
    Lightbulb: createIcon('lightbulb'),
    BookOpen: createIcon('book'),
    GraduationCap: createIcon('graduation'),
    Users: createIcon('users'),
    Building: createIcon('building'),
    Home: createIcon('home'),
    LogOut: createIcon('logout'),
    LogIn: createIcon('login'),
  };
});

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
}

window.IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver {
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
}

window.ResizeObserver = MockResizeObserver;
