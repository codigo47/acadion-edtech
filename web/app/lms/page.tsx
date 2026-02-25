'use client';

import { useRouter } from 'next/navigation';
import { useLmsDashboard, type LmsCourse, type LmsLearningPlan } from '../../lib/hooks/use-lms';
import { useUser } from '../../lib/hooks/use-auth';

function CourseCard({ course }: { course: LmsCourse }) {
  const router = useRouter();

  const stateConfig = {
    in_progress: { label: 'In Progress', bg: 'bg-blue-100', text: 'text-blue-700' },
    not_started: { label: 'Not Started', bg: 'bg-gray-100', text: 'text-gray-600' },
    completed: { label: 'Completed', bg: 'bg-green-100', text: 'text-green-700' },
  };
  const state = stateConfig[course.state];

  return (
    <div
      onClick={() => router.push(`/lms/${course.courseKey}`)}
      className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#9F80DA]/40 hover:shadow-md transition-all cursor-pointer"
    >
      {/* Course Icon */}
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9F80DA]/20 to-[#8A6BC5]/20 flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>

      <h3 className="font-semibold text-[#1a1a1a] mb-1 line-clamp-2">
        {course.courseTitle || 'Untitled Course'}
      </h3>

      <div className="flex items-center justify-between mt-3">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${state.bg} ${state.text}`}>
          {state.label}
        </span>
        {course.totalUnits > 0 && (
          <span className="text-xs text-gray-500">{course.completedUnits}/{course.totalUnits} units</span>
        )}
      </div>

      {/* Progress bar */}
      {course.state !== 'not_started' && course.totalUnits > 0 && (
        <div className="mt-3">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] rounded-full transition-all"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">{course.progress}% complete</p>
        </div>
      )}

      {course.state === 'completed' && course.score !== null && (
        <p className="text-xs text-gray-500 mt-2">
          Score: <span className="font-semibold text-[#1a1a1a]">{Math.round(course.score)}%</span>
          {' · '}
          <span className={course.passed ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
            {course.passed ? 'Passed' : 'Failed'}
          </span>
        </p>
      )}
    </div>
  );
}

function LearningPlanCard({ plan }: { plan: LmsLearningPlan }) {
  const router = useRouter();
  const progress = plan.totalCourses > 0
    ? Math.round((plan.completedCourses / plan.totalCourses) * 100)
    : 0;

  const isCompleted = !!plan.completedAt;

  return (
    <div
      onClick={() => router.push(`/lms/plans/${plan.id}`)}
      className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#9F80DA]/40 hover:shadow-sm transition-all cursor-pointer"
    >
      {plan.image ? (
        <img src={plan.image} alt={plan.name} className="w-full h-24 object-cover rounded-lg mb-4" />
      ) : (
        <div className="w-full h-24 rounded-lg bg-gradient-to-br from-[#9F80DA]/10 to-[#8A6BC5]/10 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[#9F80DA]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
      )}

      <h3 className="font-semibold text-[#1a1a1a] mb-1">{plan.name}</h3>
      {plan.description && (
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{plan.description}</p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span>{plan.totalCourses} course{plan.totalCourses !== 1 ? 's' : ''}</span>
        {plan.estimatedDays && <span>{plan.estimatedDays} day{plan.estimatedDays !== 1 ? 's' : ''} est.</span>}
        {plan.deadline && (
          <span className="text-orange-500">
            Due {new Date(plan.deadline).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1">
        <div
          className={`h-full rounded-full transition-all ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5]'}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-400">{plan.completedCourses}/{plan.totalCourses} completed</p>

      {isCompleted && plan.badgeName && (
        <div className="mt-3 flex items-center gap-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
          {plan.badgeImage ? (
            <img src={plan.badgeImage} alt={plan.badgeName} className="w-6 h-6 rounded-full" />
          ) : (
            <span className="text-lg">🏅</span>
          )}
          <span className="text-xs font-medium text-yellow-700">{plan.badgeName}</span>
        </div>
      )}
    </div>
  );
}

export default function LearnPage() {
  const router = useRouter();
  const { user } = useUser();
  const { data, isLoading } = useLmsDashboard();

  const inProgress = data?.enrolledCourses.filter((c) => c.state === 'in_progress') ?? [];
  const notStarted = data?.enrolledCourses.filter((c) => c.state === 'not_started') ?? [];
  const completed = data?.enrolledCourses.filter((c) => c.state === 'completed') ?? [];

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Continue your learning journey.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Learning Plans */}
            {data?.learningPlans && data.learningPlans.length > 0 && (
              <section className="mb-10">
                <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">My Learning Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.learningPlans.map((plan) => (
                    <LearningPlanCard key={plan.id} plan={plan} />
                  ))}
                </div>
              </section>
            )}

            {/* In Progress */}
            {inProgress.length > 0 && (
              <section className="mb-10">
                <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">
                  Continue Learning
                  <span className="ml-2 text-xs text-gray-400 font-normal">{inProgress.length} course{inProgress.length !== 1 ? 's' : ''}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {inProgress.map((c) => <CourseCard key={c.courseKey} course={c} />)}
                </div>
              </section>
            )}

            {/* Not Started */}
            {notStarted.length > 0 && (
              <section className="mb-10">
                <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">
                  Available Courses
                  <span className="ml-2 text-xs text-gray-400 font-normal">{notStarted.length} course{notStarted.length !== 1 ? 's' : ''}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {notStarted.map((c) => <CourseCard key={c.courseKey} course={c} />)}
                </div>
              </section>
            )}

            {/* Completed */}
            {completed.length > 0 && (
              <section className="mb-10">
                <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">
                  Completed
                  <span className="ml-2 text-xs text-gray-400 font-normal">{completed.length} course{completed.length !== 1 ? 's' : ''}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completed.map((c) => <CourseCard key={c.courseKey} course={c} />)}
                </div>
              </section>
            )}

            {/* Empty state */}
            {(!data?.enrolledCourses || data.enrolledCourses.length === 0) &&
              (!data?.learningPlans || data.learningPlans.length === 0) && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-1">No courses assigned yet.</p>
                <p className="text-gray-400 text-sm">Your instructor will enroll you in courses.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
