import { notFound } from 'next/navigation';
import PortfolioThemeProvider from './components/PortfolioThemeProvider';
import PortfolioContactForm from './components/PortfolioContactForm';
import PortfolioVisitTracker from './components/PortfolioVisitTracker';
import PortfolioCourseCard from './components/PortfolioCourseCard';

interface PageProps {
  params: Promise<{ username: string }>;
}

interface SocialCustomLink {
  label: string;
  url: string;
}

interface MediaItem {
  id: number;
  url: string;
  description: string | null;
  order: number;
}

interface Portfolio {
  title: string | null;
  tagline: string | null;
  bio: string | null;
  portraitImage: string | null;
  coverImage: string | null;
  email: string | null;
  phone: string | null;
  theme: string;
  skills: string[];
  languages: string[];
  socialLinkedin: string | null;
  socialTwitter: string | null;
  socialInstagram: string | null;
  socialCustom: SocialCustomLink[];
  courses: Array<{
    id: number;
    key: string;
    title: string | null;
    status: string;
    order: number;
  }>;
  images: MediaItem[];
  videos: MediaItem[];
}

interface PortfolioData {
  user: {
    id: string;
    name: string | null;
    image: string | null;
    username: string | null;
  };
  portfolio: Portfolio | null;
}

async function getPortfolioData(username: string): Promise<PortfolioData | null> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';
  try {
    const res = await fetch(`${apiUrl}/v1/portfolio/${username}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Card wrapper                                                       */
/* ------------------------------------------------------------------ */
function Card({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`rounded-xl p-5 sm:p-6 ${className}`}
      style={{
        backgroundColor: 'var(--portfolio-bg)',
        boxShadow:
          '0 1px 3px color-mix(in srgb, var(--portfolio-text) 8%, transparent), 0 0 0 1px color-mix(in srgb, var(--portfolio-gray) 12%, transparent)',
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-base font-semibold mb-4 pb-3"
      style={{
        color: 'var(--portfolio-text)',
        borderBottom:
          '1px solid color-mix(in srgb, var(--portfolio-gray) 20%, transparent)',
      }}
    >
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default async function PortfolioPage({ params }: PageProps) {
  const { username } = await params;
  const data = await getPortfolioData(username);

  if (!data) {
    notFound();
  }

  const { user, portfolio } = data;

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Portfolio not published</h1>
          <p className="text-gray-500 text-sm">This portfolio has not been published yet.</p>
        </div>
      </div>
    );
  }

  const skills = portfolio.skills || [];
  const languages = portfolio.languages || [];
  const socialCustom = portfolio.socialCustom || [];
  const courses = portfolio.courses || [];
  const images = portfolio.images || [];
  const videos = portfolio.videos || [];
  const hasSocials =
    portfolio.socialLinkedin ||
    portfolio.socialTwitter ||
    portfolio.socialInstagram ||
    socialCustom.length > 0;
  const hasContact = portfolio.email || portfolio.phone;
  const hasSidebar =
    hasContact || hasSocials || skills.length > 0 || languages.length > 0;

  return (
    <PortfolioThemeProvider themeKey={portfolio.theme}>
      <div
        className="min-h-screen"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--portfolio-gray) 8%, var(--portfolio-bg))',
        }}
      >
        <PortfolioVisitTracker username={username} />

        {/* ====== COVER BANNER ====== */}
        <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[340px]">
          <div
            className="absolute inset-0"
            style={{
              background: portfolio.coverImage
                ? `url(${portfolio.coverImage}) center/cover no-repeat`
                : 'linear-gradient(135deg, var(--portfolio-primary), var(--portfolio-secondary))',
            }}
          />
          {/* Gradient overlay for text contrast */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, color-mix(in srgb, var(--portfolio-primary) 60%, black) 0%, transparent 60%)',
              opacity: 0.5,
            }}
          />
        </div>

        {/* ====== PROFILE HEADER CARD ====== */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div
            className="relative -mt-16 sm:-mt-20 rounded-xl p-5 sm:p-6 mb-4"
            style={{
              backgroundColor: 'var(--portfolio-bg)',
              boxShadow:
                '0 2px 8px color-mix(in srgb, var(--portfolio-text) 10%, transparent), 0 0 0 1px color-mix(in srgb, var(--portfolio-gray) 12%, transparent)',
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0 -mt-20 sm:-mt-24">
                <div
                  className="w-[120px] h-[120px] sm:w-[148px] sm:h-[148px] rounded-full overflow-hidden shadow-lg"
                  style={{
                    boxShadow:
                      '0 0 0 4px var(--portfolio-bg), 0 4px 12px color-mix(in srgb, var(--portfolio-text) 20%, transparent)',
                  }}
                >
                  {portfolio.portraitImage || user.image ? (
                    <img
                      src={portfolio.portraitImage || user.image!}
                      alt={user.name || username}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white text-5xl font-bold"
                      style={{ backgroundColor: 'var(--portfolio-primary)' }}
                    >
                      {(user.name || username).charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Name + tagline + meta */}
              <div className="flex-1 min-w-0 pb-1">
                <h1
                  className="text-2xl sm:text-[28px] font-bold leading-tight truncate"
                  style={{ color: 'var(--portfolio-text)' }}
                >
                  {portfolio.title || `${user.name || username}'s Portfolio`}
                </h1>

                {portfolio.tagline && (
                  <p
                    className="text-sm sm:text-base mt-1 line-clamp-2"
                    style={{ color: 'var(--portfolio-gray)' }}
                  >
                    {portfolio.tagline}
                  </p>
                )}

                {/* Quick meta row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                  {portfolio.email && (
                    <span
                      className="flex items-center gap-1.5 text-xs"
                      style={{ color: 'var(--portfolio-gray)' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {portfolio.email}
                    </span>
                  )}
                  {portfolio.phone && (
                    <span
                      className="flex items-center gap-1.5 text-xs"
                      style={{ color: 'var(--portfolio-gray)' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {portfolio.phone}
                    </span>
                  )}
                  {courses.length > 0 && (
                    <span
                      className="flex items-center gap-1.5 text-xs"
                      style={{ color: 'var(--portfolio-gray)' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {courses.length} {courses.length === 1 ? 'course' : 'courses'}
                    </span>
                  )}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="flex-shrink-0 sm:self-center">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
                  style={{ backgroundColor: 'var(--portfolio-primary)' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* ====== TWO-COLUMN BODY ====== */}
          <div className="flex flex-col lg:flex-row gap-4 pb-12">
            {/* ---- LEFT SIDEBAR ---- */}
            {hasSidebar && (
              <aside className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-4">
                {/* Contact Info Card */}
                {hasContact && (
                  <Card>
                    <SectionTitle>Contact Info</SectionTitle>
                    <div className="space-y-3">
                      {portfolio.email && (
                        <a
                          href={`mailto:${portfolio.email}`}
                          className="flex items-center gap-3 group"
                        >
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor:
                                'color-mix(in srgb, var(--portfolio-primary) 10%, var(--portfolio-bg))',
                            }}
                          >
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--portfolio-primary)' }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'var(--portfolio-gray)' }}>
                              Email
                            </p>
                            <p className="text-sm truncate group-hover:underline" style={{ color: 'var(--portfolio-primary)' }}>
                              {portfolio.email}
                            </p>
                          </div>
                        </a>
                      )}
                      {portfolio.phone && (
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor:
                                'color-mix(in srgb, var(--portfolio-secondary) 10%, var(--portfolio-bg))',
                            }}
                          >
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--portfolio-secondary)' }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'var(--portfolio-gray)' }}>
                              Phone
                            </p>
                            <p className="text-sm" style={{ color: 'var(--portfolio-text)' }}>
                              {portfolio.phone}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                )}

                {/* Social Links Card */}
                {hasSocials && (
                  <Card>
                    <SectionTitle>Social</SectionTitle>
                    <div className="flex flex-wrap gap-2">
                      {portfolio.socialLinkedin && (
                        <a
                          href={portfolio.socialLinkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:brightness-95"
                          style={{
                            backgroundColor: '#0A66C20F',
                            color: '#0A66C2',
                          }}
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          LinkedIn
                        </a>
                      )}
                      {portfolio.socialTwitter && (
                        <a
                          href={portfolio.socialTwitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:brightness-95"
                          style={{
                            backgroundColor: '#1D9BF00F',
                            color: '#1D9BF0',
                          }}
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          X
                        </a>
                      )}
                      {portfolio.socialInstagram && (
                        <a
                          href={portfolio.socialInstagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:brightness-95"
                          style={{
                            backgroundColor: '#E44D8E0F',
                            color: '#E44D8E',
                          }}
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                          Instagram
                        </a>
                      )}
                      {socialCustom.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:brightness-95"
                          style={{
                            backgroundColor:
                              'color-mix(in srgb, var(--portfolio-accent) 8%, var(--portfolio-bg))',
                            color: 'var(--portfolio-accent)',
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Skills Card */}
                {skills.length > 0 && (
                  <Card>
                    <SectionTitle>Skills</SectionTitle>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                          style={{
                            backgroundColor:
                              'color-mix(in srgb, var(--portfolio-primary) 10%, var(--portfolio-bg))',
                            color: 'var(--portfolio-primary)',
                          }}
                        >
                          <svg className="w-3 h-3 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Languages Card */}
                {languages.length > 0 && (
                  <Card>
                    <SectionTitle>Languages</SectionTitle>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang) => (
                        <span
                          key={lang}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor:
                              'color-mix(in srgb, var(--portfolio-secondary) 10%, var(--portfolio-bg))',
                            color: 'var(--portfolio-secondary)',
                          }}
                        >
                          <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                          </svg>
                          {lang}
                        </span>
                      ))}
                    </div>
                  </Card>
                )}
              </aside>
            )}

            {/* ---- MAIN CONTENT ---- */}
            <main className="flex-1 min-w-0 flex flex-col gap-4">
              {/* About Card */}
              {portfolio.bio && (
                <Card>
                  <SectionTitle>About</SectionTitle>
                  <p
                    className="text-sm leading-relaxed whitespace-pre-wrap"
                    style={{ color: 'var(--portfolio-text)' }}
                  >
                    {portfolio.bio}
                  </p>
                </Card>
              )}

              {/* Courses Card - Featured style */}
              {courses.length > 0 && (
                <Card>
                  <SectionTitle>Courses</SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {courses.map((course) => (
                      <PortfolioCourseCard
                        key={course.id}
                        course={course}
                        username={username}
                      />
                    ))}
                  </div>
                </Card>
              )}

              {/* Image Gallery Card */}
              {images.length > 0 && (
                <Card>
                  <SectionTitle>Gallery</SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {images.map((img) => (
                      <div key={img.id} className="group">
                        <div className="rounded-lg overflow-hidden aspect-video">
                          <img
                            src={img.url}
                            alt={img.description || ''}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {img.description && (
                          <p
                            className="text-xs mt-1.5"
                            style={{ color: 'var(--portfolio-gray)' }}
                          >
                            {img.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Video Gallery Card */}
              {videos.length > 0 && (
                <Card>
                  <SectionTitle>Videos</SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {videos.map((vid) => (
                      <div key={vid.id}>
                        <div className="rounded-lg overflow-hidden aspect-video bg-black">
                          <iframe
                            src={vid.url}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        {vid.description && (
                          <p
                            className="text-xs mt-1.5"
                            style={{ color: 'var(--portfolio-gray)' }}
                          >
                            {vid.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Contact Form Card */}
              <Card id="contact">
                <SectionTitle>Get in Touch</SectionTitle>
                <p
                  className="text-sm mb-4 -mt-2"
                  style={{ color: 'var(--portfolio-gray)' }}
                >
                  Interested in collaborating? Send a message and I&apos;ll get back to you.
                </p>
                <PortfolioContactForm username={username} />
              </Card>
            </main>
          </div>
        </div>

        {/* ====== FOOTER ====== */}
        <div
          className="text-center py-8 text-xs"
          style={{
            color: 'var(--portfolio-gray)',
            borderTop:
              '1px solid color-mix(in srgb, var(--portfolio-gray) 15%, transparent)',
          }}
        >
          Powered by acadion.ai
        </div>
      </div>
    </PortfolioThemeProvider>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { username } = await params;
  const data = await getPortfolioData(username);

  if (!data || !data.portfolio) {
    return { title: 'Portfolio not found' };
  }

  return {
    title:
      data.portfolio.title ||
      `${data.user.name || username}'s Portfolio | acadion.ai`,
    description:
      data.portfolio.bio ||
      `View ${data.user.name || username}'s course portfolio on acadion.ai`,
  };
}
