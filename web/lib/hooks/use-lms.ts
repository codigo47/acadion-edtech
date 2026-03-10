'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

export interface LmsCourse {
  enrollmentId: number;
  courseKey: string;
  courseTitle: string | null;
  enrolledAt: string;
  startedAt: string | null;
  completedAt: string | null;
  passed: boolean | null;
  score: number | null;
  attempts: number;
  state: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  totalUnits: number;
  completedUnits: number;
  isAdaptive?: boolean;
}

export interface LmsLearningPlan {
  id: number;
  key?: string;
  name: string;
  description: string | null;
  image: string | null;
  estimatedDays: number | null;
  isCorrelative: boolean;
  enrolledAt: string;
  deadline: string | null;
  completedAt: string | null;
  totalCourses: number;
  completedCourses: number;
  badgeName: string | null;
  badgeImage: string | null;
}

export interface LmsDashboard {
  enrolledCourses: LmsCourse[];
  learningPlans: LmsLearningPlan[];
}

export interface ProposedUnit {
  code: string;
  title: string;
  bloomObjectives?: string;
}

export interface ProposedModule {
  number: number;
  title: string;
  units: ProposedUnit[];
}

export interface ProposedIndex {
  title: string;
  modules: ProposedModule[];
}

export interface UnitProgressRecord {
  id: number;
  enrollmentId: number;
  unitCode: string;
  completedAt: string | null;
  timeSpentSeconds: number;
  focusLossCount?: number;
}

export interface AdaptivePathItem {
  unitCode: string;
  mode: 'skip' | 'check_only' | 'full' | 'extended' | 'deep';
}

export interface LmsCourseContent {
  courseKey: string;
  courseTitle: string | null;
  isAdaptive: boolean;
  proposedIndex: ProposedIndex | null;
  componentsByUnit: Record<string, Array<{ component: string; content: unknown }>>;
  enrollment: {
    id: number;
    enrolledAt: string;
    startedAt: string | null;
    completedAt: string | null;
    passed: boolean | null;
    score: number | null;
    attempts: number;
  };
  unitProgress: UnitProgressRecord[];
  adaptivePath: AdaptivePathItem[] | null;
  lockedUnits: string[];
}

export function useLmsDashboard() {
  return useQuery({
    queryKey: ['lms-dashboard'],
    queryFn: () => api.get<LmsDashboard>('/v1/lms/dashboard'),
  });
}

export function useLmsCourseContent(courseKey: string | null) {
  return useQuery({
    queryKey: ['lms-course', courseKey],
    queryFn: () => api.get<LmsCourseContent>(`/v1/lms/courses/${courseKey}`),
    enabled: !!courseKey,
  });
}

export function useLmsSelfEnroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseKey: string) =>
      api.post(`/v1/lms/courses/${courseKey}/enroll`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lms-dashboard'] });
    },
  });
}

export function useLmsUpdateProgress(courseKey: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      unitCode: string;
      timeSpentSeconds: number;
      completed?: boolean;
      focusLossCount?: number;
    }) => api.patch<{ progress: number; completedUnits: number; totalUnits: number }>(
      `/v1/lms/courses/${courseKey}/progress`,
      data,
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lms-course', courseKey] });
      queryClient.invalidateQueries({ queryKey: ['lms-dashboard'] });
    },
  });
}

export function useLmsCompleteCourse(courseKey: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { passed: boolean; score: number }) =>
      api.post(`/v1/lms/courses/${courseKey}/complete`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lms-course', courseKey] });
      queryClient.invalidateQueries({ queryKey: ['lms-dashboard'] });
    },
  });
}

export function useLmsSubmitKnowledgeCheck(courseKey: string) {
  return useMutation({
    mutationFn: (data: {
      unitCode: string;
      questionIndex: number;
      answer: unknown;
      isCorrect: boolean;
    }) => api.post<{ attemptNumber: number; isCorrect: boolean; remainingAttempts: number }>(
      `/v1/lms/courses/${courseKey}/knowledge-check`,
      data,
    ),
  });
}

export function useLmsAdminEnroll(courseKey: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { userId: string }) =>
      api.post(`/v1/lms/courses/${courseKey}/admin-enroll`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}

export function useLmsReEnroll(courseKey: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) =>
      api.post(`/v1/lms/courses/${courseKey}/re-enroll/${userId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}
