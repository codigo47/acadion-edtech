'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api, API_URL } from '../api-client';
import {
  User,
  AuthResponse,
  saveAuth,
  clearAuth,
  getToken,
  getUser,
} from '../auth';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      api.post<AuthResponse>('/auth/login', credentials, { auth: false }),
    onSuccess: (data) => {
      saveAuth(data);
      queryClient.setQueryData(['user'], data.user);
      router.push('/dashboard');
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) =>
      api.post<AuthResponse>('/auth/register', credentials, { auth: false }),
    onSuccess: (data) => {
      saveAuth(data);
      queryClient.setQueryData(['user'], data.user);
      router.push('/dashboard');
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => api.post('/auth/logout'),
    onSettled: () => {
      clearAuth();
      queryClient.setQueryData(['user'], null);
      queryClient.clear();
      router.push('/login');
    },
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => api.get<User>('/auth/profile'),
    enabled: !!getToken(),
    initialData: getUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUser() {
  const { data: user, isLoading } = useProfile();
  const token = getToken();

  return {
    user,
    isLoading,
    isAuthenticated: !!token && !!user,
  };
}

export function getGoogleLoginUrl(): string {
  return `${API_URL}/v1/auth/google`;
}
