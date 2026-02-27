'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, type PaginatedResponse } from '../api-client';

export interface Notification {
  id: number;
  type: string;
  data: { message?: string; [key: string]: any };
  readAt: string | null;
  createdAt: string;
}

export interface UnreadCount {
  count: number;
}

export function useNotifications(page?: number, limit?: number) {
  const isPaginated = page != null && limit != null;
  return useQuery({
    queryKey: isPaginated ? ['notifications', page, limit] : ['notifications'],
    queryFn: () =>
      isPaginated
        ? api.get<PaginatedResponse<Notification>>(`/notifications?page=${page}&limit=${limit}`)
        : api.get<PaginatedResponse<Notification>>('/notifications'),
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: () => api.get<UnreadCount>('/notifications/unread-count'),
    refetchInterval: 30000,
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      api.patch(`/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.patch('/notifications/read-all'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}
