import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

interface UpdateComponentDataParams {
  id: number;
  data: Record<string, unknown>;
}

interface DeleteComponentParams {
  id: number;
}

interface DuplicateComponentParams {
  id: number;
}

interface CreateComponentParams {
  componentName: string;
  module: number;
  unit: number;
  afterSequence: number;
}

interface ReorderComponentsParams {
  courseKey: string;
  components: Array<{ id: number; sequence: number }>;
}

interface SwitchStyleParams {
  id: number;
  newComponentId: number;
}

interface ComponentResponse {
  id: number;
  module: number;
  unit: number;
  sequence: number;
  componentName: string;
  componentType: string;
  componentId: number;
  groupKey: string | null;
  data: Record<string, unknown>;
  name: string;
}

export function useUpdateComponentData(courseKey: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateComponentDataParams) =>
      api.patch<{ success: boolean }>(`/v1/course/components/${id}/data`, { data }),
    onMutate: async ({ id, data }) => {
      if (!courseKey) return;
      await queryClient.cancelQueries({ queryKey: ['course-components', courseKey] });
      const previous = queryClient.getQueryData(['course-components', courseKey]);
      queryClient.setQueryData(['course-components', courseKey], (old: { courseId: number; components: Array<{ id: number; data: Record<string, unknown> }> } | undefined) => {
        if (!old?.components) return old;
        return {
          ...old,
          components: old.components.map((c) =>
            c.id === id ? { ...c, data } : c,
          ),
        };
      });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous && courseKey) {
        queryClient.setQueryData(['course-components', courseKey], context.previous);
      }
    },
  });
}

export function useDeleteComponent(courseKey: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteComponentParams) =>
      api.delete<{ success: boolean }>(`/v1/course/components/${id}`),
    onSuccess: () => {
      if (courseKey) {
        queryClient.invalidateQueries({ queryKey: ['course-components', courseKey] });
      }
    },
  });
}

export function useDuplicateComponent(courseKey: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DuplicateComponentParams) =>
      api.post<ComponentResponse>(`/v1/course/components/${id}/duplicate`),
    onSuccess: () => {
      if (courseKey) {
        queryClient.invalidateQueries({ queryKey: ['course-components', courseKey] });
      }
    },
  });
}

export function useCreateComponent(courseKey: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ componentName, module, unit, afterSequence }: CreateComponentParams) =>
      api.post<ComponentResponse>(`/v1/course/${courseKey}/components`, {
        componentName,
        module,
        unit,
        afterSequence,
      }),
    onSuccess: () => {
      if (courseKey) {
        queryClient.invalidateQueries({ queryKey: ['course-components', courseKey] });
      }
    },
  });
}

export function useReorderComponents(courseKey: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseKey: key, components }: ReorderComponentsParams) =>
      api.patch<{ success: boolean }>(`/v1/course/${key}/components/reorder`, { components }),
    onSuccess: () => {
      if (courseKey) {
        queryClient.invalidateQueries({ queryKey: ['course-components', courseKey] });
      }
    },
  });
}

export function useSwitchComponentStyle(courseKey: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newComponentId }: SwitchStyleParams) =>
      api.patch<{ success: boolean }>(`/v1/course/components/${id}/switch-style`, { newComponentId }),
    onSuccess: () => {
      if (courseKey) {
        queryClient.invalidateQueries({ queryKey: ['course-components', courseKey] });
      }
    },
  });
}
