'use client';

import { useParams } from 'next/navigation';
import CoursePlayer from '../../../components/CoursePlayer';

export default function PortfolioCoursePage() {
  const params = useParams();
  const username = params.username as string;
  const courseKey = params.courseKey as string;

  return (
    <CoursePlayer
      courseKey={courseKey}
      backUrl={`/p/${username}`}
      backLabel="Back to Portfolio"
    />
  );
}
