'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

export interface Group {
  id: number;
  key: string;
  name: string;
  description: string | null;
  _count: {
    members: number;
  };
}

export interface GroupMember {
  userId: string;
  groupId: number;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

export interface GroupDetail {
  id: number;
  key: string;
  name: string;
  description: string | null;
  members: GroupMember[];
}

export function useOrgGroups(orgKey: string) {
  return useQuery({
    queryKey: ['groups', orgKey],
    queryFn: () => api.get<Group[]>(`/groups/org/${orgKey}`),
    enabled: !!orgKey,
  });
}

export function useGroupDetail(groupId: number | null) {
  return useQuery({
    queryKey: ['groups', 'detail', groupId],
    queryFn: () => api.get<GroupDetail>(`/groups/${groupId}`),
    enabled: !!groupId,
  });
}

export function useCreateGroup(orgKey: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; description?: string }) =>
      api.post<Group>(`/groups/org/${orgKey}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups', orgKey] });
    },
  });
}

export function useUpdateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      groupId: number;
      name?: string;
      description?: string;
    }) => {
      const { groupId, ...body } = data;
      return api.patch<Group>(`/groups/${groupId}`, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
}

export function useDeleteGroup(orgKey: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId: number) => api.delete(`/groups/${groupId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups', orgKey] });
    },
  });
}

export function useAddGroupMember(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { userId: string }) =>
      api.post(`/groups/${groupId}/members`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['groups', 'detail', groupId],
      });
    },
  });
}

export function useRemoveGroupMember(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) =>
      api.delete(`/groups/${groupId}/members/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['groups', 'detail', groupId],
      });
    },
  });
}
