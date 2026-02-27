'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

export type OrgRole =
  | 'super_admin'
  | 'org_admin'
  | 'editor'
  | 'viewer'
  | 'commenter'
  | 'student';

export interface OrgMember {
  id: string;
  userId: string;
  role: OrgRole;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

export interface Organization {
  id: string;
  name: string;
  key: string;
  memberCount: number;
  myRole: OrgRole;
}

export interface OrganizationDetail {
  id: string;
  name: string;
  key: string;
  members: OrgMember[];
}

export function useOrganizations() {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: () => api.get<Organization[]>('/organizations'),
  });
}

export function useOrganization(key: string) {
  return useQuery({
    queryKey: ['organizations', key],
    queryFn: () => api.get<OrganizationDetail>(`/organizations/${key}`),
    enabled: !!key,
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string }) =>
      api.post<Organization>('/organizations', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
}

export function useInviteMember(key: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { email: string; role: OrgRole }) =>
      api.post<OrgMember>(`/organizations/${key}/members`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations', key] });
    },
  });
}

export function useUpdateMemberRole(key: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { userId: string; role: OrgRole }) =>
      api.patch(`/organizations/${key}/members/${data.userId}/role`, {
        role: data.role,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations', key] });
    },
  });
}

export function useRemoveMember(key: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) =>
      api.delete(`/organizations/${key}/members/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations', key] });
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
}

export interface BulkMemberResult {
  email: string;
  status: 'created' | 'updated' | 'failed';
  message?: string;
}

export function useBulkInviteMembers(key: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { members: { email: string; name?: string; role: string }[] }) =>
      api.post<BulkMemberResult[]>(`/organizations/${key}/members/bulk`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations', key] });
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
}
