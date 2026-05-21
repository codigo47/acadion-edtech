import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import Footer from '@/app/components/Footer';
import { features } from '@/lib/constants';

// Header Menu Items
const headerMenuItems = ['Features', 'How it Works', "LMS's", 'Testimonials', 'Pricing', 'FAQ'];

// Footer Product Menu Items (same as header)
const footerProductMenuItems = ['Features', 'How it Works', "LMS's", 'Testimonials', 'Pricing', 'FAQ'];

// Footer Company Menu Items
const footerCompanyMenuItems = ['About Us', 'Careers', 'Blog'];

// Footer Legal Menu Items
const footerLegalMenuItems = ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'];

// Section Headers
const sectionHeaders = [
  'Everything you need to create amazing eLearnings',
  'Compatible with Leading LMS Platforms',
  'Get started in 5 simple steps',
  "Don't take it from us, hear it from our users",
  'Ready to get started?',
  "What's often asked about acadion.ai",
];

// Plan names
const planNames = ['Starter', 'Pro', 'Enterprise'];

// Starter Plan Features
const starterPlanItems = [
  '3000 credits',
  'Credits never expire',
  'Buy credits when you need them',
  '30 course hours',
  'Invite unlimited users for QA at no extra cost',
];

// Pro Plan Features
const proPlanItems = [
  'All features from Starter +',
  '1000 credits (4000 total)',
  '40 course hours',
  'Professional Portfolio',
];

// Enterprise Plan Features
const enterprisePlanItems = [
  'All features from Pro +',
  '1000 credits (5000 total)',
  '50 course hours',
  'Custom onboarding',
  'Personalized support',
  'Custom integrations',
  'Project Management & Workflows',
];

