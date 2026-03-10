'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, type PaginatedResponse } from '../api-client';

export interface Badge {
  id: number;
  key: string;
  name: string;
  description: string | null;
  image: string | null;
  type: string;
  conditionType: string;
  conditionValue: Record<string, any> | null;
  targetId: number | null;
  orgId: number | null;
  isPublic: boolean;
  isActive: boolean;
  createdAt: string;
  org?: { name: string; key: string };
  _count?: { userBadges: number };
}

export interface BadgeDetail extends Badge {
  userBadges: {
    id: number;
    userId: string;
    earnedAt: string;
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
    };
  }[];
}

export interface UserBadge {
  id: number;
  userId: string;
  badgeId: number;
  earnedAt: string;
  badge: Badge;
}

export function useMyBadges(page?: number, limit?: number) {
  const isPaginated = page != null && limit != null;
  return useQuery({
    queryKey: isPaginated ? ['badges', 'me', page, limit] : ['badges', 'me'],
    queryFn: () =>
      isPaginated
        ? api.get<PaginatedResponse<UserBadge>>(`/v1/badges/me?page=${page}&limit=${limit}`)
        : api.get<PaginatedResponse<UserBadge>>('/v1/badges/me'),
  });
}

export function useAllBadges(page?: number, limit?: number) {
  const isPaginated = page != null && limit != null;
  return useQuery({
    queryKey: isPaginated ? ['badges', 'my', page, limit] : ['badges', 'my'],
    queryFn: () =>
      isPaginated
        ? api.get<PaginatedResponse<Badge>>(`/v1/badges/my?page=${page}&limit=${limit}`)
        : api.get<PaginatedResponse<Badge>>('/v1/badges/my'),
  });
}

export function useBadgeDetail(id: number | null) {
  return useQuery({
    queryKey: ['badges', 'detail', id],
    queryFn: () => api.get<BadgeDetail>(`/v1/badges/${id}`),
    enabled: !!id,
  });
}

export function useOrgBadges(orgKey: string) {
  return useQuery({
    queryKey: ['badges', 'org', orgKey],
    queryFn: () => api.get<Badge[]>(`/v1/badges/org/${orgKey}`),
    enabled: !!orgKey,
  });
}

export function useCreateBadge(orgKey: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      description?: string;
      image?: string;
      type: string;
      conditionType: string;
      conditionValue?: Record<string, any>;
      targetId?: number;
      isPublic?: boolean;
    }) => api.post<Badge>(`/v1/badges/org/${orgKey}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] });
    },
  });
}

export function useUpdateBadge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Omit<Badge, 'id' | 'key' | 'createdAt' | '_count' | 'org'>>) =>
      api.patch<Badge>(`/v1/badges/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] });
    },
  });
}

export function useDeleteBadge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/v1/badges/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] });
    },
  });
}

export function useDuplicateBadge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.post<Badge>(`/v1/badges/${id}/duplicate`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] });
    },
  });
}

export function useAwardBadge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ badgeId, userId }: { badgeId: number; userId: string }) =>
      api.post(`/v1/badges/${badgeId}/award`, { userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] });
    },
  });
}
