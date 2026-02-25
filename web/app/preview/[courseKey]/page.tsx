'use client';

import { useParams } from 'next/navigation';
import CoursePlayer from '../../components/CoursePlayer';

export default function CoursePreviewPage() {
  const params = useParams();
  const courseKey = params.courseKey as string;

  return (
    <CoursePlayer
      courseKey={courseKey}
      backUrl={`/project/${courseKey}`}
      backLabel="Back to Editor"
    />
  );
}
