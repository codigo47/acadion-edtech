import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, type PaginatedResponse } from '../api-client';
import { getToken } from '../auth';
import { TaskName } from '../enums/task-name.enum';

export { TaskName };

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
  status: 'draft' | 'generating' | 'completed' | 'failed';
  topic: string | null;
  input: Record<string, unknown> | null;
  output: Record<string, unknown> | null;
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

interface ExerciseType {
  id: number;
  name: string;
}

interface SetUnitsResponse {
  success: boolean;
  modules: Record<number, { units: number }>;
  aiMessage?: string;
  nextScreen?: string;
}

interface GetExerciseTypesParams {
  courseKey: string;
  conversationKey: string;
}

interface GetExerciseTypesResponse {
  success: boolean;
  aiMessage: string;
  exerciseTypes: ExerciseType[];
}

interface SetEvaluationParams {
  courseKey: string;
  conversationKey: string;
  selectedComponents: Array<{ id: number; name: string }>;
}

interface SetEvaluationResponse {
  success: boolean;
  aiMessage: string;
}

interface SetEvaluationDetailsParams {
  courseKey: string;
  conversationKey: string;
  knowledgeCheckEndUnit: boolean;
  knowledgeCheckEndModule: boolean;
  finalExercise: boolean;
  restrictions: string;
}

interface SetEvaluationDetailsResponse {
  success: boolean;
  aiMessage?: string;
  nextScreen?: string;
}

interface SetBrandingParams {
  courseKey: string;
  conversationKey: string;
  primaryColor: string;
  secondaryColor: string;
  typo1: string;
  typo2: string;
  logo: string;
  guidelines: string;
}

interface SetBrandingResponse {
  success: boolean;
  aiMessage?: string;
  nextScreen?: string;
}

