import { render, screen } from '@testing-library/react';
import BlogPage from '@/app/blog/page';
import ComparePlansPage from '@/app/compare-plans/page';
import PrivacyPolicyPage from '@/app/privacy/page';
import TermsOfServicePage from '@/app/terms/page';
import CookiePolicyPage from '@/app/cookies/page';
import GDPRPage from '@/app/gdpr/page';

describe('Blog Page', () => {
  it('should render the Blog page', () => {
    render(<BlogPage />);

    // Check for blog heading or title
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('should have a link back to home', () => {
    render(<BlogPage />);

    // Blog uses "Back to acadion.ai"
    const homeLinks = screen.getAllByRole('link', { name: /back to acadion/i });
    expect(homeLinks.length).toBeGreaterThan(0);
  });

  it('should render the logo', () => {
    render(<BlogPage />);

    // There may be multiple logos (header and footer)
    const logos = screen.getAllByAltText(/acadion logo/i);
    expect(logos.length).toBeGreaterThan(0);
  });

  it('should render the footer', () => {
    render(<BlogPage />);

    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });
});

describe('Compare Plans Page', () => {
  it('should render the Compare Plans page', () => {
    render(<ComparePlansPage />);

    // Check for Compare Plans content
    expect(screen.getByText(/compare/i)).toBeInTheDocument();
  });

  it('should render all three plans (Starter, Pro, Enterprise)', () => {
    render(<ComparePlansPage />);

    expect(screen.getAllByText('Starter').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Pro').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Enterprise').length).toBeGreaterThan(0);
  });

  it('should show pricing for each plan', () => {
    render(<ComparePlansPage />);

    expect(screen.getByText('$30')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
    // Enterprise shows "Custom" as part of "Custom pricing"
    const customPricingElements = screen.getAllByText(/custom/i);
    expect(customPricingElements.length).toBeGreaterThan(0);
  });

  it('should have a link back to home', () => {
    render(<ComparePlansPage />);

    const homeLinks = screen.getAllByRole('link').filter(link =>
      link.getAttribute('href') === '/'
    );
    expect(homeLinks.length).toBeGreaterThan(0);
  });

  it('should render the logo', () => {
    render(<ComparePlansPage />);

    const logos = screen.getAllByAltText(/acadion logo/i);
    expect(logos.length).toBeGreaterThan(0);
  });

  it('should render the footer', () => {
    render(<ComparePlansPage />);

    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });
});

describe('Privacy Policy Page', () => {
  it('should render the Privacy Policy page', () => {
    render(<PrivacyPolicyPage />);

    // Use level 1 to get only the main title, not section headings
    expect(screen.getByRole('heading', { level: 1, name: /privacy policy/i })).toBeInTheDocument();
  });

  it('should have a link back to home', () => {
    render(<PrivacyPolicyPage />);

    const homeLink = screen.getByRole('link', { name: /back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render the logo', () => {
    render(<PrivacyPolicyPage />);

    const logos = screen.getAllByAltText(/acadion logo/i);
    expect(logos.length).toBeGreaterThan(0);
  });

  it('should show the last updated date', () => {
    render(<PrivacyPolicyPage />);

    // There may be multiple "last updated" texts
    const lastUpdatedElements = screen.getAllByText(/last updated/i);
    expect(lastUpdatedElements.length).toBeGreaterThan(0);
  });

  it('should render the footer', () => {
    render(<PrivacyPolicyPage />);

    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  it('should contain introduction section', () => {
    render(<PrivacyPolicyPage />);

    const introElements = screen.getAllByText(/introduction/i);
    expect(introElements.length).toBeGreaterThan(0);
  });
});

describe('Terms of Service Page', () => {
  it('should render the Terms of Service page', () => {
    render(<TermsOfServicePage />);

    expect(screen.getByRole('heading', { name: /terms of service/i })).toBeInTheDocument();
  });

  it('should have a link back to home', () => {
    render(<TermsOfServicePage />);

    const homeLink = screen.getByRole('link', { name: /back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render the logo', () => {
    render(<TermsOfServicePage />);

    const logos = screen.getAllByAltText(/acadion logo/i);
    expect(logos.length).toBeGreaterThan(0);
  });

  it('should show the last updated date', () => {
    render(<TermsOfServicePage />);

    const lastUpdatedElements = screen.getAllByText(/last updated/i);
    expect(lastUpdatedElements.length).toBeGreaterThan(0);
  });

  it('should render the footer', () => {
    render(<TermsOfServicePage />);

    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  it('should contain agreement section', () => {
    render(<TermsOfServicePage />);

    const agreementElements = screen.getAllByText(/agreement to terms/i);
    expect(agreementElements.length).toBeGreaterThan(0);
  });
});

describe('Cookie Policy Page', () => {
  it('should render the Cookie Policy page', () => {
    render(<CookiePolicyPage />);

    expect(screen.getByRole('heading', { name: /cookie policy/i })).toBeInTheDocument();
  });

  it('should have a link back to home', () => {
    render(<CookiePolicyPage />);

    const homeLink = screen.getByRole('link', { name: /back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render the logo', () => {
    render(<CookiePolicyPage />);

    const logos = screen.getAllByAltText(/acadion logo/i);
    expect(logos.length).toBeGreaterThan(0);
  });

  it('should show the last updated date', () => {
    render(<CookiePolicyPage />);

    // There may be multiple "last updated" texts
    const lastUpdatedElements = screen.getAllByText(/last updated/i);
    expect(lastUpdatedElements.length).toBeGreaterThan(0);
  });

  it('should render the footer', () => {
    render(<CookiePolicyPage />);

    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  it('should contain introduction section', () => {
    render(<CookiePolicyPage />);

    const introElements = screen.getAllByText(/introduction/i);
    expect(introElements.length).toBeGreaterThan(0);
  });
});

describe('GDPR Page', () => {
  it('should render the GDPR page', () => {
    render(<GDPRPage />);

    expect(screen.getByRole('heading', { name: /gdpr compliance/i })).toBeInTheDocument();
  });

  it('should have a link back to home', () => {
    render(<GDPRPage />);

    const homeLink = screen.getByRole('link', { name: /back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render the logo', () => {
    render(<GDPRPage />);

    const logos = screen.getAllByAltText(/acadion logo/i);
    expect(logos.length).toBeGreaterThan(0);
  });

  it('should render the footer', () => {
    render(<GDPRPage />);

    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  it('should display GDPR description', () => {
    render(<GDPRPage />);

    // Use getAllByText and check there's at least one match
    const gdprTexts = screen.getAllByText(/general data protection regulation/i);
    expect(gdprTexts.length).toBeGreaterThan(0);
  });
});
