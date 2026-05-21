'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, type PaginatedResponse } from '../api-client';

export interface LearningPlan {
  id: number;
  key: string;
  name: string;
  description: string | null;
  image: string | null;
  badgeImage: string | null;
  badgeName: string | null;
  estimatedDays: number | null;
  isCorrelative: boolean;
  isOptional: boolean;
  parentId: number | null;
  org?: { name: string; key: string };
  _count: {
    courses: number;
    enrollments: number;
  };
}

export interface PlanCourse {
  learningPlanId: number;
  courseId: number;
  order: number;
  required: boolean;
  course: {
    id: number;
    key: string;
    title: string | null;
    status: string;
  };
}

export interface PlanEnrollment {
  id: number;
  userId: string;
  enrolledAt: string;
  deadline: string | null;
  completedAt: string | null;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

export interface LearningPlanDetail {
  id: number;
  key: string;
  name: string;
  description: string | null;
  image: string | null;
  badgeImage: string | null;
  badgeName: string | null;
  estimatedDays: number | null;
  isCorrelative: boolean;
  isOptional: boolean;
  parentId: number | null;
  org?: { name: string; key: string };
  courses: PlanCourse[];
  children: LearningPlan[];
  enrollments: PlanEnrollment[];
  _count: { enrollments: number };
}

export interface StudentPlanCourse {
  courseId: number;
  courseKey: string;
  courseTitle: string | null;
  courseStatus: string;
  order: number;
  required: boolean;
  enrolled: boolean;
  startedAt: string | null;
  completedAt: string | null;
  passed: boolean | null;
  score: number | null;
  isCompleted: boolean;
  locked: boolean;
}

export interface StudentPlanDetail {
  id: number;
  key: string;
  name: string;
  description: string | null;
  image: string | null;
  badgeImage: string | null;
  badgeName: string | null;
  estimatedDays: number | null;
  isCorrelative: boolean;
  isOptional: boolean;
  enrollment: {
    enrolledAt: string;
    deadline: string | null;
    completedAt: string | null;
  } | null;
  courses: StudentPlanCourse[];
}

export function useMyLearningPlans(page?: number, limit?: number) {
  const isPaginated = page != null && limit != null;
  return useQuery({
    queryKey: isPaginated ? ['learning-plans', 'my', page, limit] : ['learning-plans', 'my'],
    queryFn: () =>
      isPaginated
        ? api.get<PaginatedResponse<LearningPlan>>(`/v1/learning-plans/my?page=${page}&limit=${limit}`)
        : api.get<PaginatedResponse<LearningPlan>>('/v1/learning-plans/my'),
  });
}

export function useOrgLearningPlans(orgKey: string) {
  return useQuery({
    queryKey: ['learning-plans', orgKey],
    queryFn: () => api.get<LearningPlan[]>(`/v1/learning-plans/org/${orgKey}`),
    enabled: !!orgKey,
  });
}

export function useLearningPlanDetail(planId: number | null) {
  return useQuery({
    queryKey: ['learning-plans', 'detail', planId],
    queryFn: () =>
      api.get<LearningPlanDetail>(`/v1/learning-plans/${planId}`),
    enabled: !!planId,
  });
}

export function useCreateLearningPlan(orgKey: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      description?: string;
      image?: string;
      badgeImage?: string;
      badgeName?: string;
      estimatedDays?: number;
      isCorrelative?: boolean;
      isOptional?: boolean;
      parentId?: number;
    }) => api.post<LearningPlan>(`/v1/learning-plans/org/${orgKey}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learning-plans'] });
    },
  });
}

export function useUpdateLearningPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      planId: number;
      name?: string;
      description?: string;
      image?: string;
      badgeImage?: string;
      badgeName?: string;
      estimatedDays?: number;
      isCorrelative?: boolean;
      isOptional?: boolean;
      parentId?: number;
    }) => {
      const { planId, ...body } = data;
      return api.patch<LearningPlan>(`/v1/learning-plans/${planId}`, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learning-plans'] });
    },
  });
}

export function useDeleteLearningPlan(orgKey?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (planId: number) =>
      api.delete(`/v1/learning-plans/${planId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learning-plans'] });
    },
  });
}

export function useAddPlanCourse(planId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { courseId: number; order?: number; required?: boolean }) =>
      api.post(`/v1/learning-plans/${planId}/courses`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['learning-plans', 'detail', planId],
      });
    },
  });
}

export function useRemovePlanCourse(planId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: number) =>
      api.delete(`/v1/learning-plans/${planId}/courses/${courseId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['learning-plans', 'detail', planId],
      });
    },
  });
}

export function useReorderPlanCourses(planId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courses: { courseId: number; order: number }[]) =>
      api.patch(`/v1/learning-plans/${planId}/courses/reorder`, { courses }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['learning-plans', 'detail', planId],
      });
    },
  });
}

export function useAssignPlan(planId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { userId: string; deadline?: string }) =>
      api.post(`/v1/learning-plans/${planId}/assign`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['learning-plans', 'detail', planId],
      });
    },
  });
}

export function useAssignPlanToGroup(planId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { groupId: number; deadline?: string }) =>
      api.post(`/v1/learning-plans/${planId}/assign-group`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['learning-plans', 'detail', planId],
      });
    },
  });
}

export function useStudentPlanDetail(planId: number | null) {
  return useQuery({
    queryKey: ['learning-plans', 'student', planId],
    queryFn: () =>
      api.get<StudentPlanDetail>(`/v1/learning-plans/${planId}/student`),
    enabled: !!planId,
  });
}

export interface BulkAssignResult {
  email: string;
  status: 'assigned' | 'failed';
  message?: string;
}

export function useBulkAssignPlan(planId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { users: { email: string }[]; deadline?: string }) =>
      api.post<BulkAssignResult[]>(`/v1/learning-plans/${planId}/assign-bulk`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['learning-plans', 'detail', planId],
      });
    },
  });
}