interface GenerateCourseResponse {
  success: boolean;
  totalUnits: number;
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateCourseParams) =>
      api.post<CreateCourseResponse>('/v1/course/tasks', {
        taskName: TaskName.CREATE_COURSE,
        userId: params.userId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

export function useGenerateTitle() {
  return useMutation({
    mutationFn: (params: GenerateTitleParams) =>
      api.post<GenerateTitleResponse>('/v1/course/tasks', {
        taskName: TaskName.GENERATE_TITLE,
        courseKey: params.courseKey,
        conversationKey: params.conversationKey,
        topic: params.topic,
      }),
  });
}

export function useSetAudience() {
  return useMutation({
    mutationFn: (params: SetAudienceParams) =>
      api.post<SetAudienceResponse>('/v1/course/tasks', {
        taskName: TaskName.SET_AUDIENCE,
        courseKey: params.courseKey,
        conversationKey: params.conversationKey,
        audience: params.audience,
      }),
  });
}

export function useSetObjective() {
  return useMutation({
    mutationFn: (params: SetObjectiveParams) =>
      api.post<SetObjectiveResponse>('/v1/course/tasks', {
        taskName: TaskName.SET_OBJECTIVE,
        courseKey: params.courseKey,
        conversationKey: params.conversationKey,
        objective: params.objective,
      }),
  });
}

export function useSetBuildingMethod() {
  return useMutation({
    mutationFn: (params: SetBuildingMethodParams) =>
      api.post<SetBuildingMethodResponse>('/v1/course/tasks', {
        taskName: TaskName.SET_BUILDING_METHOD,
        courseKey: params.courseKey,
        conversationKey: params.conversationKey,
        buildingMethod: params.buildingMethod,
      }),
  });
}

export function useSetModules() {
  return useMutation({
    mutationFn: (params: SetModulesParams) =>
      api.post<SetModulesResponse>('/v1/course/tasks', {
        taskName: TaskName.SET_MODULES,
        courseKey: params.courseKey,
        conversationKey: params.conversationKey,
        modulesCount: params.modulesCount,
      }),
  });
}

export function useSetUnits() {
  return useMutation({
    mutationFn: (params: SetUnitsParams) =>
      api.post<SetUnitsResponse>('/v1/course/tasks', {
        taskName: TaskName.SET_UNITS,
        courseKey: params.courseKey,
        conversationKey: params.conversationKey,
        modules: params.modules,
      }),
  });
}

export function useGetExerciseTypes() {
  return useMutation({
    mutationFn: (params: GetExerciseTypesParams) =>
      api.post<GetExerciseTypesResponse>('/v1/course/tasks', {
        taskName: TaskName.GET_EXERCISE_TYPES,
        courseKey: params.courseKey,
        conversationKey: params.conversationKey,
      }),
  });
}

export function useSetEvaluation() {
  return useMutation({
    mutationFn: (params: SetEvaluationParams) =>
      api.post<SetEvaluationResponse>('/v1/course/tasks', {
        taskName: TaskName.SET_EVALUATION,
        courseKey: params.courseKey,
        conversationKey: params.conversationKey,
        selectedComponents: params.selectedComponents,
      }),
  });
}

export function useSetEvaluationDetails() {
  return useMutation({
    mutationFn: (params: SetEvaluationDetailsParams) =>
      api.post<SetEvaluationDetailsResponse>('/v1/course/tasks', {
        taskName: TaskName.SET_EVALUATION_DETAILS,
        courseKey: params.courseKey,
        conversationKey: params.conversationKey,
        knowledgeCheckEndUnit: params.knowledgeCheckEndUnit,
        knowledgeCheckEndModule: params.knowledgeCheckEndModule,
        finalExercise: params.finalExercise,
        restrictions: params.restrictions,
      }),
  });
}

interface CourseListItem {
  id: number;
  key: string;
  title: string | null;
  status: 'draft' | 'generating' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export function useCourses(page?: number, limit?: number) {
  const isPaginated = page != null && limit != null;
  return useQuery({
    queryKey: isPaginated ? ['courses', page, limit] : ['courses'],
    queryFn: () =>
      isPaginated
        ? api.get<PaginatedResponse<CourseListItem>>(`/v1/course?page=${page}&limit=${limit}`)
        : api.get<PaginatedResponse<CourseListItem>>('/v1/course'),
    enabled: !!getToken(),
  });
}

export function useCourse(key: string | null) {
  return useQuery({
    queryKey: ['course', key],
    queryFn: () => api.get<Course>(`/v1/course/${key}`),
    enabled: !!key,
  });
}

export function useSetBranding() {
  return useMutation({
    mutationFn: (params: SetBrandingParams) =>
      api.post<SetBrandingResponse>('/v1/course/tasks', {
        taskName: TaskName.SET_BRANDING,
        courseKey: params.courseKey,
        conversationKey: params.conversationKey,
        primaryColor: params.primaryColor,
        secondaryColor: params.secondaryColor,
        typo1: params.typo1,
        typo2: params.typo2,
        logo: params.logo,
        guidelines: params.guidelines,
      }),
  });
}

export function useGenerateCourse() {
  return useMutation({
    mutationFn: (courseKey: string) =>
      api.post<GenerateCourseResponse>('/v1/course/tasks', {
        taskName: TaskName.GENERATE_COURSE,
        courseKey,
      }),
  });
}

interface CourseComponentData {
  id: number;
  module: number;
  unit: number;
  sequence: number;
  componentId?: number;
  componentName: string;
  componentType: 'static' | 'interactive' | 'evaluation';
  groupKey?: string | null;
  data: Record<string, unknown>;
  name?: string;
}

interface GroupVariant {
  componentId: number;
  componentName: string;
  name: string;
  groupKey: string;
}

interface CourseComponentsResponse {
  courseId: number;
  components: CourseComponentData[];
  groupVariants: GroupVariant[];
}

export function useCourseComponents(courseKey: string | null, enabled: boolean = true) {
  return useQuery({
    queryKey: ['course-components', courseKey],
    queryFn: () => api.get<CourseComponentsResponse>(`/v1/course/${courseKey}/components`),
    enabled: !!courseKey && enabled,
  });
}