describe('Landing Page', () => {
  describe('Header Menu', () => {
    it('should render all header menu items', () => {
      render(<Home />);

      headerMenuItems.forEach((item) => {
        const menuElements = screen.getAllByText(item);
        expect(menuElements.length).toBeGreaterThan(0);
      });
    });

    it('should have Blog link in header', () => {
      render(<Home />);

      const blogLinks = screen.getAllByRole('link', { name: /blog/i });
      expect(blogLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Footer Menu', () => {
    it('should render Footer component', () => {
      render(<Footer />);

      expect(screen.getByText('Product')).toBeInTheDocument();
      expect(screen.getByText('Company')).toBeInTheDocument();
      expect(screen.getByText('Legal')).toBeInTheDocument();
    });

    it('should render all Product menu items in footer', () => {
      render(<Footer />);

      footerProductMenuItems.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    it('should render all Company menu items in footer', () => {
      render(<Footer />);

      footerCompanyMenuItems.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    it('should render all Legal menu items in footer', () => {
      render(<Footer />);

      footerLegalMenuItems.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    it('should have correct links for legal pages', () => {
      render(<Footer />);

      expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
      expect(screen.getByRole('link', { name: 'Terms of Service' })).toHaveAttribute('href', '/terms');
      expect(screen.getByRole('link', { name: 'Cookie Policy' })).toHaveAttribute('href', '/cookies');
      expect(screen.getByRole('link', { name: 'GDPR' })).toHaveAttribute('href', '/gdpr');
    });

    it('should have Blog link pointing to /blog', () => {
      render(<Footer />);

      expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
    });
  });

  describe('Features Section', () => {
    it('should have exactly 20 features displayed on landing page', () => {
      const landingFeatures = features.filter(f => f.showInLanding);
      expect(landingFeatures.length).toBe(20);
    });

    it('should render all feature titles on the landing page', () => {
      render(<Home />);

      const landingFeatures = features.filter(f => f.showInLanding);

      landingFeatures.forEach((feature) => {
        const featureElements = screen.getAllByText(feature.title);
        expect(featureElements.length).toBeGreaterThan(0);
      });
    });

    it('should display features with correct plan badges', () => {
      render(<Home />);

      // Check for All Plans, Pro and Enterprise badges
      expect(screen.getAllByText('All Plans').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Pro').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Enterprise').length).toBeGreaterThan(0);
    });
  });

  describe('Section Headers', () => {
    it('should render "Everything you need to create amazing eLearnings" header', () => {
      render(<Home />);
      expect(screen.getByText('Everything you need to create amazing eLearnings')).toBeInTheDocument();
    });

    it('should render "Compatible with Leading LMS Platforms" header', () => {
      render(<Home />);
      expect(screen.getByText('Compatible with Leading LMS Platforms')).toBeInTheDocument();
    });

    it('should render "Get started in 5 simple steps" header', () => {
      render(<Home />);
      expect(screen.getByText('Get started in 5 simple steps')).toBeInTheDocument();
    });

    it('should render "Don\'t take it from us, hear it from our users" header', () => {
      render(<Home />);
      expect(screen.getByText("Don't take it from us, hear it from our users")).toBeInTheDocument();
    });

    it('should render "Ready to get started?" header', () => {
      render(<Home />);
      expect(screen.getByText('Ready to get started?')).toBeInTheDocument();
    });

    it('should render "What\'s often asked about acadion.ai" header', () => {
      render(<Home />);
      expect(screen.getByText("What's often asked about acadion.ai")).toBeInTheDocument();
    });

    it('should have all section headers present', () => {
      render(<Home />);

      sectionHeaders.forEach((header) => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });
    });
  });

  describe('Pricing Plans', () => {
    it('should render all 3 pricing plans', () => {
      render(<Home />);

      planNames.forEach((plan) => {
        const planElements = screen.getAllByText(plan);
        expect(planElements.length).toBeGreaterThan(0);
      });
    });

    it('should render Starter plan with correct items', () => {
      render(<Home />);

      starterPlanItems.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    it('should render Pro plan with correct items', () => {
      render(<Home />);

      proPlanItems.forEach((item) => {
        const itemElements = screen.getAllByText(item);
        expect(itemElements.length).toBeGreaterThan(0);
      });
    });

    it('should render Enterprise plan with correct items', () => {
      render(<Home />);

      enterprisePlanItems.forEach((item) => {
        const itemElements = screen.getAllByText(item);
        expect(itemElements.length).toBeGreaterThan(0);
      });
    });

    it('should show "Most Popular" badge for Pro plan', () => {
      render(<Home />);
      expect(screen.getByText('Most Popular')).toBeInTheDocument();
    });

    it('should show pricing for Starter plan ($30)', () => {
      render(<Home />);
      const priceElements = screen.getAllByText('30');
      expect(priceElements.length).toBeGreaterThan(0);
    });

    it('should show pricing for Pro plan ($50)', () => {
      render(<Home />);
      const priceElements = screen.getAllByText('50');
      expect(priceElements.length).toBeGreaterThan(0);
    });

    it('should show "Custom pricing" for Enterprise plan', () => {
      render(<Home />);
      expect(screen.getByText('Custom pricing')).toBeInTheDocument();
    });

    it('should have "Talk to sales" button for Enterprise plan', () => {
      render(<Home />);
      expect(screen.getByText('Talk to sales')).toBeInTheDocument();
    });

    it('should have "Compare all plans and features" link', () => {
      render(<Home />);
      expect(screen.getByText('Compare all plans and features')).toBeInTheDocument();
    });
  });

  describe('Form Popup on Plan Click', () => {
    it('should have clickable Start buttons for plans', () => {
      render(<Home />);

      const startButtons = screen.getAllByRole('button', { name: /start/i });
      expect(startButtons.length).toBeGreaterThan(0);
    });

    it('should have clickable plan cards', () => {
      render(<Home />);

      // Check that the plan pricing content exists (cards are there)
      expect(screen.getByText('3000 credits')).toBeInTheDocument();
      expect(screen.getByText('1000 credits (4000 total)')).toBeInTheDocument();
      expect(screen.getByText('Custom pricing')).toBeInTheDocument();
    });

    it('should trigger popup state change on plan card click', async () => {
      render(<Home />);

      // Find and click Start button for Starter plan
      const startButtons = screen.getAllByRole('button', { name: 'Start' });
      expect(startButtons.length).toBeGreaterThan(0);

      // Click the first Start button
      fireEvent.click(startButtons[0]);

      // Wait for the popup to appear
      await waitFor(() => {
        // Check for popup content - the popup should show "Full Name" step
        const fullNameElements = screen.queryAllByText(/full name/i);
        expect(fullNameElements.length).toBeGreaterThan(0);
      }, { timeout: 3000 });
    });

    it('should trigger popup for Enterprise plan', async () => {
      render(<Home />);

      // Find the Talk to sales button
      const talkToSalesButton = screen.getByRole('button', { name: /talk to sales/i });
      expect(talkToSalesButton).toBeInTheDocument();

      fireEvent.click(talkToSalesButton);

      await waitFor(() => {
        const fullNameElements = screen.queryAllByText(/full name/i);
        expect(fullNameElements.length).toBeGreaterThan(0);
      }, { timeout: 3000 });
    });
  });

  describe('Navigation Links', () => {
    it('should have link to compare-plans page', () => {
      render(<Home />);

      const compareLink = screen.getByRole('link', { name: /compare all plans and features/i });
      expect(compareLink).toHaveAttribute('href', '/compare-plans');
    });
  });
});

describe('Footer Component', () => {
  it('should render the footer logo', () => {
    render(<Footer />);

    const logo = screen.getByAltText('acadion Logo');
    expect(logo).toBeInTheDocument();
  });

  it('should render the tagline', () => {
    render(<Footer />);

    expect(screen.getByText('Create engaged and interactive AI powered learning experiences')).toBeInTheDocument();
  });

  it('should render "Start Now" button', () => {
    render(<Footer />);

    expect(screen.getByText('Start Now')).toBeInTheDocument();
  });

  it('should render copyright notice with current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} acadion.ai. All rights reserved.`))).toBeInTheDocument();
  });
});

describe('Features Constants', () => {
  it('should have exactly 21 features defined (including "All AI features")', () => {
    expect(features.length).toBe(21);
  });

  it('should have exactly 20 features visible on landing page', () => {
    const landingFeatures = features.filter(f => f.showInLanding);
    expect(landingFeatures.length).toBe(20);
  });

  it('should have correct feature titles', () => {
    const expectedLandingFeatures = [
      'AI-Generated Courses from Any Source',
      'Course Copilot',
      'AI Image Generation',
      'Full editing control',
      'Real-time Collaboration',
      'Industry-Standard Export Formats',
      'Multi-Language Course Support',
      'Interactive Activities',
      'Multimedia Course Creation',
      'AI powered QA',
      'Accessibility QA',
      'Content Review QA',
      'Learning Objectives QA',
      'Branding QA',
      'Instructional Design Models',
      'WCAG 2.1 Accessibility Compliance',
      'Complete Learning Assets Library',
      'Automatic Version Control',
      'Professional Portfolio',
      'Project Management & Workflows',
    ];

    const landingFeatures = features.filter(f => f.showInLanding).map(f => f.title);

    expectedLandingFeatures.forEach((title) => {
      expect(landingFeatures).toContain(title);
    });
  });

  it('should have "Professional Portfolio" as Pro feature', () => {
    const proFeature = features.find(f => f.title === 'Professional Portfolio');
    expect(proFeature?.plan).toBe('Pro');
  });

  it('should have "Project Management & Workflows" as Enterprise feature', () => {
    const enterpriseFeature = features.find(f => f.title === 'Project Management & Workflows');
    expect(enterpriseFeature?.plan).toBe('Enterprise');
  });
});
