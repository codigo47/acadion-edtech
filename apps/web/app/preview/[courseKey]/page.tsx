'use client';

import { useParams, useSearchParams } from 'next/navigation';
import CoursePlayer from '../../components/CoursePlayer';

export default function CoursePreviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseKey = params.courseKey as string;
  const from = searchParams.get('from');

  const backUrl = from === 'dashboard' ? '/dashboard' : `/project/${courseKey}`;
  const backLabel = from === 'dashboard' ? 'Back to Dashboard' : 'Back to Editor';

  return (
    <CoursePlayer
      courseKey={courseKey}
      backUrl={backUrl}
      backLabel={backLabel}
    />
  );
}
