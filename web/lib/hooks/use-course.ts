import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

interface CourseStep {
  id: number;
  courseId: number;
  type: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  payload: Record<string, unknown> | null;
  error: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

interface ConversationMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  userId: string;
  courseId: number | null;
  title: string | null;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  messages: ConversationMessage[];
}

interface Course {
  id: number;
  key: string;
  title: string | null;
  topic: string | null;
  data: Record<string, unknown> | null;
  orgId: number | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  steps: CourseStep[];
  conversations: Conversation[];
}

interface CreateCourseResponse {
  courseKey: string;
  conversationKey: string;
}

interface CreateCourseParams {
  userId: string;
}

interface GenerateTitleParams {
  courseKey: string;
  conversationKey: string;
  topic: string;
}

interface GenerateTitleResponse {
  success: boolean;
  aiMessage: string;
}

interface SetAudienceParams {
  courseKey: string;
  conversationKey: string;
  audience: string;
}

interface SetAudienceResponse {
  success: boolean;
  aiMessage: string;
}

interface SetObjectiveParams {
  courseKey: string;
  conversationKey: string;
  objective: string;
}

interface SetObjectiveResponse {
  success: boolean;
}

interface ObjectiveStatusResponse {
  status: 'pending' | 'running' | 'completed' | 'failed' | 'not_found';
  objectivesMessage: string | null;
  buildMethodMessage: string | null;
}

interface SetBuildingMethodParams {
  courseKey: string;
  conversationKey: string;
  buildingMethod: 'ai' | 'references_ai' | 'material_only';
}

interface SetBuildingMethodResponse {
  success: boolean;
  aiMessage: string;
  maxModules: number;
}

interface SetModulesParams {
  courseKey: string;
  conversationKey: string;
  modulesCount: number;
}

interface SetModulesResponse {
  success: boolean;
  aiMessage: string;
  modulesCount: number;
  maxUnits: number;
}

interface SetUnitsParams {
  courseKey: string;
  conversationKey: string;
  modules: Record<number, { units: number }>;
}

interface SetUnitsResponse {
  success: boolean;
  modules: Record<number, { units: number }>;
}

interface ProposedIndex {
  title: string;
  modules: Array<{
    number: number;
    title: string;
    units: Array<{ code: string; title: string }>;
  }>;
}

interface IndexStatusResponse {
  status: 'pending' | 'running' | 'completed' | 'failed' | 'not_found';
  proposedIndex: ProposedIndex | null;
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateCourseParams) =>
      api.post<CreateCourseResponse>('/v1/course', params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

export function useGenerateTitle() {
  return useMutation({
    mutationFn: (params: GenerateTitleParams) =>
      api.post<GenerateTitleResponse>('/v1/course/title', params),
  });
}

export function useSetAudience() {
  return useMutation({
    mutationFn: (params: SetAudienceParams) =>
      api.post<SetAudienceResponse>('/v1/course/audience', params),
  });
}

export function useSetObjective() {
  return useMutation({
    mutationFn: (params: SetObjectiveParams) =>
      api.post<SetObjectiveResponse>('/v1/course/objective', params),
  });
}

export function useObjectiveStatus(courseKey: string | null, enabled: boolean = false) {
  return useQuery({
    queryKey: ['objective-status', courseKey],
    queryFn: () => api.get<ObjectiveStatusResponse>(`/v1/course/${courseKey}/objective`),
    enabled: !!courseKey && enabled,
    refetchInterval: (data) => {
      const status = data.state.data?.status;
      if (status === 'pending' || status === 'running') {
        return 2000;
      }
      return false;
    },
  });
}

export function useSetBuildingMethod() {
  return useMutation({
    mutationFn: (params: SetBuildingMethodParams) =>
      api.post<SetBuildingMethodResponse>(`/v1/course/${params.courseKey}/building`, {
        conversationKey: params.conversationKey,
        buildingMethod: params.buildingMethod,
      }),
  });
}

export function useSetModules() {
  return useMutation({
    mutationFn: (params: SetModulesParams) =>
      api.post<SetModulesResponse>(`/v1/course/${params.courseKey}/modules`, {
        conversationKey: params.conversationKey,
        modulesCount: params.modulesCount,
      }),
  });
}

export function useSetUnits() {
  return useMutation({
    mutationFn: (params: SetUnitsParams) =>
      api.post<SetUnitsResponse>(`/v1/course/${params.courseKey}/units`, {
        conversationKey: params.conversationKey,
        modules: params.modules,
      }),
  });
}

export function useIndexStatus(courseKey: string | null, enabled: boolean = false) {
  return useQuery({
    queryKey: ['index-status', courseKey],
    queryFn: () => api.get<IndexStatusResponse>(`/v1/course/${courseKey}/index`),
    enabled: !!courseKey && enabled,
    refetchInterval: (data) => {
      const status = data.state.data?.status;
      if (status === 'pending' || status === 'running') {
        return 2000;
      }
      return false;
    },
  });
}

export function useCourse(key: string | null) {
  return useQuery({
    queryKey: ['course', key],
    queryFn: () => api.get<Course>(`/v1/course/${key}`),
    enabled: !!key,
    refetchInterval: (data) => {
      // Poll every 2 seconds while steps are still pending or running
      const course = data.state.data;
      if (!course) return false;

      const hasActiveSteps = course.steps.some(
        (step) => step.status === 'pending' || step.status === 'running'
      );

      return hasActiveSteps ? 2000 : false;
    },
  });
}
