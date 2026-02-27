'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

interface PortfolioCourse {
  id: number;
  key: string;
  title: string | null;
  status: string;
  order: number;
}

interface PortfolioMediaItem {
  id?: number;
  url: string;
  description: string | null;
  order?: number;
}

interface SocialCustomLink {
  label: string;
  url: string;
}

interface PortfolioBase {
  title: string | null;
  tagline: string | null;
  bio: string | null;
  portraitImage: string | null;
  coverImage: string | null;
  email: string | null;
  phone: string | null;
  theme: string;
  skills: string[];
  languages: string[];
  socialLinkedin: string | null;
  socialTwitter: string | null;
  socialInstagram: string | null;
  socialCustom: SocialCustomLink[];
  courses: PortfolioCourse[];
  images: PortfolioMediaItem[];
  videos: PortfolioMediaItem[];
}

export interface PublicPortfolioData {
  user: {
    id: string;
    name: string | null;
    image: string | null;
    username: string | null;
  };
  portfolio: PortfolioBase;
}

export interface MyPortfolioData extends Omit<PortfolioBase, 'courses'> {
  id: number | null;
  isPublic: boolean;
  courses: Array<{
    courseId: number;
    order: number;
    course: {
      id: number;
      key: string;
      title: string | null;
      status: string;
    };
  }>;
}

interface UpdatePortfolioInput {
  title?: string;
  tagline?: string;
  bio?: string;
  portraitImage?: string;
  coverImage?: string;
  email?: string;
  phone?: string;
  theme?: string;
  skills?: string[];
  languages?: string[];
  socialLinkedin?: string;
  socialTwitter?: string;
  socialInstagram?: string;
  socialCustom?: SocialCustomLink[];
  images?: { url: string; description?: string }[];
  videos?: { url: string; description?: string }[];
  isPublic?: boolean;
}

interface PortfolioAnalytics {
  totalVisits: number;
  visitsPerDay: { date: string; count: number }[];
  courseOpens: { courseId: number; title: string; count: number }[];
  countries: { country: string; count: number }[];
}

export function usePublicPortfolio(username: string) {
  return useQuery({
    queryKey: ['portfolio', username],
    queryFn: () =>
      api.get<PublicPortfolioData>(`/portfolio/${username}`, { auth: false }),
    enabled: !!username,
    retry: false,
  });
}

export function useMyPortfolio() {
  return useQuery({
    queryKey: ['portfolio', 'me'],
    queryFn: () => api.get<MyPortfolioData>('/portfolio/me/settings'),
  });
}

export function useUpdatePortfolio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePortfolioInput) =>
      api.put('/portfolio/me/settings', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', 'me'] });
    },
  });
}

export function useUpdatePortfolioCourses() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseIds: number[]) =>
      api.put('/portfolio/me/courses', { courseIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', 'me'] });
    },
  });
}

export function usePortfolioAnalytics() {
  return useQuery({
    queryKey: ['portfolio', 'me', 'analytics'],
    queryFn: () => api.get<PortfolioAnalytics>('/portfolio/me/analytics'),
  });
}

export function useTrackPortfolioVisit() {
  return useMutation({
    mutationFn: ({
      username,
      country,
      courseId,
    }: {
      username: string;
      country?: string;
      courseId?: number;
    }) =>
      api.post(`/portfolio/${username}/visit`, { country, courseId }, { auth: false }),
  });
}

export function useContactPortfolio() {
  return useMutation({
    mutationFn: ({
      username,
      name,
      email,
      message,
    }: {
      username: string;
      name: string;
      email: string;
      message: string;
    }) =>
      api.post(
        `/portfolio/${username}/contact`,
        { name, email, message },
        { auth: false },
      ),
  });
}
