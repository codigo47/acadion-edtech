'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

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
  createdAt: string;
  _count?: { userBadges: number };
}

export interface UserBadge {
  id: number;
  userId: string;
  badgeId: number;
  earnedAt: string;
  badge: Badge;
}

export function useMyBadges() {
  return useQuery({
    queryKey: ['badges', 'me'],
    queryFn: () => api.get<UserBadge[]>('/badges/me'),
  });
}

export function useOrgBadges(orgKey: string) {
  return useQuery({
    queryKey: ['badges', 'org', orgKey],
    queryFn: () => api.get<Badge[]>(`/badges/org/${orgKey}`),
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
    }) => api.post<Badge>(`/badges/org/${orgKey}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges', 'org', orgKey] });
    },
  });
}

export function useUpdateBadge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Omit<Badge, 'id' | 'key' | 'createdAt' | '_count'>>) =>
      api.patch<Badge>(`/badges/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] });
    },
  });
}

export function useDeleteBadge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/badges/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] });
    },
  });
}
