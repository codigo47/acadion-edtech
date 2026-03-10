'use client';

import { useParams } from 'next/navigation';
import CoursePlayer from '../../components/CoursePlayer';

export default function CoursePlayerPage() {
  const params = useParams();
  const courseKey = params.courseKey as string;

  return (
    <CoursePlayer
      courseKey={courseKey}
      backUrl="/lms"
      backLabel="My Courses"
    />
  );
}
