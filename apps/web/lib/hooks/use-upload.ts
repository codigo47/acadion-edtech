import { useMutation } from '@tanstack/react-query';
import { api } from '../api-client';

export function useUploadImage() {
  return useMutation({
    mutationFn: (file: Blob) =>
      api.upload<{ url: string }>('/uploads/image', file),
  });
}
