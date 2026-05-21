'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '../api-client';

export interface CourseAnalytics {
  courseTitle: string | null;
  totalEnrollments: number;
  activeStudents: number;
  completedStudents: number;
  averageScore: number;
  passRate: number;
  averageTimeSpent: number;
  averageFocusLoss: number;
  unitBreakdown: Array<{
    unitCode: string;
    title: string;
    completionRate: number;
    averageTime: number;
    averageFocusLoss: number;
  }>;
  completionOverTime: Array<{
    week: string;
    count: number;
  }>;
}

export interface CourseUserProgress {
  user: { id: string; name: string | null; email: string };
  enrolledAt: string;
  startedAt: string | null;
  completedAt: string | null;
  progress: number;
  completedUnits: number;
  totalUnits: number;
  score: number | null;
  passed: boolean | null;
}

export interface OrgAnalytics {
  orgName: string;
  totalCourses: number;
  totalStudents: number;
  averageCompletion: number;
  topCourses: Array<{
    courseKey: string;
    title: string;
    enrollmentCount: number;
  }>;
  recentCompletions: Array<{
    courseTitle: string;
    courseKey: string;
    user: { id: string; name: string | null; email: string };
    completedAt: string;
    score: number | null;
    passed: boolean | null;
  }>;
}

export interface StudentAnalytics {
  totalEnrolled: number;
  totalCompleted: number;
  averageScore: number;
  totalTimeSpent: number;
  courseBreakdown: Array<{
    courseKey: string;
    courseTitle: string;
    progress: number;
    score: number | null;
    timeSpent: number;
    completedAt: string | null;
    passed: boolean | null;
  }>;
  recentActivity: Array<{
    unitCode: string;
    timeSpentSeconds: number;
    completedAt: string | null;
    courseTitle: string;
    courseKey: string;
  }>;
}

export function useCourseAnalytics(courseKey: string) {
  return useQuery({
    queryKey: ['analytics', 'course', courseKey],
    queryFn: () => api.get<CourseAnalytics>(`/v1/analytics/course/${courseKey}`),
    enabled: !!courseKey,
  });
}

export function useCourseUserProgress(courseKey: string) {
  return useQuery({
    queryKey: ['analytics', 'course', courseKey, 'users'],
    queryFn: () =>
      api.get<CourseUserProgress[]>(`/v1/analytics/course/${courseKey}/users`),
    enabled: !!courseKey,
  });
}

export function useOrgAnalytics(orgKey: string) {
  return useQuery({
    queryKey: ['analytics', 'org', orgKey],
    queryFn: () => api.get<OrgAnalytics>(`/v1/analytics/org/${orgKey}`),
    enabled: !!orgKey,
  });
}

export function useStudentAnalytics() {
  return useQuery({
    queryKey: ['analytics', 'me'],
    queryFn: () => api.get<StudentAnalytics>('/v1/analytics/me'),
  });
}
