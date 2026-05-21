# Image Storage Abstraction Design

## Problem

When users crop images in the editor, the result is a base64 data URL stored directly in the `CourseComponent.data` JSON column in PostgreSQL. This makes database records very heavy. Additionally, future AI-generated images need a place to be stored.

## Decision

Implement a `StorageModule` with a Strategy Pattern — a common `StorageProvider` interface with swappable implementations:

- **Now:** `LocalStorageProvider` — saves files to `apps/api/uploads/images/`, served via static endpoint.
- **Future:** `S3StorageProvider` — uploads to S3, returns CDN/S3 URL.

The active provider is selected via `STORAGE_PROVIDER` env var. The frontend and all consumers only see URLs.

## Constraints

- External URLs (Unsplash, user-pasted) remain as-is — no download/re-hosting.
- Only cropped images and future AI-generated images go through the upload pipeline.
- Max file size: 10MB.
- Accepted types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`.
- No file cleanup/garbage collection for now.
- No database migration needed — `CourseComponent.data` stays as JSON.

## Architecture

### Backend — New `storage/` module

```
apps/api/src/storage/
├── storage.module.ts              # NestJS module, exports StorageService
├── storage.interface.ts           # StorageProvider interface
├── storage.service.ts             # Delegates to active provider based on env
├── providers/
│   └── local-storage.provider.ts  # Saves to disk, returns local URL
└── upload.controller.ts           # POST /api/v1/uploads/image (multipart, auth)
```

#### StorageProvider interface

```typescript
interface StorageProvider {
  upload(file: Buffer, filename: string, mimetype: string): Promise<string>;
  delete(fileUrl: string): Promise<void>;
}
```

#### StorageService

Reads `STORAGE_PROVIDER` from `ConfigService`. Instantiates the matching provider. Delegates `upload()` and `delete()` calls.

#### LocalStorageProvider

- Saves files to `apps/api/uploads/images/{uuid}.{ext}`
- Returns URL: `/api/v1/uploads/images/{uuid}.{ext}`
- `delete()` removes the file from disk

#### UploadController

```
POST /api/v1/uploads/image
- Auth: JwtAuthGuard
- Body: multipart/form-data with "file" field
- Validation: file type + size via Multer options
- Response: { url: string }
```

#### Static file serving

In `main.ts`, configure express static middleware to serve `apps/api/uploads/` at `/api/v1/uploads/`.

### Frontend — Changes

#### `lib/api-client.ts`

Add `upload` method that sends `FormData` without `Content-Type: application/json`:

```typescript
upload: <T>(endpoint: string, file: Blob, fieldName = 'file') => Promise<T>
```

Requires a `raw` flag in the internal `request()` function to skip `JSON.stringify` and the JSON content-type header.

#### `lib/hooks/use-upload.ts` (new)

```typescript
export function useUploadImage() {
  return useMutation({
    mutationFn: (file: Blob) => api.upload<{ url: string }>('/uploads/image', file),
  });
}
```

#### `ImagePickerModal.tsx`

When crop produces a data URL:
1. Convert data URL to Blob
2. Call upload mutation
3. Pass the returned server URL to `onSelect()` (not the data URL)

If upload fails: show error toast, keep modal open for retry.

External URLs (no crop, or skip crop) pass through directly — no upload.

### What doesn't change

- All editable block components (`EditableImageBlock`, `EditableGalleryBlock`, etc.)
- All read-only block components
- Prisma schema
- `PATCH /course/components/:id/data` endpoint
- Existing data URLs in DB continue to render; replaced naturally when users re-edit

## Migration path to S3

1. Add `@aws-sdk/client-s3` dependency
2. Create `S3StorageProvider` implementing `StorageProvider`
3. Set `STORAGE_PROVIDER=s3` and add S3 env vars (`S3_BUCKET`, `S3_REGION`, etc.)
4. No frontend changes needed
