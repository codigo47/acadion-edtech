'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateCourse } from '../../lib/hooks/use-course';
import { getUserId } from '../../lib/auth';

export default function ProjectRedirect() {
  const router = useRouter();
  const createCourseMutation = useCreateCourse();

  useEffect(() => {
    const initCourse = async () => {
      const userId = getUserId();
      if (!userId) {
        console.error('User not authenticated');
        router.push('/login');
        return;
      }

      try {
        const result = await createCourseMutation.mutateAsync({ userId });
        router.replace(`/project/${result.courseKey}`);
      } catch (error) {
        console.error('Failed to create course:', error);
      }
    };

    initCourse();
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-[#9F80DA] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-[#9F80DA] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-[#9F80DA] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <span className="text-gray-500">Creating new project...</span>
      </div>
    </div>
  );
}
