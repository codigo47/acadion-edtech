'use client';

import { useTrackPortfolioVisit } from '../../../../lib/hooks/use-portfolio';

interface Course {
  id: number;
  key: string;
  title: string | null;
  status: string;
  order: number;
}

export default function PortfolioCourseCard({
  course,
  username,
}: {
  course: Course;
  username: string;
}) {
  const trackVisit = useTrackPortfolioVisit();

  const handleClick = () => {
    trackVisit.mutate({ username, courseId: course.id });
    window.location.href = `/p/${username}/${course.key}`;
  };

  return (
    <button
      onClick={handleClick}
      className="group cursor-pointer text-left w-full"
    >
      <div
        className="flex items-center gap-3 p-3 rounded-lg transition-all group-hover:brightness-[0.97]"
        style={{
          backgroundColor:
            'color-mix(in srgb, var(--portfolio-primary) 5%, var(--portfolio-bg))',
          border:
            '1px solid color-mix(in srgb, var(--portfolio-gray) 15%, transparent)',
        }}
      >
        {/* Course icon */}
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor:
              'color-mix(in srgb, var(--portfolio-primary) 12%, var(--portfolio-bg))',
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: 'var(--portfolio-primary)' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>

        {/* Title */}
        <p
          className="text-sm font-medium flex-1 min-w-0 truncate"
          style={{ color: 'var(--portfolio-text)' }}
        >
          {course.title || 'Untitled Course'}
        </p>

        {/* Arrow */}
        <svg
          className="w-4 h-4 flex-shrink-0 opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: 'var(--portfolio-gray)' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
