'use client';

import { useRouter, useParams } from 'next/navigation';
import {
  useStudentPlanDetail,
  type StudentPlanCourse,
} from '../../../../lib/hooks/use-learning-plans';
import { useUser } from '../../../../lib/hooks/use-auth';
import NotificationBell from '../../../components/NotificationBell';

function CourseRow({ course, isCorrelative }: { course: StudentPlanCourse; isCorrelative: boolean }) {
  const router = useRouter();

  const canNavigate = !course.locked && course.courseStatus === 'completed';

  const handleClick = () => {
    if (course.locked) return;
    router.push(`/lms/${course.courseKey}`);
  };

  let statusLabel = 'Not Started';
  let statusStyle = 'bg-gray-100 text-gray-600';

  if (course.isCompleted) {
    statusLabel = 'Completed';
    statusStyle = 'bg-green-100 text-green-700';
  } else if (course.startedAt) {
    statusLabel = 'In Progress';
    statusStyle = 'bg-blue-100 text-blue-700';
  } else if (course.enrolled) {
    statusLabel = 'Enrolled';
    statusStyle = 'bg-purple-100 text-purple-700';
  }

  if (course.locked) {
    statusLabel = 'Locked';
    statusStyle = 'bg-gray-100 text-gray-400';
  }

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl transition-all ${
        course.locked
          ? 'opacity-60 cursor-not-allowed'
          : 'hover:border-[#9F80DA]/40 hover:shadow-md cursor-pointer'
      }`}
    >
      {/* Order number / Lock icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center">
        {course.locked ? (
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        ) : course.isCompleted ? (
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9F80DA]/20 to-[#8A6BC5]/20 flex items-center justify-center">
            <span className="text-sm font-bold text-[#9F80DA]">{course.order + 1}</span>
          </div>
        )}
      </div>

      {/* Course info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#1a1a1a] truncate">
          {course.courseTitle || 'Untitled Course'}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle}`}>
            {statusLabel}
          </span>
          {course.required && !course.locked && (
            <span className="text-xs text-orange-600 font-medium">Required</span>
          )}
          {course.score !== null && (
            <span className="text-xs text-gray-500">
              Score: {Math.round(course.score)}%
              {course.passed !== null && (
                <span className={course.passed ? ' text-green-600' : ' text-red-500'}>
                  {course.passed ? ' Passed' : ' Failed'}
                </span>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Arrow */}
      {!course.locked && (
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </div>
  );
}

export default function StudentPlanDetailPage() {
  const router = useRouter();
  const params = useParams();
  const planId = parseInt(params.planId as string);

  const { data: plan, isLoading } = useStudentPlanDetail(planId);
  const { user } = useUser();

  const completedCount = plan?.courses.filter((c) => c.isCompleted).length ?? 0;
  const totalCount = plan?.courses.length ?? 0;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1a1a] font-[var(--font-onest)]">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/lms')}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            aria-label="Back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <img
            src="/landing/acadion2.png"
            alt="Acadion"
            className="h-8 object-contain cursor-pointer"
            style={{ width: 'auto' }}
            onClick={() => router.push('/lms')}
          />
          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">Student</span>
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9F80DA] to-[#8A6BC5] flex items-center justify-center text-white text-sm font-bold">
            {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !plan ? (
          <div className="text-center py-20 text-gray-500">Learning plan not found.</div>
        ) : (
          <>
            {/* Plan header */}
            <div className="mb-8">
              {plan.image ? (
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              ) : (
                <div className="w-full h-40 rounded-xl bg-gradient-to-br from-[#9F80DA]/10 to-[#8A6BC5]/10 flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-[#9F80DA]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              )}

              <h1 className="text-2xl font-bold text-[#1a1a1a]">{plan.name}</h1>
              {plan.description && (
                <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
              )}

              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span>{totalCount} course{totalCount !== 1 ? 's' : ''}</span>
                {plan.estimatedDays && (
                  <span>{plan.estimatedDays} day{plan.estimatedDays !== 1 ? 's' : ''} est.</span>
                )}
                {plan.isCorrelative && (
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full font-medium">
                    Sequential
                  </span>
                )}
                {plan.enrollment?.deadline && (
                  <span className="text-orange-500">
                    Due {new Date(plan.enrollment.deadline).toLocaleDateString()}
                  </span>
                )}
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>{completedCount}/{totalCount} completed</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      progress === 100
                        ? 'bg-green-500'
                        : 'bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5]'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Completed badge */}
              {plan.enrollment?.completedAt && plan.badgeName && (
                <div className="mt-4 flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                  {plan.badgeImage ? (
                    <img src={plan.badgeImage} alt={plan.badgeName} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-sm">B</div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Plan Completed!</p>
                    <p className="text-xs text-yellow-600">Badge earned: {plan.badgeName}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Courses list */}
            <section>
              <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Courses</h2>
              <div className="space-y-3">
                {plan.courses.map((course) => (
                  <CourseRow
                    key={course.courseId}
                    course={course}
                    isCorrelative={plan.isCorrelative}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
